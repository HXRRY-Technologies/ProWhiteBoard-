/* ============================================================
   ProWhiteboard SCIENCE ULTRA — Main Application
   Requires: data.js (provides window.PWB_DATA)
   ============================================================ */
(function(){
'use strict';

/* ===== VERIFY DATA LOADED ===== */
if(!window.PWB_DATA){
  document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;line-height:1.6"><h1 style="color:#dc2626">⚠ data.js not found</h1><p>Place <b>data.js</b> in the same folder as <b>index.html</b>, then reload.</p></div>';
  return;
}
var DATA = window.PWB_DATA;
console.log('✓ PWB_DATA ready');

/* ===== SAFE MATH PARSER (no eval/new Function) ===== */
var SafeMath = (function(){
  var F = {sin:1,cos:1,tan:1,asin:1,acos:1,atan:1,sinh:1,cosh:1,tanh:1,
    sqrt:1,abs:1,exp:1,log:1,ln:1,floor:1,ceil:1,round:1,fact:1};
  function tok(s){
    if(typeof s!=='string') throw new Error('Not text');
    if(s.length>300) throw new Error('Too long');
    var r=[],i=0,c;
    while(i<s.length){
      c=s[i];
      if(c===' '||c==='\t'||c==='\n'){ i++; continue; }
      if((c>='0'&&c<='9')||c==='.'){
        var n='';
        while(i<s.length&&((s[i]>='0'&&s[i]<='9')||s[i]==='.')) n+=s[i++];
        if(i<s.length&&(s[i]==='e'||s[i]==='E')){
          n+=s[i++];
          if(i<s.length&&(s[i]==='+'||s[i]==='-')) n+=s[i++];
          while(i<s.length&&s[i]>='0'&&s[i]<='9') n+=s[i++];
        }
        var v=parseFloat(n);
        if(isNaN(v)) throw new Error('Bad num: '+n);
        r.push({t:'n',v:v}); continue;
      }
      if((c>='a'&&c<='z')||(c>='A'&&c<='Z')||c==='_'){
        var id='';
        while(i<s.length&&/[a-zA-Z0-9_]/.test(s[i])) id+=s[i++];
        r.push({t:'i',v:id.toLowerCase()}); continue;
      }
      if('+-*/^%(),!'.indexOf(c)>=0){ r.push({t:'o',v:c}); i++; continue; }
      throw new Error('Bad char: '+c);
    }
    return r;
  }
  function applyFn(name,arg,mode){
    var toR=mode==='DEG'?Math.PI/180:1;
    var fromR=mode==='DEG'?180/Math.PI:1;
    if(name==='sin') return Math.sin(arg*toR);
    if(name==='cos') return Math.cos(arg*toR);
    if(name==='tan') return Math.tan(arg*toR);
    if(name==='asin'){ if(arg<-1||arg>1) throw new Error('asin [-1,1]'); return Math.asin(arg)*fromR; }
    if(name==='acos'){ if(arg<-1||arg>1) throw new Error('acos [-1,1]'); return Math.acos(arg)*fromR; }
    if(name==='atan') return Math.atan(arg)*fromR;
    if(name==='sinh') return Math.sinh(arg);
    if(name==='cosh') return Math.cosh(arg);
    if(name==='tanh') return Math.tanh(arg);
    if(name==='sqrt'){ if(arg<0) throw new Error('√ negative'); return Math.sqrt(arg); }
    if(name==='abs') return Math.abs(arg);
    if(name==='exp') return Math.exp(arg);
    if(name==='log'){ if(arg<=0) throw new Error('log domain'); return Math.log10(arg); }
    if(name==='ln'){ if(arg<=0) throw new Error('ln domain'); return Math.log(arg); }
    if(name==='floor') return Math.floor(arg);
    if(name==='ceil') return Math.ceil(arg);
    if(name==='round') return Math.round(arg);
    if(name==='fact'){
      if(arg<0||arg!==Math.floor(arg)) throw new Error('n! integer');
      if(arg>170) throw new Error('n! too big');
      var f=1; for(var k=2;k<=arg;k++) f*=k; return f;
    }
    throw new Error('Unknown: '+name);
  }
  function parse(expr,opts){
    opts=opts||{};
    var mode=opts.angleMode==='RAD'?'RAD':'DEG';
    var vars=opts.vars||{};
    var t=tok(expr);
    if(!t.length) throw new Error('Empty');
    var p=0;
    function peek(){ return t[p]; }
    function next(){ return t[p++]; }
    function expect(v){ var tk=peek(); if(!tk||tk.t!=='o'||tk.v!==v) throw new Error('Expected "'+v+'"'); next(); }
    function A(){ var l=M(); while(peek()&&peek().t==='o'&&(peek().v==='+'||peek().v==='-')){ var op=next().v; var r=M(); l=op==='+'?l+r:l-r; } return l; }
    function M(){ var l=U(); while(peek()&&peek().t==='o'&&(peek().v==='*'||peek().v==='/'||peek().v==='%')){ var op=next().v; var r=U(); if(op==='*') l*=r; else if(op==='/'){ if(r===0) throw new Error('÷0'); l/=r; } else l%=r; } return l; }
    function U(){
      if(peek()&&peek().t==='o'&&peek().v==='-'){ next(); return -U(); }
      if(peek()&&peek().t==='o'&&peek().v==='+'){ next(); return U(); }
      var b=P();
      if(peek()&&peek().t==='o'&&peek().v==='!'){ next(); return applyFn('fact',b,mode); }
      return b;
    }
    function P(){ var b=At(); if(peek()&&peek().t==='o'&&peek().v==='^'){ next(); return Math.pow(b,U()); } return b; }
    function At(){
      var tk=peek();
      if(!tk) throw new Error('Unexpected end');
      if(tk.t==='n'){ next(); return tk.v; }
      if(tk.t==='i'){
        next(); var n=tk.v;
        if(peek()&&peek().t==='o'&&peek().v==='('){
          next(); var arg=A(); expect(')');
          if(!F[n]) throw new Error('Unknown fn: '+n);
          return applyFn(n,arg,mode);
        }
        if(n==='pi') return Math.PI;
        if(n==='e') return Math.E;
        if(vars[n]!==undefined) return vars[n];
        throw new Error('Unknown var: '+n);
      }
      if(tk.t==='o'&&tk.v==='('){ next(); var v=A(); expect(')'); return v; }
      throw new Error('Unexpected: '+(tk.v||tk.t));
    }
    var r=A();
    if(p<t.length) throw new Error('Extra tokens');
    if(typeof r!=='number'||!isFinite(r)) throw new Error('Not finite');
    return r;
  }
  return {parse:parse};
})();

/* ===== STATE ===== */
var S = {
  pages: [{id:'p_'+Date.now(), name:'Page 1', objects:[], background:'dots', undoStack:[], redoStack:[]}],
  currentPageId: null,
  tool: 'pen', color: '#0a1222', fill: 'none', size: 3, opacity: 1,
  fontSize: 18, fontFamily: 'Inter', fontWeight: 600, stickyColor: '#fef3c7',
  lineStyle: 'solid', zoom: 1, ox: 0, oy: 0, selectedIds: [], boardName: 'My Board',
  laserMode: false, angleMode: 'DEG'
};
S.currentPageId = S.pages[0].id;
Object.defineProperty(S, 'objects', {
  get: function(){ for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId) return S.pages[i].objects; return []; },
  set: function(v){ for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId){ S.pages[i].objects=v; return; } }
});

/* ===== DOM REFS ===== */
function $(s){ return document.querySelector(s); }
function $$(s){ return document.querySelectorAll(s); }
var cv = $('#cv'), ctx = cv.getContext('2d'), canvasWrap = $('#canvasWrap');
var dpr = Math.min(window.devicePixelRatio||1, 2);

/* ===== UTILITIES ===== */
function uid(){ return 'o'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
var toastTimer;
function toast(m){
  var t = $('#toast'); if(!t) return;
  t.textContent = m; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2000);
}
function esc(s){ return String(s).replace(/[<>&"']/g,function(c){ return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]; }); }
function currentPage(){ for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId) return S.pages[i]; return null; }

/* ===== HISTORY ===== */
function snapshot(){
  var p = currentPage(); if(!p) return;
  p.undoStack.push(JSON.stringify({objects:p.objects, selectedIds:S.selectedIds}));
  if(p.undoStack.length>50) p.undoStack.shift();
  p.redoStack.length = 0;
}
function undo(){
  var p = currentPage();
  if(!p || !p.undoStack.length){ toast('Nothing to undo'); return; }
  p.redoStack.push(JSON.stringify({objects:p.objects, selectedIds:S.selectedIds}));
  var d = JSON.parse(p.undoStack.pop());
  S.objects = d.objects; S.selectedIds = d.selectedIds || [];
  render(); buildPanel(); save();
}
function redo(){
  var p = currentPage();
  if(!p || !p.redoStack.length){ toast('Nothing to redo'); return; }
  p.undoStack.push(JSON.stringify({objects:p.objects, selectedIds:S.selectedIds}));
  var d = JSON.parse(p.redoStack.pop());
  S.objects = d.objects; S.selectedIds = d.selectedIds || [];
  render(); buildPanel(); save();
}

/* ===== PAGES ===== */
function goToPage(id){
  for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===id){
    S.currentPageId = id; S.selectedIds = [];
    var p = currentPage();
    canvasWrap.className = 'bg-'+(p.background||'dots');
    updatePageNav(); render(); buildPanel(); save();
    return;
  }
}
function nextPage(){
  for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId && i<S.pages.length-1){ goToPage(S.pages[i+1].id); return; }
  toast('Last page');
}
function prevPage(){
  for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId && i>0){ goToPage(S.pages[i-1].id); return; }
  toast('First page');
}
function addPage(){
  if(S.pages.length>=100){ toast('Limit reached (100)'); return; }
  var id = 'p_'+Date.now()+'_'+Math.random().toString(36).slice(2,6);
  S.pages.push({id:id, name:'Page '+(S.pages.length+1), objects:[], background:(currentPage()&&currentPage().background)||'dots', undoStack:[], redoStack:[]});
  goToPage(id); toast('Page added');
}
function updatePageNav(){
  var idx = 0;
  for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId){ idx = i; break; }
  $('#pageInd').textContent = (idx+1)+'/'+S.pages.length;
}

/* ===== CANVAS ===== */
function resize(){
  var r = canvasWrap.getBoundingClientRect();
  if(r.width<=0 || r.height<=0) return;
  dpr = Math.min(window.devicePixelRatio||1, 2);
  cv.width = Math.floor(r.width*dpr);
  cv.height = Math.floor(r.height*dpr);
  cv.style.width = r.width+'px';
  cv.style.height = r.height+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  render();
}
function toWorld(sx,sy){ return {x:(sx-S.ox)/S.zoom, y:(sy-S.oy)/S.zoom}; }
function getPos(e){
  var r = cv.getBoundingClientRect();
  var cx,cy;
  if(e.touches&&e.touches.length){ cx=e.touches[0].clientX; cy=e.touches[0].clientY; }
  else if(e.changedTouches&&e.changedTouches.length){ cx=e.changedTouches[0].clientX; cy=e.changedTouches[0].clientY; }
  else { cx=e.clientX; cy=e.clientY; }
  return {x:cx-r.left, y:cy-r.top};
}

/* ===== RENDER ===== */
var currentObj=null, isDrawing=false, isPanning=false, panStart=null;
var drag=null, resizeDrag=null, selBox=null, pinchInfo=null;

function render(){
  var w = cv.width/dpr, h = cv.height/dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  ctx.save();
  ctx.translate(S.ox,S.oy);
  ctx.scale(S.zoom,S.zoom);
  for(var i=0;i<S.objects.length;i++) if(!S.objects[i].hidden) drawObject(S.objects[i]);
  if(currentObj) drawObject(currentObj);
  if(S.selectedIds.length) drawSelection();
  ctx.restore();
  var st = $('#stCount'); if(st) st.textContent = S.objects.length;
}

function drawObject(o){
  ctx.save();
  ctx.globalAlpha = (o.opacity!==undefined ? o.opacity : 1);
  if(o.type==='stroke') drawStroke(o);
  else if(o.type==='shape') drawShape(o);
  else if(o.type==='text') drawText(o);
  else if(o.type==='sticky') drawSticky(o);
  else if(o.type==='image') drawImage(o);
  ctx.restore();
}

function drawStroke(o){
  var pts = o.points;
  if(!pts||!pts.length) return;
  ctx.strokeStyle = o.color; ctx.fillStyle = o.color;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  var pen = o.pen, sz = o.size;
  if(pts.length===1){
    ctx.beginPath();
    ctx.arc(pts[0].x, pts[0].y, Math.max(sz/2,1), 0, Math.PI*2);
    ctx.fill(); return;
  }
  if(pen==='highlighter'){ ctx.globalAlpha*=0.35; ctx.lineCap='butt'; ctx.lineWidth=sz*3; }
  else if(pen==='pencil') ctx.lineWidth = Math.max(sz*0.6, 1);
  else if(pen==='marker') ctx.lineWidth = sz*1.5;
  else ctx.lineWidth = sz;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for(var i=1;i<pts.length-1;i++){
    var xc = (pts[i].x+pts[i+1].x)/2, yc = (pts[i].y+pts[i+1].y)/2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
  }
  if(pts.length>1) ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
  ctx.stroke();
}

