/* =========================================================
   LOQUERO — sitio homenaje (no oficial)
   Un regalito de Fungirak. Los discos y el análisis de audio
   están en data.js.
   ========================================================= */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const NS="http://www.w3.org/2000/svg";
// los valores con var(--x) van como estilo: en atributos de presentación SVG no siempre se resuelven
function mk(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs){const v=attrs[k];if(typeof v==="string"&&v.includes("var("))e.style.setProperty(k,v);else e.setAttribute(k,v)}parent&&parent.appendChild(e);return e}
const fmt=s=>Math.floor(s/60)+":"+String(Math.round(s%60)).padStart(2,"0");
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function tween(el,attrs,dur=1000,delay=0){const from={};for(const k in attrs)from[k]=parseFloat(el.getAttribute(k))||0;const t0=performance.now()+delay;(function f(t){const k=Math.max(0,Math.min(1,(t-t0)/dur));const e=1-Math.pow(1-k,3);for(const a in attrs)el.setAttribute(a,from[a]+(attrs[a]-from[a])*e);if(k<1)requestAnimationFrame(f)})(performance.now())}
const KEYN={C:"Do",D:"Re",E:"Mi",F:"Fa",G:"Sol",A:"La",B:"Si"};
const keyEs=k=>{if(!k)return"—";const m=k.endsWith("m");let b=k.replace("m","");const sh=b.includes("#");b=b.replace("#","");return KEYN[b]+(sh?"♯":"")+(m?" menor":" mayor")};

/* ======================= TAPAS ======================= */
const C=h=>"https://cdn-images.dzcdn.net/images/cover/"+h+"/1000x1000-000000-80-0-0.jpg";
const small=u=>u.replace("1000x1000","500x500");
const D=Object.fromEntries(DISCS.map(d=>[d.id,d]));
const COV=Object.fromEntries(DISCS.map(d=>[d.id,C(d.cover)]));
Object.assign(COV,{dem:C("e2950538a010d1aa0065ea2987ab6ea9"),el1:C("6cf9abf4da66da45e8f0ec8fa63f7b47"),el2:C("0a3b2f3e56ded96a72c4d2f9a4154bc6"),faq:C("50cd398ec4957e47391dc58d62958960"),ade:C("64f054bffcf3deb169cc395e5600d0e9"),lqr:C("781096db116153f7d9cb8eec562aa0a9")});
const allTr=DISCS.flatMap(d=>d.tr.map(t=>({d,t})));
const conDatos=allTr.filter(o=>o.t[2]);

/* ======================= RADIO (YouTube) ======================= */
const RADIO=[];
DISCS.forEach(d=>{RADIO.push([`${d.t} · ${d.y}`,d.color]);d.tr.forEach((t,i)=>RADIO.push([t[6],t[0],`${d.t} · tema ${i+1}`,d.id]))});
RADIO.push(["Electroshow · en vivo en Niceto, 22/5/2011","#e8322b"]);
EL1.forEach((t,i)=>RADIO.push([t[0],t[1]+" (en vivo)",`Electroshow · disco 1 · ${i+1}`,"el1"]));
RADIO.push(["Clips y canciones con amigos","#ffe500"]);
[["CIILckhFjFY","Era un día perfecto","clip de época · Fantasy"],["jAPvyc3GXCg","Invierno","clip oficial · 2017"],["hBW_IyoiWVM","Forte","canal oficial · 2017"],["J1VahodU2yI","Crudeza","canal oficial · 2017"],["SbJcfW5QxjA","El best","canal oficial · 2017"],["aRBAj5adiTA","Fifty","canal oficial · 2017"],["ABoLp7wCriw","Frequently Asked Questions","EP 2018 · canal del sello"],["RbY-VbFhDAM","Funeral","El Doctor ft. Loquero · 2026"],["DOsnmO3tzZ0","Ghost in the F.O.R.A.","Los De Alicante feat. Chary"],["CD6pCor1hiA","Era un día perfecto","Tobogán Andaluz con Chary"]].forEach(v=>RADIO.push(v));
RADIO.push(["En vivo, de 1994 a 2026","#6b4fd8"]);
[["fTJXpYLOSGU","Ghost in the F.O.R.A. (en vivo)","DVD Electroshow · 2011"],["lJRBhz0vAlU","Atlántida (en vivo)","en vivo"],["da-2WjkmPEw","Show en 25 de Mayo","Buenos Aires · 1994"],["4GHttJljweY","Show en Comodoro Rivadavia","6/12/1999"],["Uhufs4OiYZc","Fantasy, 25 años","Ex Mundo Mágico, Santiago · 2026"],["y5uLhJ9lStE","Groove","24/10/2026"]].forEach(v=>RADIO.push(v));
const PL=RADIO.filter(r=>r.length>=3);
const TRK=Object.fromEntries(allTr.map(o=>[o.t[6],o]));
const findPL=id=>PL.findIndex(p=>p[0]===id);

/* ======================= HISTORIA CLÍNICA ======================= */
// [fecha, tipo, título, texto, dudoso]
const TL=[
 ["fines de los 80","origen","Seis punks en La Feliz","Claudio Fernández, Chary, ve a Moris a los 15, deja el secundario en tercer año en el Don Bosco de Mar del Plata y viaja los fines de semana a Buenos Aires a comprar discos. En diciembre de 1987 ve a Sumo en el Teatro San Martín de la ciudad. «Como mucho éramos seis punks»."],
 ["fines de los 80","origen","Submision y Todos Contra Todos","Primero Submision, con Chary en guitarra y voz: dos shows. Después Todos Contra Todos, ruidosa y contestataria: los detienen la noche antes de tocar en Buenos Aires y después tocan en el Teatro Roma, en un festival de <i>Rebelión Rock</i>."],
 ["sin fecha","origen","«¿Venís del loquero vos?»","Lo detienen por la pinta, con el pelo cortado a mechones y una muñequera con clavos, y lo encierran en el calabozo de adultos. Un preso tatuado lo toma por paciente de un psiquiátrico. Así se llamará la banda."],
 ["27 mar 1991","origen","Dos universos","Es la fecha que da Yamandú. Él trae Joy Division, Sonic Youth y Siouxsie; Chary, Ramones, La Polla Records y Eskorbuto.",1],
 ["1991","disco","El que no se consuela es porque no quiere","Gerardo Dekadencia les propone grabar un demo para un concurso de bandas under en Berlín; el premio es un viaje a Alemania. Suman al «Chino» en batería y a «Canuto» en bajo. No clasifican. El casete se vende en los shows: unas doscientas copias."],
 ["ene 1992","mdp","Debut con Lacras, y apagón","En una corrida por el escenario Chary se enreda en un cable y deja sin luz a toda la manzana durante horas. El show se suspende. Wikipedia, en su introducción, ubica el debut en 1991.",1],
 ["1993","mdp","Siglos de masacre y la Vinoteca Perrier","Con Santiago Vidal y Pablo Carriño graban otro casete y tocan en la antigua Vinoteca Perrier. El primer recital con lista en setlist.fm es del 21 de enero de 1993, en el Patio Cervecero, y siguen la Sociedad de Fomento Pompeya, La Murga y el Blues Bar."],
 ["1994","ruta","Hospitales psiquiátricos y cárceles","Shows a beneficio con Fun People, A.N.I.M.A.L y D.A.J., y la marcha «por hospitales psiquiátricos y cárceles». Tocan para internos del Borda y del Moyano, y abren para Flema en Mar del Plata."],
 ["1994","disco","Vivo, y un casete con fanzine","El casete <i>Vivo</i> se graba en el Hospital Moyano y en el Parakultural. Con Julián Lemmi en bajo sale <i>Todo lo que hay que saber para ser un éxito</i>, con el fanzine <i>Juventud Perdida</i>. En México, «Show Bizz» entra en el compilado <i>Argentina H.C.</i>"],
 ["1995","origen","Loquero Pop","Jorge Areta se va a Europa y Anteojo a Centroamérica. Chary rearma la banda con Ale (ex Lacras), Santiago Vidal y Leonardo Almada (ex Escoria), y debutan en Cemento invitados por Fun People. Según Chary, un sello que estaba por ficharlos eligió a Cienfuegos, y fue Nekro quien lo convenció de seguir."],
 ["fines de 1996","origen","Vuelve Anteojo","Anteojo regresa a la banda. Cemento se vuelve la casa: tocan ahí trece veces entre 1996 y 2004."],
 ["jul 1997","disco","Temor morboso a la exposición pública","El primer disco, autoeditado: «Disco Es Cultura — Autoedición Mar del Plata 1997». Ese verano y el siguiente tocan en la costa, en el Parador Pakalolo de Pinamar y en el Superclub de Villa Gesell."],
 ["ago 1997","afuera","Primera vez en Chile","Catedral #1857 y el Centro Cultural Taller Sol en Santiago, y el Sindicato de Estibadores en Valparaíso. Chile se vuelve su segundo país: veinte de las 156 listas de setlist.fm son de allá."],
 ["abr 1998","mdp","«Mar del Plata me mata»","Así titula Página/12 una nota sobre la banda. Chary: «Para nosotros los lugares más cómodos para tocar son los psiquiátricos». Y también: «Loquero es caos, anarquía. Pero no somos anarquistas, somos nihilistas»."],
 ["1999","disco","Club de solos (Ugly Records)","Producido por Nekro para su sello Ugly y grabado en Estudios Aloé. Con este disco llegan a Buenos Aires. En la F.O.R.A., donde Chary vivió unas semanas, se filma un video de «Ghost in the F.O.R.A.». Algunas fuentes lo fechan en 2000.",1],
 ["dic 1999","ruta","Gira nacional","Bahía Blanca, Comodoro Rivadavia y Córdoba. Del show en la Universidad San Juan Bosco de Comodoro, el 6 de diciembre, hay un registro completo en YouTube."],
 ["2001","disco","Fantasy","Demos hechos en una pieza con batería electrónica, grabados después en Estudios Panda. Un quiebre emocional, pérdidas personales, y el disco que Chary llama el más raro y su favorito. Entran Aku Almada en bajo y Horacio Langlois en batería."],
 ["14 abr 2001","afuera","Punta Arenas","Tocan en Shailot, en el extremo sur de Chile; el show circula como el pirata <i>Una noche en Shailot</i>. Según contó la banda en 2026, Gabriel Boric, años antes de ser presidente, ayudó a organizarlo."],
 ["2002","afuera","Europa en casas okupas","Con Criatura, de Zaragoza, y Pablo Micheleti en batería. Las fuentes no coinciden: Wikipedia la fecha en febrero de 2001 y Página/12 en marzo de 2002, empezando en Madrid. Chary habló en 2009 de sesenta shows en setenta días; en 2026, de siete países y más de veinte ciudades en poco más de un mes.",1],
 ["2002","disco","Atlántida, y la muerte de Ricky","Un EP de tres temas descartados de <i>Fantasy</i>, envuelto en un póster. Ese año muere Ricky Espinosa, el cantante de Flema, amigo de la banda: «Épico» le está dedicada y «Muchachos» dice «Hoy me llamó Ricky». En octubre está listo el clip de «Era un día perfecto»."],
 ["2003","disco","Consuelo","El primer acústico, y el primer disco en X El Cambio Records. «Consuelo no es conformismo sino energía»."],
 ["2004","disco","Black y Demos 91/94","<i>Black</i> se graba en El Pie, «todo analógico», pagado por un sello europeo. <i>Demos 91/94</i> junta veintisiete temas de los primeros casetes, con un flyer manuscrito de tapa. La batería cambia varias veces con los años; hoy la toca Ito Almada."],
 ["2006","disco","En vivo en el Teatro","Un disco en vivo que no está en plataformas. Wikipedia dice El Teatro de Colegiales; Discogs, el Teatro Flores.",1],
 ["2008","disco","Suicidal Fútbol Club","Trece temas, uno llamado «Kurt Cobain». En 2009 Chary vuelve a trabajar en el hospital. Wikipedia fecha el disco en 2009.",1],
 ["22 may 2011","ruta","Electroshow en Niceto","Un show largo en Niceto Club que en 2012 sale como disco doble y DVD. El nombre juega con el electroshock. Ese año sale también <i>Radio Post Mortem</i>, el otro disco «bastardo»."],
 ["20 may 2012","afuera","Estadio Nacional de Santiago","PunkRock Festival, en el estadio más grande de Chile."],
 ["15 nov 2015","ruta","Luna Park","Ese año también abren para Adolescents en Flores y tocan en la Casa Rock de Mar del Plata."],
 ["2016–2018","disco","Vinilos","El sello Inhumano reedita <i>Fantasy</i> (2016) y <i>Club de solos</i> (2018) en vinilo de colores. En octubre de 2018 celebran los 25 años en Chile, en Blondie, con Disturbio Menor y Enfermos Terminales."],
 ["5 ago 2017","disco","Fabulosos creadores de paranoia","Doble, veinticuatro temas, con cumbia, vals, bolero y rap. Lo presentan en Groove, «el concierto más grande» de la banda hasta ese momento, y en diciembre en Zwan, en Playa Grande. En 2018 sale el 7″ <i>Frequently Asked Questions</i>, grabado en casa."],
 ["sep 2019","mdp","Semana del Rock","En el escenario GAP, con Eterna Inocencia y Cadena Perpetua."],
 ["2020–2021","disco","Herencia y las reediciones","X El Cambio reedita el catálogo en vinilo y en casete, demos incluidos «por demanda de coleccionistas». En pandemia hacen <i>Herencia</i>, el segundo acústico. Chary saca su disco solista <i>Pop</i> con Los De Alicante, y Tobogán Andaluz graba «Era un día perfecto» con él."],
 ["5 nov 2022","ruta","Obras Sanitarias","Tocan en el estadio de Obras, en Buenos Aires."],
 ["ene 2024","disco","Espíritu de 3 tonos","Tres acordes, verde, fucsia y amarillo. Se pensó doble y salió en dos partes. Wikipedia lo fecha en 2023.",1],
 ["22 jun 2024","ruta","«No más presos por luchar»","En Neuquén, durante la gira del disco, el público les acerca un cartel con esa frase y la banda lo levanta en el escenario."],
 ["29 ago 2025","disco","Espíritu de 3 tonos, Pt. 2","Nueve temas, solo digital. Un mes después tocan en Montevideo, en la Plaza Mateo, en el ciclo Contumancia."],
 ["ene 2026","hoy","«Se está acercando el final, amigos»","Lo dice Chary en un show en Groove, aunque también habla de un «momento de relajación». Yamandú responde con ambigüedad y tiene unas cuarenta piezas grabadas. La banda sigue tocando.",1],
 ["7 feb 2026","mdp","MARDELPOP","En el Brewhouse del Puerto. En junio cierran en Refi con Eterna Inocencia: «Están viniendo los nietos»."],
 ["19 jun 2026","hoy","Funeral, con El Doctor","El trapero El Doctor estrena «Funeral» con Loquero, con video oficial."],
 ["ago 2026","afuera","Fantasy, 25 años, en Chile","Quilpué, Valparaíso, Concepción y el Teatro Ex Mundo Mágico de Santiago, donde el público se sube al escenario. En Buenos Aires, Uniclub."],
 ["24 oct 2026","hoy","Groove","Otra fecha del tour de los 25 años de <i>Fantasy</i>, hace un par de días."],
 ["30 oct 2026","hoy","Neuquén, Mood Live","Próxima fecha: «25 años Fantasy», viernes a las 21."],
 ["21 nov 2026","hoy","La Plata, Casa Unclan","La que sigue."]
];
const TN={origen:"comienzos",disco:"disco",mdp:"Mar del Plata",ruta:"país",afuera:"afuera",hoy:"hoy"};
const tlEl=$("#timeline");
TL.forEach(([d,t,h,p,dd])=>{const e=document.createElement("div");e.className="ev";e.dataset.t=t;e.innerHTML=`<span class="d">${d}</span><h4>${h}<span class="tag">${TN[t]}</span>${dd?'<span class="dudoso" title="las fuentes no coinciden">fuentes en duda</span>':""}</h4><p>${p}</p>`;tlEl.appendChild(e)});
$("#tlf").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;$$("#tlf .chip").forEach(c=>c.classList.toggle("on",c===b));const f=b.dataset.f;tlEl.querySelectorAll(".ev").forEach(ev=>ev.classList.toggle("hide",f!=="all"&&ev.dataset.t!==f))});

