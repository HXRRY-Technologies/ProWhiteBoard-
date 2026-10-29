/* ============================================================
   ProWhiteboard SCIENCE ULTRA — Data File
   Global: window.PWB_DATA
   Contains: elements, diagrams, formulas, calculators,
             conversions, constants
   ============================================================ */
(function(){
'use strict';

var C='#0a1222',R='#dc2626',B='#2563eb',G='#16a34a',Y='#ca8a04',P='#7c3aed',O='#ea580c',GR='#64748b';

/* ============================================================
   118 CHEMICAL ELEMENTS
   Format: [number, symbol, name, atomicMass, category]
   Categories: am=alkali, ae=alkaline, tm=transition, pt=post-transition,
               md=metalloid, nm=nonmetal, hl=halogen, ng=noble-gas,
               ln=lanthanide, an=actinide
   ============================================================ */
var elements = [
  [1,'H','Hydrogen',1.008,'nm'],
  [2,'He','Helium',4.003,'ng'],
  [3,'Li','Lithium',6.94,'am'],
  [4,'Be','Beryllium',9.012,'ae'],
  [5,'B','Boron',10.81,'md'],
  [6,'C','Carbon',12.011,'nm'],
  [7,'N','Nitrogen',14.007,'nm'],
  [8,'O','Oxygen',15.999,'nm'],
  [9,'F','Fluorine',18.998,'hl'],
  [10,'Ne','Neon',20.18,'ng'],
  [11,'Na','Sodium',22.99,'am'],
  [12,'Mg','Magnesium',24.305,'ae'],
  [13,'Al','Aluminium',26.982,'pt'],
  [14,'Si','Silicon',28.085,'md'],
  [15,'P','Phosphorus',30.974,'nm'],
  [16,'S','Sulfur',32.06,'nm'],
  [17,'Cl','Chlorine',35.45,'hl'],
  [18,'Ar','Argon',39.95,'ng'],
  [19,'K','Potassium',39.098,'am'],
  [20,'Ca','Calcium',40.078,'ae'],
  [21,'Sc','Scandium',44.956,'tm'],
  [22,'Ti','Titanium',47.867,'tm'],
  [23,'V','Vanadium',50.942,'tm'],
  [24,'Cr','Chromium',51.996,'tm'],
  [25,'Mn','Manganese',54.938,'tm'],
  [26,'Fe','Iron',55.845,'tm'],
  [27,'Co','Cobalt',58.933,'tm'],
  [28,'Ni','Nickel',58.693,'tm'],
  [29,'Cu','Copper',63.546,'tm'],
  [30,'Zn','Zinc',65.38,'tm'],
  [31,'Ga','Gallium',69.723,'pt'],
  [32,'Ge','Germanium',72.63,'md'],
  [33,'As','Arsenic',74.922,'md'],
  [34,'Se','Selenium',78.971,'nm'],
  [35,'Br','Bromine',79.904,'hl'],
  [36,'Kr','Krypton',83.798,'ng'],
  [37,'Rb','Rubidium',85.468,'am'],
  [38,'Sr','Strontium',87.62,'ae'],
  [39,'Y','Yttrium',88.906,'tm'],
  [40,'Zr','Zirconium',91.224,'tm'],
  [41,'Nb','Niobium',92.906,'tm'],
  [42,'Mo','Molybdenum',95.95,'tm'],
  [43,'Tc','Technetium',98,'tm'],
  [44,'Ru','Ruthenium',101.07,'tm'],
  [45,'Rh','Rhodium',102.91,'tm'],
  [46,'Pd','Palladium',106.42,'tm'],
  [47,'Ag','Silver',107.87,'tm'],
  [48,'Cd','Cadmium',112.41,'tm'],
  [49,'In','Indium',114.82,'pt'],
  [50,'Sn','Tin',118.71,'pt'],
  [51,'Sb','Antimony',121.76,'md'],
  [52,'Te','Tellurium',127.6,'md'],
  [53,'I','Iodine',126.9,'hl'],
  [54,'Xe','Xenon',131.29,'ng'],
  [55,'Cs','Caesium',132.91,'am'],
  [56,'Ba','Barium',137.33,'ae'],
  [57,'La','Lanthanum',138.91,'ln'],
  [58,'Ce','Cerium',140.12,'ln'],
  [59,'Pr','Praseodymium',140.91,'ln'],
  [60,'Nd','Neodymium',144.24,'ln'],
  [61,'Pm','Promethium',145,'ln'],
  [62,'Sm','Samarium',150.36,'ln'],
  [63,'Eu','Europium',151.96,'ln'],
  [64,'Gd','Gadolinium',157.25,'ln'],
  [65,'Tb','Terbium',158.93,'ln'],
  [66,'Dy','Dysprosium',162.5,'ln'],
  [67,'Ho','Holmium',164.93,'ln'],
  [68,'Er','Erbium',167.26,'ln'],
  [69,'Tm','Thulium',168.93,'ln'],
  [70,'Yb','Ytterbium',173.05,'ln'],
  [71,'Lu','Lutetium',174.97,'ln'],
  [72,'Hf','Hafnium',178.49,'tm'],
  [73,'Ta','Tantalum',180.95,'tm'],
  [74,'W','Tungsten',183.84,'tm'],
  [75,'Re','Rhenium',186.21,'tm'],
  [76,'Os','Osmium',190.23,'tm'],
  [77,'Ir','Iridium',192.22,'tm'],
  [78,'Pt','Platinum',195.08,'tm'],
  [79,'Au','Gold',196.97,'tm'],
  [80,'Hg','Mercury',200.59,'tm'],
  [81,'Tl','Thallium',204.38,'pt'],
  [82,'Pb','Lead',207.2,'pt'],
  [83,'Bi','Bismuth',208.98,'pt'],
  [84,'Po','Polonium',209,'pt'],
  [85,'At','Astatine',210,'hl'],
  [86,'Rn','Radon',222,'ng'],
  [87,'Fr','Francium',223,'am'],
  [88,'Ra','Radium',226,'ae'],
  [89,'Ac','Actinium',227,'an'],
  [90,'Th','Thorium',232.04,'an'],
  [91,'Pa','Protactinium',231.04,'an'],
  [92,'U','Uranium',238.03,'an'],
  [93,'Np','Neptunium',237,'an'],
  [94,'Pu','Plutonium',244,'an'],
  [95,'Am','Americium',243,'an'],
  [96,'Cm','Curium',247,'an'],
  [97,'Bk','Berkelium',247,'an'],
  [98,'Cf','Californium',251,'an'],
  [99,'Es','Einsteinium',252,'an'],
  [100,'Fm','Fermium',257,'an'],
  [101,'Md','Mendelevium',258,'an'],
  [102,'No','Nobelium',259,'an'],
  [103,'Lr','Lawrencium',266,'an'],
  [104,'Rf','Rutherfordium',267,'tm'],
  [105,'Db','Dubnium',268,'tm'],
  [106,'Sg','Seaborgium',269,'tm'],
  [107,'Bh','Bohrium',270,'tm'],
  [108,'Hs','Hassium',277,'tm'],
  [109,'Mt','Meitnerium',278,'tm'],
  [110,'Ds','Darmstadtium',281,'tm'],
  [111,'Rg','Roentgenium',282,'tm'],
  [112,'Cn','Copernicium',285,'tm'],
  [113,'Nh','Nihonium',286,'pt'],
  [114,'Fl','Flerovium',289,'pt'],
  [115,'Mc','Moscovium',290,'pt'],
  [116,'Lv','Livermorium',293,'pt'],
  [117,'Ts','Tennessine',294,'hl'],
  [118,'Og','Oganesson',294,'ng']
];

/* Build lookup map */
var elemMap = {};
elements.forEach(function(e){
  elemMap[e[1]] = {n:e[0], s:e[1], name:e[2], m:e[3], c:e[4]};
});

/* Category colors for periodic table */
var elemColors = {
  am:'#fee2e2', ae:'#fef3c7', tm:'#fce7f3', pt:'#dbeafe',
  md:'#dcfce7', nm:'#ffffff', hl:'#dcfce7', ng:'#e0e7ff',
  ln:'#f3e8ff', an:'#fce7f3'
};

var elemLabels = {
  am:'Alkali', ae:'Alkaline', tm:'Transition', pt:'Post-transition',
  md:'Metalloid', nm:'Nonmetal', hl:'Halogen', ng:'Noble Gas',
  ln:'Lanthanide', an:'Actinide'
};

/* ============================================================
   SCIENTIFIC DIAGRAMS (Canvas draw functions)
   Format: {n:'name', w, h, d:function(ctx, w, h){...}}
   Organized by: domain -> category -> array
   ============================================================ */
var diagrams = {

  /* ---------- PHYSICS ---------- */
  physics: {
    circuit: [
      {n:'Resistor', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2; c.lineCap='round';
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.2,h/2);
        for(var i=0;i<8;i++){ var x=w*0.2+(w*0.6/8)*(i+0.5); var y=h/2+(i%2===0?-h*0.25:h*0.25); c.lineTo(x,y); }
        c.lineTo(w*0.8,h/2); c.lineTo(w,h/2); c.stroke();
      }},
      {n:'Capacitor', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.4,h/2);
        c.moveTo(w*0.6,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.moveTo(w*0.4,h*0.15); c.lineTo(w*0.4,h*0.85);
        c.moveTo(w*0.6,h*0.15); c.lineTo(w*0.6,h*0.85); c.stroke();
      }},
      {n:'Battery', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.35,h/2);
        c.moveTo(w*0.65,h/2); c.lineTo(w,h/2); c.stroke();
        c.lineWidth=3;
        c.beginPath(); c.moveTo(w*0.35,h*0.2); c.lineTo(w*0.35,h*0.8); c.stroke();
        c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.65,h*0.3); c.lineTo(w*0.65,h*0.7); c.stroke();
      }},
      {n:'Switch', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.35,h/2);
        c.moveTo(w*0.65,h/2); c.lineTo(w,h/2); c.stroke();
        c.fillStyle=C; c.beginPath(); c.arc(w*0.35,h/2,3,0,Math.PI*2); c.fill();
        c.beginPath(); c.arc(w*0.65,h/2,3,0,Math.PI*2); c.fill();
        c.beginPath(); c.moveTo(w*0.35,h/2); c.lineTo(w*0.65,h*0.2); c.stroke();
      }},
      {n:'Bulb', w:80, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.25,h/2); c.stroke();
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.25,0,Math.PI*2); c.stroke();
        c.beginPath(); c.moveTo(w*0.4,h*0.4); c.lineTo(w*0.6,h*0.6);
        c.moveTo(w*0.6,h*0.4); c.lineTo(w*0.4,h*0.6); c.stroke();
        c.beginPath(); c.moveTo(w*0.75,h/2); c.lineTo(w,h/2); c.stroke();
      }},
      {n:'Diode', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.35,h/2); c.stroke();
        c.fillStyle=C; c.beginPath();
        c.moveTo(w*0.35,h*0.25); c.lineTo(w*0.35,h*0.75); c.lineTo(w*0.65,h/2);
        c.closePath(); c.fill();
        c.beginPath(); c.moveTo(w*0.65,h*0.2); c.lineTo(w*0.65,h*0.8); c.stroke();
        c.beginPath(); c.moveTo(w*0.65,h/2); c.lineTo(w,h/2); c.stroke();
      }},
      {n:'Ammeter', w:80, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.25,h/2);
        c.moveTo(w*0.75,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.25,0,Math.PI*2);
        c.fillStyle='#fff'; c.fill(); c.stroke();
        c.fillStyle=C; c.font='bold '+Math.min(w,h)*0.28+'px Arial';
        c.textAlign='center'; c.textBaseline='middle';
        c.fillText('A',w/2,h/2);
      }},
      {n:'Voltmeter', w:80, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.25,h/2);
        c.moveTo(w*0.75,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.25,0,Math.PI*2);
        c.fillStyle='#fff'; c.fill(); c.stroke();
        c.fillStyle=C; c.font='bold '+Math.min(w,h)*0.28+'px Arial';
        c.textAlign='center'; c.textBaseline='middle';
        c.fillText('V',w/2,h/2);
      }},
      {n:'Inductor', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2; c.lineCap='round';
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.15,h/2); c.stroke();
        c.beginPath();
        for(var i=0;i<4;i++){
          var x1=w*0.15+i*w*0.175;
          c.arc(x1+w*0.0875, h/2, w*0.0875, Math.PI, 0);
        }
        c.stroke();
        c.beginPath(); c.moveTo(w*0.85,h/2); c.lineTo(w,h/2); c.stroke();
      }},
      {n:'Ground', w:60, h:60, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w/2,0); c.lineTo(w/2,h*0.5); c.stroke();
        c.beginPath(); c.moveTo(w*0.15,h*0.5); c.lineTo(w*0.85,h*0.5); c.stroke();
        c.beginPath(); c.moveTo(w*0.28,h*0.7); c.lineTo(w*0.72,h*0.7); c.stroke();
        c.beginPath(); c.moveTo(w*0.4,h*0.9); c.lineTo(w*0.6,h*0.9); c.stroke();
      }},
      {n:'AC Source', w:80, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.2,h/2);
        c.moveTo(w*0.8,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.28,0,Math.PI*2);
        c.fillStyle='#fff'; c.fill(); c.stroke();
        c.strokeStyle=B; c.lineWidth=1.5;
        c.beginPath();
        for(var i=0;i<=20;i++){
          var t=i/20, x=w*0.3+t*w*0.4, y=h/2 - Math.sin(t*Math.PI*2)*h*0.12;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
      }}
    ],
    optics: [
      {n:'Convex Lens', w:80, h:120, d:function(c,w,h){
        c.strokeStyle=B; c.fillStyle='rgba(59,130,246,0.15)'; c.lineWidth=2;
        c.beginPath(); c.moveTo(w/2,0);
        c.quadraticCurveTo(w*0.95,h/2,w/2,h);
        c.quadraticCurveTo(w*0.05,h/2,w/2,0);
        c.fill(); c.stroke();
        c.setLineDash([4,4]); c.strokeStyle=C; c.lineWidth=1;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.setLineDash([]);
      }},
      {n:'Concave Lens', w:80, h:120, d:function(c,w,h){
        c.strokeStyle=B; c.fillStyle='rgba(59,130,246,0.15)'; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w*0.5,0);
        c.quadraticCurveTo(w*0.15,h/2,w*0.5,h);
        c.quadraticCurveTo(w*0.85,h/2,w*0.5,0);
        c.fill(); c.stroke();
        c.setLineDash([4,4]); c.strokeStyle=C; c.lineWidth=1;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.setLineDash([]);
      }},
      {n:'Mirror', w:80, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.5,h*0.05); c.lineTo(w*0.5,h*0.95); c.stroke();
        c.strokeStyle=B;
        for(var i=0;i<6;i++){
          var y=h*0.1+i*h*0.15;
          c.beginPath(); c.moveTo(w*0.5,y); c.lineTo(w*0.75,y-h*0.05); c.stroke();
        }
      }},
      {n:'Prism', w:120, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w/2,0); c.lineTo(w,h); c.lineTo(0,h); c.closePath();
        c.fillStyle='rgba(236,72,153,0.1)'; c.fill(); c.stroke();
        var cols=[R,O,Y,G,B,P];
        for(var i=0;i<6;i++){
          c.strokeStyle=cols[i]; c.lineWidth=1.5;
          c.beginPath(); c.moveTo(w*0.5,h*0.3);
          c.lineTo(w*0.9,h*(0.4+i*0.08)); c.stroke();
        }
      }},
      {n:'Eye', w:120, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2; c.fillStyle='#fff';
        c.beginPath();
        c.moveTo(w*0.05,h/2);
        c.quadraticCurveTo(w/2,h*0.1,w*0.95,h/2);
        c.quadraticCurveTo(w/2,h*0.9,w*0.05,h/2);
        c.fill(); c.stroke();
        c.fillStyle=B; c.beginPath(); c.arc(w/2,h/2,w*0.15,0,Math.PI*2); c.fill();
        c.fillStyle=C; c.beginPath(); c.arc(w/2,h/2,w*0.06,0,Math.PI*2); c.fill();
      }},
      {n:'Telescope', w:120, h:80, d:function(c,w,h){
        c.strokeStyle=GR; c.lineWidth=4; c.lineCap='round';
        c.beginPath(); c.moveTo(w*0.1,h*0.8); c.lineTo(w*0.5,h*0.4); c.stroke();
        c.strokeStyle=C; c.lineWidth=6;
        c.beginPath(); c.moveTo(w*0.4,h*0.5); c.lineTo(w*0.75,h*0.25); c.stroke();
        c.strokeStyle=GR; c.lineWidth=3;
        c.beginPath(); c.moveTo(w*0.05,h*0.85); c.lineTo(w*0.2,h*0.7); c.stroke();
      }}
    ],
    mechanics: [
      {n:'Vector', w:100, h:80, d:function(c,w,h){
        c.strokeStyle=R; c.lineWidth=2.5; c.lineCap='round';
        c.beginPath(); c.moveTo(w*0.1,h*0.9); c.lineTo(w*0.9,h*0.1); c.stroke();
        var ang=Math.atan2(-h*0.8,w*0.8);
        c.beginPath(); c.moveTo(w*0.9,h*0.1);
        c.lineTo(w*0.9-Math.cos(ang-Math.PI/6)*w*0.15, h*0.1-Math.sin(ang-Math.PI/6)*h*0.15);
        c.moveTo(w*0.9,h*0.1);
        c.lineTo(w*0.9-Math.cos(ang+Math.PI/6)*w*0.15, h*0.1-Math.sin(ang+Math.PI/6)*h*0.15);
        c.stroke();
      }},
      {n:'Wave', w:160, h:60, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2;
        c.beginPath();
        for(var x=0;x<w;x++){
          var y=h/2 + Math.sin(x/w*Math.PI*4)*h*0.35;
          if(x===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
        c.strokeStyle=C; c.lineWidth=1; c.setLineDash([4,4]);
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.setLineDash([]);
      }},
      {n:'Pulley', w:100, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w/2,0); c.lineTo(w/2,h*0.15); c.stroke();
        c.beginPath(); c.arc(w/2,h*0.25,Math.min(w,h)*0.12,0,Math.PI*2);
        c.fillStyle='#fff'; c.fill(); c.stroke();
        c.beginPath(); c.arc(w/2,h*0.25,3,0,Math.PI*2); c.fillStyle=C; c.fill();
        c.beginPath();
        c.moveTo(w*0.38,h*0.25); c.lineTo(w*0.15,h*0.9);
        c.moveTo(w*0.62,h*0.25); c.lineTo(w*0.85,h*0.9); c.stroke();
        c.fillStyle=Y;
        c.fillRect(w*0.05,h*0.9,w*0.2,h*0.08);
        c.fillRect(w*0.75,h*0.9,w*0.2,h*0.08);
      }},
      {n:'Incline', w:140, h:90, d:function(c,w,h){
        c.fillStyle='rgba(148,163,184,0.3)'; c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.05,h*0.9); c.lineTo(w*0.95,h*0.9); c.lineTo(w*0.95,h*0.15); c.closePath();
        c.fill(); c.stroke();
        c.fillStyle=Y;
        c.save();
        c.translate(w*0.65,h*0.55); c.rotate(-0.45);
        c.fillRect(-w*0.06,-h*0.08,w*0.12,h*0.16);
        c.strokeRect(-w*0.06,-h*0.08,w*0.12,h*0.16);
        c.restore();
      }},
      {n:'Pendulum', w:100, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.2,h*0.05); c.lineTo(w*0.8,h*0.05); c.stroke();
        c.beginPath(); c.moveTo(w/2,h*0.05); c.lineTo(w/2,h*0.85); c.stroke();
        c.fillStyle=Y; c.beginPath(); c.arc(w/2,h*0.9,Math.min(w,h)*0.1,0,Math.PI*2);
        c.fill(); c.stroke();
      }},
      {n:'Projectile', w:160, h:100, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.05,h*0.9);
        c.quadraticCurveTo(w*0.5,-h*0.3,w*0.95,h*0.9); c.stroke();
        c.strokeStyle=C; c.lineWidth=1.5; c.setLineDash([4,4]);
        c.beginPath(); c.moveTo(0,h*0.9); c.lineTo(w,h*0.9); c.stroke();
        c.setLineDash([]);
      }},
      {n:'Spring', w:120, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w*0.15,h/2); c.stroke();
        c.beginPath(); c.moveTo(w*0.15,h/2);
        for(var i=1;i<=10;i++){
          var x=w*0.15+i*w*0.06;
          var y=h/2+(i%2===0?-h*0.35:h*0.35);
          c.lineTo(x,y);
        }
        c.lineTo(w*0.85,h/2); c.stroke();
        c.beginPath(); c.moveTo(w*0.85,h/2); c.lineTo(w,h/2); c.stroke();
      }},
      {n:'Free Body', w:100, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.fillStyle='rgba(148,163,184,0.3)';
        c.fillRect(w*0.35,h*0.35,w*0.3,h*0.3);
        c.strokeRect(w*0.35,h*0.35,w*0.3,h*0.3);
        c.strokeStyle=R;
        c.beginPath(); c.moveTo(w*0.5,h*0.5); c.lineTo(w*0.5,h*0.05); c.stroke();
        c.beginPath(); c.moveTo(w*0.5,h*0.1); c.lineTo(w*0.45,h*0.15);
        c.moveTo(w*0.5,h*0.1); c.lineTo(w*0.55,h*0.15); c.stroke();
        c.strokeStyle=G;
        c.beginPath(); c.moveTo(w*0.5,h*0.5); c.lineTo(w*0.5,h*0.95); c.stroke();
        c.strokeStyle=B;
        c.beginPath(); c.moveTo(w*0.5,h*0.5); c.lineTo(w*0.95,h*0.5); c.stroke();
      }}
    ],
    em: [
      {n:'Bar Magnet', w:140, h:40, d:function(c,w,h){
        c.fillStyle=R; c.fillRect(w*0.1,h*0.25,w*0.4,h*0.5);
        c.fillStyle=B; c.fillRect(w*0.5,h*0.25,w*0.4,h*0.5);
        c.fillStyle='#fff'; c.font='bold 14px Arial';
        c.textAlign='center'; c.textBaseline='middle';
        c.fillText('N',w*0.3,h/2); c.fillText('S',w*0.7,h/2);
      }},
      {n:'Field Lines', w:120, h:120, d:function(c,w,h){
        c.fillStyle=R; c.fillRect(w*0.4,h*0.4,w*0.2,h*0.2);
        c.fillStyle='#fff'; c.font='bold 10px Arial';
        c.textAlign='center'; c.textBaseline='middle';
        c.fillText('N',w*0.5,h*0.5);
        c.strokeStyle=B; c.lineWidth=1.2;
        for(var i=0;i<4;i++){
          c.beginPath();
          var r1=w*0.12+i*w*0.06;
          c.arc(w*0.5,h*0.5,r1,0,Math.PI*2);
          c.stroke();
        }
      }},
      {n:'Solenoid', w:140, h:60, d:function(c,w,h){
        c.strokeStyle=GR; c.lineWidth=1;
        c.strokeRect(w*0.15,h*0.3,w*0.7,h*0.4);
        c.strokeStyle=R; c.lineWidth=1.5;
        for(var i=0;i<6;i++){
          var x1=w*0.15+i*w*0.12;
          c.beginPath();
          c.arc(x1+w*0.06,h*0.3,w*0.06,Math.PI,0);
          c.stroke();
          c.beginPath();
          c.arc(x1+w*0.06,h*0.7,w*0.06,0,Math.PI);
          c.stroke();
        }
        c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.moveTo(0,h*0.5); c.lineTo(w*0.15,h*0.5); c.stroke();
        c.beginPath(); c.moveTo(w*0.85,h*0.5); c.lineTo(w,h*0.5); c.stroke();
      }},
      {n:'EM Wave', w:160, h:80, d:function(c,w,h){
        c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        for(var x=0;x<w;x++){
          var y=h/2 + Math.sin(x/w*Math.PI*4)*h*0.35;
          if(x===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
        c.strokeStyle=B;
        c.beginPath();
        for(var x=0;x<w;x++){
          var y=h/2 - Math.sin(x/w*Math.PI*4)*h*0.15;
          if(x===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
        c.strokeStyle=C; c.lineWidth=0.5;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
      }}
    ],
    modern: [
      {n:'Bohr Atom', w:100, h:100, d:function(c,w,h){
        c.fillStyle=R; c.beginPath(); c.arc(w/2,h/2,w*0.06,0,Math.PI*2); c.fill();
        c.strokeStyle=B; c.lineWidth=1.5;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,0,0,Math.PI*2); c.stroke();
        c.strokeStyle=G;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,Math.PI/3,0,Math.PI*2); c.stroke();
        c.strokeStyle=Y;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,-Math.PI/3,0,Math.PI*2); c.stroke();
      }},
      {n:'s Orbital', w:100, h:100, d:function(c,w,h){
        c.fillStyle='rgba(79,70,229,0.15)';
        c.strokeStyle=P; c.lineWidth=2;
        c.beginPath(); c.arc(w/2,h/2,w*0.35,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='rgba(79,70,229,0.25)';
        c.beginPath(); c.arc(w/2,h/2,w*0.2,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle=P;
        c.beginPath(); c.arc(w/2,h/2,w*0.06,0,Math.PI*2); c.fill();
      }},
      {n:'p Orbital', w:120, h:100, d:function(c,w,h){
        c.fillStyle='rgba(79,70,229,0.15)';
        c.strokeStyle=P; c.lineWidth=2;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.38,h*0.15,0,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='rgba(236,72,153,0.15)';
        c.strokeStyle=R;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.15,h*0.38,0,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle=C;
        c.beginPath(); c.arc(w/2,h/2,w*0.04,0,Math.PI*2); c.fill();
      }}
    ]
  },

  /* ---------- CHEMISTRY ---------- */
  chemistry: {
    apparatus: [
      {n:'Flask', w:80, h:110, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w*0.35,0); c.lineTo(w*0.35,h*0.4);
        c.lineTo(w*0.1,h*0.95); c.lineTo(w*0.9,h*0.95);
        c.lineTo(w*0.65,h*0.4); c.lineTo(w*0.65,0); c.closePath();
        c.fillStyle='rgba(16,185,129,0.1)'; c.fill(); c.stroke();
        c.fillStyle='rgba(59,130,246,0.4)';
        c.beginPath();
        c.moveTo(w*0.2,h*0.7); c.lineTo(w*0.8,h*0.7);
        c.lineTo(w*0.9,h*0.95); c.lineTo(w*0.1,h*0.95); c.closePath();
        c.fill();
      }},
      {n:'Beaker', w:90, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.15,0); c.lineTo(w*0.15,h*0.9);
        c.quadraticCurveTo(w*0.15,h*0.95,w*0.25,h*0.95);
        c.lineTo(w*0.75,h*0.95);
        c.quadraticCurveTo(w*0.85,h*0.95,w*0.85,h*0.9);
        c.lineTo(w*0.85,0); c.stroke();
        c.fillStyle='rgba(59,130,246,0.4)';
        c.fillRect(w*0.15,h*0.5,w*0.7,h*0.45);
      }},
      {n:'Test Tube', w:40, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.35,0); c.lineTo(w*0.35,h*0.85);
        c.quadraticCurveTo(w*0.35,h*0.98,w*0.5,h*0.98);
        c.quadraticCurveTo(w*0.65,h*0.98,w*0.65,h*0.85);
        c.lineTo(w*0.65,0); c.stroke();
        c.fillStyle='rgba(236,72,153,0.4)';
        c.beginPath();
        c.moveTo(w*0.35,h*0.5); c.lineTo(w*0.65,h*0.5);
        c.lineTo(w*0.65,h*0.85);
        c.quadraticCurveTo(w*0.65,h*0.98,w*0.5,h*0.98);
        c.quadraticCurveTo(w*0.35,h*0.98,w*0.35,h*0.85);
        c.closePath(); c.fill();
      }},
      {n:'Burner', w:70, h:120, d:function(c,w,h){
        c.fillStyle='#475569';
        c.fillRect(w*0.15,h*0.88,w*0.7,h*0.08);
        c.fillStyle='#94a3b8';
        c.fillRect(w*0.3,h*0.5,w*0.4,h*0.4);
        c.strokeStyle=C; c.lineWidth=1; c.strokeRect(w*0.3,h*0.5,w*0.4,h*0.4);
        c.fillStyle='#64748b';
        c.fillRect(w*0.4,h*0.45,w*0.2,h*0.08);
        c.fillStyle='#fbbf24';
        c.beginPath();
        c.moveTo(w/2,h*0.5); c.quadraticCurveTo(w*0.3,h*0.2,w/2,h*0.05);
        c.quadraticCurveTo(w*0.7,h*0.2,w/2,h*0.5); c.fill();
        c.fillStyle='#fef08a';
        c.beginPath();
        c.moveTo(w/2,h*0.5); c.quadraticCurveTo(w*0.42,h*0.35,w/2,h*0.25);
        c.quadraticCurveTo(w*0.58,h*0.35,w/2,h*0.5); c.fill();
      }},
      {n:'Burette', w:40, h:140, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.strokeRect(w*0.35,h*0.05,w*0.3,h*0.7);
        for(var i=0;i<6;i++){
          c.beginPath();
          c.moveTo(w*0.3,h*0.15+i*h*0.1);
          c.lineTo(w*0.35,h*0.15+i*h*0.1); c.stroke();
        }
        c.beginPath(); c.moveTo(w*0.5,h*0.75);
        c.lineTo(w*0.5,h*0.85); c.lineTo(w*0.55,h*0.9);
        c.lineTo(w*0.5,h*0.92); c.lineTo(w*0.45,h*0.9);
        c.lineTo(w*0.5,h*0.85); c.stroke();
      }},
      {n:'Pipette', w:30, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.fillStyle='#94a3b8';
        c.fillRect(w*0.3,h*0.1,w*0.4,h*0.35);
        c.beginPath();
        c.moveTo(w*0.3,h*0.45); c.lineTo(w*0.3,h*0.7);
        c.quadraticCurveTo(w*0.3,h*0.85,w/2,h*0.9);
        c.quadraticCurveTo(w*0.7,h*0.85,w*0.7,h*0.7);
        c.lineTo(w*0.7,h*0.45); c.closePath();
        c.fillStyle='rgba(59,130,246,0.4)'; c.fill(); c.stroke();
      }},
      {n:'Funnel', w:80, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.fillStyle='rgba(148,163,184,0.2)';
        c.beginPath();
        c.moveTo(w*0.05,h*0.05); c.lineTo(w*0.95,h*0.05);
        c.lineTo(w*0.55,h*0.55); c.lineTo(w*0.55,h*0.95);
        c.lineTo(w*0.45,h*0.95); c.lineTo(w*0.45,h*0.55);
        c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Thermometer', w:30, h:140, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.strokeRect(w*0.35,h*0.05,w*0.3,h*0.75);
        c.fillStyle=R;
        c.beginPath(); c.arc(w/2,h*0.87,w*0.25,0,Math.PI*2); c.fill(); c.stroke();
        c.fillRect(w*0.35,h*0.5,w*0.3,h*0.4);
      }},
      {n:'Watch Glass', w:100, h:40, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.fillStyle='rgba(148,163,184,0.3)';
        c.beginPath();
        c.moveTo(w*0.05,h*0.9);
        c.quadraticCurveTo(w*0.5,-h*0.4,w*0.95,h*0.9);
        c.quadraticCurveTo(w*0.5,h*0.6,w*0.05,h*0.9);
        c.fill(); c.stroke();
      }},
      {n:'Round Flask', w:90, h:110, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.arc(w/2,h*0.65,Math.min(w,h)*0.35,0,Math.PI*2);
        c.fillStyle='rgba(59,130,246,0.2)'; c.fill(); c.stroke();
        c.beginPath(); c.moveTo(w*0.35,h*0.35); c.lineTo(w*0.35,h*0.05);
        c.lineTo(w*0.65,h*0.05); c.lineTo(w*0.65,h*0.35); c.stroke();
      }},
      {n:'Crucible', w:90, h:70, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.fillStyle='rgba(148,163,184,0.3)';
        c.beginPath();
        c.moveTo(w*0.1,h*0.2); c.lineTo(w*0.9,h*0.2);
        c.lineTo(w*0.85,h*0.75); c.lineTo(w*0.15,h*0.75);
        c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Weighing', w:100, h:90, d:function(c,w,h){
        c.fillStyle=GR; c.fillRect(w*0.1,h*0.75,w*0.8,h*0.15);
        c.fillStyle='#94a3b8'; c.fillRect(w*0.3,h*0.6,w*0.4,h*0.15);
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.arc(w/2,h*0.35,Math.min(w,h)*0.22,0,Math.PI*2);
        c.fillStyle='#fff'; c.fill(); c.stroke();
        c.beginPath(); c.moveTo(w/2,h*0.35); c.lineTo(w*0.7,h*0.25); c.stroke();
        c.fillStyle=C; c.beginPath(); c.arc(w/2,h*0.35,2,0,Math.PI*2); c.fill();
      }},
      {n:'Retort Stand', w:90, h:120, d:function(c,w,h){
        c.fillStyle=GR; c.fillRect(w*0.1,h*0.88,w*0.6,h*0.08);
        c.fillStyle=C; c.fillRect(w*0.45,h*0.05,w*0.05,h*0.85);
        c.fillRect(w*0.2,h*0.3,w*0.6,h*0.04);
      }},
      {n:'Wire Gauze', w:100, h:30, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1;
        c.strokeRect(w*0.1,h*0.35,w*0.8,h*0.3);
        for(var i=1;i<4;i++){
          c.beginPath(); c.moveTo(w*0.1+i*w*0.2,h*0.35);
          c.lineTo(w*0.1+i*w*0.2,h*0.65); c.stroke();
        }
      }}
    ],
    molecules: [
      {n:'Water', w:120, h:80, d:function(c,w,h){
        c.fillStyle='#fee2e2'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath(); c.arc(w*0.5,h*0.6,w*0.14,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#dbeafe'; c.strokeStyle=B;
        c.beginPath(); c.arc(w*0.25,h*0.25,w*0.1,0,Math.PI*2); c.fill(); c.stroke();
        c.beginPath(); c.arc(w*0.75,h*0.25,w*0.1,0,Math.PI*2); c.fill(); c.stroke();
        c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.moveTo(w*0.5,h*0.6); c.lineTo(w*0.25,h*0.25); c.stroke();
        c.beginPath(); c.moveTo(w*0.5,h*0.6); c.lineTo(w*0.75,h*0.25); c.stroke();
        c.fillStyle='#fff'; c.font='bold 9px Arial'; c.textAlign='center'; c.textBaseline='middle';
        c.fillText('O',w*0.5,h*0.6); c.fillText('H',w*0.25,h*0.25); c.fillText('H',w*0.75,h*0.25);
      }},
      {n:'CO2', w:140, h:60, d:function(c,w,h){
        c.fillStyle='#334155'; c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.arc(w*0.5,h*0.5,w*0.12,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#fee2e2'; c.strokeStyle=R;
        c.beginPath(); c.arc(w*0.18,h*0.5,w*0.1,0,Math.PI*2); c.fill(); c.stroke();
        c.beginPath(); c.arc(w*0.82,h*0.5,w*0.1,0,Math.PI*2); c.fill(); c.stroke();
        c.strokeStyle=C; c.lineWidth=2.5;
        c.beginPath(); c.moveTo(w*0.28,h*0.5); c.lineTo(w*0.38,h*0.5); c.stroke();
        c.beginPath(); c.moveTo(w*0.62,h*0.5); c.lineTo(w*0.72,h*0.5); c.stroke();
      }},
      {n:'Methane', w:120, h:110, d:function(c,w,h){
        c.fillStyle='#334155'; c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.arc(w/2,h*0.5,w*0.12,0,Math.PI*2); c.fill(); c.stroke();
        var pos=[[w*0.5,h*0.15],[w*0.25,h*0.8],[w*0.75,h*0.8],[w*0.2,h*0.3],[w*0.8,h*0.3]];
        pos.forEach(function(p){
          c.strokeStyle=C; c.lineWidth=1.5;
          c.beginPath(); c.moveTo(w/2,h*0.5); c.lineTo(p[0],p[1]); c.stroke();
          c.fillStyle='#dbeafe'; c.strokeStyle=B;
          c.beginPath(); c.arc(p[0],p[1],w*0.08,0,Math.PI*2); c.fill(); c.stroke();
        });
      }},
      {n:'Benzene', w:100, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath();
        for(var i=0;i<6;i++){
          var a=-Math.PI/2+i*Math.PI/3;
          var x=w/2+Math.cos(a)*w*0.35;
          var y=h/2+Math.sin(a)*h*0.35;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.closePath(); c.stroke();
        c.beginPath(); c.arc(w/2,h/2,w*0.18,0,Math.PI*2); c.stroke();
      }},
      {n:'Atom', w:100, h:100, d:function(c,w,h){
        c.fillStyle=R;
        c.beginPath(); c.arc(w/2,h/2,w*0.08,0,Math.PI*2); c.fill();
        c.strokeStyle=B; c.lineWidth=1.5;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,0,0,Math.PI*2); c.stroke();
        c.strokeStyle=G;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,Math.PI/3,0,Math.PI*2); c.stroke();
        c.strokeStyle=Y;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.4,h*0.15,-Math.PI/3,0,Math.PI*2); c.stroke();
        c.fillStyle=B;
        c.beginPath(); c.arc(w*0.9,h*0.5,3,0,Math.PI*2); c.fill();
        c.fillStyle=G;
        c.beginPath(); c.arc(w*0.3,h*0.7,3,0,Math.PI*2); c.fill();
      }},
      {n:'Amino Acid', w:140, h:80, d:function(c,w,h){
        c.fillStyle='#334155'; c.beginPath(); c.arc(w*0.5,h*0.5,w*0.1,0,Math.PI*2); c.fill();
        c.fillStyle='#dbeafe'; c.strokeStyle=B; c.lineWidth=1.5;
        c.beginPath(); c.arc(w*0.28,h*0.25,w*0.08,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#fee2e2'; c.strokeStyle=R;
        c.beginPath(); c.arc(w*0.28,h*0.75,w*0.08,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#dcfce7'; c.strokeStyle=G;
        c.beginPath(); c.arc(w*0.72,h*0.25,w*0.08,0,Math.PI*2); c.fill(); c.stroke();
      }}
    ]
  },

  /* ---------- BIOLOGY ---------- */
  biology: {
    cells: [
      {n:'Plant Cell', w:120, h:120, d:function(c,w,h){
        c.strokeStyle=G; c.lineWidth=3; c.fillStyle='rgba(34,197,94,0.15)';
        c.beginPath();
        if(c.roundRect) c.roundRect(w*0.1,h*0.1,w*0.8,h*0.8,15);
        else { var r=15;c.beginPath();c.moveTo(w*0.1+r,h*0.1);c.lineTo(w*0.9-r,h*0.1);c.quadraticCurveTo(w*0.9,h*0.1,w*0.9,h*0.1+r);c.lineTo(w*0.9,h*0.9-r);c.quadraticCurveTo(w*0.9,h*0.9,w*0.9-r,h*0.9);c.lineTo(w*0.1+r,h*0.9);c.quadraticCurveTo(w*0.1,h*0.9,w*0.1,h*0.9-r);c.lineTo(w*0.1,h*0.1+r);c.quadraticCurveTo(w*0.1,h*0.1,w*0.1+r,h*0.1);}
        c.fill(); c.stroke();
        c.fillStyle='rgba(147,51,234,0.4)'; c.strokeStyle=P; c.lineWidth=1.5;
        c.beginPath(); c.arc(w/2,h/2,w*0.16,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='rgba(34,197,94,0.5)'; c.strokeStyle=G;
        for(var i=0;i<4;i++){
          var a=i*Math.PI/2+Math.PI/4;
          var x=w/2+Math.cos(a)*w*0.25;
          var y=h/2+Math.sin(a)*h*0.25;
          c.beginPath(); c.ellipse(x,y,w*0.06,h*0.04,a,0,Math.PI*2); c.fill(); c.stroke();
        }
      }},
      {n:'Animal Cell', w:120, h:120, d:function(c,w,h){
        c.strokeStyle='#db2777'; c.lineWidth=2; c.fillStyle='rgba(236,72,153,0.15)';
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.4,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='rgba(147,51,234,0.4)'; c.strokeStyle=P; c.lineWidth=1.5;
        c.beginPath(); c.arc(w/2,h/2,w*0.16,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle=R;
        c.beginPath(); c.arc(w/2,h/2,w*0.04,0,Math.PI*2); c.fill();
      }},
      {n:'Bacteria', w:120, h:80, d:function(c,w,h){
        c.fillStyle='rgba(34,197,94,0.3)'; c.strokeStyle=G; c.lineWidth=2;
        c.beginPath(); c.ellipse(w/2,h/2,w*0.35,h*0.25,0,0,Math.PI*2); c.fill(); c.stroke();
        c.strokeStyle=G;
        for(var i=0;i<6;i++){
          var a=i*Math.PI/3;
          var x1=w/2+Math.cos(a)*w*0.35;
          var y1=h/2+Math.sin(a)*h*0.25;
          var x2=w/2+Math.cos(a)*w*0.45;
          var y2=h/2+Math.sin(a)*h*0.35;
          c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
        }
      }},
      {n:'Virus', w:100, h:120, d:function(c,w,h){
        c.fillStyle='rgba(239,68,68,0.3)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        for(var i=0;i<6;i++){
          var a=-Math.PI/2+i*Math.PI/3;
          var x=w/2+Math.cos(a)*w*0.28;
          var y=h*0.4+Math.sin(a)*h*0.2;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.closePath(); c.fill(); c.stroke();
        c.fillStyle=R;
        c.beginPath(); c.arc(w/2,h*0.4,w*0.1,0,Math.PI*2); c.fill();
        c.strokeStyle=R;
        c.beginPath(); c.moveTo(w/2,h*0.6); c.lineTo(w/2,h*0.95); c.stroke();
      }},
      {n:'DNA', w:60, h:180, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2.5;
        c.beginPath();
        for(var y=0;y<h;y++){
          var x=w*0.3+Math.sin(y/h*Math.PI*4)*w*0.2;
          if(y===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
        c.strokeStyle=R;
        c.beginPath();
        for(var y=0;y<h;y++){
          var x=w*0.7-Math.sin(y/h*Math.PI*4)*w*0.2;
          if(y===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
      }},
      {n:'RBC', w:100, h:100, d:function(c,w,h){
        c.fillStyle='rgba(220,38,38,0.4)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath(); c.arc(w/2,h/2,w*0.4,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#fff'; c.strokeStyle=R;
        c.beginPath(); c.arc(w/2,h/2,w*0.25,0,Math.PI*2); c.fill(); c.stroke();
      }}
    ],
    organs: [
      {n:'Heart', w:100, h:100, d:function(c,w,h){
        c.fillStyle='rgba(220,38,38,0.3)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w*0.5,h*0.85);
        c.bezierCurveTo(w*0.05,h*0.5,w*0.05,h*0.15,w*0.5,h*0.3);
        c.bezierCurveTo(w*0.95,h*0.15,w*0.95,h*0.5,w*0.5,h*0.85);
        c.fill(); c.stroke();
      }},
      {n:'Brain', w:100, h:100, d:function(c,w,h){
        c.strokeStyle=R; c.lineWidth=2; c.fillStyle='rgba(236,72,153,0.2)';
        c.beginPath();
        c.moveTo(w*0.3,h*0.3);
        c.bezierCurveTo(w*0.15,h*0.15,w*0.3,h*0.05,w*0.5,h*0.2);
        c.bezierCurveTo(w*0.7,h*0.05,w*0.85,h*0.15,w*0.7,h*0.3);
        c.bezierCurveTo(w*0.9,h*0.4,w*0.85,h*0.7,w*0.6,h*0.75);
        c.bezierCurveTo(w*0.5,h*0.9,w*0.3,h*0.85,w*0.25,h*0.7);
        c.bezierCurveTo(w*0.1,h*0.6,w*0.1,h*0.4,w*0.3,h*0.3);
        c.fill(); c.stroke();
      }},
      {n:'Lungs', w:120, h:100, d:function(c,w,h){
        c.fillStyle='rgba(236,72,153,0.3)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w/2,h*0.1);
        c.quadraticCurveTo(w*0.25,h*0.4,w*0.2,h*0.7);
        c.quadraticCurveTo(w*0.25,h*0.85,w*0.45,h*0.75);
        c.quadraticCurveTo(w*0.5,h*0.6,w/2,h*0.5);
        c.quadraticCurveTo(w*0.5,h*0.6,w*0.55,h*0.75);
        c.quadraticCurveTo(w*0.75,h*0.85,w*0.8,h*0.7);
        c.quadraticCurveTo(w*0.75,h*0.4,w/2,h*0.1);
        c.fill(); c.stroke();
      }},
      {n:'Eye', w:120, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2; c.fillStyle='#fff';
        c.beginPath();
        c.moveTo(w*0.05,h*0.5);
        c.quadraticCurveTo(w*0.5,h*0.1,w*0.95,h*0.5);
        c.quadraticCurveTo(w*0.5,h*0.9,w*0.05,h*0.5);
        c.fill(); c.stroke();
        c.fillStyle=B; c.strokeStyle=B;
        c.beginPath(); c.arc(w*0.5,h*0.5,w*0.18,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle=C;
        c.beginPath(); c.arc(w*0.5,h*0.5,w*0.08,0,Math.PI*2); c.fill();
      }},
      {n:'Kidney', w:80, h:120, d:function(c,w,h){
        c.fillStyle='rgba(220,38,38,0.3)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w*0.6,h*0.1);
        c.bezierCurveTo(w*0.2,h*0.15,w*0.15,h*0.5,w*0.2,h*0.7);
        c.bezierCurveTo(w*0.25,h*0.9,w*0.5,h*0.95,w*0.55,h*0.75);
        c.bezierCurveTo(w*0.6,h*0.6,w*0.45,h*0.55,w*0.6,h*0.4);
        c.bezierCurveTo(w*0.75,h*0.25,w*0.65,h*0.15,w*0.6,h*0.1);
        c.fill(); c.stroke();
      }},
      {n:'Stomach', w:100, h:120, d:function(c,w,h){
        c.fillStyle='rgba(236,72,153,0.3)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        c.moveTo(w*0.4,h*0.1);
        c.lineTo(w*0.4,h*0.35);
        c.quadraticCurveTo(w*0.2,h*0.5,w*0.2,h*0.7);
        c.quadraticCurveTo(w*0.2,h*0.9,w*0.55,h*0.9);
        c.quadraticCurveTo(w*0.85,h*0.9,w*0.8,h*0.7);
        c.quadraticCurveTo(w*0.75,h*0.5,w*0.6,h*0.45);
        c.quadraticCurveTo(w*0.55,h*0.3,w*0.6,h*0.1);
        c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Neuron', w:160, h:90, d:function(c,w,h){
        c.fillStyle='rgba(147,51,234,0.4)'; c.strokeStyle=P; c.lineWidth=1.5;
        c.beginPath(); c.arc(w*0.3,h*0.5,w*0.08,0,Math.PI*2); c.fill(); c.stroke();
        var dend=[[w*0.1,h*0.2],[w*0.05,h*0.5],[w*0.1,h*0.8],[w*0.2,h*0.15],[w*0.22,h*0.85]];
        dend.forEach(function(p){
          c.beginPath(); c.moveTo(w*0.3,h*0.5); c.lineTo(p[0],p[1]); c.stroke();
        });
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.38,h*0.5); c.lineTo(w*0.95,h*0.5); c.stroke();
        c.fillStyle=R;
        c.beginPath(); c.arc(w*0.95,h*0.5,w*0.03,0,Math.PI*2); c.fill();
      }}
    ],
    molecules: [
      {n:'ATP', w:180, h:80, d:function(c,w,h){
        c.fillStyle='#334155'; c.beginPath(); c.arc(w*0.1,h*0.5,w*0.08,0,Math.PI*2); c.fill();
        c.fillStyle='#fef3c7'; c.strokeStyle=Y; c.lineWidth=1.5;
        c.beginPath(); c.arc(w*0.3,h*0.5,w*0.07,0,Math.PI*2); c.fill(); c.stroke();
        c.beginPath(); c.arc(w*0.5,h*0.5,w*0.07,0,Math.PI*2); c.fill(); c.stroke();
        c.beginPath(); c.arc(w*0.7,h*0.5,w*0.07,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#fee2e2'; c.strokeStyle=R;
        c.beginPath(); c.arc(w*0.9,h*0.5,w*0.08,0,Math.PI*2); c.fill(); c.stroke();
      }},
      {n:'Glucose', w:140, h:130, d:function(c,w,h){
        c.strokeStyle=G; c.lineWidth=2; c.fillStyle='rgba(34,197,94,0.15)';
        c.beginPath();
        for(var i=0;i<6;i++){
          var a=-Math.PI/2+i*Math.PI/3;
          var x=w/2+Math.cos(a)*w*0.35;
          var y=h/2+Math.sin(a)*h*0.35;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.closePath(); c.fill(); c.stroke();
        c.fillStyle=R;
        for(var i=0;i<6;i++){
          var a=-Math.PI/2+i*Math.PI/3;
          var x=w/2+Math.cos(a)*w*0.35;
          var y=h/2+Math.sin(a)*h*0.35;
          c.beginPath(); c.arc(x,y,3,0,Math.PI*2); c.fill();
        }
      }}
    ]
  },

  /* ---------- MATH ---------- */
  math: {
    geometry: [
      {n:'Triangle', w:120, h:110, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2; c.fillStyle='rgba(59,130,246,0.15)';
        c.beginPath(); c.moveTo(w*0.5,h*0.1); c.lineTo(w*0.9,h*0.9);
        c.lineTo(w*0.1,h*0.9); c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Right Tri', w:120, h:110, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2; c.fillStyle='rgba(59,130,246,0.1)';
        c.beginPath(); c.moveTo(w*0.2,h*0.9); c.lineTo(w*0.2,h*0.2);
        c.lineTo(w*0.9,h*0.9); c.closePath(); c.fill(); c.stroke();
        c.strokeStyle=C; c.lineWidth=1;
        c.strokeRect(w*0.2,h*0.78,w*0.1,h*0.1);
      }},
      {n:'Square', w:100, h:100, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=2; c.fillStyle='rgba(59,130,246,0.15)';
        c.beginPath(); c.rect(w*0.15,h*0.15,w*0.7,h*0.7); c.fill(); c.stroke();
      }},
      {n:'Circle', w:120, h:120, d:function(c,w,h){
        c.strokeStyle=R; c.lineWidth=2; c.fillStyle='rgba(236,72,153,0.1)';
        c.beginPath(); c.arc(w/2,h/2,Math.min(w,h)*0.4,0,Math.PI*2);
        c.fill(); c.stroke();
      }},
      {n:'Pentagon', w:120, h:120, d:function(c,w,h){
        c.strokeStyle=P; c.lineWidth=2; c.fillStyle='rgba(147,51,234,0.15)';
        c.beginPath();
        for(var i=0;i<5;i++){
          var a=-Math.PI/2+i*2*Math.PI/5;
          var x=w/2+Math.cos(a)*Math.min(w,h)*0.4;
          var y=h/2+Math.sin(a)*Math.min(w,h)*0.4;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Hexagon', w:120, h:110, d:function(c,w,h){
        c.strokeStyle=O; c.lineWidth=2; c.fillStyle='rgba(234,88,12,0.15)';
        c.beginPath();
        for(var i=0;i<6;i++){
          var a=-Math.PI/2+i*Math.PI/3;
          var x=w/2+Math.cos(a)*Math.min(w,h)*0.4;
          var y=h/2+Math.sin(a)*Math.min(w,h)*0.4;
          if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.closePath(); c.fill(); c.stroke();
      }},
      {n:'Venn', w:140, h:100, d:function(c,w,h){
        c.fillStyle='rgba(239,68,68,0.2)'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath(); c.arc(w*0.38,h*0.5,w*0.3,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='rgba(59,130,246,0.2)'; c.strokeStyle=B;
        c.beginPath(); c.arc(w*0.62,h*0.5,w*0.3,0,Math.PI*2); c.fill(); c.stroke();
      }},
      {n:'Cube', w:120, h:120, d:function(c,w,h){
        c.strokeStyle=B; c.lineWidth=1.5;
        c.fillStyle='rgba(59,130,246,0.15)';
        c.beginPath(); c.rect(w*0.2,h*0.3,w*0.5,h*0.5); c.fill(); c.stroke();
        c.fillStyle='rgba(59,130,246,0.25)';
        c.beginPath(); c.moveTo(w*0.2,h*0.3); c.lineTo(w*0.4,h*0.1);
        c.lineTo(w*0.9,h*0.1); c.lineTo(w*0.7,h*0.3); c.closePath(); c.fill(); c.stroke();
        c.fillStyle='rgba(59,130,246,0.35)';
        c.beginPath(); c.moveTo(w*0.7,h*0.3); c.lineTo(w*0.9,h*0.1);
        c.lineTo(w*0.9,h*0.6); c.lineTo(w*0.7,h*0.8); c.closePath(); c.fill(); c.stroke();
      }}
    ],
    graphs: [
      {n:'Coordinate', w:140, h:140, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.moveTo(w/2,0); c.lineTo(w/2,h); c.stroke();
        c.fillStyle=C; c.font='8px Arial';
        c.fillText('x',w*0.94,h*0.46); c.fillText('y',w*0.53,h*0.05);
      }},
      {n:'Parabola', w:140, h:140, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=0.8;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.beginPath(); c.moveTo(w/2,0); c.lineTo(w/2,h); c.stroke();
        c.strokeStyle=B; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.15,h*0.15);
        c.quadraticCurveTo(w/2,h*1.1,w*0.85,h*0.15); c.stroke();
      }},
      {n:'Sine', w:160, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.strokeStyle=B; c.lineWidth=2;
        c.beginPath();
        for(var x=0;x<w;x++){
          var y=h/2-Math.sin(x/w*Math.PI*2)*h*0.35;
          if(x===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
      }},
      {n:'Cosine', w:160, h:80, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1;
        c.beginPath(); c.moveTo(0,h/2); c.lineTo(w,h/2); c.stroke();
        c.strokeStyle=R; c.lineWidth=2;
        c.beginPath();
        for(var x=0;x<w;x++){
          var y=h/2-Math.cos(x/w*Math.PI*2)*h*0.35;
          if(x===0) c.moveTo(x,y); else c.lineTo(x,y);
        }
        c.stroke();
      }},
      {n:'Exponential', w:140, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1;
        c.beginPath(); c.moveTo(0,h*0.9); c.lineTo(w,h*0.9); c.stroke();
        c.beginPath(); c.moveTo(w*0.1,0); c.lineTo(w*0.1,h); c.stroke();
        c.strokeStyle=G; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.1,h*0.9);
        c.quadraticCurveTo(w*0.7,h*0.9,w*0.9,h*0.1); c.stroke();
      }},
      {n:'Bar Chart', w:140, h:100, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.moveTo(w*0.15,h*0.85); c.lineTo(w*0.9,h*0.85); c.stroke();
        c.beginPath(); c.moveTo(w*0.15,h*0.1); c.lineTo(w*0.15,h*0.85); c.stroke();
        var colors=[B,G,Y,R];
        for(var i=0;i<4;i++){
          c.fillStyle=colors[i];
          c.fillRect(w*(0.25+i*0.17), h*(0.85-0.15*(i+1)), w*0.13, h*0.15*(i+1));
        }
      }},
      {n:'Pie', w:120, h:120, d:function(c,w,h){
        var cx=w/2, cy=h/2, r=Math.min(w,h)*0.4;
        c.fillStyle=B;
        c.beginPath(); c.moveTo(cx,cy); c.arc(cx,cy,r,-Math.PI/2,0); c.closePath(); c.fill();
        c.fillStyle=G;
        c.beginPath(); c.moveTo(cx,cy); c.arc(cx,cy,r,0,Math.PI*0.7); c.closePath(); c.fill();
        c.fillStyle=R;
        c.beginPath(); c.moveTo(cx,cy); c.arc(cx,cy,r,Math.PI*0.7,Math.PI*1.5); c.closePath(); c.fill();
      }}
    ]
  },

  /* ---------- CHARTS ---------- */
  charts: {
    general: [
      {n:'Timeline', w:180, h:60, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.beginPath(); c.moveTo(w*0.05,h/2); c.lineTo(w*0.95,h/2); c.stroke();
        var colors=[R,B,G,P];
        for(var i=0;i<4;i++){
          c.fillStyle=colors[i];
          c.beginPath(); c.arc(w*(0.2+i*0.2),h/2,w*0.03,0,Math.PI*2); c.fill();
        }
      }},
      {n:'Table', w:120, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=2;
        c.strokeRect(w*0.1,h*0.1,w*0.8,h*0.8);
        c.lineWidth=1;
        c.beginPath(); c.moveTo(w*0.1,h*0.35); c.lineTo(w*0.9,h*0.35); c.stroke();
        c.beginPath(); c.moveTo(w*0.1,h*0.65); c.lineTo(w*0.9,h*0.65); c.stroke();
        c.beginPath(); c.moveTo(w*0.35,h*0.1); c.lineTo(w*0.35,h*0.9); c.stroke();
        c.beginPath(); c.moveTo(w*0.65,h*0.1); c.lineTo(w*0.65,h*0.9); c.stroke();
      }},
      {n:'Flowchart', w:140, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.fillStyle='rgba(59,130,246,0.2)';
        c.beginPath(); c.rect(w*0.35,h*0.05,w*0.3,h*0.15); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(w/2,h*0.2); c.lineTo(w/2,h*0.35); c.stroke();
        c.fillStyle='rgba(251,191,36,0.2)';
        c.beginPath(); c.moveTo(w/2,h*0.35); c.lineTo(w*0.75,h*0.5);
        c.lineTo(w/2,h*0.65); c.lineTo(w*0.25,h*0.5); c.closePath(); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(w/2,h*0.65); c.lineTo(w/2,h*0.8); c.stroke();
        c.fillStyle='rgba(239,68,68,0.2)';
        c.beginPath(); c.rect(w*0.35,h*0.8,w*0.3,h*0.15); c.fill(); c.stroke();
      }},
      {n:'Mind Map', w:160, h:120, d:function(c,w,h){
        c.strokeStyle=C; c.lineWidth=1.5;
        c.beginPath(); c.arc(w/2,h/2,w*0.12,0,Math.PI*2);
        c.fillStyle='rgba(79,70,229,0.3)'; c.fill(); c.stroke();
        var items=[[w*0.15,h*0.2],[w*0.85,h*0.2],[w*0.15,h*0.8],[w*0.85,h*0.8]];
        items.forEach(function(p){
          c.beginPath(); c.moveTo(w/2,h/2); c.lineTo(p[0],p[1]); c.stroke();
          c.beginPath(); c.arc(p[0],p[1],w*0.06,0,Math.PI*2);
          c.fillStyle='rgba(59,130,246,0.3)'; c.fill(); c.stroke();
        });
      }},
      {n:'Target', w:100, h:100, d:function(c,w,h){
        c.fillStyle='#fee2e2'; c.strokeStyle=R; c.lineWidth=2;
        c.beginPath(); c.arc(w/2,h/2,w*0.4,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle='#fff';
        c.beginPath(); c.arc(w/2,h/2,w*0.25,0,Math.PI*2); c.fill(); c.stroke();
        c.fillStyle=R;
        c.beginPath(); c.arc(w/2,h/2,w*0.1,0,Math.PI*2); c.fill();
      }}
    ]
  }
};