function drawShape(o){
  var x1=o.x1,y1=o.y1,x2=o.x2,y2=o.y2;
  ctx.strokeStyle = o.color; ctx.lineWidth = o.size;
  ctx.lineCap='round'; ctx.lineJoin='round';
  if(o.lineStyle==='dashed') ctx.setLineDash([o.size*2.5, o.size*1.5]);
  else if(o.lineStyle==='dotted') ctx.setLineDash([o.size*0.5, o.size*1.5]);
  else ctx.setLineDash([]);
  var hasFill = o.fill && o.fill!=='none';
  if(hasFill) ctx.fillStyle = o.fill;
  var x=Math.min(x1,x2), y=Math.min(y1,y2);
  var w=Math.abs(x2-x1), h=Math.abs(y2-y1);
  var cx=x+w/2, cy=y+h/2;
  if(o.shape==='rect'){ if(hasFill) ctx.fillRect(x,y,w,h); ctx.strokeRect(x,y,w,h); }
  else if(o.shape==='circle'){ ctx.beginPath(); ctx.ellipse(cx,cy,w/2,h/2,0,0,Math.PI*2); if(hasFill) ctx.fill(); ctx.stroke(); }
  else if(o.shape==='line'){ ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); }
  else if(o.shape==='arrow'){
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    ctx.setLineDash([]);
    var ang = Math.atan2(y2-y1,x2-x1), al = Math.max(12, o.size*3);
    ctx.beginPath();
    ctx.moveTo(x2,y2); ctx.lineTo(x2-al*Math.cos(ang-Math.PI/6), y2-al*Math.sin(ang-Math.PI/6));
    ctx.moveTo(x2,y2); ctx.lineTo(x2-al*Math.cos(ang+Math.PI/6), y2-al*Math.sin(ang+Math.PI/6));
    ctx.stroke();
  }
  else if(o.shape==='triangle'){
    ctx.beginPath(); ctx.moveTo(cx,y); ctx.lineTo(x+w,y+h); ctx.lineTo(x,y+h); ctx.closePath();
    if(hasFill) ctx.fill(); ctx.stroke();
  }
  else if(o.shape==='star'){
    var R = Math.min(w,h)/2, r = R*0.42;
    ctx.beginPath();
    for(var i=0;i<10;i++){
      var rad = (i%2===0)?R:r;
      var a = -Math.PI/2 + i*Math.PI/5;
      var px = cx+Math.cos(a)*rad, py = cy+Math.sin(a)*rad;
      if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    if(hasFill) ctx.fill(); ctx.stroke();
  }
  else if(o.shape==='diamond'){
    ctx.beginPath();
    ctx.moveTo(cx,y); ctx.lineTo(x+w,cy); ctx.lineTo(cx,y+h); ctx.lineTo(x,cy);
    ctx.closePath();
    if(hasFill) ctx.fill(); ctx.stroke();
  }
  else if(o.shape==='pentagon'||o.shape==='hexagon'){
    var sides = o.shape==='pentagon'?5:6, R=Math.min(w,h)/2;
    ctx.beginPath();
    for(var i=0;i<sides;i++){
      var a = -Math.PI/2 + i*2*Math.PI/sides;
      var px = cx+Math.cos(a)*R, py = cy+Math.sin(a)*R;
      if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    if(hasFill) ctx.fill(); ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawText(o){
  ctx.fillStyle = o.color;
  ctx.font = (o.fontWeight||600)+' '+o.fontSize+'px '+o.fontFamily+', system-ui';
  ctx.textBaseline = 'top';
  var lines = (o.text||'').split('\n');
  var lh = o.fontSize*1.35;
  for(var i=0;i<lines.length;i++) ctx.fillText(lines[i], o.x, o.y+i*lh);
}

function drawSticky(o){
  var pad=12, r=5;
  ctx.fillStyle = o.bg||'#fef3c7';
  ctx.strokeStyle = 'rgba(0,0,0,.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(o.x+r,o.y);
  ctx.lineTo(o.x+o.w-r,o.y); ctx.quadraticCurveTo(o.x+o.w,o.y,o.x+o.w,o.y+r);
  ctx.lineTo(o.x+o.w,o.y+o.h-r); ctx.quadraticCurveTo(o.x+o.w,o.y+o.h,o.x+o.w-r,o.y+o.h);
  ctx.lineTo(o.x+r,o.y+o.h); ctx.quadraticCurveTo(o.x,o.y+o.h,o.x,o.y+o.h-r);
  ctx.lineTo(o.x,o.y+r); ctx.quadraticCurveTo(o.x,o.y,o.x+r,o.y);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = o.color||'#1f2937';
  ctx.font = '500 '+(o.fontSize||14)+'px Inter, system-ui';
  ctx.textBaseline = 'top';
  var lines = (o.text||'Sticky').split('\n');
  var lh = (o.fontSize||14)*1.4;
  var cy = o.y+pad;
  for(var i=0;i<lines.length;i++){
    if(cy<o.y+o.h-pad){ ctx.fillText(lines[i], o.x+pad, cy, o.w-pad*2); cy+=lh; }
  }
}

function drawImage(o){
  if(!o._img){ o._img = new Image(); o._img.onload = function(){ render(); }; o._img.src = o.src; return; }
  if(!o._img.complete) return;
  try { ctx.drawImage(o._img, o.x, o.y, o.w, o.h); } catch(e){}
}

/* ===== BOUNDS / HIT TEST ===== */
function getBounds(o){
  if(o.type==='stroke'){
    var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    for(var i=0;i<o.points.length;i++){
      var p = o.points[i];
      if(p.x<minX) minX=p.x; if(p.x>maxX) maxX=p.x;
      if(p.y<minY) minY=p.y; if(p.y>maxY) maxY=p.y;
    }
    var pad = o.size*2;
    return {x:minX-pad, y:minY-pad, w:maxX-minX+pad*2, h:maxY-minY+pad*2};
  }
  if(o.type==='shape') return {x:Math.min(o.x1,o.x2)-4, y:Math.min(o.y1,o.y2)-4, w:Math.abs(o.x2-o.x1)+8, h:Math.abs(o.y2-o.y1)+8};
  if(o.type==='text'){
    ctx.font = (o.fontWeight||600)+' '+o.fontSize+'px '+o.fontFamily;
    var lines = (o.text||'').split('\n');
    var mw = 0;
    for(var i=0;i<lines.length;i++){ var tw = ctx.measureText(lines[i]).width; if(tw>mw) mw=tw; }
    return {x:o.x-4, y:o.y-4, w:mw+8, h:lines.length*o.fontSize*1.35+8};
  }
  if(o.type==='sticky'||o.type==='image') return {x:o.x, y:o.y, w:o.w, h:o.h};
  return {x:0,y:0,w:0,h:0};
}

function hitTest(wx,wy){
  for(var i=S.objects.length-1;i>=0;i--){
    var o = S.objects[i];
    if(o.hidden||o.locked) continue;
    var b = getBounds(o);
    if(wx>=b.x && wx<=b.x+b.w && wy>=b.y && wy<=b.y+b.h){
      if(o.type==='stroke'){
        for(var j=0;j<o.points.length;j++){
          if(Math.hypot(o.points[j].x-wx, o.points[j].y-wy) < Math.max(o.size, 8)) return o;
        }
      } else return o;
    }
  }
  return null;
}

function drawSelection(){
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(var i=0;i<S.selectedIds.length;i++){
    var o = S.objects.find(function(x){ return x.id===S.selectedIds[i]; });
    if(!o) continue;
    var b = getBounds(o);
    if(b.x<minX) minX=b.x; if(b.y<minY) minY=b.y;
    if(b.x+b.w>maxX) maxX=b.x+b.w; if(b.y+b.h>maxY) maxY=b.y+b.h;
  }
  if(!isFinite(minX)) return;
  var b = {x:minX, y:minY, w:maxX-minX, h:maxY-minY};
  var hs = 6/S.zoom;
  ctx.strokeStyle = '#4f46e5'; ctx.lineWidth = 1.5/S.zoom;
  ctx.setLineDash([4/S.zoom, 3/S.zoom]);
  ctx.strokeRect(b.x, b.y, b.w, b.h);
  ctx.setLineDash([]);
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#4f46e5';
  var handles = [[b.x,b.y],[b.x+b.w/2,b.y],[b.x+b.w,b.y],[b.x,b.y+b.h/2],[b.x+b.w,b.y+b.h/2],[b.x,b.y+b.h],[b.x+b.w/2,b.y+b.h],[b.x+b.w,b.y+b.h]];
  for(var i=0;i<handles.length;i++){
    ctx.beginPath();
    ctx.rect(handles[i][0]-hs/2, handles[i][1]-hs/2, hs, hs);
    ctx.fill(); ctx.stroke();
  }
}

/* ===== INTERACTION ===== */
function onDown(e){
  if(e.type==='mousedown' && e.button!==0 && e.button!==1) return;
  if(e.preventDefault) e.preventDefault();
  var pos = getPos(e);
  var w = toWorld(pos.x, pos.y);
  if(S.laserMode){
    render();
    ctx.save();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var g = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,30);
    g.addColorStop(0,'rgba(239,68,68,.9)');
    g.addColorStop(0.5,'rgba(239,68,68,.4)');
    g.addColorStop(1,'rgba(239,68,68,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,30,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
    return;
  }
  if(S.tool==='pan' || (e.type==='mousedown' && e.button===1)){
    isPanning = true;
    panStart = {x:pos.x, y:pos.y, ox:S.ox, oy:S.oy};
    cv.classList.add('grabbing');
    return;
  }
  if(S.tool==='select'){
    if(S.selectedIds.length===1){
      var o = S.objects.find(function(x){ return x.id===S.selectedIds[0]; });
      if(o && !o.locked){
        var b = getBounds(o);
        var hs = 8/S.zoom;
        var names = ['nw','n','ne','e','se','s','sw','w'];
        var coords = [[b.x,b.y],[b.x+b.w/2,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h/2],[b.x+b.w,b.y+b.h],[b.x+b.w/2,b.y+b.h],[b.x,b.y+b.h],[b.x,b.y+b.h/2]];
        for(var i=0;i<coords.length;i++){
          if(Math.abs(w.x-coords[i][0])<hs && Math.abs(w.y-coords[i][1])<hs){
            snapshot();
            resizeDrag = {o:o, handle:names[i], b:{x:b.x,y:b.y,w:b.w,h:b.h}, orig:JSON.parse(JSON.stringify(o)), startX:w.x, startY:w.y};
            return;
          }
        }
      }
    }
    var hit = hitTest(w.x, w.y);
    if(hit){
      if(S.selectedIds.indexOf(hit.id)<0){
        S.selectedIds = e.shiftKey ? S.selectedIds.concat([hit.id]) : [hit.id];
      }
      snapshot();
      var selObs = S.selectedIds.map(function(id){ return S.objects.find(function(x){ return x.id===id; }); }).filter(Boolean);
      drag = {startX:w.x, startY:w.y, origins:selObs.map(function(ob){ return {o:ob, orig:JSON.parse(JSON.stringify(ob))}; })};
      render(); buildPanel();
    } else {
      selBox = {x1:w.x, y1:w.y, x2:w.x, y2:w.y};
      if(!e.shiftKey) S.selectedIds = [];
      render();
    }
    return;
  }
  if(S.tool==='eraser'){
    var hit = hitTest(w.x, w.y);
    if(hit){
      snapshot();
      S.objects = S.objects.filter(function(x){ return x.id!==hit.id; });
      S.selectedIds = [];
      render(); buildPanel(); save();
    }
    return;
  }
  if(S.tool==='text'){
    var modal = $('#textModal');
    modal.dataset.x = w.x;
    modal.dataset.y = w.y;
    modal.dataset.editId = '';
    $('#textTitle').textContent = 'Enter text';
    $('#textInput').value = '';
    modal.classList.add('open');
    setTimeout(function(){ $('#textInput').focus(); }, 50);
    return;
  }
  if(S.tool==='sticky'){
    snapshot();
    var obj = {id:uid(), type:'sticky', x:w.x-70, y:w.y-70, w:140, h:140, text:'Double-click to edit', bg:S.stickyColor, color:'#1f2937', fontSize:14, opacity:1};
    S.objects.push(obj);
    S.selectedIds = [obj.id];
    setTool('select');
    render(); buildPanel(); save();
    toast('Sticky added');
    return;
  }
  snapshot();
  var pens = ['pen','pencil','marker','highlighter'];
  var shapes = ['line','arrow','rect','circle','triangle','star','diamond','pentagon','hexagon'];
  if(pens.indexOf(S.tool)>=0){
    currentObj = {id:uid(), type:'stroke', pen:S.tool, points:[{x:w.x,y:w.y}], color:S.color, size:S.size, opacity:S.opacity};
    isDrawing = true;
  } else if(shapes.indexOf(S.tool)>=0){
    currentObj = {id:uid(), type:'shape', shape:S.tool, x1:w.x, y1:w.y, x2:w.x, y2:w.y, color:S.color, fill:S.fill, size:S.size, opacity:S.opacity, lineStyle:S.lineStyle};
    isDrawing = true;
  }
}

function onMove(e){
  if(e.preventDefault) e.preventDefault();
  var pos = getPos(e);
  var w = toWorld(pos.x, pos.y);
  var stPos = $('#stPos'); if(stPos) stPos.textContent = Math.round(w.x)+', '+Math.round(w.y);
  if(S.laserMode){
    render();
    ctx.save();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var g = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,30);
    g.addColorStop(0,'rgba(239,68,68,.9)');
    g.addColorStop(0.5,'rgba(239,68,68,.4)');
    g.addColorStop(1,'rgba(239,68,68,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,30,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
    return;
  }
  if(isPanning && panStart){
    S.ox = panStart.ox + (pos.x-panStart.x);
    S.oy = panStart.oy + (pos.y-panStart.y);
    render(); return;
  }
  if(drag){
    var dx = w.x-drag.startX, dy = w.y-drag.startY;
    for(var i=0;i<drag.origins.length;i++) applyTranslate(drag.origins[i].o, drag.origins[i].orig, dx, dy);
    render(); return;
  }
  if(resizeDrag){
    applyResize(resizeDrag, w.x-resizeDrag.startX, w.y-resizeDrag.startY);
    render(); return;
  }
  if(selBox){
    selBox.x2 = w.x; selBox.y2 = w.y;
    render();
    ctx.save();
    ctx.translate(S.ox, S.oy);
    ctx.scale(S.zoom, S.zoom);
    ctx.strokeStyle = '#4f46e5';
    ctx.fillStyle = 'rgba(79,70,229,0.1)';
    ctx.lineWidth = 1/S.zoom;
    ctx.setLineDash([4/S.zoom, 3/S.zoom]);
    var sx = Math.min(selBox.x1, selBox.x2), sy = Math.min(selBox.y1, selBox.y2);
    var sw = Math.abs(selBox.x2-selBox.x1), sh = Math.abs(selBox.y2-selBox.y1);
    ctx.fillRect(sx, sy, sw, sh);
    ctx.strokeRect(sx, sy, sw, sh);
    ctx.restore();
    return;
  }
  if(!isDrawing || !currentObj) return;
  if(currentObj.type==='stroke'){
    var pts = currentObj.points;
    var last = pts[pts.length-1];
    if(Math.hypot(w.x-last.x, w.y-last.y) > 1/S.zoom) pts.push({x:w.x, y:w.y});
  } else if(currentObj.type==='shape'){
    currentObj.x2 = w.x;
    currentObj.y2 = w.y;
    if(e.shiftKey){
      var ddx = w.x-currentObj.x1, ddy = w.y-currentObj.y1;
      var m = Math.max(Math.abs(ddx), Math.abs(ddy));
      currentObj.x2 = currentObj.x1 + Math.sign(ddx)*m;
      currentObj.y2 = currentObj.y1 + Math.sign(ddy)*m;
    }
  }
  render();
}

function onUp(e){
  if(e && e.preventDefault) e.preventDefault();
  cv.classList.remove('grabbing');
  if(S.laserMode){ render(); return; }
  if(isPanning){ isPanning = false; panStart = null; return; }
  if(selBox){
    var sx = Math.min(selBox.x1, selBox.x2), sy = Math.min(selBox.y1, selBox.y2);
    var sw = Math.abs(selBox.x2-selBox.x1), sh = Math.abs(selBox.y2-selBox.y1);
    if(sw>4 && sh>4){
      for(var i=0;i<S.objects.length;i++){
        var o = S.objects[i];
        if(o.hidden||o.locked) continue;
        var b = getBounds(o);
        if(b.x<sx+sw && b.x+b.w>sx && b.y<sy+sh && b.y+b.h>sy){
          if(S.selectedIds.indexOf(o.id)<0) S.selectedIds.push(o.id);
        }
      }
    }
    selBox = null;
    render(); buildPanel();
    return;
  }
  if(drag){ drag = null; render(); buildPanel(); save(); return; }
  if(resizeDrag){ resizeDrag = null; render(); buildPanel(); save(); return; }
  if(isDrawing && currentObj){
    if(currentObj.type==='shape'){
      var dx = currentObj.x2-currentObj.x1, dy = currentObj.y2-currentObj.y1;
      if(Math.hypot(dx,dy)>3) S.objects.push(currentObj);
    } else if(currentObj.type==='stroke'){
      S.objects.push(currentObj);
    }
    currentObj = null; isDrawing = false;
    render(); buildPanel(); save();
  }
}

function applyTranslate(o, orig, dx, dy){
  if(orig.type==='stroke') o.points = orig.points.map(function(p){ return {x:p.x+dx, y:p.y+dy}; });
  else if(orig.type==='shape'){ o.x1=orig.x1+dx; o.y1=orig.y1+dy; o.x2=orig.x2+dx; o.y2=orig.y2+dy; }
  else { o.x = orig.x+dx; o.y = orig.y+dy; }
}

function applyResize(rs, dx, dy){
  var o = rs.o, handle = rs.handle, b = rs.b, orig = rs.orig;
  var nx=b.x, ny=b.y, nw=b.w, nh=b.h;
  if(handle.indexOf('e')>=0) nw = b.w+dx;
  if(handle.indexOf('s')>=0) nh = b.h+dy;
  if(handle.indexOf('w')>=0){ nx = b.x+dx; nw = b.w-dx; }
  if(handle.indexOf('n')>=0){ ny = b.y+dy; nh = b.h-dy; }
  nw = Math.max(nw, 12); nh = Math.max(nh, 12);
  var sx = nw/(b.w||1), sy = nh/(b.h||1);
  if(orig.type==='stroke'){
    o.points = orig.points.map(function(p){ return {x:nx+(p.x-b.x)*sx, y:ny+(p.y-b.y)*sy}; });
  } else if(orig.type==='shape'){
    var dirX = orig.x2>=orig.x1?1:-1, dirY = orig.y2>=orig.y1?1:-1;
    o.x1=nx; o.y1=ny; o.x2=nx+nw*dirX; o.y2=ny+nh*dirY;
    if(dirX<0){ o.x1=nx+nw; o.x2=nx; }
    if(dirY<0){ o.y1=ny+nh; o.y2=ny; }
  } else if(orig.type==='text'){
    o.fontSize = Math.max(8, orig.fontSize*Math.min(sx,sy));
  } else { o.x=nx; o.y=ny; o.w=nw; o.h=nh; }
}

/* ===== BIND CANVAS EVENTS ===== */
cv.addEventListener('mousedown', onDown);
cv.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);
cv.addEventListener('touchstart', function(e){
  if(e.touches.length===1) onDown(e);
  else if(e.touches.length===2){
    var t1 = e.touches[0], t2 = e.touches[1];
    pinchInfo = {dist:Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY), cx:(t1.clientX+t2.clientX)/2, cy:(t1.clientY+t2.clientY)/2, ox:S.ox, oy:S.oy, zoom:S.zoom};
    isDrawing = false; currentObj = null;
  }
}, {passive:false});
cv.addEventListener('touchmove', function(e){
  if(e.touches.length===1) onMove(e);
  else if(e.touches.length===2 && pinchInfo){
    e.preventDefault();
    var t1 = e.touches[0], t2 = e.touches[1];
    var newDist = Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY);
    var factor = newDist/pinchInfo.dist;
    var newZoom = clamp(pinchInfo.zoom*factor, 0.1, 5);
    var r = cv.getBoundingClientRect();
    var cx = pinchInfo.cx - r.left, cy = pinchInfo.cy - r.top;
    var wx = (cx-pinchInfo.ox)/pinchInfo.zoom, wy = (cy-pinchInfo.oy)/pinchInfo.zoom;
    S.zoom = newZoom;
    S.ox = cx - wx*newZoom;
    S.oy = cy - wy*newZoom;
    S.ox += (t1.clientX+t2.clientX)/2 - pinchInfo.cx;
    S.oy += (t1.clientY+t2.clientY)/2 - pinchInfo.cy;
    updateZoomLabel(); render();
  }
}, {passive:false});
cv.addEventListener('touchend', function(e){ if(e.touches.length===0){ pinchInfo = null; onUp(e); } }, {passive:false});
cv.addEventListener('dblclick', function(e){
  var pos = getPos(e);
  var w = toWorld(pos.x, pos.y);
  var hit = hitTest(w.x, w.y);
  if(hit && (hit.type==='text' || hit.type==='sticky')){
    var modal = $('#textModal');
    modal.dataset.x = hit.x;
    modal.dataset.y = hit.y;
    modal.dataset.editId = hit.id;
    $('#textTitle').textContent = 'Edit text';
    $('#textInput').value = hit.text || '';
    modal.classList.add('open');
    setTimeout(function(){ $('#textInput').focus(); }, 50);
  }
});
cv.addEventListener('wheel', function(e){
  e.preventDefault();
  if(e.ctrlKey || e.metaKey){
    var pos = getPos(e);
    var w = toWorld(pos.x, pos.y);
    var factor = e.deltaY<0 ? 1.12 : 1/1.12;
    S.zoom = clamp(S.zoom*factor, 0.1, 5);
    S.ox = pos.x - w.x*S.zoom;
    S.oy = pos.y - w.y*S.zoom;
  } else {
    S.ox -= e.deltaX;
    S.oy -= e.deltaY;
  }
  updateZoomLabel(); render();
}, {passive:false});