/* ======================= INTEGRANTES ======================= */
// [nombre, rol, [1991-96, 1997-2003, 2004-16, 2017-hoy], años, ex]
const MEM=[
 ["Chary","voz y letras · Claudio Fernández",[1,1,1,1],"1991–hoy"],
 ["Yamandú","guitarra · «Anteojo», Alejandro Rodríguez",[1,1,1,1],"1991–hoy, con idas y vueltas"],
 ["Aku Almada","bajo",[0,1,1,1],"desde la época de Fantasy"],
 ["Ito Almada","batería",[0,0,1,1],"según Wikipedia, desde mediados de los 2000"],
 ["Horacio Langlois","batería",[0,1,1,1],"desde cerca de 2000; todavía lo nombran en 2015–2017",1],
 ["Leonardo Almada","bajo · ex Escoria",[1,1,0,0],"Loquero Pop, 1995, y la formación de 2003",1],
 ["«Chino» y «Canuto»","batería y bajo",[1,0,0,0],"el primer demo, 1991 · después Altocamet",1],
 ["Pablo Carriño","batería",[1,0,0,0],"1993 · otra versión lo pone de cofundador",1],
 ["Santiago Vidal","",[1,0,0,0],"1993 y Loquero Pop",1],
 ["Julián Lemmi · Jorge Areta","bajo",[1,0,0,0],"1994 y 1994–95",1],
 ["Ale Ramos","ex Lacras",[1,1,0,0],"Loquero Pop, hasta cerca de 2000",1],
 ["Pablo Micheleti","batería",[0,1,0,0],"la gira por Europa",1]
];
const MC=["var(--e2)","var(--e1)","var(--e3)","#1d8fb8","#c27a00","var(--violeta)"];
$("#integrantes").innerHTML=MEM.map((m,i)=>`<div class="ficha${m[4]?" ex":""}" style="--c:${MC[i%MC.length]}"><span class="n">${m[4]?"pasó por la banda":"hoy en la banda"}</span><h4>${m[0]}</h4><div class="rol">${m[1]||"&nbsp;"}</div><div class="per" title="1991–96 · 1997–2003 · 2004–16 · 2017–hoy">${m[2].map(v=>`<i class="${v?"on":""}"></i>`).join("")}</div><div class="yr">${m[3]}</div></div>`).join("");

/* ======================= DISCOS ======================= */
const maxDur=Math.max(...allTr.map(o=>o.t[1]));
function miniEcg(curve,color){if(!curve||!curve.length)return"";const w=600,h=22,n=curve.length;let p="";curve.forEach((v,i)=>{const x=i/(n-1)*w;const y=h-2-(v/99)*(h-4);p+=(i?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)});return `<svg class="mini" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${p}" fill="none" stroke="${color}" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`}
DISCS.forEach(d=>{
  const tot=d.tr.reduce((a,t)=>a+t[1],0);
  const el=document.createElement("article");el.className="disc";el.style.setProperty("--c",d.color);
  el.innerHTML=`<div class="cover tilt"><div class="casete-l"></div><img src="${small(COV[d.id])}" alt="Tapa de ${d.t}" loading="lazy"><div class="glare"></div></div>
  <div><h3 class="t${d.hueco?" hueco":""}" style="font-family:'${d.font}',sans-serif">${d.t}</h3><div class="meta">${d.y} · ${d.label} · ${d.tr.length} temas · ${fmt(tot)} · promedio ${fmt(tot/d.tr.length)}</div>
  <p class="desc">${d.desc}</p>
  <ol class="tracks">${d.tr.map((t,i)=>{const r=findPL(t[6]);return `<li class="${t[5]||i<4?"":"resto"}"><span>${t[0]}${t[5]?`<small>${t[5]}</small>`:""}${r>=0?`<button class="pl" data-r="${r}" aria-label="Escuchar ${t[0]}">▶ oír</button>`:""}</span><span class="dur">${fmt(t[1])}</span>${miniEcg(t[7],d.color)}</li>`}).join("")}</ol>${d.tr.some((t,i)=>!(t[5]||i<4))?`<button class="ver-todos" aria-expanded="false">Ver los ${d.tr.length} temas ↓</button>`:""}
  <p class="credits">${d.credits}</p></div>`;
  $("#discs").appendChild(el);
});
$("#discs").addEventListener("click",e=>{const b=e.target.closest(".ver-todos");if(!b)return;const ol=b.previousElementSibling;const o=ol.classList.toggle("abierta");b.setAttribute("aria-expanded",o);b.textContent=o?"Mostrar menos ↑":`Ver los ${ol.children.length} temas ↓`});
const OTH=[["dem","Demos 91/94","2004 · X El Cambio. Veintisiete temas de los primeros casetes (1991, 1993 y 1994). La tapa es un flyer manuscrito en azul: «Sábado 21/10, 21 hs, puntual, $5»."],["","Atlántida (EP)","2002 · Ugly Records. Tres temas descartados de <i>Fantasy</i>; el CD venía envuelto en un póster."],["el1","Electroshow · disco 1","Niceto Club, 22/5/2011. Doble con DVD, editado en 2012. El electrocardiograma verde cruza la foto del público."],["el2","Electroshow · disco 2","La misma noche, la misma foto, virada a rojo."],["faq","Frequently Asked Questions","2018 · 7″ grabado en casa, con letras improvisadas. Lechones fucsias y el título a mano."],["ade","Adelanto","2021 · el single de <i>Herencia</i>: «Calavera azul», «Era un día perfecto» y «Punkie»."],["lqr","Antisocial / Diábolo","5/1/2024 · el single de <i>Espíritu de 3 tonos</i>, firmado LQR."],["","Pop · Chary solista","2021 · versiones de Pappo, El Mató, Antonio Birabent y Federico Moura, más su «Ghost in the Fora», con Los De Alicante. Después, «Cola de amor», «Calaveras y diablitos» y «Volver al barrio» (2026)."],["","Sobretodo Negro","2024–25 · banda virtual de Chary con Gori (ex Fun People), el Chino Biscotti (Cadena Perpetua) y Tomás Nochteff (Mueran Humanos): «Litio» y «Selfie»."]];
$("#others").innerHTML=OTH.map(o=>`<div class="other">${o[0]?`<img src="${COV[o[0]].replace("1000x1000","250x250")}" alt="" loading="lazy">`:`<div class="sinimg">sin tapa en plataformas</div>`}<div><h4>${o[1]}</h4><p>${o[2]}</p></div></div>`).join("");
const totalSec=allTr.reduce((a,o)=>a+o.t[1],0);
$("#totalmin").dataset.count=Math.round(totalSec/60);
$("#nDiscos").dataset.count=DISCS.length;

/* ======================= BORDA Y MOYANO ======================= */
const FICHAS=[
 ["el nombre","El calabozo","Lo detuvieron por la pinta y un preso lo tomó por paciente de un psiquiátrico.","De ahí el nombre del grupo y mi idea de lo que es ser punk.","Chary, en un fanzine (2005)",-1],
 ["los noventa","Borda y Moyano","Tocaron varias veces para internos de los dos hospitales porteños. El casete <i>Vivo</i> (1994) se grabó en el Moyano.","Para nosotros los lugares más cómodos para tocar son los psiquiátricos.","Chary, Página/12 (1998)",.8],
 ["la intención","Entrar y salir","La banda, dice Chary, tiene que hacer lo que hace un manicomio con quien pasa por él.","Cuando entrás a un manicomio y salís, no sos el mismo.","Chary, en un fanzine (2005)",-.6],
 ["guardia","Chary, enfermero","Trabajó en el hospital de Mar del Plata, con paso por psiquiatría e infectología, y volvió al hospital en 2009.","Cuando trabajaba en Psiquiatría, agarraba mi ambo, se lo ponía a un paciente y yo me sentaba a comer.","Chary, Página/12 (2000)",1.2],
 ["receta","Las dos curan","Para Chary, el hospital y la música no se pelean.","La salud y la música se llevan bien: las dos curan.","Chary, Página/12 (2000)",-1],
 ["anarquía","La F.O.R.A.","Chary vivió unas semanas en la F.O.R.A., donde se filmó un video de «Ghost in the F.O.R.A.», inspirada en el militante anarquista Sergio «el Urubú» Terenzi.","Loquero es caos, anarquía. Pero no somos anarquistas, somos nihilistas.","Chary, Página/12 (1998)",.6],
 ["la ciudad","Batán y el Regional","Mar del Plata, dice Chary, no es una ciudad feliz: nombra la cárcel de Batán y el Hospital Regional.","Hay mucha gente sufriendo acá.","Chary, Indie Hoy (2023)",-.4],
 ["2024","No más presos por luchar","En Neuquén, durante la gira de <i>Espíritu de 3 tonos</i>, levantaron en el escenario el cartel que les acercó el público.","Solamente podemos existir en esta sociedad enferma.","la banda, NewsDigitales (2026)",.9]
];
$("#fichas").innerHTML=FICHAS.map(f=>`<div class="nota-e" style="--r:${f[5]}deg"><div class="h">${f[0]}</div><h4>${f[1]}</h4><p>${f[2]}</p><q>${f[3]}<small>${f[4]}</small></q></div>`).join("");
$("#set25").innerHTML=D.fan.tr.map(t=>`<li>${t[0]}</li>`).join("");

