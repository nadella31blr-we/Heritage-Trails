(function(){
var sites=window.SITES||[];
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function fact(dl,label,value,note){var d=el('div'),t=el('dt',0,label),v=el('dd',0,value);d.appendChild(t);d.appendChild(v);if(note){v.appendChild(el('div','note',note))}dl.appendChild(d)}
var list=document.getElementById('site-list');
if(list){sites.forEach(function(s){var li=el('li'),a=el('a');a.href='site.html?site='+encodeURIComponent(s.id);
a.appendChild(el('span','n',s.name));a.appendChild(el('span','m',s.period+', '+s.location));li.appendChild(a);list.appendChild(li)})}
var page=document.getElementById('site-page');
if(page){
var id=new URLSearchParams(location.search).get('site'),i=sites.findIndex(function(s){return s.id===id});
if(i<0){page.appendChild(el('p',0,'We could not find that site. Go back to the list and choose one.'));return}
var s=sites[i];document.title=s.name+' | Heritage Trails';
document.getElementById('site-name').textContent=s.name;
document.getElementById('site-sub').textContent=s.period+', '+s.location;
var img=document.getElementById('site-img');if(s.image){img.src=s.image;img.alt=s.imageAlt||s.name;img.hidden=false}
var dl=document.getElementById('facts');
fact(dl,'Visiting hours',s.timings,s.timingsConfirmed?'':'Timings are being confirmed. Check on the day before you travel.');
fact(dl,'Entry and fees',s.entry||'Entry details are being confirmed.');
fact(dl,'Photography',s.photography||'Photography rules are being confirmed.');
document.getElementById('story').textContent=s.story||'The full story for this site is coming soon.';
document.getElementById('about').textContent=s.about;
var src=document.getElementById('source');src.href=s.sourceUrl;src.textContent=s.source;
var pager=document.getElementById('pager');
function link(j,cls,lab){var a=el('a',cls);a.href='site.html?site='+encodeURIComponent(sites[j].id);a.textContent=lab+': '+sites[j].name;pager.appendChild(a)}
if(i>0)link(i-1,'prev','Previous');if(i<sites.length-1)link(i+1,'next','Next');
}})();