/* ===== TOOLBAR ===== */
var TOOL_ICONS = {
  select:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7 17 2-7 7-2z"/></svg>',
  pan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/><path d="M15 5l4 4"/></svg>',
  marker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l-6 6v3h9l3-3"/><path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>',
  highlighter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4l6 6-8 8H6v-6z"/><path d="M2 22h20"/></svg>',
  line:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="20" x2="20" y2="4"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="20" x2="20" y2="4"/><polyline points="10 4 20 4 20 14"/></svg>',
  rect:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1.5"/></svg>',
  circle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>',
  triangle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l10 18H2z"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/></svg>',
  diamond:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 12 12 22 2 12"/></svg>',
  pentagon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 9 18 21 6 21 2 9"/></svg>',
  hexagon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7 2 17 2 22 12 17 22 7 22 2 12"/></svg>',
  text:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
  sticky:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11l5-5V5a2 2 0 0 0-2-2z"/><polyline points="16 3 16 8 21 8"/></svg>',
  eraser:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16"/><path d="M20.5 13.5L13 6a2.83 2.83 0 0 0-4 0L4 11a2.83 2.83 0 0 0 0 4l4 4h6l6.5-5.5z"/></svg>'
};
var TOOL_NAMES = {select:'Select',pan:'Pan',pen:'Pen',pencil:'Pencil',marker:'Marker',highlighter:'Highlighter',line:'Line',arrow:'Arrow',rect:'Rect',circle:'Circle',triangle:'Triangle',star:'Star',diamond:'Diamond',pentagon:'Pentagon',hexagon:'Hexagon',text:'Text',sticky:'Sticky',eraser:'Eraser'};
var TOOL_GROUPS = [['select','pan'],['pen','pencil','marker','highlighter'],['line','arrow','rect','circle','triangle','star','diamond','pentagon','hexagon'],['text','sticky','eraser']];

function buildToolbar(){
  var html = '';
  for(var g=0;g<TOOL_GROUPS.length;g++){
    if(g>0) html += '<div class="tb-sep"></div>';
    for(var i=0;i<TOOL_GROUPS[g].length;i++){
      var t = TOOL_GROUPS[g][i];
      html += '<button class="tool'+(t===S.tool?' active':'')+'" data-tool="'+t+'" data-tip="'+(TOOL_NAMES[t]||t)+'" aria-label="'+(TOOL_NAMES[t]||t)+'">'+(TOOL_ICONS[t]||TOOL_ICONS.pen)+'</button>';
    }
  }
  $('#toolbar').innerHTML = html;
  $$('.tool').forEach(function(b){
    b.addEventListener('click', function(){ setTool(b.getAttribute('data-tool')); });
  });
}
function setTool(t){
  S.tool = t;
  $$('.tool').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tool')===t); });
  updateCursor();
  var st = $('#stTool'); if(st) st.textContent = TOOL_NAMES[t]||t;
}
function updateCursor(){
  cv.className = '';
  if(S.tool==='select') cv.classList.add('t-select');
  else if(S.tool==='pan') cv.classList.add('t-pan');
  else if(S.tool==='text') cv.classList.add('t-text');
}