/* ======================= GRÁFICOS ======================= */
const tip=$("#tip");
function hover(el,html){const show=e=>{tip.innerHTML=html;tip.style.opacity=1;const x=e.clientX??(e.touches&&e.touches[0].clientX),y=e.clientY??(e.touches&&e.touches[0].clientY);tip.style.left=Math.min(x+14,innerWidth-270)+"px";tip.style.top=(y+14)+"px"};el.addEventListener("mousemove",show);el.addEventListener("click",show);el.addEventListener("mouseleave",()=>tip.style.opacity=0)}
addEventListener("scroll",()=>tip.style.opacity=0,{passive:true});
const onView=(el,fn)=>new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){fn();o.disconnect()}},{threshold:.25}).observe(el);

// el electrocardiograma de un disco: todas las curvas en fila
(()=>{const s=$("#chEcg"),W=1100,H=230;let cur="fan";
  $("#ecgDiscs").innerHTML=DISCS.map(d=>`<button data-d="${d.id}" style="--c:${d.color}" class="${d.id===cur?"on":""}">${d.t.replace("Fabulosos creadores de paranoia","Fabulosos creadores…")} · ${d.y}</button>`).join("");
  function draw(id){s.innerHTML="";const d=D[id];const tot=d.tr.reduce((a,t)=>a+t[1],0);let x0=10;const pw=W-20;
    for(let y=20;y<H;y+=25)mk("line",{x1:0,x2:W,y1:y,y2:y,stroke:"#0f2a16"},s);
    for(let x=0;x<W;x+=25)mk("line",{x1:x,x2:x,y1:0,y2:H,stroke:"#0f2a16"},s);
    const paths=[];
    d.tr.forEach((t,i)=>{const w=t[1]/tot*pw;const c=t[7];if(c&&c.length){let p="";c.forEach((v,j)=>{const x=x0+j/(c.length-1)*w;const y=H-26-(v/99)*(H-56);p+=(j?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)});const col=i%2?"#2bff6a":"#ffe066";const pa=mk("path",{d:p,fill:"none",stroke:col,"stroke-width":2,"stroke-linejoin":"round"},s);pa.style.filter="drop-shadow(0 0 3px "+col+")";paths.push(pa)}
      const g=mk("rect",{x:x0,y:0,width:w,height:H,fill:"transparent"},s);hover(g,`<b>${i+1}. ${t[0]}</b><br>${fmt(t[1])}${t[2]?` · ~${t[2]} BPM · ${keyEs(t[3])}`:""}`);
      if(i)mk("line",{x1:x0,x2:x0,y1:H-22,y2:H-8,stroke:"#3d6b4a","stroke-width":1},s);
      if(w>34)mk("text",{x:x0+3,y:H-8,"font-size":10},s).textContent=String(i+1).padStart(2,"0");
      x0+=w});
    mk("text",{x:W-8,y:16,"text-anchor":"end","font-size":12},s).textContent=`${d.t.toUpperCase()} · ${fmt(tot)}`;
    if(!RM)paths.forEach((p,i)=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.animate([{strokeDashoffset:L},{strokeDashoffset:0}],{duration:420,delay:i*110,fill:"forwards",easing:"linear"})});
    $("#lgEcg").innerHTML=`<span>amarillo y verde se alternan: cada tramo es un tema · pasá el mouse para ver cuál</span>`}
  $("#ecgDiscs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cur=b.dataset.d;$$("#ecgDiscs button").forEach(x=>x.classList.toggle("on",x===b));draw(cur)});
  onView(s,()=>draw(cur));
})();
(()=>{const s=$("#chDur");const all=allTr;const W=1100,H=340,pl=40,pb=24,bw=(W-pl-10)/all.length;const mx=Math.max(370,maxDur+10);
  [0,60,120,180,240,300,360].forEach(v=>{const y=H-pb-(v/mx)*(H-pb-20);mk("line",{x1:pl,x2:W,y1:y,y2:y,stroke:"var(--linea)"},s);mk("text",{x:pl-8,y:y+4,"text-anchor":"end","font-size":11},s).textContent=v/60+"'"});
  const avgAll=totalSec/all.length;const ay=H-pb-(avgAll/mx)*(H-pb-20);
  all.forEach((o,i)=>{const h=(o.t[1]/mx)*(H-pb-20);const r=mk("rect",{x:pl+i*bw+.4,y:H-pb,width:Math.max(1,bw-.8),height:0,fill:o.d.color},s);r.dataset.h=h;hover(r,`<b>${o.t[0]}</b><br>${o.d.t} · ${fmt(o.t[1])}`)});
  mk("line",{x1:pl,x2:W,y1:ay,y2:ay,stroke:"var(--tinta)","stroke-width":2,"stroke-dasharray":"6 5"},s);mk("text",{x:W-4,y:ay-8,"text-anchor":"end","font-size":12,"font-weight":700},s).textContent="promedio general "+fmt(avgAll);
  $("#lgDur").innerHTML=DISCS.map(d=>`<span><i style="background:${d.color}"></i>${d.t}</span>`).join("");
  onView(s,()=>s.querySelectorAll("rect[data-h]").forEach((r,i)=>{const h=+r.dataset.h;tween(r,{y:H-pb-h,height:h},800,i*6)}));
})();
(()=>{const s=$("#chAnios");const n=36,w=1100/n;const byY={};DISCS.forEach(d=>{const y=parseInt(d.y);(byY[y]=byY[y]||[]).push(d)});
  const evs={1991:"primer demo",1992:"debut con Lacras",1994:"Borda y Moyano",1995:"Loquero Pop",2002:"Europa (fecha en duda)",2011:"Electroshow en Niceto",2026:"Fantasy, 25 años"};
  for(let i=0;i<n;i++){const y=1991+i;const ds=byY[y]||[];const r=mk("rect",{x:i*w+2,y:30,width:w-4,height:60,fill:ds.length?ds[0].color:"var(--carta)",stroke:"var(--tinta)","stroke-width":1.6,opacity:0},s);
    ds.forEach((d,k)=>mk("circle",{cx:i*w+w/2,cy:60+(k?14:0),r:6,fill:"var(--carta)",stroke:"var(--tinta)","stroke-width":1.5},s));
    hover(r,`<b>${y}</b><br>${ds.length?ds.map(d=>d.t).join(" · "):(evs[y]||"en la ruta")}`);
    if(y%5===0||y===1991||y===2026)mk("text",{x:i*w+w/2,y:116,"text-anchor":"middle","font-size":12,"font-weight":700},s).textContent=y;
    onView(s,()=>r.animate([{opacity:0},{opacity:1}],{duration:300,delay:i*40,fill:"forwards"}))}
  mk("text",{x:4*w+w,y:20,"text-anchor":"middle","font-size":12,fill:"var(--gris)"},s).textContent="casetes, demos y Loquero Pop";
})();
function hbars(id,rows,unit,colorFn,W=500){const s=$("#"+id);const rh=Math.min(40,(+s.getAttribute("viewBox").split(" ")[3]-20)/rows.length),mx=Math.max(...rows.map(r=>r[1]));const bars=[];rows.forEach((r,i)=>{const y=10+i*rh;const w=(r[1]/mx)*(W-250);mk("text",{x:0,y:y+rh/2+4,"font-size":11.5,"font-weight":600},s).textContent=r[0].length>27?r[0].slice(0,26)+"…":r[0];const b=mk("rect",{x:190,y:y+4,width:0,height:rh-8,fill:colorFn?colorFn(r,i):"var(--e1)",stroke:"var(--tinta)","stroke-width":1.2},s);bars.push([b,w]);mk("text",{x:198+w,y:y+rh/2+4,"font-size":11,fill:"var(--gris)"},s).textContent=unit(r[1]);hover(b,`<b>${r[0]}</b><br>${unit(r[1])}`)});
  onView(s,()=>bars.forEach(([b,w],i)=>tween(b,{width:w},1000,i*60)))}
const avg=d=>d.tr.reduce((a,t)=>a+t[1],0)/d.tr.length;
hbars("chAvg",DISCS.map(d=>[d.t,avg(d)]),fmt,(r,i)=>DISCS[i].color);
hbars("chTot",DISCS.map(d=>[d.t,d.tr.reduce((a,t)=>a+t[1],0)]),v=>fmt(v)+" min",(r,i)=>DISCS[i].color);
const SETF=[["Ghost in the F.O.R.A.",42],["Esculturas",39],["Atlántida",38],["Frío",38],["Ansiedad",37],["Rusita",37],["Era un día perfecto",36],["Muchachos",36],["Barrio niebla",35],["Show Bizz",35],["Check to Me",33],["Cuidacoches",33],["Isla",33],["Corazón mojado",32],["Guárdame",32]];
hbars("chSet",SETF,v=>v+" veces",(r,i)=>i<3?"var(--e2)":"var(--e1)");
const YTV=[["Era un día perfecto",678],["Atlántida",560],["Rusita",429],["Ghost in the F.O.R.A.",372],["Frío",269],["Caballito de fuego",235],["Check to Me",223],["Punkie",158],["Chocolate",155],["Desde aquí",149]];
hbars("chYt",YTV,v=>v+" mil",(r,i)=>i<3?"var(--e2)":"var(--e3)");
(()=>{const s=$("#chScat");const W=500,H=340,p=40;const bp=conDatos.map(o=>o.t[2]),en=conDatos.map(o=>o.t[4]);const xs=[Math.min(...bp)-5,Math.max(...bp)+5],ys=[Math.min(...en)-.03,1.02];
  const X=v=>p+(v-xs[0])/(xs[1]-xs[0])*(W-p-10),Y=v=>H-p-(v-ys[0])/(ys[1]-ys[0])*(H-p-10);
  for(let v=Math.ceil(xs[0]/20)*20;v<=xs[1];v+=20){mk("line",{x1:X(v),x2:X(v),y1:10,y2:H-p,stroke:"var(--linea)"},s);mk("text",{x:X(v),y:H-p+16,"text-anchor":"middle","font-size":10.5},s).textContent=v}
  mk("text",{x:W-10,y:H-6,"text-anchor":"end","font-size":11,fill:"var(--gris)"},s).textContent="BPM →";mk("text",{x:p,y:20,"font-size":11,fill:"var(--gris)"},s).textContent="↑ energía";
  conDatos.forEach(o=>{const c=mk("circle",{cx:X(o.t[2]),cy:Y(o.t[4]),r:5.5,fill:o.d.color,stroke:"var(--tinta)","stroke-width":1.2,opacity:.92},s);hover(c,`<b>${o.t[0]}</b><br>${o.d.t}<br>~${o.t[2]} BPM · ${keyEs(o.t[3])} · energía ${o.t[4]}`)});
})();
const keyCount=(()=>{const c={};conDatos.forEach(o=>c[o.t[3]]=(c[o.t[3]]||0)+1);return c})();
const keyRows=Object.entries(keyCount).sort((a,b)=>b[1]-a[1]);
(()=>{const s=$("#chKey");const cx=150,cy=170,R=120,r0=62;let a0=-Math.PI/2;const tot=keyRows.reduce((a,r)=>a+r[1],0);const pal=["#ff1f8f","#5dbb4f","#ffe500","#6b4fd8","#1d8fb8","#e8771a","#2bff6a","#e8322b","#b5793a","#8fae2a","#ffb3d9","#5d5a52","#c8f0b0","#151413","#fff3a0","#9b8fe0","#f2a35e","#7fd99a","#ad1457","#d4cfbf","#3a3a3a","#ffd1e6","#a0c4ff","#ffadad"];
  keyRows.forEach(([k,v],i)=>{const a1=a0+v/tot*Math.PI*2;const L=a1-a0>Math.PI?1:0;const P=(a,r)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];const [x0,y0]=P(a0,R),[x1,y1]=P(a1,R),[x2,y2]=P(a1,r0),[x3,y3]=P(a0,r0);
    const pth=mk("path",{d:`M${x0},${y0}A${R},${R} 0 ${L} 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 ${L} 0 ${x3},${y3}Z`,fill:pal[i%pal.length],stroke:"var(--tinta)","stroke-width":1.4},s);hover(pth,`<b>${keyEs(k)}</b> · ${v} tema${v>1?"s":""}`);a0=a1;
    if(i<9){mk("rect",{x:300,y:40+i*28,width:13,height:13,fill:pal[i%pal.length],stroke:"var(--tinta)"},s);mk("text",{x:322,y:51+i*28,"font-size":12.5},s).textContent=`${keyEs(k)}  ×${v}`}});
  const top=keyRows[0]?keyRows[0][0]:"";mk("text",{x:cx,y:cy+8,"text-anchor":"middle","font-size":22,"font-weight":800},s).textContent=top?(KEYN[top[0]]+(top.includes("#")?"♯":"")+(top.endsWith("m")?"m":"")):"";
})();

