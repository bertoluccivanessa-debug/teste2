/**
 * Morphology figures for the atlas.
 * Style direction: elegant scientific cartoon, consistent palette, soft shading.
 * All SVG pictures are schematic illustrations, not diagnostic photomicrographs.
 */
export const MORPHOLOGY=[
 {id:'erythrocyte',title:'Hemácia',label:'Disco bicôncavo',detail:'Célula anucleada com palidez central; a aparência depende do esfregaço e do contexto hematológico.',clinical:'A leitura de hemoglobina, VCM e padrões eritrocitários ajuda a separar deficiência nutricional, hemólise e inflamação. Uma morfologia aparentemente preservada não exclui doença sistêmica.',differential:'A hemácia normal preserva palidez central. Esferócitos e fragmentos alteram essa assinatura visual.'},
 {id:'neutrophil',title:'Neutrófilo segmentado',label:'Núcleo 3–5 lóbulos',detail:'Núcleo multilobulado, cromatina densa e granulação fina.',clinical:'Predomina em muitas respostas inflamatórias agudas. O raciocínio clínico precisa integrar contagem absoluta, desvio à esquerda e cenário infeccioso ou inflamatório.',differential:'Não confunda com eosinófilo: o neutrófilo tem grânulos discretos e núcleo geralmente mais segmentado.'},
 {id:'band',title:'Neutrófilo bastonete',label:'Núcleo em faixa',detail:'Núcleo contínuo, curvo, ainda sem segmentação evidente.',clinical:'Bastonetes ajudam a reconhecer desvio à esquerda e resposta medular a infecção ou estresse inflamatório.',differential:'Se houver segmentos nitidamente separados por pontes finas, a célula é segmentada, não bastonete.'},
 {id:'eosinophil',title:'Eosinófilo',label:'Núcleo bilobulado',detail:'Núcleo com dois lóbulos e granulação citoplasmática exuberante.',clinical:'A eosinofilia precisa ser articulada a alergia, helmintíase, DRESS, asma eosinofílica e doenças inflamatórias.',differential:'Granulação grosseira e intensa ajuda a separá-lo do neutrófilo.'},
 {id:'basophil',title:'Basófilo',label:'Grânulos azul-arroxeados',detail:'Grânulos escuros abundantes podem obscurecer o núcleo.',clinical:'É raro no sangue periférico, mas útil para discussões sobre mediadores inflamatórios e estados mieloproliferativos.',differential:'A granulação abundante o distingue de linfócitos e monócitos.'},
 {id:'lymphocyte',title:'Linfócito',label:'Alta relação núcleo/citoplasma',detail:'Na forma pequena típica, apresenta núcleo arredondado e citoplasma escasso.',clinical:'Linfócitos são centrais para imunidade adaptativa. Linfopenia, linfocitose e atipias precisam de correlação com contexto infeccioso ou imunológico.',differential:'Diferencia-se do monócito pelo menor tamanho, citoplasma escasso e cromatina mais densa.'},
 {id:'monocyte',title:'Monócito',label:'Núcleo reniforme',detail:'Núcleo irregular/reniforme, cromatina frouxa e citoplasma cinza-azulado.',clinical:'Participa de inflamação crônica, apresentação antigênica, reparo e diferenciação em macrófagos.',differential:'Tem mais citoplasma e contorno nuclear menos regular que o linfócito pequeno.'},
 {id:'spherocyte',title:'Esferócito',label:'Palidez central reduzida',detail:'Hemácia mais densa e arredondada, sem a palidez central típica.',clinical:'Pode surgir em hemólise imune ou esferocitose hereditária, sempre com correlação clínica e laboratorial.',differential:'Ao contrário da hemácia normal, parece mais compacta e hipercorada.'},
 {id:'schistocyte',title:'Esquizócito',label:'Fragmentação eritrocitária',detail:'Fragmento irregular de hemácia, geralmente angulado.',clinical:'Aponta para fragmentação mecânica ou microangiopática e exige atenção clínica imediata em certos contextos.',differential:'Não confunda com poiquilocitose inespecífica; o esquizócito tem contorno fragmentado.'},
 {id:'platelet',title:'Plaqueta',label:'Fragmento citoplasmático',detail:'Pequeno fragmento anucleado com grânulos arroxeados.',clinical:'Completa a leitura do hemograma e da hemostasia. Trombocitopenia e trombocitose alteram risco hemorrágico e trombótico.',differential:'É muito menor que hemácias e leucócitos e não possui núcleo.'},
];

