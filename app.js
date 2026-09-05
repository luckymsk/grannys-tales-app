/* Granny's Tales — family app. Vanilla JS. All tale text comes verbatim from tales.json. */
'use strict';

/* ---------------- Config ---------------- */
const SUPABASE_URL = 'https://tytxxzhhuigeglhwiwjj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dHh4emhodWlnZWdsaHdpd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1OTc5NDEsImV4cCI6MjEwNDE3Mzk0MX0.XdQhebfkNX8CLRrijaU5Bz0H03yLmoVBjEH2rUc1Weg';
const LS = { ui: 'gt_ui', profile: 'gt_profile_id', narration: 'gt_narration' };

/* ---------------- UI strings (EN/ES/FR) ---------------- */
const STR = {
  en: {
    tagline: "Stories from every corner of the world", search: "Search tales…", all: "All",
    favorites: "Favorites", signIn: "Sign in", signOut: "Sign out", continueGuest: "Continue as guest",
    myRecordings: "My recordings", switchProfile: "Switch profile", chooseProfile: "Choose profile",
    whoIsListening: "Who is listening?", addProfile: "+ New profile", nickname: "Nickname",
    avatar: "Avatar", kid: "Kid", grownUp: "Grown-up", create: "Create", cancel: "Cancel", delete: "Delete",
    save: "Save", play: "▶ Listen", stop: "■ Stop", recordKeepsake: "🎙 Record a keepsake",
    stopRecording: "■ Stop recording", saveToLibrary: "Save to my library", libraryHint: "Your saved story recordings live here. Play them anytime, or set one as a tale's narration.",
    signInToSave: "Sign in to save recordings to your library.", noRecordings: "No saved recordings yet. Open a tale and tap “Record a keepsake”.",
    rename: "Rename", useAsNarration: "Use as narration", narratedBy: (n) => `Narrated by ${n}`,
    useBuiltInVoice: "Use built-in voice", read: "Read", listenInEnglish: "Listen in English instead",
    noVoice: (l) => `No ${l} voice on this device.`, guestNotice: "You're browsing as a guest. Sign in to sync favorites, profiles, and recordings across devices.",
    offlineNotice: "You're offline — showing your tales. Sign-in and sync need a connection.",
    noSyncNotice: "Sync isn't set up yet — browsing as a guest. (The database setup hasn't been run.)",
    loginNeeded: "Please sign in first.", profileNeeded: "Choose a profile first.",
    createAccount: "Create account", haveAccount: "Have an account? Sign in", needAccount: "New here? Create an account",
    forgot: "Forgot password?", sendReset: "Send reset link", resetSent: "Check your email for the reset link.",
    email: "Email", password: "Password", welcomeBack: "Welcome back", joinUs: "Join Granny's Tales",
    confirmEmailOff: "Tip: if sign-up asks you to confirm email, check your inbox.",
    deleteProfileAsk: "Delete this profile? Favorites and progress for it will be gone.", confirmDelete: "Yes, delete",
    taleNotFound: "That tale couldn't be found.", copied: "Saved!", recordingSaved: "Recording saved to your library.",
    markRead: "read", deleteRecordingAsk: "Delete this recording?", newTitle: "New title",
    noFavs: "No favorites yet — tap the ♡ on any tale.",
    narrationSet: (t) => `“${t}” will now narrate this tale.`, narrationCleared: "Back to the built-in voice.",
    pinOptional: "PIN (optional, 4 digits)", pinWrong: "Wrong PIN — try again.", enterPin: (n) => `Enter PIN for ${n}`,
    grannysWhisper: "Granny's whisper", originalNote: "Original-language script", altNote: "Also published as",
    listenLabel: "Listen", recording: "Recording…", recorded: "Recorded — listen back, then save it if you like.",
  },
  es: {
    tagline: "Cuentos de todos los rincones del mundo", search: "Buscar cuentos…", all: "Todos",
    favorites: "Favoritos", signIn: "Iniciar sesión", signOut: "Cerrar sesión", continueGuest: "Continuar como invitado",
    myRecordings: "Mis grabaciones", switchProfile: "Cambiar perfil", chooseProfile: "Elegir perfil",
    whoIsListening: "¿Quién escucha?", addProfile: "+ Nuevo perfil", nickname: "Apodo",
    avatar: "Avatar", kid: "Niño/a", grownUp: "Adulto", create: "Crear", cancel: "Cancelar", delete: "Eliminar",
    save: "Guardar", play: "▶ Escuchar", stop: "■ Detener", recordKeepsake: "🎙 Grabar un recuerdo",
    stopRecording: "■ Detener grabación", saveToLibrary: "Guardar en mi biblioteca", libraryHint: "Tus grabaciones de cuentos viven aquí. Escúchalas cuando quieras o úsalas como narración.",
    signInToSave: "Inicia sesión para guardar grabaciones.", noRecordings: "Aún no hay grabaciones. Abre un cuento y toca «Grabar un recuerdo».",
    rename: "Renombrar", useAsNarration: "Usar como narración", narratedBy: (n) => `Narrado por ${n}`,
    useBuiltInVoice: "Usar voz integrada", read: "Leído", listenInEnglish: "Escuchar en inglés",
    noVoice: (l) => `No hay voz de ${l} en este dispositivo.`, guestNotice: "Exploras como invitado. Inicia sesión para sincronizar favoritos, perfiles y grabaciones.",
    offlineNotice: "Sin conexión — mostrando tus cuentos. El inicio de sesión necesita internet.",
    noSyncNotice: "La sincronización aún no está lista — exploras como invitado.",
    loginNeeded: "Primero inicia sesión.", profileNeeded: "Elige un perfil primero.",
    createAccount: "Crear cuenta", haveAccount: "¿Tienes cuenta? Inicia sesión", needAccount: "¿Nuevo? Crea una cuenta",
    forgot: "¿Olvidaste tu contraseña?", sendReset: "Enviar enlace", resetSent: "Revisa tu correo.",
    email: "Correo", password: "Contraseña", welcomeBack: "Bienvenido de nuevo", joinUs: "Únete a Granny's Tales",
    confirmEmailOff: "Consejo: si te pide confirmar el correo, revisa tu bandeja.",
    deleteProfileAsk: "¿Eliminar este perfil?", confirmDelete: "Sí, eliminar",
    taleNotFound: "No se encontró ese cuento.", copied: "¡Guardado!", recordingSaved: "Grabación guardada.",
    markRead: "leído", deleteRecordingAsk: "¿Eliminar esta grabación?", newTitle: "Nuevo título",
    noFavs: "Sin favoritos — toca el ♡ en cualquier cuento.",
    narrationSet: (t) => `«${t}» narrará este cuento.`, narrationCleared: "De vuelta a la voz integrada.",
    pinOptional: "PIN (opcional, 4 dígitos)", pinWrong: "PIN incorrecto.", enterPin: (n) => `PIN para ${n}`,
    grannysWhisper: "Susurro de la abuela", originalNote: "Texto en idioma original", altNote: "También publicado como",
    listenLabel: "Escuchar", recording: "Grabando…", recorded: "Grabado — escúchalo y guárdalo si quieres.",
  },
  fr: {
    tagline: "Des contes de tous les coins du monde", search: "Chercher un conte…", all: "Tous",
    favorites: "Favoris", signIn: "Se connecter", signOut: "Se déconnecter", continueGuest: "Continuer en invité",
    myRecordings: "Mes enregistrements", switchProfile: "Changer de profil", chooseProfile: "Choisir un profil",
    whoIsListening: "Qui écoute ?", addProfile: "+ Nouveau profil", nickname: "Pseudo",
    avatar: "Avatar", kid: "Enfant", grownUp: "Adulte", create: "Créer", cancel: "Annuler", delete: "Supprimer",
    save: "Enregistrer", play: "▶ Écouter", stop: "■ Arrêter", recordKeepsake: "🎙 Enregistrer un souvenir",
    stopRecording: "■ Arrêter l'enregistrement", saveToLibrary: "Garder dans ma bibliothèque", libraryHint: "Tes enregistrements sont ici. Écoute-les ou utilise-les comme narration d'un conte.",
    signInToSave: "Connecte-toi pour garder des enregistrements.", noRecordings: "Aucun enregistrement. Ouvre un conte et touche « Enregistrer un souvenir ».",
    rename: "Renommer", useAsNarration: "Utiliser comme narration", narratedBy: (n) => `Raconté par ${n}`,
    useBuiltInVoice: "Utiliser la voix intégrée", read: "Lu", listenInEnglish: "Écouter en anglais",
    noVoice: (l) => `Pas de voix ${l} sur cet appareil.`, guestNotice: "Tu explores en invité. Connecte-toi pour synchroniser favoris, profils et enregistrements.",
    offlineNotice: "Hors ligne — voici tes contes. La connexion nécessite internet.",
    noSyncNotice: "La synchro n'est pas prête — exploration en invité.",
    loginNeeded: "Connecte-toi d'abord.", profileNeeded: "Choisis d'abord un profil.",
    createAccount: "Créer un compte", haveAccount: "Déjà un compte ? Se connecter", needAccount: "Nouveau ? Créer un compte",
    forgot: "Mot de passe oublié ?", sendReset: "Envoyer le lien", resetSent: "Vérifie ton e-mail.",
    email: "E-mail", password: "Mot de passe", welcomeBack: "Bon retour", joinUs: "Rejoins Granny's Tales",
    confirmEmailOff: "Astuce : si on te demande de confirmer ton e-mail, vérifie ta boîte.",
    deleteProfileAsk: "Supprimer ce profil ?", confirmDelete: "Oui, supprimer",
    taleNotFound: "Conte introuvable.", copied: "Enregistré !", recordingSaved: "Enregistrement gardé.",
    markRead: "lu", deleteRecordingAsk: "Supprimer cet enregistrement ?", newTitle: "Nouveau titre",
    noFavs: "Aucun favori — touche le ♡ sur un conte.",
    narrationSet: (t) => `« ${t} » racontera ce conte.`, narrationCleared: "Retour à la voix intégrée.",
    pinOptional: "PIN (facultatif, 4 chiffres)", pinWrong: "Mauvais PIN.", enterPin: (n) => `PIN pour ${n}`,
    grannysWhisper: "Le murmure de grand-mère", originalNote: "Texte en langue originale", altNote: "Aussi publié comme",
    listenLabel: "Écouter", recording: "Enregistrement…", recorded: "Enregistré — réécoute-le, puis garde-le si tu veux.",
  }
};
const t = (k, ...a) => { const v = STR[state.ui][k] ?? STR.en[k]; return typeof v === 'function' ? v(...a) : v; };

