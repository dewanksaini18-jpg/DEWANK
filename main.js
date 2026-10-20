/* ===== EDIT HERE: all links, videos and projects live in this one object ===== */
const SITE={
  email:"dewanksaini18@gmail.com",
  youtube:"https://youtube.com/@dewank-h9z",
  instagram:"https://instagram.com/official_dewank",
  booking:"",   // paste your Calendly / Cal.com link. Empty = opens an email to you
  showreel:"",  // "assets/showreel.mp4" or a YouTube link
  projects:[    // video: "assets/clip1.mp4" or YouTube link | img: thumbnail
    {cat:"Cinematic Edits",title:"Project title 01",video:"",img:"assets/hero.jpg",pos:"72% 30%"},
    {cat:"Short-Form Videos",title:"Project title 02",video:"",img:"assets/logo.jpg",pos:"50% 35%"},
    {cat:"Typography Edits",title:"Project title 03",video:"",img:"assets/hero.jpg",pos:"15% 85%"},
    {cat:"Motion Graphics",title:"Project title 04",video:"",img:"assets/logo.jpg",pos:"50% 95%"},
    {cat:"Sound Design",title:"Project title 05",video:"",img:"assets/hero.jpg",pos:"90% 60%"}]
};
/* ============================================================================ */
document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const book=SITE.booking||`mailto:${SITE.email}?subject=Book%20a%20call`,pg=document.body.dataset.p;
const L=[["index.html","Home","index"],["index.html#showreel","Showreel"],["work.html","Work","work"],["about.html","About","about"],["contact.html","Contact","contact"]];
$('header').innerHTML=`<a class="lg" href="index.html" aria-label="Dewank Saini home"><img src="assets/logo-sm.jpg" alt="Dewank Saini logo" width="46" height="46"></a>
<nav id="nv" aria-label="Main">${L.map(([h,t,k])=>`<a href="${h}"${pg==k?' aria-current="page"':''}>${t}</a>`).join('')}<a class="bk" data-l="book">Book a call</a></nav>
<a class="btn p" data-l="book">Book a call</a><button class="mb" aria-label="Menu" aria-expanded="false">☰</button>`;
$('footer').innerHTML=`<div class="wrap ft"><div><h3>DEWANK SAINI</h3><p class="mu">Video Editor &amp; Motion Designer</p><p class="ice">Create / Edit / Inspire.</p></div>
<nav aria-label="Footer"><a href="index.html">Home</a><a href="work.html">Works</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>
<nav aria-label="Social"><a data-l="yt">YouTube</a><a data-l="ig">Instagram</a><a data-l="mail">Email</a></nav></div><p class="cp mu">© ${new Date().getFullYear()} Dewank Saini</p>`;
const LK={book,yt:SITE.youtube,ig:SITE.instagram,mail:`mailto:${SITE.email}`};
$$('[data-l]').forEach(a=>{a.href=LK[a.dataset.l];if(a.href.startsWith('http')){a.target='_blank';a.rel='noopener'}});
const nv=$('#nv'),mb=$('.mb');
mb.onclick=()=>mb.setAttribute('aria-expanded',nv.classList.toggle('o'));
$$('#nv a').forEach(a=>a.addEventListener('click',()=>{nv.classList.remove('o');mb.setAttribute('aria-expanded',false)}));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
const tk=$('.tick>div');if(tk)tk.innerHTML=tk.innerHTML.repeat(4);
/* video modal */
const dlg=document.createElement('dialog');dlg.setAttribute('aria-label','Video player');
dlg.innerHTML='<button class="x" aria-label="Close video">✕</button><div id="vm"></div>';document.body.append(dlg);
const yt=u=>(u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)||[])[1];
function play(src,t){const m=$('#vm',dlg);
  m.innerHTML=!src?`<p class="empty"><b>${t}</b><br>Video coming soon.</p>`
   :yt(src)?`<iframe src="https://www.youtube.com/embed/${yt(src)}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen title="${t}"></iframe>`
   :`<video src="${src}" controls autoplay playsinline></video>`;
  dlg.showModal()}
dlg.addEventListener('close',()=>$('#vm',dlg).innerHTML='');
$('.x',dlg).onclick=()=>dlg.close();dlg.onclick=e=>e.target==dlg&&dlg.close();
const sr=$('#sr');if(sr)sr.onclick=()=>play(SITE.showreel,'Showreel');
/* project carousel */
const car=$('#car');
if(car){let i=0,sx=null,dg=0;
  car.innerHTML=SITE.projects.map((p,k)=>`<article class="sl" tabindex="0" aria-label="${p.title}, ${p.cat}" style="--im:url(${p.img});--pos:${p.pos}"><div class="th"></div><span class="pl"></span><div class="tx"><small>${p.cat}</small><h3>${p.title}</h3></div></article>`).join('');
  const S=$$('.sl',car),D=$('#dots'),n=S.length;
  D.innerHTML=S.map((_,k)=>`<button aria-label="Go to project ${k+1}"></button>`).join('');
  const go=x=>{i=(x+n)%n;S.forEach((s,k)=>{let d=k-i;if(d>n/2)d-=n;if(d<-n/2)d+=n;const a=Math.abs(d);
    s.style.transform=`translate(-50%,-50%) translateX(${d*62}%) translateZ(${-a*150}px) rotateY(${-d*16}deg)`;
    s.style.zIndex=9-a;s.style.opacity=a>2?0:1-a*.28;s.style.pointerEvents=a>2?'none':'auto';s.classList.toggle('c',!d)});
    $$('button',D).forEach((b,k)=>b.classList.toggle('on',k==i))};
  S.forEach((s,k)=>{s.onclick=()=>{if(dg){dg=0;return}k==i?play(SITE.projects[k].video,SITE.projects[k].title):go(k)};
    s.onkeydown=e=>e.key=='Enter'&&s.click()});
  $$('button',D).forEach((b,k)=>b.onclick=()=>go(k));
  $('#pv').onclick=()=>go(i-1);$('#nx').onclick=()=>go(i+1);
  addEventListener('keydown',e=>{if(!dlg.open){if(e.key=='ArrowLeft')go(i-1);if(e.key=='ArrowRight')go(i+1)}});
  car.onpointerdown=e=>{sx=e.clientX;dg=0};
  car.onpointerup=e=>{if(sx!==null&&Math.abs(e.clientX-sx)>40){dg=1;go(i+(e.clientX<sx?1:-1))}sx=null};
  go(0)}
/* 3D tilt on service cards (mouse only) */
$$('.card').forEach(c=>{c.onpointermove=e=>{if(e.pointerType!='mouse'||rm)return;const r=c.getBoundingClientRect();
  c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*8+'deg')};
  c.onpointerleave=()=>{c.style.removeProperty('--rx');c.style.removeProperty('--ry')}});
/* parallax + timeline progress */
const bg=$('.hero .bg'),tl=$('.tl');
const sc=()=>{if(bg&&!rm)bg.style.transform=`translateY(${scrollY*.12}px)`;
  if(tl){const r=tl.getBoundingClientRect(),h=innerHeight*.6;
    $('.fill',tl).style.height=Math.min(1,Math.max(0,(h-r.top)/r.height))*100+'%';
    $$('.ms',tl).forEach(m=>m.classList.toggle('on',m.getBoundingClientRect().top<h))}};
addEventListener('scroll',()=>requestAnimationFrame(sc),{passive:true});sc();
