(function(){
if(HT.get()){location.replace('home.html');return}
var FB=window.HT_FIREBASE,sheet=document.getElementById('sheet'),st={},timer;
function loadFB(cb){if(window.firebase&&firebase.auth){if(!firebase.apps.length)firebase.initializeApp(FB);return cb()}
var u=['https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js'],i=0;
(function next(){if(i===u.length){if(!firebase.apps.length)firebase.initializeApp(FB);return cb()}var s=document.createElement('script');s.src=u[i++];s.onload=next;s.onerror=function(){cb(1)};document.head.appendChild(s)})()}
function sendReal(done){loadFB(function(bad){if(bad)return done('Could not load the sign-in service. Check your connection.');
try{if(st.vf)st.vf.clear()}catch(e){}st.vf=new firebase.auth.RecaptchaVerifier('rc',{size:'invisible'});
firebase.auth().signInWithPhoneNumber('+91'+st.phone,st.vf).then(function(c){st.conf=c;st.tries=3;st.at=Date.now();done()}).catch(function(e){done(fbMsg(e))})})}
function fbMsg(e){var c=(e&&e.code)||'';return c==='auth/invalid-phone-number'?'That number is not valid.':c==='auth/too-many-requests'?'Too many attempts. Please try again later.':c==='auth/quota-exceeded'?'SMS limit reached. Please try again later.':c==='auth/captcha-check-failed'?'Verification check failed. Refresh and try again.':'Could not send the code. Please try again.'}
function $(s){return sheet.querySelector(s)}
function fmt(n){return n.slice(0,5)+' '+n.slice(5)}
function show(html){clearInterval(timer);sheet.innerHTML=html}
function phoneScreen(msg){
show('<h2>Sign in or sign up</h2><p class="sub">Enter your mobile number to continue.</p><label class="lbl" for="ph">Mobile number</label><div class="ph"><span>+91</span><input id="ph" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="10-digit number"></div><p class="err" id="err" role="alert"></p><button class="btn" id="go" type="button" disabled>Continue</button><p class="fine" id="fp"></p>');$('#fp').textContent=FB?'We will send a 6-digit code by SMS. Message rates may apply.':'Demo sign-in. No SMS is sent, and your number stays on this device.';
var ph=$('#ph'),go=$('#go');if(msg)$('#err').textContent=msg;
ph.oninput=function(){ph.value=ph.value.replace(/\D/g,'');go.disabled=!/^[6-9]\d{9}$/.test(ph.value)};
ph.onkeydown=function(e){if(e.key==='Enter'&&!go.disabled)go.click()};
go.onclick=function(){st.phone=ph.value;if(!FB){newCode();return otpScreen()}go.disabled=true;go.textContent='Sending code...';sendReal(function(m){if(m)phoneScreen(m);else otpScreen()})};ph.focus()}
function newCode(){var a=new Uint32Array(1);crypto.getRandomValues(a);st.code=String(100000+a[0]%900000);st.tries=3;st.at=Date.now()}
function otpScreen(){
show('<h2>Verify your number</h2><p class="sub">Enter the 6-digit code for +91 <span id="num"></span></p><div class="demo" id="demo" role="status"></div><div class="otp" id="otp">'+'<input inputmode="numeric" maxlength="1" autocomplete="one-time-code">'.repeat(6)+'</div><p class="err" id="err" role="alert"></p><button class="btn" id="vb" type="button">Verify</button><p class="fine"><span id="rs"></span> <button class="link" id="chg" type="button">Change number</button></p>');
$('#num').textContent=fmt(st.phone);var boxes=[].slice.call(sheet.querySelectorAll('.otp input')),err=$('#err');
function demo(){if(FB){$('#demo').hidden=true;return}$('#demo').textContent='Demo mode: no SMS is sent. Your code is '+st.code+'.'}demo();
boxes.forEach(function(b,i){b.setAttribute('aria-label','Digit '+(i+1));
b.oninput=function(){b.value=b.value.replace(/\D/g,'').slice(-1);if(b.value&&i<5)boxes[i+1].focus();if(boxes.every(function(x){return x.value}))check()};
b.onkeydown=function(e){if(e.key==='Backspace'&&!b.value&&i>0){boxes[i-1].focus()}};
b.onpaste=function(e){var d=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,6);if(!d)return;e.preventDefault();d.split('').forEach(function(c,j){boxes[j].value=c});boxes[Math.min(d.length,5)].focus();if(d.length===6)check()}});
function check(){var v=boxes.map(function(b){return b.value}).join('');err.textContent='';
if(v.length<6){err.textContent='Enter all 6 digits.';return}
if(Date.now()-st.at>3e5){err.textContent='This code has expired. Tap Resend code.';return}
function ok(){var n=HT.users()[st.phone];if(n){if(!HT.set({phone:st.phone,name:n}))return err.textContent='Your browser is blocking storage. Allow it to sign in.';location.replace('home.html')}else nameScreen()}
if(FB){$('#vb').disabled=true;st.conf.confirm(v).then(ok).catch(function(e){$('#vb').disabled=false;if(e&&e.code==='auth/code-expired'){err.textContent='This code has expired. Tap Resend code.';return}bad()});return}
if(v===st.code)return ok();bad();return;
function bad(){st.tries--;boxes.forEach(function(b){b.value=''});boxes[0].focus();
if(st.tries<=0)phoneScreen('Too many wrong codes. Please start again.');else err.textContent='That code is not right. '+st.tries+(st.tries===1?' try':' tries')+' left.'}}
$('#vb').onclick=check;$('#chg').onclick=function(){phoneScreen()};boxes[0].focus();
var left=30;function tick(){var rs=$('#rs');if(!rs)return;if(left>0){rs.textContent='Resend code in '+left+'s';left--}else{clearInterval(timer);rs.textContent='';var b=document.createElement('button');b.className='link';b.type='button';b.textContent='Resend code';b.onclick=function(){if(FB){sendReal(function(m){err.textContent=m||''});}else{newCode();demo()}boxes.forEach(function(x){x.value=''});boxes[0].focus();err.textContent='';left=30;rs.textContent='';timer=setInterval(tick,1000);tick()};rs.appendChild(b)}}
timer=setInterval(tick,1000);tick()}
function nameScreen(){
show('<h2>Create your profile</h2><p class="sub">What should we call you?</p><label class="lbl" for="nm">Your name</label><input class="txt" id="nm" type="text" maxlength="30" autocomplete="name" placeholder="Name"><p class="err" id="err" role="alert"></p><button class="btn" id="go" type="button" disabled>Continue</button>');
var nm=$('#nm'),go=$('#go');nm.oninput=function(){go.disabled=nm.value.trim().length<2};nm.onkeydown=function(e){if(e.key==='Enter'&&!go.disabled)go.click()};
go.onclick=function(){var n=nm.value.trim();if(!HT.save(st.phone,n)||!HT.set({phone:st.phone,name:n}))return $('#err').textContent='Your browser is blocking storage. Allow it to continue.';onboard(0)};nm.focus()}
var SL=[['Discover heritage sites','Temples, caves and museums of Bhubaneswar, with photos and stories.'],['Follow a self-guided walk','Pick a walk and go stop by stop with a progress bar.'],['Know before you go','Hours, fees, photo rules and dress codes for every site.']];
function onboard(i){
show('<div class="dots2">'+SL.map(function(_,j){return'<i'+(j===i?' class="on"':'')+'></i>'}).join('')+'</div><h2 id="ot"></h2><p class="sub" id="od"></p><button class="btn" id="nx" type="button"></button><button class="link skip" id="sk" type="button">Skip</button>');
$('#ot').textContent=SL[i][0];$('#od').textContent=SL[i][1];$('#nx').textContent=i<2?'Next':'Start exploring';
$('#nx').onclick=function(){if(i<2)onboard(i+1);else location.replace('home.html')};$('#sk').onclick=function(){location.replace('home.html')};$('#nx').focus()}
phoneScreen()})();