/* ===== ACTIONS ===== */
function deleteSel(){
  if(!S.selectedIds.length){ toast('Nothing selected'); return; }
  snapshot();
  S.objects = S.objects.filter(function(o){ return S.selectedIds.indexOf(o.id)<0; });
  S.selectedIds = [];
  render(); buildPanel(); save();
}
function duplicateSel(){
  if(!S.selectedIds.length){ toast('Nothing selected'); return; }
  snapshot();
  var newIds = [];
  var obs = S.selectedIds.map(function(id){ return S.objects.find(function(x){ return x.id===id; }); }).filter(Boolean);
  for(var i=0;i<obs.length;i++){
    var c = JSON.parse(JSON.stringify(obs[i]));
    c.id = uid();
    delete c._img;
    applyTranslate(c, c, 20, 20);
    S.objects.push(c);
    newIds.push(c.id);
  }
  S.selectedIds = newIds;
  render(); buildPanel(); save();
}

/* ===== PANEL ===== */
var COLORS = ['#0a1222','#64708c','#94a3b8','#ef4444','#f97316','#f59e0b','#84cc16','#22c55e','#10b981','#14b8a6','#06b6d4','#3b82f6','#4f46e5','#8b5cf6','#d946ef','#ec4899','#e11d48','#ffffff'];
var FILLS = ['none','#fef3c7','#fee2e2','#dbeafe','#dcfce7','#f3e8ff','#fce7f3','#fef9c3'];
var STICKIES = ['#fef3c7','#fecdd3','#dbeafe','#dcfce7','#f3e8ff','#fed7aa'];
var BGS = ['plain','dots','grid','lines'];

function buildPanel(){
  var colorSwatches = '';
  for(var i=0;i<COLORS.length;i++) colorSwatches += '<div class="sw'+(COLORS[i]===S.color?' active':'')+'" data-color="'+COLORS[i]+'" style="background:'+COLORS[i]+'" role="button" tabindex="0" aria-label="Color '+COLORS[i]+'"></div>';
  var fillSwatches = '';
  for(var i=0;i<FILLS.length;i++){
    var bg = FILLS[i]==='none'?'repeating-linear-gradient(45deg,#eef1f8 0 3px,#e2e7f2 3px 6px)':FILLS[i];
    fillSwatches += '<div class="sw'+(FILLS[i]===S.fill?' active':'')+'" data-fill="'+FILLS[i]+'" style="background:'+bg+'"></div>';
  }
  var stickySwatches = '';
  for(var i=0;i<STICKIES.length;i++) stickySwatches += '<div class="sw'+(STICKIES[i]===S.stickyColor?' active':'')+'" data-sticky="'+STICKIES[i]+'" style="background:'+STICKIES[i]+'"></div>';
  var bgOpts = '', p = currentPage(), pgBg = p?p.background:'dots';
  for(var i=0;i<BGS.length;i++) bgOpts += '<div class="bg '+BGS[i]+(BGS[i]===pgBg?' active':'')+'" data-bg="'+BGS[i]+'"></div>';
  var layerHtml = '';
  if(S.objects.length===0){
    layerHtml = '<div style="font-size:10px;color:#8b95ad;padding:5px;text-align:center">No objects yet</div>';
  } else {
    for(var i=S.objects.length-1;i>=0;i--){
      var o = S.objects[i];
      var name = TOOL_NAMES[o.pen]||TOOL_NAMES[o.shape]||(o.type==='text'?'Text':o.type==='sticky'?'Sticky':o.type==='image'?'Image':'Object');
      var active = S.selectedIds.indexOf(o.id)>=0?' active':'';
      layerHtml += '<div class="layer'+active+'" data-id="'+o.id+'"><span class="lay-nm">'+name+'</span><button class="lay-btn" data-act="toggle" data-id="'+o.id+'">'+(o.hidden?'🙈':'👁')+'</button><button class="lay-btn" data-act="lock" data-id="'+o.id+'">'+(o.locked?'🔒':'🔓')+'</button></div>';
    }
  }
  var html =
    '<div class="p-sec"><div class="p-title">Color</div><div class="colors">'+colorSwatches+'<div class="sw custom"><input type="color" value="'+S.color+'" id="customColor"></div></div></div>'+
    '<div class="p-sec"><div class="p-title">Stroke</div>'+
      '<div class="slider-row"><span class="slider-lbl">Size</span><input type="range" min="1" max="40" value="'+S.size+'" id="sizeSlider"><span class="slider-val" id="sizeVal">'+S.size+'</span></div>'+
      '<div class="slider-row"><span class="slider-lbl">Opacity</span><input type="range" min="5" max="100" value="'+Math.round(S.opacity*100)+'" id="opacitySlider"><span class="slider-val" id="opacityVal">'+Math.round(S.opacity*100)+'%</span></div>'+
      '<div class="line-btns"><div class="lb'+(S.lineStyle==='solid'?' active':'')+'" data-line="solid">Solid</div><div class="lb'+(S.lineStyle==='dashed'?' active':'')+'" data-line="dashed">Dash</div><div class="lb'+(S.lineStyle==='dotted'?' active':'')+'" data-line="dotted">Dot</div></div>'+
    '</div>'+
    '<div class="p-sec"><div class="p-title">Fill</div><div class="colors">'+fillSwatches+'</div></div>'+
    '<div class="p-sec"><div class="p-title">Font</div><div class="slider-row"><span class="slider-lbl">Size</span><input type="range" min="8" max="100" value="'+S.fontSize+'" id="fontSize"><span class="slider-val" id="fontSizeVal">'+S.fontSize+'</span></div></div>'+
    '<div class="p-sec"><div class="p-title">Background</div><div class="bgs">'+bgOpts+'</div></div>'+
    '<div class="p-sec"><div class="p-title">Sticky</div><div class="colors">'+stickySwatches+'</div></div>'+
    '<div class="p-sec"><div class="p-title">Layers <span class="p-count">'+S.objects.length+'</span></div><div class="layers">'+layerHtml+'</div></div>'+
    '<div class="p-sec"><div class="p-title">Actions</div><div class="btnrow"><button class="btn" id="dupBtn">Dup</button><button class="btn danger" id="delBtn">Delete</button></div></div>';
  $('#panel').innerHTML = html;
  wirePanel();
}

function wirePanel(){
  $$('#panel [data-color]').forEach(function(el){
    el.addEventListener('click', function(){ S.color = el.getAttribute('data-color'); applyToSel('color', S.color); buildPanel(); });
  });
  var cc = $('#customColor'); if(cc) cc.addEventListener('input', function(e){ S.color = e.target.value; applyToSel('color', S.color); });
  var s = $('#sizeSlider'); if(s) s.addEventListener('input', function(e){ S.size = +e.target.value; $('#sizeVal').textContent = S.size; applyToSel('size', S.size); });
  var op = $('#opacitySlider'); if(op) op.addEventListener('input', function(e){ S.opacity = +e.target.value/100; $('#opacityVal').textContent = e.target.value+'%'; applyToSel('opacity', S.opacity); });
  var fs = $('#fontSize'); if(fs) fs.addEventListener('input', function(e){ S.fontSize = +e.target.value; $('#fontSizeVal').textContent = S.fontSize; applyToSel('fontSize', S.fontSize, function(o){ return o.type==='text'||o.type==='sticky'; }); });
  $$('#panel [data-line]').forEach(function(el){ el.addEventListener('click', function(){ S.lineStyle = el.getAttribute('data-line'); applyToSel('lineStyle', S.lineStyle, function(o){ return o.type==='shape'; }); buildPanel(); }); });
  $$('#panel [data-fill]').forEach(function(el){ el.addEventListener('click', function(){ S.fill = el.getAttribute('data-fill'); applyToSel('fill', S.fill, function(o){ return o.type==='shape'; }); buildPanel(); }); });
  $$('#panel [data-bg]').forEach(function(el){ el.addEventListener('click', function(){ var p = currentPage(); if(p) p.background = el.getAttribute('data-bg'); canvasWrap.className = 'bg-'+(p?p.background:'dots'); buildPanel(); save(); }); });
  $$('#panel [data-sticky]').forEach(function(el){ el.addEventListener('click', function(){ S.stickyColor = el.getAttribute('data-sticky'); applyToSel('bg', S.stickyColor, function(o){ return o.type==='sticky'; }); buildPanel(); }); });
  $$('#panel .layer').forEach(function(el){ el.addEventListener('click', function(e){ if(e.target.closest('.lay-btn')) return; var id = el.getAttribute('data-id'); if(e.shiftKey){ if(S.selectedIds.indexOf(id)>=0) S.selectedIds = S.selectedIds.filter(function(x){ return x!==id; }); else S.selectedIds.push(id); } else S.selectedIds = [id]; render(); buildPanel(); }); });
  $$('#panel .lay-btn').forEach(function(btn){ btn.addEventListener('click', function(e){ e.stopPropagation(); var o = S.objects.find(function(x){ return x.id===btn.getAttribute('data-id'); }); if(!o) return; if(btn.getAttribute('data-act')==='toggle') o.hidden = !o.hidden; if(btn.getAttribute('data-act')==='lock') o.locked = !o.locked; render(); buildPanel(); save(); }); });
  var db = $('#dupBtn'); if(db) db.addEventListener('click', duplicateSel);
  var dl = $('#delBtn'); if(dl) dl.addEventListener('click', deleteSel);
}

function applyToSel(prop, value, filter){
  for(var i=0;i<S.selectedIds.length;i++){
    var o = S.objects.find(function(x){ return x.id===S.selectedIds[i]; });
    if(!o) continue;
    if(filter && !filter(o)) continue;
    o[prop] = value;
  }
  render(); save();
}

/* ===== HEADER BUTTONS ===== */
$('#undoBtn').addEventListener('click', undo);
$('#redoBtn').addEventListener('click', redo);
$('#saveBtn').addEventListener('click', function(){ save(); toast('Saved'); });
$('#clearBtn').addEventListener('click', function(){
  if(!S.objects.length){ toast('Empty'); return; }
  if(confirm('Clear current page?')){
    snapshot(); S.objects = []; S.selectedIds = [];
    render(); buildPanel(); save(); toast('Cleared');
  }
});
$('#panelBtn').addEventListener('click', function(){ $('#panel').classList.toggle('open'); $('#scrim').classList.toggle('open'); });
$('#scrim').addEventListener('click', function(){ $('#panel').classList.remove('open'); $('#scrim').classList.remove('open'); });
$('#boardName').addEventListener('change', function(e){ S.boardName = (e.target.value||'My Board').slice(0,60); e.target.value = S.boardName; save(); });
$('#prevPage').addEventListener('click', prevPage);
$('#nextPage').addEventListener('click', nextPage);
$('#addPage').addEventListener('click', addPage);
$('#pageInd').addEventListener('click', function(){ toast('Page '+$('#pageInd').textContent); });
$('#imgBtn').addEventListener('click', function(){ $('#imgInput').click(); });
$('#importBtn').addEventListener('click', function(){ $('#jsonInput').click(); });
$('#presentBtn').addEventListener('click', function(){ document.body.classList.toggle('presenting'); });
$('#shortcutsBtn').addEventListener('click', function(){ $('#shortcutsModal').classList.add('open'); });
$('#shortcutsClose').addEventListener('click', function(){ $('#shortcutsModal').classList.remove('open'); });
$('#diagBtn').addEventListener('click', function(){ $('#diagModal').classList.add('open'); runDiag(); });
$('#diagClose').addEventListener('click', function(){ $('#diagModal').classList.remove('open'); });
$('#diagRun').addEventListener('click', runDiag);

/* ===== ZOOM ===== */
function updateZoomLabel(){
  var z = Math.round(S.zoom*100);
  var zl = $('#zoomLbl'); if(zl) zl.textContent = z+'%';
  var sz = $('#stZoom'); if(sz) sz.textContent = z+'%';
}
$('#zoomIn').addEventListener('click', function(){ S.zoom = clamp(S.zoom*1.2, 0.1, 5); updateZoomLabel(); render(); });
$('#zoomOut').addEventListener('click', function(){ S.zoom = clamp(S.zoom/1.2, 0.1, 5); updateZoomLabel(); render(); });
$('#zoomLbl').addEventListener('click', function(){ S.zoom = 1; S.ox = 0; S.oy = 0; updateZoomLabel(); render(); });
$('#zoomFit').addEventListener('click', function(){
  if(!S.objects.length){ S.zoom = 1; S.ox = 0; S.oy = 0; updateZoomLabel(); render(); return; }
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(var i=0;i<S.objects.length;i++){
    var b = getBounds(S.objects[i]);
    if(b.x<minX) minX=b.x; if(b.y<minY) minY=b.y;
    if(b.x+b.w>maxX) maxX=b.x+b.w; if(b.y+b.h>maxY) maxY=b.y+b.h;
  }
  var pad = 40;
  var w = maxX-minX+pad*2, h = maxY-minY+pad*2;
  var r = canvasWrap.getBoundingClientRect();
  S.zoom = clamp(Math.min(r.width/w, r.height/h), 0.1, 3);
  S.ox = -minX*S.zoom + (r.width-w*S.zoom)/2 + pad*S.zoom;
  S.oy = -minY*S.zoom + (r.height-h*S.zoom)/2 + pad*S.zoom;
  updateZoomLabel(); render();
});
$('#laserBtn').addEventListener('click', function(){
  S.laserMode = !S.laserMode;
  this.classList.toggle('active', S.laserMode);
  if(S.laserMode){ cv.className = 't-laser'; toast('Laser ON'); }
  else { updateCursor(); toast('Laser OFF'); }
});

