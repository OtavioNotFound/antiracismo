import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, BookOpen, HeartHandshake, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { books, roomNames, timeline } from './content';
import { clampRoom, bookScrollTarget } from './navigation.mjs';
gsap.registerPlugin(ScrollTrigger);
export type MuseumHandle={goTo:(n:number)=>void};
type Props={hash:string;reading:boolean;reduced:boolean;onGo:(n:number)=>void;onActive:(n:number)=>void};

export const Museum=forwardRef<MuseumHandle,Props>(function Museum({hash,reading,reduced,onGo,onActive},ref){
 const root=useRef<HTMLElement>(null);const rail=useRef<HTMLDivElement>(null);const pin=useRef<ScrollTrigger|null>(null);
 const [active,setActive]=useState(0);const [desktop,setDesktop]=useState(false);
 const activeRef=useRef(0);const [selectedYear,setSelectedYear]=useState(0);
 const goTo=(n:number)=>{const index=clampRoom(n);const el=rail.current?.children[index] as HTMLElement|undefined;if(!el)return;if(root.current)root.current.scrollLeft=0;
  if(pin.current){const st=pin.current;window.scrollTo({top:st.start+(st.end-st.start)*index/5,behavior:reduced?'instant':'smooth'});}
  else if(reading){el.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});setActive(index);}
  else{rail.current!.scrollTo({left:index*rail.current!.clientWidth,behavior:reduced?'instant':'smooth'});setActive(index);}
 };

 useLayoutEffect(()=>{
  if(reduced)return;
  const ctx=gsap.context(()=>{
   gsap.timeline({defaults:{ease:'power3.out'}})
    .addLabel('open',0)
    .fromTo('.entrance-index',{opacity:0},{opacity:1,duration:.35},'open')
    .fromTo('.entrance-portrait',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0%)',duration:1.1,clearProps:'clipPath'},'open')
    .fromTo('.title-line',{y:30,opacity:0},{y:0,opacity:1,duration:.85,stagger:.1,clearProps:'transform,opacity'},'open+=.12')
    .fromTo('.entrance-copy',{y:10,opacity:0},{y:0,opacity:1,duration:.5,clearProps:'transform,opacity'},'open+=.48')
    .fromTo('.entrance-bottom',{opacity:0},{opacity:1,duration:.4,clearProps:'opacity'},'open+=.6');
  },root);return()=>ctx.revert();
 },[reduced]);

 useImperativeHandle(ref,()=>({goTo}));
 useEffect(()=>{activeRef.current=active;onActive(active);},[active,onActive]);
 useLayoutEffect(()=>{
  const m=gsap.matchMedia();
  m.add('(min-width: 1000px) and (min-height: 650px)',()=>{
   if(reading||reduced)return;const current=activeRef.current;if(rail.current)rail.current.scrollLeft=0;setDesktop(true);
   const ctx=gsap.context(()=>{
    const tween=gsap.to(rail.current,{x:()=>-5*(rail.current?.clientWidth||window.innerWidth),ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:()=>'+='+5*(rail.current?.clientWidth||window.innerWidth),pin:true,scrub:0.65,invalidateOnRefresh:true,onUpdate:s=>setActive(clampRoom(s.progress*5))}});
    pin.current=tween.scrollTrigger!;

    const rooms=gsap.utils.toArray<HTMLElement>('.room');
    const motion=(index:number,target:string,from:gsap.TweenVars,to:gsap.TweenVars,start='left 90%',end='left 25%')=>{
     const elements=rooms[index]?.querySelectorAll(target);if(!elements?.length)return;
     gsap.fromTo(elements,from,{...to,ease:'none',scrollTrigger:{trigger:rooms[index],containerAnimation:tween,start,end,scrub:true}});
    };
    motion(1,'.roots-title',{y:30},{y:0});
    motion(0,'.entrance-portrait img',{xPercent:0,scale:1.04},{xPercent:2,scale:1.04},'left left','right left');
    motion(1,'.archive-photo',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0%)'});
    motion(1,'.timeline-year',{x:35},{x:0});
    motion(2,'.concept-stage h2',{x:-35},{x:0});
    rooms[2]?.querySelectorAll('.floating-words>span').forEach((word,i)=>gsap.fromTo(word,{x:[30,-25,20,-30][i]},{x:[-12,10,-8,12][i],ease:'none',scrollTrigger:{trigger:rooms[2],containerAnimation:tween,start:'left right',end:'right left',scrub:true}}));
    motion(3,'.cover-object',{y:30},{y:0,stagger:.08});
    motion(3,'.book-rule',{scaleX:0,transformOrigin:'left'},{scaleX:1,stagger:.07});
    motion(4,'.voices-imprint span',{xPercent:8},{xPercent:0,stagger:.1});
    motion(4,'.voices-composition>h2',{y:25},{y:0});
    motion(4,'.voices-perspectives',{x:25},{x:0});
    motion(5,'.legacy h2>span',{y:30},{y:0,stagger:.09});
    motion(5,'.legacy-rule',{scaleX:0,transformOrigin:'left'},{scaleX:1});
    rooms.forEach(room=>{const img=room.querySelector('.editorial-image img');if(img)gsap.fromTo(img,{xPercent:-3,scale:1.08},{xPercent:3,scale:1.08,ease:'none',scrollTrigger:{trigger:room,containerAnimation:tween,start:'left right',end:'right left',scrub:true}});});

   },root);
   const restore=requestAnimationFrame(()=>{const st=pin.current;if(st)window.scrollTo({top:st.start+(st.end-st.start)*current/5,behavior:'instant'});});
   return()=>{cancelAnimationFrame(restore);const current=activeRef.current;ctx.revert();pin.current=null;setDesktop(false);requestAnimationFrame(()=>{if(rail.current)rail.current.scrollLeft=current*rail.current.clientWidth;});};
  });
  return()=>m.revert();
 },[reading,reduced]);
 useEffect(()=>{const id=requestAnimationFrame(()=>{const n=Number(hash.replace('#sala-',''))-1;if(hash.startsWith('#sala-')&&Number.isFinite(n))goTo(n);else if(hash==='#museu'||hash==='')goTo(0);});return()=>cancelAnimationFrame(id);},[hash]);
 useEffect(()=>{if(!reading)return;const restore=requestAnimationFrame(()=>{(rail.current?.children[activeRef.current] as HTMLElement)?.scrollIntoView({block:'start',behavior:'instant'});});let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rooms=Array.from(rail.current?.children||[]) as HTMLElement[];let index=0;rooms.forEach((room,i)=>{if(room.getBoundingClientRect().top<innerHeight*.5)index=i;});setActive(index);});};addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(restore);cancelAnimationFrame(frame);removeEventListener('scroll',update);};},[reading]);
 useEffect(()=>{if(reading||desktop)return;const el=rail.current;if(!el)return;const update=()=>setActive(clampRoom(el.scrollLeft/el.clientWidth));el.addEventListener('scroll',update,{passive:true});return()=>el.removeEventListener('scroll',update);},[reading,desktop]);
 useEffect(()=>{if(!rail.current)return;const focused=document.activeElement;const outgoing=focused?.closest('.room');const transfer=outgoing&&outgoing!==rail.current.children[active];Array.from(rail.current.children).forEach((n,i)=>{(n as HTMLElement).inert=!reading&&i!==active;});if(transfer&&!reading){const heading=rail.current.children[active]?.querySelector<HTMLElement>('h1,h2');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});}},[active,reading]);
 const roomProps=(n:number)=>({className:'room room-'+n,id:'museum-room-'+(n+1),'aria-label':roomNames[n],role:'group' as const,'aria-roledescription':'sala da exposição'});
 return <main id="conteudo" tabIndex={-1} className={'museum '+(reading?'reading':'')+' '+(desktop?'pinned':'')} ref={root} onKeyDown={e=>{if((e.target as HTMLElement).closest('dialog,[data-inner-controls],input,select,textarea'))return;let n=activeRef.current;if(e.key==='ArrowRight')n++;else if(e.key==='ArrowLeft')n--;else if(e.key==='Home')n=0;else if(e.key==='End')n=5;else return;e.preventDefault();goTo(n);}}>
  <div className="room-rail" ref={rail} role="region" aria-label="Exposição em seis salas">
   <section {...roomProps(0)}>
    <div className="room-inner hero entrance">
     <div className="entrance-grid">
      <figure className="entrance-portrait">
       <img src="/images/conceicao-evaristo.webp" alt="Conceição Evaristo falando ao microfone no Festival Latinidades" width="1200" height="800" fetchPriority="high"/>
       <figcaption>Festival Latinidades, 2013 · Fora do Eixo</figcaption>
      </figure>
      <div className="entrance-index eyebrow"><span>01 / 06</span><span>Entrada</span></div>
      <h1><span className="title-line">Conceição</span><span className="title-line">Evaristo</span></h1>
      <div className="entrance-copy">
       <p>Uma exposição sobre a literatura, a memória e as vozes que atravessam sua obra.</p>
       <div className="entrance-actions"><button className="exhibition-button" onClick={()=>goTo(1)}><span>Explorar exposição</span><span className="button-orbit"><ChevronRight size={19}/></span></button><a className="entrance-support" href="#acolhimento">Encontrar acolhimento</a></div>
      </div>
      <div className="entrance-bottom"><span className="eyebrow">Literatura negra brasileira</span><span className="scroll-cue"><ChevronDown size={15}/><span className="wheel-cue">Role para percorrer</span><span className="touch-cue">Deslize para percorrer</span></span></div>
     </div>
    </div>
   </section>
   <section {...roomProps(1)}><div className="room-inner roots archive"><div className="room-heading"><p className="eyebrow">ORIGEM E MEMÓRIA</p><span className="chapter-number" aria-hidden="true">02</span></div><div className="roots-composition"><h2 className="roots-title">Antes do livro,<br/><em>a vida.</em></h2><figure className="roots-photo editorial-image"><div className="archive-photo"><img src="/images/conceicao-evaristo.webp" alt="Registro de Conceição Evaristo no Festival Latinidades de 2013" width="1200" height="800" loading="lazy"/></div><figcaption>Conceição Evaristo no Festival Latinidades, 2013</figcaption></figure><div className="roots-intro"><p>Escritora, professora e pesquisadora. Uma trajetória em que escutar histórias é também construir conhecimento.</p></div><div className="timeline" data-inner-controls><span className="timeline-year" aria-hidden="true">{timeline[selectedYear].year}</span><div className="timeline-dates" role="tablist" aria-label="Marcos da trajetória">{timeline.map((item,i)=><button role="tab" key={item.year} id={'year-'+i} aria-selected={selectedYear===i} aria-controls="timeline-panel" tabIndex={selectedYear===i?0:-1} onClick={()=>setSelectedYear(i)} onKeyDown={e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%timeline.length;else if(e.key==='ArrowLeft')n=(i+timeline.length-1)%timeline.length;else return;e.preventDefault();setSelectedYear(n);document.getElementById('year-'+n)?.focus();}}>{item.year}</button>)}</div><div role="tabpanel" aria-labelledby={'year-'+selectedYear} id="timeline-panel" className="timeline-panel" key={selectedYear}><h3>{timeline[selectedYear].title}</h3><p>{timeline[selectedYear].text}</p></div><a className="text-link" href="#fontes">Fontes da trajetória</a></div></div></div></section>
   <section {...roomProps(2)}><div className="room-inner concept"><div className="room-heading"><p className="eyebrow">A PALAVRA EM MOVIMENTO</p><span className="chapter-number" aria-hidden="true">03</span></div><div className="concept-stage"><h2><span>escre</span><em>vivência</em></h2><div className="concept-definition"><span className="eyebrow">A VIDA TAMBÉM É MATÉRIA DE ESCRITA.</span><p>Experiência vivida, memória e criação literária. A voz pessoal encontra histórias que pertencem a muitas pessoas.</p><p className="concept-note">Ficção e memória dialogam. Cada personagem abre um mundo, sem ser um retrato direto da autora.</p></div><div className="floating-words" aria-label="Memória, experiência, identidade e voz coletiva"><span>memória</span><span>experiência</span><span>identidade</span><span>voz coletiva</span></div><span className="concept-line" aria-hidden="true"/></div></div></section>
   <section {...roomProps(3)}><div className="room-inner collection"><div className="room-heading"><p className="eyebrow">O ACERVO / TRÊS ENCONTROS</p><span className="chapter-number" aria-hidden="true">04</span></div><div className="collection-heading"><h2>Livros que <br/><em>abrem caminhos.</em></h2><p>Histórias que cabem nas mãos.<br/>Mundos que continuam em nós.</p></div><BookCarousel reduced={reduced}/><span className="collection-note">Escolha uma obra para conhecer seus temas e sua história.</span></div></section>
   <section {...roomProps(4)}><div className="room-inner voices"><div className="room-heading"><p className="eyebrow">MULTIPLICIDADE / VOZES E CONTEXTO</p><span className="chapter-number" aria-hidden="true">05</span></div><div className="voices-composition"><div className="voices-imprint" aria-hidden="true"><span>escuta</span><span>memória</span><span>criação</span></div><h2>Uma voz<br/>nunca é<br/><em>uma só.</em></h2><div className="voices-perspectives">{[{n:'Memória',title:'Quem tem sua história preservada?',text:'A oralidade e as lembranças coletivas confrontam o apagamento de experiências negras.'},{n:'Raça, gênero e classe',title:'Experiências que se atravessam.',text:'As desigualdades não atuam isoladamente. Suas relações ampliam a compreensão da vida das personagens.'},{n:'Humanidade',title:'Para além do estereótipo.',text:'Afeto, alegria e criação também fazem parte dessas vidas. Reconhecer sua complexidade é uma prática antirracista.'}].map(x=><article key={x.n}><span className="eyebrow">{x.n}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div></div></section>
   <section {...roomProps(5)}><div className="room-inner legacy"><div className="room-heading"><p className="eyebrow">CONTINUIDADE / O LEGADO</p><span className="chapter-number" aria-hidden="true">06</span></div><h2><span>A memória</span><span>continua em</span><span>quem <em>a escuta.</em></span></h2><div className="legacy-rule"/><div className="legacy-bottom"><span className="legacy-mark" aria-hidden="true">CE.</span><p>A literatura de Conceição Evaristo amplia os caminhos da cultura brasileira. Ler, compartilhar e valorizar vozes negras leva essa conversa para além do museu.</p><div className="legacy-actions"><a className="button dark" href="#acolhimento"><HeartHandshake size={18}/> Encontrar acolhimento</a><a className="text-link" href="#fontes">Conhecer as fontes</a><button className="text-link" onClick={()=>goTo(0)}>Revisitar a exposição</button></div></div></div></section>
  </div>
  <div className="museum-progress"><div className="progress-line"><span style={{transform:'scaleX('+((active+1)/6)+')'}}/></div><div className="progress-content"><span className="room-count" aria-live="polite">{String(active+1).padStart(2,'0')} <span>/ 06</span></span><nav aria-label="Salas da exposição">{roomNames.map((n,i)=><button key={n} onClick={()=>goTo(i)} aria-current={active===i?'step':undefined}><span className="nav-dot"/>{n}</button>)}</nav><div className="room-controls"><button className="icon-button" aria-label="Sala anterior" disabled={active===0} onClick={()=>goTo(active-1)}><ChevronLeft size={20}/></button><button className="next-button" disabled={active===5} onClick={()=>goTo(active+1)} aria-label="Próxima sala"><span>Próxima sala</span><ChevronRight size={20}/></button></div></div></div>
 </main>;
});

