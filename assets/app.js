(function(){
var sites=window.SITES||[],q=new URLSearchParams(location.search);
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function fact(dl,label,value,note){var d=el('div'),v=el('dd',0,value);d.appendChild(el('dt',0,label));d.appendChild(v);if(note)v.appendChild(el('div','note',note));dl.appendChild(d)}
function words(t){return t.trim().split(/\s+/).filter(Boolean).length}
function missing(s){var m=[];if(!s.image)m.push('photo');if(!s.story)m.push('story');else{var n=words(s.story);if(n<150||n>250)m.push('story length ('+n+' words, needs 150 to 250)')}
if(!s.timings)m.push('timings');if(!s.entry)m.push('entry rules');return m}
function url(s,trail){return 'site.html?site='+encodeURIComponent(s.id)+(trail?'&trail='+encodeURIComponent(trail):'')}
var list=document.getElementById('site-list');
if(list){sites.forEach(function(s){var li=el('li'),a=el('a');a.href=url(s);
a.appendChild(el('span','n',s.name));a.appendChild(el('span','m',s.period+', '+s.location));li.appendChild(a);list.appendChild(li)})}
var page=document.getElementById('site-page');
if(page){
var s=sites.filter(function(x){return x.id===q.get('site')})[0];
if(!s){page.textContent='';page.appendChild(el('p',0,'We could not find that site. Go back to the list and choose one.'));return}
document.title=s.name+' | Heritage Trails';
document.getElementById('site-name').textContent=s.name;
document.getElementById('site-sub').textContent=s.period+', '+s.location;
var ph=document.getElementById('photo');
if(s.image){var im=el('img');im.src=s.image;im.alt=s.imageAlt||s.name;im.loading='lazy';ph.appendChild(im)}
else{ph.appendChild(el('div','photo-slot','Photo coming soon'))}
var dl=document.getElementById('facts');
fact(dl,'Visiting hours',s.timings,s.timingsConfirmed?'':'Timings are being confirmed. Check on the day before you travel.');
fact(dl,'Entry rules and fees',s.entry||'Entry details are being confirmed.');
fact(dl,'Photography',s.photography||'Photography rules are being confirmed.');
document.getElementById('story').textContent=s.story||'The full story for this site is coming soon.';
document.getElementById('about').textContent=s.about;
var src=document.getElementById('source');src.href=s.sourceUrl;src.textContent=s.source;
var trail=q.get('trail')||s.trail,order=trail?sites.filter(function(x){return x.trail===trail}).sort(function(a,b){return a.stop-b.stop}):sites;
var i=order.indexOf(s),pager=document.getElementById('pager');
if(i>0){var p=el('a','prev','Previous: '+order[i-1].name);p.href=url(order[i-1],trail);pager.appendChild(p)}
if(i<order.length-1){var n=el('a','next','Next: '+order[i+1].name);n.href=url(order[i+1],trail);pager.appendChild(n)}
if(q.get('check')==='1'){var m=missing(s),b=document.getElementById('check');b.hidden=false;
b.appendChild(el('strong',0,'Content check (team only)'));
b.appendChild(el('p',0,m.length?'Not ready to publish. Missing: '+m.join(', ')+'.':'All required content is in place.'))}
}})();