/* ===== FLOATING PANELS ===== */
function closeAllFloats(){
  ['sciPanel','calcPanel','timerPanel','pickerPanel'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.remove('open');
  });
  ['sciFab','calcFab','timerFab','pickerFab'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.remove('active');
  });
}
$$('.pf-close').forEach(function(btn){ btn.addEventListener('click', closeAllFloats); });

$('#sciFab').addEventListener('click', function(){
  var p = $('#sciPanel'), wasOpen = p.classList.contains('open');
  closeAllFloats();
  if(!wasOpen){ p.classList.add('open'); this.classList.add('active'); }
});
$('#calcFab').addEventListener('click', function(){
  var p = $('#calcPanel'), wasOpen = p.classList.contains('open');
  closeAllFloats();
  if(!wasOpen){ p.classList.add('open'); this.classList.add('active'); calcUpdate(); sciUpdate(); }
});
$('#timerFab').addEventListener('click', function(){
  var p = $('#timerPanel'), wasOpen = p.classList.contains('open');
  closeAllFloats();
  if(!wasOpen){ p.classList.add('open'); this.classList.add('active'); timerRender(); }
});
$('#pickerFab').addEventListener('click', function(){
  var p = $('#pickerPanel'), wasOpen = p.classList.contains('open');
  closeAllFloats();
  if(!wasOpen){ p.classList.add('open'); this.classList.add('active'); }
});

/* ===== SCIENCE PANEL ===== */
var sciState = {domain:'physics', category:'circuit'};

function buildSciencePanel(){
  // Build category tabs
  var domains = Object.keys(DATA.diagrams);
  var catsHtml = '';
  domains.forEach(function(d, i){
    catsHtml += '<div class="sci-cat'+(i===0?' active':'')+'" data-domain="'+d+'">'+d.charAt(0).toUpperCase()+d.slice(1)+'</div>';
  });
  $('#sciDiagrams').innerHTML = '<div class="sci-cats">'+catsHtml+'</div><div id="subCatWrap" class="sci-cats"></div><div class="sci-grid" id="sciGrid"></div>';
  $$('#sciDiagrams [data-domain]').forEach(function(el){
    el.addEventListener('click', function(){
      sciState.domain = el.getAttribute('data-domain');
      $$('#sciDiagrams [data-domain]').forEach(function(x){ x.classList.toggle('active', x===el); });
      renderSubCats();
    });
  });
  renderSubCats();

  // Build formulas
  buildFormulas('');

  // Build periodic table
  buildPeriodic();

  // Build calculators
  buildCalculators();

  // Build convert
  buildConvert();

  // Bind molar
  $('#molarBtn').addEventListener('click', doMolar);
  $('#balanceBtn').addEventListener('click', doBalance);
  $('#statsBtn').addEventListener('click', doStats);
  $('#balanceInsert').addEventListener('click', function(){
    var v = $('#balanceResult').textContent;
    if(v && v.indexOf('Error')!==0 && v.trim()) insertText(v);
  });
  $('#convInsert').addEventListener('click', function(){
    var v = $('#convOut').value;
    if(v && v!=='Error' && v!=='—') insertText(v+' '+$('#convTo').value);
  });

  // Tab switches
  $$('[data-sci]').forEach(function(tab){
    tab.addEventListener('click', function(){
      $$('[data-sci]').forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var v = tab.getAttribute('data-sci');
      var map = {diagrams:'sciDiagrams', formulas:'sciFormulas', ptable:'sciPtable', calcs:'sciCalcs', molar:'sciMolar', convert:'sciConvert', balance:'sciBalance', stats:'sciStats'};
      for(var k in map){
        var el = document.getElementById(map[k]);
        if(el) el.style.display = k===v ? '' : 'none';
      }
    });
  });
}

function renderSubCats(){
  var cats = Object.keys(DATA.diagrams[sciState.domain] || {});
  if(cats.indexOf(sciState.category)<0) sciState.category = cats[0];
  var html = '';
  cats.forEach(function(c){
    html += '<div class="sci-cat'+(c===sciState.category?' active':'')+'" data-subcat="'+c+'">'+c+'</div>';
  });
  $('#subCatWrap').innerHTML = html;
  $$('#subCatWrap [data-subcat]').forEach(function(el){
    el.addEventListener('click', function(){
      sciState.category = el.getAttribute('data-subcat');
      $$('#subCatWrap [data-subcat]').forEach(function(x){ x.classList.toggle('active', x===el); });
      renderDiagramGrid();
    });
  });
  renderDiagramGrid();
}

function renderDiagramGrid(){
  var items = (DATA.diagrams[sciState.domain]&&DATA.diagrams[sciState.domain][sciState.category]) || [];
  var grid = $('#sciGrid');
  grid.innerHTML = '';
  items.forEach(function(item){
    var el = document.createElement('div');
    el.className = 'sci-item';
    el.innerHTML = '<canvas width="60" height="60" style="width:50px;height:50px"></canvas><div class="sci-item-label">'+esc(item.n)+'</div>';
    var c = el.querySelector('canvas').getContext('2d');
    try { item.d(c, 60, 60); } catch(e){ console.warn(e); }
    el.addEventListener('click', function(){ insertDiagram(item); });
    grid.appendChild(el);
  });
}

function insertDiagram(item){
  snapshot();
  var tmp = document.createElement('canvas');
  tmp.width = 240; tmp.height = 240;
  var c = tmp.getContext('2d');
  try { item.d(c, 240, 240); } catch(e){ toast('Diagram error'); return; }
  var dataUrl = tmp.toDataURL('image/png');
  var r = canvasWrap.getBoundingClientRect();
  var cx = (r.width/2 - S.ox)/S.zoom, cy = (r.height/2 - S.oy)/S.zoom;
  S.objects.push({id:uid(), type:'image', src:dataUrl, x:cx-60, y:cy-60, w:120, h:120, opacity:1});
  render(); buildPanel(); save();
  toast('Inserted: '+item.n);
  closeAllFloats();
}

function buildFormulas(filter){
  var list = DATA.formulas.filter(function(f){
    if(!filter) return true;
    var q = filter.toLowerCase();
    return f[0].toLowerCase().indexOf(q)>=0 || f[1].toLowerCase().indexOf(q)>=0 || f[2].toLowerCase().indexOf(q)>=0;
  });
  var html = '';
  list.forEach(function(f){
    html += '<div class="formula-item" data-eq="'+esc(f[1])+'"><span class="f-nm">'+esc(f[0])+'</span><span class="f-eq">'+esc(f[1])+'</span></div>';
  });
  if(!list.length) html = '<div style="text-align:center;color:#8b95ad;font-size:10px;padding:20px">No matches</div>';
  $('#formulaList').innerHTML = html;
  $$('#formulaList .formula-item').forEach(function(el){
    el.addEventListener('click', function(){ insertText(el.getAttribute('data-eq')); closeAllFloats(); });
  });
}

$('#formulaSearch').addEventListener('input', function(e){ buildFormulas(e.target.value); });

function buildPeriodic(){
  var grid = $('#ptableGrid');
  var html = '';
  DATA.elements.forEach(function(e){
    var n = e[0], sym = e[1], name = e[2], mass = e[3], cat = e[4];
    var pos = DATA.elemPos(n);
    var color = DATA.elemColors[cat] || '#fff';
    html += '<div class="pt-cell" data-sym="'+sym+'" data-name="'+name+'" style="background:'+color+';grid-row:'+pos[0]+';grid-column:'+pos[1]+'" title="'+esc(name)+'"><span class="pt-num">'+n+'</span><span class="pt-sym">'+sym+'</span></div>';
  });
  html += '<div class="pt-cell ph" style="grid-row:6;grid-column:3">57-71</div>';
  html += '<div class="pt-cell ph" style="grid-row:7;grid-column:3">89-103</div>';
  grid.innerHTML = html;
  $$('#ptableGrid .pt-cell').forEach(function(el){
    if(el.classList.contains('ph')) return;
    el.addEventListener('click', function(){
      var sym = el.getAttribute('data-sym');
      var name = el.getAttribute('data-name');
      insertText(sym+' ('+name+')');
      closeAllFloats();
    });
  });
  // Legend
  var legendHtml = '';
  Object.keys(DATA.elemLabels).forEach(function(k){
    legendHtml += '<span><i style="background:'+DATA.elemColors[k]+';border:1px solid #ccc"></i>'+DATA.elemLabels[k]+'</span>';
  });
  $('#ptLegend').innerHTML = legendHtml;
}
$('#ptableSearch').addEventListener('input', function(e){
  var q = e.target.value.toLowerCase();
  $$('#ptableGrid .pt-cell').forEach(function(c){
    if(c.classList.contains('ph')) return;
    var sym = c.getAttribute('data-sym').toLowerCase();
    var name = c.getAttribute('data-name').toLowerCase();
    var match = !q || sym.indexOf(q)>=0 || name.indexOf(q)>=0;
    c.style.opacity = match ? '1' : '0.15';
  });
});

function buildCalculators(){
  var html = '<select class="text-input" id="calcPick"><option value="">-- Select calculator --</option>';
  Object.keys(DATA.calculators).forEach(function(k){
    html += '<option value="'+k+'">'+esc(DATA.calculators[k].name)+'</option>';
  });
  html += '</select><div id="calcFields"><div style="font-size:10px;color:#8b95ad;text-align:center;padding:15px">Choose a calculator above</div></div>';
  html += '<button class="btn primary" id="calcGo" style="width:100%;padding:8px;margin-top:6px;display:none">Calculate</button>';
  html += '<div class="result-box" id="calcResult"></div>';
  $('#sciCalcs').innerHTML = html;
  $('#calcPick').addEventListener('change', function(e){
    var k = e.target.value;
    if(!k){
      $('#calcFields').innerHTML = '<div style="font-size:10px;color:#8b95ad;text-align:center;padding:15px">Choose a calculator above</div>';
      $('#calcGo').style.display = 'none';
      $('#calcResult').textContent = '';
      return;
    }
    var calc = DATA.calculators[k];
    var fHtml = '<div style="font-size:10px;color:#8b95ad;font-family:monospace;margin-bottom:6px">'+esc(calc.f)+'</div>';
    calc.ins.forEach(function(inp){
      fHtml += '<div class="input-row"><label>'+esc(inp.l)+'</label><input type="number" id="ci_'+inp.k+'" value="'+(inp.def!==undefined?inp.def:'')+'"><span class="unit">'+esc(inp.u)+'</span></div>';
    });
    $('#calcFields').innerHTML = fHtml;
    $('#calcGo').style.display = '';
    $('#calcResult').textContent = '';
    $('#calcGo')._calc = calc;
  });
  $('#calcGo').addEventListener('click', function(){
    var calc = this._calc;
    if(!calc) return;
    var vals = {}, missing = [];
    calc.ins.forEach(function(inp){
      var raw = ($('#ci_'+inp.k).value||'').trim();
      if(raw===''){ missing.push(inp.l); return; }
      var n = parseFloat(raw);
      if(isNaN(n)){ missing.push(inp.l); return; }
      vals[inp.k] = n;
    });
    if(missing.length){ $('#calcResult').textContent = 'Enter: '+missing.join(', '); return; }
    try {
      var r = calc.calc(vals);
      if(typeof r!=='number' || !isFinite(r)){ $('#calcResult').textContent = 'Not finite (check ÷0)'; return; }
      $('#calcResult').textContent = (Math.round(r*1e6)/1e6)+' '+calc.u;
    } catch(err){ $('#calcResult').textContent = 'Error: '+err.message; }
  });
}