/* ---------------- State ---------------- */
const state = {
  ui: localStorage.getItem(LS.ui) || 'en',
  tales: [], byId: {},
  user: null, sb: null, syncReady: false, syncMsg: '',
  profiles: [], profile: null,
  favorites: new Set(), progress: new Set(), prefLang: 'en',
  recordings: [], signedUrls: {},
  filter: 'all', query: '',
  sheetTale: null, sheetTab: 'en',
  speaking: false, utterQueue: [],
  recording: null, // {mediaRecorder, chunks, blob, url}
};
const $ = (s, r) => (r || document).querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer = null;
function showToast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.add('hidden'), 3200);
}
const AVATARS = ['🦊','🐰','🐻','🐼','🦁','🐸','🐵','🐷','🐔','🦄','🐝','🐢','🦉','🐬','🦋','🌟','🌈','🍎'];

/* ---------------- Supabase (graceful, never blocks boot) ---------------- */
function loadSupabaseLib() {
  return new Promise((resolve) => {
    if (window.supabase && window.supabase.createClient) return resolve(true);
    let done = false;
    const finish = (ok) => { if (!done) { done = true; resolve(!!ok); } };
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.44.4/dist/umd/supabase.min.js';
    s.onload = () => finish(window.supabase && window.supabase.createClient);
    s.onerror = () => finish(false);
    document.head.appendChild(s);
    setTimeout(() => finish(window.supabase && window.supabase.createClient), 8000);
  });
}
async function initSupabase() {
  const ok = await loadSupabaseLib().catch(() => false);
  if (!ok) { state.syncMsg = t('offlineNotice'); return; }
  try {
    state.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) { state.syncMsg = t('offlineNotice'); state.sb = null; }
}
async function probeSync() {
  if (!state.sb) return;
  try {
    const { error } = await state.sb.from('profiles').select('id').limit(1);
    if (error) throw error;
    state.syncReady = true;
  } catch (e) {
    state.syncReady = false;
    state.syncMsg = t('noSyncNotice');
  }
}
const canSync = () => !!(state.sb && state.syncReady && state.user);

