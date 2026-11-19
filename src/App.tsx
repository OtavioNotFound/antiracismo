import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X, BookOpen, HeartHandshake, ExternalLink, Accessibility } from 'lucide-react';
import { Museum, type MuseumHandle } from './Museum';
import { Support } from './Support';
import { sources, roomNames } from './content';

export function App() {
 const [hash,setHash]=useState(location.hash || '#museu');
 const [menu,setMenu]=useState(false);
 const [reading,setReading]=useState(false);
 const [reduced,setReduced]=useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [settings,setSettings]=useState(false);
 const [activeRoom,setActiveRoom]=useState(0);
 const museum=useRef<MuseumHandle>(null);
 const view=hash==='#acolhimento'?'support':hash==='#fontes'?'sources':'museum';
 useEffect(()=>{const update=()=>{setHash(location.hash||'#museu');setMenu(false);};addEventListener('hashchange',update);return()=>removeEventListener('hashchange',update);},[]);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useEffect(()=>{if(view!=='museum'){window.scrollTo(0,0);requestAnimationFrame(()=>document.querySelector<HTMLElement>('main h1')?.focus());}},[view]);
 const go=(n:number)=>{const next='#sala-'+(n+1);if(location.hash===next)museum.current?.goTo(n);else location.hash=next;setMenu(false);};
 return <div className={'app '+(reduced?'reduce-motion ':'')+(view!=='museum'||activeRoom===1?'light-view':'dark-view')}>
  <a className="skip-link" href="#conteudo" onClick={e=>{e.preventDefault();document.getElementById('conteudo')?.focus();}}>Ir para o conteúdo</a>
  <header className="site-header">
   <a className="wordmark" href="#museu" onClick={()=>museum.current?.goTo(0)} aria-label="Museu Vivo, início"><span>museu vivo</span><small>CONCEIÇÃO EVARISTO</small></a>
   <nav className="desktop-nav" aria-label="Navegação principal"><a href="#museu" onClick={()=>museum.current?.goTo(0)} aria-current={view==='museum'?'page':undefined}>O museu</a><button onClick={()=>go(3)}>Acervo</button><a href="#fontes">O projeto e fontes</a><a className="button dark" href="#acolhimento"><HeartHandshake size={17}/> Encontrar acolhimento</a></nav>
   <div className="header-tools"><button className="icon-button" aria-label="Opções de acessibilidade" aria-expanded={settings} onClick={()=>setSettings(!settings)}><Accessibility size={21}/></button><button className="icon-button mobile-menu" aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
  </header>
  {settings&&<aside className="access-panel" aria-label="Acessibilidade"><h2>Leia do seu jeito.</h2><label><input type="checkbox" checked={reading} onChange={e=>setReading(e.target.checked)}/> Leitura vertical</label><label><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/> Reduzir movimentos</label><p>Você também pode navegar pelas salas usando as setas do teclado.</p><button className="text-link" onClick={()=>setSettings(false)}>Concluir</button></aside>}
  {menu&&<nav className="menu-panel" aria-label="Menu móvel"><a href="#museu" onClick={()=>setMenu(false)}>O museu</a>{roomNames.map((n,i)=><button key={n} onClick={()=>go(i)}>{n}</button>)}<a href="#acolhimento" onClick={()=>setMenu(false)}>Encontrar acolhimento</a><a href="#fontes" onClick={()=>setMenu(false)}>O projeto e fontes</a></nav>}
  <div className="view-slot">{view==='museum'?<Museum ref={museum} hash={hash} reading={reading||reduced} reduced={reduced} onGo={go} onActive={setActiveRoom}/>:view==='support'?<Support/>:<Sources/>}</div>
 </div>;
}

function Sources(){return <main id="conteudo" className="sources-page page-wrap" tabIndex={-1}><p className="eyebrow">CONSCIÊNCIA NEGRA EM AÇÃO</p><h1 tabIndex={-1}>Conhecimento<br/><em>que circula.</em></h1><div className="sources-intro"><p>Uma exposição digital sobre a vida e a literatura de Conceição Evaristo, criada para aproximar memória, leitura e ação antirracista.</p><p>Projeto escolar de Português e Redação do 2º ano do Ensino Médio. Textos de apresentação e reflexão são autorais; não são citações da escritora. Este é um projeto educativo independente.</p></div><h2>Fontes que sustentam a visita</h2><p className="muted">Pesquisa consultada em 19 de novembro de 2026. As interpretações das obras são sínteses educativas.</p>{['Literatura e trajetória','Acolhimento e orientação'].map(group=><section key={group} className="source-group"><h3>{group}</h3>{sources.filter(s=>s.group===group).map(s=><a className="source-item" href={s.url} key={s.title} target="_blank" rel="noreferrer"><div><span className="eyebrow">{s.org}</span><h4>{s.title}</h4><p>{s.description}</p></div><ExternalLink size={20}/><span className="sr-only">Abrir em nova aba</span></a>)}</section>)}<section className="credits"><h2>Imagem e direção visual</h2><p>Fotografia de Conceição Evaristo no Festival Latinidades, 2013, por Fora do Eixo. Imagem redimensionada, com recorte de exibição. Licença <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">CC BY-SA 2.0</a>. <a href="https://commons.wikimedia.org/wiki/File:ConceicaoEvaristo.jpg" target="_blank" rel="noreferrer">Arquivo original e créditos</a>.</p><p>Capas das edições Pallas, exibidas para identificação e comentário das obras. Imagens de catálogo: <a href="https://literarua.commercesuite.com.br/livros/poncia-vicencio-conceicao-evaristo" target="_blank" rel="noreferrer">LiteraRUA (Ponciá Vicêncio)</a>, <a href="https://www.pedagogica.com.br/livros/ficcao/olhos-d-agua" target="_blank" rel="noreferrer">Pedagógica (Olhos d’água)</a> e <a href="https://www.e-bienal.com/ficcao/becos-da-memoria" target="_blank" rel="noreferrer">E-Bienal (Becos da memória)</a>. Direitos das capas pertencem aos respectivos titulares. A arquitetura inicial foi registrada no <a href="https://www.figma.com/design/zxyDcjBjpF1ftE0CwEI05B" target="_blank" rel="noreferrer">Figma conceitual</a>. Movimento inspirado nos estudos de <a href="https://github.com/codrops/ScrollBasedLayoutAnimations" target="_blank" rel="noreferrer">Codrops</a> e na coleção <a href="https://webflow.com/made-in-webflow/scrolltrigger?cloneable=true" target="_blank" rel="noreferrer">ScrollTrigger do Webflow</a>.</p></section><a className="button dark" href="#museu"><BookOpen size={18}/> Voltar ao museu</a><Footer/></main>}
export function Footer(){return <footer className="site-footer"><span>museu vivo <span aria-hidden="true">/</span> Conceição Evaristo</span><a href="#fontes">Fontes e créditos</a><span>Literatura, memória e cuidado.</span></footer>}