const PALETTE={
 frame:'#d7e5ec',
 shadow:'#91a9b2',
 stain1:'#fbfdff',
 stain2:'#f2f6fb',
 cytoplasm:'#ecf0f6',
 lymph:'#c8c1dc',
 mono:'#c4d1d8',
 eos:'#f7d4be',
 baso:'#d9d0ef',
 neut:'#ece3eb',
 nucleus:'#65558c',
 nucleusDark:'#4e3f72',
 granuleNeut:'#c8aec4',
 granuleEos:'#e79061',
 granuleBaso:'#4d4f88',
 granuleMono:'#8d99aa',
 rbcOuter:'#d87d92',
 rbcMid:'#e89dad',
 rbcCore:'#f9d6dd',
 rbcEdge:'#b96376',
 platelet:'#735ea6',
 plateletLite:'#baaedc',
 accent:'#1ca79a',
 accentDark:'#136f78'
};

function frame(size, type){
  return `<defs>
    <radialGradient id="stain-${type}" cx="50%" cy="35%" r="75%">
      <stop offset="0" stop-color="${PALETTE.stain1}"/>
      <stop offset="0.72" stop-color="${PALETTE.stain2}"/>
      <stop offset="1" stop-color="#e2e7f0"/>
    </radialGradient>
    <filter id="softShadow-${type}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="${PALETTE.shadow}" flood-opacity=".24"/>
    </filter>
    <filter id="innerGlow-${type}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#ffffff" flood-opacity=".65"/>
    </filter>
  </defs>
  <circle r="64" fill="url(#stain-${type})" stroke="${PALETTE.frame}" stroke-width="1.5"/>
  <circle r="58" fill="none" stroke="#ffffff" stroke-opacity=".82" stroke-width="1.5"/>
  <circle r="54" fill="none" stroke="#e7eef5" stroke-width="1"/>`;
}

function rbc(sph=false){
  return `<g filter="url(#softShadow-${sph?'s':'n'})">
    <defs>
      <radialGradient id="rbcShade-${sph?'s':'n'}" cx="42%" cy="35%" r="70%">
        <stop offset="0" stop-color="${sph?PALETTE.rbcMid:PALETTE.rbcCore}"/>
        <stop offset="0.58" stop-color="${sph?PALETTE.rbcMid:PALETTE.rbcMid}"/>
        <stop offset="1" stop-color="${PALETTE.rbcOuter}"/>
      </radialGradient>
    </defs>
    <circle r="50" fill="url(#rbcShade-${sph?'s':'n'})" stroke="${PALETTE.rbcEdge}" stroke-width="3"/>
    <ellipse rx="31" ry="22" fill="${sph?PALETTE.rbcMid:'#fbe3e8'}" opacity=".92"/>
    <ellipse rx="19" ry="13" fill="${sph?PALETTE.rbcMid:'#fff4f6'}" opacity=".88"/>
    <ellipse cx="-14" cy="-16" rx="16" ry="6" transform="rotate(-22 -14 -16)" fill="#fff" opacity=".22"/>
  </g>`;
}

const nuclei={
 neutrophil:`<g fill="${PALETTE.nucleus}" stroke="${PALETTE.nucleusDark}" stroke-width="3.2"><ellipse cx="-24" cy="-18" rx="16" ry="24" transform="rotate(-27 -24 -18)"/><ellipse cx="7" cy="-25" rx="18" ry="23" transform="rotate(15 7 -25)"/><ellipse cx="27" cy="6" rx="18" ry="21" transform="rotate(44 27 6)"/><ellipse cx="-15" cy="27" rx="18" ry="20" transform="rotate(42 -15 27)"/></g><g fill="none" stroke="#6f5a98" stroke-width="7"><path d="M-16 -9L0 -18M18 -10L25 -1M14 21L-2 26"/></g>`,
 band:`<path d="M-29 -14Q-40 27 -4 35Q37 40 38 -8Q38 -32 16 -35Q4 -31 10 -17Q20 2 9 12Q-11 31 -18 8Q-22 -2 -17 -15Z" fill="${PALETTE.nucleus}" stroke="${PALETTE.nucleusDark}" stroke-width="3.2"/>`,
 eosinophil:`<ellipse cx="-16" cy="-5" rx="18" ry="30" transform="rotate(-20 -16 -5)" fill="#7b5b94" stroke="${PALETTE.nucleusDark}" stroke-width="2.6"/><ellipse cx="20" cy="-2" rx="20" ry="26" transform="rotate(23 20 -2)" fill="#7b5b94" stroke="${PALETTE.nucleusDark}" stroke-width="2.6"/>`,
 basophil:`<path d="M-19 -29Q8 -49 28 -17Q42 16 10 31Q-28 39 -32 6Z" fill="${PALETTE.nucleus}" opacity=".72"/>`,
 lymphocyte:`<circle r="39" fill="#665793" stroke="${PALETTE.nucleusDark}" stroke-width="3"/><circle cx="-10" cy="-8" r="11" fill="#9c8cbd" opacity=".34"/>`,
 monocyte:`<path d="M-30 -24Q-4 -43 29 -17Q40 -2 24 9Q9 19 -10 3Q-27 -2 -26 23Q-2 40 17 25Q-11 53 -35 21Q-50 -8 -30 -24Z" fill="#78688e" stroke="#61517b" stroke-width="3"/>`,
};