/* ======================= LETRAS ======================= */
const GENES=[
 ["Desde uno mismo","Más universo personal que social, aunque lo social se cuele. Escribe desde cómo se siente.","«Nuestras canciones tienden más al universo personal que al social»","Chary, 2000"],
 ["La tristeza no se esconde","Depresión, ansiedad y deriva dichas sin vueltas, a veces en inglés de entrecasa.","«Estoy muy deprimido man»","«Desde aquí»"],
 ["Lo cotidiano como poema","Un día perfecto es poca cosa: la playa, los amigos, la feria.","«una vuelta por la playa y a fumar con mis amigos»","«Era un día perfecto»"],
 ["La periferia","Los pibes que no llegan, los desplazados, el barrio.","«brillando en el ruido de la periferia»","«Barrio niebla»"],
 ["Contra la escena","Desconfían del negocio y del propio punk. Cemento aparece como un palacio pegado con poxi-ran.","«ese palacio del punk rock, no es de cemento es poxi-ran»","«Frío»"],
 ["La represión","El Estado aparece en los bordes, como herida.","«a nadie le gusta la represión»","«Show Bizz»"],
 ["El agua","Mar, isla, Atlántida, alcantarilla: casi todo se moja o se hunde.","«Cada vez que respiro me sumerjo más»","«Ansiedad»"],
 ["Los que no están","Amigos muertos, llamados que llegan igual. Ricky Espinosa, Kurt Cobain.","«Hoy me llamó Ricky»","«Muchachos»"],
 ["La ternura armada","Un escudo, pero con corazón. La pelea sin perder la dulzura.","«Mi escudo tiene un corazón»","«Punkie»"],
 ["Reírse de uno","Autoparodia, diminutivos, inglés al revés: «Chaucito», «Check to me», «Signore Krupiano».","«Quise hacer un grupo pop / para vender muchos discos / pero me salió este engendro»","«Maldito y enfermo»"]
];
$("#dna").innerHTML=GENES.map((g,i)=>`<div class="gene"><div class="n">gen ${String(i+1).padStart(2,"0")}</div><h4>${g[0]}</h4><p>${g[1]}</p><q>${g[2]}<small>${g[3]}</small></q></div>`).join("");
const WORDS=[["frío",5],["isla",4],["mar",5],["Atlántida",4],["ansiedad",4],["deprimido",3],["playa",4],["amigos",4],["periferia",3],["represión",3],["soldado",3],["mariposas",3],["esculturas",3],["corazón",4],["mojado",3],["veneno",3],["fantasma",3],["F.O.R.A.",3],["chaucito",2],["luzbelito",2],["punk",5],["pop",3],["engendro",2],["cemento",3],["barrio",4],["niebla",3],["cayendo",3],["calavera",3],["perfecto",4],["check to me",3],["show bizz",3],["youngs",2],["caballito de fuego",3],["chocolate",2],["rusita",3],["paranoia",3],["herencia",2],["tres tonos",3],["loquero",5]];
const TACH=new Set(["pop","perfecto","punk"]);
{const cols=["var(--tinta)","var(--e2)","var(--eT)","var(--gris)"],fams=["Archivo","'Permanent Marker'","'Special Elite'","'Archivo Black'"];
 $("#cloud").innerHTML=WORDS.sort(()=>Math.random()-.5).map(([w,n],i)=>`<span class="${TACH.has(w)?"x":""}" style="font-size:${13+n*8}px;color:${cols[i%4]};font-family:${fams[(i+n)%4]};font-weight:${n>=4?800:500}">${w}</span>`).join("")}