function BookCarousel({reduced}:{reduced:boolean}){
 const list=useRef<HTMLDivElement>(null);const [selected,setSelected]=useState<number|null>(null);const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLElement|null>(null);const [bookIndex,setBookIndex]=useState(0);const programmatic=useRef(false);
 useEffect(()=>{if(selected!==null)dialog.current?.showModal();},[selected]);
 const close=()=>{dialog.current?.close();setSelected(null);trigger.current?.focus({preventScroll:true});};
 const move=(dir:number)=>{const n=(bookIndex+dir+3)%3;setBookIndex(n);const el=list.current;const card=el?.children[n] as HTMLElement;if(el&&card){programmatic.current=true;el.scrollTo({left:bookScrollTarget(card.offsetLeft,el.scrollWidth,el.clientWidth),behavior:reduced?'instant':'smooth'});}};
 return <div data-inner-controls className="book-collection" onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.stopPropagation();e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}><div ref={list} className="book-rail" aria-label="Obras de Conceição Evaristo" onPointerDown={()=>{programmatic.current=false;}} onWheel={()=>{programmatic.current=false;}} onScroll={()=>{if(!list.current||programmatic.current)return;const children=Array.from(list.current.children) as HTMLElement[];const near=children.reduce((best,n,i)=>Math.abs(n.offsetLeft-list.current!.scrollLeft)<Math.abs(children[best].offsetLeft-list.current!.scrollLeft)?i:best,0);setBookIndex(near);}}>{books.map((book,i)=><button className={'book-card '+book.color} key={book.title} onClick={e=>{trigger.current=e.currentTarget;setSelected(i);}} aria-label={'Explorar '+book.title}><span className="book-meta">{book.genre} <span>{book.year}</span></span><div className="cover-object"><img src={'/images/'+['poncia','olhos','becos'][i]+'.webp'} alt={'Capa de '+book.title+', edição Pallas'} width="300" height="450" loading="lazy"/></div><h3>{book.title}</h3><div className="book-rule"/><span className="book-words">{book.words}</span><span className="book-action">Explorar a obra <BookOpen size={17}/></span></button>)}</div><div className="book-controls"><span>{bookIndex+1} / 3 obras</span><button className="icon-button" aria-label="Obra anterior" onClick={()=>move(-1)}><ChevronLeft/></button><button className="icon-button" aria-label="Próxima obra" onClick={()=>move(1)}><ChevronRight/></button></div><dialog ref={dialog} className="book-dialog" aria-labelledby="book-title" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}}>{selected!==null&&<article><button className="icon-button dialog-close" aria-label="Fechar detalhes da obra" onClick={close}><X/></button><img className="dialog-cover" src={'/images/'+['poncia','olhos','becos'][selected]+'.webp'} alt={'Capa de '+books[selected].title} width="220" height="330"/><p className="eyebrow">{books[selected].genre} / {books[selected].year}</p><h2 id="book-title">{books[selected].title}</h2><p>{books[selected].summary}</p><div className="book-tags">{books[selected].themes.map(t=><span key={t}>{t}</span>)}</div><div className="reading-question"><span className="eyebrow">PARA PENSAR</span><h3>{books[selected].question}</h3></div><a href="#fontes" onClick={close} className="text-link">Fontes e leituras de apoio</a></article>}</dialog></div>;
}