/* ---------------- Auth ---------------- */
async function refreshSession() {
  if (!state.sb) return;
  const { data } = await state.sb.auth.getSession();
  state.user = data.session?.user || null;
  if (state.user) await loadProfiles(); else { state.profiles = []; state.profile = null; }
  renderAuthArea();
}
function renderAuthArea() {
  const a = $('#authArea');
  if (!state.user) { a.innerHTML = `<button class="auth-btn" id="signInBtn">${esc(t('signIn'))}</button>`; $('#signInBtn').onclick = openAuthModal; return; }
  const p = state.profile;
  a.innerHTML = `
    <button class="profile-chip" id="profileChip" aria-haspopup="true">
      <span class="ava">${esc(p ? p.avatar : '👤')}</span><span>${esc(p ? p.nickname : t('chooseProfile'))}</span> ▾
    </button>
    <div class="menu hidden" id="profileMenu">
      <button data-m="switch">🔄 ${esc(t('switchProfile'))}</button>
      <button data-m="library">🎙 ${esc(t('myRecordings'))}</button>
      <div class="sep"></div>
      <button data-m="signout">🚪 ${esc(t('signOut'))}</button>
    </div>`;
  const chip = $('#profileChip'), menu = $('#profileMenu');
  chip.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); };
  document.addEventListener('click', () => menu.classList.add('hidden'), { once: true });
  menu.querySelectorAll('button').forEach((b) => { b.onclick = () => { menu.classList.add('hidden'); onMenu(b.dataset.m); }; });
}
function onMenu(which) {
  if (which === 'signout') signOut();
  else if (which === 'switch') openProfilePicker(false);
  else if (which === 'library') showLibrary();
}
async function signOut() {
  stopAllAudio();
  try { await state.sb.auth.signOut(); } catch (e) {}
  state.user = null; state.profiles = []; state.profile = null;
  state.favorites = new Set(); state.progress = new Set(); state.recordings = [];
  localStorage.removeItem(LS.profile);
  renderAuthArea(); renderGrid(); showScreen('home');
}

function openAuthModal(mode) {
  if (!state.sb) { showToast(t('offlineNotice')); return; }
  let m = mode || 'signin';
  const box = $('#authBox'), wrap = $('#authModal');
  const draw = () => {
    const isIn = m === 'signin';
    box.innerHTML = `
      <h2>${esc(isIn ? t('welcomeBack') : t('joinUs'))}</h2>
      <div class="form-err hidden" id="authErr"></div>
      <div class="form-ok hidden" id="authOk"></div>
      <label>${esc(t('email'))}<input type="email" id="authEmail" autocomplete="email"></label>
      <label>${esc(t('password'))}<input type="password" id="authPass" autocomplete="${isIn ? 'current-password' : 'new-password'}"></label>
      <button class="btn" id="authGo">${esc(isIn ? t('signIn') : t('createAccount'))}</button>
      <div style="text-align:center;margin-top:.4rem">
        <button class="linklike" id="authSwap">${esc(isIn ? t('needAccount') : t('haveAccount'))}</button><br>
        ${isIn ? `<button class="linklike" id="authForgot">${esc(t('forgot'))}</button>` : `<div class="progress-note">${esc(t('confirmEmailOff'))}</div>`}
      </div>
      <button class="btn ghost" id="authCancel" style="margin-top:.6rem">${esc(t('cancel'))}</button>`;
    $('#authSwap').onclick = () => { m = isIn ? 'signup' : 'signin'; draw(); };
    $('#authCancel').onclick = closeAuthModal;
    const go = async () => {
      const email = $('#authEmail').value.trim(), pass = $('#authPass').value;
      const errEl = $('#authErr'); errEl.classList.add('hidden');
      try {
        let res;
        if (m === 'signin') res = await state.sb.auth.signInWithPassword({ email, password: pass });
        else res = await state.sb.auth.signUp({ email, password: pass });
        if (res.error) throw res.error;
        closeAuthModal(); await refreshSession();
        if (state.user) openProfilePicker(true);
      } catch (e) { errEl.textContent = friendlyAuthError(e); errEl.classList.remove('hidden'); }
    };
    $('#authGo').onclick = go;
    const forgotBtn = $('#authForgot');
    if (forgotBtn) forgotBtn.onclick = async () => {
      const email = $('#authEmail').value.trim();
      const errEl = $('#authErr'), okEl = $('#authOk');
      errEl.classList.add('hidden'); okEl.classList.add('hidden');
      if (!email) { errEl.textContent = t('email'); errEl.classList.remove('hidden'); return; }
      const { error } = await state.sb.auth.resetPasswordForEmail(email);
      if (error) { errEl.textContent = friendlyAuthError(error); errEl.classList.remove('hidden'); }
      else { okEl.textContent = t('resetSent'); okEl.classList.remove('hidden'); }
    };
  };
  draw(); wrap.classList.remove('hidden');
}
function closeAuthModal() { $('#authModal').classList.add('hidden'); }
function friendlyAuthError(e) {
  const m = (e.message || '').toLowerCase();
  if (m.includes('invalid login credentials')) return { en: 'Wrong email or password.', es: 'Correo o contraseña incorrectos.', fr: 'E-mail ou mot de passe incorrect.' }[state.ui];
  if (m.includes('already registered') || m.includes('already exists')) return { en: 'That email already has an account — try signing in.', es: 'Ese correo ya tiene cuenta.', fr: 'Cet e-mail a déjà un compte.' }[state.ui];
  if (m.includes('password')) return { en: 'Password must be at least 6 characters.', es: 'La contraseña debe tener al menos 6 caracteres.', fr: 'Le mot de passe doit faire au moins 6 caractères.' }[state.ui];
  return e.message;
}