/* ======================= DOS UNIVERSOS ======================= */
(()=>{const s=$("#venn");const W=900;const A={x:330,y:180,r:150},B={x:570,y:180,r:150};
  const ca=mk("circle",{cx:A.x,cy:A.y,r:A.r,fill:"var(--e1)","fill-opacity":.35,stroke:"var(--tinta)","stroke-width":2.5},s);
  const cb=mk("circle",{cx:B.x,cy:B.y,r:B.r,fill:"var(--e2)","fill-opacity":.32,stroke:"var(--tinta)","stroke-width":2.5},s);
  const T=(x,y,t,o={})=>{const e=mk("text",{x,y,"text-anchor":"middle","font-size":o.s||15,"font-weight":o.w||600,...(o.f?{"font-family":o.f}:{})},s);e.textContent=t;return e};
  T(250,70,"Yamandú",{s:22,w:800});T(250,92,"guitarra · «ideólogo sonoro»",{s:12});
  ["Joy Division","Sonic Youth","Siouxsie","ruido y texturas","post-punk"].forEach((t,i)=>T(240,135+i*30,t));
  T(650,70,"Chary",{s:22,w:800});T(650,92,"voz y letras",{s:12});
  ["Ramones","La Polla Records","Eskorbuto","Kiss, Moris, Sumo","el punk de barrio"].forEach((t,i)=>T(660,135+i*30,t));
  T(450,165,"LOQUERO",{s:26,w:400,f:"Permanent Marker"});T(450,190,"«el encuentro",{s:12.5});T(450,206,"entre dos universos»",{s:12.5});T(450,232,"Yamandú, 2026",{s:10.5,w:500});
  T(450,345,"y abajo, sosteniendo, Aku Almada en bajo e Ito Almada en batería",{s:12.5,w:500});
  if(!RM){ca.animate([{transform:"translateX(0)"},{transform:"translateX(10px)"},{transform:"translateX(0)"}],{duration:4200,iterations:Infinity,easing:"ease-in-out"});cb.animate([{transform:"translateX(0)"},{transform:"translateX(-10px)"},{transform:"translateX(0)"}],{duration:4200,iterations:Infinity,easing:"ease-in-out"})}
})();
const I=p=>`<svg viewBox="0 0 64 64" fill="none" stroke="#151413" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const LAB=[
 ["La voz de Chary","Casi hablada, gritada o rota, con recitados y frases en inglés mal puesto a propósito.",I('<rect x="24" y="6" width="16" height="28" rx="8" fill="#ff1f8f"/><path d="M16 30c0 9 7 15 16 15s16-6 16-15M32 45v12M22 57h20"/>')],
 ["La guitarra de Yamandú","Ruido, acoples y texturas: «muchas gracias por bancar al ruido y a los músicos que hacemos ruido».",I('<path d="M44 4l16 16-5 2-15 15" fill="#5dbb4f"/><path d="M40 24L16 48a8 8 0 1 1-6-6l24-24"/><circle cx="14" cy="50" r="3" fill="#151413"/>')],
 ["Tres acordes","El método de <i>Espíritu de 3 tonos</i>: achicar la armonía hasta lo mínimo.",I('<path d="M8 14h48M8 24h48M8 34h48M8 44h48" stroke="#8f8b80"/><circle cx="18" cy="24" r="5" fill="#5dbb4f"/><circle cx="32" cy="34" r="5" fill="#ff1f8f"/><circle cx="46" cy="14" r="5" fill="#ffe500"/>')],
 ["Bajo y batería","Aku Almada en el bajo desde la época de <i>Fantasy</i> e Ito Almada en la batería: la base de hoy.",I('<ellipse cx="32" cy="40" rx="20" ry="7" fill="#ffe500"/><path d="M12 40v10c0 4 9 7 20 7s20-3 20-7V40"/><path d="M8 8l18 22M56 8L38 30"/>')],
 ["Batería electrónica","Los demos de <i>Fantasy</i> nacieron en una pieza, con computadora y batería electrónica.",I('<rect x="6" y="14" width="52" height="34" rx="3" fill="#2bff6a"/><path d="M14 24h8v8h-8zM28 24h8v8h-8zM42 24h8v8h-8zM14 36h36"/>')],
 ["La criolla","Dos acústicos, <i>Consuelo</i> (2003) y <i>Herencia</i> (2021), con las canciones desnudas.",I('<path d="M26 34a12 12 0 1 0 12 12V8" fill="#e8771a"/><circle cx="26" cy="46" r="4" fill="#151413"/><path d="M38 8h8M38 14h6"/>')],
 ["Cumbia, vals y bolero","Metidos en el punk en <i>Fabulosos creadores de paranoia</i>, junto con un poco de rap.",I('<circle cx="20" cy="44" r="8" fill="#6b4fd8"/><circle cx="44" cy="40" r="8" fill="#6b4fd8"/><path d="M28 44V12l24-6v34"/>')],
 ["El casete","Demos de doscientas copias, un casete con fanzine y, en 2021, los demos reeditados en casete.",I('<rect x="6" y="14" width="52" height="34" rx="4" fill="#fffdf6"/><circle cx="22" cy="31" r="6" fill="#151413"/><circle cx="42" cy="31" r="6" fill="#151413"/><path d="M16 48l4-8h24l4 8"/>')],
 ["Covers de cierre","«A nadie», de Flema, es su versión más tocada; también Eskorbuto, La Polla, 2 Minutos y Charly García.",I('<path d="M10 52L54 12M10 12l44 40" stroke="#ff1f8f" stroke-width="5"/><circle cx="32" cy="32" r="22"/>')],
 ["Grabado en analógico","<i>Black</i> se hizo entero en Estudios El Pie, «todo analógico».",I('<circle cx="32" cy="32" r="24" fill="#151413"/><circle cx="32" cy="32" r="8" fill="#ff1f8f"/><circle cx="32" cy="32" r="2" fill="#fff"/>')]
];
$("#lab").innerHTML=LAB.map(l=>`<div class="inst">${l[2]}<h4>${l[0]}</h4><p>${l[1]}</p></div>`).join("");

/* ======================= MAPA ======================= */
(()=>{const s=$("#map");const P=(lat,lon)=>[30+(lon+76)*14.5,20+(-lat-17)*18.4];const path=pts=>"M"+pts.map(c=>P(...c).map(v=>v.toFixed(1)).join(",")).join(" L")+"Z";
  const AR=[[-22,-66],[-22,-64.4],[-22.3,-63.9],[-22,-62.8],[-23.5,-61],[-24.5,-59.5],[-25.3,-57.6],[-27.3,-58.6],[-27.4,-55.9],[-26.2,-54.7],[-25.6,-54.6],[-26.4,-53.7],[-27.2,-53.8],[-28.5,-55.8],[-30.2,-57.6],[-32.3,-58.1],[-33.9,-58.4],[-34.6,-58.4],[-35.4,-57.2],[-36.3,-56.7],[-37.3,-57.1],[-38,-57.5],[-38.6,-58.7],[-38.9,-61],[-38.9,-62.3],[-39.6,-62.2],[-40.6,-62.2],[-41.1,-63.5],[-41.2,-65],[-42.1,-64],[-42.6,-63.6],[-43,-64.4],[-44.8,-65.6],[-45.9,-67.5],[-47.1,-65.9],[-48.4,-67],[-50,-68.5],[-51.6,-69],[-52.3,-68.4],[-52,-71.9],[-50.7,-72.3],[-49.2,-73.2],[-48,-72.4],[-46.5,-71.7],[-44.5,-71.7],[-42.5,-71.8],[-41,-71.8],[-39.3,-71.5],[-37.5,-71.1],[-36,-70.5],[-34.5,-70.1],[-33,-70],[-31,-70.4],[-29.3,-69.8],[-28,-69],[-27,-68.5],[-25.5,-68.4],[-24,-67.3],[-23,-67.1],[-22.5,-66.8]];
  const TDF=[[-52.65,-68.6],[-53.2,-68.2],[-53.8,-67.6],[-54.5,-66.5],[-54.75,-65.1],[-54.9,-66.4],[-54.85,-68.6]];
  const CL=[[-17.5,-69.5],[-18.5,-70.35],[-20.2,-70.15],[-22.1,-70.2],[-23.6,-70.4],[-25.4,-70.5],[-27.1,-70.9],[-29.9,-71.35],[-32,-71.5],[-33,-71.65],[-34.5,-72],[-36.8,-73.1],[-37.6,-73.65],[-39.8,-73.25],[-41.5,-73.8],[-42.5,-74.1],[-44,-75],[-46.5,-75.6],[-48.5,-75.5],[-50.5,-75.3],[-52.3,-74.6],[-53.5,-72.8],[-54.5,-71.5],[-55,-69.5],[-54.85,-68.6],[-52.65,-68.6],[-52.2,-69.4],[-52,-71.9],[-50.7,-72.3],[-49.2,-73.2],[-48,-72.4],[-46.5,-71.7],[-44.5,-71.7],[-42.5,-71.8],[-41,-71.8],[-39.3,-71.5],[-37.5,-71.1],[-36,-70.5],[-34.5,-70.1],[-33,-70],[-31,-70.4],[-29.3,-69.8],[-28,-69],[-27,-68.5],[-25.5,-68.4],[-24,-67.3],[-23,-67.1],[-21,-68.2],[-19,-68.9]];
  const UY=[[-30.19,-57.61],[-30.28,-57.08],[-30.11,-56.74],[-30.4,-56.4],[-30.73,-56],[-30.88,-55.6],[-31.08,-55.25],[-31.35,-54.9],[-31.87,-54.16],[-32.18,-53.75],[-32.58,-53.38],[-32.95,-53.55],[-33.3,-53.5],[-33.69,-53.46],[-34.2,-53.75],[-34.66,-54.16],[-34.97,-54.95],[-34.87,-55.27],[-34.78,-55.9],[-34.9,-56.2],[-34.85,-56.6],[-34.47,-57.85],[-34.2,-58.2],[-33.88,-58.42],[-33.12,-58.3],[-32.32,-58.08],[-31.38,-57.97],[-30.65,-57.85]];
  // mar en trama de semitono
  const pat=mk("pattern",{id:"semi",width:9,height:9,patternUnits:"userSpaceOnUse"},mk("defs",{},s));mk("circle",{cx:4.5,cy:4.5,r:1.6,fill:"var(--tinta)",opacity:.28},pat);
  mk("rect",{x:0,y:0,width:440,height:760,fill:"url(#semi)"},s);
  mk("path",{d:path(CL),fill:"var(--papel2)",stroke:"var(--tinta)","stroke-width":1.6,"stroke-linejoin":"round"},s);
  mk("path",{d:path(AR),fill:"var(--carta)",stroke:"var(--tinta)","stroke-width":2,"stroke-linejoin":"round"},s);
  mk("path",{d:path(TDF),fill:"var(--carta)",stroke:"var(--tinta)","stroke-width":2},s);
  mk("path",{d:path(UY),fill:"var(--papel2)",stroke:"var(--tinta)","stroke-width":1.6},s);
  [["ARGENTINA",-36,-66],["CHILE",-45.5,-74.4],["URUGUAY",-31.6,-56.2],["Mar Argentino",-44,-58.5]].forEach(([t,la,lo])=>{const [x,y]=P(la,lo);const e=mk("text",{x,y,"font-size":t==="Mar Argentino"?12:11,fill:"var(--gris)","font-weight":700,"letter-spacing":"2"},s);e.textContent=t;if(t==="CHILE"){e.setAttribute("transform",`rotate(-80 ${x} ${y})`)}});
  const [mx,my]=P(-38,-57.55);
  // Europa: la flecha sale de Mar del Plata hacia el noreste
  const g0=mk("g",{},s);const a=mk("path",{d:`M${mx},${my} Q${mx+120},${my-200} 420,40`,stroke:"var(--e2)","stroke-width":2,fill:"none","stroke-dasharray":"4 6"},g0);if(!RM)a.animate([{strokeDashoffset:0},{strokeDashoffset:-60}],{duration:2400,iterations:Infinity});
  mk("text",{x:432,y:30,"text-anchor":"end","font-size":13,"font-weight":800},g0).textContent="Europa →";hover(g0,"<b>Europa</b><br>Gira en casas okupas con Criatura (Zaragoza): España, Francia, Holanda, Bélgica, Portugal, Alemania, Suiza y el País Vasco, según la fuente. Fecha y tamaño en duda.");
  const pts=[["Mar del Plata","Vinoteca Perrier · Patio Cervecero · Pompeya · Blues Bar · Bourbon · Sótano Beat · Casa Rock · Zwan · GAP · Abbey Road · Brewhouse · Refi",-38,-57.55,"var(--e2)",16],["Buenos Aires","Cemento (13 veces) · Hospitales Borda y Moyano · Parakultural · Niceto · Groove · Uniclub · Luna Park · Obras · Teatro Flores · Art Media · Konex",-34.6,-58.4,"var(--e2)",13],["La Plata","1998 · 2015 · 2025 · 2026",-34.92,-57.95,"var(--e1)",5],["Pinamar y Gesell","Pakalolo · Superclub · 1997",-37.15,-56.9,"var(--e1)",5],["Bahía Blanca","1999 · 2004",-38.72,-62.27,"var(--e1)",6],["Rosario","2007 · 2015 · 2017 · 2018",-32.95,-60.65,"var(--e1)",6],["Córdoba","1999 · 2023",-31.42,-64.18,"var(--e1)",6],["Mendoza","2013 · 2016",-32.89,-68.84,"var(--e1)",5],["Neuquén","2001 · 2022 · 2024 · 30/10/2026",-38.95,-68.06,"var(--e1)",7],["Comodoro y Caleta","1999 · 2017",-45.9,-67.5,"var(--e1)",6],["Tucumán","2017 · 2025",-26.82,-65.22,"var(--e1)",5],["Santiago","Catedral 1997 · Estadio Nacional 2012 · Coliseo 2023 · Ex Mundo Mágico 2026",-33.45,-70.67,"var(--violeta)",11],["Valparaíso","Sindicato de Estibadores 1997 · El Huevo 2026",-33.05,-71.62,"var(--violeta)",6],["Concepción","2025 · 2026",-36.83,-73.05,"var(--violeta)",6],["Punta Arenas","Shailot · 14/4/2001",-53.16,-70.92,"var(--violeta)",6],["Montevideo","Plaza Mateo · 21/9/2025",-34.9,-56.17,"var(--violeta)",6]];
  const LO={"Mar del Plata":[14,6,"start"],"Buenos Aires":[-14,-4,"end"],"La Plata":[10,12,"start"],"Pinamar y Gesell":[10,4,"start"],"Bahía Blanca":[-10,16,"end"],"Rosario":[10,-6,"start"],"Córdoba":[-10,-6,"end"],"Mendoza":[10,12,"start"],"Neuquén":[10,4,"start"],"Comodoro y Caleta":[10,4,"start"],"Tucumán":[10,4,"start"],"Santiago":[-6,-12,"end"],"Valparaíso":[-10,14,"end"],"Concepción":[-10,4,"end"],"Punta Arenas":[10,14,"start"],"Montevideo":[10,-8,"start"]};
  pts.forEach(([n,d,la,lo,c,r])=>{const [x,y]=P(la,lo);const g=mk("g",{},s);mk("circle",{cx:x,cy:y,r:r+6,fill:c,opacity:.22},g);const cc=mk("circle",{cx:x,cy:y,r:r/2+2.5,fill:c,stroke:"var(--tinta)","stroke-width":1.5},g);if(!RM)cc.animate([{opacity:1},{opacity:.45},{opacity:1}],{duration:2200+Math.random()*1500,iterations:Infinity});
    const L=LO[n];mk("text",{x:x+L[0],y:y+L[1],"text-anchor":L[2],"font-size":n==="Mar del Plata"?14:10.5,"font-weight":n==="Mar del Plata"?800:600},g).textContent=n;hover(g,`<b>${n}</b><br>${d}`)});
})();
const VEN=[["h","Mar del Plata"],["Vinoteca Perrier","1993 · y una nota de 2017"],["Patio Cervecero","21/1/1993 · el primero registrado"],["Sociedad de Fomento Pompeya","1993"],["Bourbon · Sótano Beat","1998"],["Biblioteca Popular Juventud Moderna","2001"],["Casa Rock","2015"],["Zwan, Playa Grande","15/12/2017"],["GAP · Semana del Rock","2019"],["Brewhouse del Puerto","MARDELPOP 2024 y 2026"],["Refi","2026, con Eterna Inocencia"],["h","Buenos Aires"],["Hospitales Borda y Moyano","años noventa"],["Parakultural","casete Vivo, 1994"],["Cemento","13 veces, 1996–2004"],["Niceto Club","Electroshow, 22/5/2011"],["Estadio Luna Park","15/11/2015"],["Groove","2012, 2017 y 2021–2026"],["Uniclub","seis veces · Fantasy 25 años"],["Estadio Obras","5/11/2022"],["Teatro Flores","2013 y 2025"],["Art Media","Family Punk y Family Hardcore, 2026"],["Ciudad Cultural Konex","26/10/2024"],["h","Costa, provincia e interior"],["Pakalolo, Pinamar · Superclub, Gesell","1997"],["Club Villa Obrera, Berazategui","2002"],["Universidad San Juan Bosco, Comodoro","6/12/1999"],["Club Paraguay, Córdoba","2023"],["Mood, Neuquén","2022, 2024 y 30/10/2026"],["Casa Unclan, La Plata","21/11/2026"],["h","Chile, Uruguay y Europa"],["Sindicato de Estibadores, Valparaíso","1997"],["Shailot, Punta Arenas","14/4/2001"],["Estadio Nacional, Santiago","PunkRock Festival 2012"],["Blondie, Santiago","25 años, 2018"],["Teatro Coliseo, Santiago","2023"],["Teatro Ex Mundo Mágico, Santiago","22/8/2026"],["Plaza Mateo, Montevideo","21/9/2025"],["Casas okupas de Europa","gira con Criatura · fecha en duda"]];
$("#venues").innerHTML=VEN.map(v=>v[0]==="h"?`<li class="h">${v[1]}</li>`:`<li>${v[0]}<span>${v[1]}</span></li>`).join("");

/* ======================= RED ======================= */
(()=>{const s=$("#net");const W=1100,H=620,cx=W/2,cy=H/2;const G={banda:"#ff1f8f",ex:"#ffe500",sello:"#2bff6a",amigas:"#1d8fb8",cruces:"#e8771a"};
  const N=[["Chary","banda","voz y letras"],["Yamandú","banda","guitarra · «Anteojo»"],["Aku Almada","banda","bajo"],["Ito Almada","banda","batería"],
   ["Horacio Langlois","ex","batería"],["Leonardo Almada","ex","bajo · ex Escoria"],["Pablo Carriño","ex","batería, 1993"],["«Chino» y «Canuto»","ex","el primer demo"],["Jorge Areta","ex","bajo, 1994–95"],["Ale Ramos","ex","ex Lacras"],["Pablo Micheleti","ex","batería en Europa"],["Santiago Vidal","ex","1993 y Loquero Pop"],
   ["Nekro / Boom Boom Kid","sello","Ugly Records · productor"],["X El Cambio Records","sello","el sello desde 2003"],["Inhumano","sello","los vinilos de 2016 y 2018"],["Juan Namuncurá","sello","Estudios Aloé · Club de solos"],["Estudios Panda","sello","Fantasy"],["Estudios El Pie","sello","Black, todo analógico"],["Sputnik Design","sello","arte de Fantasy"],["Gux Ramone","sello","fotos de hoy"],
   ["Fun People","amigas","Cemento, 1995 · los beneficios"],["Flema · Ricky Espinosa","amigas","«Épico» · «A nadie»"],["2 Minutos","amigas","«punks reales en música y actitud»"],["Eterna Inocencia","amigas","giras 2019–2026"],["Cadena Perpetua","amigas","Semana del Rock 2019"],["Lacras","amigas","el debut, 1992"],["A.N.I.M.A.L · D.A.J.","amigas","beneficios de 1994"],["Criatura","amigas","Zaragoza · la gira europea"],["Adolescents","amigas","2015, en Flores"],
   ["Tobogán Andaluz","cruces","«Era un día perfecto» con Chary"],["El Doctor","cruces","«Funeral», 2026"],["Los De Alicante","cruces","el disco Pop de Chary"],["Sobretodo Negro","cruces","Chary, Gori, el Chino Biscotti, Nochteff"],["Gerardo Dekadencia","cruces","el demo para Berlín"],["Enrique Symns","cruces","fiesta de Cerdos & Peces"],["Altocamet","cruces","Chino y Canuto, después"]];
  const groups=Object.keys(G);const pos=N.map(n=>{const gi=groups.indexOf(n[1]);const same=N.filter(m=>m[1]===n[1]);const k=same.indexOf(n);const base=gi/groups.length*Math.PI*2-Math.PI/2;const spread=(Math.PI*2/groups.length)*.84;const a=base+(k/(Math.max(1,same.length-1))-.5)*spread;const R=(k%2?255:200);return [cx+Math.cos(a)*R*1.6,cy+Math.sin(a)*R*.98]});
  const lines=N.map((n,i)=>mk("line",{x1:cx,y1:cy,x2:pos[i][0],y2:pos[i][1],stroke:"var(--tinta)","stroke-width":1.2,opacity:.16},s));
  N.forEach((n,i)=>{const g=mk("g",{class:"node"},s);g.dataset.g=n[1];mk("circle",{cx:pos[i][0],cy:pos[i][1],r:7,fill:G[n[1]],stroke:"var(--tinta)","stroke-width":1.5},g);const left=pos[i][0]<cx;mk("text",{x:pos[i][0]+(left?-12:12),y:pos[i][1]+4,"text-anchor":left?"end":"start","font-weight":600},g).textContent=n[0];hover(g,`<b>${n[0]}</b><br>${n[2]}`);
    g.addEventListener("mouseenter",()=>{s.classList.add("focus");$$("#net .node").forEach(x=>x.classList.toggle("hl",x.dataset.g===n[1]));lines.forEach((l,j)=>l.setAttribute("opacity",N[j][1]===n[1]?.7:.05))});
    g.addEventListener("mouseleave",()=>{s.classList.remove("focus");lines.forEach(l=>l.setAttribute("opacity",.16))})});
  mk("circle",{cx,cy,r:62,fill:"var(--e3)",stroke:"var(--tinta)","stroke-width":2.5},s);const pulse=mk("circle",{cx,cy,r:62,fill:"none",stroke:"var(--tinta)","stroke-width":1.5},s);if(!RM)pulse.animate([{r:62,opacity:.8},{r:118,opacity:0}],{duration:2600,iterations:Infinity});
  const t=mk("text",{x:cx,y:cy+12,"text-anchor":"middle","font-size":34,"font-family":"Permanent Marker",fill:"#ff1f8f"},s);t.textContent="LQR";t.style.fill="#ff1f8f";
  const lg={banda:"Banda hoy",ex:"Pasaron por la banda",sello:"Sellos, estudios e imagen",amigas:"Bandas hermanas",cruces:"Cruces y otras vidas"};
  groups.forEach((k,i)=>{mk("rect",{x:10,y:14+i*20,width:12,height:12,fill:G[k],stroke:"var(--tinta)"},s);mk("text",{x:30,y:24+i*20,"font-size":12},s).textContent=lg[k]});
})();

/* ======================= CARRUSEL ======================= */
const VID=[["CIILckhFjFY","Era un día perfecto","Clip de época · Fantasy"],["jAPvyc3GXCg","Invierno","Clip oficial · 2017"],["RbY-VbFhDAM","Funeral","El Doctor ft. Loquero · 2026"],["FHLGVnD8m14","Electroshow completo","Niceto Club · 22/5/2011"],["Uhufs4OiYZc","Fantasy, 25 años","Teatro Ex Mundo Mágico · 22/8/2026"],["90euLT9B9Lc","El Huevo, Valparaíso","Show completo · 21/8/2026"],["y5uLhJ9lStE","Groove","24/10/2026"],["da-2WjkmPEw","25 de Mayo","Buenos Aires · 1994"],["4GHttJljweY","Comodoro Rivadavia","Show completo · 6/12/1999"],["RMorZaf1kIw","Neuquén","Show y entrevista · 12/4/2001"],["8LQ7nwEGvQM","En vivo en Cemento","Archivo"],["Y0UhJHJOVnY","Luna Park","15/11/2015"],["hBW_IyoiWVM","Forte","Canal oficial · 2017"],["ABoLp7wCriw","Frequently Asked Questions","EP 2018"],["8viFhyVvzRI","25 años en el Loquero","Avance del documental · 2017"],["qLaMj_Wdd_A","All About Chary","Entrevista · 1999"],["W_SeD3N-HkE","Chary en la Vinoteca Perrier","Nota · 2017"],["BEmogPZgIhQ","Punk de mar y culto","Chary y Yamandú · 2026"],["CD6pCor1hiA","Era un día perfecto","Tobogán Andaluz con Chary"],["DOsnmO3tzZ0","Ghost in the F.O.R.A.","Los De Alicante feat. Chary"]];
(()=>{const car=$("#car");const dots=$("#dots");let cur=0,timer;
  car.innerHTML=VID.map((v,i)=>`<div class="slide" data-i="${i}" role="button" tabindex="0" aria-label="${v[1]}"><img src="https://i.ytimg.com/vi/${v[0]}/hqdefault.jpg" alt="" loading="lazy"><div class="cap"><b>${v[1]}</b>${v[2]}</div></div>`).join("");
  dots.innerHTML=VID.map((_,i)=>`<i data-i="${i}"></i>`).join("");
  const slides=[...car.children],n=slides.length;
  function lay(){const w=innerWidth<700?150:300;slides.forEach((s,i)=>{let o=i-cur;if(o>n/2)o-=n;if(o<-n/2)o+=n;const a=Math.abs(o);s.style.transform=`translateX(${o*w}px) translateZ(${-a*220}px) rotateY(${-o*26}deg)`;s.style.opacity=a>3?0:1-a*.2;s.style.zIndex=100-a;s.style.filter=a?`grayscale(1) contrast(1.3)`:"none";s.classList.toggle("c",a===0);s.style.pointerEvents=a>3?"none":"auto"});[...dots.children].forEach((d,i)=>d.classList.toggle("on",i===cur))}
  const go=i=>{cur=(i+n)%n;lay()};
  const auto=()=>{clearInterval(timer);if(!RM)timer=setInterval(()=>go(cur+1),5200)};
  const pick=s=>{const i=+s.dataset.i;if(i===cur)openVid(VID[i][0]);else go(i);auto()};
  car.addEventListener("click",e=>{const s=e.target.closest(".slide");if(s)pick(s)});
  car.addEventListener("keydown",e=>{const s=e.target.closest(".slide");if(s&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pick(s)}});
  dots.addEventListener("click",e=>{if(e.target.dataset.i)go(+e.target.dataset.i);auto()});
  $("#carPrev").onclick=()=>{go(cur-1);auto()};$("#carNext").onclick=()=>{go(cur+1);auto()};
  car.addEventListener("mouseenter",()=>clearInterval(timer));car.addEventListener("mouseleave",auto);
  let sx=null;car.addEventListener("pointerdown",e=>sx=e.clientX);car.addEventListener("pointerup",e=>{if(sx!==null&&Math.abs(e.clientX-sx)>50){go(cur+(e.clientX<sx?1:-1));auto()}sx=null});
  addEventListener("keydown",e=>{if(e.target.closest("input,textarea"))return;const r=car.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){if(e.key==="ArrowRight")go(cur+1);if(e.key==="ArrowLeft")go(cur-1)}});
  addEventListener("resize",lay);lay();auto();
})();
function openVid(id){if(window.YTP&&YTP.pauseVideo)try{YTP.pauseVideo()}catch(e){}$("#modalBox").innerHTML=`<button class="close" onclick="closeVid()">Cerrar ✕</button><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Video"></iframe>`;$("#modal").classList.add("on")}
function closeVid(){$("#modal").classList.remove("on");$("#modalBox").innerHTML=""}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeVid()});
addEventListener("keydown",e=>{if(e.key==="Escape")closeVid()});