/* ============================================================
   FORMULAS (~150)
   Format: [name, equation, category]
   ============================================================ */
var formulas = [
  /* Physics - Mechanics (25) */
  ['Velocity','v = d/t','physics-mechanics'],
  ['Acceleration','a = (v-u)/t','physics-mechanics'],
  ['Newton 2nd','F = ma','physics-mechanics'],
  ['Kinetic Energy','KE = ½mv²','physics-mechanics'],
  ['Potential Energy','PE = mgh','physics-mechanics'],
  ['Momentum','p = mv','physics-mechanics'],
  ['Impulse','J = F·Δt = Δp','physics-mechanics'],
  ['Work','W = F·d·cosθ','physics-mechanics'],
  ['Power','P = W/t','physics-mechanics'],
  ['Weight','W = mg','physics-mechanics'],
  ['Gravity','F = Gm₁m₂/r²','physics-mechanics'],
  ['Centripetal Force','F = mv²/r','physics-mechanics'],
  ['Centripetal Accel','a = v²/r','physics-mechanics'],
  ['Projectile Range','R = v²sin(2θ)/g','physics-mechanics'],
  ['Projectile Height','H = v²sin²(θ)/2g','physics-mechanics'],
  ['Projectile Time','T = 2v·sinθ/g','physics-mechanics'],
  ['Elastic PE','PE = ½kx²','physics-mechanics'],
  ['Hooke Law','F = -kx','physics-mechanics'],
  ['Escape Velocity','v = √(2GM/R)','physics-mechanics'],
  ['Orbital Velocity','v = √(GM/r)','physics-mechanics'],
  ['Torque','τ = r × F','physics-mechanics'],
  ['Angular Momentum','L = Iω','physics-mechanics'],
  ['Angular Velocity','ω = θ/t','physics-mechanics'],
  ['Moment of Inertia (disk)','I = ½mr²','physics-mechanics'],
  ['Moment of Inertia (rod)','I = (1/12)mL²','physics-mechanics'],

  /* Physics - Waves (15) */
  ['Wave Speed','v = fλ','physics-waves'],
  ['Frequency','f = 1/T','physics-waves'],
  ['Period','T = 1/f','physics-waves'],
  ['Angular Frequency','ω = 2πf','physics-waves'],
  ['Wavelength','λ = v/f','physics-waves'],
  ['Snell Law','n₁sinθ₁ = n₂sinθ₂','physics-waves'],
  ['Refractive Index','n = c/v','physics-waves'],
  ['Lens Formula','1/f = 1/v - 1/u','physics-waves'],
  ['Mirror Formula','1/f = 1/v + 1/u','physics-waves'],
  ['Magnification','m = -v/u','physics-waves'],
  ['Power of Lens','P = 1/f','physics-waves'],
  ['Doppler Effect',"f' = f(v/(v±v_s))",'physics-waves'],
  ['Sound Speed (air)','v ≈ 343 m/s','physics-waves'],
  ['Beat Frequency','f_beat = |f₁ - f₂|','physics-waves'],
  ['Standing Wave','L = nλ/2','physics-waves'],

  /* Physics - Electricity (20) */
  ['Ohm Law','V = IR','physics-electricity'],
  ['Electric Power','P = VI = I²R = V²/R','physics-electricity'],
  ['Series Resistance','R = R₁+R₂+R₃','physics-electricity'],
  ['Parallel Resistance','1/R = 1/R₁+1/R₂+1/R₃','physics-electricity'],
  ['Charge','Q = It','physics-electricity'],
  ['Capacitance','C = Q/V','physics-electricity'],
  ['Capacitor Energy','E = ½CV²','physics-electricity'],
  ['Series Capacitance','1/C = 1/C₁+1/C₂','physics-electricity'],
  ['Parallel Capacitance','C = C₁+C₂','physics-electricity'],
  ['Coulomb Force','F = kq₁q₂/r²','physics-electricity'],
  ['Electric Field','E = F/q','physics-electricity'],
  ['Electric Potential','V = kq/r','physics-electricity'],
  ['Magnetic Force','F = qvB·sinθ','physics-electricity'],
  ['Faraday Law','ε = -N(dΦ/dt)','physics-electricity'],
  ['Biot-Savart','B = μ₀I/(2πr)','physics-electricity'],
  ['Lorentz Force','F = q(E + v×B)','physics-electricity'],
  ['EMF','ε = I(R+r)','physics-electricity'],
  ['Joule Heating','H = I²Rt','physics-electricity'],
  ['Resonance Frequency','f = 1/(2π√LC)','physics-electricity'],
  ['Transformer','V₂/V₁ = N₂/N₁','physics-electricity'],

  /* Physics - Thermo (12) */
  ['Temperature','K = °C + 273.15','physics-thermo'],
  ['Heat','Q = mcΔT','physics-thermo'],
  ['Latent Heat','Q = mL','physics-thermo'],
  ['Ideal Gas','PV = nRT','physics-thermo'],
  ['Carnot Efficiency','η = 1 - Tc/Th','physics-thermo'],
  ['Stefan Law','P = σAT⁴','physics-thermo'],
  ['Wien Law','λmax = b/T','physics-thermo'],
  ['Boyle Law','P₁V₁ = P₂V₂','physics-thermo'],
  ['Charles Law','V₁/T₁ = V₂/T₂','physics-thermo'],
  ['Gay-Lussac','P₁/T₁ = P₂/T₂','physics-thermo'],
  ['Combined Gas','P₁V₁/T₁ = P₂V₂/T₂','physics-thermo'],
  ['Heat Engine Work','W = Qh - Qc','physics-thermo'],

  /* Physics - Modern (8) */
  ['Mass-Energy','E = mc²','physics-modern'],
  ['Photon Energy','E = hf','physics-modern'],
  ['de Broglie','λ = h/(mv)','physics-modern'],
  ['Photoelectric','Kmax = hf - φ','physics-modern'],
  ['Bohr Energy','En = -13.6/n² eV','physics-modern'],
  ['Half-life','N = N₀(½)^(t/t½)','physics-modern'],
  ['Radioactive Decay','N = N₀e^(-λt)','physics-modern'],
  ['Mass Defect','E = Δmc²','physics-modern'],

  /* Chemistry (25) */
  ['Moles','n = m/M','chemistry'],
  ['Avogadro','N = n × 6.022×10²³','chemistry'],
  ['Molarity','M = n/V','chemistry'],
  ['Dilution','M₁V₁ = M₂V₂','chemistry'],
  ['Molality','m = n/kg solvent','chemistry'],
  ['pH','pH = -log[H⁺]','chemistry'],
  ['pOH','pOH = -log[OH⁻]','chemistry'],
  ['pH + pOH','pH + pOH = 14','chemistry'],
  ['Henderson-Hasselbalch','pH = pKa + log([A⁻]/[HA])','chemistry'],
  ['Percent Yield','% = (actual/theoretical)×100','chemistry'],
  ['Equilibrium Kc','Kc = [P]^p/[R]^r','chemistry'],
  ['Kp','Kp = Kc(RT)^Δn','chemistry'],
  ['Free Energy','ΔG = ΔH - TΔS','chemistry'],
  ['Gibbs Eq','ΔG = -RT ln K','chemistry'],
  ['Nernst','E = E° - (RT/nF)ln Q','chemistry'],
  ['Beer-Lambert','A = εbc','chemistry'],
  ['Rate Law','rate = k[A]^m[B]^n','chemistry'],
  ['Half-life (1st)','t½ = 0.693/k','chemistry'],
  ['First Order','[A] = [A]₀e^(-kt)','chemistry'],
  ['Arrhenius','k = Ae^(-Ea/RT)','chemistry'],
  ['Hess Law','ΔH_rxn = ΣΔH_products - ΣΔH_reactants','chemistry'],
  ['Bond Energy','ΔH = Σbonds broken - Σbonds formed','chemistry'],
  ['Combined Gas Law','P₁V₁/T₁ = P₂V₂/T₂','chemistry'],
  ['Formula Weight','MW = Σ(AW × n)','chemistry'],
  ['Percent Composition','%X = (mass X / total mass) × 100','chemistry'],

  /* Math (50) */
  ['Quadratic Formula','x = (-b±√(b²-4ac))/2a','math'],
  ['Discriminant','D = b² - 4ac','math'],
  ['Distance Formula','d = √((x₂-x₁)² + (y₂-y₁)²)','math'],
  ['Midpoint Formula','M = ((x₁+x₂)/2, (y₁+y₂)/2)','math'],
  ['Slope','m = (y₂-y₁)/(x₂-x₁)','math'],
  ['Line Equation','y = mx + b','math'],
  ['Circle Area','A = πr²','math'],
  ['Circle Circumference','C = 2πr','math'],
  ['Circle Equation','(x-h)² + (y-k)² = r²','math'],
  ['Triangle Area','A = ½bh','math'],
  ['Heron Formula','A = √(s(s-a)(s-b)(s-c))','math'],
  ['Sphere Volume','V = (4/3)πr³','math'],
  ['Sphere Area','S = 4πr²','math'],
  ['Cylinder Volume','V = πr²h','math'],
  ['Cone Volume','V = (1/3)πr²h','math'],
  ['Trapezoid Area','A = ½h(b₁+b₂)','math'],
  ['Sin² + Cos²','sin²θ + cos²θ = 1','math'],
  ['Tangent','tanθ = sinθ/cosθ','math'],
  ['1 + tan²','1 + tan²θ = sec²θ','math'],
  ['Double Angle Sin','sin2θ = 2sinθcosθ','math'],
  ['Double Angle Cos','cos2θ = cos²θ - sin²θ','math'],
  ['Half Angle','sin(θ/2) = √((1-cosθ)/2)','math'],
  ['Cosine Rule','c² = a² + b² - 2ab·cosC','math'],
  ['Sine Rule','a/sinA = b/sinB = c/sinC','math'],
  ['Euler Formula','e^(iθ) = cosθ + i·sinθ','math'],
  ['Arithmetic Sum','S = n(a₁+aₙ)/2','math'],
  ['Geometric Sum','S = a(1-rⁿ)/(1-r)','math'],
  ['Infinite GP','S = a/(1-r) for |r|<1','math'],
  ['Sum of Squares','Σn² = n(n+1)(2n+1)/6','math'],
  ['Sum of Cubes','Σn³ = [n(n+1)/2]²','math'],
  ['Combination','nCr = n!/(r!(n-r)!)','math'],
  ['Permutation','nPr = n!/(n-r)!','math'],
  ['Binomial','(a+b)ⁿ = Σ nCr a^(n-r) b^r','math'],
  ['Derivative xⁿ','d/dx(xⁿ) = nxⁿ⁻¹','math'],
  ['Derivative sin','d/dx(sin x) = cos x','math'],
  ['Derivative cos','d/dx(cos x) = -sin x','math'],
  ['Derivative tan','d/dx(tan x) = sec² x','math'],
  ['Derivative eˣ','d/dx(eˣ) = eˣ','math'],
  ['Derivative ln','d/dx(ln x) = 1/x','math'],
  ['Product Rule',"(uv)' = u'v + uv'",'math'],
  ['Quotient Rule',"(u/v)' = (u'v - uv')/v²",'math'],
  ['Chain Rule',"d/dx[f(g(x))] = f'(g(x))·g'(x)",'math'],
  ['Integral xⁿ','∫xⁿ dx = xⁿ⁺¹/(n+1) + C','math'],
  ['Integral 1/x','∫(1/x) dx = ln|x| + C','math'],
  ['Integral eˣ','∫eˣ dx = eˣ + C','math'],
  ['Integral sin','∫sin x dx = -cos x + C','math'],
  ['Integral cos','∫cos x dx = sin x + C','math'],
  ['Mean','x̄ = (Σx)/n','math'],
  ['Variance','σ² = Σ(x-x̄)²/n','math'],
  ['Std Deviation','σ = √variance','math']
];