/* ---------------- Profiles ---------------- */
async function loadProfiles() {
  state.profiles = [];
  if (!canSync()) return;
  try {
    const { data, error } = await state.sb.from('profiles').select('*').order('created_at');
    if (error) throw error;
    state.profiles = data || [];
    const saved = localStorage.getItem(LS.profile);
    state.profile = state.profiles.find((p) => p.id === saved) || null;
    if (state.profile) await loadProfileData();
  } catch (e) { /* stay guest-like */ }
}
function openProfilePicker(firstRun) {
  const box = $('#profileBox'), wrap = $('#profileWrap');
  const draw = () => {
    const rows = state.profiles.map((p) => `
      <button class="profile-row" data-pick="${p.id}">
        <span class="ava">${esc(p.avatar)}</span>
        <span><span class="nm">${esc(p.nickname)}</span><br><span class="tag">${esc(p.is_kid ? t('kid') : t('grownUp'))}</span></span>
        <span style="flex:1"></span>
        <span class="icon-btn" data-del="${p.id}" title="${esc(t('delete'))}">🗑</span>
      </button>`).join('');
    box.innerHTML = `
      <h2>${esc(t('whoIsListening'))}</h2>
      <div class="profile-list">${rows || `<p class="hint">${esc(t('addProfile'))} ↓</p>`}</div>
      <button class="btn ghost" id="newProfBtn">${esc(t('addProfile'))}</button>
      <button class="btn dark" id="guestBtn" style="margin-top:.6rem">${esc(t('continueGuest'))}</button>`;
    box.querySelectorAll('[data-pick]').forEach((b) => { b.onclick = (e) => { if (e.target.closest('[data-del]')) return; pickProfile(b.dataset.pick); }; });
    box.querySelectorAll('[data-del]').forEach((b) => { b.onclick = (e) => { e.stopPropagation(); askDeleteProfile(b.dataset.del, draw); }; });
    $('#newProfBtn').onclick = () => drawNewProfile(draw);
    $('#guestBtn').onclick = () => { state.profile = null; localStorage.removeItem(LS.profile); wrap.classList.add('hidden'); renderAuthArea(); renderGrid(); };
  };
  draw(); wrap.classList.remove('hidden');
}
function drawNewProfile(back) {
  const box = $('#profileBox');
  let ava = AVATARS[0], isKid = true;
  box.innerHTML = `
    <h2>${esc(t('addProfile'))}</h2>
    <label>${esc(t('nickname'))}<input type="text" id="npName" maxlength="24" placeholder="…"></label>
    <label>${esc(t('avatar'))}</label>
    <div class="ava-pick" id="npAva">${AVATARS.map((a, i) => `<button data-a="${a}" class="${i === 0 ? 'on' : ''}">${a}</button>`).join('')}</div>
    <div class="check-row"><label><input type="checkbox" id="npKid" checked> ${esc(t('kid'))}</label></div>
    <label>${esc(t('pinOptional'))}<input type="text" id="npPin" maxlength="4" inputmode="numeric" placeholder="••••"></label>
    <button class="btn" id="npGo">${esc(t('create'))}</button>
    <button class="btn ghost" id="npBack" style="margin-top:.6rem">${esc(t('cancel'))}</button>`;
  $('#npAva').querySelectorAll('button').forEach((b) => { b.onclick = () => { ava = b.dataset.a; $('#npAva').querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); }; });
  $('#npBack').onclick = back;
  $('#npGo').onclick = async () => {
    const nickname = $('#npName').value.trim();
    if (!nickname) { $('#npName').focus(); return; }
    const pin = $('#npPin').value.replace(/\D/g, '').slice(0, 4);
    isKid = $('#npKid').checked;
    try {
      const { data, error } = await state.sb.from('profiles').insert({
        user_id: state.user.id, nickname, avatar: ava, is_kid: isKid,
      }).select().single();
      if (error) throw error;
      const prof = data;
      if (pin) localStorage.setItem('gt_pin_' + prof.id, pin);
      await loadProfiles();
      $('#profileWrap').classList.add('hidden');
      pickProfile(prof.id, true);
    } catch (e) { showToast(e.message); }
  };
}
function askDeleteProfile(id, redraw) {
  const box = $('#profileBox');
  box.innerHTML = `<h2>${esc(t('delete'))}</h2><p>${esc(t('deleteProfileAsk'))}</p>
    <button class="btn" id="delYes" style="background:var(--danger)">${esc(t('confirmDelete'))}</button>
    <button class="btn ghost" id="delNo" style="margin-top:.6rem">${esc(t('cancel'))}</button>`;
  $('#delNo').onclick = redraw;
  $('#delYes').onclick = async () => {
    try { await state.sb.from('profiles').delete().eq('id', id); } catch (e) {}
    localStorage.removeItem('gt_pin_' + id);
    if (state.profile?.id === id) { state.profile = null; localStorage.removeItem(LS.profile); }
    await loadProfiles(); redraw(); renderAuthArea(); renderGrid();
  };
}
async function pickProfile(id, skipPin) {
  const p = state.profiles.find((x) => x.id === id);
  if (!p) return;
  const pin = localStorage.getItem('gt_pin_' + id);
  if (pin && !skipPin) {
    const got = prompt(t('enterPin', p.nickname));
    if (got !== pin) { showToast(t('pinWrong')); return; }
  }
  state.profile = p;
  localStorage.setItem(LS.profile, id);
  $('#profileWrap').classList.add('hidden');
  await loadProfileData();
  renderAuthArea(); renderGrid();
  if (state.sheetTale) openSheet(state.sheetTale.id, true);
}
async function loadProfileData() {
  state.favorites = new Set(); state.progress = new Set(); state.prefLang = 'en';
  if (!state.profile || !canSync()) return;
  const pid = state.profile.id, uid = state.user.id;
  try {
    const [f, g, pr] = await Promise.all([
      state.sb.from('favorites').select('tale_id').eq('user_id', uid).eq('profile_id', pid),
      state.sb.from('progress').select('tale_id').eq('user_id', uid).eq('profile_id', pid).eq('completed', true),
      state.sb.from('prefs').select('language').eq('user_id', uid).eq('profile_id', pid).maybeSingle(),
    ]);
    (f.data || []).forEach((r) => state.favorites.add(r.tale_id));
    (g.data || []).forEach((r) => state.progress.add(r.tale_id));
    if (pr.data?.language) state.prefLang = pr.data.language;
  } catch (e) {}
  await loadRecordings();
}
async function loadRecordings() {
  state.recordings = [];
  if (!canSync()) return;
  try {
    const { data, error } = await state.sb.from('recordings').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
    if (error) throw error;
    state.recordings = data || [];
  } catch (e) {}
}

