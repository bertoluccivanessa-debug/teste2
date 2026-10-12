/** Perfil local e opcionalmente pseudônimo: nunca transmitido a servidor. */
export const DOCTOR_PROFILE_KEY='immunoverse.doctor.v1';
let sessionName='';
export function normalizeDoctorName(value){
  return String(value??'').normalize('NFC').replace(/[<>\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,38);
}
export function doctorLabel(name){const clean=normalizeDoctorName(name);return clean?`Doutor ${clean}`:'Doutor';}
export function readDoctorProfile(store=typeof localStorage!=='undefined'?localStorage:null){
  try{const item=JSON.parse(store?.getItem(DOCTOR_PROFILE_KEY)||'null');return normalizeDoctorName(item?.name||sessionName);}catch{return sessionName;}
}
export function writeDoctorProfile(name,store=typeof localStorage!=='undefined'?localStorage:null){
  const safe=normalizeDoctorName(name);if(!safe)return false;
  sessionName=safe;try{store?.setItem(DOCTOR_PROFILE_KEY,JSON.stringify({version:1,name:safe}));}catch{}return true;
}
export const escapeDoctorHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