/* ============================================================
   CALCULATORS (~30)
   ============================================================ */
var calculators = {

  /* Mechanics */
  velocity: {
    name:'Velocity', f:'v = d/t', u:'m/s',
    ins:[{k:'d',l:'Distance',u:'m'},{k:'t',l:'Time',u:'s'}],
    calc:function(v){ return v.d/v.t; }
  },
  acceleration: {
    name:'Acceleration', f:'a = (v-u)/t', u:'m/s²',
    ins:[{k:'v',l:'Final v',u:'m/s'},{k:'u',l:'Initial v',u:'m/s'},{k:'t',l:'Time',u:'s'}],
    calc:function(v){ return (v.v-v.u)/v.t; }
  },
  force: {
    name:'Force', f:'F = m × a', u:'N',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'a',l:'Accel',u:'m/s²'}],
    calc:function(v){ return v.m*v.a; }
  },
  weight: {
    name:'Weight', f:'W = m × g', u:'N',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'g',l:'Gravity',u:'m/s²',def:9.8}],
    calc:function(v){ return v.m*v.g; }
  },
  kinetic: {
    name:'Kinetic Energy', f:'KE = ½mv²', u:'J',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'v',l:'Velocity',u:'m/s'}],
    calc:function(v){ return 0.5*v.m*v.v*v.v; }
  },
  potential: {
    name:'Potential Energy', f:'PE = mgh', u:'J',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'g',l:'Gravity',u:'m/s²',def:9.8},{k:'h',l:'Height',u:'m'}],
    calc:function(v){ return v.m*v.g*v.h; }
  },
  momentum: {
    name:'Momentum', f:'p = mv', u:'kg·m/s',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'v',l:'Velocity',u:'m/s'}],
    calc:function(v){ return v.m*v.v; }
  },
  work: {
    name:'Work', f:'W = F × d', u:'J',
    ins:[{k:'f',l:'Force',u:'N'},{k:'d',l:'Distance',u:'m'}],
    calc:function(v){ return v.f*v.d; }
  },
  power: {
    name:'Power', f:'P = W/t', u:'W',
    ins:[{k:'w',l:'Work',u:'J'},{k:'t',l:'Time',u:'s'}],
    calc:function(v){ return v.w/v.t; }
  },
  density: {
    name:'Density', f:'ρ = m/V', u:'kg/m³',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'v',l:'Volume',u:'m³'}],
    calc:function(v){ return v.m/v.v; }
  },
  pressure: {
    name:'Pressure', f:'P = F/A', u:'Pa',
    ins:[{k:'f',l:'Force',u:'N'},{k:'a',l:'Area',u:'m²'}],
    calc:function(v){ return v.f/v.a; }
  },

  /* Electricity */
  ohmlaw: {
    name:'Ohm Law (V=IR)', f:'V = I × R', u:'V',
    ins:[{k:'i',l:'Current',u:'A'},{k:'r',l:'Resistance',u:'Ω'}],
    calc:function(v){ return v.i*v.r; }
  },
  current: {
    name:'Current (I=V/R)', f:'I = V / R', u:'A',
    ins:[{k:'v',l:'Voltage',u:'V'},{k:'r',l:'Resistance',u:'Ω'}],
    calc:function(v){ return v.v/v.r; }
  },
  resistance: {
    name:'Resistance (R=V/I)', f:'R = V / I', u:'Ω',
    ins:[{k:'v',l:'Voltage',u:'V'},{k:'i',l:'Current',u:'A'}],
    calc:function(v){ return v.v/v.i; }
  },
  epower: {
    name:'Electric Power', f:'P = V × I', u:'W',
    ins:[{k:'v',l:'Voltage',u:'V'},{k:'i',l:'Current',u:'A'}],
    calc:function(v){ return v.v*v.i; }
  },
  pfromvi: {
    name:'Power (V²/R)', f:'P = V²/R', u:'W',
    ins:[{k:'v',l:'Voltage',u:'V'},{k:'r',l:'Resistance',u:'Ω'}],
    calc:function(v){ return v.v*v.v/v.r; }
  },
  charge: {
    name:'Charge', f:'Q = I × t', u:'C',
    ins:[{k:'i',l:'Current',u:'A'},{k:'t',l:'Time',u:'s'}],
    calc:function(v){ return v.i*v.t; }
  },
  capenergy: {
    name:'Capacitor Energy', f:'E = ½CV²', u:'J',
    ins:[{k:'c',l:'Capacitance',u:'F'},{k:'v',l:'Voltage',u:'V'}],
    calc:function(v){ return 0.5*v.c*v.v*v.v; }
  },
  coulomb: {
    name:'Coulomb Force', f:'F = kq₁q₂/r²', u:'N',
    ins:[{k:'q1',l:'q₁',u:'C'},{k:'q2',l:'q₂',u:'C'},{k:'r',l:'Distance',u:'m'}],
    calc:function(v){ return 8.988e9*v.q1*v.q2/(v.r*v.r); }
  },

  /* Waves */
  wavespeed: {
    name:'Wave Speed', f:'v = f × λ', u:'m/s',
    ins:[{k:'f',l:'Frequency',u:'Hz'},{k:'l',l:'Wavelength',u:'m'}],
    calc:function(v){ return v.f*v.l; }
  },
  period: {
    name:'Period', f:'T = 1/f', u:'s',
    ins:[{k:'f',l:'Frequency',u:'Hz'}],
    calc:function(v){ return 1/v.f; }
  },
  angfreq: {
    name:'Angular Frequency', f:'ω = 2πf', u:'rad/s',
    ins:[{k:'f',l:'Frequency',u:'Hz'}],
    calc:function(v){ return 2*Math.PI*v.f; }
  },
  photon: {
    name:'Photon Energy', f:'E = hf', u:'J',
    ins:[{k:'f',l:'Frequency',u:'Hz'}],
    calc:function(v){ return 6.626e-34*v.f; }
  },

  /* Chemistry */
  moles: {
    name:'Moles from Mass', f:'n = m / M', u:'mol',
    ins:[{k:'m',l:'Mass',u:'g'},{k:'M',l:'Molar Mass',u:'g/mol'}],
    calc:function(v){ return v.m/v.M; }
  },
  molarity: {
    name:'Molarity', f:'M = n / V', u:'M',
    ins:[{k:'n',l:'Moles',u:'mol'},{k:'v',l:'Volume',u:'L'}],
    calc:function(v){ return v.n/v.v; }
  },
  dilution: {
    name:'Dilution (M₂)', f:'M₂ = M₁V₁/V₂', u:'M',
    ins:[{k:'m1',l:'M₁',u:'M'},{k:'v1',l:'V₁',u:'L'},{k:'v2',l:'V₂',u:'L'}],
    calc:function(v){ return v.m1*v.v1/v.v2; }
  },
  ph: {
    name:'pH from [H⁺]', f:'pH = -log[H⁺]', u:'pH',
    ins:[{k:'h',l:'[H⁺]',u:'M',def:1e-7}],
    calc:function(v){ return -Math.log10(v.h); }
  },
  poh: {
    name:'pOH from [OH⁻]', f:'pOH = -log[OH⁻]', u:'pOH',
    ins:[{k:'o',l:'[OH⁻]',u:'M'}],
    calc:function(v){ return -Math.log10(v.o); }
  },
  yield: {
    name:'Percent Yield', f:'% = (actual/theoretical)×100', u:'%',
    ins:[{k:'a',l:'Actual',u:'g'},{k:'t',l:'Theoretical',u:'g'}],
    calc:function(v){ return v.a/v.t*100; }
  },
  heat: {
    name:'Heat', f:'Q = mcΔT', u:'J',
    ins:[{k:'m',l:'Mass',u:'kg'},{k:'c',l:'Specific Heat',u:'J/kg·K',def:4186},{k:'t',l:'ΔT',u:'K'}],
    calc:function(v){ return v.m*v.c*v.t; }
  },

  /* Universal */
  gravity: {
    name:'Gravitational Force', f:'F = Gm₁m₂/r²', u:'N',
    ins:[{k:'m1',l:'m₁',u:'kg'},{k:'m2',l:'m₂',u:'kg'},{k:'r',l:'Distance',u:'m'}],
    calc:function(v){ return 6.674e-11*v.m1*v.m2/(v.r*v.r); }
  },
  escape: {
    name:'Escape Velocity', f:'v = √(2GM/R)', u:'m/s',
    ins:[{k:'m',l:'Mass',u:'kg',def:5.972e24},{k:'r',l:'Radius',u:'m',def:6.371e6}],
    calc:function(v){ return Math.sqrt(2*6.674e-11*v.m/v.r); }
  },
  halflife: {
    name:'Remaining (radioactive)', f:'N = N₀(½)^(t/t½)', u:'atoms',
    ins:[{k:'n0',l:'N₀',u:'atoms'},{k:'t',l:'Time',u:'s'},{k:'th',l:'Half-life',u:'s'}],
    calc:function(v){ return v.n0*Math.pow(0.5,v.t/v.th); }
  }
};