function buildConvert(){
  var html = '<select class="text-input" id="convType">';
  Object.keys(DATA.conversions).forEach(function(k){
    html += '<option value="'+k+'">'+k.charAt(0).toUpperCase()+k.slice(1)+'</option>';
  });
  html += '</select>';
  html += '<div class="input-row"><input type="number" id="convIn" value="1" style="flex:2"><select id="convFrom" style="flex:1"></select></div>';
  html += '<div style="text-align:center;color:#8b95ad;font-size:13px;margin:4px 0">=</div>';
  html += '<div class="input-row"><input type="text" id="convOut" readonly style="flex:2;color:#4f46e5;font-weight:600;background:#f0f4ff"><select id="convTo" style="flex:1"></select></div>';
  html += '<button class="btn primary" id="convInsert" style="width:100%;padding:8px;margin-top:6px">Insert to Canvas</button>';
  $('#sciConvert').innerHTML = html;
  function setup(){
    var type = $('#convType').value;
    var units = DATA.conversions[type];
    if(units.special === 'temperature'){
      var opt = '<option value="C">°C</option><option value="F">°F</option><option value="K">K</option>';
      $('#convFrom').innerHTML = opt;
      $('#convTo').innerHTML = opt;
      $('#convTo').value = 'F';
    } else {
      var keys = Object.keys(units).filter(function(k){ return k!=='special'; });
      var opt = '';
      keys.forEach(function(k){ opt += '<option value="'+k+'">'+k+'</option>'; });
      $('#convFrom').innerHTML = opt;
      $('#convTo').innerHTML = opt;
      $('#convTo').value = keys[1] || keys[0];
    }
    doConvert();
  }
  function doConvert(){
    var type = $('#convType').value;
    var units = DATA.conversions[type];
    var v = parseFloat($('#convIn').value);
    if(isNaN(v)){ $('#convOut').value = '—'; return; }
    var from = $('#convFrom').value, to = $('#convTo').value;
    var r;
    if(units.special === 'temperature'){
      var c;
      if(from==='C') c = v;
      else if(from==='F') c = (v-32)*5/9;
      else c = v - 273.15;
      if(to==='C') r = c;
      else if(to==='F') r = c*9/5+32;
      else r = c + 273.15;
    } else {
      r = v * units[from] / units[to];
    }
    if(!isFinite(r)){ $('#convOut').value = 'Error'; return; }
    $('#convOut').value = (Math.round(r*1e6)/1e6).toString();
  }
  $('#convType').addEventListener('change', setup);
  $('#convIn').addEventListener('input', doConvert);
  $('#convFrom').addEventListener('change', doConvert);
  $('#convTo').addEventListener('change', doConvert);
  setup();
}

/* ===== MOLAR MASS ===== */
function computeMolar(formula){
  try {
    var i = 0;
    function readNum(){ var s=''; while(i<formula.length && formula[i]>='0' && formula[i]<='9'){ s+=formula[i]; i++; } return s?parseInt(s):1; }
    function parseGroup(isTop){
      var res = {};
      while(i<formula.length){
        var c = formula[i];
        if(c==='('){
          i++;
          var inner = parseGroup(false);
          if(formula[i]!==')') throw new Error('Missing ")"');
          i++;
          var num = readNum();
          for(var k in inner) res[k] = (res[k]||0) + inner[k]*num;
        } else if(c===')'){
          if(isTop) throw new Error('Unexpected ")"');
          return res;
        } else if(c>='A' && c<='Z'){
          var sym = c; i++;
          if(i<formula.length && formula[i]>='a' && formula[i]<='z'){ sym += formula[i]; i++; }
          if(!DATA.elemMap[sym]) throw new Error('Unknown element: '+sym);
          var num = readNum();
          res[sym] = (res[sym]||0) + num;
        } else if(c===' '){ i++; }
        else throw new Error('Invalid character: '+c);
      }
      if(!isTop) throw new Error('Missing ")"');
      return res;
    }
    var atoms = parseGroup(true);
    var total = 0, breakdown = '';
    for(var sym in atoms){
      var e = DATA.elemMap[sym];
      if(!e) throw new Error('Unknown: '+sym);
      var contrib = atoms[sym] * e.m;
      total += contrib;
      breakdown += '\n'+sym+': '+atoms[sym]+' × '+e.m+' = '+contrib.toFixed(3);
    }
    return 'Molar Mass: '+total.toFixed(3)+' g/mol'+breakdown;
  } catch(err){ return 'Error: '+err.message; }
}

function doMolar(){
  var f = $('#molarInput').value.trim();
  if(!f){ $('#molarResult').textContent = 'Enter a formula'; return; }
  $('#molarResult').textContent = computeMolar(f);
}

/* ===== EQUATION BALANCE ===== */
function parseSpecies(str){
  str = str.trim();
  if(!str) throw new Error('Empty species');
  var i = 0;
  function readNum(){ var s=''; while(i<str.length && str[i]>='0' && str[i]<='9'){ s+=str[i]; i++; } return s?parseInt(s):1; }
  function parseGroup(isTop){
    var res = {};
    while(i<str.length){
      var c = str[i];
      if(c==='('){
        i++;
        var inner = parseGroup(false);
        if(str[i]!==')') throw new Error('Missing ")"');
        i++;
        var num = readNum();
        for(var k in inner) res[k] = (res[k]||0) + inner[k]*num;
      } else if(c===')'){
        if(isTop) throw new Error('Unexpected ")"');
        return res;
      } else if(c>='A' && c<='Z'){
        var sym = c; i++;
        if(i<str.length && str[i]>='a' && str[i]<='z'){ sym += str[i]; i++; }
        if(!DATA.elemMap[sym]) throw new Error('Unknown: '+sym);
        var num = readNum();
        res[sym] = (res[sym]||0) + num;
      } else if(c===' '){ i++; }
      else throw new Error('Invalid: '+c);
    }
    if(!isTop) throw new Error('Missing ")"');
    return res;
  }
  return parseGroup(true);
}

function balanceEquation(eq){
  try {
    var parts = eq.split(/->|→|=/);
    if(parts.length !== 2) throw new Error('Use -> between reactants and products');
    var left = parts[0].split('+').map(function(s){ return s.trim(); }).filter(Boolean);
    var right = parts[1].split('+').map(function(s){ return s.trim(); }).filter(Boolean);
    if(!left.length || !right.length) throw new Error('Empty side');
    var reactants = left.map(parseSpecies);
    var products = right.map(parseSpecies);
    var elements = {};
    reactants.concat(products).forEach(function(sp){ for(var k in sp) elements[k] = true; });
    var elList = Object.keys(elements);
    var nSpecies = reactants.length + products.length;
    var nEl = elList.length;
    if(nSpecies < 2) throw new Error('Too simple');
    var matrix = [];
    for(var e=0;e<nEl;e++){
      var row = [], sym = elList[e];
      for(var s=0;s<reactants.length;s++) row.push(reactants[s][sym]||0);
      for(var s=0;s<products.length;s++) row.push(-(products[s][sym]||0));
      row.push(0);
      matrix.push(row);
    }
    var n = nSpecies, pivotCols = [];
    for(var r=0, col=0; r<matrix.length && col<n; col++){
      var pivot = -1;
      for(var rr=r;rr<matrix.length;rr++) if(Math.abs(matrix[rr][col])>1e-10){ pivot=rr; break; }
      if(pivot<0) continue;
      var tmp = matrix[r]; matrix[r] = matrix[pivot]; matrix[pivot] = tmp;
      var pv = matrix[r][col];
      for(var c=0;c<=n;c++) matrix[r][c] /= pv;
      for(var rr=0;rr<matrix.length;rr++){
        if(rr===r) continue;
        var f = matrix[rr][col];
        if(Math.abs(f)<1e-10) continue;
        for(var c=0;c<=n;c++) matrix[rr][c] -= f*matrix[r][c];
      }
      pivotCols.push(col); r++;
    }
    var freeCols = [];
    for(var c=0;c<n;c++) if(pivotCols.indexOf(c)<0) freeCols.push(c);
    if(!freeCols.length) throw new Error('No solution');
    var sol = new Array(n).fill(0);
    var freeCol = freeCols[0];
    sol[freeCol] = 1;
    for(var r=0;r<pivotCols.length;r++) sol[pivotCols[r]] = -matrix[r][freeCol];
    var lcm = 1;
    sol.forEach(function(v){
      var d = Math.round(Math.abs(v)*1e6);
      var gcd = function(a,b){ while(b){ var t=b; b=a%b; a=t; } return a; };
      lcm = lcm*d/gcd(lcm,d);
    });
    var ints = sol.map(function(v){ return Math.round(v*lcm); });
    var gcdAll = ints.reduce(function(a,b){ if(a===0) return Math.abs(b); if(b===0) return Math.abs(a); while(b){ var t=b; b=a%b; a=t; } return Math.abs(a); }, 0);
    if(gcdAll>1) ints = ints.map(function(v){ return v/gcdAll; });
    if(ints.some(function(v){ return v<0; })) ints = ints.map(function(v){ return -v; });
    var out = '';
    for(var i=0;i<reactants.length;i++) out += (i>0?' + ':'')+(ints[i]===1?'':ints[i])+left[i];
    out += ' → ';
    for(var i=0;i<products.length;i++) out += (i>0?' + ':'')+(ints[reactants.length+i]===1?'':ints[reactants.length+i])+right[i];
    return out;
  } catch(err){ return 'Error: '+err.message; }
}

function doBalance(){
  var eq = $('#balanceInput').value.trim();
  if(!eq){ $('#balanceResult').textContent = 'Enter an equation'; return; }
  $('#balanceResult').textContent = balanceEquation(eq);
}

/* ===== STATISTICS ===== */
function doStats(){
  var nums = $('#statsInput').value.split(/[,\s\n]+/).map(Number).filter(function(n){ return !isNaN(n); });
  if(!nums.length){ $('#statsResult').textContent = 'Enter numbers'; return; }
  var sorted = nums.slice().sort(function(a,b){ return a-b; });
  var sum = 0, n = nums.length;
  for(var i=0;i<n;i++) sum += nums[i];
  var mean = sum/n, variance = 0;
  for(var i=0;i<n;i++) variance += (nums[i]-mean)*(nums[i]-mean);
  variance /= n;
  var sd = Math.sqrt(variance);
  var median = n%2===0 ? (sorted[n/2-1]+sorted[n/2])/2 : sorted[Math.floor(n/2)];
  var modes = {};
  for(var i=0;i<n;i++) modes[nums[i]] = (modes[nums[i]]||0)+1;
  var maxC = 0;
  for(var k in modes) if(modes[k]>maxC) maxC = modes[k];
  var modeStr = maxC>1 ? Object.keys(modes).filter(function(k){ return modes[k]===maxC; }).join(', ') : 'No mode';
  $('#statsResult').textContent = 'Count: '+n+'\nSum: '+sum.toFixed(4)+'\nMean: '+mean.toFixed(4)+'\nMedian: '+median+'\nMode: '+modeStr+'\nMin: '+sorted[0]+'\nMax: '+sorted[n-1]+'\nRange: '+(sorted[n-1]-sorted[0])+'\nVariance: '+variance.toFixed(4)+'\nStd Dev: '+sd.toFixed(4);
}

/* ===== INSERT TEXT HELPER ===== */
function insertText(text){
  snapshot();
  var r = canvasWrap.getBoundingClientRect();
  var cx = (r.width/2 - S.ox)/S.zoom, cy = (r.height/2 - S.oy)/S.zoom;
  S.objects.push({id:uid(), type:'text', x:cx-80, y:cy-10, text:text, color:S.color, fontSize:S.fontSize, fontFamily:S.fontFamily, fontWeight:S.fontWeight, opacity:S.opacity});
  render(); buildPanel(); save();
  toast('Inserted');
}

/* ===== BASIC CALCULATOR ===== */
var calc = {display:'0', prev:null, op:null, waiting:false};
function calcUpdate(){ var d = $('#calcDisp'); if(d) d.textContent = calc.display; }
function calcPress(k){
  if(k==='AC') calc = {display:'0', prev:null, op:null, waiting:false};
  else if(k==='DEL'){ if(!calc.waiting) calc.display = calc.display.length>1 ? calc.display.slice(0,-1) : '0'; }
  else if(k==='.'){ if(calc.waiting){ calc.display = '0.'; calc.waiting = false; } else if(calc.display.indexOf('.')<0) calc.display += '.'; }
  else if(k==='%'){ var p = parseFloat(calc.display); if(!isNaN(p)) calc.display = String(p/100); }
  else if(k==='sqrt'){ var p = parseFloat(calc.display); if(p<0){ calc.display = 'Error'; calc.waiting = true; return; } calc.display = String(Math.sqrt(p)); calc.waiting = true; }
  else if(['+','-','*','/'].indexOf(k)>=0){
    var cur = parseFloat(calc.display);
    if(calc.prev!==null && calc.op && !calc.waiting){
      var r = calcCompute(calc.prev, cur, calc.op);
      if(r===null){ calc.display = 'Error'; calc.waiting = true; return; }
      calc.display = String(r); calc.prev = r;
    } else calc.prev = cur;
    calc.op = k; calc.waiting = true;
  }
  else if(k==='='){
    if(calc.prev!==null && calc.op){
      var cur = parseFloat(calc.display);
      var r = calcCompute(calc.prev, cur, calc.op);
      calc.display = r===null ? 'Error' : String(r);
      calc.prev = null; calc.op = null; calc.waiting = true;
    }
  }
  else { if(calc.waiting){ calc.display = k; calc.waiting = false; } else calc.display = calc.display==='0' ? k : calc.display+k; }
  calcUpdate();
}
function calcCompute(a,b,op){
  if(op==='+') return a+b;
  if(op==='-') return a-b;
  if(op==='*') return a*b;
  if(op==='/') return b===0 ? null : a/b;
  return null;
}
$$('#calcBasic [data-c]').forEach(function(btn){
  btn.addEventListener('click', function(){ calcPress(btn.getAttribute('data-c')); });
});