/* ======================= DIAGNÓSTICO ======================= */
const bpmAvg=d=>{const v=d.tr.filter(t=>t[2]);return v.length?Math.round(v.reduce((a,t)=>a+t[2],0)/v.length):0};
const enAvg=d=>{const v=d.tr.filter(t=>t[2]);return v.length?v.reduce((a,t)=>a+t[4],0)/v.length:0};
const studioAvg=d=>avg(d);
const byAvg=[...DISCS].sort((a,b)=>studioAvg(a)-studioAvg(b));
const byEn=[...DISCS].filter(d=>enAvg(d)).sort((a,b)=>enAvg(b)-enAvg(a));
const cortos=allTr.filter(o=>o.t[1]<120).length;
const topKey=keyRows[0]||["",0];
const INS=[
 ["Canciones cortas, discos largos",`De los ${allTr.length} temas de estudio, ${cortos} duran menos de dos minutos. El disco más apretado es <i>${byAvg[0].t}</i> (${fmt(studioAvg(byAvg[0]))} por tema) y el más estirado, <i>${byAvg[byAvg.length-1].t}</i> (${fmt(studioAvg(byAvg[byAvg.length-1]))}). Pero <i>Fabulosos creadores de paranoia</i> dura más de una hora: el punk corto también puede ser doble.`],
 ["El disco más intenso (estimado)",`Midiendo el volumen de cada tema completo, el disco con más energía promedio es <i>${byEn[0].t}</i> y el más calmo, <i>${byEn[byEn.length-1].t}</i>. Los acústicos quedan abajo, como era de esperar; lo interesante es cuánto pesa lo de arriba.`],
 [`${keyEs(topKey[0])}, según la máquina`,`La tonalidad que más se repite en la estimación automática es ${keyEs(topKey[0])}, con ${topKey[1]} temas. Es una estimación sobre el audio completo y en canciones con mucha distorsión puede fallar: tomalo como una pista, no como una partitura.`],
 ["Lo que más se escucha es Fantasy","Seis de los diez temas más reproducidos en YouTube son de <i>Fantasy</i> («Era un día perfecto», «Atlántida», «Rusita», «Caballito de fuego», «Chocolate» y «Desde aquí») y 25 años después lo están tocando entero. El disco que Chary llama el más raro es el que más gente encontró."],
 ["En vivo manda Club de solos","Los seis temas más tocados según setlist.fm son, en su mayoría, de <i>Club de solos</i>: «Ghost in the F.O.R.A.» (42 listas), «Esculturas», «Frío» y «Ansiedad». El núcleo de cada show es <i>Fantasy</i> + <i>Club de solos</i> + <i>Temor morboso</i>, y casi siempre cierran con «A nadie», de Flema."],
 ["Nunca se separaron","A diferencia de casi todas las bandas de su camada, Loquero no tuvo un regreso: pasaron por ella unos treinta integrantes, tuvo una etapa como Loquero Pop, se dispersó en 1995 y siguió. Hubo un anuncio de final en 2026, pero en octubre seguían de gira."],
 ["Mar del Plata está en todo y en ninguna tapa","La ciudad aparece en las letras, en las entrevistas («Mar del Plata me mata», «no es una ciudad feliz») y en las anécdotas, pero ninguna tapa muestra la playa. El mar de <i>Club de solos</i> está virado a violeta: es una isla, no una postal."],
 ["Del hospital al escenario, ida y vuelta","El nombre sale de un calabozo, los primeros shows fuera de la ciudad fueron en el Borda y el Moyano, el casete en vivo se grabó en un hospital, Chary es enfermero y dos discos se llaman <i>Electroshow</i> y <i>Radio Post Mortem</i>. No es una estética: es una biografía."],
 ["Chile, el segundo país","Veinte de las 156 listas de setlist.fm son de Chile, desde Punta Arenas en 2001 hasta el Ex Mundo Mágico en 2026, con la gente subida al escenario. Para una banda de culto, es mucha gente."]
];
$("#insights").innerHTML=INS.map(i=>`<div class="ins"><h4>${i[0]}</h4><p>${i[1]}</p></div>`).join("");
const SET=["Atlántida","Uki uki","Mariposas","Ansiedad","Era un día perfecto","Rusita","Frío","Corazón mojado","Tulipán","Caballito de fuego","Esculturas","Cuidacoches","Ghost in the F.O.R.A.","Youngs","A nadie (Flema)"];
$("#setlist").innerHTML=`<li class="h">Set · Mar del Plata</li>`+SET.map(s=>`<li>${s}</li>`).join("");
const MOOD=[["Bronca","Show Bizz · Cuidacoches · Antisocial"],["Bajón","Desde aquí · Ansiedad · Frío"],["Playa en invierno","Era un día perfecto · Isla · Atlántida"],["Amigos que no están","Muchachos · Épico · Youngs"],["Pogo","Uky uky · Rusita · Punk corriendo"],["Desnudo","Consuelo y Herencia enteros"],["Raro","Fantasy, de punta a punta"],["Primera escucha","Era un día perfecto → Ghost in the F.O.R.A. → Atlántida → Frío → Diábolo"]];
$("#moods").innerHTML=MOOD.map(m=>`<div class="mood"><h4>${m[0]}</h4><p>${m[1]}</p></div>`).join("");

/* ======================= OFRENDA: pestañas ======================= */
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$("#tabs button").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-selected",x===b)});$$(".poem").forEach(p=>p.classList.toggle("on",p.id===b.dataset.p))});