/* ============================================================
   CONVERSIONS (14 categories)
   ============================================================ */
var conversions = {
  length:   {m:1, km:1000, cm:0.01, mm:0.001, nm:1e-9, mi:1609.34, ft:0.3048, in:0.0254, yd:0.9144},
  mass:     {kg:1, g:0.001, mg:1e-6, t:1000, lb:0.4536, oz:0.02835},
  time:     {s:1, ms:0.001, min:60, h:3600, day:86400, week:604800, year:31536000},
  speed:    {'m/s':1, 'km/h':0.27778, mph:0.44704, knot:0.51444, 'ft/s':0.3048},
  energy:   {J:1, kJ:1000, cal:4.184, kcal:4184, kWh:3.6e6, eV:1.602e-19},
  pressure: {Pa:1, kPa:1000, bar:1e5, atm:101325, mmHg:133.322, psi:6894.76},
  force:    {N:1, kN:1000, dyn:1e-5, lbf:4.44822, kgf:9.80665},
  power:    {W:1, kW:1000, MW:1e6, hp:745.7},
  angle:    {deg:1, rad:57.2958, grad:0.9, turn:360},
  area:     {'m²':1, 'km²':1e6, 'cm²':1e-4, 'ft²':0.0929, acre:4046.86, hectare:10000},
  volume:   {L:1, mL:0.001, 'm³':1000, 'cm³':0.001, gal:3.78541, 'ft³':28.3168},
  data:     {B:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776},
  frequency:{Hz:1, kHz:1000, MHz:1e6, GHz:1e9},
  temp:     {C:1, F:1, K:1, special:'temperature'}
};

