const LOGO='img/logo2.png';
		let currentRole='usuario';
		// Email del usuario con sesión iniciada. Permite resolver permisos individuales
		// (overrides) por persona, no sólo por rol. Se setea en doLogin().
		let currentUserEmail=null;
		const roles={
		  usuario:{label:'Usuario',av:'LM',name:'Lucía Maffei',color:'#1A4FAD'},
		  tecnico:{label:'Técnico',av:'TC',name:'Técnico Común',color:'#0F6E56'},
		  lider_tecnico:{label:'Líder Técnico',av:'SH',name:'Silvana Herrero',color:'#0A5A8A'},
		  admin:{label:'Administrador',av:'LS',name:'Luis Sánchez',color:'#7C3A00'},
		};
		const tickets=[
		  {id:'TK-0043',titulo:'PC no enciende — Puesto 3, Planta Baja',cat:'Hardware',estado:'progreso',prio:'alta',tecnico:'S. Herrero',fecha:'25/04/2026',solicitante:'Lucía Maffei',desc:'El equipo del puesto 3 no enciende desde esta mañana. Ninguna respuesta al presionar encendido.'},
		  {id:'TK-0044',titulo:'Sin acceso a carpeta compartida de administración',cat:'Accesos',estado:'abierto',prio:'media',tecnico:'—',fecha:'25/04/2026',solicitante:'Lucía Maffei',desc:'No puedo acceder a la carpeta Z: desde ayer. El resto del equipo sí puede.'},
		  {id:'TK-0045',titulo:'Impresora HP no reconocida en red',cat:'Periféricos',estado:'resuelto',prio:'baja',tecnico:'J. Perez',fecha:'24/04/2026',solicitante:'Lucía Maffei',desc:'La impresora del piso 2 no aparece en la lista de dispositivos.'},
		  {id:'TK-0046',titulo:'Lentitud extrema en conexión de red — sede productiva',cat:'Redes',estado:'pendiente',prio:'alta',tecnico:'S. Herrero',fecha:'24/04/2026',solicitante:'Javier Sosa',desc:'La red está muy lenta desde las 14hs. Afecta a toda la planta.'},
		  {id:'TK-0047',titulo:'Actualización de sistema pendiente',cat:'Software',estado:'derivado',prio:'baja',tecnico:'J. Perez',fecha:'23/04/2026',solicitante:'Martina Flores',desc:'El sistema pide actualizar pero da error al intentarlo.'},
		  {id:'TK-0048',titulo:'Correo corporativo no sincroniza en Outlook',cat:'Software',estado:'abierto',prio:'media',tecnico:'—',fecha:'23/04/2026',solicitante:'Roberto Suárez',desc:'El correo no llega al cliente de Outlook, pero sí en webmail.'},
		  {id:'TK-0049',titulo:'Notebook se reinicia sola durante videollamadas',cat:'Hardware',estado:'progreso',prio:'alta',tecnico:'T. Común',fecha:'26/04/2026',solicitante:'Martina Flores',desc:'La notebook se reinicia de forma inesperada cuando se usa Teams o Zoom por más de 15 minutos.'},
		  {id:'TK-0050',titulo:'Solicitud de instalación de software de diseño',cat:'Software',estado:'pendiente',prio:'media',tecnico:'M. Díaz',fecha:'26/04/2026',solicitante:'Carlos Vega',desc:'Se necesita instalar Adobe Acrobat Pro en el equipo del área de calidad para firmar documentos.'},
		  {id:'TK-0051',titulo:'Teclado no responde correctamente',cat:'Periféricos',estado:'progreso',prio:'baja',tecnico:'V. Ruiz',fecha:'25/04/2026',solicitante:'Ana Torres',desc:'Algunas teclas del teclado no responden de forma consistente, hay que presionar varias veces.'},
		  {id:'TK-0052',titulo:'Acceso VPN intermitente desde planta 2',cat:'Redes',estado:'resuelto',prio:'media',tecnico:'F. Lema',fecha:'24/04/2026',solicitante:'Lucía Maffei',desc:'La conexión VPN se cae cada 20 minutos aproximadamente al trabajar desde planta 2.'},
		  {id:'TK-0053',titulo:'Restablecer permisos de carpeta de RRHH',cat:'Accesos',estado:'progreso',prio:'alta',tecnico:'T. Común',fecha:'24/04/2026',solicitante:'Patricia Nieto',desc:'Tras una migración de servidor, varios usuarios perdieron el acceso de escritura a la carpeta compartida de RRHH.'},
		  // ===== Tickets de prueba: asignados a Técnico Común =====
		  {id:'TK-0054',titulo:'Pantalla con líneas verticales en monitor secundario',cat:'Hardware',estado:'progreso',prio:'media',tecnico:'M. Díaz',fecha:'27/04/2026',solicitante:'Diego Romero',desc:'El segundo monitor del puesto de diseño muestra líneas verticales de colores desde esta mañana.'},
		  {id:'TK-0055',titulo:'Solicitud de mouse inalámbrico de repuesto',cat:'Periféricos',estado:'pendiente',prio:'baja',tecnico:'V. Ruiz',fecha:'27/04/2026',solicitante:'Valeria Cruz',desc:'El mouse actual dejó de responder correctamente. Se solicita reemplazo cuando haya stock disponible.'},
		  {id:'TK-0056',titulo:'Error al abrir archivos PDF desde el sistema de gestión',cat:'Software',estado:'progreso',prio:'media',tecnico:'V. Ruiz',fecha:'26/04/2026',solicitante:'Fernando Ibáñez',desc:'Al intentar abrir comprobantes en PDF desde el ERP, aparece un error de "visor no disponible".'},
		  {id:'TK-0057',titulo:'Configuración de impresora de etiquetas en depósito',cat:'Periféricos',estado:'resuelto',prio:'baja',tecnico:'M. Díaz',fecha:'25/04/2026',solicitante:'Marcelo Ríos',desc:'Se instaló y configuró la impresora de etiquetas Zebra en el puesto de despacho del depósito.'},
		  {id:'TK-0058',titulo:'Cambio de contraseña de red bloqueada',cat:'Accesos',estado:'cerrado',prio:'alta',tecnico:'V. Ruiz',fecha:'23/04/2026',solicitante:'Graciela Molina',desc:'Usuario bloqueado por intentos fallidos de inicio de sesión. Se restableció la contraseña y se desbloqueó la cuenta.'},
		  // ===== Tickets de prueba: sin asignar, disponibles para tomar =====
		  {id:'TK-0059',titulo:'No se puede conectar al servidor de impresión',cat:'Redes',estado:'abierto',prio:'media',tecnico:'—',fecha:'27/04/2026',solicitante:'Héctor Campos',desc:'Varios equipos del sector administrativo no logran conectarse al servidor de impresión desde ayer.'},
		  {id:'TK-0060',titulo:'Solicitud de alta de usuario nuevo empleado',cat:'Accesos',estado:'abierto',prio:'media',tecnico:'—',fecha:'27/04/2026',solicitante:'Sandra Quiroga',desc:'Se incorpora un nuevo empleado el lunes. Se necesita crear su usuario de red, correo y accesos básicos.'},
		  {id:'TK-0061',titulo:'Pantalla azul intermitente en PC de recepción',cat:'Hardware',estado:'abierto',prio:'alta',tecnico:'—',fecha:'27/04/2026',solicitante:'Ramón Estrada',desc:'La PC de recepción muestra pantalla azul y se reinicia sola varias veces al día.'},
		  {id:'TK-0062',titulo:'Instalación de actualización de antivirus pendiente en 10 equipos',cat:'Software',estado:'abierto',prio:'baja',tecnico:'—',fecha:'26/04/2026',solicitante:'Beatriz Salinas',desc:'Hay 10 equipos del sector ventas con la actualización de antivirus pendiente desde la semana pasada.'},
		  {id:'TK-0063',titulo:'Escáner de código de barras no detectado',cat:'Periféricos',estado:'abierto',prio:'media',tecnico:'—',fecha:'26/04/2026',solicitante:'Nicolás Ponce',desc:'El escáner de código de barras del mostrador dejó de ser reconocido por el sistema de ventas.'},
		  {id:'TK-0064',titulo:'Monitor no enciende al inicio de sesión',cat:'Hardware',estado:'progreso',prio:'media',tecnico:'T. Común',fecha:'13/06/2026',solicitante:'Laura Aguirre',desc:'El monitor del puesto 7, sector contabilidad, no enciende al arrancar la PC. El equipo sí inicia correctamente (se escucha el arranque), pero la pantalla permanece en negro.'},
		  {id:'TK-0065',titulo:'Teclado y mouse no responden tras actualización de Windows',cat:'Software',estado:'progreso',prio:'alta',tecnico:'T. Común',fecha:'13/06/2026',solicitante:'Roberto Suárez',desc:'Después de una actualización automática de Windows 11 aplicada anoche, el teclado y el mouse del puesto 12 (sector ventas) dejaron de responder al iniciar sesión. El equipo arranca pero queda bloqueado en la pantalla de inicio.'},
		  {id:'TK-0066',titulo:'Error de certificado SSL en sistema de facturación',cat:'Software',estado:'abierto',prio:'alta',tecnico:'T. Común',fecha:'13/06/2026',solicitante:'Sandra Quiroga',nuevo:true,desc:'Al intentar ingresar al sistema de facturación desde cualquier equipo de la red, aparece un error de certificado SSL vencido. Ningún usuario del área puede acceder al sistema desde esta mañana.'},
		  {id:'TK-0067',titulo:'Falla de impresión en sector de logística',cat:'Periféricos',estado:'progreso',prio:'media',tecnico:'M. Díaz',fecha:'17/06/2026',solicitante:'Diego Romero',desc:'La impresora del sector de logística imprime con manchas y rayas horizontales en todas las hojas.'},
		  {id:'TK-0068',titulo:'Solicitud de cambio de equipo por bajo rendimiento',cat:'Hardware',estado:'abierto',prio:'baja',tecnico:'M. Díaz',fecha:'18/06/2026',solicitante:'Patricia Nieto',desc:'El equipo del puesto de compras quedó muy lento tras la última actualización y dificulta el trabajo diario.'},
		];
// ===== Calificaciones de servicio =====
const calificaciones=[];
let ratingTicketId=null;
let ratingSelected=0;

// ===== Mensajes de usuarios en tickets =====
// Cada mensaje: {id, ticketId, autor, fecha, hora, texto, leido}
const mensajes=[
  {id:'msg-001',ticketId:'TK-0044',autor:'Lucía Maffei',fecha:'25/04/2026',hora:'10:14',texto:'Buen día, quería avisar que el problema sigue igual. Todavía no puedo acceder a la carpeta Z: y ya perdí toda la mañana sin poder trabajar. ¿Hay alguna novedad?',leido:false},
  {id:'msg-002',ticketId:'TK-0044',autor:'Lucía Maffei',fecha:'25/04/2026',hora:'15:42',texto:'Sigo sin acceso. El resto del equipo ya pudo, solo yo sigo bloqueada. ¿Pueden priorizarlo por favor?',leido:false},
  {id:'msg-003',ticketId:'TK-0046',autor:'Javier Sosa',fecha:'24/04/2026',hora:'16:05',texto:'La lentitud empeoró después de las 15hs. Ya afecta también al sistema de gestión y no podemos cargar los remitos del cierre de jornada.',leido:false},
  {id:'msg-004',ticketId:'TK-0049',autor:'Martina Flores',fecha:'26/04/2026',hora:'11:23',texto:'Hola, quería confirmar que el problema sigue ocurriendo. Hoy se reinició dos veces en la misma videollamada. ¿Hay alguna actualización?',leido:false},
  {id:'msg-005',ticketId:'TK-0065',autor:'Roberto Suárez',fecha:'13/06/2026',hora:'08:47',texto:'Buenos días, el equipo sigue sin responder. Probé desenchufar y volver a conectar el teclado y el mouse pero nada. No puedo trabajar.',leido:false},
  {id:'msg-006',ticketId:'TK-0065',autor:'Roberto Suárez',fecha:'13/06/2026',hora:'10:15',texto:'Acabo de probar con otro teclado USB y tampoco funciona, así que no es el hardware. Creo que es algo del driver o de la actualización.',leido:false},
  {id:'msg-007',ticketId:'TK-0065',autor:'Roberto Suárez',fecha:'13/06/2026',hora:'11:52',texto:'Ya son casi 4 horas sin poder usar el equipo. ¿Hay alguna estimación de cuándo pueden venir? Tengo un cierre de mes para entregar hoy.',leido:false},
  {id:'msg-008',ticketId:'TK-0066',autor:'Silvana Herrero',rol:'lider_tecnico',fecha:'18/06/2026',hora:'09:10',texto:'Equipo, este caso es prioritario: afecta a toda el área de facturación y no pueden operar. Por favor escalarlo y avisarme apenas tengan un diagnóstico. Quedo atenta.',leido:false},
];
const STORAGE_KEY_MENSAJES='guita_mensajes_v2';
const STORAGE_KEY_MSG_SEED='guita_mensajes_seed_v2';

// ===== DARK MODE =====
function isDark(){return!document.body.classList.contains('light');}
function toggleDarkMode(){
  const nowLight=document.body.classList.toggle('light');
  const btn=document.getElementById('btn-darkmode');
  if(btn)btn.textContent=nowLight?'🌙':'☀️';
  try{localStorage.setItem('guita_darkmode',nowLight?'0':'1');}catch(e){}
  if(typeof currentView!=='undefined'&&currentView)renderView(currentView);
}
function initDarkMode(){
  // Dark is default; only switch to light if explicitly saved
  try{
    const saved=localStorage.getItem('guita_darkmode');
    if(saved==='0'){
      document.body.classList.add('light');
      const btn=document.getElementById('btn-darkmode');
      if(btn)btn.textContent='🌙';
    } else {
      const btn=document.getElementById('btn-darkmode');
      if(btn)btn.textContent='☀️';
    }
  }catch(e){}
}
document.addEventListener('DOMContentLoaded',initDarkMode);

function loadMensajes(){
  // Prototipo: los mensajes seed siempre arrancan como no leídos al abrir el archivo.
  mensajes.forEach(m=>{ m.leido=false; });
}
function saveMensajes(){
  try{localStorage.setItem(STORAGE_KEY_MENSAJES,JSON.stringify(mensajes));}
  catch(e){console.warn('No se pudieron guardar los mensajes:',e);}
}
// ===== Hilo de comentarios por ticket =====
// La conversación de cada caso vive ahora DENTRO del objeto del ticket, en t.comentarios.
// Cada comentario: {id, autor, rol, fecha, hora, texto, leido, interno?, seed?}
//   - rol: 'usuario' | 'tecnico' | 'lider_tecnico' | 'admin' (define el lado/estilo y el "no leído")
//   - interno: true = nota privada del equipo técnico (no visible para el usuario)
//   - leido: solo se usa para la bandeja del técnico (cuentan como nuevos los del rol 'usuario')
//   - seed: marca los comentarios de ejemplo migrados desde el array `mensajes` original

function esSoporte(){
  return currentRole==='tecnico'||currentRole==='lider_tecnico';
}
function puedeVerNotasInternas(){
  return (esSoporte()||currentRole==='admin')&&puede('ver_notas_internas');
}
function comentariosVisibles(comentarios){
  const lista=comentarios||[];
  if(puedeVerNotasInternas())return lista;
  return lista.filter(c=>!c.interno);
}