/* ===== SCIENTIFIC CALCULATOR ===== */
var sciExpr = '';
function sciUpdate(){ var d = $('#sciDisp'); if(d) d.textContent = sciExpr || '0'; }
function sciPress(k){
  if(k==='AC'){ sciExpr = ''; sciUpdate(); return; }
  if(k==='='){
    try { var v = SafeMath.parse(sciExpr, {angleMode:S.angleMode}); sciExpr = String(v); }
    catch(e){ sciExpr = 'Error: '+e.message; }
    sciUpdate(); return;
  }
  if(k==='fact'){ sciExpr += '!'; sciUpdate(); return; }
  if(k==='inv'){ sciExpr = '1/('+sciExpr+')'; sciUpdate(); return; }
  if(['sin','cos','tan','asin','acos','atan','log','ln','sqrt','abs'].indexOf(k)>=0){ sciExpr += k+'('; sciUpdate(); return; }
  if(k==='pi'){ sciExpr += 'pi'; sciUpdate(); return; }
  if(k==='e'){ sciExpr += 'e'; sciUpdate(); return; }
  sciExpr += k;
  sciUpdate();
}
$$('#calcSci [data-sc]').forEach(function(btn){
  btn.addEventListener('click', function(){ sciPress(btn.getAttribute('data-sc')); });
});
$$('#angleToggle button').forEach(function(btn){
  btn.addEventListener('click', function(){
    S.angleMode = btn.getAttribute('data-angle');
    $$('#angleToggle button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-angle')===S.angleMode); });
  });
});

/* ===== GRAPH CALCULATOR ===== */
$$('[data-calc]').forEach(function(tab){
  tab.addEventListener('click', function(){
    $$('[data-calc]').forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
    var v = tab.getAttribute('data-calc');
    $('#calcBasic').style.display = v==='basic' ? '' : 'none';
    $('#calcSci').style.display = v==='sci' ? '' : 'none';
    $('#calcGraph').style.display = v==='graph' ? '' : 'none';
    if(v==='graph') setTimeout(drawGraph, 50);
  });
});

function drawGraph(){
  var gc = $('#graphCanvas');
  if(!gc) return;
  var W = 320, H = 180;
  gc.width = W; gc.height = H;
  var g = gc.getContext('2d');
  g.fillStyle = '#f8f9fc';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = '#e2e7f2'; g.lineWidth = 0.5;
  for(var x=0;x<W;x+=20){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,H); g.stroke(); }
  for(var y=0;y<H;y+=20){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); }
  var cx = W/2, cy = H/2;
  g.strokeStyle = '#94a3b8'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(0,cy); g.lineTo(W,cy); g.stroke();
  g.beginPath(); g.moveTo(cx,0); g.lineTo(cx,H); g.stroke();
  var scale = 25;
  function plotFn(inputId, color){
    var expr = $(inputId).value.trim();
    if(!expr) return;
    g.strokeStyle = color; g.lineWidth = 2;
    g.beginPath();
    var started = false;
    for(var px=0;px<W;px+=2){
      var x = (px-cx)/scale;
      var y;
      try { y = SafeMath.parse(expr, {angleMode:S.angleMode, vars:{x:x}}); }
      catch(e){ started = false; continue; }
      if(!isFinite(y)){ started = false; continue; }
      var py = cy - y*scale;
      if(py<-H || py>2*H){ started = false; continue; }
      if(!started){ g.moveTo(px,py); started = true; }
      else g.lineTo(px,py);
    }
    g.stroke();
  }
  plotFn('#graphF1', '#4f46e5');
  plotFn('#graphF2', '#dc2626');
  plotFn('#graphF3', '#16a34a');
}
$('#graphPlot').addEventListener('click', drawGraph);
$('#graphClear').addEventListener('click', function(){
  $('#graphF1').value = ''; $('#graphF2').value = ''; $('#graphF3').value = '';
  drawGraph();
});

/* ===== TIMER ===== */
var timer = {total:300, remain:300, running:false, interval:null};
var audioCtx = null;
function timerFormat(s){ s = Math.max(0, Math.floor(s)); var m = Math.floor(s/60), sec = s%60; return (m<10?'0':'')+m+':'+(sec<10?'0':'')+sec; }
function timerRender(){ var d = $('#timerDisp'); if(d) d.textContent = timerFormat(timer.remain); }
function timerBeep(){
  try {
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = audioCtx.createOscillator();
    var g = audioCtx.createGain();
    osc.connect(g); g.connect(audioCtx.destination);
    osc.frequency.value = 880;
    g.gain.setValueAtTime(0.3, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.5);
    osc.start(); osc.stop(audioCtx.currentTime+0.5);
  } catch(e){}
}
$('#timerStart').addEventListener('click', function(){
  if(timer.running){ clearInterval(timer.interval); timer.running = false; this.textContent = 'Start'; }
  else {
    if(timer.remain <= 0) timer.remain = timer.total;
    timer.running = true;
    this.textContent = 'Pause';
    timer.interval = setInterval(function(){
      timer.remain -= 1;
      timerRender();
      if(timer.remain <= 0){
        clearInterval(timer.interval);
        timer.running = false;
        $('#timerStart').textContent = 'Start';
        timerBeep(); toast('Timer done');
      }
    }, 1000);
  }
});
$('#timerReset').addEventListener('click', function(){
  clearInterval(timer.interval); timer.running = false;
  $('#timerStart').textContent = 'Start';
  var m = parseInt($('#timerMin').value)||0, s = parseInt($('#timerSec').value)||0;
  timer.total = m*60+s; timer.remain = timer.total;
  timerRender();
});
$$('.preset-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var sec = parseInt(btn.getAttribute('data-sec'));
    timer.total = sec; timer.remain = sec;
    $('#timerMin').value = Math.floor(sec/60);
    $('#timerSec').value = sec%60;
    timerRender();
  });
});

/* ===== PICKER ===== */
var pickerTimer = null;
$('#pickerGo').addEventListener('click', function(){
  var text = $('#pickerList').value.trim();
  if(!text){ toast('Enter names'); return; }
  var names = text.split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
  if(!names.length){ toast('No names'); return; }
  var result = $('#pickerResult');
  var i = 0;
  clearInterval(pickerTimer);
  pickerTimer = setInterval(function(){
    result.textContent = names[Math.floor(Math.random()*names.length)];
    i++;
    if(i > 12){ clearInterval(pickerTimer); toast('Picked: '+result.textContent); }
  }, 80);
});

/* ===== TEXT MODAL ===== */
$('#textOk').addEventListener('click', function(){
  var v = $('#textInput').value;
  var modal = $('#textModal');
  var editId = modal.dataset.editId;
  if(editId){
    var o = S.objects.find(function(x){ return x.id===editId; });
    if(o){ snapshot(); o.text = v; }
    modal.dataset.editId = '';
  } else {
    if(!v.trim()){ modal.classList.remove('open'); return; }
    snapshot();
    S.objects.push({id:uid(), type:'text', x:+modal.dataset.x, y:+modal.dataset.y, text:v, color:S.color, fontSize:S.fontSize, fontFamily:S.fontFamily, fontWeight:S.fontWeight, opacity:S.opacity});
    S.selectedIds = [S.objects[S.objects.length-1].id];
  }
  modal.classList.remove('open');
  render(); buildPanel(); save();
});
$('#textCancel').addEventListener('click', function(){ $('#textModal').classList.remove('open'); });
$('#textInput').addEventListener('keydown', function(e){
  if(e.key==='Enter' && (e.ctrlKey || e.metaKey)) $('#textOk').click();
  if(e.key==='Escape') $('#textCancel').click();
});

/* ===== IMAGE ===== */
$('#imgInput').addEventListener('change', function(e){
  var f = e.target.files[0];
  if(!f) return;
  if(f.size > 5*1024*1024){ toast('Image too large (max 5MB)'); e.target.value=''; return; }
  var reader = new FileReader();
  reader.onload = function(){
    var img = new Image();
    img.onload = function(){
      snapshot();
      var maxW = 400;
      var scale = Math.min(1, maxW/img.width);
      var w = img.width*scale, h = img.height*scale;
      var r = canvasWrap.getBoundingClientRect();
      var cx = (r.width/2 - S.ox)/S.zoom, cy = (r.height/2 - S.oy)/S.zoom;
      S.objects.push({id:uid(), type:'image', src:reader.result, x:cx-w/2, y:cy-h/2, w:w, h:h, opacity:1});
      render(); buildPanel(); save(); toast('Image added');
    };
    img.onerror = function(){ toast('Image decode failed'); };
    img.src = reader.result;
  };
  reader.onerror = function(){ toast('File read failed'); };
  reader.readAsDataURL(f); e.target.value='';
});

/* ===== EXPORT ===== */
$('#exportBtn').addEventListener('click', function(){ $('#exportModal').classList.add('open'); });
$('#exportClose').addEventListener('click', function(){ $('#exportModal').classList.remove('open'); });
$$('[data-fmt]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var fmt = btn.getAttribute('data-fmt');
    $('#exportModal').classList.remove('open');
    try {
      if(fmt==='png') exportPNG();
      else if(fmt==='svg') exportSVG();
      else if(fmt==='json') exportJSON();
      else if(fmt==='print') window.print();
    } catch(err){ toast('Export failed: '+err.message); }
  });
});

function getContentBounds(){
  var minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
  for(var i=0;i<S.objects.length;i++){
    var o = S.objects[i];
    if(o.hidden) continue;
    var b = getBounds(o);
    if(b.x<minX) minX=b.x; if(b.y<minY) minY=b.y;
    if(b.x+b.w>maxX) maxX=b.x+b.w; if(b.y+b.h>maxY) maxY=b.y+b.h;
  }
  if(!isFinite(minX)) return {x:0, y:0, w:800, h:600};
  return {x:minX-40, y:minY-40, w:maxX-minX+80, h:maxY-minY+80};
}

function exportPNG(){
  if(!S.objects.length){ toast('Nothing to export'); return; }
  var b = getContentBounds();
  var cc = document.createElement('canvas');
  cc.width = Math.ceil(b.w); cc.height = Math.ceil(b.h);
  var c2 = cc.getContext('2d');
  c2.fillStyle = '#fff';
  c2.fillRect(0, 0, b.w, b.h);
  c2.translate(-b.x, -b.y);
  S.objects.forEach(function(o){
    if(o.hidden) return;
    c2.save();
    c2.globalAlpha = (o.opacity!==undefined ? o.opacity : 1);
    if(o.type==='stroke'){
      c2.strokeStyle = o.color; c2.fillStyle = o.color;
      c2.lineWidth = o.size; c2.lineCap = 'round'; c2.lineJoin = 'round';
      if(o.points.length===1){ c2.beginPath(); c2.arc(o.points[0].x, o.points[0].y, Math.max(o.size/2,1), 0, Math.PI*2); c2.fill(); }
      else { c2.beginPath(); c2.moveTo(o.points[0].x, o.points[0].y); for(var i=1;i<o.points.length;i++) c2.lineTo(o.points[i].x, o.points[i].y); c2.stroke(); }
    } else if(o.type==='shape'){
      var x = Math.min(o.x1,o.x2), y = Math.min(o.y1,o.y2);
      var w = Math.abs(o.x2-o.x1), h = Math.abs(o.y2-o.y1);
      c2.strokeStyle = o.color; c2.lineWidth = o.size;
      var hasFill = o.fill && o.fill!=='none';
      if(hasFill) c2.fillStyle = o.fill;
      if(o.shape==='rect'){ if(hasFill) c2.fillRect(x,y,w,h); c2.strokeRect(x,y,w,h); }
      else if(o.shape==='circle'){ c2.beginPath(); c2.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2); if(hasFill) c2.fill(); c2.stroke(); }
      else if(o.shape==='line'){ c2.beginPath(); c2.moveTo(o.x1,o.y1); c2.lineTo(o.x2,o.y2); c2.stroke(); }
    } else if(o.type==='text'){
      c2.fillStyle = o.color;
      c2.font = (o.fontWeight||600)+' '+o.fontSize+'px '+o.fontFamily;
      c2.textBaseline = 'top';
      var lines = (o.text||'').split('\n');
      var lh = o.fontSize*1.35;
      for(var i=0;i<lines.length;i++) c2.fillText(lines[i], o.x, o.y+i*lh);
    } else if(o.type==='sticky'){
      c2.fillStyle = o.bg||'#fef3c7';
      c2.fillRect(o.x, o.y, o.w, o.h);
      c2.fillStyle = o.color||'#1f2937';
      c2.font = '500 '+(o.fontSize||14)+'px Inter';
      c2.textBaseline = 'top';
      var lines = (o.text||'').split('\n');
      var lh = (o.fontSize||14)*1.4;
      var cy = o.y+12;
      for(var i=0;i<lines.length;i++){ if(cy<o.y+o.h-12){ c2.fillText(lines[i], o.x+12, cy, o.w-24); cy+=lh; } }
    } else if(o.type==='image' && o._img && o._img.complete){
      try { c2.drawImage(o._img, o.x, o.y, o.w, o.h); } catch(e){}
    }
    c2.restore();
  });
  cc.toBlob(function(blob){
    if(!blob){ toast('PNG failed'); return; }
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = (S.boardName||'board').replace(/[^\w-]/g,'_')+'.png';
    a.href = url;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    toast('PNG saved');
  }, 'image/png');
}