/* ---------------- Home: grid, filters, search ---------------- */
const REGIONS = ['African', 'East Asian', 'European', 'Indigenous American', 'Indigenous Arctic', 'Latin American', 'Middle Eastern', 'Pacific', 'South Asian'];
function renderFilters() {
  const c = $('#filterChips');
  const chips = [`<button class="chip${state.filter === 'all' ? ' on' : ''}" data-f="all">${esc(t('all'))}</button>`]
    .concat(REGIONS.map((r) => `<button class="chip${state.filter === r ? ' on' : ''}" data-f="${esc(r)}">${esc(r)}</button>`))
    .concat([`<button class="chip fav${state.filter === 'fav' ? ' on' : ''}" data-f="fav">♥ ${esc(t('favorites'))}</button>`]);
  c.innerHTML = chips.join('');
  c.querySelectorAll('.chip').forEach((b) => { b.onclick = () => { state.filter = b.dataset.f; renderFilters(); renderGrid(); }; });
}
function filteredTales() {
  const q = state.query.trim().toLowerCase();
  return state.tales.filter((tale) => {
    if (state.filter === 'fav' && !state.favorites.has(tale.id)) return false;
    if (state.filter !== 'all' && state.filter !== 'fav' && tale.region !== state.filter) return false;
    if (q && !(tale.title + ' ' + tale.region + ' ' + (tale.attribution || '')).toLowerCase().includes(q)) return false;
    return true;
  });
}
function renderGrid() {
  const list = filteredTales();
  const g = $('#grid');
  g.innerHTML = list.map((tale) => {
    const fav = state.favorites.has(tale.id), read = state.progress.has(tale.id);
    return `<article class="card" data-tale="${esc(tale.id)}" tabindex="0" role="button" aria-label="${esc(tale.title)}">
      <div class="card-badges">${read ? `<span class="badge read">✓ ${esc(t('read'))}</span>` : ''}</div>
      ${state.profile ? `<button class="heart${fav ? ' faved' : ''}" data-heart="${esc(tale.id)}" aria-label="favorite">${fav ? '♥' : '♡'}</button>` : ''}
      <img loading="lazy" src="${esc(tale.image)}" alt="">
      <div class="card-body"><p class="card-region">${esc(tale.region)}</p><h3 class="card-title">${esc(tale.title)}</h3></div>
    </article>`;
  }).join('');
  $('#emptyMsg').classList.toggle('hidden', list.length > 0);
  if (!list.length) $('#emptyMsg').textContent = state.filter === 'fav' ? t('noFavs') : '—';
  g.querySelectorAll('.card').forEach((el) => {
    el.onclick = (e) => { if (e.target.closest('[data-heart]')) return; openSheet(el.dataset.tale); };
    el.onkeydown = (e) => { if (e.key === 'Enter') openSheet(el.dataset.tale); };
  });
  g.querySelectorAll('[data-heart]').forEach((b) => { b.onclick = (e) => { e.stopPropagation(); toggleFavorite(b.dataset.heart); }; });
}
async function toggleFavorite(taleId) {
  if (!state.user) { showToast(t('loginNeeded')); openAuthModal('signin'); return; }
  if (!state.profile) { showToast(t('profileNeeded')); openProfilePicker(false); return; }
  const has = state.favorites.has(taleId);
  try {
    if (has) await state.sb.from('favorites').delete().eq('user_id', state.user.id).eq('profile_id', state.profile.id).eq('tale_id', taleId);
    else await state.sb.from('favorites').insert({ user_id: state.user.id, profile_id: state.profile.id, tale_id: taleId });
    has ? state.favorites.delete(taleId) : state.favorites.add(taleId);
  } catch (e) { showToast(e.message); }
  renderGrid();
}
async function markRead(taleId) {
  if (!state.profile || !canSync() || state.progress.has(taleId)) return;
  state.progress.add(taleId);
  try { await state.sb.from('progress').upsert({ user_id: state.user.id, profile_id: state.profile.id, tale_id: taleId, completed: true }, { onConflict: 'user_id,profile_id,tale_id' }); } catch (e) {}
  renderGrid();
}
async function setPrefLang(lang) {
  state.prefLang = lang;
  if (!state.profile || !canSync()) return;
  try { await state.sb.from('prefs').upsert({ user_id: state.user.id, profile_id: state.profile.id, language: lang }, { onConflict: 'user_id,profile_id' }); } catch (e) {}
}