/* ============================================================
   PHYSICAL CONSTANTS (25)
   Format: [name, symbol, value, unit]
   ============================================================ */
var constants = [
  ['Speed of Light','c','2.998×10⁸','m/s'],
  ['Gravitational Constant','G','6.674×10⁻¹¹','N·m²/kg²'],
  ['Gravity (Earth)','g','9.81','m/s²'],
  ['Planck Constant','h','6.626×10⁻³⁴','J·s'],
  ['Reduced Planck','ℏ','1.055×10⁻³⁴','J·s'],
  ['Avogadro Number','Nₐ','6.022×10²³','mol⁻¹'],
  ['Boltzmann Constant','k_B','1.381×10⁻²³','J/K'],
  ['Universal Gas Constant','R','8.314','J/(mol·K)'],
  ['Elementary Charge','e','1.602×10⁻¹⁹','C'],
  ['Electron Mass','mₑ','9.109×10⁻³¹','kg'],
  ['Proton Mass','mₚ','1.673×10⁻²⁷','kg'],
  ['Neutron Mass','mₙ','1.675×10⁻²⁷','kg'],
  ['Coulomb Constant','k','8.988×10⁹','N·m²/C²'],
  ['Vacuum Permittivity','ε₀','8.854×10⁻¹²','F/m'],
  ['Vacuum Permeability','μ₀','4π×10⁻⁷','H/m'],
  ['Stefan-Boltzmann','σ','5.670×10⁻⁸','W/(m²·K⁴)'],
  ['Wien Constant','b','2.898×10⁻³','m·K'],
  ['Faraday Constant','F','96485','C/mol'],
  ['Rydberg Constant','R∞','1.097×10⁷','m⁻¹'],
  ['Bohr Radius','a₀','5.292×10⁻¹¹','m'],
  ['Atomic Mass Unit','u','1.660×10⁻²⁷','kg'],
  ['Electron Volt','eV','1.602×10⁻¹⁹','J'],
  ['Standard Atmosphere','atm','101325','Pa'],
  ['Absolute Zero','0 K','-273.15','°C'],
  ['Molecular Gas Constant','Rₘ','8.314','J/(mol·K)']
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/* Get periodic table position [row, col] from atomic number */
function elemPos(n){
  if(n===1) return [1,1];
  if(n===2) return [1,18];
  if(n>=3 && n<=10) return [2, n<=4 ? n-2 : n+8];
  if(n>=11 && n<=18) return [3, n<=12 ? n-10 : n];
  if(n>=19 && n<=36) return [4, n-18];
  if(n>=37 && n<=54) return [5, n-36];
  if(n>=55 && n<=56) return [6, n-54];
  if(n>=57 && n<=71) return [9, n-54];
  if(n>=72 && n<=86) return [6, n-68];
  if(n>=87 && n<=88) return [7, n-86];
  if(n>=89 && n<=103) return [10, n-86];
  if(n>=104 && n<=118) return [7, n-100];
  return [0,0];
}

/* ============================================================
   EXPORT
   ============================================================ */
window.PWB_DATA = {
  elements: elements,
  elemMap: elemMap,
  elemColors: elemColors,
  elemLabels: elemLabels,
  elemPos: elemPos,
  diagrams: diagrams,
  formulas: formulas,
  calculators: calculators,
  conversions: conversions,
  constants: constants,
  COLORS: {C:C, R:R, B:B, G:G, Y:Y, P:P, O:O, GR:GR}
};

console.log(
  '✓ PWB_DATA loaded: ' +
  elements.length + ' elements, ' +
  formulas.length + ' formulas, ' +
  Object.keys(calculators).length + ' calculators, ' +
  Object.keys(conversions).length + ' unit categories, ' +
  constants.length + ' constants'
);

})();
