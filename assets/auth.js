var HT=(function(){function r(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function w(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
return{get:function(){return r('ht_session')},set:function(s){return w('ht_session',s)},out:function(){try{localStorage.removeItem('ht_session')}catch(e){}},
users:function(){return r('ht_users')||{}},save:function(p,n){var u=this.users();u[p]=n;return w('ht_users',u)}}})();