function exportSVG(){
  if(!S.objects.length){ toast('Nothing to export'); return; }
  var b = getContentBounds();
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+b.w+'" height="'+b.h+'" viewBox="'+b.x+' '+b.y+' '+b.w+' '+b.h+'">';
  svg += '<rect x="'+b.x+'" y="'+b.y+'" width="'+b.w+'" height="'+b.h+'" fill="#ffffff"/>';
  S.objects.forEach(function(o){
    if(o.hidden) return;
    if(o.type==='stroke'){
      var pts = o.points.map(function(p){ return p.x.toFixed(1)+','+p.y.toFixed(1); }).join(' ');
      svg += '<polyline points="'+pts+'" fill="none" stroke="'+esc(o.color)+'" stroke-width="'+o.size+'" stroke-linecap="round" stroke-linejoin="round" opacity="'+(o.opacity||1)+'"/>';
    } else if(o.type==='text'){
      var lines = (o.text||'').split('\n');
      for(var j=0;j<lines.length;j++){
        svg += '<text x="'+o.x+'" y="'+(o.y+(j+0.8)*o.fontSize*1.35)+'" font-family="'+esc(o.fontFamily)+',sans-serif" font-size="'+o.fontSize+'" font-weight="'+(o.fontWeight||600)+'" fill="'+esc(o.color)+'">'+esc(lines[j])+'</text>';
      }
    } else if(o.type==='shape'){
      var x = Math.min(o.x1,o.x2), y = Math.min(o.y1,o.y2);
      var w = Math.abs(o.x2-o.x1), h = Math.abs(o.y2-o.y1);
      var fill = (o.fill && o.fill!=='none') ? esc(o.fill) : 'none';
      var attrs = 'fill="'+fill+'" stroke="'+esc(o.color)+'" stroke-width="'+o.size+'"';
      if(o.shape==='rect') svg += '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" '+attrs+'/>';
      else if(o.shape==='circle') svg += '<ellipse cx="'+(x+w/2)+'" cy="'+(y+h/2)+'" rx="'+(w/2)+'" ry="'+(h/2)+'" '+attrs+'/>';
      else if(o.shape==='line') svg += '<line x1="'+o.x1+'" y1="'+o.y1+'" x2="'+o.x2+'" y2="'+o.y2+'" '+attrs+'/>';
    }
  });
  svg += '</svg>';
  var blob = new Blob([svg], {type:'image/svg+xml'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download = (S.boardName||'board').replace(/[^\w-]/g,'_')+'.svg';
  a.href = url;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  toast('SVG saved');
}

function exportJSON(){
  var pagesData = [];
  for(var i=0;i<S.pages.length;i++){
    var p = S.pages[i];
    var objs = [];
    for(var j=0;j<p.objects.length;j++){
      var o = p.objects[j];
      var c = {};
      for(var k in o) if(k!=='_img') c[k] = o[k];
      objs.push(c);
    }
    pagesData.push({id:p.id, name:p.name, objects:objs, background:p.background});
  }
  var data = {boardName:S.boardName, pages:pagesData, currentPageId:S.currentPageId};
  var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download = (S.boardName||'board').replace(/[^\w-]/g,'_')+'.json';
  a.href = url;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  toast('JSON saved');
}

/* ===== IMPORT ===== */
$('#jsonInput').addEventListener('change', function(e){
  var f = e.target.files[0];
  if(!f) return;
  if(f.size > 5*1024*1024){ toast('File too large (max 5MB)'); e.target.value=''; return; }
  var reader = new FileReader();
  reader.onload = function(){
    try {
      var data = JSON.parse(reader.result);
      if(!data || !Array.isArray(data.pages)) throw new Error('Missing pages');
      if(data.pages.length > 100) throw new Error('Too many pages');
      var cleanPages = [];
      for(var i=0;i<data.pages.length;i++){
        var p = data.pages[i];
        if(!p || !Array.isArray(p.objects)) throw new Error('Page '+i+' invalid');
        if(p.objects.length > 5000) throw new Error('Page '+i+' too many objects');
        var objs = p.objects.filter(function(o){
          if(!o || typeof o !== 'object') return false;
          if(['stroke','shape','text','sticky','image'].indexOf(o.type)<0) return false;
          if(typeof o.id !== 'string') return false;
          return true;
        });
        cleanPages.push({id:p.id||('p_'+i), name:p.name||('Page '+(i+1)), objects:objs, background:p.background||'dots', undoStack:[], redoStack:[]});
      }
      if(!cleanPages.length) throw new Error('No valid pages');
      S.pages = cleanPages;
      S.currentPageId = cleanPages.find(function(x){ return x.id===data.currentPageId; }) ? data.currentPageId : cleanPages[0].id;
      S.boardName = data.boardName || 'Imported';
      $('#boardName').value = S.boardName;
      var p = currentPage();
      canvasWrap.className = 'bg-'+(p.background||'dots');
      S.selectedIds = [];
      updatePageNav(); render(); buildPanel(); save();
      toast('Imported successfully');
    } catch(err){ toast('Import failed: '+err.message); }
  };
  reader.onerror = function(){ toast('File read failed'); };
  reader.readAsText(f); e.target.value = '';
});

/* ===== SAVE / LOAD ===== */
var saveTimer = null;
function setSaveStat(state, msg){
  var el = $('#saveStat');
  if(!el) return;
  el.textContent = msg;
  el.className = 'savestat '+state;
}
function save(){
  setSaveStat('saving', 'Saving...');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function(){
    try {
      var pagesData = [];
      for(var i=0;i<S.pages.length;i++){
        var p = S.pages[i];
        var objs = [];
        for(var j=0;j<p.objects.length;j++){
          var o = p.objects[j];
          var c = {};
          for(var k in o) if(k!=='_img') c[k] = o[k];
          objs.push(c);
        }
        pagesData.push({id:p.id, name:p.name, objects:objs, background:p.background});
      }
      localStorage.setItem('pwb-sci-v6', JSON.stringify({boardName:S.boardName, pages:pagesData, currentPageId:S.currentPageId, angleMode:S.angleMode}));
      setSaveStat('saved', 'Saved');
      setTimeout(function(){ setSaveStat('', 'Saved '+new Date().toLocaleTimeString()); }, 500);
    } catch(err){
      setSaveStat('failed', 'Save failed');
      if(err.name==='QuotaExceededError' || err.code===22) toast('Storage full — export JSON backup');
      else toast('Save failed: '+err.message);
    }
  }, 300);
}

function load(){
  try {
    var raw = localStorage.getItem('pwb-sci-v6');
    if(!raw) return;
    var d = JSON.parse(raw);
    if(d.pages && d.pages.length){
      S.pages = d.pages.map(function(p){ return {id:p.id, name:p.name, objects:p.objects||[], background:p.background||'dots', undoStack:[], redoStack:[]}; });
      S.currentPageId = d.currentPageId || S.pages[0].id;
      var found = false;
      for(var i=0;i<S.pages.length;i++) if(S.pages[i].id===S.currentPageId){ found = true; break; }
      if(!found) S.currentPageId = S.pages[0].id;
    }
    S.boardName = d.boardName || 'My Board';
    if(d.angleMode) S.angleMode = d.angleMode;
    $('#boardName').value = S.boardName;
    var p = currentPage();
    canvasWrap.className = 'bg-'+(p.background||'dots');
    updatePageNav(); render(); buildPanel();
    setSaveStat('saved', 'Restored');
  } catch(e){ console.warn('Load failed:', e); }
}

/* ===== DIAGNOSTICS ===== */
function runDiag(){
  var results = [];
  function test(name, fn){ try { var r = fn(); results.push({name:name, pass:!!r}); } catch(e){ results.push({name:name, pass:false, err:e.message}); } }
  test('SafeMath: 2+2=4', function(){ return SafeMath.parse('2+2')===4; });
  test('SafeMath: sin(90°)=1', function(){ return Math.abs(SafeMath.parse('sin(90)', {angleMode:'DEG'})-1)<1e-9; });
  test('SafeMath: sqrt(16)=4', function(){ return SafeMath.parse('sqrt(16)')===4; });
  test('SafeMath: 1/0 throws', function(){ try { SafeMath.parse('1/0'); return false; } catch(e){ return true; } });
  test('SafeMath: alert() rejected', function(){ try { SafeMath.parse('alert(1)'); return false; } catch(e){ return true; } });
  test('PWB_DATA loaded', function(){ return !!window.PWB_DATA; });
  test('118 elements', function(){ return DATA.elements.length === 118; });
  test('Element H exists', function(){ return !!DATA.elemMap.H; });
  test('H2O = 18.015', function(){ var r = computeMolar('H2O'); return r.indexOf('18.0')>=0; });
  test('CO2 = 44.01', function(){ var r = computeMolar('CO2'); return r.indexOf('44.0')>=0; });
  test('Ca(OH)2 = 74.09', function(){ var r = computeMolar('Ca(OH)2'); return r.indexOf('74.0')>=0; });
  test('H2O) rejected', function(){ var r = computeMolar('H2O)'); return r.indexOf('Error')===0; });
  test('Balance H2+O2', function(){ var r = balanceEquation('H2 + O2 -> H2O'); return r.indexOf('2H2')>=0; });
  test('Balance C3H8', function(){ var r = balanceEquation('C3H8 + O2 -> CO2 + H2O'); return r.indexOf('C3H8')>=0 && r.indexOf('5O2')>=0; });
  test('localStorage available', function(){ try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; } catch(e){ return false; } });
  test('Canvas 2D available', function(){ return !!ctx && typeof ctx.fillRect==='function'; });
  test('Blob API', function(){ return typeof Blob==='function'; });
  test('Formulas present', function(){ return DATA.formulas.length > 50; });
  test('Calculators present', function(){ return Object.keys(DATA.calculators).length > 20; });
  test('Diagrams present', function(){ return Object.keys(DATA.diagrams).length > 3; });
  test('Toolbar built', function(){ return $$('.tool').length > 0; });
  test('Canvas sized', function(){ return cv.width > 0 && cv.height > 0; });
  var html = '';
  for(var i=0;i<results.length;i++){
    html += '<div class="diag-row"><span>'+esc(results[i].name)+'</span><span class="'+(results[i].pass?'diag-pass':'diag-fail')+'">'+(results[i].pass?'PASS':'FAIL')+'</span></div>';
  }
  var passed = results.filter(function(r){ return r.pass; }).length;
  html += '<div class="diag-sum">'+passed+' / '+results.length+' passed</div>';
  $('#diagResults').innerHTML = html;
}

/* ===== KEYBOARD ===== */
document.addEventListener('keydown', function(e){
  var t = document.activeElement;
  if(t && (t.tagName==='INPUT' || t.tagName==='TEXTAREA' || t.tagName==='SELECT' || t.isContentEditable)) return;
  if(e.ctrlKey || e.metaKey){
    var k = e.key.toLowerCase();
    if(k==='z'){ e.preventDefault(); if(e.shiftKey) redo(); else undo(); return; }
    if(k==='y'){ e.preventDefault(); redo(); return; }
    if(k==='s'){ e.preventDefault(); save(); toast('Saved'); return; }
    if(k==='d'){ e.preventDefault(); duplicateSel(); return; }
    if(k==='a'){ e.preventDefault(); S.selectedIds = S.objects.map(function(o){ return o.id; }); render(); buildPanel(); return; }
    return;
  }
  if(e.key==='Delete' || e.key==='Backspace'){ if(S.selectedIds.length){ e.preventDefault(); deleteSel(); } return; }
  if(e.key==='Escape'){ S.selectedIds = []; render(); buildPanel(); closeAllFloats(); $$('.mb').forEach(function(m){ m.classList.remove('open'); }); return; }
  if(e.key==='PageDown'){ e.preventDefault(); nextPage(); return; }
  if(e.key==='PageUp'){ e.preventDefault(); prevPage(); return; }
  if(e.key==='?'){ $('#shortcutsModal').classList.add('open'); return; }
  var kmap = {v:'select', h:'pan', p:'pen', n:'pencil', m:'marker', g:'highlighter', l:'line', a:'arrow', r:'rect', c:'circle', t:'text', s:'sticky', e:'eraser'};
  if(kmap[e.key.toLowerCase()]) setTool(kmap[e.key.toLowerCase()]);
});

/* ===== INIT ===== */
window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', function(){ if(document.hidden) save(); });
window.addEventListener('beforeunload', save);

function detectTouch(){
  var isTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints>0) || 'ontouchstart' in window;
  if(isTouch && window.innerWidth < 1400) document.body.classList.add('touch-layout');
  else document.body.classList.remove('touch-layout');
}
window.addEventListener('resize', detectTouch);

function init(){
  detectTouch();
  buildToolbar();
  buildPanel();
  buildSciencePanel();
  setTool('pen');
  updateZoomLabel();
  resize();
  load();
  updatePageNav();
  setTimeout(resize, 100);
  setTimeout(resize, 500);
  console.log('✓ ProWhiteboard initialized');
  setTimeout(function(){ toast('Ready — v6'); }, 500);
}

init();

})();