/* ======================= FUENTES ======================= */
const SRC=[["Wikipedia · Loquero","https://es.wikipedia.org/wiki/Loquero"],["rock.com.ar · Loquero","https://rock.com.ar/artistas/loquero"],["Discogs","https://www.discogs.com/artist/1789484-Loquero"],["setlist.fm","https://www.setlist.fm/setlists/loquero-53db4fc1.html"],["setlist.fm · estadísticas","https://www.setlist.fm/stats/loquero-53db4fc1.html"],["Deezer · duraciones y tapas","https://www.deezer.com/artist/11271726"],["MusicBrainz","https://musicbrainz.org/artist/bd225d6e-1609-4404-9deb-c5174ae2aebf"],["Stay Free · Chary (1/4)","https://stayfree.blogspot.com/2009/07/dias-extranos-14.html"],["Stay Free · Chary (2/4)","https://stayfree.blogspot.com/2009/07/corazon-mojado-24.html"],["Stay Free · Chary (3/4)","http://stayfree.blogspot.com/2009/07/muchachos-34.html"],["Stay Free · Chary (4/4)","https://stayfree.blogspot.com/2009/07/militante-de-la-utopia-44_27.html"],["Página/12 · Mar del Plata me mata (1998)","https://www.pagina12.com.ar/1998/suple/no/98-04/98-04-23/199.htm"],["Página/12 · NO (2000)","https://www.pagina12.com.ar/2000/suple/no/00-09/00-09-21/nota2.htm"],["Página/12 · Música de las alcantarillas (2002)","https://www.pagina12.com.ar/diario/suplementos/no/12-77-2002-01-24.html"],["Página/12 · Cosas que pasan (2002)","https://www.pagina12.com.ar/diario/suplementos/no/24-410-2002-10-03.html"],["Página/12 · En el nombre del punk (2002)","https://www.pagina12.com.ar/diario/suplementos/no/12-524-2002-12-19.html"],["Página/12 · Radar (2004)","https://www.pagina12.com.ar/diario/suplementos/radar/15-1517-2004-06-27.html"],["Rolling Stone · 35 años (vía FM Hits)","https://www.fmhits.com.ar/loquero-35-anos-de-melancolia-punk-y-autodestruccion/"],["Madhouse · Bitácora punk (2024)","http://madhouse.com.ar/2024/02/23/bitacora-punk-repasamos-con-chary-la-carrera-de-loquero/"],["Madhouse · Chary solista (2021)","http://madhouse.com.ar/2021/12/01/con-chary-de-loquero-y-flamante-solista-antes-de-su-show-en-groove-creo-que-es-el-momento-de-dejar-algo-para-alguien/"],["Madhouse · Yamandú (2026)","https://madhouse.com.ar/2026/02/25/con-yamandu-de-loquero-la-banda-es-una-fuente-de-luz-y-oscuridad-continua/"],["Indie Hoy · El regreso (2023)","https://indiehoy.com/entrevistas/loquero-habla-sobre-su-regreso-a-los-escenarios-nos-mantiene-unidos-nuestro-espiritu-aventurero/"],["Indie Hoy · Tobogán Andaluz (2020)","https://indiehoy.com/canciones/tobogan-andaluz-publica-un-cover-de-loquero-era-un-dia-perfecto"],["La Linterna (2026)","https://lalinternaweb.com/?p=5580"],["NewsDigitales · Fantasy (2026)","https://www.newsdigitales.com/nota/346597/loquero-y-el-secreto-de-fantasy-por-que-un-disco-raro-termino-siendo-un-clasico/"],["La Capital · La libertad (2017)","https://www.lacapitalmdp.com/loquero-la-libertad-no-es-para-cualquiera/"],["La Capital · Semana del Rock (2019)","https://www.lacapitalmdp.com/noche-punk-en-la-semana-del-rock/"],["ArteZeta · Chary","https://artezeta.com.ar/chary-el-rock-siempre-fue-un-carton-pintado/"],["Caras y Caretas · El poeta inesperado (2025)","https://www.carasycaretas.com.uy/cultura-y-espectaculos/cultura-y-espectaculos-chary-loquero-el-poeta-inesperado-n88237"],["Cofradía del Mar · Chary (2005)","http://cofradiadelmar.blogspot.com/2005/10/acerca-de-chary-cantante-de-loquero-o.html"],["Rapto · Refi (2026)","https://www.rapto.com.ar/musica/loquero-eterna-inocencia-mar-del-plata-chary-punk-hardcore-post-punk-yamandu"],["Rockaxis · 25 años después (2026)","https://www.rockaxis.com/rock/show/51692/loquero-25-anos-despues/"],["Parlante · Santiago (2026)","https://www.parlante.cl/?p=114507"],["La Izquierda Diario · Neuquén (2024)","https://www.laizquierdadiario.com/Loquero-se-sumo-al-grito-de-No-mas-presos-por-luchar"],["Wikipedia · Punk en Argentina","https://es.wikipedia.org/wiki/Punk_en_Argentina"],["Blog rocknargentina (2010)","https://rocknargentina.blogspot.com/2010/07/loquero.html"],["Blog cuandoyanadaimporte","https://cuandoyanadaimporte.wordpress.com/under/loquero/"],["LaCuerda · letras (transcripciones)","https://acordes.lacuerda.net/loquero/"],["Protickets · Neuquén 30/10","https://www.protickets.com.ar/event/loquero-25-anios-fantasy"]];
$("#srcs").innerHTML=SRC.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join("");

/* ======================= MONITOR: curva del tema ======================= */
const mon=(()=>{const c=$("#monCurva"),x=c.getContext("2d");let curve=null,prog=0,col="#2bff6a";
  function size(){const r=c.getBoundingClientRect();const d=devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d}
  function draw(){size();const W=c.width,H=c.height,d=devicePixelRatio||1;x.clearRect(0,0,W,H);
    let pts=curve;if(!pts||!pts.length){pts=[];for(let i=0;i<48;i++){const k=i%12;pts.push(k===5?40:k===6?92:k===7?18:k===8?44:30)}}
    const P=i=>[i/(pts.length-1)*W,H-8*d-(pts[i]/99)*(H-16*d)];
    x.lineWidth=2.2*d;x.lineJoin="round";
    // lo ya sonado, brillante; lo que falta, apagado
    const cut=Math.round(prog*(pts.length-1));
    for(const pass of [0,1]){x.beginPath();pts.forEach((_,i)=>{const [px,py]=P(i);i?x.lineTo(px,py):x.moveTo(px,py)});x.strokeStyle=pass?col:"rgba(43,255,106,.25)";x.shadowColor=col;x.shadowBlur=pass?8*d:0;
      if(pass){x.save();x.beginPath();x.rect(0,0,prog*W,H);x.clip();x.beginPath();pts.forEach((_,i)=>{const [px,py]=P(i);i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();x.restore()}else x.stroke()}
    x.shadowBlur=0;if(prog>0){x.fillStyle="#fff";x.fillRect(prog*W-1*d,0,2*d,H)}}
  addEventListener("resize",draw);
  return{set(cv,c2){curve=cv;col=c2||"#2bff6a";prog=0;draw()},prog(p){prog=p;draw()},draw}})();
mon.draw();

/* ======================= ELECTROCARDIOGRAMA FIJO ======================= */
let BPM=60;
(()=>{const c=$("#ecg"),x=c.getContext("2d");let W,H,d;const buf=[];let phase=0,last=performance.now();
  function rs(){d=devicePixelRatio||1;W=c.width=c.clientWidth*d;H=c.height=c.clientHeight*d;buf.length=0}
  rs();addEventListener("resize",rs);
  // forma PQRST normalizada en una fase 0..1
  const beat=p=>p<.08?Math.sin(p/.08*Math.PI)*.12:p<.14?0:p<.17?-.18:p<.21?1:p<.25?-.35:p<.32?0:p<.44?Math.sin((p-.32)/.12*Math.PI)*.22:0;
  (function f(t){const dt=Math.min(.05,(t-last)/1000);last=t;const speed=120*d;const n=Math.max(1,Math.round(speed*dt));
    for(let i=0;i<n;i++){phase+=BPM/60*dt/n;phase%=1;buf.push(beat(phase))}
    while(buf.length>W)buf.shift();
    x.clearRect(0,0,W,H);x.lineWidth=1.8*d;x.strokeStyle="#2bff6a";x.shadowColor="#2bff6a";x.shadowBlur=6*d;x.beginPath();
    const off=W-buf.length;buf.forEach((v,i)=>{const px=off+i,py=H*.62-v*H*.48;i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();
    if(buf.length){x.fillStyle="#d8ffe2";x.beginPath();x.arc(W-1,H*.62-buf[buf.length-1]*H*.48,2.2*d,0,7);x.fill()}
    if(!RM)requestAnimationFrame(f)})(performance.now());
})();
function setPulso(bpm,label){BPM=Math.max(40,Math.min(220,bpm||60));$("#ecgLec").textContent=`♥ ${Math.round(BPM)} · ${label}`}

/* ======================= RADIO / YOUTUBE API ======================= */
let YTP=null,idx=-1,apiReady=false,pending=null,tick=null,errSeg=0;
window.YTP=null;
const radioList=$("#radioList");
{let html="",k=0;RADIO.forEach(r=>{if(r.length===2)html+=`<h5><i style="--c:${r[1]}"></i>${r[0]}</h5>`;else{html+=`<button data-r="${k}"><span class="i">${String(k+1).padStart(3,"0")}</span><span>${r[1]}</span><span class="s">${r[2]}</span></button>`;k++}});radioList.innerHTML=html}
function loadAPI(){if(document.getElementById("ytapi"))return;const t=document.createElement("script");t.id="ytapi";t.src="https://www.youtube.com/iframe_api";document.head.appendChild(t)}
window.onYouTubeIframeAPIReady=()=>{YTP=new YT.Player("ytmini",{width:"128",height:"72",videoId:PL[0][0],playerVars:{autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1},events:{onReady:()=>{apiReady=true;window.YTP=YTP;if(pending!==null){const p=pending;pending=null;play(p)}},onStateChange:onState,onError:()=>{if(idx<0)return;errSeg++;if(errSeg<3)next();else{errSeg=0;$("#monEst").textContent="no se pudo reproducir";setPlayIcon(false)}}}})};
if("requestIdleCallback" in window)requestIdleCallback(loadAPI,{timeout:2500});else setTimeout(loadAPI,1500);
function play(i){idx=(i+PL.length)%PL.length;const t=PL[idx];$("#pT").textContent=t[1];$("#pA").textContent=t[2];$("#player").classList.add("show");
  const o=TRK[t[0]];$("#monTit").textContent=t[1];$("#monSub").textContent=t[2];
  if(o&&o.t[2]){$("#monBpm").textContent=o.t[2];$("#monKey").textContent=keyEs(o.t[3]);$("#monEn").textContent=Math.round(o.t[4]*100)+"%";mon.set(o.t[7],"#2bff6a")}
  else{$("#monBpm").textContent="—";$("#monKey").textContent="—";$("#monEn").textContent="—";mon.set(null)}
  $$("#radioList button").forEach(b=>b.classList.toggle("on",+b.dataset.r===idx));
  const b=radioList.querySelector(`button[data-r="${idx}"]`);if(b&&radioList.getBoundingClientRect().top<innerHeight&&radioList.getBoundingClientRect().bottom>0){const r=b.offsetTop-radioList.clientHeight/2;radioList.scrollTo({top:r,behavior:"smooth"})}
  if(!apiReady||!YTP||!YTP.loadVideoById){pending=idx;loadAPI();return}YTP.loadVideoById(t[0]);YTP.playVideo();setPlayIcon(true)}
function next(){play(idx+1)} function prev(){play(idx-1)}
function toggle(){if(idx<0){play(0);return}if(!YTP||!YTP.getPlayerState)return;const st=YTP.getPlayerState();if(st===1){YTP.pauseVideo()}else{YTP.playVideo()}}
function onState(e){const playing=e.data===1;if(playing)errSeg=0;setPlayIcon(playing);$("#monitorBox").classList.toggle("vivo",playing);$("#monEst").textContent=playing?"● en vivo":"en pausa";document.body.classList.toggle("is-playing",playing);
  const t=PL[idx],o=t&&TRK[t[0]];if(playing)setPulso(o&&o.t[2]?o.t[2]:128,t?t[1]:"");else setPulso(60,"reposo");
  if(e.data===0)next();clearInterval(tick);if(playing)tick=setInterval(()=>{try{const d=YTP.getDuration(),c=YTP.getCurrentTime();const p=d?c/d:0;$("#pBar").style.width=p*100+"%";mon.prog(p)}catch(_){}},500)}
function setPlayIcon(p){$("#pPlay").innerHTML=p?'<svg width="18" height="18" viewBox="0 0 10 10"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor"/></svg>':'<svg width="18" height="18" viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z" fill="currentColor"/></svg>'}
$("#pPlay").onclick=toggle;$("#pNext").onclick=next;$("#pPrev").onclick=prev;
$("#pClose").onclick=()=>{try{YTP&&YTP.pauseVideo()}catch(_){}$("#player").classList.remove("show")};
$("#pBarWrap").addEventListener("click",e=>{if(!YTP||!YTP.getDuration)return;const r=e.currentTarget.getBoundingClientRect();YTP.seekTo((e.clientX-r.left)/r.width*YTP.getDuration(),true)});
radioList.addEventListener("click",e=>{const b=e.target.closest("button");if(b)play(+b.dataset.r)});
document.addEventListener("click",e=>{const b=e.target.closest(".pl");if(b)play(+b.dataset.r)});
$$("[data-radio]").forEach(b=>b.addEventListener("click",()=>{const i=findPL(D.fan.tr[0][6]);play(i>=0?i:0);document.getElementById("monitor").scrollIntoView({behavior:RM?"auto":"smooth"})}));

/* ======================= ÉPOCAS ======================= */
const ERAS=[
 ["97","1997","Temor morboso","Fotocopia blanco y negro, logo gastado, un hombre en sombra.","#efede6","#0e0e0e","Rubik Dirt"],
 ["99","1999","Club de solos","La isla en un mar violeta y verde, letras huecas.","#6b4fd8","#ffffff","Audiowide"],
 ["01","2001","Fantasy","Cuatro siluetas de esténcil sobre gris.","#8a8a87","#ffffff","Archivo Black"],
 ["04","2004","Black","«LOQUE-RO» en fucsia, un sello chorreado.","#ffffff","#e6157e","Archivo Black"],
 ["11","2011","Radio Post Mortem","Negro total y un electrocardiograma verde.","#050605","#2bff6a","Space Mono"],
 ["26","hoy","Espíritu de 3 tonos","Verde, fucsia y amarillo, pincel seco y cintas.","#5dbb4f","#ff1f8f","Permanent Marker"]
];
$("#eras").innerHTML=ERAS.map(e=>`<button class="era" data-set-era="${e[0]}" style="--bg:${e[4]};--fg:${e[5]}"><span class="y">${e[1]}</span><h4 style="font-family:'${e[6]}'">${e[2]}</h4><p>${e[3]}</p></button>`).join("");
const eraNow=()=>document.documentElement.dataset.era||"26";
const logo=$("#logo");
function pintarLogo(){const e=eraNow();const txt=e==="04"?"LOQUE-RO":e==="11"?"LOQUERO_":"Loquero";logo.innerHTML=[...txt].map((c,i)=>`<span>${c}</span>`).join("");const ls=[...logo.children];if(e==="26"&&ls[3])ls[3].classList.add("tachada")}
const ERA_LAB=Object.fromEntries(ERAS.map(e=>[e[0],e[1]]));
let fondoColors=null;
function setEra(e,save=true){document.documentElement.dataset.era=e;$("#eraLab").textContent=ERA_LAB[e];$$("[data-set-era]").forEach(b=>b.classList.toggle("on",b.dataset.setEra===e));if(save)try{localStorage.setItem("loquero-era",e)}catch(_){}
  pintarLogo();$("#dial").style.transform=`rotate(${ERAS.findIndex(x=>x[0]===e)*60}deg)`;fondoColors&&fondoColors();costa();cruces();
  const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=css("--papel")}
$("#dialBtn").addEventListener("click",()=>{const i=ERAS.findIndex(x=>x[0]===eraNow());setEra(ERAS[(i+1)%ERAS.length][0])});
$("#eras").addEventListener("click",e=>{const b=e.target.closest("[data-set-era]");if(b)setEra(b.dataset.setEra)});

/* ======================= cruces sueltas (las «x» de las tapas) ======================= */
// solo en los márgenes, para no ensuciar el texto; en pantallas angostas no hay margen
function cruces(){const w=$("#cruces");const n=innerWidth<1100?0:14;let h="";for(let i=0;i<n;i++){const x=i%2?95+(i*1.7%3.5):(i*1.3%3.5)+.5,y=(i*37.3+13)%100;h+=`<i style="left:${x}%;top:${y}%;--s:${16+(i*7)%18}px;--r:${(i*29)%50-25}deg">x</i>`}w.innerHTML=h}

/* ======================= fondo: mar frío en semitono ======================= */
(()=>{const c=$("#fondo"),x=c.getContext("2d");let W,H,d,col="#151413",alpha=.13;
  function rs(){d=Math.min(devicePixelRatio||1,1.5);W=c.width=innerWidth*d;H=c.height=innerHeight*d}rs();addEventListener("resize",rs);
  fondoColors=()=>{col=css("--fondoMar")||"#151413";alpha=eraNow()==="11"?.22:.12};fondoColors();
  let mx=.5,my=.5;addEventListener("mousemove",e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight});
  const t0=performance.now();
  (function f(t){const tt=RM?0:(t-t0)/1000;x.clearRect(0,0,W,H);x.fillStyle=col;const step=14*d;const top=H*.5;const sc=Math.min(1,scrollY/(innerHeight*3));
    for(let y=top;y<H+step;y+=step){const k=(y-top)/(H-top);for(let xx=0;xx<W+step;xx+=step){
      const wave=Math.sin(xx/(140*d)+tt*.6+y/(60*d))*.5+Math.sin(xx/(53*d)-tt*.9)*.25+Math.sin((xx+y)/(90*d)+tt*.3)*.25;
      const near=Math.max(0,1-Math.hypot(xx/W-mx,(y/H-my)*.6)*3);
      const r=Math.max(0,(k*.9+wave*.35+near*.4)*step*.42*(1-sc*.5));
      if(r>.4){x.globalAlpha=alpha*(.4+k*.6);x.beginPath();x.arc(xx+(y/step%2)*step/2,y,r,0,6.283);x.fill()}}}
    x.globalAlpha=1;if(!RM)requestAnimationFrame(f)})(performance.now());
})();

/* ======================= la costa: Mar del Plata en fotocopia ======================= */
function costa(){const f=$("#costa");f.innerHTML="";const ink="var(--papel2)";const LN={stroke:"var(--tinta)","stroke-width":1.5,"stroke-linejoin":"round"};
  let p="M0 110 L0 92 ";
  // el puerto: grúas
  p+="L40 92 L40 70 L44 70 L44 92 L60 92 ";
  mk("path",{d:"M42 70 L42 44 L78 44 M42 50 L70 44 M76 44 L76 58",fill:"none",...LN},f);
  mk("path",{d:"M100 92 L100 52 M100 56 L132 56 M100 62 L126 56 M130 56 L130 70",fill:"none",...LN},f);
  // edificios
  let x=150;const alt=[34,52,28,61,44,38,57,30];alt.forEach((h,i)=>{const w=26+(i*13)%22;p+=`L${x} 92 L${x} ${92-h} L${x+w} ${92-h} L${x+w} 92 `;x+=w+4});
  // Casino y Hotel Provincial: dos bloques gemelos con mansardas
  [[420,88],[620,88]].forEach(([cx,w])=>{p+=`L${cx} 92 L${cx} 52 L${cx+8} 44 L${cx+w-8} 44 L${cx+w} 52 L${cx+w} 92 `});
  p+="L708 92 ";
  // la rambla con los lobos marinos en el medio
  mk("path",{d:"M520 92 L520 72 Q526 58 534 66 Q540 56 548 64 L552 92 M560 92 L560 74 Q566 60 574 68 Q580 58 588 66 L590 92",fill:ink,...LN},f);
  x=720;[48,30,66,40,54,36,70,44,30].forEach((h,i)=>{const w=22+(i*11)%26;p+=`L${x} 92 L${x} ${92-h} L${x+w} ${92-h} L${x+w} 92 `;x+=w+5});
  // Torreón del Monje sobre las rocas
  p+=`L1040 92 Q1060 80 1080 84 L1084 60 L1080 60 L1080 52 L1086 52 L1086 56 L1092 56 L1092 52 L1098 52 L1098 56 L1104 56 L1104 52 L1110 52 L1110 60 L1106 60 L1108 84 Q1130 82 1150 92 `;
  // costa y faro de Punta Mogotes
  p+="L1300 92 L1330 88 L1340 92 L1380 92 L1384 40 L1380 40 L1388 26 L1396 40 L1392 40 L1396 92 L1440 92 L1440 110 Z";
  mk("path",{d:p,fill:ink,...LN},f);
  mk("path",{d:"M1376 30 L1340 22 M1400 30 L1436 22",stroke:"var(--e3)","stroke-width":3,opacity:.8},f);
  // el mar
  let w="M0 100 ";for(let i=0;i<=1440;i+=20)w+=`Q${i+10} ${i%40?96:104} ${i+20} 100 `;mk("path",{d:w,fill:"none",stroke:"var(--tinta)","stroke-width":1.2,opacity:.6},f)}

/* ======================= negatoscopio y retrato ======================= */
(()=>{const pl=$("#placa");const ord=["fan","tem","cds","blk","rpm","fcp","e3t","her"];pl.innerHTML=ord.map((k,i)=>`<img src="${small(COV[k])}" alt="" class="${i?"":"on"}" loading="${i?"lazy":"eager"}">`).join("");let i=0;
  setInterval(()=>{const a=pl.children;a[i].classList.remove("on");i=(i+1)%a.length;a[i].classList.add("on");$("#negaCap").textContent=`${D[ord[i]].t} · ${D[ord[i]].y}`},4000)})();
(()=>{const st=$("#pstack");const k=["fan","fcp","ade","her","e3t"];const cap=["Fantasy · 2001 · Aku posó en la foto en lugar de su hermano, que no llegó","Fabulosos creadores de paranoia · 2017 · los cuatro, de saco y corbata","Adelanto · 2021 · dos reposeras en un bosque","Herencia · 2021 · espirales y cuadrados concéntricos","Espíritu de 3 tonos · 2024 · verde, fucsia y amarillo"];
  st.innerHTML=k.map((s,i)=>`<img src="${small(COV[s])}" alt="" class="${i?"":"on"}" loading="lazy">`).join("");let i=0;
  setInterval(()=>{const a=st.children;a[i].classList.remove("on");i=(i+1)%a.length;a[i].classList.add("on");$("#pcap").textContent=cap[i]},4400)})();

/* ======================= tilt 3D ======================= */
document.addEventListener("mousemove",e=>{const c=e.target.closest(".tilt");$$(".tilt").forEach(t=>{if(t!==c)t.style.transform=""});if(!c)return;const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`perspective(900px) rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg)`;c.style.setProperty("--gx",x*100+"%");c.style.setProperty("--gy",y*100+"%")});

/* ======================= cintas arrastrables ======================= */
$$(".cinta").forEach(st=>{let sx,sy,ox=0,oy=0,drag=false;
  st.addEventListener("pointerdown",e=>{drag=true;sx=e.clientX-ox;sy=e.clientY-oy;st.setPointerCapture(e.pointerId);st.style.zIndex=5});
  st.addEventListener("pointermove",e=>{if(!drag)return;ox=e.clientX-sx;oy=e.clientY-sy;st.style.translate=`${ox}px ${oy}px`});
  const up=()=>{drag=false};st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up)});

/* ======================= logo: letras que se tachan ======================= */
logo.addEventListener("click",e=>{const s=e.target.closest("span");if(s)s.classList.toggle("tachada")});

/* ======================= cursor «x» ======================= */
(()=>{if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;document.body.classList.add("cur");const c=$("#cursor");let x=0,y=0,tx=0,ty=0;
  addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY;c.classList.toggle("big",!!e.target.closest("a,button,.slide,.chip,.tilt,.node,.cinta,#logo"))});
  (function f(){x+=(tx-x)*.3;y+=(ty-y)*.3;c.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(f)})();
})();