/* ---------------- Tale sheet ---------------- */
function taleTabs(tale) {
  const tabs = [{ key: 'en', label: 'English', script: tale.script_en, code: 'en', title: tale.title }];
  if (tale.script_original) tabs.push({
    key: 'orig', label: tale.original_language_name || 'Original', script: tale.script_original,
    code: (tale.languages || [])[1] || 'orig',
    title: (tale.alternate_title && !tale.script_alternate) ? tale.alternate_title : tale.title,
    note: tale.script_original_note || t('originalNote'),
  });
  if (tale.script_alternate) tabs.push({
    key: 'alt', label: tale.alternate_language_name || 'Translation', script: tale.script_alternate,
    code: tale.alternate_language_code || 'alt', title: tale.alternate_title || tale.title,
    note: `${t('altNote')}: ${tale.alternate_note || tale.alternate_language_name || ''}`.trim(),
  });
  return tabs;
}
function narrationFor(taleId) {
  if (!state.profile) return null;
  const map = JSON.parse(localStorage.getItem(LS.narration) || '{}');
  const rid = map[state.profile.id + ':' + taleId];
  return state.recordings.find((r) => r.id === rid) || null;
}
function setNarration(taleId, recordingId) {
  const map = JSON.parse(localStorage.getItem(LS.narration) || '{}');
  const k = (state.profile ? state.profile.id : 'guest') + ':' + taleId;
  if (recordingId) map[k] = recordingId; else delete map[k];
  localStorage.setItem(LS.narration, JSON.stringify(map));
}
function openSheet(id, keepTab) {
  const tale = state.byId[id];
  if (!tale) { showToast(t('taleNotFound')); return; }
  state.sheetTale = tale;
  const tabs = taleTabs(tale);
  if (!keepTab) {
    const pref = state.prefLang;
    state.sheetTab = tabs.some((x) => x.key === pref) ? pref : 'en';
  }
  renderSheet();
  $('#sheetWrap').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', '?tale=' + encodeURIComponent(id));
  markRead(id);
}
function closeSheet() {
  stopAllAudio();
  state.sheetTale = null;
  $('#sheetWrap').classList.add('hidden');
  document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname);
}
function renderSheet() {
  const tale = state.sheetTale; if (!tale) return;
  const tabs = taleTabs(tale);
  const tab = tabs.find((x) => x.key === state.sheetTab) || tabs[0];
  const narr = narrationFor(tale.id);
  const myRecs = state.recordings.filter((r) => r.tale_id === tale.id);
  $('#sheet').innerHTML = `
    <div class="sheet-hero"><img src="${esc(tale.image)}" alt=""><button class="sheet-close" id="sheetClose" aria-label="×">×</button></div>
    <div class="sheet-body">
      <p class="sheet-kicker">${esc(tale.region)}${tale.attribution ? ' · ' + esc(tale.attribution) : ''}</p>
      <h1>${esc(tab.title || tale.title)}</h1>
      <p class="subtitle">${esc(tale.subtitle || '')}</p>
      <div class="lang-tabs">${tabs.map((x) => `<button class="lang-tab${x.key === tab.key ? ' on' : ''}" data-tab="${x.key}">${esc(x.label)}</button>`).join('')}</div>
      ${tab.note && tab.key !== 'en' ? `<p class="lang-note">${esc(tab.note)}</p>` : ''}
      ${narr ? `<span class="narrate-badge">🎙 ${esc(t('narratedBy', state.profile.nickname))}</span>` : ''}
      <div class="listen-row">
        <button class="btn" id="listenBtn">${narr ? '🎙 ' : '🔊 '}${esc(t('listenLabel'))} — ${esc(tab.label)}</button>
        ${narr ? `<button class="btn ghost small" id="clearNarr">${esc(t('useBuiltInVoice'))}</button>` : ''}
        <button class="btn ghost" id="stopBtn" disabled>${esc(t('stop'))}</button>
      </div>
      <div id="voiceNote"></div>
      <div class="script" lang="${esc(tab.code)}">${esc(tab.script)}</div>
      <p class="whisper"><strong>${esc(t('grannysWhisper'))}:</strong> ${esc((tale.moral || '').replace(/^Granny’s whisper:\s*/i, ''))}</p>
      <h3 class="section-title">🎙 ${esc(t('recordKeepsake')).replace('🎙 ', '')}</h3>
      <div id="recZone"></div>
      ${state.profile ? `
      <h3 class="section-title">${esc(t('useAsNarration'))}</h3>
      <div id="narrZone">${myRecs.length ? myRecs.map((r) => `
        <div class="rec-row"><div class="grow"><div class="t">${esc(r.title)}</div><div class="s">${new Date(r.created_at).toLocaleDateString()}</div></div>
        <button class="btn small" data-narr="${r.id}">${esc(t('useAsNarration'))}</button></div>`).join('')
        : `<p class="hint">${esc(t('noRecordings'))}</p>`}</div>` : ''}
    </div>`;
  $('#sheetClose').onclick = closeSheet;
  $('#sheet').querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { stopAllAudio(); state.sheetTab = b.dataset.tab; setPrefLang(state.sheetTab); renderSheet(); }; });
  $('#listenBtn').onclick = () => listenCurrent(tale, tab, narr);
  $('#stopBtn').onclick = stopAllAudio;
  const cn = $('#clearNarr'); if (cn) cn.onclick = () => { setNarration(tale.id, null); showToast(t('narrationCleared')); renderSheet(); };
  $('#sheet').querySelectorAll('[data-narr]').forEach((b) => { b.onclick = () => { setNarration(tale.id, b.dataset.narr); showToast(t('narrationSet', state.byId[tale.id].title)); renderSheet(); }; });
  renderRecZone(tale);
}
function renderRecZone(tale) {
  const z = $('#recZone'); if (!z) return;
  const rec = state.recording;
  if (!state.user) { z.innerHTML = `<p class="hint">${esc(t('signInToSave'))}</p><button class="btn ghost" id="recLogin">${esc(t('signIn'))}</button>`; $('#recLogin').onclick = () => openAuthModal('signin'); return; }
  if (!rec) { z.innerHTML = `<button class="btn ghost" id="recStart">${esc(t('recordKeepsake'))}</button>`; $('#recStart').onclick = () => startRecording(tale); return; }
  if (rec.recording) { z.innerHTML = `<div class="rec-controls"><span class="rec-dot"></span><span>${esc(t('recording'))}</span><button class="btn small" id="recStop">${esc(t('stopRecording'))}</button></div>`; $('#recStop').onclick = stopRecording; return; }
  z.innerHTML = `
    <p class="hint">${esc(t('recorded'))}</p>
    <audio controls src="${rec.url}" style="width:100%"></audio>
    <div class="listen-row">
      <button class="btn" id="recSave">${esc(t('saveToLibrary'))}</button>
      <button class="btn ghost" id="recRedo">${esc(t('recordKeepsake'))}</button>
    </div>`;
  $('#recSave').onclick = () => saveRecording(tale);
  $('#recRedo').onclick = () => startRecording(tale);
}
async function startRecording(tale) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
    const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    const chunks = [];
    mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    mr.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      state.recording = { recording: false, blob, url: URL.createObjectURL(blob), startedAt: Date.now() };
      renderRecZone(tale);
    };
    state.recording = { recording: true, mediaRecorder: mr, chunks };
    mr.start(); renderRecZone(tale);
  } catch (e) { showToast(esc(e.message)); }
}
function stopRecording() { if (state.recording?.mediaRecorder?.state === 'recording') state.recording.mediaRecorder.stop(); }
async function saveRecording(tale) {
  const rec = state.recording;
  if (!rec?.blob || !state.user) return;
  const btn = $('#recSave'); if (btn) btn.disabled = true;
  try {
    const id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
    const path = `${state.user.id}/${id}.webm`;
    const { error: upErr } = await state.sb.storage.from('keepsakes').upload(path, rec.blob, { contentType: 'audio/webm' });
    if (upErr) throw upErr;
    const title = `${tale.title} — ${new Date().toLocaleDateString()}`;
    const { error: insErr } = await state.sb.from('recordings').insert({
      id, user_id: state.user.id, profile_id: state.profile?.id || null,
      tale_id: tale.id, title, storage_path: path,
      duration_sec: Math.round((Date.now() - rec.startedAt) / 1000),
    });
    if (insErr) throw insErr;
    await loadRecordings();
    state.recording = null;
    showToast(t('recordingSaved'));
    renderSheet();
  } catch (e) { showToast(e.message); if (btn) btn.disabled = false; }
}

