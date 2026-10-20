(()=>{
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const setProtected=visible=>document.body.classList.toggle('hero-in-view',visible);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>setProtected(entries.some(entry=>entry.isIntersecting)),{threshold:.08});
    observer.observe(hero);
  }else{
    const update=()=>setProtected(hero.getBoundingClientRect().bottom>80);
    addEventListener('scroll',update,{passive:true});
    update();
  }
  const stage=document.querySelector('.xyomara-stage'),guide=document.querySelector('#xyomara-guide-text');
  const messages={en:{solution:'Tell me the outcome you need. I will route you through country, industry, governance and delivery model.',talent:'Employers can request recruiting services. Candidates can explore roles and apply through the ATS pathway.',intelligence:'Company Intelligence connects business signals to a governed assessment and action pathway.'},es:{solution:'Cuéntame el resultado que necesitas. Te guiaré por país, industria, gobernanza y modelo de entrega.',talent:'Las empresas pueden solicitar reclutamiento. Los candidatos pueden explorar vacantes y aplicar mediante la ruta ATS.',intelligence:'Inteligencia Empresarial conecta señales del negocio con una evaluación y una ruta de acción gobernada.'}};
  document.querySelectorAll('[data-x-guide]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.xGuide,language=document.documentElement.lang==='es'?'es':'en';guide.textContent=messages[language][key];document.querySelectorAll('[data-x-guide]').forEach(item=>item.classList.toggle('active',item===button));if(key==='solution'){document.querySelector('.hero-workbench')?.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>document.querySelector('#universal-intake-form textarea')?.focus(),450)}else if(key==='talent'){document.querySelector('#workplace')?.scrollIntoView({behavior:'smooth',block:'start'})}else if(key==='intelligence'&&typeof openModal==='function'){openModal('assessment')}}));
  if(stage&&matchMedia('(prefers-reduced-motion: no-preference)').matches){stage.addEventListener('pointermove',event=>{const box=stage.getBoundingClientRect();stage.style.setProperty('--guide-x',`${(((event.clientX-box.left)/box.width)-.5)*10}px`);stage.style.setProperty('--guide-y',`${(((event.clientY-box.top)/box.height)-.5)*6}px`)});stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--guide-x','0px');stage.style.setProperty('--guide-y','0px')})}
})();