/* ======================= gráficos anchos: se deslizan en el celular ======================= */
[["net",880],["map",360],["chEcg",760],["chDur",760],["chAnios",640],["chAvg",470],["chTot",470],["chScat",470],["chKey",470],["chSet",470],["chYt",470],["venn",620]].forEach(([id,mw])=>{const sv=$("#"+id);const w=document.createElement("div");w.className="desliza";w.style.setProperty("--mw",mw+"px");sv.parentNode.insertBefore(w,sv);w.appendChild(sv);const h=document.createElement("p");h.className="desliza-hint";h.textContent="← deslizá para ver todo →";w.after(h)});

// el diagrama de los dos universos arranca centrado cuando hay que deslizarlo
{const w=$("#venn").parentNode;requestAnimationFrame(()=>{w.scrollLeft=(w.scrollWidth-w.clientWidth)/2})}

/* ======================= instalar la app ======================= */
(()=>{const b=$("#instalar"),ios=$("#iosInst");let ev=null;
  const instalada=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
  const esIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  if(instalada)return;
  // Android y compu: el navegador avisa que se puede instalar y guardamos ese aviso para el botón
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();ev=e;b.hidden=false});
  addEventListener("appinstalled",()=>{b.hidden=true;ev=null});
  // iPhone: Safari no tiene aviso, así que el botón muestra los pasos
  if(esIOS)b.hidden=false;
  const cerrar=()=>{ios.hidden=true;b.focus()};
  b.addEventListener("click",async()=>{if(ev){ev.prompt();const r=await ev.userChoice;if(r.outcome==="accepted")b.hidden=true;ev=null}else if(esIOS){ios.hidden=false;$("#iosX").focus()}});
  $("#iosX").addEventListener("click",cerrar);ios.addEventListener("click",e=>{if(e.target===ios)cerrar()});
  addEventListener("keydown",e=>{if(e.key==="Escape"&&!ios.hidden)cerrar()});
})();

/* ======================= menú celular ======================= */
(()=>{const h=$("#hamb"),nav=$("#nav");const set=o=>{h.setAttribute("aria-expanded",o);nav.classList.toggle("abierto",o);h.setAttribute("aria-label",o?"Cerrar menú":"Abrir menú")};
  h.addEventListener("click",()=>set(h.getAttribute("aria-expanded")!=="true"));nav.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
  addEventListener("keydown",e=>{if(e.key==="Escape")set(false)})})();

/* ======================= scroll: reveal, contadores, nav ======================= */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.04});
$$(".reveal,.ev").forEach(r=>io.observe(r));
setTimeout(()=>$$("[data-count]").forEach(el=>{const to=+el.dataset.count;const t0=performance.now();(function st(t){const k=Math.min(1,(t-t0)/1800);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(st)})(t0)}),400);
const prog=$("#prog"),links=$$("#nav a");
addEventListener("scroll",()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";let cur="";$$("main section").forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+cur))},{passive:true});

/* marquee */
{const words=["Era un día perfecto","Atlántida","Ghost in the F.O.R.A.","Frío","Rusita","Esculturas","Ansiedad","Muchachos","Barrio niebla","Show Bizz","Check to Me","Cuidacoches","Isla","Corazón mojado","Youngs","Diábolo","Tulipán"];const h=words.map(w=>`<span>${w}</span><i>×</i>`).join("");$("#mq").innerHTML=h+h}

/* arranque */
setEra(eraNow(),false);
document.fonts.ready.then(pintarLogo);