/* ---------------- TTS ---------------- */
let voicesCache = [];
function loadVoices() {
  try { voicesCache = speechSynthesis.getVoices(); } catch (e) { voicesCache = []; }
}
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function voiceFor(code) {
  const c = String(code || '').toLowerCase();
  if (!c || c === 'en') return voicesCache.find((v) => v.lang.toLowerCase().startsWith('en')) || null;
  const aliases = { tw: ['ak', 'tw'], chr: ['chr'], iu: ['iu'], bo: ['bo'], haw: ['haw'], mi: ['mi'], yo: ['yo'], ig: ['ig'], am: ['am'], sw: ['sw'] };
  const tries = [c].concat(aliases[c] || []);
  for (const p of tries) { const v = voicesCache.find((v) => v.lang.toLowerCase().startsWith(p)); if (v) return v; }
  return null;
}
function chunkText(text, size) {
  const parts = text.split(/\n+/).flatMap((p) => p.match(new RegExp(`[^.!?…]+[.!?…]+["']?|[^.!?…]+$`, 'g')) || [p]);
  const chunks = []; let cur = '';
  for (const s of (parts || [])) {
    if ((cur + ' ' + s).trim().length > size && cur) { chunks.push(cur.trim()); cur = s; }
    else cur = (cur + ' ' + s).trim();
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.filter(Boolean);
}
function stopTTS() { try { speechSynthesis.cancel(); } catch (e) {} state.speaking = false; const b = $('#stopBtn'); if (b) b.disabled = true; }
function stopAllAudio() {
  stopTTS();
  document.querySelectorAll('audio').forEach((a) => { try { a.pause(); } catch (e) {} });
  if (state.recording?.mediaRecorder?.state === 'recording') { try { state.recording.mediaRecorder.stop(); } catch (e) {} state.recording = null; }
}
async function listenCurrent(tale, tab, narrRec) {
  stopAllAudio();
  const stopBtn = $('#stopBtn');
  if (narrRec && canSync()) {
    // Play the family's saved recording instead of TTS.
    try {
      const url = await signedUrl(narrRec);
      const a = new Audio(url); a.controls = true;
      const note = $('#voiceNote');
      if (note) { note.innerHTML = ''; note.appendChild(a); a.style.width = '100%'; }
      a.play().catch(() => {});
      if (stopBtn) { stopBtn.disabled = false; stopBtn.onclick = () => { a.pause(); stopBtn.disabled = true; }; }
      return;
    } catch (e) { showToast(e.message); }
  }
  if (!('speechSynthesis' in window)) { showToast('TTS not supported on this device.'); return; }
  const voice = voiceFor(tab.code);
  const note = $('#voiceNote');
  let text = tab.script, useCode = tab.code;
  if (!voice && tab.code !== 'en') {
    if (note) note.innerHTML = `<p class="lang-note">${esc(t('noVoice', tab.label))} <button class="linklike" id="engInstead">${esc(t('listenInEnglish'))}</button></p>`;
    const btn = $('#engInstead');
    if (btn) btn.onclick = () => { const en = taleTabs(tale)[0]; state.sheetTab = 'en'; renderSheet(); listenCurrent(tale, en, null); };
    return;
  }
  if (note) note.innerHTML = '';
  const chunks = chunkText(text, 220);
  state.speaking = true; if (stopBtn) stopBtn.disabled = false;
  let i = 0;
  const next = () => {
    if (!state.speaking || i >= chunks.length) { stopTTS(); return; }
    const u = new SpeechSynthesisUtterance(chunks[i++]);
    if (voice) u.voice = voice;
    u.lang = (voice && voice.lang) || (useCode === 'en' ? 'en-US' : useCode);
    u.rate = 0.95;
    u.onend = next; u.onerror = next;
    speechSynthesis.speak(u);
  };
  next();
}
async function signedUrl(rec) {
  if (state.signedUrls[rec.id]) return state.signedUrls[rec.id];
  const { data, error } = await state.sb.storage.from('keepsakes').createSignedUrl(rec.storage_path, 3600);
  if (error) throw error;
  state.signedUrls[rec.id] = data.signedUrl;
  return data.signedUrl;
}

/* ---------------- Library screen ---------------- */
function showScreen(which) {
  $('#homeScreen').classList.toggle('hidden', which !== 'home');
  $('#libraryScreen').classList.toggle('hidden', which !== 'library');
  if (which === 'library') renderLibrary();
  window.scrollTo(0, 0);
}
async function renderLibrary() {
  $('#libraryTitle').textContent = t('myRecordings');
  $('#libraryHint').textContent = t('libraryHint');
  const list = $('#libraryList');
  if (!state.user) { list.innerHTML = `<p class="hint">${esc(t('signInToSave'))}</p><button class="btn" id="libLogin">${esc(t('signIn'))}</button>`; $('#libLogin').onclick = () => openAuthModal('signin'); return; }
  if (!state.recordings.length) { list.innerHTML = `<p class="hint">${esc(t('noRecordings'))}</p>`; return; }
  list.innerHTML = state.recordings.map((r) => {
    const tale = state.byId[r.tale_id];
    const prof = state.profiles.find((p) => p.id === r.profile_id);
    return `<div class="lib-card" data-rec="${r.id}">
      <div class="t">${esc(r.title)}</div>
      <div class="s">${tale ? esc(tale.title) + ' · ' : ''}${prof ? esc(prof.avatar + ' ' + prof.nickname) + ' · ' : ''}${new Date(r.created_at).toLocaleDateString()}${r.duration_sec ? ' · ' + Math.round(r.duration_sec) + 's' : ''}</div>
      <audio controls preload="none" data-audio="${r.id}"></audio>
      <div class="row">
        ${tale ? `<button class="btn small ghost" data-open-tale="${tale.id}">${esc(tale.title)}</button>` : ''}
        <button class="icon-btn" data-rename="${r.id}">✏️ ${esc(t('rename'))}</button>
        <button class="icon-btn" data-delrec="${r.id}">🗑 ${esc(t('delete'))}</button>
      </div></div>`;
  }).join('');
  list.querySelectorAll('audio[data-audio]').forEach((a) => {
    a.addEventListener('play', async () => {
      if (a.src) return;
      const rec = state.recordings.find((r) => r.id === a.dataset.audio);
      try { a.src = await signedUrl(rec); a.play().catch(() => {}); } catch (e) { showToast(e.message); }
    }, { once: false });
  });
  list.querySelectorAll('[data-rename]').forEach((b) => { b.onclick = async () => {
    const rec = state.recordings.find((r) => r.id === b.dataset.rename);
    const name = prompt(t('newTitle'), rec.title);
    if (!name || name === rec.title) return;
    try { const { error } = await state.sb.from('recordings').update({ title: name }).eq('id', rec.id); if (error) throw error; rec.title = name; renderLibrary(); showToast(t('copied')); } catch (e) { showToast(e.message); }
  }; });
  list.querySelectorAll('[data-delrec]').forEach((b) => { b.onclick = async () => {
    if (!confirm(t('deleteRecordingAsk'))) return;
    const rec = state.recordings.find((r) => r.id === b.dataset.delrec);
    try {
      await state.sb.storage.from('keepsakes').remove([rec.storage_path]);
      const { error } = await state.sb.from('recordings').delete().eq('id', rec.id);
      if (error) throw error;
      state.recordings = state.recordings.filter((r) => r.id !== rec.id);
      renderLibrary(); showToast(t('copied'));
    } catch (e) { showToast(e.message); }
  }; });
  list.querySelectorAll('[data-open-tale]').forEach((b) => { b.onclick = () => openSheet(b.dataset.openTale); });
}

/* ---------------- Boot ---------------- */
function applyUiLang() {
  document.documentElement.lang = state.ui;
  document.querySelectorAll('[data-ui-lang]').forEach((b) => b.classList.toggle('on', b.dataset.uiLang === state.ui));
  $('#tagline').textContent = t('tagline');
  $('#searchInput').placeholder = t('search');
  renderFilters(); renderGrid(); renderAuthArea();
  if (!$('#libraryScreen').classList.contains('hidden')) renderLibrary();
}
function updateSyncNotice() {
  const notice = $('#syncNotice');
  if (!state.syncReady) { notice.textContent = state.syncMsg || t('guestNotice'); notice.classList.remove('hidden'); }
  else if (!state.user) { notice.textContent = t('guestNotice'); notice.classList.remove('hidden'); }
  else notice.classList.add('hidden');
}
async function bootSupabase() {
  await initSupabase();
  await probeSync();
  await refreshSession();
  applyUiLang();
  updateSyncNotice();
  if (state.sb) state.sb.auth.onAuthStateChange((_ev, session) => {
    const uid = session?.user?.id || null;
    if (uid !== (state.user?.id || null)) refreshSession().then(() => { applyUiLang(); updateSyncNotice(); });
  });
}
/* ---------------- Boot ---------------- */
async function boot() {
  try { if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {}); } catch (e) {}
  document.querySelectorAll('[data-ui-lang]').forEach((b) => { b.onclick = () => { state.ui = b.dataset.uiLang; localStorage.setItem(LS.ui, state.ui); applyUiLang(); }; });
  $('#brandBtn').onclick = () => { closeSheet(); showScreen('home'); };
  $('#searchInput').addEventListener('input', (e) => { state.query = e.target.value; renderGrid(); });
  $('#sheetWrap').addEventListener('click', (e) => { if (e.target.id === 'sheetWrap') closeSheet(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); closeAuthModal(); } });
  $('#authModal').addEventListener('click', (e) => { if (e.target.id === 'authModal') closeAuthModal(); });
  $('#profileWrap').addEventListener('click', (e) => { if (e.target.id === 'profileWrap' && state.profile) $('#profileWrap').classList.add('hidden'); });
  $('#libraryBack').onclick = () => showScreen('home');

  try {
    const res = await fetch('./tales.json');
    state.tales = await res.json();
  } catch (e) {
    document.getElementById('grid').innerHTML = `<p class="empty">Couldn't load the tales. Check your connection and reload.</p>`;
    return;
  }
  state.byId = Object.fromEntries(state.tales.map((x) => [x.id, x]));

  applyUiLang();
  updateSyncNotice();

  const params = new URLSearchParams(location.search);
  const tid = params.get('tale');
  if (tid && state.byId[tid]) openSheet(tid);
  else if (tid) showToast(t('taleNotFound'));

  // Supabase connects in the background; the app is fully usable meanwhile.
  bootSupabase();
}
document.addEventListener('DOMContentLoaded', boot);