// Migra los mensajes de ejemplo hacia el hilo de cada ticket (una sola vez por ticket).
function migrarComentarios(){
  let changed=false;
  tickets.forEach(t=>{
    if(!Array.isArray(t.comentarios)){
      t.comentarios=mensajes
        .filter(m=>m.ticketId===t.id)
        .map(m=>({id:m.id,autor:m.autor,rol:m.rol||'usuario',fecha:m.fecha,hora:m.hora,texto:m.texto,leido:false,interno:false,seed:true}));
      changed=true;
    }
  });
  if(changed)saveTickets();
}
function agregarNotasInternasEjemplo(){
  const t=tickets.find(x=>x.id==='TK-0049');
  if(!t)return;
  if(!Array.isArray(t.comentarios))t.comentarios=[];
  if(t.comentarios.some(c=>c.id==='cmt-interno-seed'))return;
  t.comentarios.push({
    id:'cmt-interno-seed',
    autor:'Técnico Común',
    rol:'tecnico',
    fecha:'26/04/2026',
    hora:'12:05',
    texto:'Revisé logs de energía: parece problema de sobrecalentamiento. Pedí reemplazo de pasta térmica al depósito.',
    leido:true,
    interno:true,
    seed:true
  });
  saveTickets();
}
// Prototipo: los comentarios de ejemplo (seed) siempre arrancan como "no leídos" al cargar,
// para que el técnico vea las alertas de mensajes nuevos al iniciar sesión.
function resetSeedComentarios(){
  tickets.forEach(t=>{ (t.comentarios||[]).forEach(c=>{ if(c.seed)c.leido=false; }); });
}
// Roles habilitados para escribir en el hilo (usuarios y soporte técnico).
function puedeComentar(){
  return puede('comentar');
}
// Construye las <option> del selector de estado según los permisos vigentes del rol activo.
function estadoOptionsHTML(t,opts){
  opts=opts||{};
  const lista=[];
  if(opts.includeAbierto) lista.push(['abierto','Abierto']);
  lista.push(['progreso','En progreso']);
  lista.push(['pendiente','Pendiente'+(opts.pendienteLargo?' cliente':'')]);
  if(puede('reasignar_derivar')) lista.push(['derivado',opts.derivadoLargo?'Derivado / Escalado':'Derivado']);
  if(puede('marcar_resuelto_cerrado')) lista.push(['resuelto','Resuelto']);
  if(opts.includeCerrado&&puedeTotal('marcar_resuelto_cerrado')) lista.push(['cerrado','Cerrado']);
  return lista.map(([v,l])=>`<option value="${v}" ${t.estado===v?'selected':''}>${l}</option>`).join('');
}
// Escape básico para insertar texto del usuario en el HTML sin romper el render.
function escapeHtml(s){
  return String(s==null?'':s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
const sortById=arr=>[...arr].sort((a,b)=>parseInt((a.id||'').replace(/\D/g,''),10)-parseInt((b.id||'').replace(/\D/g,''),10));
// Devuelve los comentarios no leídos — solo para el rol técnico común
function mensajesNoLeidos(){
  if(currentRole!=='tecnico')return[];
  const miNombre=tecnicoActualNombre();
  const out=[];
  tickets.forEach(t=>{
    if(t.tecnico!==miNombre)return;
    (t.comentarios||[]).forEach(c=>{ if(!c.leido&&c.rol==='usuario')out.push(c); });
  });
  return out;
}
// Devuelve los tickets con comentarios no leídos del rol usuario,
// visibles para el líder técnico (asignados a él o sin asignar).
function mensajesNoLeidosLider(){
  if(currentRole!=='lider_tecnico')return[];
  const miNombre=tecnicoActualNombre();
  return tickets.filter(t=>{
    const esLider=t.tecnico===miNombre;
    const esSinAsignar=t.tecnico==='—';
    if(!esLider&&!esSinAsignar)return false;
    return (t.comentarios||[]).some(c=>!c.leido&&c.rol==='usuario');
  });
}
// Marca como leídos todos los comentarios de un ticket dado
function marcarMensajesLeidos(ticketId){
  const t=tickets.find(x=>x.id===ticketId); if(!t||!Array.isArray(t.comentarios))return;
  let changed=false;
  t.comentarios.forEach(c=>{ if(!c.leido){c.leido=true;changed=true;} });
  if(changed)saveTickets();
}
// Render de un comentario individual del hilo (estilo foro, diferenciando cliente / soporte / nota interna).
function comentarioHTML(c){
  const esCliente=c.rol==='usuario';
  const esInterno=!!c.interno;
  const roleLabel=esInterno?'Nota interna':c.rol==='usuario'?'Usuario':c.rol==='tecnico'?'Técnico':c.rol==='lider_tecnico'?'Líder Técnico':c.rol==='admin'?'Administrador':'Sistema';
  const dk=isDark();
  const accent=esInterno?'#7C3AED':esCliente?'#2B78E4':'#0F6E56';
  const chipBg=dk?(esInterno?'#2A1F45':esCliente?'#16314F':'#123528')
                :(esInterno?'#E8D5F5':esCliente?'#E8EEF9':'#E3F4EE');
  const chipFg=dk?(esInterno?'#C3A0F2':esCliente?'#8FB6EA':'#6FD3A6')
                :(esInterno?'#5B2A8C':esCliente?'#1A4FAD':'#0F6E56');
  const bg=dk?(esInterno?'#211B30':'#1C2333')
            :(esInterno?'#F8F5FF':'#FAFBFD');
  const inicial=escapeHtml((c.autor||'?').trim().charAt(0).toUpperCase());
  const head=`<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px;flex-wrap:wrap">
      <div style="width:22px;height:22px;border-radius:50%;background:${accent};color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0">${inicial}</div>
      <span class="text-primary" style="font-size:12px;font-weight:600">${escapeHtml(c.autor)}</span>
      <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;background:${chipBg};color:${chipFg};padding:1px 7px;border-radius:10px">${esInterno?'🔒 ':''}${roleLabel}</span>
      <span class="text-secondary" style="font-size:11px;margin-left:auto">${c.fecha} ${c.hora}</span>
    </div>`;
  const body=`<div class="tl-text" style="white-space:pre-wrap">${escapeHtml(c.texto)}</div>`;
  return `<div style="border-left:2.5px solid ${accent};background:${bg};border-radius:0 8px 8px 0;padding:9px 12px;margin-bottom:9px">${head}${body}</div>`;
}

// ===== Alertas del sistema dirigidas a técnicos (persistencia en localStorage) =====
// Cada alerta: {id, tecnico, ticketId, evento, fecha, hora, leido, seed?}
const alertasTecnico=[
  {id:'alert-seed-1',tecnico:'T. Común',ticketId:'TK-0065',evento:'Nuevo mensaje público del usuario en el ticket.',fecha:'13/06/2026',hora:'11:52',leido:false,seed:true},
  {id:'alert-seed-2',tecnico:'T. Común',ticketId:'TK-0066',evento:'Ticket asignado por el Líder Técnico.',fecha:'13/06/2026',hora:'08:30',leido:false,seed:true},
  {id:'alert-seed-3',tecnico:'S. Herrero',ticketId:'TK-0046',evento:'Nuevo mensaje público del usuario en el ticket.',fecha:'24/04/2026',hora:'16:05',leido:false,seed:true},
];
// ===== Alertas para el usuario (mensajes del técnico + tickets a validar) =====
const alertasUsuario=[
  {id:'alerta-usr-001',ticketId:'TK-0043',tipo:'mensaje',evento:'El técnico respondió en tu ticket: PC no enciende — Puesto 3.',fecha:'26/04/2026',hora:'09:15',leido:false,seed:true},
  {id:'alerta-usr-002',ticketId:'TK-0045',tipo:'validar',evento:'Tu ticket fue marcado como resuelto. ¿Podés confirmar que el problema está solucionado?',fecha:'24/04/2026',hora:'14:30',leido:false,seed:true},
  {id:'alerta-usr-003',ticketId:'TK-0052',tipo:'validar',evento:'Tu ticket fue marcado como resuelto. ¿Podés confirmar que el problema está solucionado?',fecha:'24/04/2026',hora:'16:00',leido:false,seed:true},
];
const STORAGE_KEY_ALERTAS='guita_alertas_v1';
const STORAGE_KEY_ALERTAS_USR='guita_alertas_usr_v1';
function loadAlertas(){
  try{
    const saved=localStorage.getItem(STORAGE_KEY_ALERTAS);
    if(saved){
      const parsed=JSON.parse(saved);
      if(Array.isArray(parsed)){
        alertasTecnico.length=0;
        parsed.forEach(a=>alertasTecnico.push(a));
        return;
      }
    }
    saveAlertas();
  }catch(e){console.warn('No se pudieron cargar las alertas:',e);}
}
function saveAlertas(){
  try{localStorage.setItem(STORAGE_KEY_ALERTAS,JSON.stringify(alertasTecnico));}
  catch(e){console.warn('No se pudieron guardar las alertas:',e);}
}
function resetSeedAlertas(){
  alertasTecnico.forEach(a=>{ if(a.seed)a.leido=false; });
  alertasUsuario.forEach(a=>{ if(a.seed)a.leido=false; });
}
function saveAlertasUsuario(){
  try{localStorage.setItem(STORAGE_KEY_ALERTAS_USR,JSON.stringify(alertasUsuario));}
  catch(e){}
}
function registrarAlertaUsuario(ticketId,tipo,evento){
  const ahora=new Date();
  alertasUsuario.unshift({
    id:'alerta-usr-'+Date.now(),
    ticketId,tipo,evento,
    fecha:ahora.toLocaleDateString('es-AR'),
    hora:ahora.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'}),
    leido:false
  });
  saveAlertasUsuario();
  updateNotifBell();
}
function nombreCortoTecnico(nombre){
  if(!nombre||nombre==='—')return '—';
  const parts=nombre.trim().split(/\s+/);
  if(parts.length<2)return nombre;
  return parts[0][0]+'. '+parts.slice(1).join(' ');
}
function registrarAlerta(tecnico,ticketId,evento){
  if(!tecnico||tecnico==='—'||!ticketId||!evento)return;
  const ahora=new Date();
  alertasTecnico.unshift({
    id:'alert-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),
    tecnico,
    ticketId,
    evento,
    fecha:ahora.toLocaleDateString('es-AR'),
    hora:ahora.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'}),
    leido:false
  });
  saveAlertas();
  updateNotifBell();
}
function alertasParaTecnico(nombre){
  return alertasTecnico.filter(a=>a.tecnico===nombre);
}
function alertasNoLeidasCount(nombre){
  return alertasParaTecnico(nombre).filter(a=>!a.leido).length;
}
function marcarAlertasLeidasTicket(ticketId,tecnico){
  let changed=false;
  alertasTecnico.forEach(a=>{
    if(a.ticketId===ticketId&&a.tecnico===tecnico&&!a.leido){a.leido=true;changed=true;}
  });
  if(changed){saveAlertas();updateNotifBell();}
}
function abrirDesdeAlerta(alertaId,ticketId){
  const a=alertasTecnico.find(x=>x.id===alertaId);
  if(a){a.leido=true;saveAlertas();}
  updateNotifBell();
  openTicket(ticketId);
}
function alertasRegistroHTML(){return'';}

// ===== Notificaciones en topbar (campanita) =====
function updateNotifBell(){
  const wrap=document.getElementById('notif-wrap');
  const badgeEl=document.getElementById('notif-badge');
  const listEl=document.getElementById('notif-dropdown-list');
  if(!wrap)return;
  const visible=currentRole==='tecnico'||currentRole==='lider_tecnico'||currentRole==='usuario';
  wrap.style.display=visible?'':'none';
  if(!visible)return;

  if(currentRole==='usuario'){
    // ── Vista usuario ──
    const noLeidas=alertasUsuario.filter(a=>!a.leido).length;
    if(noLeidas>0){badgeEl.textContent=noLeidas>9?'9+':String(noLeidas);badgeEl.style.display='inline-flex';}
    else badgeEl.style.display='none';
    const lista=alertasUsuario.slice(0,12);
    if(!lista.length){
      listEl.innerHTML='<div class="notif-empty"><div class="empty-state-ico" style="margin-bottom:6px">🔔</div>No tenés notificaciones por el momento.</div>';
      return;
    }
    listEl.innerHTML=lista.map(a=>`
      <div class="notif-item${a.leido?' leida':''}" onclick="notifUsrClick('${a.id}','${a.ticketId}','${a.tipo}')">
        <div class="notif-dot"></div>
        <div class="notif-body">
          <div class="notif-evento">${a.tipo==='validar'?'✅ ':'💬 '}${escapeHtml(a.evento)}</div>
          <div class="notif-meta">🎫 ${escapeHtml(a.ticketId)} · ${a.fecha} ${a.hora}</div>
        </div>
      </div>`).join('');
    return;
  }

  // ── Vista técnico / líder técnico ──
  const mi=tecnicoActualNombre();
  const count=alertasNoLeidasCount(mi);
  if(count>0){badgeEl.textContent=count>9?'9+':String(count);badgeEl.style.display='inline-flex';}
  else badgeEl.style.display='none';
  const mis=alertasParaTecnico(mi).slice(0,12);
  if(!mis.length){
    listEl.innerHTML='<div class="notif-empty"><div class="empty-state-ico" style="margin-bottom:6px">🔔</div>No tenés notificaciones por el momento.</div>';
    return;
  }
  listEl.innerHTML=mis.map(a=>`
    <div class="notif-item${a.leido?' leida':''}" onclick="notifClick('${a.id}','${a.ticketId}')">
      <div class="notif-dot"></div>
      <div class="notif-body">
        <div class="notif-evento">${escapeHtml(a.evento)}</div>
        <div class="notif-meta">🎫 ${escapeHtml(a.ticketId)} · ${a.fecha} ${a.hora}</div>
      </div>
    </div>`).join('');
}
function toggleNotifDropdown(event){
  event.stopPropagation();
  const dd=document.getElementById('notif-dropdown');
  const isOpen=dd.classList.contains('open');
  closeNotifDropdown();
  if(!isOpen){
    dd.classList.add('open');
    updateNotifBell();
  }
}
function closeNotifDropdown(){
  const dd=document.getElementById('notif-dropdown');
  if(dd)dd.classList.remove('open');
}
function marcarTodasLeidasNotif(){
  if(currentRole==='usuario'){
    alertasUsuario.forEach(a=>{a.leido=true;});
    saveAlertasUsuario();
  }else{
    const mi=tecnicoActualNombre();
    let changed=false;
    alertasTecnico.forEach(a=>{if(a.tecnico===mi&&!a.leido){a.leido=true;changed=true;}});
    if(changed)saveAlertas();
  }
  updateNotifBell();
}
function notifUsrClick(alertaId,ticketId,tipo){
  closeNotifDropdown();
  const a=alertasUsuario.find(x=>x.id===alertaId);
  if(a){a.leido=true;saveAlertasUsuario();}
  updateNotifBell();
  openTicket(ticketId);
}
function notifClick(alertaId,ticketId){
  closeNotifDropdown();
  abrirDesdeAlerta(alertaId,ticketId);
  updateNotifBell();
}
// Cerrar dropdown al clickear fuera
document.addEventListener('click',function(e){
  const wrap=document.getElementById('notif-wrap');
  if(wrap&&!wrap.contains(e.target))closeNotifDropdown();
});
		// ===== Credenciales de acceso =====
		// Para cambiar las contraseñas, editá el campo "pass" de cada cuenta.
		const credenciales={
		  'usuario@allpharma.com':{rol:'usuario',pass:'12345'},
		  'l.maffei@allpharma.com':{rol:'usuario',pass:'12345'},
		  'tecnico@allpharma.com':{rol:'tecnico',pass:'12345'},
		  's.herrero@allpharma.com':{rol:'lider_tecnico',pass:'12345'},
		  'admin@allpharma.com':{rol:'admin',pass:'12345'},
		  'l.sanchez@allpharma.com':{rol:'admin',pass:'12345'},
		};

		// ===== Persistencia local (localStorage) =====
		const STORAGE_KEY_TICKETS='guita_tickets_v2';
		const STORAGE_KEY_CALIF='guita_calificaciones_v2';
		const STORAGE_KEY_SEED_IDS='guita_seed_ids_v2';

		function loadTickets(){
		  try{
		    // Prototipo: los tickets seed con nuevo:true siempre arrancan como nuevos al cargar.
		    const seedNuevoIds=new Set(tickets.filter(t=>t.nuevo===true).map(t=>t.id));

		    // Copia de los tickets "de ejemplo" tal como están definidos en el código,
		    // ANTES de sobreescribir el array con lo guardado en localStorage.
		    const seed=tickets.slice();
		    const saved=localStorage.getItem(STORAGE_KEY_TICKETS);

		    // IDs de ejemplo que ya fueron incorporados/considerados en una carga anterior.
		    let mergedIds=[];
		    try{
		      const m=localStorage.getItem(STORAGE_KEY_SEED_IDS);
		      if(m)mergedIds=JSON.parse(m);
		    }catch(e){}
		    const mergedSet=new Set(mergedIds);

		    if(!saved){
		      // Primera vez que se usa la app en este navegador: se mantienen los tickets
		      // de ejemplo tal cual y se registran sus IDs para futuras fusiones.
		      localStorage.setItem(STORAGE_KEY_SEED_IDS,JSON.stringify(seed.map(t=>t.id)));
		      saveTickets();
		      return;
		    }

		    const parsed=JSON.parse(saved);
		    if(Array.isArray(parsed)){
		      tickets.length=0;
		      parsed.forEach(t=>tickets.push(t));
		    }

		    // Fusionar: agregar los tickets de ejemplo nuevos (agregados en una actualización
		    // del código) que todavía no se habían incorporado ni existen ya guardados.
		    const existingIds=new Set(tickets.map(t=>t.id));
		    const nuevos=seed.filter(t=>!mergedSet.has(t.id)&&!existingIds.has(t.id));
		    if(nuevos.length){
		      nuevos.forEach(t=>tickets.push(t));
		    }

		    const allSeedIds=Array.from(new Set([...mergedIds,...seed.map(t=>t.id)]));
		    localStorage.setItem(STORAGE_KEY_SEED_IDS,JSON.stringify(allSeedIds));
		    if(nuevos.length)saveTickets();

		    // Restaurar nuevo:true en los seeds que lo tienen definido
		    tickets.forEach(t=>{ if(seedNuevoIds.has(t.id)) t.nuevo=true; });
		  }catch(e){console.warn('No se pudieron cargar los tickets guardados:',e);}
		}
		function saveTickets(){
		  try{localStorage.setItem(STORAGE_KEY_TICKETS,JSON.stringify(tickets));}
		  catch(e){console.warn('No se pudieron guardar los tickets:',e);}
		}
		function loadCalificaciones(){
		  try{
		    const saved=localStorage.getItem(STORAGE_KEY_CALIF);
		    if(!saved)return;
		    const parsed=JSON.parse(saved);
		    if(Array.isArray(parsed)){
		      calificaciones.length=0;
		      parsed.forEach(c=>calificaciones.push(c));
		    }
		  }catch(e){console.warn('No se pudieron cargar las calificaciones guardadas:',e);}
		}
		function saveCalificaciones(){
		  try{localStorage.setItem(STORAGE_KEY_CALIF,JSON.stringify(calificaciones));}
		  catch(e){console.warn('No se pudieron guardar las calificaciones:',e);}
		}
		function nextTicketId(){
		  let max=49;
		  tickets.forEach(t=>{
		    const m=/TK-0*(\d+)/.exec(t.id||'');
		    if(m){const n=parseInt(m[1],10); if(n>max)max=n;}
		  });
		  return 'TK-'+String(max+1).padStart(4,'0');
		}
		// Devuelve el "nombre corto" (Inicial. Apellido) usado en el campo tecnico de los tickets,
		// a partir del nombre completo del rol con sesión iniciada.
		function tecnicoActualNombre(){
		  const r=roles[currentRole];
		  const nm=r.name.split(' ');
		  return nm[0][0]+'. '+nm.slice(1).join(' ');
		}
		// Nombre corto del Líder Técnico (cuenta fija, independiente del rol actual)
		function liderTecnicoNombre(){
		  const nm=roles.lider_tecnico.name.split(' ');
		  return nm[0][0]+'. '+nm.slice(1).join(' ');
		}
		// Si el ticket queda en estado "derivado", se reasigna automáticamente al Líder Técnico
		function aplicarReglaDerivado(t){
		  if(t&&t.estado==='derivado'){
		    t.tecnico=liderTecnicoNombre();
		  }
		}
		// Normaliza los tickets ya marcados como "derivado" para que queden asignados al
		// Líder Técnico (coherente con la regla de derivación, incluso para datos de ejemplo).
		function normalizarDerivados(){
		  let changed=false;
		  tickets.forEach(t=>{
		    if(t.estado==='derivado'&&t.tecnico!==liderTecnicoNombre()){
		      aplicarReglaDerivado(t); changed=true;
		    }
		  });
		  if(changed)saveTickets();
		}
		function resetDatos(){
		  abrirModalReset();
		}
		function abrirModalReset(){
		  const inp=document.getElementById('reset-confirmar-texto');
		  const btn=document.getElementById('reset-confirm-btn');
		  const err=document.getElementById('reset-err');
		  if(inp)inp.value='';
		  if(err)err.style.display='none';
		  if(btn){btn.disabled=true;btn.style.opacity='0.45';}
		  document.getElementById('modal-reset-datos').classList.add('show');
		}
		function onResetTextoInput(){
		  const inp=document.getElementById('reset-confirmar-texto');
		  const btn=document.getElementById('reset-confirm-btn');
		  const err=document.getElementById('reset-err');
		  const ok=!!inp&&inp.value.trim()==='RESETEAR';
		  if(btn){btn.disabled=!ok;btn.style.opacity=ok?'1':'0.45';}
		  if(err)err.style.display='none';
		}
		function cerrarModalReset(){
		  document.getElementById('modal-reset-datos').classList.remove('show');
		}
		function ejecutarReset(){
		  const inp=document.getElementById('reset-confirmar-texto');
		  const err=document.getElementById('reset-err');
		  if(!inp||inp.value.trim()!=='RESETEAR'){ if(err)err.style.display='block'; return; }
		  localStorage.removeItem(STORAGE_KEY_TICKETS);
		  localStorage.removeItem(STORAGE_KEY_CALIF);
		  localStorage.removeItem(STORAGE_KEY_SEED_IDS);
		  localStorage.removeItem(STORAGE_KEY_MENSAJES);
		  localStorage.removeItem(STORAGE_KEY_MSG_SEED);
		  localStorage.removeItem(STORAGE_KEY_ALERTAS);
		  localStorage.removeItem(STORAGE_KEY_ALERTAS_USR);
		  location.reload();
		}
		// ===== Prototipo: reiniciar SIEMPRE a los datos de ejemplo al abrir el archivo =====
		// Se borra lo guardado en localStorage en cada carga para no arrastrar cambios
		// entre sesiones. Los borrados y ediciones solo viven durante la sesión actual;
		// al recargar el HTML, todo vuelve a los datos de prueba originales.
		(function reiniciarPrototipo(){
		  try{
		    localStorage.removeItem(STORAGE_KEY_TICKETS);
		    localStorage.removeItem(STORAGE_KEY_CALIF);
		    localStorage.removeItem(STORAGE_KEY_SEED_IDS);
		    localStorage.removeItem(STORAGE_KEY_MENSAJES);
		    localStorage.removeItem(STORAGE_KEY_MSG_SEED);
		    localStorage.removeItem(STORAGE_KEY_ALERTAS);
		    localStorage.removeItem(STORAGE_KEY_ALERTAS_USR);
		  }catch(e){}
		})();
		// Cargar datos guardados (si existen) al iniciar la app
		loadTickets();
		loadCalificaciones();
		loadMensajes();
		loadAlertas();
		migrarComentarios();
		agregarNotasInternasEjemplo();
		resetSeedComentarios();
		resetSeedAlertas();
		normalizarDerivados();

		function doLogin(){
		  const em=document.getElementById('l-email').value.trim().toLowerCase();
		  const pw=document.getElementById('l-pass').value;
		  const err=document.getElementById('l-err');
		  const cuenta=credenciales[em];
		  if(!cuenta||cuenta.pass!==pw){
		    err.textContent='Usuario y/o Contraseña incorrecta';
		    err.style.display='block';
		    return;
		  }
		  // Verificar que el usuario no esté desactivado
		  const usuarioData=usuariosData.find(u=>u.e===em);
		  if(usuarioData&&!usuarioData.activo){
		    err.textContent='Tu cuenta está desactivada. Contactá al administrador del sistema.';
		    err.style.display='block';
		    return;
		  }
		  err.style.display='none';
		  currentRole=cuenta.rol;
		  currentUserEmail=em;
		  const r=roles[currentRole];
		  document.getElementById('top-role-pill').textContent=r.label;
		  document.getElementById('top-av').textContent=r.av;
		  document.getElementById('top-av').style.background=r.color;
		  document.getElementById('top-name').textContent=r.name;
		  const nm=r.name.split(' ')[0];const fem=['Lucía','Silvana'];const gen=fem.includes(nm)?'a':'o';document.getElementById('top-sub').textContent='Bienvenid'+gen+', '+nm+' — G.U.I.T.A';
		  goto('main'); renderView('dashboard');
		  updateNotifBell();
		}

		function goto(s){
		  document.querySelectorAll('.screen').forEach(e=>e.classList.remove('active'));
		  document.getElementById('s-'+s).classList.add('active');
		  window.scrollTo(0,0);
		}

		function getSideItems(){
		  const base={
		    usuario:[{id:'dashboard',label:'Inicio',ico:'🏠'},{id:'crear',label:'Nuevo ticket',ico:'+',perm:'crear_tickets'},{id:'mis-tickets',label:'Mis tickets',ico:'🎫'},{id:'ayuda',label:'Ayuda',ico:'?'}],
		    tecnico:[{id:'dashboard',label:'Inicio',ico:'🏠'},{id:'ticketera',label:'Bandeja de tickets',ico:'📋',perm:'ver_bandeja_equipo'},{id:'nuevo-ticket-tec',label:'Nuevo ticket',ico:'➕',perm:'crear_tickets'}],
		    lider_tecnico:[{id:'dashboard',label:'Inicio',ico:'🏠'},{id:'ticketera',label:'Bandeja de tickets',ico:'📋',perm:'ver_bandeja_equipo'},{id:'nuevo-ticket-lider',label:'Nuevo ticket',ico:'➕'},{id:'sla',label:'Monitoreo SLA',ico:'📈'}],
		    admin:[{id:'dashboard',label:'Inicio',ico:'🏠'},{id:'reportes',label:'Reportes',ico:'📊',perm:'ver_reportes'},{id:'rendimiento',label:'Rendimiento',ico:'⭐',perm:'ver_reportes'},{id:'usuarios',label:'Usuarios y roles',ico:'👤',perm:'gestionar_usuarios'},{id:'config',label:'Configuración',ico:'⚙',perm:'configurar_sistema'}],
		  }[currentRole]||[];
		  return base.filter(it=>!it.perm||puede(it.perm));
		}

		function buildSidebar(activeId){
		  const items=getSideItems();
		  let h='<div class="side-section">'+roles[currentRole].label+'</div>';
		  items.forEach(it=>{h+=`<div class="sideitem ${it.id===activeId?'sel':''}" onclick="renderView('${it.id}')"><span class="sico">${it.ico}</span>${it.label}</div>`;});
		  document.getElementById('sidebar').innerHTML=h;
		}

		function toast(msg, tipo){
		  const t=document.getElementById('toast');
		  // Limpiar variantes anteriores
		  t.classList.remove('toast-warn','toast-error','toast-info');
		  if(tipo==='warn')  { t.classList.add('toast-warn');  t.innerHTML='⚠️ '+msg; }
		  else if(tipo==='error'){ t.classList.add('toast-error'); t.innerHTML='✕ '+msg; }
		  else if(tipo==='info') { t.classList.add('toast-info');  t.innerHTML='ℹ️ '+msg; }
		  else                   {                                  t.innerHTML='✓ '+msg; } // success (verde, default)
		  t.classList.add('show');
		  clearTimeout(t._toastTimer);
		  t._toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
		}

		function badge(e){
		  const m={abierto:'b-abierto',progreso:'b-progreso',resuelto:'b-resuelto',cerrado:'b-cerrado',pendiente:'b-pendiente',derivado:'b-derivado'};
		  const l={abierto:'Abierto',progreso:'En progreso',resuelto:'Resuelto',cerrado:'Cerrado',pendiente:'Pendiente',derivado:'Derivado'};
		  return`<span class="badge ${m[e]||'b-cerrado'}">${l[e]||e}</span>`;
		}

		function dotPri(p){
		  const c={alta:'dot-alta',media:'dot-media',baja:'dot-baja'};
		  return`<span class="pri pri-${p}"><span class="dot ${c[p]||'dot-baja'}"></span>${p.charAt(0).toUpperCase()+p.slice(1)}</span>`;
		}

	function renderView(view){
	  window.currentView=view;
	  buildSidebar(view);
	  const mc=document.getElementById('main-content');
	  if(view==='dashboard') mc.innerHTML=dashboardHTML();
	  else if(view==='crear') mc.innerHTML=(currentRole==='usuario'&&puede('crear_tickets'))?crearHTML():dashboardHTML();
	  else if(view==='mis-tickets') mc.innerHTML=currentRole==='usuario'?misTicketsHTML():dashboardHTML();
	  else if(view==='ticketera'&&(currentRole==='tecnico'||currentRole==='lider_tecnico')&&puede('ver_bandeja_equipo')) mc.innerHTML=ticketeraHTML();
	  else if(view==='nuevo-ticket-tec'&&currentRole==='tecnico'&&puede('crear_tickets')) mc.innerHTML=nuevoTicketTecnicoHTML();
	  else if(view==='nuevo-ticket-lider') mc.innerHTML=nuevoTicketLiderHTML();
	  else if(view==='sla') mc.innerHTML=slaHTML();
	  else if(view==='reportes'&&currentRole==='admin'&&puede('ver_reportes')) mc.innerHTML=reportesHTML();
	  else if(view==='rendimiento'&&currentRole==='admin'&&puede('ver_reportes')) mc.innerHTML=rendimientoHTML();
	  else if(view==='usuarios'&&currentRole==='admin'&&puede('gestionar_usuarios')) mc.innerHTML=usuariosHTML();
	  else if(view==='config'&&currentRole==='admin'&&puede('configurar_sistema')) mc.innerHTML=configHTML();
	  else if(view==='ayuda') mc.innerHTML=ayudaHTML();
	  else mc.innerHTML=`<div class="text-secondary" style="text-align:center;padding:48px"><div style="font-size:34px;margin-bottom:10px">🔒</div><p class="text-primary" style="font-weight:600;font-size:15px;margin-bottom:6px">Acceso restringido</p><p>Tu rol no tiene permiso para acceder a esta sección.</p></div>`;
	}

// === Sección dashboard (Técnico / Líder): tickets prioritarios + últimos mensajes ===
function ticketNum(id){ return parseInt(String(id).replace(/\D/g,''),10)||0; }

// Alta primero, luego Media; dentro de cada prioridad, ticket más bajo primero. Top 5.
function topTicketsPrioritarios(lista=tickets){
  const porId = arr => arr.slice().sort((a,b)=>ticketNum(a.id)-ticketNum(b.id));
  const alta  = porId(lista.filter(t=>t.prio==='alta'));
  const media = porId(lista.filter(t=>t.prio==='media'));
  return [...alta, ...media].slice(0,5);
}

// Timestamp comparable a partir de fecha (DD/MM/YYYY) + hora (HH:MM)
function msgTimestamp(m){
  const f=String(m.fecha||'').split('/'); const h=String(m.hora||'0:0').split(':');
  return new Date(+f[2]||2000,(+f[1]||1)-1,+f[0]||1,+h[0]||0,+h[1]||0).getTime();
}
// 5 mensajes más recientes del sistema, sin importar el emisor.
function ultimosMensajes(){
  return mensajes.slice().sort((a,b)=>msgTimestamp(b)-msgTimestamp(a)).slice(0,5);
}

function dashboardPrioMsgHTML(mostrarTecnico=false,prios=topTicketsPrioritarios()){
  const msgs=ultimosMensajes();
  const tecSpan=t=>{
    if(!mostrarTecnico)return'';
    const sinAsig=!t.tecnico||t.tecnico==='—';
    return `<span class="db-prio-tec${sinAsig?' sin-asig':''}">👤 ${sinAsig?'Sin asignar':t.tecnico}</span>`;
  };
  const prioItems = prios.length
    ? prios.map(t=>`<div class="db-prio-item${mostrarTecnico?' with-tec':''}" onclick="openTicket('${t.id}')">
        <span class="dot ${t.prio==='alta'?'dot-alta':'dot-media'}"></span>
        <span class="db-prio-id mono">${t.id}</span>
        <span class="db-prio-title">${t.titulo}</span>
        ${tecSpan(t)}
        ${badge(t.estado)}
      </div>`).join('')
    : `<div class="empty-state" style="padding:30px 0"><div class="empty-state-ico">✅</div><div>No hay tickets prioritarios.</div></div>`;
  const msgItems = msgs.length
    ? msgs.map(m=>`<div class="db-msg-item" onclick="openTicket('${m.ticketId}')">
        <div class="db-msg-top"><span class="db-msg-autor">${m.autor}</span><span class="db-msg-ticket mono">${m.ticketId}</span></div>
        <div class="db-msg-text">${m.texto}</div>
      </div>`).join('')
    : `<div class="empty-state" style="padding:30px 0"><div class="empty-state-ico">💬</div><div>No hay mensajes recientes.</div></div>`;
  return `
    <div class="db-body-grid" style="margin-bottom:18px">
      <div class="db-panel">
        <div class="db-panel-head"><span class="db-panel-title">🔥 Tickets prioritarios</span></div>
        <div class="db-prio-list">${prioItems}</div>
      </div>
      <div class="db-sidebar">
        <div class="db-panel">
          <div class="db-panel-head"><span class="db-panel-title">💬 Últimos mensajes</span></div>
          <div class="db-msg-list">${msgItems}</div>
        </div>
      </div>
    </div>`;
}

// Equipo de soporte (técnicos + líder) con su carga de tickets activos. Usado por Líder y Admin.
function equipoConCarga(){
  return usuariosData
    .filter(u=>u.activo&&(u.rolKey==='tecnico'||u.rolKey==='lider_tecnico'))
    .map(u=>{
      const parts=u.n.trim().split(/\s+/);
      const corto=parts[0][0]+'. '+parts.slice(1).join(' ');
      const activos=tickets.filter(t=>t.tecnico===corto&&t.estado!=='cerrado'&&t.estado!=='resuelto').length;
      return{nombre:u.n,av:u.av,match:corto,vencidos:0,activos};
    });
}
// Tarjetas de "Carga de trabajo del equipo". Recibe el array de equipoConCarga().
function teamCardsHTML(equipo){
  const sub=isDark()?'#7A91B5':'#5F6B7A';
  return equipo.map(tec=>{
    const activos=tec.activos;
    const estadoTxt=activos===0?'Disponible':activos<=3?'Carga normal':'Carga alta';
    const estadoColor=activos===0?'#639922':activos<=3?'#5F6B7A':'#DC3545';
    const slaTxt=tec.vencidos>0?`<span style="color:#DC3545;font-size:10px;font-weight:500">⚠️ ${tec.vencidos} SLA vencido${tec.vencidos===1?'':'s'}</span>`:`<span style="color:${sub};font-size:10px">Sin SLA vencido</span>`;
    return`<div class="tech-card">
        <div class="tech-card-head"><div class="tech-av">${tec.av}</div><div class="tech-name">${tec.nombre}</div></div>
        <div class="tech-num">${activos}</div>
        <div class="tech-sub">${activos} activo${activos===1?'':'s'} · <span style="color:${estadoColor};font-weight:500">${estadoTxt}</span></div>
        <div style="margin-bottom:8px">${slaTxt}</div>
        <button class="btn-prim" onclick="irABandejaTecnico('${tec.match}')">Ver</button>
      </div>`;
  }).join('');
}

	function dashboardHTML(){
  const miNombre=tecnicoActualNombre();
  const r=roles[currentRole];
  const nombre=r.name.split(' ')[0];
  const ahora=new Date();
  const diasSemana=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const meses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const fechaHoy=diasSemana[ahora.getDay()].charAt(0).toUpperCase()+diasSemana[ahora.getDay()].slice(1)+' '+ahora.getDate()+' de '+meses[ahora.getMonth()]+', '+ahora.getFullYear();
  const sinAsignar=tickets.filter(t=>t.estado==='abierto'&&t.tecnico==='—').length;

  // Dark-mode palette for this render pass
  const dk=isDark();
  const dkCard=dk?'#161B22':'white';
  const dkBorder=dk?'#263354':'#D0DBEC';
  const dkHead=dk?'#82AADF':'#0F3580';
  const dkSub=dk?'#7A91B5':'#5F6B7A';
  const dkText=dk?'#CDD9F0':'#1A2440';
  const dkBannerBg=dk?'#172040':'#F0F4FA';
  const dkBannerBorder=dk?'#263354':'#D0DBEC';
  const dkIdColor=dk?'#7A91B5':'#5F6B7A';

  // Helper: metric card con franja de color lateral. Si recibe onclick, se vuelve clickeable.
  function mCard(label,val,sub,accentColor,subClass='',onclick=''){
    const attr=onclick?` onclick="${onclick}"`:'';
    const cls=onclick?'metric-card metric-card-link':'metric-card';
    return`<div class="${cls}"${attr}><div class="mc-accent" style="background:${accentColor}"></div><div class="mlabel">${label}</div><div class="mval">${val}</div><div class="msub ${subClass}">${sub}</div></div>`;
  }

  // Helper: alerta card rediseñada (sin emoji, con franja)
  function alertaCard(accentColor,titulo,msg,accion,linkLabel){
    return`<div style="background:${dkCard};border:1px solid ${dkBorder};border-radius:10px;padding:0;display:flex;overflow:hidden">
      <div style="width:4px;background:${accentColor};flex-shrink:0"></div>
      <div style="flex:1;padding:14px 18px;display:flex;align-items:center;gap:14px">
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:${dkHead};margin-bottom:3px">${titulo}</div>
          <div style="font-size:13px;color:${dkSub};line-height:1.4">${msg}</div>
        </div>
        <button class="btn-prim btn-sm" onclick="${accion}" style="flex-shrink:0;white-space:nowrap">${linkLabel}</button>
      </div>
    </div>`;
  }

  // Actividad reciente compartida (usuario y admin)
  function actividadReciente(lista){
    const colores={abierto:'#378ADD',progreso:'#EF9F27',resuelto:'#639922',pendiente:'#E24B4A',derivado:'#7C3AED',cerrado:'#ADB5BD'};
    return lista.slice(0,5).map(t=>`
      <div class="db-act-item" style="cursor:pointer" onclick="openTicket('${t.id}')">
        <div class="db-act-dot" style="background:${colores[t.estado]||'#ADB5BD'}"></div>
        <div style="flex:1;min-width:0">
          <div class="db-act-text" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span class="mono" style="font-size:11px;color:${dkIdColor}">${t.id}</span> ${t.titulo}</div>
          <div class="db-act-meta">${badge(t.estado)} · ${t.fecha}</div>
        </div>
      </div>`).join('');
  }

  // ── USUARIO ──
  if(currentRole==='usuario'){
    const misTickets=sortById(tickets.filter(t=>t.solicitante===r.name));
    const porValidar=misTickets.filter(t=>t.estado==='resuelto');
    const abiertos=misTickets.filter(t=>t.estado==='abierto').length;
    const enProgreso=misTickets.filter(t=>t.estado==='progreso').length;
    const resueltos=misTickets.filter(t=>t.estado==='resuelto').length;
    const cerrados=misTickets.filter(t=>t.estado==='cerrado').length;
    const banner=porValidar.length
      ?`<div class="banner">🔔 Tu ticket <span style="font-weight:700;cursor:pointer;text-decoration:underline;color:${dkHead}" onclick="openTicket('${porValidar[0].id}')">${porValidar[0].id}</span> fue resuelto${porValidar.length>1?' (y '+(porValidar.length-1)+' más)':''}. Por favor verificá y cerrá el caso.</div>`
      :`<div class="banner" style="background:${dkBannerBg};border-color:${dkBannerBorder};color:${dkSub}">✅ No hay tickets pendientes de validación.</div>`;
    const tRows=misTickets.slice(0,6).map(t=>`<tr onclick="openTicket('${t.id}')"><td class="mono" style="font-size:12px;color:${dkIdColor};width:90px">${t.id}</td><td style="max-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.titulo}</td><td style="width:105px">${badge(t.estado)}</td><td style="width:80px">${dotPri(t.prio)}</td></tr>`).join('');
    return`
    ${banner}
    <div class="db-greeting-bar">
      <div><div class="db-greeting-text">Buen día, ${nombre} 👋</div><div class="db-greeting-sub">${fechaHoy} · Soporte IT AllPharma</div></div>
      <span class="db-role-badge">${r.label}</span>
    </div>
    <div class="cards-row">
      ${mCard('Abiertos',abiertos,'sin atender','#185FA5','',"irAMisTickets('abierto')")}
      ${mCard('En progreso',enProgreso,'en atención','#EF9F27','',"irAMisTickets('progreso')")}
      ${mCard('Resueltos',resueltos,'resueltos por técnico','#639922','up',"irAMisTickets('resuelto')")}
      ${mCard('Cerrados',cerrados,'validados por vos','#5F6B7A','',"irAMisTickets('cerrado')")}
    </div>
    <div class="db-body-grid">
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="db-panel">
          <div class="db-panel-head"><span class="db-panel-title">⚡ Acciones rápidas</span></div>
          <div class="db-quick-grid">
            <button class="db-quick-btn" onclick="renderView('crear')"><span class="db-quick-ico">+</span> Nuevo ticket</button>
            <button class="db-quick-btn" onclick="renderView('mis-tickets')"><span class="db-quick-ico">🎫</span> Mis tickets</button>
            <button class="db-quick-btn" onclick="renderView('ayuda')"><span class="db-quick-ico">?</span> Centro de ayuda</button>
            ${resueltos>0?`<button class="db-quick-btn" onclick="irAMisTickets('resuelto')"><span class="db-quick-ico">⭐</span> Calificar atención</button>`:`<button class="db-quick-btn" style="opacity:0.5;cursor:default"><span class="db-quick-ico">⭐</span> Sin tickets a calificar</button>`}
          </div>
        </div>
        <div class="db-panel">
          <div class="db-panel-head">
            <span class="db-panel-title">🎫 Mis tickets recientes</span>
            <button class="db-panel-link" onclick="renderView('mis-tickets')">Ver todos →</button>
          </div>
          <table><thead><tr><th style="width:84px">#</th><th>Título</th><th style="width:140px">Estado</th><th style="width:108px">Prioridad</th></tr></thead><tbody>${tRows}</tbody></table>
        </div>
      </div>
      <div class="db-sidebar">
        <div class="db-panel">
          <div class="db-panel-head"><span class="db-panel-title">🕐 Actividad reciente</span></div>
          <div class="db-activity-list">${actividadReciente(misTickets)}</div>
        </div>
      </div>
    </div>`;
  }

  // ── TÉCNICO ──
  if(currentRole==='tecnico'){
    const misAsig=tickets.filter(t=>t.tecnico===miNombre);
    return`
    <div class="db-greeting-bar">
      <div><div class="db-greeting-text">Buen día, ${nombre} 👋</div><div class="db-greeting-sub">${fechaHoy} · Resumen de tu jornada</div></div>
      <span class="db-role-badge">${r.label}</span>
    </div>
    <div class="cards-row" style="grid-template-columns:repeat(3,1fr)">
      ${mCard('Mis asignados',misAsig.length,'en tu bandeja personal','#185FA5','',"irABandejaTickets('mis')")}
      ${mCard('Nuevos tickets',nuevosCount(),'recién ingresados','#7C3AED','',"irABandejaTickets('nuevos')")}
      ${mCard('Sin asignar',sinAsignar,'disponibles para tomar','#EF9F27','',"irABandejaTickets('abierto')")}
    </div>
    ${dashboardPrioMsgHTML(false,topTicketsPrioritarios(misAsig))}
    ${alertasRegistroHTML()}`;
  }

  // ── LÍDER TÉCNICO ──
  if(currentRole==='lider_tecnico'){
    const misAsignados=tickets.filter(t=>t.tecnico===miNombre).length;
    const equipo=equipoConCarga();
    const tecnicosDisponibles=equipo.filter(tec=>tec.activos===0).length;
    return`
    <div class="db-greeting-bar">
      <div><div class="db-greeting-text">Buen día, ${nombre} 👋</div><div class="db-greeting-sub">${fechaHoy} · Resumen de tu jornada</div></div>
      <span class="db-role-badge">${r.label}</span>
    </div>
    <div class="cards-row" style="grid-template-columns:repeat(3,1fr)">
      ${mCard('Mis tickets asignados',misAsignados,'en tu bandeja personal','#185FA5','',"irABandejaTickets('mis')")}
      ${mCard('Tickets sin asignar',sinAsignar,'disponibles para asignar','#EF9F27','',"irABandejaTickets('abierto')")}
      ${mCard('Técnicos disponibles',tecnicosDisponibles,'sin tickets activos','#639922','',"scrollToEquipo()")}
    </div>
    ${dashboardPrioMsgHTML(true)}
    ${alertasRegistroHTML()}
    <div class="section-title" id="equipo-carga">Carga de trabajo del equipo</div>
    <div class="team-row">${teamCardsHTML(equipo)}</div>`;
  }

  // ── ADMIN ──
  return`
    ${`<div class="banner">🔔 2 tickets superaron el SLA definido. Revisá el panel de reportes.</div>`}
    <div class="db-greeting-bar">
      <div><div class="db-greeting-text">Buen día, ${nombre} 👋</div><div class="db-greeting-sub">${fechaHoy} · Resumen del sistema</div></div>
      <span class="db-role-badge">${r.label}</span>
    </div>
    <div class="cards-row">
      ${mCard('Total de tickets',tickets.length,'en el sistema','#185FA5','',"irABandejaTickets('todos')")}
      ${mCard('Cumplimiento SLA','94%','meta: 90%','#639922','up',"renderView('reportes')")}
      ${mCard('Tiempo promedio','4.2h','resolución media','#EF9F27','',"renderView('reportes')")}
      ${mCard('Usuarios activos',usuariosData.filter(u=>u.activo).length,'en el sistema','#5F6B7A','',"renderView('usuarios')")}
    </div>
    <div class="db-body-grid">
      <div style="display:flex;flex-direction:column;gap:14px">
        <div>
          <div class="section-title" style="margin-top:0">Carga de trabajo del equipo</div>
          <div class="team-row">${teamCardsHTML(equipoConCarga())}</div>
        </div>
      </div>
      <div class="db-sidebar">
        <div class="db-panel">
          <div class="db-panel-head"><span class="db-panel-title">🕐 Actividad reciente</span></div>
          <div class="db-activity-list">${actividadReciente(sortById(tickets))}</div>
        </div>
      </div>
    </div>`;
}

let misEstado='todos';
let misBusqueda='';
let misFiltroInicial=null;

function misTicketsRowHTML(t){
  const idColor=isDark()?'#6B9FE4':'#1A4FAD';
  return `<tr onclick="openTicket('${t.id}')"><td style="font-weight:500;color:${idColor};width:100px">${t.id}</td><td>${t.titulo}</td><td>${badge(t.estado)}</td><td style="width:75px">${dotPri(t.prio)}</td><td style="width:90px;color:${isDark()?'#7A91B5':'#5F6B7A'}">${t.fecha}</td></tr>`;
}

function misFilteredList(){
  let list=currentRole==='usuario'
    ? tickets.filter(t=>t.solicitante===roles[currentRole].name)
    : tickets;
  if(misEstado!=='todos') list=list.filter(t=>t.estado===misEstado);
  if(misBusqueda.trim()){
    const q=misBusqueda.trim().toLowerCase();
    list=list.filter(t=>t.id.toLowerCase().includes(q)||t.titulo.toLowerCase().includes(q)||(t.cat||'').toLowerCase().includes(q));
  }
  return sortById(list);
}

function renderMisTabla(){
  const tb=document.getElementById('mis-tbody');
  if(!tb)return;
  const list=misFilteredList();
  tb.innerHTML=list.length?list.map(misTicketsRowHTML).join(''):`<tr><td colspan="5" style="text-align:center;padding:36px 24px"><div class="empty-state"><div class="empty-state-ico">🔍</div><div>No se encontraron tickets con los filtros aplicados.</div></div></td></tr>`;
}

// Navega a "Mis tickets" abriéndolo directamente con un filtro (chip) determinado.
function irAMisTickets(filtro){
  misFiltroInicial=filtro||null;
  renderView('mis-tickets');
}

		function misTicketsHTML(){
		  misEstado=misFiltroInicial||'todos';
		  misFiltroInicial=null;
		  misBusqueda='';
		  const chipClass=e=>misEstado===e?'chip on':'chip';
		  return`
		<div class="page-header"><h2>Mis tickets</h2><p>Seguimiento de todas tus solicitudes de soporte</p></div>
		<div class="card">
		  <div class="card-toolbar" style="flex-wrap:wrap;gap:10px">
		    <div class="chips">
		      <div class="${chipClass('todos')}" onclick="filterMis(this,'todos')">Todos</div>
		      <div class="${chipClass('abierto')}" onclick="filterMis(this,'abierto')">Abiertos</div>
		      <div class="${chipClass('progreso')}" onclick="filterMis(this,'progreso')">En progreso</div>
		      <div class="${chipClass('resuelto')}" onclick="filterMis(this,'resuelto')">Resueltos</div>
		      <div class="${chipClass('cerrado')}" onclick="filterMis(this,'cerrado')">Cerrados</div>
		    </div>
		    <div style="display:flex;gap:8px;align-items:center">
		      <input type="text" class="search-box" placeholder="Buscar por #, título o categoría..." value="${misBusqueda}" oninput="buscarMis(this.value)">
		      <button class="btn-prim btn-sm" onclick="renderView('crear')">+ Nuevo ticket</button>
		    </div>
		  </div>
		  <table class="table-mis-tickets"><thead><tr><th style="width:100px">#</th><th>Título</th><th>Estado</th><th style="width:75px">Prioridad</th><th style="width:90px">Fecha</th></tr></thead><tbody id="mis-tbody">${misFilteredList().map(misTicketsRowHTML).join('')}</tbody></table>
		</div>`;
		}

		function crearHTML(){
		  return`
		<div class="breadcrumb"><a onclick="renderView('dashboard')">← Inicio</a> / <span style="color:#1A4FAD">Nuevo ticket</span></div>
		<div class="page-header"><h2>Nueva solicitud de soporte</h2><p>Completá el formulario para registrar tu incidencia o requerimiento</p></div>
		<div class="step-bar">
		  <div class="step done"><div class="step-num">✓</div>&nbsp;Tipo</div><div class="step-line"></div>
		  <div class="step curr"><div class="step-num">2</div>&nbsp;Detalle</div><div class="step-line"></div>
		  <div class="step"><div class="step-num">3</div>&nbsp;Confirmación</div>
		</div>
		<div class="form-card">
		  <div class="form-group"><label>Tipo de solicitud <span class="req">*</span></label>
		    <select id="f-tipo"><option value="">Seleccioná el tipo...</option><option>Incidente — Algo dejó de funcionar</option><option>Requerimiento — Necesito algo nuevo</option><option>Consulta — Tengo una pregunta</option></select>
		    <p class="err-msg" id="e-tipo">Este campo es obligatorio</p></div>
		  <div class="form-row">
		    <div class="form-group"><label>Categoría <span class="req">*</span></label>
		      <select id="f-cat"><option value="">Seleccioná...</option><option>Hardware</option><option>Software</option><option>Redes / Conectividad</option><option>Accesos y permisos</option><option>Impresoras / Periféricos</option></select>
		      <p class="err-msg" id="e-cat">Este campo es obligatorio</p></div>
		    <div class="form-group"><label>Impacto estimado</label>
		      <select><option>Bajo — Solo me afecta a mí</option><option>Medio — Afecta a mi equipo</option><option>Alto — Afecta a varias áreas</option></select></div>
		  </div>
		  <div class="form-group"><label>Título <span class="req">*</span></label>
		    <input type="text" id="f-titulo" placeholder="Ej: PC no enciende en puesto 3, planta baja">
		    <p class="err-msg" id="e-titulo">Este campo es obligatorio</p>
		    <p class="hint">Sé específico para que el técnico pueda identificar el problema rápidamente</p></div>
		  <div class="form-group"><label>Descripción detallada <span class="req">*</span></label>
		    <textarea id="f-desc" placeholder="Describí qué ocurre, desde cuándo, qué pasos intentaste..."></textarea>
		    <p class="err-msg" id="e-desc">Este campo es obligatorio</p></div>
		  <div class="form-group"><label>Adjuntar archivo <span class="text-secondary" style="font-weight:400">(opcional)</span></label>
		    <input class="bg-soft-alt" type="file" style="font-size:12px">
		    <p class="hint">Capturas de pantalla, fotos o documentos relacionados</p></div>
		  <div style="display:flex;gap:10px;margin-top:8px">
		    <button class="btn-sec" onclick="renderView('dashboard')">Cancelar</button>
		    <button class="btn-prim" onclick="submitTicket()">Enviar solicitud</button>
		  </div>
		</div>`;
		}

function ticketeraRowHTML(t){
  const tieneMsg=(t.comentarios||[]).some(c=>!c.leido&&c.rol==='usuario');
  const msgBubble=tieneMsg?`<span class="bg-warn-soft" title="Mensaje nuevo sin leer" style="display:inline-flex;align-items:center;gap:2px;border:1px solid #FFD966;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:600;color:#856404;margin-right:5px;vertical-align:middle;cursor:pointer">💬 nuevo</span>`:'';
  return `<tr onclick="openTicket('${t.id}')">
    <td style="font-weight:500;color:#1A4FAD;width:100px;white-space:nowrap">${t.id}</td>
    <td style="max-width:170px">${t.nuevo&&currentRole==='tecnico'?'<span style="background:#DC3545;color:white;border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;margin-right:5px;vertical-align:middle">NUEVO</span>':''}${msgBubble}${t.titulo}</td>
    <td style="width:110px">${badge(t.estado)}</td>
    <td style="width:70px">${dotPri(t.prio)}</td>
    <td class="text-secondary" style="width:90px">${t.cat}</td>
    <td class="text-secondary" style="width:90px">${t.tecnico==='—'?'<span style="color:#DC3545;font-weight:500">Sin asignar</span>':t.tecnico}</td>
    ${currentRole!=='lider_tecnico'?`<td style="width:115px" onclick="event.stopPropagation()">
      ${t.tecnico==='—'
        ?`<button class="btn-prim btn-sm" onclick="tomarTicket('${t.id}',event)">Tomar ticket</button>`
        :t.estado==='cerrado'
        ?`<span class="text-muted" style="display:inline-flex;align-items:center;gap:4px;font-size:12px" title="Caso cerrado y validado por el usuario">🔒 Cerrado</span>`
        :`<select class="status-select" onchange="changeStatus('${t.id}',this.value)">
          ${estadoOptionsHTML(t,{})}
        </select>`
      }
    </td>`:''}
    ${currentRole==='admin'&&puede('eliminar_tickets')?`<td style="width:95px" onclick="event.stopPropagation()">
      <button class="btn-sec btn-sm" onclick="editTicket('${t.id}',event)" title="Editar ticket">✏️</button>
      <button class="btn-danger btn-sm" onclick="deleteTicket('${t.id}',event)" title="Eliminar ticket">🗑</button>
    </td>`:currentRole==='admin'?`<td style="width:95px" onclick="event.stopPropagation()">
      <button class="btn-sec btn-sm" onclick="editTicket('${t.id}',event)" title="Editar ticket">✏️</button>
    </td>`:''}
    </tr>`;
}

let ticketeraEstado='todos';
let ticketeraBusqueda='';

// Cantidad de tickets recién asignados por el Líder Técnico que el técnico todavía no abrió
function nuevosCount(){
  if(currentRole!=='tecnico')return 0;
  const miNombre=tecnicoActualNombre();
  return tickets.filter(t=>t.nuevo===true&&t.tecnico===miNombre).length;
}

function ticketeraFilteredList(){
  let list=tickets;
  if(currentRole==='tecnico'){
    const miNombre=tecnicoActualNombre();
    list=list.filter(t=>t.tecnico==='—'||t.tecnico===miNombre);
  }
  if(ticketeraEstado==='nuevos'){
    list=list.filter(t=>t.nuevo===true);
  }else if(ticketeraEstado==='mensajes'){
    const miNombre=tecnicoActualNombre();
    if(currentRole==='lider_tecnico'){
      list=list.filter(t=>(t.tecnico===miNombre||t.tecnico==='—')&&(t.comentarios||[]).some(c=>!c.leido&&c.rol==='usuario'));
    }else{
      list=list.filter(t=>t.tecnico===miNombre&&(t.comentarios||[]).some(c=>!c.leido&&c.rol==='usuario'));
    }
  }else if(ticketeraEstado==='mis'){
    const miNombre=tecnicoActualNombre();
    list=list.filter(t=>t.tecnico===miNombre&&t.estado!=='cerrado');
  }else if(ticketeraEstado==='alta'){
    list=list.filter(t=>t.prio==='alta');
  }else if(ticketeraEstado==='abierto'){
    // "Sin asignar": abiertos y sin técnico asignado (coincide con la métrica del dashboard)
    list=list.filter(t=>t.estado==='abierto'&&t.tecnico==='—');
  }else if(ticketeraEstado!=='todos'){
    list=list.filter(t=>t.estado===ticketeraEstado);
  }
  if(ticketeraBusqueda.trim()){
    const q=ticketeraBusqueda.trim().toLowerCase();
    list=list.filter(t=>
      t.id.toLowerCase().includes(q)||
      t.titulo.toLowerCase().includes(q)||
      (t.cat||'').toLowerCase().includes(q)||
      (t.tecnico||'').toLowerCase().includes(q)
    );
  }
  return sortById(list);
}

function renderTicketeraTabla(){
  const tb=document.getElementById('ticketera-tbody');
  if(!tb)return;
  const list=ticketeraFilteredList();
  const cols=currentRole==='tecnico'?7:currentRole==='lider_tecnico'?6:8;
  tb.innerHTML=list.length?list.map(ticketeraRowHTML).join(''):`<tr><td colspan="${cols}" style="text-align:center;padding:36px 24px"><div class="empty-state"><div class="empty-state-ico">🔍</div><div>No se encontraron tickets con los filtros aplicados.</div></div></td></tr>`;
}

function filterChip(el,estado){
  document.querySelectorAll('#main-content .chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  ticketeraEstado=estado||'todos';
  renderTicketeraTabla();
}

function buscarTicketera(val){
  ticketeraBusqueda=val;
  renderTicketeraTabla();
}

let ticketeraFiltroInicial=null;
let ticketeraTecnicoInicial=null;

// Navega a la Bandeja mostrando solo los tickets de un técnico (pre-filtra por su nombre).
function irABandejaTecnico(nombreCorto){
  ticketeraFiltroInicial='todos';
  ticketeraTecnicoInicial=nombreCorto||null;
  renderView('ticketera');
}

// Navega a la Bandeja de tickets abriéndola directamente con un filtro (chip) determinado.
function irABandejaTickets(filtro){
  ticketeraFiltroInicial=filtro||null;
  renderView('ticketera');
}

// Baja suavemente a la sección "Carga de trabajo del equipo" del dashboard del Líder Técnico.
function scrollToEquipo(){
  const el=document.getElementById('equipo-carga');
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}

		function ticketeraHTML(){
		  ticketeraEstado=ticketeraFiltroInicial||'todos';
		  ticketeraFiltroInicial=null;
		  ticketeraBusqueda=ticketeraTecnicoInicial||'';
		  ticketeraTecnicoInicial=null;
		  const chipClass=e=>ticketeraEstado===e?'chip on':'chip';
		  const subt=currentRole==='tecnico'
		    ?'Tickets sin asignar y los que tenés asignados a tu nombre'
		    :'Revisá la cola de solicitudes y tomá los tickets según su prioridad';
		  return`
		<div class="page-header"><h2>Bandeja de tickets</h2><p>${subt}</p></div>
		<div class="card">
		  <div class="card-toolbar" style="flex-wrap:wrap;gap:10px">
		    <div class="chips">
		      <div class="${chipClass('todos')}" onclick="filterChip(this,'todos')">Todos</div>
      ${currentRole==='lider_tecnico'||currentRole==='tecnico'?`<div class="${chipClass('mis')}" onclick="filterChip(this,'mis')">Mis asignados</div>`:''}      
      ${currentRole==='lider_tecnico'?`<div class="${chipClass('alta')}" onclick="filterChip(this,'alta')">Alta prioridad</div>`:''}
		      ${currentRole==='lider_tecnico'?`<div class="${chipClass('mis')}" onclick="filterChip(this,'mis')">Mis asignados</div>`:''}
		      ${currentRole==='lider_tecnico'?`<div class="${chipClass('alta')}" onclick="filterChip(this,'alta')">Alta prioridad</div>`:''}
      ${currentRole==='lider_tecnico'?`<div class="${chipClass('mensajes')}" onclick="filterChip(this,'mensajes')">Mensajes${mensajesNoLeidosLider().length?` <span style="background:#856404;color:white;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:600;margin-left:3px">${mensajesNoLeidosLider().length}</span>`:""}</div>`:''}
		      ${currentRole==='tecnico'?`<div class="${chipClass('nuevos')}" onclick="filterChip(this,'nuevos')">Nuevos${nuevosCount()?` <span style="background:#DC3545;color:white;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:600;margin-left:3px">${nuevosCount()}</span>`:''}</div>`:''}
		      ${currentRole==='tecnico'?`<div class="${chipClass('mensajes')}" onclick="filterChip(this,'mensajes')">Mensajes${mensajesNoLeidos().length?` <span style="background:#856404;color:white;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:600;margin-left:3px">${mensajesNoLeidos().length}</span>`:''}</div>`:''}
		      <div class="${chipClass('abierto')}" onclick="filterChip(this,'abierto')">Sin asignar</div>
		      <div class="${chipClass('progreso')}" onclick="filterChip(this,'progreso')">En progreso</div>
		      <div class="${chipClass('pendiente')}" onclick="filterChip(this,'pendiente')">Pendientes</div>
		      ${currentRole!=='tecnico'?`<div class="${chipClass('derivado')}" onclick="filterChip(this,'derivado')">Derivados</div>`:''}
		      <div class="${chipClass('resuelto')}" onclick="filterChip(this,'resuelto')">Resueltos</div>
		      <div class="${chipClass('cerrado')}" onclick="filterChip(this,'cerrado')">Cerrados</div>
		    </div>
		    <div style="display:flex;gap:8px;align-items:center">
		      <input type="text" class="search-box" placeholder="Buscar por #, título, categoría o técnico..." value="${ticketeraBusqueda}" oninput="buscarTicketera(this.value)">
		      ${currentRole!=='tecnico'?`<button class="btn-sec btn-sm" onclick="exportTicketsCSV(ticketeraFilteredList(),'bandeja_tickets')">⬇ Exportar</button>`:''}
		    </div>
		  </div>
		  <table><thead><tr>
		    <th style="width:100px">#</th>
		    <th style="width:170px">Título</th>
		    <th style="width:110px">Estado</th>
		    <th style="width:70px">Prioridad</th>
		    <th style="width:90px">Categoría</th>
		    <th style="width:90px">Técnico</th>
		    ${currentRole!=='lider_tecnico'?`<th style="width:115px">Acción</th>`:''}
		    ${currentRole==='admin'?`<th style="width:95px">Acciones</th>`:''}
		  </tr></thead>
		  <tbody id="ticketera-tbody">${ticketeraFilteredList().map(ticketeraRowHTML).join('')}</tbody></table>
		</div>`;
		}


function nuevoTicketTecnicoHTML(){
  const miNombre=tecnicoActualNombre();
  return`
<div class="breadcrumb"><a onclick="renderView('dashboard')">← Inicio</a> / <span style="color:#1A4FAD">Nuevo ticket</span></div>
<div class="page-header"><h2>Crear nuevo ticket</h2><p>Completá el formulario. El ticket se creará y quedará asignado automáticamente a tu nombre.</p></div>
<div class="form-card" style="max-width:660px">

  <div class="form-group">
    <label>Título <span class="req">*</span></label>
    <input type="text" id="tt-titulo" placeholder="Ej: Falla en servidor de archivos — Piso 3">
    <p class="err-msg" id="tt-err-titulo">Este campo es obligatorio.</p>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label>Categoría <span class="req">*</span></label>
      <select id="tt-cat">
        <option value="">Seleccioná...</option>
        <option>Hardware</option>
        <option>Software</option>
        <option>Redes / Conectividad</option>
        <option>Accesos y permisos</option>
        <option>Impresoras / Periféricos</option>
      </select>
      <p class="err-msg" id="tt-err-cat">Este campo es obligatorio.</p>
    </div>
    <div class="form-group">
      <label>Prioridad</label>
      <select id="tt-prio">
        <option value="baja">Baja</option>
        <option value="media" selected>Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label>Descripción <span class="req">*</span></label>
    <textarea id="tt-desc" placeholder="Describí el problema o tarea a resolver..."></textarea>
    <p class="err-msg" id="tt-err-desc">Este campo es obligatorio.</p>
  </div>

  <div class="form-group" style="border-top:1px solid #E8EEF9;padding-top:18px;margin-top:4px">
    <label>Asignar a técnico</label>
    <input type="text" value="${miNombre} (vos)" disabled>
    <p class="hint">Los tickets creados desde acá se asignan siempre a tu nombre.</p>
  </div>

  <div style="display:flex;gap:10px;margin-top:8px">
    <button class="btn-sec" onclick="renderView('dashboard')">Cancelar</button>
    <button class="btn-prim" onclick="submitTicketTecnico()">Crear y asignarme</button>
  </div>
</div>`;
}

function submitTicketTecnico(){
  const titulo=document.getElementById('tt-titulo').value.trim();
  const desc=document.getElementById('tt-desc').value.trim();
  const prio=document.getElementById('tt-prio').value;
  const cat=document.getElementById('tt-cat').value;

  ['tt-err-titulo','tt-err-cat','tt-err-desc'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.style.display='none';
  });
  ['tt-titulo','tt-cat','tt-desc'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.style.borderColor='';
  });

  let ok=true;
  if(!titulo){document.getElementById('tt-err-titulo').style.display='block';document.getElementById('tt-titulo').style.borderColor='#DC3545';ok=false;}
  if(!cat){document.getElementById('tt-err-cat').style.display='block';document.getElementById('tt-cat').style.borderColor='#DC3545';ok=false;}
  if(!desc){document.getElementById('tt-err-desc').style.display='block';document.getElementById('tt-desc').style.borderColor='#DC3545';ok=false;}
  if(!ok)return;

  const id=nextTicketId();
  const tecnico=tecnicoActualNombre();
  tickets.unshift({id,titulo,cat,estado:'progreso',prio,tecnico,fecha:new Date().toLocaleDateString('es-AR'),desc});
  saveTickets();
  toast('Ticket '+id+' creado y asignado a vos ('+tecnico+').');
  setTimeout(()=>renderView('ticketera'),900);
}
		function tomarTicket(id, event){
		  event.stopPropagation();
		  const t=tickets.find(x=>x.id===id);
		  if(t){t.tecnico=tecnicoActualNombre(); t.estado='progreso';}
		  saveTickets();
		  toast('Ticket '+id+' tomado. Ahora está asignado a tu nombre.');
		  renderTicketeraTabla();
		}

		
function starsDisplay(avg){
  if(!avg)return '<span class="text-muted" style="font-size:12px">Sin datos</span>';
  const full=Math.floor(avg);
  const half=avg-full>=0.5;
  return [1,2,3,4,5].map(i=>{
    const lit=i<=full||(half&&i===full+1);
    return`<span style="color:${lit?'#FFC107':'#D0DBEC'};font-size:16px;line-height:1">&#9733;</span>`;
  }).join('')+`<span class="text-secondary" style="font-size:12px;margin-left:6px;font-weight:500">${avg.toFixed(1)}</span>`;
}
function rendimientoHTML(){
  const dk=isDark();
  const cellText=dk?'#CDD9F0':'#1A2440';
  const cellSub=dk?'#7A91B5':'#5F6B7A';
  const cellHead=dk?'#82AADF':'#0F3580';
  const starEmpty=dk?'#2C3F60':'#D0DBEC';
  const rowBorder=dk?'#1A2540':'#F0F4FA';
  const tecnicos=['S. Herrero','J. Perez','T. Común'];
  const stats=tecnicos.map(nombre=>{
    const asignados=tickets.filter(t=>t.tecnico===nombre).length;
    const resueltos=tickets.filter(t=>t.tecnico===nombre&&(t.estado==='resuelto'||t.estado==='cerrado')).length;
    const cals=calificaciones.filter(c=>c.tecnico===nombre);
    const avg=cals.length?Math.round((cals.reduce((a,c)=>a+c.score,0)/cals.length)*10)/10:0;
    return{nombre,asignados,resueltos,cals:cals.length,avg};
  });

  const rows=stats.map(s=>`
    <tr>
      <td><span style="font-weight:600;color:${cellText}">${s.nombre}</span></td>
      <td style="text-align:center"><span style="font-weight:600;color:#4A7FD4;font-size:15px">${s.asignados}</span></td>
      <td style="text-align:center"><span style="font-weight:600;color:#1A6B3A;font-size:15px">${s.resueltos}</span></td>
      <td style="text-align:center"><span style="font-weight:500;color:${cellSub}">${s.cals}</span></td>
      <td><div style="display:flex;align-items:center">${starsDisplay(s.avg)}</div></td>
    </tr>`).join('');

  const ultimos=[...calificaciones].reverse().slice(0,10);
  const comentRows=ultimos.length
    ? ultimos.map(c=>`
      <div style="padding:14px 18px;border-bottom:1px solid ${rowBorder};display:flex;align-items:flex-start;gap:14px">
        <div style="flex-shrink:0;padding-top:2px">
          ${[1,2,3,4,5].map(i=>`<span style="color:${i<=c.score?'#FFC107':starEmpty};font-size:16px;line-height:1">&#9733;</span>`).join('')}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;color:${cellText};line-height:1.6">${c.comentario||`<em style="color:${cellSub};font-style:italic">Sin comentario</em>`}</div>
          <div style="font-size:11px;color:${cellSub};margin-top:4px;display:flex;gap:10px">
            <span>🎫 Ticket <strong style="color:${cellHead}">${c.ticketId}</strong></span>
            <span>👤 ${c.tecnico||'—'}</span>
          </div>
        </div>
      </div>`).join('')
    : `<div style="padding:32px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">💬</div>
        <div style="font-size:13px;color:${cellSub}">Todavía no hay comentarios registrados.</div>
      </div>`;

  return`
<div class="page-header"><h2>⭐ Rendimiento por Técnico</h2><p>Calificaciones y comentarios enviados por los usuarios</p></div>
<div class="card" style="margin-bottom:16px">
  <div class="card-toolbar">
    <span class="card-title">Métricas por técnico</span>
  </div>
  <table>
    <thead>
      <tr>
        <th>Técnico</th>
        <th style="text-align:center;width:120px">Asignados</th>
        <th style="text-align:center;width:120px">Resueltos</th>
        <th style="text-align:center;width:120px">Valoraciones</th>
        <th style="width:180px">Calificación promedio</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>
<div class="card">
  <div class="card-toolbar">
    <span class="card-title">Últimos comentarios recibidos</span>
  </div>
  ${comentRows}
</div>`;
}
function reportesHTML(){
  const sat=avgSatisfaction();
  const dk=isDark();
  const barTrack=dk?'#1A2540':'#E8EEF9';
  const barFill=dk?'#4A7FD4':'#1A4FAD';
  const labelColor=dk?'#7A91B5':'#5F6B7A';
  const valColor=dk?'#82AADF':'#0F3580';
  const cardBg=dk?'#161B22':'white';
  const cardBorder=dk?'#263354':'#D0DBEC';
  const cardTitleColor=dk?'#82AADF':'#0F3580';
  const statTextColor=dk?'#CDD9F0':'inherit';
		  const cats=[['Hardware',42],['Software',38],['Redes',31],['Accesos',24],['Periféricos',12]];
		  const barHtml=cats.map(([n,v])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:9px"><div style="width:80px;font-size:12px;color:${labelColor};text-align:right">${n}</div><div style="flex:1;background:${barTrack};border-radius:4px;height:18px;overflow:hidden"><div style="width:${Math.round(v/42*100)}%;background:${barFill};height:100%;border-radius:4px"></div></div><div style="width:26px;font-size:12px;font-weight:600;color:${valColor}">${v}</div></div>`).join('');
		  const stData=[['Abiertos',28,'#1A4FAD'],['En progreso',34,'#FFC107'],['Resueltos',72,'#28A745'],['Cerrados',13,'#ADB5BD']];
		  const stHtml=stData.map(([n,v,c])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:9px"><div style="width:10px;height:10px;border-radius:50%;background:${c};flex-shrink:0"></div><div style="flex:1;font-size:13px;color:${statTextColor}">${n}</div><div style="font-size:12px;color:${labelColor}">${Math.round(v/147*100)}%</div><div style="font-size:13px;font-weight:600;width:26px;text-align:right;color:${valColor}">${v}</div></div>`).join('');
		  return`
		<div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px">
		  <div><h2>Reportes y métricas</h2><p>Indicadores de desempeño — Abril 2026</p></div>
		  <button class="btn-prim btn-sm" onclick="exportTicketsCSV(tickets,'reporte_tickets')">⬇ Exportar tickets (CSV)</button>
		</div>
		<div class="cards-row">
		  <div class="metric-card"><div class="mlabel">Tickets este mes</div><div class="mval">147</div><div class="msub">+12% vs mes anterior</div></div>
		  <div class="metric-card"><div class="mlabel">Tiempo prom. resolución</div><div class="mval" style="color:#1A6B3A">4.2h</div><div class="msub">SLA objetivo: 8h</div></div>
		  <div class="metric-card"><div class="mlabel">Cumplimiento SLA</div><div class="mval" style="color:#1A6B3A">94%</div><div class="msub">Meta: 90%</div></div>
		  <div class="metric-card"><div class="mlabel">Satisfacción usuario</div><div class="mval" style="color:${sat.color}">${sat.val}</div><div class="msub">${sat.sub}</div></div>
		</div>
		<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
		  <div class="card" style="padding:16px"><p style="font-size:13px;font-weight:600;color:${cardTitleColor};margin-bottom:14px">Tickets por categoría</p>${barHtml}</div>
		  <div class="card" style="padding:16px"><p style="font-size:13px;font-weight:600;color:${cardTitleColor};margin-bottom:14px">Distribución por estado</p>${stHtml}</div>
		</div>`;
		}

		// ===== Datos de usuarios (persistentes en sesión) =====
		const rolColorMap={usuario:'#2B78E4',tecnico:'#0F6E56',lider_tecnico:'#0A5A8A',admin:'#7C3A00'};
		const rolLabelMap={usuario:'Usuario',tecnico:'Técnico IT',lider_tecnico:'Líder Técnico',admin:'Administrador'};
		const usuariosData=[
		  {av:'LM',c:'#2B78E4',n:'Lucía Maffei',e:'l.maffei@allpharma.com',r:'Usuario',rolKey:'usuario',activo:true},
		  {av:'JS',c:'#2B78E4',n:'Javier Sosa',e:'j.sosa@allpharma.com',r:'Usuario',rolKey:'usuario',activo:true},
		  {av:'SH',c:'#5B2A8C',n:'Silvana Herrero',e:'s.herrero@allpharma.com',r:'Técnico IT',rolKey:'lider_tecnico',activo:true},
		  {av:'JP',c:'#5B2A8C',n:'Jorge Pérez',e:'j.perez@allpharma.com',r:'Técnico IT',rolKey:'tecnico',activo:true},
		  {av:'MD',c:'#5B2A8C',n:'Marcos Díaz',e:'m.diaz@allpharma.com',r:'Técnico IT',rolKey:'tecnico',activo:true},
		  {av:'VR',c:'#5B2A8C',n:'Valentina Ruiz',e:'v.ruiz@allpharma.com',r:'Técnico IT',rolKey:'tecnico',activo:true},
		  {av:'FL',c:'#5B2A8C',n:'Federico Lema',e:'f.lema@allpharma.com',r:'Técnico IT',rolKey:'tecnico',activo:true},
		  {av:'LS',c:'#1A6B3A',n:'Luis Sánchez',e:'l.sanchez@allpharma.com',r:'Administrador',rolKey:'admin',activo:true},
		];

		// ===== índice del usuario siendo editado =====
		let editandoUsuarioIdx=null;

		// ── Modal NUEVO usuario ──
		function abrirModalNuevoUsuario(){
		  ['nu-nombre','nu-apellido','nu-email','nu-pass'].forEach(id=>{
		    const el=document.getElementById(id); if(el){el.value='';el.style.borderColor='';}
		  });
		  const rolEl=document.getElementById('nu-rol'); if(rolEl)rolEl.value='';
		  const err=document.getElementById('nu-err'); if(err)err.style.display='none';
		  document.getElementById('modal-nuevo-usuario').classList.add('show');
		}
		function cerrarModalNuevoUsuario(){
		  document.getElementById('modal-nuevo-usuario').classList.remove('show');
		}
		function guardarNuevoUsuario(){
		  const nombre=document.getElementById('nu-nombre').value.trim();
		  const apellido=document.getElementById('nu-apellido').value.trim();
		  const email=document.getElementById('nu-email').value.trim().toLowerCase();
		  const pass=document.getElementById('nu-pass').value;
		  const rolKey=document.getElementById('nu-rol').value;
		  const err=document.getElementById('nu-err');
		  let msg='';
		  if(!nombre||!apellido||!email||!pass||!rolKey) msg='Completá todos los campos obligatorios.';
		  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msg='El correo electrónico no tiene un formato válido.';
		  else if(credenciales[email]) msg='Ya existe un usuario registrado con ese correo.';
		  if(msg){err.textContent=msg;err.style.display='block';return;}
		  err.style.display='none';
		  const av=(nombre.charAt(0)+apellido.charAt(0)).toUpperCase();
		  const color=rolColorMap[rolKey]||'#5F6B7A';
		  const rolLabel=rolLabelMap[rolKey]||rolKey;
		  const nombreCompleto=nombre+' '+apellido;
		  usuariosData.push({av,c:color,n:nombreCompleto,e:email,r:rolLabel,rolKey,activo:true});
		  credenciales[email]={rol:rolKey,pass,nombre:nombreCompleto};
		  cerrarModalNuevoUsuario();
		  renderView('usuarios');
		  toast('Usuario '+nombreCompleto+' creado correctamente. Ya puede ingresar al sistema.');
		}

		// ── Modal EDITAR usuario ──
		function abrirModalEditarUsuario(idx){
		  const u=usuariosData[idx]; if(!u)return;
		  editandoUsuarioIdx=idx;
		  const partes=u.n.trim().split(/\s+/);
		  document.getElementById('eu-nombre').value=partes[0]||'';
		  document.getElementById('eu-apellido').value=partes.slice(1).join(' ')||'';
		  document.getElementById('eu-email').value=u.e;
		  document.getElementById('eu-pass').value='';
		  document.getElementById('eu-rol').value=u.rolKey;
		  ['eu-nombre','eu-apellido','eu-email'].forEach(id=>{
		    const el=document.getElementById(id); if(el)el.style.borderColor='';
		  });
		  const err=document.getElementById('eu-err'); if(err)err.style.display='none';
		  document.getElementById('modal-editar-usuario').classList.add('show');
		}
		function cerrarModalEditarUsuario(){
		  document.getElementById('modal-editar-usuario').classList.remove('show');
		  editandoUsuarioIdx=null;
		}
		function guardarEditarUsuario(){
		  const idx=editandoUsuarioIdx; if(idx===null)return;
		  const u=usuariosData[idx]; if(!u)return;
		  const nombre=document.getElementById('eu-nombre').value.trim();
		  const apellido=document.getElementById('eu-apellido').value.trim();
		  const email=document.getElementById('eu-email').value.trim().toLowerCase();
		  const pass=document.getElementById('eu-pass').value;
		  const rolKey=document.getElementById('eu-rol').value;
		  const err=document.getElementById('eu-err');
		  let msg='';
		  if(!nombre||!apellido||!email||!rolKey) msg='Completá todos los campos obligatorios.';
		  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msg='El correo electrónico no tiene un formato válido.';
		  else if(email!==u.e&&credenciales[email]) msg='Ya existe un usuario registrado con ese correo.';
		  if(msg){err.textContent=msg;err.style.display='block';return;}
		  err.style.display='none';
		  // Si cambió el email, mover las credenciales
		  if(email!==u.e){
		    credenciales[email]=credenciales[u.e];
		    delete credenciales[u.e];
		    // Mover también los permisos individuales (overrides) al nuevo email.
		    if(permisosOverrides[u.e]){
		      permisosOverrides[email]=permisosOverrides[u.e];
		      delete permisosOverrides[u.e];
		      guardarOverrides();
		    }
		    if(permisosOverridesMeta[u.e]){
		      permisosOverridesMeta[email]=permisosOverridesMeta[u.e];
		      delete permisosOverridesMeta[u.e];
		      guardarOverridesMeta();
		    }
		    // Si el usuario con sesión abierta cambió su propio email, mantener la identidad.
		    if(currentUserEmail===u.e) currentUserEmail=email;
		  }
		  const nombreCompleto=nombre+' '+apellido;
		  const av=(nombre.charAt(0)+apellido.charAt(0)).toUpperCase();
		  const color=rolColorMap[rolKey]||'#5F6B7A';
		  const rolLabel=rolLabelMap[rolKey]||rolKey;
		  u.n=nombreCompleto; u.e=email; u.av=av; u.c=color; u.r=rolLabel; u.rolKey=rolKey;
		  if(credenciales[email]){
		    credenciales[email].rol=rolKey;
		    credenciales[email].nombre=nombreCompleto;
		    if(pass) credenciales[email].pass=pass;
		  }
		  cerrarModalEditarUsuario();
		  renderView('usuarios');
		  toast('Usuario '+nombreCompleto+' actualizado correctamente.');
		}

		// ── Desactivar / Activar usuario ──
		let _pendingToggleIdx=null;
		function confirmarToggleActivo(idx){
		  const u=usuariosData[idx]; if(!u)return;
		  _pendingToggleIdx=idx;
		  const desactivar=u.activo; // si está activo, la acción es desactivarlo
		  const dark=!document.body.classList.contains('light');
		  const title=document.getElementById('desact-title');
		  const sub=document.getElementById('desact-subtitle');
		  const box=document.getElementById('desact-warning-box');
		  const btn=document.getElementById('desact-confirm-btn');
		  if(title)title.textContent=desactivar?'⚠️ Desactivar usuario':'✓ Activar usuario';
		  if(sub)sub.textContent='Confirmá la acción antes de continuar';
		  if(box){
		    box.innerHTML=desactivar
		      ? '⚠️ <strong>'+u.n+'</strong> no podrá ingresar al sistema hasta que vuelvas a activarlo.'
		      : '✓ <strong>'+u.n+'</strong> podrá volver a ingresar al sistema con sus credenciales.';
		    if(desactivar){
		      box.style.background=dark?'#3A2800':'#FFF8E1';
		      box.style.border='1px solid '+(dark?'#6B4E00':'#FFD966');
		      box.style.color=dark?'#FFCC44':'#856404';
		    }else{
		      box.style.background=dark?'#0A2D17':'#D4EDDA';
		      box.style.border='1px solid '+(dark?'#1A5A33':'#A3D9B1');
		      box.style.color=dark?'#4ADE80':'#155724';
		    }
		  }
		  if(btn){
		    btn.textContent=desactivar?'Sí, desactivar':'Sí, activar';
		    const c=desactivar?'#DC3545':'#1A6B3A';
		    btn.style.background=c; btn.style.color='#fff'; btn.style.border='none';
		  }
		  document.getElementById('modal-desactivar-usuario').classList.add('show');
		}
		function cerrarModalDesactivar(){
		  _pendingToggleIdx=null;
		  document.getElementById('modal-desactivar-usuario').classList.remove('show');
		}
		function ejecutarToggleActivo(){
		  const idx=_pendingToggleIdx; if(idx===null)return;
		  const u=usuariosData[idx]; if(!u){cerrarModalDesactivar();return;}
		  const accion=u.activo?'desactivar':'activar';
		  u.activo=!u.activo;
		  cerrarModalDesactivar();
		  renderView('usuarios');
		  toast('Usuario '+u.n+' '+accion+'do correctamente.');
		}
		function cambiarRolUsuario(idx,nuevoRolLabel){
		  const u=usuariosData[idx]; if(!u)return;
		  const keyMap={'Usuario':'usuario','Técnico IT':'tecnico','Líder Técnico':'lider_tecnico','Administrador':'admin'};
		  const nuevoKey=keyMap[nuevoRolLabel]||'usuario';
		  u.r=nuevoRolLabel; u.rolKey=nuevoKey; u.c=rolColorMap[nuevoKey]||'#5F6B7A';
		  if(credenciales[u.e]) credenciales[u.e].rol=nuevoKey;
		  toast('Rol de '+u.n+' actualizado a: '+nuevoRolLabel);
		}

		// ===== Permisos base por rol (línea de base de la herencia; controla el acceso en toda la app) =====
		// Estos valores son el punto de partida de cada usuario. Las personalizaciones se hacen por
		// usuario (overrides), que se superponen a este rol. 'si' = permitido | 'no' = no permitido | 'parcial' = permitido con restricciones
		const PERMISOS_DEFAULT=[
		  {key:'crear_tickets',accion:'Crear tickets propios',usuario:'si',tecnico:'si',lider_tecnico:'no',admin:'no'},
		  {key:'comentar',accion:'Comentar en el hilo del ticket',usuario:'si',tecnico:'si',lider_tecnico:'si',admin:'no'},
		  {key:'ver_bandeja_equipo',accion:'Ver bandeja de tickets del equipo',usuario:'no',tecnico:'si',lider_tecnico:'si',admin:'no'},
		  {key:'ver_notas_internas',accion:'Ver notas internas (privadas entre soporte)',usuario:'no',tecnico:'si',lider_tecnico:'si',admin:'si'},
		  {key:'reasignar_derivar',accion:'Reasignar / derivar casos a otro tecnico',usuario:'no',tecnico:'no',lider_tecnico:'si',admin:'no'},
		  {key:'marcar_resuelto_cerrado',accion:'Marcar tickets como resueltos o cerrados',usuario:'no',tecnico:'parcial',lider_tecnico:'si',admin:'no'},
		  {key:'eliminar_tickets',accion:'Eliminar tickets',usuario:'no',tecnico:'no',lider_tecnico:'no',admin:'si'},
		  {key:'gestionar_usuarios',accion:'Gestionar usuarios y roles',usuario:'no',tecnico:'no',lider_tecnico:'no',admin:'si'},
		  {key:'configurar_sistema',accion:'Configurar el sistema (SMTP, SLA, reseteo de datos)',usuario:'no',tecnico:'no',lider_tecnico:'no',admin:'si'},
		  {key:'ver_reportes',accion:'Ver reportes y metricas de rendimiento',usuario:'no',tecnico:'no',lider_tecnico:'no',admin:'si'},
		];
		const PERMISOS_STORAGE_KEY='guita_permisos_roles';
		function cargarPermisos(){
		  try{
		    const raw=localStorage.getItem(PERMISOS_STORAGE_KEY);
		    if(raw){
		      const saved=JSON.parse(raw);
		      // Combina con los valores por defecto para soportar acciones nuevas que no existian al guardar.
		      return PERMISOS_DEFAULT.map(def=>{
		        const found=Array.isArray(saved)?saved.find(s=>s.key===def.key):null;
		        return found?Object.assign({},def,found):Object.assign({},def);
		      });
		    }
		  }catch(e){ /* localStorage no disponible: seguimos con los valores por defecto */ }
		  return PERMISOS_DEFAULT.map(d=>Object.assign({},d));
		}
		let permisosRoles=cargarPermisos();

		// ===== Overrides de permisos POR USUARIO =====
		// Capa individual que se superpone al rol. Estructura:
		//   { 'email@dominio': { 'accion_key': 'si'|'parcial'|'no' }, ... }
		// Sólo se guardan las acciones explícitamente personalizadas; la ausencia de una
		// clave significa "heredar del rol". Resolución final de un permiso:
		//   override del usuario (si existe)  ->  valor del rol  ->  'no'
		const PERMISOS_OVERRIDES_KEY='guita_permisos_overrides';
		function cargarOverrides(){
		  try{
		    const raw=localStorage.getItem(PERMISOS_OVERRIDES_KEY);
		    if(raw){ const o=JSON.parse(raw); if(o&&typeof o==='object') return o; }
		  }catch(e){ /* localStorage no disponible: arrancamos sin overrides */ }
		  return {};
		}
		let permisosOverrides=cargarOverrides();
		function guardarOverrides(){
		  try{ localStorage.setItem(PERMISOS_OVERRIDES_KEY,JSON.stringify(permisosOverrides)); }catch(e){}
		}
		// Devuelve el override explícito de un usuario para una acción, o undefined si hereda del rol.
		function overrideDe(email,accionKey){
		  const ov=email?permisosOverrides[email]:null;
		  return (ov&&Object.prototype.hasOwnProperty.call(ov,accionKey))?ov[accionKey]:undefined;
		}
		// Setea ('si'|'parcial'|'no') o quita (valor null/undefined) el override de un usuario.
		function setOverride(email,accionKey,valor){
		  if(!email)return;
		  if(valor==null){
		    if(permisosOverrides[email]){
		      delete permisosOverrides[email][accionKey];
		      if(Object.keys(permisosOverrides[email]).length===0) delete permisosOverrides[email];
		    }
		    quitarOverrideMeta(email,accionKey);
		  }else{
		    if(!permisosOverrides[email])permisosOverrides[email]={};
		    permisosOverrides[email][accionKey]=valor;
		  }
		  guardarOverrides();
		}

		// ===== Justificación / auditoría de los overrides =====
		// Estructura paralela (no toca el motor de permisos):
		//   { email: { accion_key: { valor, motivo, fecha, por } } }
		const PERMISOS_OVERRIDES_META_KEY='guita_permisos_overrides_meta';
		function cargarOverridesMeta(){
		  try{
		    const raw=localStorage.getItem(PERMISOS_OVERRIDES_META_KEY);
		    if(raw){ const o=JSON.parse(raw); if(o&&typeof o==='object') return o; }
		  }catch(e){}
		  return {};
		}
		let permisosOverridesMeta=cargarOverridesMeta();
		function guardarOverridesMeta(){
		  try{ localStorage.setItem(PERMISOS_OVERRIDES_META_KEY,JSON.stringify(permisosOverridesMeta)); }catch(e){}
		}
		function setOverrideMeta(email,accionKey,meta){
		  if(!email)return;
		  if(!permisosOverridesMeta[email])permisosOverridesMeta[email]={};
		  permisosOverridesMeta[email][accionKey]=meta;
		  guardarOverridesMeta();
		}
		function quitarOverrideMeta(email,accionKey){
		  if(email&&permisosOverridesMeta[email]){
		    delete permisosOverridesMeta[email][accionKey];
		    if(Object.keys(permisosOverridesMeta[email]).length===0) delete permisosOverridesMeta[email];
		    guardarOverridesMeta();
		  }
		}
		function getOverrideMeta(email,accionKey){
		  const m=email?permisosOverridesMeta[email]:null;
		  return (m&&m[accionKey])?m[accionKey]:null;
		}

		// Valor de una acción para un rol concreto.
		function valorRol(accionKey,rolKey){
		  const row=permisosRoles.find(r=>r.key===accionKey);
		  return row?(row[rolKey]||'no'):'no';
		}
		// Cantidad de permisos que se desvían del rol (lo que el usuario ve como "personalizado").
		function cantidadDeviaciones(email,rolKey){
		  const ov=email?permisosOverrides[email]:null;
		  if(!ov)return 0;
		  return Object.keys(ov).filter(k=>ov[k]!==valorRol(k,rolKey)).length;
		}
		// Fecha de hoy en formato dd/mm/aaaa (estilo del resto de la app).
		function fechaHoy(){
		  const d=new Date(),p=n=>String(n).padStart(2,'0');
		  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear();
		}

		// Devuelve 'si' | 'no' | 'parcial' para una accion. Si no se pasa un rol explícito,
		// resuelve para el USUARIO con sesión iniciada: primero su override individual y, si no
		// tiene, el valor de su rol. Pasar un 'role' explícito consulta sólo el nivel de rol.
		function getPermiso(accionKey,role){
		  if(role==null&&currentUserEmail){
		    const ov=overrideDe(currentUserEmail,accionKey);
		    if(ov!==undefined) return ov;
		  }
		  const row=permisosRoles.find(r=>r.key===accionKey);
		  return row?(row[role||currentRole]||'no'):'no';
		}
		// true si el rol puede hacer la accion, aunque sea con restricciones ('si' o 'parcial')
		function puede(accionKey,role){
		  const v=getPermiso(accionKey,role);
		  return v==='si'||v==='parcial';
		}
		// true solo si el rol tiene la accion completamente habilitada ('si')
		function puedeTotal(accionKey,role){
		  return getPermiso(accionKey,role)==='si';
		}
		function permIcon(v){
		  if(v==='si')return '<span class="perm-yes" title="Permitido">\u2713</span>';
		  if(v==='parcial')return '<span class="perm-partial" title="Permitido con restricciones">\u25cf</span>';
		  return '<span class="perm-no" title="No permitido">\u2715</span>';
		}

		// ===== Permisos individuales (overrides) por usuario =====
		// Índice del usuario cuyos permisos se están editando en el modal individual.
		let permisosUsuarioIdx=null;
		// Borrador en memoria: copia de trabajo de los overrides del usuario. Los cambios NO se
		// aplican ni se persisten hasta apretar "Guardar" (y justificar las desviaciones).
		let permisosDraft=null;
		// Etiqueta corta del valor para el chip de "según su rol".
		function permLabel(v){ return v==='si'?'Permitido':v==='parcial'?'Con restricciones':'No permitido'; }
		// Inicializa el borrador a partir de lo guardado, descartando valores que igualen al rol.
		function initDraft(u){
		  const saved=permisosOverrides[u.e]||{};
		  permisosDraft={};
		  Object.keys(saved).forEach(k=>{ if(saved[k]!==valorRol(k,u.rolKey)) permisosDraft[k]=saved[k]; });
		}
		// ¿El borrador difiere de lo guardado? (hay algo para guardar)
		function draftSucio(u){
		  const saved=permisosOverrides[u.e]||{}, d=permisosDraft||{};
		  const keys=new Set([...Object.keys(saved),...Object.keys(d)]);
		  for(const k of keys){
		    const sv=(saved[k]!==undefined&&saved[k]!==valorRol(k,u.rolKey))?saved[k]:undefined;
		    if((d[k]||undefined)!==(sv||undefined))return true;
		  }
		  return false;
		}
		// Construye el cuerpo del modal de permisos de UN usuario (lee del borrador).
		function permisosUsuarioHTML(idx){
		  const u=usuariosData[idx]; if(!u)return '';
		  const rolLabel=rolLabelMap[u.rolKey]||u.r||u.rolKey;
		  const saved=permisosOverrides[u.e]||{};
		  const d=permisosDraft||{};
		  let nDev=0;
		  const filas=permisosRoles.map(p=>{
		    const valRol=valorRol(p.key,u.rolKey);
		    const dv=d[p.key];                       // valor en el borrador (o undefined = hereda)
		    const efVal=dv!==undefined?dv:valRol;    // lo que se mostrará
		    const esDev=dv!==undefined&&dv!==valRol; // desviación respecto del rol
		    const pendiente=esDev&&saved[p.key]!==dv;// desviación nueva o modificada, sin guardar
		    if(esDev)nDev++;
		    let meta='';
		    if(esDev){
		      let tag;
		      if(pendiente){
		        tag=`<span class="ov-tag ov-tag-pending" title="Cambio sin guardar">\u25cf Sin guardar</span>`;
		      }else{
		        const md=getOverrideMeta(u.e,p.key);
		        const tip=md?`Motivo: ${escapeHtml(md.motivo)} \u2014 ${escapeHtml(md.fecha||'')}`:'Permiso personalizado';
		        tag=`<span class="ov-tag ov-tag-custom" title="${tip}">\u270e Personalizado</span>`;
		      }
		      meta=`<div class="ov-meta">${tag}<button type="button" class="ov-revert" onclick="revertirPermisoUsuario('${p.key}')" title="Volver a heredar del rol">\u21a9 Heredar</button></div>`;
		    }
		    const cls=esDev?(pendiente?' ov-pending':' ov-on'):'';
		    return `<tr>
		      <td>${p.accion}</td>
		      <td class="ov-rol-cell"><span class="ov-rol-pill" title="${permLabel(valRol)} para el rol ${escapeHtml(rolLabel)}">${permIcon(valRol)}</span></td>
		      <td class="ov-user-cell">
		        <button type="button" class="perm-cell-btn${cls}" id="ovcell-${p.key}" onclick="ciclarPermisoUsuario('${p.key}')" title="Clic para cambiar entre heredar / \u2713 / \u25cf / \u2715">${permIcon(efVal)}</button>
		        ${meta}
		      </td>
		    </tr>`;
		  }).join('');
		  const sucio=draftSucio(u);
		  return `
		  <div class="ov-user-head">
		    <div class="ov-user-ident">
		      <div class="ov-user-av" style="background:${u.c}">${u.av}</div>
		      <div>
		        <div class="ov-user-name">${escapeHtml(u.n)}</div>
		        <div class="ov-user-mail">${escapeHtml(u.e)}</div>
		      </div>
		    </div>
		    <div class="ov-user-role"><span class="perm-role-dot" style="background:${rolColorMap[u.rolKey]||'#5F6B7A'}"></span>${escapeHtml(rolLabel)}</div>
		  </div>
		  <div class="ov-summary">${nDev>0?`\ud83d\udd27 ${nDev} permiso${nDev===1?'':'s'} distinto${nDev===1?'':'s'} del rol`:'Este usuario hereda todos los permisos de su rol.'}</div>
		  <div class="perm-matrix-wrap ov-wrap">
		    <table class="perm-matrix ov-matrix"><thead><tr><th>Acci\u00f3n</th><th>Seg\u00fan su rol</th><th>Permiso de este usuario</th></tr></thead><tbody>${filas}</tbody></table>
		  </div>
		  <div class="ov-legend-row">
		    <div class="perm-legend">
		      <span><span class="perm-yes">\u2713</span> Permitido</span>
		      <span><span class="perm-partial">\u25cf</span> Con restricciones</span>
		      <span><span class="perm-no">\u2715</span> No permitido</span>
		    </div>
		    <button class="btn-sec btn-sm" onclick="restablecerPermisosUsuario()" ${nDev>0?'':'disabled'}>\u21ba Todos seg\u00fan el rol</button>
		  </div>
		  <div class="perm-matrix-note">\u270f\ufe0f Hac\u00e9 todos los cambios que quieras; reci\u00e9n al guardar vas a justificar las desviaciones del rol.</div>
		  <div class="ov-savebar">
		    <span class="ov-dirty">${sucio?'\u25cf Cambios sin guardar':''}</span>
		    <div style="display:flex;gap:8px">
		      <button class="btn-sec" onclick="cerrarModalPermisosUsuario()">Cancelar</button>
		      <button class="btn-prim" onclick="guardarPermisosUsuario()" ${sucio?'':'disabled'}>Guardar cambios</button>
		    </div>
		  </div>`;
		}
		function refrescarPermisosUsuarioBody(){
		  if(permisosUsuarioIdx===null)return;
		  const body=document.getElementById('permisos-usuario-body');
		  if(body)body.innerHTML=permisosUsuarioHTML(permisosUsuarioIdx);
		}
		// Si el usuario editado es el que tiene la sesión abierta, refresca la app en vivo.
		function refrescoVivoSi(email){
		  if(email===currentUserEmail){ buildSidebar(window.currentView); if(window.currentView)renderView(window.currentView); }
		}
		// Cicla el permiso individual: heredar -> si -> parcial -> no -> heredar.
		function ciclarPermisoUsuario(accionKey){
		  const u=usuariosData[permisosUsuarioIdx]; if(!u||!permisosDraft)return;
		  const rv=valorRol(accionKey,u.rolKey);
		  // El ciclo recorre: heredar (= igual que el rol) -> los dos valores que SÍ difieren del rol.
		  const desvios=['si','parcial','no'].filter(v=>v!==rv);
		  const ciclo=['__heredar__',...desvios];
		  const actual=permisosDraft[accionKey];
		  let idx=(actual===undefined||actual===rv)?0:ciclo.indexOf(actual);
		  if(idx<0)idx=0;
		  const next=ciclo[(idx+1)%ciclo.length];
		  // Sólo afecta el borrador: no se aplica ni se justifica nada hasta apretar "Guardar".
		  if(next==='__heredar__') delete permisosDraft[accionKey];
		  else permisosDraft[accionKey]=next;
		  refrescarPermisosUsuarioBody();
		}
		// Devuelve una acción al valor del rol dentro del borrador.
		function revertirPermisoUsuario(accionKey){
		  if(!permisosDraft)return;
		  delete permisosDraft[accionKey];
		  refrescarPermisosUsuarioBody();
		}
		// Vacía todas las personalizaciones en el borrador (se aplica al guardar).
		function restablecerPermisosUsuario(){
		  if(!permisosDraft)return;
		  permisosDraft={};
		  refrescarPermisosUsuarioBody();
		}

		// ===== Guardado por lotes + justificación obligatoria de las desviaciones =====
		// Calcula los cambios del borrador respecto de lo guardado.
		function calcularCambios(u){
		  const saved=permisosOverrides[u.e]||{}, d=permisosDraft||{};
		  const desviaciones=[]; // nuevas o modificadas (requieren justificación)
		  const removidas=[];    // personalizaciones que vuelven al rol (no requieren justificación)
		  Object.keys(d).forEach(k=>{
		    const rv=valorRol(k,u.rolKey);
		    if(d[k]!==rv && saved[k]!==d[k]){
		      const label=(permisosRoles.find(r=>r.key===k)||{}).accion||k;
		      desviaciones.push({accionKey:k,valor:d[k],rolValor:rv,label});
		    }
		  });
		  Object.keys(saved).forEach(k=>{
		    const savedDev=saved[k]!==valorRol(k,u.rolKey);
		    const draftDev=d[k]!==undefined&&d[k]!==valorRol(k,u.rolKey);
		    if(savedDev&&!draftDev) removidas.push(k);
		  });
		  return {desviaciones,removidas};
		}
		// Aplica al estado real (overrides + auditoría) un lote de cambios ya validado.
		function aplicarCambios(u,desviaciones,removidas,motivo){
		  removidas.forEach(k=>setOverride(u.e,k,null)); // limpia valor + auditoría
		  desviaciones.forEach(c=>{
		    setOverride(u.e,c.accionKey,c.valor);
		    if(motivo) setOverrideMeta(u.e,c.accionKey,{valor:c.valor,motivo,fecha:fechaHoy(),por:currentUserEmail||'admin'});
		  });
		}
		function guardarPermisosUsuario(){
		  const u=usuariosData[permisosUsuarioIdx]; if(!u)return;
		  const {desviaciones,removidas}=calcularCambios(u);
		  if(desviaciones.length===0&&removidas.length===0){ cerrarModalPermisosUsuario(); return; }
		  if(desviaciones.length>0){
		    // Hay desviaciones del rol: exigir justificación antes de aplicar.
		    abrirModalJustificacion(desviaciones,removidas);
		  }else{
		    // Sólo se quitaron personalizaciones (vuelta al rol): no requiere justificación.
		    aplicarCambios(u,[],removidas,null);
		    refrescoVivoSi(u.e);
		    toast('Permisos de '+u.n+' actualizados.');
		    cerrarModalPermisosUsuario();
		  }
		}

		let _justifPend=null; // {email, desviaciones, removidas}
		function abrirModalJustificacion(desviaciones,removidas){
		  const u=usuariosData[permisosUsuarioIdx]; if(!u)return;
		  _justifPend={email:u.e,desviaciones,removidas};
		  const ctx=document.getElementById('justif-context');
		  if(ctx){
		    const filas=desviaciones.map(c=>`<div class="justif-row">
		      <span class="justif-acc">${escapeHtml(c.label)}</span>
		      <span class="justif-change">${permIcon(c.rolValor)} <span class="text-secondary">rol</span> &nbsp;\u2192&nbsp; ${permIcon(c.valor)} <strong>${permLabel(c.valor)}</strong></span>
		    </div>`).join('');
		    const extra=removidas.length?`<div class="justif-extra">Adem\u00e1s se quitar\u00e1n ${removidas.length} personalizaci\u00f3n${removidas.length===1?'':'es'} (vuelven al rol).</div>`:'';
		    ctx.innerHTML=`<div class="justif-userline"><strong>${escapeHtml(u.n)}</strong> \u00b7 <span class="text-secondary">${escapeHtml(rolLabelMap[u.rolKey]||u.r||u.rolKey)}</span></div>
		      <div class="justif-list">${filas}</div>${extra}`;
		  }
		  const ta=document.getElementById('justif-motivo'); if(ta){ta.value='';ta.style.borderColor='';}
		  const err=document.getElementById('justif-err'); if(err)err.style.display='none';
		  document.getElementById('modal-justif-permiso').classList.add('show');
		  setTimeout(()=>{const t=document.getElementById('justif-motivo'); if(t)t.focus();},50);
		}
		function cerrarModalJustificacion(){
		  document.getElementById('modal-justif-permiso').classList.remove('show');
		  _justifPend=null;
		}
		function confirmarJustificacion(){
		  if(!_justifPend)return;
		  const motivo=document.getElementById('justif-motivo').value.trim();
		  const err=document.getElementById('justif-err');
		  const ta=document.getElementById('justif-motivo');
		  if(motivo.length<5){
		    if(err){err.textContent='Indic\u00e1 el motivo del cambio (m\u00ednimo 5 caracteres) para poder guardarlo.';err.style.display='block';}
		    if(ta)ta.style.borderColor='#DC3545';
		    return;
		  }
		  const {email,desviaciones,removidas}=_justifPend;
		  const u=usuariosData[permisosUsuarioIdx];
		  aplicarCambios(u||{e:email},desviaciones,removidas,motivo);
		  cerrarModalJustificacion();
		  refrescoVivoSi(email);
		  toast('Cambios guardados. Las desviaciones quedaron justificadas y registradas.');
		  cerrarModalPermisosUsuario();
		}
		function abrirModalPermisosUsuario(idx){
		  permisosUsuarioIdx=idx;
		  initDraft(usuariosData[idx]);
		  document.getElementById('permisos-usuario-body').innerHTML=permisosUsuarioHTML(idx);
		  document.getElementById('modal-permisos-usuario').classList.add('show');
		}
		function cerrarModalPermisosUsuario(){
		  document.getElementById('modal-permisos-usuario').classList.remove('show');
		  permisosUsuarioIdx=null;
		  permisosDraft=null; // descarta cambios no guardados
		  // Refresca la tabla de usuarios para actualizar el contador de personalizados.
		  if(window.currentView==='usuarios')renderView('usuarios');
		}

		function usuariosHTML(){
		  const rows=usuariosData.map((u,i)=>`<tr style="${u.activo?'':'opacity:0.55'}">
		    <td style="padding:7px 10px"><div style="display:flex;align-items:center;gap:7px"><div style="width:24px;height:24px;border-radius:50%;background:${u.c};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:white;flex-shrink:0">${u.av}</div><div><div style="font-weight:500;font-size:13px">${u.n}</div><div class="text-secondary" style="font-size:11px">${u.e}</div></div></div></td>
		    <td style="padding:7px 10px"><select class="status-select" style="font-size:12px;padding:4px 6px;width:100%" onchange="cambiarRolUsuario(${i},this.value)" ${u.activo?'':'disabled'}><option value="Usuario" ${u.r==='Usuario'?'selected':''}>Usuario</option><option value="Técnico IT" ${u.r==='Técnico IT'?'selected':''}>Técnico IT</option><option value="Líder Técnico" ${u.r==='Líder Técnico'?'selected':''}>Líder Técnico</option><option value="Administrador" ${u.r==='Administrador'?'selected':''}>Administrador</option></select></td>
		    <td style="padding:7px 10px"><span class="badge ${u.activo?'b-resuelto':'b-cerrado'}">${u.activo?'Activo':'Inactivo'}</span></td>
		    <td style="padding:7px 10px"><div style="display:flex;gap:4px;flex-wrap:wrap">
		      <button class="btn-sec btn-sm" onclick="abrirModalEditarUsuario(${i})" ${u.activo?'':'disabled'} title="Editar usuario">✏️ Editar</button>
		      <button class="btn-sec btn-sm" onclick="abrirModalPermisosUsuario(${i})" ${u.activo?'':'disabled'} title="Permisos individuales de este usuario">🔧 Permisos${cantidadDeviaciones(u.e,u.rolKey)>0?` <span class="ov-count">${cantidadDeviaciones(u.e,u.rolKey)}</span>`:''}</button>
		      <button class="btn-sec btn-sm" style="color:${u.activo?'#DC3545':'#1A6B3A'}" onclick="confirmarToggleActivo(${i})" title="${u.activo?'Desactivar':'Activar'} usuario">${u.activo?'Desactivar':'✓ Activar'}</button>
		    </div></td>
		  </tr>`).join('');
		  return`
		<div class="page-header"><h2>Gestión de usuarios y roles</h2><p>Administrá perfiles y permisos de acceso al sistema</p></div>
		<div class="card">
		  <div class="card-toolbar"><span class="card-title">Usuarios del sistema</span><div style="display:flex;gap:8px"><button class="btn-prim btn-sm" onclick="abrirModalNuevoUsuario()">+ Agregar usuario</button></div></div>
		  <table style="table-layout:fixed;width:100%"><thead><tr><th style="width:34%;padding:7px 10px">Usuario</th><th style="width:18%;padding:7px 10px">Rol</th><th style="width:11%;padding:7px 10px">Estado</th><th style="width:37%;padding:7px 10px">Acciones</th></tr></thead><tbody>${rows}</tbody></table>
		</div>`;
		}

		function configHTML(){
		  return`
		<div class="page-header"><h2>Configuración del sistema</h2><p>Parámetros de correo, integraciones y SLA</p></div>
		<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
		  <div class="form-card">
		    <p class="text-head" style="font-size:13px;font-weight:600;margin-bottom:14px">Servidor de correo SMTP</p>
		    <div class="form-group"><label>Host SMTP</label><input value="smtp.allpharma.com"></div>
		    <div class="form-row">
		      <div class="form-group"><label>Puerto</label><input value="587"></div>
		      <div class="form-group"><label>Cifrado</label><select><option>TLS</option><option>SSL</option></select></div>
		    </div>
		    <div class="form-group"><label>Remitente</label><input value="soporte.it@allpharma.com"></div>
		    <div style="display:flex;gap:8px">
		      <button class="btn-prim" onclick="toast('Configuración guardada correctamente.')">Guardar</button>
		      <button class="btn-sec" onclick="toast('Email de prueba enviado a soporte.it@allpharma.com','info')">Probar conexión</button>
		    </div>
		  </div>
		  <div class="form-card">
		    <p class="text-head" style="font-size:13px;font-weight:600;margin-bottom:14px">Parámetros de SLA</p>
		    <div class="form-group"><label>Prioridad Alta — tiempo máx.</label><input value="4 horas"></div>
		    <div class="form-group"><label>Prioridad Media</label><input value="8 horas"></div>
		    <div class="form-group"><label>Prioridad Baja</label><input value="24 horas"></div>
		    <div class="form-group"><label>Servidor LDAP</label><input value="ldap.allpharma.com:389"></div>
		    <button class="btn-prim" onclick="toast('Parámetros de SLA guardados.')">Guardar parámetros</button>
		  </div>
		  <div class="form-card">
		    <p class="text-head" style="font-size:13px;font-weight:600;margin-bottom:14px">Datos de la aplicación</p>
		    <p class="hint" style="margin-bottom:14px">Prototipo: los datos se reinician automáticamente a los valores de ejemplo cada vez que se vuelve a abrir el HTML. Los cambios (alta, edición o baja de tickets) solo se conservan durante la sesión actual. También podés restablecerlos manualmente ahora.</p>
		    <button class="btn-sec" onclick="resetDatos()">Restablecer datos de ejemplo</button>
		  </div>
		</div>`;
		}

		function ayudaHTML(){
		  const pasos=['Hacé clic en "Nuevo ticket" en el menú lateral izquierdo.','Completá el formulario: tipo, categoría, título y descripción detallada.','Hacé clic en "Enviar solicitud" y recibirás confirmación por correo electrónico.'];
		  return`
		<div class="page-header"><h2>Centro de ayuda</h2><p>Guías y preguntas frecuentes del sistema</p></div>
		<div class="card" style="padding:20px;max-width:580px">
		  <p class="text-head" style="font-size:13px;font-weight:600;margin-bottom:14px">Cómo crear un ticket en 3 pasos</p>
		  ${pasos.map((s,i)=>`<div style="display:flex;gap:10px;margin-bottom:12px;align-items:flex-start"><div style="width:24px;height:24px;border-radius:50%;background:#1A4FAD;color:white;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div><p style="font-size:13px;line-height:1.6;margin-top:3px">${s}</p></div>`).join('')}
		  <div style="border-top:1px solid #D0DBEC;padding-top:12px;margin-top:6px">
		    <p class="text-secondary" style="font-size:12px">Contacto soporte IT: <strong>soporte.it@allpharma.com</strong></p>
		  </div>
		</div>`;
		}

		function openTicket(id){
		  const t=tickets.find(x=>x.id===id); if(!t)return;
		  if(currentRole==='tecnico'&&t.nuevo){
		    t.nuevo=false;
		    saveTickets();
		  }
		  // Marcar los comentarios como leídos cuando los ve el soporte (técnico o líder técnico)
		  if(currentRole==='tecnico'||currentRole==='lider_tecnico') marcarMensajesLeidos(id);

		  // Marcar alertas del sistema como leídas al abrir el ticket (soporte)
		  if(esSoporte()) marcarAlertasLeidasTicket(id,tecnicoActualNombre());

		  const mc=document.getElementById('main-content');
		  const isTec=currentRole==='tecnico';
		  const isUsr=currentRole==='usuario';
		  const canValidate=isUsr&&t.estado==='resuelto';
		  const cerrado=t.estado==='cerrado';

		  // ── Construcción de hilos para las pestañas ──────────────────────────────
		  const todosComentarios=t.comentarios||[];
		  const totalInternos=todosComentarios.filter(c=>c.interno).length;
		  const hiloPublico=todosComentarios.filter(c=>!c.interno);
		  const hiloInterno=todosComentarios.filter(c=>c.interno);
		  const hiloCompleto=todosComentarios;
		  function buildThread(lista){
		    return lista.length
		      ? lista.map(c=>comentarioHTML(c)).join('')
		      : `<div class="text-muted" style="font-size:13px;font-style:italic;padding:2px 0 8px">No hay mensajes en esta vista.</div>`;
		  }
		  const threadPublico=buildThread(hiloPublico);
		  const threadInterno=buildThread(hiloInterno);
		  const cntPublico=hiloPublico.length;
		  const cntInterno=hiloInterno.length;

		  // Para usuarios: vista simple sin pestañas
		  const avisoInternos=isUsr&&totalInternos>0
		    ? `<div class="text-secondary bg-soft" style="font-size:11px;border-radius:6px;padding:7px 10px;margin-bottom:8px">ℹ️ El equipo de soporte puede registrar notas internas adicionales no visibles para el usuario.</div>`
		    : '';
		  const hiloUsuario=hiloPublico.length
		    ? hiloPublico.map(c=>comentarioHTML(c)).join('')
		    : `<div class="text-muted" style="font-size:13px;font-style:italic;padding:2px 0 8px">Todavía no hay comentarios en este caso.</div>`;

		  const sistemaEntry=`<div class="tl-item"><div class="tl-dot sys"></div><div><div class="tl-meta">Sistema — ${t.fecha} 08:12</div><div class="tl-text">Ticket creado y asignado automáticamente al equipo de soporte.</div></div></div>`;

		  // Bloque de historial: con pestañas para soporte, simple para usuarios
		  const historialBlock=puedeVerNotasInternas()
		    ? `<div class="hilo-tabs-wrap">
		        <div class="hilo-tabs" role="tablist">
		          <button class="hilo-tab hilo-tab-active" id="htab-pub" role="tab" onclick="switchHiloTab('pub')" aria-selected="true">
		            💬 Historial Público
		            <span class="hilo-tab-count" id="hcount-pub">${cntPublico}</span>
		          </button>
		          <button class="hilo-tab" id="htab-int" role="tab" onclick="switchHiloTab('int')" aria-selected="false">
		            🔒 Notas Internas IT
		            <span class="hilo-tab-count hilo-tab-count-int" id="hcount-int">${cntInterno}</span>
		            ${totalInternos>0?`<span class="hilo-tab-int-badge">${totalInternos}</span>`:''}
		          </button>
		        </div>
		        <div class="hilo-tab-hint" id="htab-hint-pub">Mensajes visibles para el usuario y el equipo técnico.</div>
		        <div class="hilo-tab-hint hilo-tab-hint-int" id="htab-hint-int" style="display:none">Todo el historial, incluyendo apuntes privados solo accesibles para el equipo de soporte.</div>
		        <div id="htab-panel-pub" class="hilo-panel" role="tabpanel">${sistemaEntry}${threadPublico}</div>
		        <div id="htab-panel-int" class="hilo-panel" style="display:none" role="tabpanel">${sistemaEntry}${threadInterno}</div>
		      </div>`
		    : `<h4>💬 Historial de comentarios</h4>${avisoInternos}${sistemaEntry}${hiloUsuario}`;

		  // Caja para escribir (se bloquea automáticamente cuando el ticket está cerrado)
		  const composer=cerrado
		    ? `<div style="border-top:1px solid #E8EEF9;padding-top:14px;margin-top:10px">
		        <div class="bg-soft border-soft text-secondary" style="display:flex;align-items:center;gap:8px;border-radius:8px;padding:10px 12px;font-size:12px">
		          🔒 Este ticket está <strong class="text-strong" style="margin:0 3px">cerrado</strong>. El historial quedó en modo solo lectura y no admite nuevos comentarios.
		        </div>
		      </div>`
		    : (puedeComentar()
		      ? `<div style="border-top:1px solid #E8EEF9;padding-top:14px;margin-top:10px">
		        <p class="text-primary" style="font-size:13px;font-weight:500;margin-bottom:8px">${puedeVerNotasInternas()?'Agregar comentario o nota interna':'Agregar comentario'}</p>
		        <textarea class="text-primary" id="cmt-txt" style="width:100%;border:1px solid #C0CEDF;border-radius:7px;padding:8px 11px;font-size:13px;font-family:Inter,sans-serif;min-height:64px;resize:vertical" placeholder="${puedeVerNotasInternas()?'Mensaje público para el usuario o nota interna del equipo...':'Escribí un comentario para el hilo del caso...'}" onkeydown="if((event.ctrlKey||event.metaKey)&&event.key==='Enter')enviarComentario('${t.id}')"></textarea>
		        ${puedeVerNotasInternas()
		          ? `<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;flex-wrap:wrap;gap:8px">
		              <label class="text-secondary" style="display:flex;align-items:center;gap:7px;font-size:12px;cursor:pointer">
		                <input type="checkbox" id="cmt-interno" style="accent-color:#7C3AED;width:14px;height:14px" onchange="onInternoChange()">
		                <span><strong style="color:#5B2A8C">Nota interna</strong> — solo visible para el equipo técnico</span>
		              </label>
		              <button class="btn-prim btn-sm" id="btn-enviar-cmt" onclick="enviarComentario('${t.id}')">Enviar comentario</button>
		            </div>
		            <div id="interno-aviso" style="display:none;margin-top:8px;background:#F3EAFF;border:1px solid #C084FC;border-radius:7px;padding:8px 11px;font-size:12px;color:#5B2A8C;align-items:center;gap:7px">
		              <span style="font-size:14px;flex-shrink:0">🔒</span>
		              <span>Estás escribiendo una <strong>nota interna</strong>. El usuario final <strong>no verá este mensaje</strong>.</span>
		            </div>`
		          : `<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
		              <span class="text-muted" style="font-size:11px">Ctrl/⌘ + Enter para enviar</span>
		              <button class="btn-prim btn-sm" onclick="enviarComentario('${t.id}')">Enviar comentario</button>
		            </div>`
		        }
		      </div>`
		      : '');

		  // Control de estado del técnico (independiente del hilo de comentarios)
		  const tecnicoOptions=[
		    {val:'—',label:'— Sin asignar —'},
		    ...usuariosData
		      .filter(u=>u.activo&&(u.rolKey==='tecnico'||u.rolKey==='lider_tecnico'))
		      .map(u=>{
		        const parts=u.n.trim().split(/\s+/);
		        const corto=parts[0][0]+'. '+parts.slice(1).join(' ');
		        return{val:corto,label:u.n};
		      })
		  ];
		  const statusControl=isTec
		    ? (cerrado
		      ? `<div style="border-top:1px solid #E8EEF9;padding-top:14px;margin-top:10px">
		          <div class="bg-soft border-soft text-secondary" style="display:flex;align-items:center;gap:8px;border-radius:8px;padding:10px 12px;font-size:12px">
		            🔒 Este ticket está <strong class="text-strong" style="margin:0 3px">cerrado</strong>. No podés modificar el estado ni realizar cambios.
		          </div>
		        </div>`
		      : `<div style="border-top:1px solid #E8EEF9;padding-top:14px;margin-top:10px">
		        <p class="text-primary" style="font-size:13px;font-weight:500;margin-bottom:8px">Cambiar estado del caso</p>
		        <div style="display:flex;align-items:center;gap:8px">
		          <select class="status-select" id="det-status" style="font-size:13px;padding:6px 10px">
		            ${estadoOptionsHTML(t,{pendienteLargo:true,derivadoLargo:true})}
		          </select>
		          <button class="btn-prim btn-sm" onclick="applyStatus('${t.id}')">Guardar estado</button>
		        </div>
		      </div>`)
		    : currentRole==='lider_tecnico'
		    ? `<div>
		        <h4>⚙️ Panel de Gestión</h4>
		        <div style="margin-bottom:12px">
		          <label class="text-primary" style="display:block;font-size:12px;font-weight:500;margin-bottom:5px">Estado del caso</label>
		          <select class="status-select" id="det-status" style="font-size:13px;padding:6px 10px;width:100%">
		            ${estadoOptionsHTML(t,{includeAbierto:true,includeCerrado:true,pendienteLargo:true,derivadoLargo:true})}
		          </select>
		        </div>
		        <div style="margin-bottom:14px">
		          <label class="text-primary" style="display:block;font-size:12px;font-weight:500;margin-bottom:5px">Técnico asignado</label>
		          <select class="status-select" id="det-tecnico" style="font-size:13px;padding:6px 10px;width:100%">
		            ${tecnicoOptions.map(o=>`<option value="${o.val}" ${t.tecnico===o.val?'selected':''}>${o.label}</option>`).join('')}
		          </select>
		        </div>
		        <button class="btn-prim btn-sm" style="width:100%" onclick="applyGestion('${t.id}')">Guardar cambios</button>
		      </div>`
		    : '';

		  mc.innerHTML=`
		<div class="breadcrumb"><a onclick="renderView('dashboard')">← Inicio</a> / <span style="color:#1A4FAD">${t.id}</span></div>
		<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
		  <div>
		    <h2 class="text-head" style="font-size:16px;font-weight:600;margin-bottom:7px">${t.titulo}</h2>
		    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">${badge(t.estado)} ${dotPri(t.prio)} <span class="text-secondary" style="font-size:12px">Creado: ${t.fecha}</span></div>
		  </div>
		  <div style="display:flex;gap:8px">
		    ${canValidate?`<button class="btn-prim btn-sm" onclick="validarOK('${t.id}')">✓ Validar resolución</button>`:''}
		    <button class="btn-sec btn-sm" onclick="renderView('dashboard')">← Cerrar</button>
		  </div>
		</div>
		<div class="detail-layout">
		  <div class="info-panel">
		    <h4>Descripción del problema</h4>
		    <p class="text-primary" style="font-size:13px;line-height:1.65;margin-bottom:18px">${t.desc}</p>
		    ${historialBlock}
		    ${composer}
		    ${isTec?statusControl:''}
		  </div>
		  <div style="display:flex;flex-direction:column;gap:12px">
		    <div class="info-panel">
		      <h4>Detalles del ticket</h4>
		      <div class="info-row"><span class="ilabel">Estado</span>${badge(t.estado)}</div>
		      <div class="info-row"><span class="ilabel">Prioridad</span>${dotPri(t.prio)}</div>
		      <div class="info-row"><span class="ilabel">Categoría</span><span style="font-size:13px">${t.cat}</span></div>
		      <div class="info-row"><span class="ilabel">Solicitante</span><span style="font-size:13px;display:flex;align-items:center;gap:5px"><span style="width:20px;height:20px;border-radius:50%;background:#1A4FAD;color:white;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">${(t.solicitante||'?').charAt(0)}</span>${escapeHtml(t.solicitante||'No registrado')}</span></div>
		      <div class="info-row"><span class="ilabel">Técnico</span><span style="font-size:13px">${t.tecnico}</span></div>
		      <div class="info-row"><span class="ilabel">Creado</span><span style="font-size:13px">${t.fecha}</span></div>
		    </div>
		    ${currentRole==='lider_tecnico'?`<div class="info-panel">${statusControl}</div>`:''}
		    <div class="info-panel">
		      <h4>Estado SLA</h4>
		      <div style="font-size:12px">
		        <div style="display:flex;justify-content:space-between;margin-bottom:5px"><span class="text-secondary">Tiempo restante</span><span style="font-weight:600;color:#B07B00">2h 30m</span></div>
		        <div class="sla-bar-wrap"><div class="sla-bar" style="width:68%"></div></div>
		        <p class="text-secondary" style="margin-top:6px;font-size:11px">Vencimiento: 25/04/2026 17:00</p>
		      </div>
		    </div>
		  </div>
		</div>`;
		}

		// ===== Pestañas de historial (Historial Público / Notas Internas IT) =====
		function switchHiloTab(tab){
		  const pubBtn=document.getElementById('htab-pub');
		  const intBtn=document.getElementById('htab-int');
		  const pubPanel=document.getElementById('htab-panel-pub');
		  const intPanel=document.getElementById('htab-panel-int');
		  const hintPub=document.getElementById('htab-hint-pub');
		  const hintInt=document.getElementById('htab-hint-int');
		  if(!pubBtn||!intBtn)return;
		  if(tab==='pub'){
		    pubBtn.classList.add('hilo-tab-active'); intBtn.classList.remove('hilo-tab-active');
		    pubBtn.setAttribute('aria-selected','true'); intBtn.setAttribute('aria-selected','false');
		    if(pubPanel)pubPanel.style.display=''; if(intPanel)intPanel.style.display='none';
		    if(hintPub)hintPub.style.display=''; if(hintInt)hintInt.style.display='none';
		  }else{
		    intBtn.classList.add('hilo-tab-active'); pubBtn.classList.remove('hilo-tab-active');
		    intBtn.setAttribute('aria-selected','true'); pubBtn.setAttribute('aria-selected','false');
		    if(intPanel)intPanel.style.display=''; if(pubPanel)pubPanel.style.display='none';
		    if(hintInt)hintInt.style.display=''; if(hintPub)hintPub.style.display='none';
		  }
		}
		// Cambia el color del botón "Enviar" y muestra/oculta el aviso de nota interna
		function onInternoChange(){
		  const chk=document.getElementById('cmt-interno');
		  const btn=document.getElementById('btn-enviar-cmt');
		  const aviso=document.getElementById('interno-aviso');
		  const ta=document.getElementById('cmt-txt');
		  if(!chk)return;
		  const activo=chk.checked;
		  if(btn){
		    btn.style.background=activo?'#6D28D9':'';
		    btn.style.borderColor=activo?'#5B21B6':'';
		    btn.style.boxShadow=activo?'0 0 0 2px rgba(109,40,217,0.18)':'';
		    btn.textContent=activo?'🔒 Guardar nota interna':'Enviar comentario';
		  }
		  if(aviso){
		    aviso.style.display=activo?'flex':'none';
		  }
		  if(ta){
		    ta.style.borderColor=activo?'#C084FC':'';
		    ta.style.boxShadow=activo?'0 0 0 2px rgba(192,132,252,0.18)':'';
		    ta.placeholder=activo?'Apunte privado del equipo de soporte (el usuario no lo verá)...':'Mensaje público para el usuario o nota interna del equipo...';
		  }
		}

		function applyStatus(id){
		  const sel=document.getElementById('det-status'); if(!sel)return;
		  const t=tickets.find(x=>x.id===id); if(!t)return;
		  if(t.estado==='cerrado'){ toast('Este ticket está cerrado y no puede ser modificado.','warn'); return; }
		  const prevEstado=t.estado;
		  t.estado=sel.value;
		  aplicarReglaDerivado(t);
		  if(t.estado==='derivado'&&prevEstado!=='derivado'){
		    registrarAlerta(t.tecnico,id,'Ticket derivado y escalado a tu bandeja.');
		  }
		  if(t.estado==='resuelto'&&prevEstado!=='resuelto'){
		    registrarAlertaUsuario(id,'validar','Tu ticket fue marcado como resuelto. ¿Podés confirmar que el problema está solucionado?');
		  }
		  saveTickets();
		  toast('Estado actualizado a: '+sel.options[sel.selectedIndex].text+(t.estado==='derivado'?'. Reasignado a '+t.tecnico+'.':''));
		}

		function applyGestion(id){
		  const selEstado=document.getElementById('det-status');
		  const selTec=document.getElementById('det-tecnico');
		  if(!selEstado||!selTec)return;
		  if(selEstado.value==='cerrado'){
		    abrirModalCierre(id);
		    return;
		  }
		  const t=tickets.find(x=>x.id===id); if(!t)return;
		  const prevTecnico=t.tecnico;
		  const prevEstado=t.estado;
		  t.estado=selEstado.value;
		  t.tecnico=selTec.value;
		  aplicarReglaDerivado(t);
		  if(t.estado==='derivado'&&prevEstado!=='derivado'){
		    registrarAlerta(t.tecnico,id,'Ticket derivado y escalado a tu bandeja.');
		  }else if(t.tecnico!==prevTecnico&&t.tecnico!=='—'){
		    t.nuevo=true;
		    registrarAlerta(t.tecnico,id,'El Líder Técnico te asignó el ticket '+id+'.');
		  }
		  if(t.estado==='resuelto'&&prevEstado!=='resuelto'){
		    registrarAlertaUsuario(id,'validar','Tu ticket fue marcado como resuelto. ¿Podés confirmar que el problema está solucionado?');
		  }
		  saveTickets();
		  const estadoLabel=selEstado.options[selEstado.selectedIndex].text;
		  const tecLabel=selTec.options[selTec.selectedIndex].text;
		  toast('Cambios guardados — Estado: '+estadoLabel+' · Técnico: '+tecLabel);
		  openTicket(id);
		}

		let _cierreTicketId=null;
		function abrirModalCierre(id){
		  _cierreTicketId=id;
		  const ta=document.getElementById('cierre-justificacion');
		  if(ta){ta.value='';ta.style.borderColor='';}
		  const err=document.getElementById('cierre-err');
		  if(err)err.style.display='none';
		  document.getElementById('modal-cierre').classList.add('show');
		}
		function cerrarModalCierre(){
		  document.getElementById('modal-cierre').classList.remove('show');
		  _cierreTicketId=null;
		}
		function confirmarCierre(){
		  const ta=document.getElementById('cierre-justificacion');
		  const err=document.getElementById('cierre-err');
		  const texto=(ta?ta.value:'').trim();
		  if(!texto){
		    if(ta)ta.style.borderColor='#DC3545';
		    if(err)err.style.display='block';
		    return;
		  }
		  const id=_cierreTicketId;
		  const t=tickets.find(x=>x.id===id); if(!t)return;
		  const selTec=document.getElementById('det-tecnico');
		  const prevTecnico=t.tecnico;
		  if(selTec) t.tecnico=selTec.value;
		  if(t.tecnico!==prevTecnico&&t.tecnico!=='—') t.nuevo=true;
		  t.estado='cerrado';
		  if(!Array.isArray(t.comentarios))t.comentarios=[];
		  const ahora=new Date();
		  t.comentarios.push({
		    id:'cmt-'+Date.now(),
		    autor:roles[currentRole].name,
		    rol:currentRole,
		    fecha:ahora.toLocaleDateString('es-AR'),
		    hora:ahora.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'}),
		    texto:'🔒 Cierre administrativo — '+texto,
		    interno:false,
		    leido:true
		  });
		  saveTickets();
		  cerrarModalCierre();
		  toast('Ticket '+id+' cerrado administrativamente.');
		  openTicket(id);
		}
		function enviarComentario(ticketId){
		  const t=tickets.find(x=>x.id===ticketId); if(!t)return;
		  if(t.estado==='cerrado'){ toast('El ticket está cerrado: el historial es de solo lectura.','warn'); return; }
		  if(!puedeComentar())return;
		  const ta=document.getElementById('cmt-txt');
		  if(!ta)return;
		  const texto=ta.value.trim();
		  if(!texto){ta.style.borderColor='#DC3545';return;}
		  ta.style.borderColor='';
		  const esInterno=puedeVerNotasInternas()&&!!document.getElementById('cmt-interno')?.checked;
		  const ahora=new Date();
		  const c={
		    id:'cmt-'+Date.now(),
		    autor:roles[currentRole].name,
		    rol:currentRole,
		    fecha:ahora.toLocaleDateString('es-AR'),
		    hora:ahora.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'}),
		    texto,
		    interno:esInterno,
		    leido: currentRole!=='usuario'
		  };
		  if(!Array.isArray(t.comentarios))t.comentarios=[];
		  t.comentarios.push(c);
		  saveTickets();
		  if(currentRole==='usuario'&&t.tecnico&&t.tecnico!=='—'){
		    registrarAlerta(t.tecnico,ticketId,'Nuevo mensaje público del usuario en el ticket.');
		  }
		  // Si soporte comenta de forma pública → notificar al usuario
		  if(currentRole!=='usuario'&&!esInterno){
		    const titulo=t.titulo.length>50?t.titulo.slice(0,47)+'…':t.titulo;
		    registrarAlertaUsuario(ticketId,'mensaje','El técnico respondió en tu ticket: '+titulo+'.');
		  }
		  ta.value='';
		  const chk=document.getElementById('cmt-interno');
		  if(chk){chk.checked=false;onInternoChange();}
		  toast(
		    currentRole==='usuario'?'Comentario enviado al técnico asignado.'
		    :esInterno?'Nota interna registrada en el historial del caso.'
		    :'Comentario público agregado al historial del caso.'
		  );
		  openTicket(ticketId);
		}
		function validarOK(id){
  const t=tickets.find(x=>x.id===id); if(t)t.estado='cerrado';
  saveTickets();
  toast('Resolución validada. Ticket cerrado correctamente. ¡Gracias!');
  setTimeout(()=>showRatingModal(id),1400);
}
	
		function changeStatus(id,val){
		  const t=tickets.find(x=>x.id===id);
		  if(t&&t.estado==='cerrado'){ toast('Este ticket está cerrado y no puede ser modificado.','warn'); renderTicketeraTabla(); return; }
		  if(t){t.estado=val; aplicarReglaDerivado(t);}
		  saveTickets();
		  toast(t&&t.estado==='derivado'?'Ticket '+id+' derivado y reasignado a '+t.tecnico+' (Líder Técnico).':'Estado de '+id+' actualizado correctamente.');
		  renderTicketeraTabla();
		}
		function submitTicket(){
		  let ok=true;
		  [['f-tipo','e-tipo'],['f-cat','e-cat'],['f-titulo','e-titulo'],['f-desc','e-desc']].forEach(([fid,eid])=>{
		    const el=document.getElementById(fid),er=document.getElementById(eid);
		    if(el&&!el.value.trim()){er.style.display='block';el.style.borderColor='#DC3545';ok=false;}
		    else{if(er)er.style.display='none';if(el)el.style.borderColor='';}
		  });
		  if(!ok)return;
		  const id=nextTicketId();
		  tickets.unshift({id,titulo:document.getElementById('f-titulo').value,cat:document.getElementById('f-cat').value,estado:'abierto',prio:'media',tecnico:'—',fecha:new Date().toLocaleDateString('es-AR'),solicitante:roles[currentRole].name,desc:document.getElementById('f-desc').value});
		  saveTickets();
		  toast('Ticket '+id+' creado. Recibirás confirmación por correo.');
		  setTimeout(()=>renderView('dashboard'),1400);
		}
		function filterMis(el,f){
		  document.querySelectorAll('#main-content .chip').forEach(c=>c.classList.remove('on'));
		  el.classList.add('on');
		  misEstado=f||'todos';
		  renderMisTabla();
		}
		function buscarMis(val){
		  misBusqueda=val;
		  renderMisTabla();
		}

		
function nuevoTicketLiderHTML(){
  const tecnicos=['Carlos Méndez','Ana Rivero','Jorge Pérez','María López','Técnico Común'];
  const opsTec=tecnicos.map(n=>`<option value="${n}">${n}</option>`).join('');
  return`
<div class="breadcrumb"><a onclick="renderView('dashboard')">← Inicio</a> / <span style="color:#1A4FAD">Nuevo ticket</span></div>
<div class="page-header"><h2>Crear nuevo ticket</h2><p>Completá el formulario. Si dejás el técnico vacío, el ticket queda sin asignar.</p></div>
<div class="form-card" style="max-width:660px">

  <div class="form-group">
    <label>Título <span class="req">*</span></label>
    <input type="text" id="lt-titulo" placeholder="Ej: Falla en servidor de archivos — Piso 3">
    <p class="err-msg" id="lt-err-titulo">Este campo es obligatorio.</p>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label>Categoría <span class="req">*</span></label>
      <select id="lt-cat">
        <option value="">Seleccioná...</option>
        <option>Hardware</option>
        <option>Software</option>
        <option>Redes / Conectividad</option>
        <option>Accesos y permisos</option>
        <option>Impresoras / Periféricos</option>
      </select>
      <p class="err-msg" id="lt-err-cat">Este campo es obligatorio.</p>
    </div>
    <div class="form-group">
      <label>Prioridad</label>
      <select id="lt-prio">
        <option value="baja">Baja</option>
        <option value="media" selected>Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label>Descripción <span class="req">*</span></label>
    <textarea id="lt-desc" placeholder="Describí el problema o tarea a resolver..."></textarea>
    <p class="err-msg" id="lt-err-desc">Este campo es obligatorio.</p>
  </div>

  <div class="form-group" style="border-top:1px solid #E8EEF9;padding-top:18px;margin-top:4px">
    <label>Asignar a técnico <span class="text-secondary" style="font-weight:400">(opcional)</span></label>
    <select id="lt-tecnico">
      <option value="">— Sin asignar —</option>
      ${opsTec}
    </select>
    <p class="hint">Si no seleccionás ninguno, el ticket queda disponible en la bandeja para ser tomado.</p>
  </div>

  <div style="display:flex;gap:10px;margin-top:8px">
    <button class="btn-sec" onclick="renderView('dashboard')">Cancelar</button>
    <button class="btn-prim" onclick="submitTicketLider()">Crear ticket</button>
  </div>
</div>`;
}

function submitTicketLider(){
  const titulo=document.getElementById('lt-titulo').value.trim();
  const desc=document.getElementById('lt-desc').value.trim();
  const prio=document.getElementById('lt-prio').value;
  const cat=document.getElementById('lt-cat').value;
  const tecnicoRaw=document.getElementById('lt-tecnico').value;
  const tecnico=tecnicoRaw?nombreCortoTecnico(tecnicoRaw):'—';

  ['lt-err-titulo','lt-err-cat','lt-err-desc'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.style.display='none';
  });
  ['lt-titulo','lt-cat','lt-desc'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.style.borderColor='';
  });

  let ok=true;
  if(!titulo){document.getElementById('lt-err-titulo').style.display='block';document.getElementById('lt-titulo').style.borderColor='#DC3545';ok=false;}
  if(!cat){document.getElementById('lt-err-cat').style.display='block';document.getElementById('lt-cat').style.borderColor='#DC3545';ok=false;}
  if(!desc){document.getElementById('lt-err-desc').style.display='block';document.getElementById('lt-desc').style.borderColor='#DC3545';ok=false;}
  if(!ok)return;

  const id=nextTicketId();
  const estado=tecnico!=='—'?'progreso':'abierto';
  tickets.unshift({id,titulo,cat,estado,prio,tecnico,fecha:new Date().toLocaleDateString('es-AR'),desc,nuevo:tecnico!=='—'});
  if(tecnico!=='—') registrarAlerta(tecnico,id,'Ticket asignado por el Líder Técnico.');
  saveTickets();
  const msg=tecnico!=='—'
    ?`Ticket ${id} creado y asignado a ${tecnicoRaw}.`
    :`Ticket ${id} creado. Quedó sin asignar en la bandeja.`;
  toast(msg);
  setTimeout(()=>renderView('ticketera'),900);
}

		function slaHTML(){
		  const dk=isDark();
		  const cardBg=dk?'#161B22':'white';
		  const cardBorder=dk?'#263354':'#D0DBEC';
		  const headBg=dk?'#1A2030':'#F0F4FA';
		  const rowBorder=dk?'#1A2540':'#F0F4FA';
		  const cellPrimary=dk?'#82AADF':'#0F3580';
		  const cellText=dk?'#CDD9F0':'#1A2440';
		  const thColor=dk?'#7A91B5':'#5F6B7A';
		  const trackBg=dk?'#1A2540':'#E5E7EB';
		  const subColor=dk?'#7A91B5':'#5F6B7A';
		  const data=[
		    {nombre:'Carlos Méndez',asignados:8,resueltos:6,enTiempo:5,vencidos:1,cumplimiento:83},
		    {nombre:'Ana Rivero',asignados:5,resueltos:5,enTiempo:5,vencidos:0,cumplimiento:100},
		    {nombre:'Jorge Pérez',asignados:10,resueltos:7,enTiempo:5,vencidos:2,cumplimiento:71},
		    {nombre:'María López',asignados:6,resueltos:6,enTiempo:6,vencidos:0,cumplimiento:100},
		  ];
		  const rows=data.map(d=>{
		    const color=d.cumplimiento>=90?'#065F46':d.cumplimiento>=70?'#92400E':'#B91C1C';
		    const bg=d.cumplimiento>=90?'#D1FAE5':d.cumplimiento>=70?'#FEF3C7':'#FEE2E2';
		    const barColor=d.cumplimiento>=90?'#10B981':d.cumplimiento>=70?'#F59E0B':'#EF4444';
		    const badgeBg=dk?(d.cumplimiento>=90?'#052e16':d.cumplimiento>=70?'#2d1b00':'#2d0505'):bg;
		    const badgeColor=dk?(d.cumplimiento>=90?'#4ade80':d.cumplimiento>=70?'#fbbf24':'#f87171'):color;
		    return `<tr style="border-bottom:1px solid ${rowBorder}">
		      <td style="padding:12px 14px;font-size:13px;font-weight:500;color:${cellText}">${d.nombre}</td>
		      <td style="padding:12px 14px;text-align:center;font-size:13px;color:${cellPrimary};font-weight:600">${d.asignados}</td>
		      <td style="padding:12px 14px;text-align:center;font-size:13px;color:${cellText}">${d.resueltos}</td>
		      <td style="padding:12px 14px;text-align:center"><span style="color:#EF4444;font-weight:600;font-size:13px">${d.vencidos}</span></td>
		      <td style="padding:12px 14px">
		        <div style="display:flex;align-items:center;gap:8px">
		          <div style="flex:1;background:${trackBg};border-radius:20px;height:8px;overflow:hidden">
		            <div style="width:${d.cumplimiento}%;height:100%;background:${barColor};border-radius:20px;transition:width 0.4s"></div>
		          </div>
		          <span style="background:${badgeBg};color:${badgeColor};padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap">${d.cumplimiento}%</span>
		        </div>
		      </td>
		    </tr>`;
		  }).join('');
		  const promedio=Math.round(data.reduce((a,d)=>a+d.cumplimiento,0)/data.length);
		  return `<div class="page-header"><h2>📈 Monitoreo SLA</h2><p>Seguimiento del cumplimiento de acuerdos de nivel de servicio</p></div>
		  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
		    <div style="background:${cardBg};border-radius:12px;border:1px solid ${cardBorder};padding:18px;text-align:center">
		      <div style="font-size:28px;font-weight:700;color:${cellPrimary}">${data.reduce((a,d)=>a+d.asignados,0)}</div>
		      <div style="font-size:12px;color:${subColor};margin-top:4px">Tickets activos</div>
		    </div>
		    <div style="background:${cardBg};border-radius:12px;border:1px solid ${cardBorder};padding:18px;text-align:center">
		      <div style="font-size:28px;font-weight:700;color:#EF4444">${data.reduce((a,d)=>a+d.vencidos,0)}</div>
		      <div style="font-size:12px;color:${subColor};margin-top:4px">SLA vencidos</div>
		    </div>
		    <div style="background:${cardBg};border-radius:12px;border:1px solid ${cardBorder};padding:18px;text-align:center">
		      <div style="font-size:28px;font-weight:700;color:${promedio>=80?'#10B981':'#F59E0B'}">${promedio}%</div>
		      <div style="font-size:12px;color:${subColor};margin-top:4px">Cumplimiento promedio</div>
		    </div>
		  </div>
		  <div style="background:${cardBg};border-radius:12px;border:1px solid ${cardBorder};overflow:hidden">
		    <table style="width:100%;border-collapse:collapse">
		      <thead><tr style="background:${headBg};border-bottom:1px solid ${cardBorder}">
		        <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:${thColor};text-transform:uppercase;letter-spacing:0.05em">Técnico</th>
		        <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:${thColor};text-transform:uppercase;letter-spacing:0.05em">Asignados</th>
		        <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:${thColor};text-transform:uppercase;letter-spacing:0.05em">Resueltos</th>
		        <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:${thColor};text-transform:uppercase;letter-spacing:0.05em">Vencidos</th>
		        <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:${thColor};text-transform:uppercase;letter-spacing:0.05em">Cumplimiento SLA</th>
		      </tr></thead>
		      <tbody>${rows}</tbody>
		    </table>
		  </div>`;
		}

		function togglePass(){
  const inp=document.getElementById('l-pass');
  const btn=document.getElementById('btn-eye');
  const show=inp.type==='password';
  inp.type=show?'text':'password';
  btn.innerHTML=show
    ?'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
    :'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}// ===== Modal de calificación =====
function avgSatisfaction(){
  if(!calificaciones.length)return{val:'—',sub:'Sin valoraciones aún',color:'#5F6B7A'};
  const avg=calificaciones.reduce((a,c)=>a+c.score,0)/calificaciones.length;
  const color=avg>=4?'#1A6B3A':avg>=3?'#B07B00':'#DC3545';
  return{val:avg.toFixed(1)+'/5',sub:calificaciones.length+' valoración'+(calificaciones.length!==1?'es':''),color};
}
function renderStars(n){
  const row=document.getElementById('stars-row');
  if(!row)return;
  row.querySelectorAll('.star-btn').forEach(btn=>{
    btn.classList.toggle('lit', +btn.dataset.val<=n);
  });
}
function buildStars(){
  const row=document.getElementById('stars-row');
  if(!row)return;
  row.innerHTML=[1,2,3,4,5].map(i=>`<button class="star-btn" data-val="${i}">\u2605</button>`).join('');
  row.querySelectorAll('.star-btn').forEach(btn=>{
    const val=+btn.dataset.val;
    btn.onmouseenter=()=>renderStars(val);
    btn.onclick=()=>{
      ratingSelected=val;
      renderStars(val);
      document.getElementById('btn-submit-rating').disabled=false;
    };
  });
  row.onmouseleave=()=>renderStars(ratingSelected);
}
function showRatingModal(id){
  ratingTicketId=id; ratingSelected=0;
  document.getElementById('modal-rating').classList.add('show');
  document.getElementById('btn-submit-rating').disabled=true;
  const ta=document.getElementById('rating-comment');
  if(ta){ta.value='';ta.style.borderColor='#C0CEDF';}
  buildStars();
  renderStars(0);
}
function closeRatingModal(){
  document.getElementById('modal-rating').classList.remove('show');
  renderView('dashboard');
}
function submitRating(){
  if(!ratingSelected)return;
  const comentario=(document.getElementById('rating-comment')||{}).value||'';
  calificaciones.push({ticketId:ratingTicketId,score:ratingSelected,comentario:comentario.trim(),tecnico:tickets.find(x=>x.id===ratingTicketId)?.tecnico||'—'});
  saveCalificaciones();
  document.getElementById('modal-rating').classList.remove('show');
  toast('¡Gracias! Tu calificación fue registrada correctamente.');
  renderView('dashboard');
}

// ===== Editar / Eliminar tickets =====
let editingTicketId=null;

function editTicket(id,event){
  if(event)event.stopPropagation();
  if(currentRole==='tecnico')return; // El técnico común no puede editar tickets desde la bandeja
  const t=tickets.find(x=>x.id===id); if(!t)return;
  if(t.estado==='cerrado'&&currentRole!=='admin'){ toast('Este ticket está cerrado y no puede ser modificado.','warn'); return; }
  editingTicketId=id;
  document.getElementById('et-ticket-id').textContent=t.id;
  document.getElementById('et-titulo').value=t.titulo;
  document.getElementById('et-cat').value=t.cat;
  document.getElementById('et-prio').value=t.prio;
  document.getElementById('et-desc').value=t.desc;
  document.getElementById('et-err').style.display='none';
  ['et-titulo','et-cat','et-desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.borderColor='';});

  const gestion=document.getElementById('et-row-gestion');
  const esGestor=currentRole!=='usuario';
  gestion.style.display=esGestor?'':'none';
  if(esGestor){
    document.getElementById('et-estado').value=t.estado;
    document.getElementById('et-tecnico').value=t.tecnico==='—'?'':t.tecnico;
    onEtEstadoChange();
  }
  document.getElementById('et-subtitle').textContent=esGestor
    ?'Modificá los datos, estado y asignación del ticket'
    :'Podés modificar tu solicitud mientras esté abierta';
  document.getElementById('modal-editar-ticket').classList.add('show');
}

function closeModalEditarTicket(){
  document.getElementById('modal-editar-ticket').classList.remove('show');
  editingTicketId=null;
}

// Si en el modal de edición se elige "Derivado", el ticket se reasigna automáticamente
// al Líder Técnico y el campo de técnico se bloquea para reflejarlo.
function onEtEstadoChange(){
  const estado=document.getElementById('et-estado').value;
  const tecInput=document.getElementById('et-tecnico');
  if(estado==='derivado'){
    tecInput.value=liderTecnicoNombre();
    tecInput.disabled=true;
  }else{
    tecInput.disabled=false;
  }
}

function saveEditTicket(){
  const t=tickets.find(x=>x.id===editingTicketId); if(!t)return;
  const titulo=document.getElementById('et-titulo').value.trim();
  const cat=document.getElementById('et-cat').value;
  const desc=document.getElementById('et-desc').value.trim();
  const prio=document.getElementById('et-prio').value;
  const err=document.getElementById('et-err');

  ['et-titulo','et-cat','et-desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.borderColor='';});
  let ok=true;
  if(!titulo){document.getElementById('et-titulo').style.borderColor='#DC3545';ok=false;}
  if(!cat){document.getElementById('et-cat').style.borderColor='#DC3545';ok=false;}
  if(!desc){document.getElementById('et-desc').style.borderColor='#DC3545';ok=false;}
  if(!ok){err.style.display='block';return;}
  err.style.display='none';

  t.titulo=titulo; t.cat=cat; t.prio=prio; t.desc=desc;
  if(currentRole!=='usuario'){
    const prevTecnico=t.tecnico;
    const prevEstado=t.estado;
    t.estado=document.getElementById('et-estado').value;
    const tec=document.getElementById('et-tecnico').value.trim();
    t.tecnico=tec||'—';
    aplicarReglaDerivado(t);
    if(t.estado==='derivado'&&prevEstado!=='derivado'){
      registrarAlerta(t.tecnico,t.id,'Ticket derivado y escalado a tu bandeja.');
    }else if(t.tecnico!==prevTecnico&&t.tecnico!=='—'){
      t.nuevo=true;
      registrarAlerta(t.tecnico,t.id,'El Líder Técnico te asignó el ticket '+t.id+'.');
    }
  }
  saveTickets();
  closeModalEditarTicket();
  toast('Ticket '+t.id+' actualizado correctamente.');
  if(currentRole==='usuario') renderView('mis-tickets');
  else renderTicketeraTabla();
}

let _pendingDeleteId=null;
function deleteTicket(id,event){
  if(event)event.stopPropagation();
  if(!puede('eliminar_tickets')){ toast('Tu rol no tiene permiso para eliminar tickets.','warn'); return; }
  const t=tickets.find(x=>x.id===id); if(!t)return;
  _pendingDeleteId=id;
  const lbl=document.getElementById('elim-ticket-id');
  if(lbl)lbl.textContent=id;
  document.getElementById('modal-eliminar-ticket').classList.add('show');
}
function cerrarModalEliminarTicket(){
  _pendingDeleteId=null;
  document.getElementById('modal-eliminar-ticket').classList.remove('show');
}
function ejecutarEliminarTicket(){
  const id=_pendingDeleteId; if(!id)return;
  const idx=tickets.findIndex(x=>x.id===id);
  if(idx===-1){cerrarModalEliminarTicket();return;}
  tickets.splice(idx,1);
  saveTickets();
  cerrarModalEliminarTicket();
  toast('Ticket '+id+' eliminado correctamente.');
  if(currentRole==='usuario') renderMisTabla();
  else renderTicketeraTabla();
}

// ===== Exportar reportes (CSV) =====
function exportTicketsCSV(list,filenameBase){
  list=list&&list.length?list:tickets;
  filenameBase=filenameBase||'tickets_guita';
  const headers=['ID','Título','Categoría','Estado','Prioridad','Técnico','Fecha','Descripción'];
  const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const lines=[headers.map(esc).join(',')];
  list.forEach(t=>{
    lines.push([t.id,t.titulo,t.cat,t.estado,t.prio,t.tecnico,t.fecha,t.desc].map(esc).join(','));
  });
  const csv='\ufeff'+lines.join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const fecha=new Date().toISOString().slice(0,10);
  const a=document.createElement('a');
  a.href=url; a.download=filenameBase+'_'+fecha+'.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Reporte exportado: '+a.download+' ('+list.length+' tickets).','info');
}