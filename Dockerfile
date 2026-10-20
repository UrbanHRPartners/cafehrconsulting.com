FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UHR_SITE_DB=/data/site.db \
    HOST=0.0.0.0 \
    PORT=8787

RUN groupadd --system urbanhr && useradd --system --gid urbanhr --home-dir /app urbanhr
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --requirement /app/requirements.txt
COPY --chown=urbanhr:urbanhr . /app
RUN mkdir -p /data && chown urbanhr:urbanhr /data

USER urbanhr
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import json,os,urllib.request; assert json.load(urllib.request.urlopen('http://127.0.0.1:'+os.getenv('PORT','8787')+'/api/health',timeout=3))['status']=='ok'"
CMD ["python", "server.py"]