function granules(type){
  const counts={eosinophil:34,basophil:40,neutrophil:28,band:18,monocyte:10};
  const radii={eosinophil:3.2,basophil:4.8,neutrophil:2.5,band:2.4,monocyte:2.6};
  const colors={
    eosinophil:PALETTE.granuleEos,
    basophil:PALETTE.granuleBaso,
    monocyte:PALETTE.granuleMono,
    neutrophil:PALETTE.granuleNeut,
    band:PALETTE.granuleNeut,
  };
  let out='';
  const n=counts[type]||0;
  for(let i=0;i<n;i++){
    const angle=i*2.39996;
    const rad=12+(i%6)*6;
    const x=Math.round(Math.cos(angle)*rad), y=Math.round(Math.sin(angle)*rad);
    out+=`<circle cx="${x}" cy="${y}" r="${radii[type]}" fill="${colors[type]}" opacity=".84"/>`;
  }
  return out;
}

function leukocyteBody(type){
  const fills={
    lymphocyte:PALETTE.lymph,
    monocyte:PALETTE.mono,
    eosinophil:PALETTE.eos,
    basophil:PALETTE.baso,
    neutrophil:PALETTE.neut,
    band:PALETTE.neut,
  };
  return `<g filter="url(#softShadow-${type})"><circle r="50.5" fill="${fills[type]||PALETTE.cytoplasm}" stroke="#b2b7cb" stroke-width="3"/>${granules(type)}${nuclei[type]||''}<ellipse cx="-18" cy="-26" rx="16" ry="6" transform="rotate(-22 -18 -26)" fill="#fff" opacity=".18"/></g>`;
}

function schistocyte(){
  return `<g filter="url(#softShadow-schistocyte)"><path d="M-49 -7Q-20 -20 -15 -48L19 -17Q38 -9 43 11L7 17L-16 43Q-27 18 -49 -7Z" fill="#da8e9f" stroke="#b96376" stroke-width="3"/><path d="M-27 -5L7 -3" stroke="#f7c3cd" stroke-width="7" opacity=".75"/><ellipse cx="-10" cy="-18" rx="12" ry="5" transform="rotate(-20 -10 -18)" fill="#fff" opacity=".18"/></g>`;
}

function platelet(){
  return `<g filter="url(#softShadow-platelet)"><g fill="${PALETTE.platelet}"><circle r="19"/><circle cx="-12" cy="-10" r="9"/><circle cx="14" cy="-7" r="8"/><circle cx="5" cy="15" r="9"/></g><g fill="${PALETTE.plateletLite}"><circle cx="-7" cy="-9" r="3.2"/><circle cx="11" cy="4" r="3.2"/><circle cx="4" cy="13" r="2.4"/></g></g>`;
}

export function cellSVG(type,size=136){
  let body='';
  if(type==='erythrocyte'||type==='spherocyte') body=rbc(type==='spherocyte');
  else if(type==='schistocyte') body=schistocyte();
  else if(type==='platelet') body=platelet();
  else body=leukocyteBody(type);
  const title=MORPHOLOGY.find(c=>c.id===type)?.title||type;
  return `<svg width="${size}" height="${size}" viewBox="-66 -66 132 132" role="img" aria-label="Ilustração esquemática: ${title}">${frame(size,type)}${body}</svg>`;
}
