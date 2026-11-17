(function(){
if(!HT.get()){location.replace('index.html');return}
var S=window.SITES||[],q=new URLSearchParams(location.search);
var TR={'old-town-temple-walk':'Old Town Temple Walk','twin-hills-caves-walk':'Twin Hills Caves Walk'};
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function img(s,c){var i=el('img',c);i.alt=s.imageAlt||s.name;i.loading='lazy';i.src=s.image||s.fallback;i.onerror=function(){i.onerror=null;i.src=s.fallback};return i}
function url(s,t){return 'site.html?site='+encodeURIComponent(s.id)+(t?'&trail='+encodeURIComponent(t):'')}
function trail(k){return S.filter(function(x){return x.trail===k}).sort(function(a,b){return a.stop-b.stop})}
function words(t){return t.trim().split(/\s+/).filter(Boolean).length}
function missing(s){var m=[];if(!s.image)m.push('photo');if(!s.imageCredit)m.push('photo credit and licence');
if(!s.story)m.push('story');else{var n=words(s.story);if(n<150||n>250)m.push('story length ('+n+' words, needs 150 to 250)')}
if(!s.timings)m.push('timings');if(!s.entry)m.push('entry rules');return m}
function fee(s){return /^only hindus/i.test(s.entry)?'Hindus only inside':/^(free|no entry fee)/i.test(s.entry)?'Free entry':'Ticketed'}
var grid=document.getElementById('grid');
if(grid){
var me=HT.get();document.getElementById('hi').textContent='Hi, '+me.name;document.getElementById('pn').textContent=me.name;document.getElementById('pp').textContent='+91 '+me.phone.slice(0,5)+' '+me.phone.slice(5);
document.getElementById('signout').onclick=function(){HT.out();location.replace('index.html')};
function tab(n){document.getElementById('tab-explore').hidden=n!=='explore';document.getElementById('tab-profile').hidden=n!=='profile';[].forEach.call(document.querySelectorAll('.tabs button'),function(b){if(b.dataset.t===n)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});scrollTo(0,0)}
[].forEach.call(document.querySelectorAll('.tabs button'),function(b){b.onclick=function(){tab(b.dataset.t)}});
Object.keys(TR).forEach(function(k){var l=trail(k),a=el('a','tcard');a.href=url(l[0],k);a.appendChild(img(l[0],'t-img'));
var b=el('div','t-body');b.appendChild(el('strong',0,TR[k]));b.appendChild(el('span','m',l.length+' stops'));a.appendChild(b);document.getElementById('trails').appendChild(a)});
var type='All',term='',chips=document.getElementById('chips');
var PL={Temple:'Temples',Cave:'Caves',Museum:'Museums',Monument:'Monuments'},th=document.getElementById('th'),tr=document.getElementById('trails'),gh=document.getElementById('gh');
function draw(){grid.textContent='';var n=0;S.forEach(function(s){if((type==='All'||s.type===type)&&s.name.toLowerCase().indexOf(term)>-1){n++;
var a=el('a','card');a.href=url(s);a.appendChild(img(s,'c-img'));var b=el('div','c-body');b.appendChild(el('strong',0,s.name));b.appendChild(el('span','m',s.type+', '+s.period));a.appendChild(b);grid.appendChild(a)}});
var f=type!=='All'||term;th.hidden=tr.hidden=f;gh.textContent=!f?'Explore sites':(type!=='All'&&!term?PL[type]:'Results')+' ('+n+')';
if(!n)grid.appendChild(el('p','note','No sites match. Try another word or filter.'))}
['All','Temple','Cave','Museum','Monument'].forEach(function(t){var b=el('button','chip',t);b.type='button';b.setAttribute('aria-pressed',t==='All');
b.onclick=function(){type=t;setTimeout(function(){gh.scrollIntoView({behavior:'smooth',block:'start'})},0);[].forEach.call(chips.children,function(c){c.setAttribute('aria-pressed',c===b)});draw()};chips.appendChild(b)});
document.getElementById('search').oninput=function(e){term=e.target.value.toLowerCase().trim();draw()};draw()}
var page=document.getElementById('site-page');
if(page){
var s=S.filter(function(x){return x.id===q.get('site')})[0];
if(!s){page.textContent='';page.appendChild(el('p',0,'We could not find that site. Go back to the list and choose one.'));return}
document.title=s.name+' | Heritage Trails';
document.getElementById('hero').appendChild(img(s,''));
document.getElementById('name').textContent=s.name;document.getElementById('sub').textContent=s.period+', '+s.location;
var ch=document.getElementById('chips');[s.timings.split(' (')[0],fee(s)].concat(s.photoStatus?['Photos: '+s.photoStatus]:[]).forEach(function(t){ch.appendChild(el('span','chip',t))});
document.getElementById('maps').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.mapQuery);
var info=document.getElementById('info');
[['Hours',s.timings],['Entry and fees',s.entry],['Photography',(s.photoStatus?s.photoStatus+'. ':'')+s.photoDetail],['Dress code',s.dress]].forEach(function(r){
var d=el('div');d.appendChild(el('dt',0,r[0]));d.appendChild(el('dd',0,r[1]||'Being confirmed.'));info.appendChild(d)});
document.getElementById('about').textContent=s.about;
document.getElementById('story').textContent=s.story||'The full story for this site is coming soon.';
var src=document.getElementById('source');src.href=s.sourceUrl;src.textContent=s.source;
var t=q.get('trail')||s.trail,order=t?trail(t):S,i=order.indexOf(s),pager=document.getElementById('pager');
if(t){var bar=document.getElementById('bar');bar.hidden=false;var st=el('div','stop');st.appendChild(el('b',0,TR[t]+': stop '+(i+1)+' of '+order.length));
var dots=el('div','dots');order.forEach(function(x,j){dots.appendChild(el('i',j<=i?'on':''))});st.appendChild(dots);bar.appendChild(st);
var nx=el('a',0,i<order.length-1?'Next stop':'Finish');nx.href=i<order.length-1?url(order[i+1],t):'home.html';bar.appendChild(nx)}
else{if(i>0){var p=el('a','prev','Previous: '+order[i-1].name);p.href=url(order[i-1]);pager.appendChild(p)}
if(i<order.length-1){var n=el('a','next','Next: '+order[i+1].name);n.href=url(order[i+1]);pager.appendChild(n)}}
if(q.get('check')==='1'){var m=missing(s),b=document.getElementById('check');b.hidden=false;b.appendChild(el('strong',0,'Content check (team only)'));
b.appendChild(el('p',0,m.length?'Not ready to publish. Missing: '+m.join(', ')+'.':'All required content is in place.'))}
}})();
