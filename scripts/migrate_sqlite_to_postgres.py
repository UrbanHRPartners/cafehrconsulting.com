"""One-way, idempotent migration from the launch SQLite database to PostgreSQL."""
from __future__ import annotations

import argparse
import sqlite3

TABLES = (
    "tenants", "users", "sessions", "audit_log", "leads", "assessments",
    "recruiting_requests", "applications", "whatsapp_intents", "analytics_events",
    "advice_requests", "universal_intakes", "service_requests", "integration_outbox",
    "password_reset_tokens",
)

def migrate(sqlite_path: str, database_url: str) -> dict[str, int]:
    try:
        import psycopg
    except ImportError as exc:
        raise SystemExit("Install requirements.txt before running the migration") from exc
    source=sqlite3.connect(f"file:{sqlite_path}?mode=ro",uri=True)
    source.row_factory=sqlite3.Row
    destination=psycopg.connect(database_url)
    totals={}
    try:
        with destination.transaction():
            for table in TABLES:
                columns=[x[1] for x in source.execute(f"PRAGMA table_info({table})")]
                rows=source.execute(f"SELECT * FROM {table}").fetchall()
                if rows:
                    names=",".join(columns);markers=",".join(["%s"]*len(columns))
                    sql=f"INSERT INTO {table} ({names}) VALUES ({markers}) ON CONFLICT DO NOTHING"
                    destination.executemany(sql,[tuple(row[name] for name in columns) for row in rows])
                totals[table]=len(rows)
            destination.execute("SELECT setval(pg_get_serial_sequence('audit_log','id'), GREATEST(COALESCE((SELECT MAX(id) FROM audit_log),1),1), true)")
    finally:
        destination.close();source.close()
    return totals

def main():
    parser=argparse.ArgumentParser(description="Migrate UrbanHRPartners website records to PostgreSQL")
    parser.add_argument("--sqlite",required=True,help="Path to the source site.db")
    parser.add_argument("--database-url",required=True,help="PostgreSQL connection URL")
    args=parser.parse_args()
    totals=migrate(args.sqlite,args.database_url)
    for table,count in totals.items():print(f"{table}: {count}")

if __name__=="__main__":main()
