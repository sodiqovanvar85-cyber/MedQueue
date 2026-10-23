const REGIONS_DATA = {
  "Toshkent viloyati": ["Chirchiq sh.", "Olmaliq sh.", "Angren sh.", "Yangiyo'l tumani", "Qibray tumani", "Zangiota tumani"],
  "Samarqand viloyati": ["Samarqand sh.", "Urgut tumani", "Kattaqo'rg'on sh.", "Pastdarg'om tumani", "Ishtixon tumani"],
  "Farg'ona viloyati": ["Farg'ona sh.", "Qo'qon sh.", "Marg'ilon sh.", "Quva tumani", "Rishton tumani"],
  "Andijon viloyati": ["Andijon sh.", "Asaka tumani", "Shahrixon tumani", "Xonobod sh.", "Baliqchi tumani"],
  "Namangan viloyati": ["Namangan sh.", "Chust tumani", "Pop tumani", "To'raqo'rg'on tumani", "Kosonsoy tumani"],
  "Buxoro viloyati": ["Buxoro sh.", "G'ijduvon tumani", "Kogon sh.", "Vobkent tumani", "Qorako'l tumani"],
  "Qashqadaryo viloyati": ["Qarshi sh.", "Shahrisabz sh.", "Kitob tumani", "G'uzor tumani", "Koson tumani"],
  "Surxondaryo viloyati": ["Termiz sh.", "Denov tumani", "Sherobod tumani", "Boysun tumani", "Jarqo'rg'on tumani"],
  "Xorazm viloyati": ["Urganch sh.", "Xiva sh.", "Hazorasp tumani", "Xonqa tumani", "Gurlan tumani"],
  "Navoiy viloyati": ["Navoiy sh.", "Zarafshon sh.", "Karmana tumani", "Qiziltepa tumani", "Nurota tumani"],
  "Jizzax viloyati": ["Jizzax sh.", "Zomin tumani", "G'allaorol tumani", "Sharof Rashidov tumani", "Do'stlik tumani"],
  "Sirdaryo viloyati": ["Guliston sh.", "Yangiyer sh.", "Shirin sh.", "Sirdaryo tumani", "Boyovut tumani"]
};

const SPECIALTIES = [
  { id: 'all', name: "Barcha yo'nalishlar", icon: '🩺' },
  { id: 'Kardiolog', name: 'Kardiolog', icon: '❤️' },
  { id: 'Pediatr', name: 'Pediatr', icon: '👶' },
  { id: 'Stomatolog', name: 'Stomatolog', icon: '🦷' },
  { id: 'Nevropatolog', name: 'Nevropatolog', icon: '🧠' },
  { id: 'Terapevt', name: 'Terapevt', icon: '👨‍⚕️' },
  { id: 'Okulist', name: 'Okulist', icon: '👁️' },
  { id: 'LOR', name: 'LOR', icon: '👂' }
];

const ALL_TIME_SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00"];

const DEFAULT_DOCTORS = [
  { id: 1, name: "Dr. Azizbek Rahimov", specialty: "Kardiolog", region: "Toshkent viloyati", district: "Chirchiq sh.", clinic: "Chirchiq Markaziy Poliklinikasi", clinicType: "Davlat", room: "204-xona", experience: "14 yil", rating: 4.9, price: "Bepul / 45 000 so'm", prefix: "K", login: "kardiolog", pin: "2040", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:00", "09:30"] },
  { id: 2, name: "Dr. Dilnoza Karimova", specialty: "Pediatr", region: "Toshkent viloyati", district: "Qibray tumani", clinic: "MedLine Kids Xususiy Klinikasi", clinicType: "Xususiy", room: "108-xona", experience: "9 yil", rating: 5.0, price: "100 000 so'm", prefix: "P", login: "pediatr", pin: "1080", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=80", bookedSlots: ["08:30", "11:00"] },
  { id: 3, name: "Dr. Jamshid Rustamov", specialty: "Stomatolog", region: "Samarqand viloyati", district: "Samarqand sh.", clinic: "SamDent Stomatologiya Markazi", clinicType: "Xususiy", room: "12-xona", experience: "11 yil", rating: 4.8, price: "80 000 so'm", prefix: "S", login: "stomatolog", pin: "1200", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:00"] },
  { id: 4, name: "Dr. Malika To'xtayeva", specialty: "Nevropatolog", region: "Farg'ona viloyati", district: "Farg'ona sh.", clinic: "Farg'ona Diagnostika Markazi", clinicType: "Davlat", room: "305-xona", experience: "17 yil", rating: 4.9, price: "35 000 so'm", prefix: "N", login: "nevro", pin: "3050", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80", bookedSlots: ["08:30", "10:00"] },
  { id: 5, name: "Dr. Sardorbek Aliyev", specialty: "Terapevt", region: "Andijon viloyati", district: "Andijon sh.", clinic: "Andijon 1-sonli Oilaviy Poliklinika", clinicType: "Davlat", room: "101-xona", experience: "12 yil", rating: 4.7, price: "Bepul", prefix: "T", login: "terapevt", pin: "1010", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:30"] },
  { id: 6, name: "Dr. Gulnora Saidova", specialty: "Okulist", region: "Buxoro viloyati", district: "Buxoro sh.", clinic: "Buxoro Nur Ko'z Klinikasi", clinicType: "Xususiy", room: "210-xona", experience: "15 yil", rating: 5.0, price: "90 000 so'm", prefix: "O", login: "okulist", pin: "2100", avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&auto=format&fit=crop&q=80", bookedSlots: ["11:30"] },
  { id: 7, name: "Dr. Otabek Xolmatov", specialty: "LOR", region: "Namangan viloyati", district: "Namangan sh.", clinic: "Namangan Shifo LOR Markazi", clinicType: "Xususiy", room: "114-xona", experience: "10 yil", rating: 4.9, price: "70 000 so'm", prefix: "L", login: "lor", pin: "1140", avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80", bookedSlots: ["10:30"] },
  { id: 8, name: "Dr. Shaxnoza Qodirova", specialty: "Terapevt", region: "Qashqadaryo viloyati", district: "Qarshi sh.", clinic: "Qarshi Markaziy Poliklinikasi", clinicType: "Davlat", room: "105-xona", experience: "8 yil", rating: 4.8, price: "Bepul", prefix: "T", login: "qarshi", pin: "1050", avatar: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:00"] },
  { id: 9, name: "Dr. Ulug'bek Normatov", specialty: "Kardiolog", region: "Surxondaryo viloyati", district: "Termiz sh.", clinic: "Termiz Kardiologiya Markazi", clinicType: "Davlat", room: "201-xona", experience: "16 yil", rating: 4.9, price: "35 000 so'm", prefix: "K", login: "termiz", pin: "2010", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80", bookedSlots: ["10:00"] },
  { id: 10, name: "Dr. Feruza Matyoqubova", specialty: "Pediatr", region: "Xorazm viloyati", district: "Urganch sh.", clinic: "Urganch Bolalar Shifoxonasi", clinicType: "Davlat", room: "103-xona", experience: "13 yil", rating: 5.0, price: "Bepul", prefix: "P", login: "urganch", pin: "1030", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=80", bookedSlots: ["08:30"] },
  { id: 11, name: "Dr. Boburjon Hasanov", specialty: "Nevropatolog", region: "Navoiy viloyati", district: "Navoiy sh.", clinic: "Navoiy Med Standard", clinicType: "Xususiy", room: "208-xona", experience: "11 yil", rating: 4.8, price: "85 000 so'm", prefix: "N", login: "navoiy", pin: "2080", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:00"] },
  { id: 12, name: "Dr. Nodira Bekmurodova", specialty: "Terapevt", region: "Jizzax viloyati", district: "Jizzax sh.", clinic: "Jizzax Shahar Poliklinikasi", clinicType: "Davlat", room: "110-xona", experience: "14 yil", rating: 4.9, price: "Bepul", prefix: "T", login: "jizzax", pin: "1100", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:30"] },
  { id: 13, name: "Dr. Sanjarbek Yo'ldoshev", specialty: "Stomatolog", region: "Sirdaryo viloyati", district: "Guliston sh.", clinic: "Guliston Denta Lux", clinicType: "Xususiy", room: "15-xona", experience: "9 yil", rating: 4.8, price: "75 000 so'm", prefix: "S", login: "guliston", pin: "1500", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80", bookedSlots: ["14:00"] }
];

const DEFAULT_QUEUE = [
  { id: 101, ticketNo: "K-011", patientName: "Olimjon Mahmudov", phone: "+998 90 123 45 67", doctorId: 1, doctorName: "Dr. Azizbek Rahimov", specialty: "Kardiolog", clinic: "Chirchiq Markaziy Poliklinikasi", room: "204-xona", time: "09:00", status: "in_progress" },
  { id: 102, ticketNo: "K-012", patientName: "Saida Nazarova", phone: "+998 93 456 78 90", doctorId: 1, doctorName: "Dr. Azizbek Rahimov", specialty: "Kardiolog", clinic: "Chirchiq Markaziy Poliklinikasi", room: "204-xona", time: "09:30", status: "waiting" },
  { id: 103, ticketNo: "P-004", patientName: "Jasurbek Tursunov", phone: "+998 99 876 54 32", doctorId: 2, doctorName: "Dr. Dilnoza Karimova", specialty: "Pediatr", clinic: "MedLine Kids Xususiy Klinikasi", room: "108-xona", time: "08:30", status: "in_progress" },
  { id: 104, ticketNo: "P-005", patientName: "Zarina Umarova", phone: "+998 97 111 22 33", doctorId: 2, doctorName: "Dr. Dilnoza Karimova", specialty: "Pediatr", clinic: "MedLine Kids Xususiy Klinikasi", room: "108-xona", time: "11:00", status: "waiting" }
];

const DB_KEYS = {
  DOCTORS: 'doctime_db_doctors_v1',
  QUEUE: 'doctime_db_queue_v1',
  MY_TICKETS: 'doctime_db_mytickets_v1',
  ADMIN: 'doctime_db_admin_v1',
  THREADS: 'doctime_db_threads_v1',
  SETTINGS: 'doctime_db_settings_v1'
};

const ACTIVE = ['waiting', 'in_progress'];
const STATUS = {
  waiting: { label: 'Kutmoqda', cls: 'bg-amber-100 text-amber-800' },
  in_progress: { label: 'Xonada', cls: 'bg-emerald-600 text-white' },
  completed: { label: 'Yakunlangan', cls: 'bg-slate-200 text-slate-700' },
  noshow: { label: 'Kelmadi', cls: 'bg-orange-100 text-orange-700' },
  cancelled: { label: 'Bekor qilingan', cls: 'bg-rose-100 text-rose-700' }
};

/* ---------- Yordamchi funksiyalar ---------- */
const clone = o => JSON.parse(JSON.stringify(o));
const $ = id => document.getElementById(id);
const val = id => ($(id) ? $(id).value : '');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sortByTime = (a, b) => String(a.time).localeCompare(String(b.time));
const isValidPhone = p => /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(p);
const freeSlotsOf = doc => ALL_TIME_SLOTS.filter(s => !doc.bookedSlots.includes(s));

function loadJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    if (v !== null && typeof v === typeof fallback && Array.isArray(v) === Array.isArray(fallback)) return v;
  } catch (e) { /* buzilgan ma'lumot — boshlang'ich holatga qaytamiz */ }
  return clone(fallback);
}

let doctors = loadJSON(DB_KEYS.DOCTORS, DEFAULT_DOCTORS);
let queue = loadJSON(DB_KEYS.QUEUE, DEFAULT_QUEUE);
let myTicketIds = loadJSON(DB_KEYS.MY_TICKETS, [102]);
let adminCreds = loadJSON(DB_KEYS.ADMIN, { login: 'admin', pin: '7777' });
let threads = loadJSON(DB_KEYS.THREADS, []);
let settings = loadJSON(DB_KEYS.SETTINGS, { followupDays: 14 });

let selectedSpecialty = 'all';
let activeBookingDocId = null;
let selectedSlotTime = '';
let loggedInDoctorId = Number(sessionStorage.getItem('doctime_doc_session')) || null;
let isAdminLoggedIn = sessionStorage.getItem('doctime_admin_session') === '1';

function saveDatabase() {
  syncThreads();
  const ids = new Set(queue.map(q => q.id));
  myTicketIds = myTicketIds.filter(id => ids.has(id));
  try {
    localStorage.setItem(DB_KEYS.DOCTORS, JSON.stringify(doctors));
    localStorage.setItem(DB_KEYS.QUEUE, JSON.stringify(queue));
    localStorage.setItem(DB_KEYS.MY_TICKETS, JSON.stringify(myTicketIds));
    localStorage.setItem(DB_KEYS.ADMIN, JSON.stringify(adminCreds));
    localStorage.setItem(DB_KEYS.THREADS, JSON.stringify(threads));
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    showToast("⚠️ Ma'lumotni saqlab bo'lmadi (brauzer xotirasi bloklangan yoki to'lgan)");
  }
  updateBadge();
}

function updateBadge() {
  const b = $('my-ticket-badge');
  if (b) b.textContent = queue.filter(q => myTicketIds.includes(q.id) && ACTIVE.includes(q.status)).length;
  updateChatBadge();
}

function refreshAll() {
  saveDatabase();
  renderDoctors();
  renderTablo();
  renderMyTickets();
  renderDoctorPanel();
  renderAdminPanel();
  renderChat();
}

function reloadFromStorage() {
  doctors = loadJSON(DB_KEYS.DOCTORS, DEFAULT_DOCTORS);
  queue = loadJSON(DB_KEYS.QUEUE, DEFAULT_QUEUE);
  myTicketIds = loadJSON(DB_KEYS.MY_TICKETS, [102]);
  adminCreds = loadJSON(DB_KEYS.ADMIN, { login: 'admin', pin: '7777' });
  threads = loadJSON(DB_KEYS.THREADS, []);
  settings = loadJSON(DB_KEYS.SETTINGS, { followupDays: 14 });
  updateBadge();
  renderDoctors(); renderTablo(); renderMyTickets(); renderDoctorPanel(); renderAdminPanel(); renderChat();
}

function resetDatabase() {
  if (!confirm("Barcha ma'lumotlarni (shifokorlar, talonlar) boshlang'ich holatiga qaytarishni xohlaysizmi?")) return;
  doctors = clone(DEFAULT_DOCTORS);
  queue = clone(DEFAULT_QUEUE);
  myTicketIds = [102];
  threads = [];
  loggedInDoctorId = null;
  sessionStorage.removeItem('doctime_doc_session');
  refreshAll();
  showToast("🔄 Baza boshlang'ich holatiga qaytarildi!");
}

/* ---------- Toast, modal, xatolik ---------- */
let toastTimer;
function showToast(msg) {
  const toast = $('toast');
  $('toast-msg').textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3800);
}

function openModal(id) { const m = $(id); m.classList.remove('hidden'); m.classList.add('flex'); }
function closeModal(id) { const m = $(id); m.classList.add('hidden'); m.classList.remove('flex'); }
function showError(id, msg) { const e = $(id); e.textContent = msg; e.classList.remove('hidden'); }
function hideError(id) { const e = $(id); if (e) e.classList.add('hidden'); }

const attempts = {};
function lockSeconds(k) { const a = attempts[k]; return a && a.until > Date.now() ? Math.ceil((a.until - Date.now()) / 1000) : 0; }
function failAttempt(k) {
  const a = attempts[k] || (attempts[k] = { n: 0, until: 0 });
  if (++a.n >= 5) { a.until = Date.now() + 30000; a.n = 0; }
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(x => x.lang.toLowerCase().startsWith('uz')) || voices.find(x => x.lang.toLowerCase().startsWith('ru'));
  if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'ru-RU'; }
  window.speechSynthesis.speak(u);
}

/* ---------- Ishga tushirish ---------- */
window.addEventListener('DOMContentLoaded', () => {
  saveDatabase();
  initRegions();
  renderSpecialtyPills();
  renderDoctors();
  renderTablo();
  renderMyTickets();
  renderDoctorPanel();
  renderChat();
  updateClock();
  setInterval(updateClock, 1000);
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

window.addEventListener('storage', e => {
  if (Object.values(DB_KEYS).includes(e.key)) reloadFromStorage();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') ['booking-modal', 'doctor-form-modal', 'walkin-modal', 'password-modal'].forEach(closeModal);
    closeChat();
});

function updateClock() {
  const el = $('live-clock');
  if (el) el.textContent = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

function switchTab(tabName) {
  const tab = $(`tab-${tabName}`);
  if (!tab) return;
  document.querySelectorAll('.tab-section').forEach(el => el.classList.add('hidden'));
  tab.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
  const activeBtn = $(`nav-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-nav');

  document.querySelectorAll('.mnav-btn').forEach(b => {
    const on = b.dataset.tab === tabName;
    b.classList.toggle('text-teal-700', on);
    b.classList.toggle('font-bold', on);
    b.classList.toggle('text-slate-600', !on);
    b.classList.toggle('font-semibold', !on);
  });

  if (tabName === 'tablo') renderTablo();
  if (tabName === 'tickets') renderMyTickets();
  if (tabName === 'doctor') renderDoctorPanel();
  if (tabName === 'admin') renderAdminPanel();
  window.scrollTo({ top: 0 });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ---------- Hudud tanlash ---------- */
function fillSelect(sel, items, firstLabel) {
  sel.innerHTML = (firstLabel !== undefined ? `<option value="">${esc(firstLabel)}</option>` : '') +
    items.map(i => `<option value="${esc(i)}">${esc(i)}</option>`).join('');
}

function initRegions() {
  const regions = Object.keys(REGIONS_DATA);
  fillSelect($('region-select'), regions, 'Barcha viloyatlar (12 ta)');
  fillSelect($('admin-doc-region'), regions, 'Barcha viloyatlar');
  fillSelect($('doc-form-region'), regions);
  fillSelect($('doc-form-spec'), SPECIALTIES.filter(s => s.id !== 'all').map(s => s.id));
  fillFormDistricts();
}

function handleRegionChange() {
  const reg = val('region-select');
  const distSelect = $('district-select');
  if (!reg) {
    distSelect.disabled = true;
    distSelect.innerHTML = '<option value="">Avval viloyatni tanlang</option>';
  } else {
    distSelect.disabled = false;
    fillSelect(distSelect, REGIONS_DATA[reg], 'Barcha tuman va shaharlar');
  }
  renderDoctors();
}

function fillFormDistricts(selected) {
  const reg = val('doc-form-region');
  fillSelect($('doc-form-district'), REGIONS_DATA[reg] || []);
  if (selected) $('doc-form-district').value = selected;
}

function renderSpecialtyPills() {
  $('specialty-pills').innerHTML = SPECIALTIES.map(s => `
    <button onclick="selectSpecialty('${s.id}')" class="px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
      selectedSpecialty === s.id ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300'
    }"><span>${s.icon}</span><span>${esc(s.name)}</span></button>
  `).join('');
}

function selectSpecialty(id) {
  selectedSpecialty = id;
  renderSpecialtyPills();
  renderDoctors();
}

/* ---------- Shifokorlar ro'yxati ---------- */
function renderDoctors() {
  const reg = val('region-select');
  const dist = val('district-select');
  const query = val('search-input').trim().toLowerCase();

  const filtered = doctors.filter(d =>
    (!reg || d.region === reg) &&
    (!dist || d.district === dist) &&
    (selectedSpecialty === 'all' || d.specialty === selectedSpecialty) &&
    (!query || d.name.toLowerCase().includes(query) || d.clinic.toLowerCase().includes(query) || d.region.toLowerCase().includes(query))
  );

  $('found-count').textContent = `${filtered.length} ta shifokor`;

  if (filtered.length === 0) {
    $('doctors-grid').innerHTML = '<p class="col-span-full text-center text-sm text-slate-500 py-10">Hech narsa topilmadi. Filtrlarni o\'zgartirib ko\'ring.</p>';
    return;
  }

  $('doctors-grid').innerHTML = filtered.map(doc => {
    const free = freeSlotsOf(doc);
    const slotsHtml = ALL_TIME_SLOTS.map(slot => {
      const booked = doc.bookedSlots.includes(slot);
      return `<button ${booked ? 'disabled' : `onclick="openBookingModal(${doc.id}, '${slot}')"`}
        class="py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-all ${booked
          ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
          : 'bg-white text-emerald-700 border-emerald-300 hover:bg-teal-600 hover:text-white'}">${slot}</button>`;
    }).join('');

    return `
      <div class="bg-white rounded-3xl p-5 border border-teal-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-start gap-3.5 mb-3.5">
            <img src="${esc(doc.avatar)}" alt="${esc(doc.name)}" loading="lazy" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-100 shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 mb-1">
                <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">${esc(doc.specialty)}</span>
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700">${esc(doc.clinicType)}</span>
              </div>
              <h3 class="text-base font-extrabold text-slate-900 truncate">${esc(doc.name)}</h3>
              <p class="text-xs text-slate-500">⭐ ${esc(doc.rating)} • Tajriba: ${esc(doc.experience)}</p>
            </div>
          </div>
          <div class="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-3.5">
            <div class="font-semibold text-slate-800 truncate">🏥 ${esc(doc.clinic)} (${esc(doc.room)})</div>
            <div class="truncate">📍 ${esc(doc.region)}, ${esc(doc.district)}</div>
            <div class="font-bold text-teal-700 pt-1">💳 ${esc(doc.price)}</div>
          </div>
          <div class="mb-4 bg-teal-50/50 border border-teal-100 rounded-2xl p-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-extrabold uppercase text-slate-700">Bugungi bo'sh vaqtlar:</span>
              <span class="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">${free.length} ta bo'sh</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5">${slotsHtml}</div>
          </div>
        </div>
        <button ${free.length ? `onclick="openBookingModal(${doc.id}, '${free[0]}')"` : 'disabled'}
          class="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all ${free.length ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'}">
          ${free.length ? 'Vaqt tanlash va yozilish' : "Bugun bo'sh vaqt qolmagan"}
        </button>
      </div>`;
  }).join('');
}

/* ---------- Talon yaratish ---------- */
function nextTicketNo(prefix) {
  let max = 0;
  queue.forEach(q => {
    const m = String(q.ticketNo).match(/^([A-Z]+)-(\d+)/);
    if (m && m[1] === prefix) max = Math.max(max, Number(m[2]));
  });
  return `${prefix}-${String(max + 1).padStart(3, '0')}`;
}

function hasActiveTicket(docId, phone) {
  return queue.some(q => q.doctorId === docId && q.phone === phone && ACTIVE.includes(q.status));
}

function createTicket(doc, name, phone, time) {
  if (ALL_TIME_SLOTS.includes(time)) doc.bookedSlots.push(time);
  const t = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    ticketNo: nextTicketNo(doc.prefix),
    patientName: name, phone,
    doctorId: doc.id, doctorName: doc.name, specialty: doc.specialty,
    clinic: doc.clinic, room: doc.room, time, status: 'waiting'
  };
  queue.push(t);
  return t;
}

function freeSlot(t) {
  const doc = doctors.find(d => d.id === t.doctorId);
  if (doc) doc.bookedSlots = doc.bookedSlots.filter(s => s !== t.time);
}

/* ---------- Onlayn yozilish ---------- */
function openBookingModal(docId, defaultSlot) {
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;
  activeBookingDocId = docId;
  const free = freeSlotsOf(doc);
  selectedSlotTime = free.includes(defaultSlot) ? defaultSlot : (free[0] || '');
  $('modal-doc-name').textContent = `${doc.name} (${doc.specialty})`;
  $('modal-doc-clinic').textContent = `${doc.clinic} • ${doc.room}`;
  hideError('booking-error');
  renderModalSlots();
  openModal('booking-modal');
}

function renderModalSlots() {
  const doc = doctors.find(d => d.id === activeBookingDocId);
  if (!doc) return;
  $('modal-slots-grid').innerHTML = ALL_TIME_SLOTS.map(slot => {
    const booked = doc.bookedSlots.includes(slot);
    const sel = selectedSlotTime === slot;
    return `<button type="button" ${booked ? 'disabled' : `onclick="chooseSlot('${slot}')"`}
      class="py-2 rounded-xl text-xs font-bold border transition-all ${booked
        ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
        : sel ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'}">
      ${slot} ${booked ? '(Band)' : sel ? '✓' : ''}</button>`;
  }).join('');
}

function chooseSlot(slot) { selectedSlotTime = slot; renderModalSlots(); }

function closeBookingModal() {
  closeModal('booking-modal');
  $('patient-phone-input').value = '+998 ';
}

function formatPhone(input) {
  let digits = input.value.replace(/\D/g, '');
  if (!digits.startsWith('998')) digits = '998' + digits;
  digits = digits.slice(0, 12);
  let res = '+998';
  if (digits.length > 3) res += ' ' + digits.slice(3, 5);
  if (digits.length > 5) res += ' ' + digits.slice(5, 8);
  if (digits.length > 8) res += ' ' + digits.slice(8, 10);
  if (digits.length > 10) res += ' ' + digits.slice(10, 12);
  input.value = res;
}

function submitBooking(e) {
  e.preventDefault();
  const name = val('patient-name-input').trim();
  const phone = val('patient-phone-input').trim();
  const doc = doctors.find(d => d.id === activeBookingDocId);

  if (!doc) return showError('booking-error', 'Shifokor topilmadi. Sahifani yangilang.');
  if (!selectedSlotTime) return showError('booking-error', "Iltimos, bo'sh soatlardan birini tanlang!");
  if (doc.bookedSlots.includes(selectedSlotTime)) {
    selectedSlotTime = '';
    renderModalSlots(); renderDoctors();
    return showError('booking-error', "Bu vaqt hozirgina band bo'ldi. Boshqa soatni tanlang.");
  }
  if (name.length < 3) return showError('booking-error', "Ism-sharifni to'liq kiriting (kamida 3 harf).");
  if (!isValidPhone(phone)) return showError('booking-error', "Telefon raqamini to'liq kiriting: +998 XX XXX XX XX");
  if (hasActiveTicket(doc.id, phone)) return showError('booking-error', "Bu raqamga shu shifokorga faol talon allaqachon olingan.");

  const t = createTicket(doc, name, phone, selectedSlotTime);
  myTicketIds.unshift(t.id);
  closeBookingModal();
  $('patient-name-input').value = '';
  refreshAll();
  showToast(`✅ Navbat olindi! Talon: ${t.ticketNo} (${t.time})`);
  switchTab('tickets');
}

/* ---------- Jonli tablo ---------- */
function renderTablo() {
  const inProg = queue.filter(q => q.status === 'in_progress');
  const waiting = queue.filter(q => q.status === 'waiting').sort(sortByTime);

  $('tablo-inprogress').innerHTML = inProg.length === 0
    ? '<p class="text-slate-400 text-xs">Hozir xonalarda bemor yo\'q</p>'
    : inProg.map(i => `
      <div class="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl">
        <div>
          <span class="text-2xl font-black text-emerald-400">${esc(i.ticketNo)}</span>
          <p class="text-xs text-slate-300 mt-0.5">${esc(i.patientName)} • ${esc(i.doctorName)}</p>
        </div>
        <div class="text-right">
          <span class="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm">${esc(i.room)}</span>
          <p class="text-[11px] text-emerald-300 mt-1">Kirishingiz mumkin</p>
        </div>
      </div>`).join('');

  $('tablo-waiting').innerHTML = waiting.length === 0
    ? '<p class="text-slate-400 text-xs">Kutayotgan bemorlar yo\'q</p>'
    : waiting.map(i => `
      <div class="flex items-center justify-between bg-slate-900/90 border border-slate-700 p-3.5 rounded-2xl">
        <div>
          <span class="text-xl font-extrabold text-amber-400">${esc(i.ticketNo)}</span>
          <p class="text-xs text-slate-400">${esc(i.patientName)} (Soat ${esc(i.time)})</p>
        </div>
        <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl">${esc(i.room)}</span>
      </div>`).join('');
}

/* ---------- Mening talonim ---------- */
function findTicket(e) {
  e.preventDefault();
  const code = val('ticket-code-input').trim().toUpperCase();
  const phone = val('ticket-phone-input').trim();
  const t = queue.find(q => q.ticketNo.toUpperCase() === code && q.phone === phone && ACTIVE.includes(q.status));
  if (!t) return showToast("Talon topilmadi. Kod va telefon raqami bir xil bo'lishi kerak.");
  if (!myTicketIds.includes(t.id)) myTicketIds.unshift(t.id);
  $('ticket-code-input').value = '';
  $('ticket-phone-input').value = '+998 ';
  refreshAll();
  showToast(`✅ ${t.ticketNo} talon qo'shildi`);
}

function renderMyTickets() {
  const list = queue.filter(q => myTicketIds.includes(q.id) && ACTIVE.includes(q.status)).sort(sortByTime);
  const container = $('my-tickets-list');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<p class="text-sm text-slate-500">Sizda hozircha faol talonlar yo'q.</p>`;
    return;
  }
  container.innerHTML = list.map(t => {
    const ahead = t.status === 'waiting'
      ? queue.filter(q => q.id !== t.id && q.doctorId === t.doctorId && ACTIVE.includes(q.status) && (q.status === 'in_progress' || q.time < t.time)).length
      : 0;
    const inProg = t.status === 'in_progress';
    return `
    <div class="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-2xl font-black text-teal-700">${esc(t.ticketNo)}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Soat ${esc(t.time)}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${inProg ? 'bg-emerald-600 text-white' : 'bg-white text-teal-700 border border-teal-200'}">${inProg ? 'Xonaga kiring!' : 'Navbat kutmoqda'}</span>
        </div>
        <p class="text-sm font-bold text-slate-900">${esc(t.doctorName)} (${esc(t.specialty)})</p>
        <p class="text-xs text-slate-600">🏥 ${esc(t.clinic)} • <strong>${esc(t.room)}</strong></p>
        <p class="text-xs text-slate-500">👤 Bemor: ${esc(t.patientName)} (${esc(t.phone)})</p>
        ${inProg ? '' : `<p class="text-xs font-semibold text-teal-700">⏳ O'zingizdan oldin: ${ahead} kishi</p>`}
      </div>
      ${inProg ? '' : `<button onclick="cancelTicket(${t.id})" class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 self-start sm:self-center">Navbatni bekor qilish</button>`}
    </div>`;
  }).join('');
}

/* ---------- Talon holatini o'zgartirish ---------- */
function cancelTicket(id) {
  const t = queue.find(q => q.id === id);
  if (!t || t.status !== 'waiting') return;
  if (!confirm(`${t.ticketNo} talonini bekor qilmoqchimisiz?`)) return;
  freeSlot(t);
  t.status = 'cancelled';
  refreshAll();
  showToast("Talon bekor qilindi va shifokor vaqti bo'shatildi!");
}

function announce(t, doc) {
  t.status = 'in_progress';
  showToast(`📢 ${t.ticketNo} (${t.patientName}) — ${doc.room}ga chaqirildi!`);
  speak(`Talon raqami ${t.ticketNo.replace('-', ' ')}. ${doc.room}ga kiring.`);
}

function completeCurrent(docId) {
  queue.forEach(q => { if (q.doctorId === docId && q.status === 'in_progress') { q.status = 'completed'; q.completedAt = Date.now(); } });
}

function callNextPatient(docId) {
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;
  const next = queue.filter(q => q.doctorId === docId && q.status === 'waiting').sort(sortByTime)[0];
  completeCurrent(docId);
  if (next) announce(next, doc);
  else showToast(`${doc.name} xonasida kutayotgan bemorlar qolmadi.`);
  refreshAll();
}

function finishCurrent(docId) {
  completeCurrent(docId);
  refreshAll();
  showToast('Qabul yakunlandi');
}

/* ---------- Shifokor paneli ---------- */
function handleDoctorOnlyLogin(e) {
  e.preventDefault();
  const lock = lockSeconds('doc');
  if (lock) return showError('doc-auth-error', `Juda ko'p urinish. ${lock} soniyadan so'ng qayta urinib ko'ring.`);
  const login = val('doc-login-input').trim().toLowerCase();
  const pin = val('doc-pin-input').trim();
  const doc = doctors.find(d => d.login.toLowerCase() === login && String(d.pin) === pin);
  if (!doc) {
    failAttempt('doc');
    return showError('doc-auth-error', 'Shifokor logini yoki PIN-kodi xato!');
  }
  delete attempts.doc;
  loggedInDoctorId = doc.id;
  sessionStorage.setItem('doctime_doc_session', String(doc.id));
  $('doc-login-input').value = '';
  $('doc-pin-input').value = '';
  hideError('doc-auth-error');
  renderDoctorPanel();
  updateChatBadge();
  showToast(`👨‍⚕️ Xush kelibsiz, ${doc.name}!`);
}

function logoutDoctor() {
  loggedInDoctorId = null;
  sessionStorage.removeItem('doctime_doc_session');
  renderDoctorPanel();
  updateChatBadge();
  showToast('Shifokor kabinetidan chiqildi');
}

function renderDoctorPanel() {
  const loginBox = $('doctor-login-box');
  const dashBox = $('doctor-dashboard-box');
  if (!loginBox || !dashBox) return;
  const doc = loggedInDoctorId ? doctors.find(d => d.id === loggedInDoctorId) : null;

  if (!doc) {
    loggedInDoctorId = null;
    sessionStorage.removeItem('doctime_doc_session');
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }
  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');
  $('dash-doc-name').textContent = doc.name;
  $('dash-doc-info').textContent = `${doc.specialty} • ${doc.clinic} (${doc.room})`;

  const docQueue = queue.filter(q => q.doctorId === doc.id && ACTIVE.includes(q.status))
    .sort((a, b) => (a.status === 'in_progress' ? -1 : 0) - (b.status === 'in_progress' ? -1 : 0) || sortByTime(a, b));
  const hasCurrent = docQueue.some(q => q.status === 'in_progress');

  $('dash-doc-queue').innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h3 class="text-base font-bold text-slate-800">Xonangiz navbati (${docQueue.length} nafar bemor)</h3>
      <div class="flex flex-wrap gap-2">
        ${hasCurrent ? `<button onclick="finishCurrent(${doc.id})" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm">✔ Qabulni yakunlash</button>` : ''}
        <button onclick="callNextPatient(${doc.id})" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg">📢 Keyingi bemorni chaqirish</button>
      </div>
    </div>
    <div class="space-y-2.5">
      ${docQueue.length === 0 ? '<p class="text-sm text-slate-500">Xonangizda kutayotgan bemorlar yo\'q.</p>' : docQueue.map(i => `
        <div class="p-4 rounded-2xl border flex items-center justify-between gap-3 ${i.status === 'in_progress' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}">
          <div class="min-w-0">
            <span class="text-lg font-black text-teal-800">${esc(i.ticketNo)}</span>
            <span class="ml-2 text-sm font-bold text-slate-800">${esc(i.patientName)}</span>
            <p class="text-xs text-slate-500">Soat: ${esc(i.time)} • Tel: ${esc(i.phone)}</p>
          </div>
          <span class="px-3 py-1 rounded-lg text-xs font-bold shrink-0 ${STATUS[i.status].cls}">${i.status === 'in_progress' ? 'Xonada (Qabulda)' : 'Kutmoqda'}</span>
        </div>`).join('')}
    </div>`;
  renderDoctorMessages();
}

/* ================= ADMIN PANEL ================= */
function handleAdminLogin(e) {
  e.preventDefault();
  const lock = lockSeconds('admin');
  if (lock) return showError('admin-auth-error', `Juda ko'p urinish. ${lock} soniyadan so'ng qayta urinib ko'ring.`);
  const login = val('admin-login-input').trim().toLowerCase();
  const pin = val('admin-pin-input').trim();
  if (login === String(adminCreds.login).toLowerCase() && pin === String(adminCreds.pin)) {
    delete attempts.admin;
    isAdminLoggedIn = true;
    sessionStorage.setItem('doctime_admin_session', '1');
    $('admin-login-input').value = '';
    $('admin-pin-input').value = '';
    hideError('admin-auth-error');
    renderAdminPanel();
    updateChatBadge();
    showToast('👑 Bosh Admin paneliga xush kelibsiz!');
  } else {
    failAttempt('admin');
    showError('admin-auth-error', "Admin logini yoki paroli noto'g'ri!");
  }
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem('doctime_admin_session');
  renderAdminPanel();
  updateChatBadge();
  showToast('Admin paneldan chiqildi');
}

function renderAdminPanel() {
  const loginBox = $('admin-login-box');
  const dashBox = $('admin-dashboard-box');
  if (!loginBox || !dashBox) return;
  if (!isAdminLoggedIn) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }
  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');
  renderAdminStats();
  renderAdminRooms();
  renderAdminTickets();
  renderAdminMessages();
}

function renderAdminStats() {
  const count = s => queue.filter(q => q.status === s).length;
  const cards = [
    ['Shifokorlar', doctors.length, 'bg-white border-teal-100', 'text-slate-900'],
    ['Kutmoqda', count('waiting'), 'bg-amber-50/80 border-amber-200', 'text-amber-700'],
    ['Qabulda', count('in_progress'), 'bg-emerald-50/80 border-emerald-200', 'text-emerald-700'],
    ['Yakunlangan', count('completed'), 'bg-teal-50/80 border-teal-200', 'text-teal-700'],
    ['Kelmagan / bekor', count('noshow') + count('cancelled'), 'bg-rose-50/80 border-rose-200', 'text-rose-700'],
    ['Jami talonlar', queue.length, 'bg-white border-slate-200', 'text-slate-900']
  ];
  $('admin-stats-grid').innerHTML = cards.map(([l, v, box, txt]) => `
    <div class="p-4 rounded-2xl border ${box}">
      <div class="text-[11px] font-extrabold uppercase text-slate-500">${l}</div>
      <div class="text-3xl font-black mt-1 ${txt}">${v}</div>
    </div>`).join('');
}

function renderAdminRooms() {
  const q = val('admin-doc-search').trim().toLowerCase();
  const reg = val('admin-doc-region');
  const list = doctors.filter(d =>
    (!reg || d.region === reg) &&
    (!q || [d.name, d.clinic, d.login, d.room, d.specialty].some(x => String(x).toLowerCase().includes(q)))
  );
  $('admin-doc-count').textContent = `${list.length} / ${doctors.length} ta`;

  $('admin-rooms-grid').innerHTML = list.length === 0
    ? '<p class="col-span-full text-sm text-slate-500">Shifokor topilmadi.</p>'
    : list.map(doc => {
      const cur = queue.find(x => x.doctorId === doc.id && x.status === 'in_progress');
      const waiting = queue.filter(x => x.doctorId === doc.id && x.status === 'waiting').length;
      return `
      <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 text-xs font-bold text-teal-700 mb-1">
            <span>${esc(doc.specialty)} (${esc(doc.room)})</span>
            <span class="text-[11px] font-mono text-slate-500">login: ${esc(doc.login)}</span>
          </div>
          <h4 class="font-extrabold text-slate-900 text-base">${esc(doc.name)}</h4>
          <p class="text-[11px] text-slate-500 mb-3 truncate">${esc(doc.region)} • ${esc(doc.clinic)}</p>
          <div class="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 mb-3">
            <div>Xonada: <strong class="text-emerald-700">${cur ? `${esc(cur.ticketNo)} (${esc(cur.patientName)})` : "Bo'sh"}</strong></div>
            <div>Navbatda: <strong class="text-amber-700">${waiting} kishi</strong> • Band slotlar: <strong>${doc.bookedSlots.length}/${ALL_TIME_SLOTS.length}</strong></div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="callNextPatient(${doc.id})" class="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm">📢 Keyingisini chaqirish</button>
          <button onclick="openDoctorForm(${doc.id})" title="Tahrirlash" class="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">✏️</button>
          <button onclick="deleteDoctor(${doc.id})" title="O'chirish" class="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold">🗑️</button>
        </div>
      </div>`;
    }).join('');
}

function renderAdminTickets() {
  const docSel = $('admin-ticket-doctor');
  const prev = docSel.value;
  docSel.innerHTML = '<option value="">Barcha shifokorlar</option>' +
    doctors.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join('');
  docSel.value = doctors.some(d => String(d.id) === prev) ? prev : '';

  const st = val('admin-ticket-status') || 'active';
  const q = val('admin-ticket-search').trim().toLowerCase();
  const docId = docSel.value;
  const order = { in_progress: 0, waiting: 1, completed: 2, noshow: 3, cancelled: 4 };

  const list = queue.filter(t =>
    (st === 'all' || (st === 'active' ? ACTIVE.includes(t.status) : t.status === st)) &&
    (!docId || String(t.doctorId) === docId) &&
    (!q || [t.ticketNo, t.patientName, t.phone, t.doctorName].some(x => String(x).toLowerCase().includes(q)))
  ).sort((a, b) => order[a.status] - order[b.status] || sortByTime(a, b));

  $('admin-ticket-count').textContent = `${list.length} ta talon`;
  const btn = (fn, id, label, cls) => `<button onclick="${fn}(${id})" class="px-3 py-1.5 rounded-xl font-bold text-xs border ${cls}">${label}</button>`;

  $('admin-all-tickets').innerHTML = list.length === 0
    ? '<p class="text-sm text-slate-500">Bu filtr bo\'yicha talon topilmadi.</p>'
    : list.map(t => {
      const s = STATUS[t.status] || STATUS.waiting;
      let actions = '';
      if (t.status === 'waiting') {
        actions = btn('callTicket', t.id, '📢 Chaqirish', 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700') +
          btn('markNoShow', t.id, 'Kelmadi', 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100') +
          btn('adminCancelTicket', t.id, 'Bekor qilish', 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100');
      } else if (t.status === 'in_progress') {
        actions = btn('finishTicket', t.id, '✔ Yakunlash', 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700') +
          btn('adminCancelTicket', t.id, 'Bekor qilish', 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100');
      } else {
        actions = btn('deleteTicket', t.id, "O'chirish", 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100');
      }
      return `
      <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div class="min-w-0">
          <span class="text-base font-black text-teal-700">${esc(t.ticketNo)}</span>
          <span class="ml-2 text-sm font-bold text-slate-900">${esc(t.patientName)}</span>
          <span class="ml-2 text-xs text-slate-500">(${esc(t.phone)})</span>
          <p class="text-xs text-slate-600 mt-0.5">${esc(t.doctorName)} • <strong>${esc(t.room)}</strong> • Soat: <strong>${esc(t.time)}</strong></p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${s.cls}">${s.label}</span>${actions}
        </div>
      </div>`;
    }).join('');
}

function callTicket(id) {
  const t = queue.find(q => q.id === id);
  const doc = t && doctors.find(d => d.id === t.doctorId);
  if (!t || !doc || t.status !== 'waiting') return;
  completeCurrent(doc.id);
  announce(t, doc);
  refreshAll();
}

function finishTicket(id) {
  const t = queue.find(q => q.id === id);
  if (!t || t.status !== 'in_progress') return;
  t.status = 'completed';
  t.completedAt = Date.now();
  refreshAll();
  showToast(`${t.ticketNo} qabuli yakunlandi`);
}

function markNoShow(id) {
  const t = queue.find(q => q.id === id);
  if (!t || t.status !== 'waiting') return;
  if (!confirm(`${t.patientName} kelmadi deb belgilansinmi? Vaqt (${t.time}) bo'shatiladi.`)) return;
  freeSlot(t);
  t.status = 'noshow';
  refreshAll();
  showToast(`${t.ticketNo} — "kelmadi" deb belgilandi, vaqt bo'shatildi`);
}

function adminCancelTicket(id) {
  const t = queue.find(q => q.id === id);
  if (!t || !ACTIVE.includes(t.status)) return;
  if (!confirm(`${t.ticketNo} (${t.patientName}) talonini bekor qilmoqchimisiz?`)) return;
  freeSlot(t);
  t.status = 'cancelled';
  refreshAll();
  showToast(`${t.ticketNo} bekor qilindi`);
}

function deleteTicket(id) {
  const t = queue.find(q => q.id === id);
  if (!t || ACTIVE.includes(t.status)) return;
  queue = queue.filter(q => q.id !== id);
  refreshAll();
}

function clearFinishedTickets() {
  const n = queue.filter(q => !ACTIVE.includes(q.status)).length;
  if (!n) return showToast("Tozalanadigan yozuv yo'q");
  if (!confirm(`${n} ta yakunlangan/bekor qilingan yozuv tarixdan o'chirilsinmi?`)) return;
  queue = queue.filter(q => ACTIVE.includes(q.status));
  refreshAll();
  showToast('Tarix tozalandi');
}

function exportTicketsCSV() {
  if (!queue.length) return showToast("Eksport qilish uchun talon yo'q");
  const cols = ['ticketNo', 'patientName', 'phone', 'doctorName', 'specialty', 'clinic', 'room', 'time', 'status'];
  const head = ['Talon', 'Bemor', 'Telefon', 'Shifokor', "Yo'nalish", 'Klinika', 'Xona', 'Vaqt', 'Holat'];
  const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = queue.map(t => cols.map(c => cell(c === 'status' ? (STATUS[t.status]?.label || t.status) : t[c])).join(','));
  const blob = new Blob(['\ufeff' + [head.map(cell).join(','), ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `doctime-talonlar-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- Shifokor qo'shish / tahrirlash ---------- */
function openDoctorForm(id) {
  const doc = id ? doctors.find(d => d.id === id) : null;
  hideError('doc-form-error');
  $('doc-form-title').textContent = doc ? 'Shifokorni tahrirlash' : "Bazaga yangi shifokor qo'shish";
  $('doc-form-id').value = doc ? doc.id : '';
  $('doc-form-name').value = doc ? doc.name : '';
  $('doc-form-spec').value = doc ? doc.specialty : SPECIALTIES[1].id;
  $('doc-form-room').value = doc ? doc.room : '205-xona';
  $('doc-form-region').value = doc ? doc.region : Object.keys(REGIONS_DATA)[0];
  fillFormDistricts(doc ? doc.district : '');
  $('doc-form-clinic').value = doc ? doc.clinic : '';
  $('doc-form-type').value = doc ? doc.clinicType : 'Davlat';
  $('doc-form-price').value = doc ? doc.price : "45 000 so'm";
  $('doc-form-exp').value = doc ? parseInt(doc.experience, 10) || 1 : 5;
  $('doc-form-login').value = doc ? doc.login : '';
  $('doc-form-pin').value = doc ? doc.pin : '';
  openModal('doctor-form-modal');
}
const openAddDoctorModal = () => openDoctorForm();
const closeDoctorForm = () => closeModal('doctor-form-modal');

function submitDoctorForm(e) {
  e.preventDefault();
  const id = Number(val('doc-form-id')) || null;
  const name = val('doc-form-name').trim();
  const login = val('doc-form-login').trim().toLowerCase();
  const pin = val('doc-form-pin').trim();
  const clinic = val('doc-form-clinic').trim();
  const room = val('doc-form-room').trim();
  const exp = Math.max(0, Math.min(60, parseInt(val('doc-form-exp'), 10) || 0));

  if (name.length < 5) return showError('doc-form-error', "F.I.Sh ni to'liq kiriting.");
  if (clinic.length < 3 || !room) return showError('doc-form-error', 'Shifoxona va xona raqamini kiriting.');
  if (!/^[a-z0-9_]{3,20}$/.test(login)) return showError('doc-form-error', "Login 3–20 belgi: faqat lotin harflari, raqam va _ bo'lishi kerak.");
  if (doctors.some(d => d.login.toLowerCase() === login && d.id !== id)) return showError('doc-form-error', 'Bu login band. Boshqasini tanlang.');
  if (!/^\d{4}$/.test(pin)) return showError('doc-form-error', "PIN-kod aynan 4 ta raqamdan iborat bo'lishi kerak.");

  const spec = val('doc-form-spec');
  const data = {
    name, specialty: spec, room, clinic, login, pin,
    region: val('doc-form-region'), district: val('doc-form-district'),
    clinicType: val('doc-form-type'), price: val('doc-form-price').trim() || 'Narx belgilanmagan',
    experience: `${exp} yil`, prefix: spec.slice(0, 1).toUpperCase()
  };

  if (id) {
    const doc = doctors.find(d => d.id === id);
    if (!doc) return showError('doc-form-error', 'Shifokor topilmadi.');
    Object.assign(doc, data);
    queue.forEach(t => {
      if (t.doctorId === id) Object.assign(t, { doctorName: doc.name, specialty: doc.specialty, clinic: doc.clinic, room: doc.room });
    });
    showToast(`✅ ${doc.name} ma'lumotlari yangilandi`);
  } else {
    const doc = { id: Date.now(), rating: 5.0, avatar: DEFAULT_DOCTORS[0].avatar, bookedSlots: [], ...data };
    doctors.unshift(doc);
    showToast(`✅ ${doc.name} bazaga saqlandi!`);
  }
  closeDoctorForm();
  refreshAll();
}

function deleteDoctor(docId) {
  if (doctors.length <= 1) return showToast('Tizimda kamida 1 ta shifokor qolishi kerak!');
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;
  const active = queue.filter(q => q.doctorId === docId && ACTIVE.includes(q.status)).length;
  const warn = active ? `\n\nDiqqat: ${active} ta faol talon ham o'chiriladi!` : '';
  if (!confirm(`${doc.name} bazadan o'chirilsinmi?${warn}`)) return;
  doctors = doctors.filter(d => d.id !== docId);
  queue = queue.filter(q => q.doctorId !== docId);
  threads = threads.filter(t => t.doctorId !== docId);
  refreshAll();
  showToast(`🗑️ ${doc.name} bazadan o'chirildi.`);
}

/* ---------- Registraturadan talon ---------- */
function openWalkInModal() {
  $('walkin-doc-select').innerHTML = doctors.map(d => `<option value="${d.id}">${esc(d.name)} — ${esc(d.specialty)} (${esc(d.room)})</option>`).join('');
  hideError('walkin-error');
  updateWalkInSlots();
  openModal('walkin-modal');
}

function updateWalkInSlots() {
  const doc = doctors.find(d => d.id === Number(val('walkin-doc-select')));
  const free = doc ? freeSlotsOf(doc) : [];
  $('walkin-slot-select').innerHTML = free.map(s => `<option value="${s}">${s}</option>`).join('') +
    `<option value="">Qo'shimcha (kun oxirida)</option>`;
}

function closeWalkInModal() {
  closeModal('walkin-modal');
  $('walkin-patient-name').value = '';
  $('walkin-patient-phone').value = '+998 ';
}

function submitWalkInTicket(e) {
  e.preventDefault();
  const doc = doctors.find(d => d.id === Number(val('walkin-doc-select')));
  const name = val('walkin-patient-name').trim();
  const phone = val('walkin-patient-phone').trim();
  const slot = val('walkin-slot-select');

  if (!doc) return showError('walkin-error', 'Shifokorni tanlang.');
  if (name.length < 3) return showError('walkin-error', "Bemor ismini to'liq kiriting.");
  if (!isValidPhone(phone)) return showError('walkin-error', "Telefon raqamini to'liq kiriting: +998 XX XXX XX XX");
  if (slot && doc.bookedSlots.includes(slot)) { updateWalkInSlots(); return showError('walkin-error', 'Bu vaqt band bo\'lib qoldi, boshqasini tanlang.'); }
  if (hasActiveTicket(doc.id, phone)) return showError('walkin-error', 'Bu raqamga shu shifokorga faol talon allaqachon bor.');

  const t = createTicket(doc, name, phone, slot || "16:00 (Qo'shimcha)");
  closeWalkInModal();
  refreshAll();
  showToast(`🎟️ Registratura taloni saqlandi: ${t.ticketNo} (${t.time})`);
}

/* ---------- Admin parolini almashtirish ---------- */
function openPasswordModal() {
  ['pw-old', 'pw-new', 'pw-confirm'].forEach(i => { $(i).value = ''; });
  $('pw-login').value = adminCreds.login;
  hideError('pw-error');
  openModal('password-modal');
}

function submitPasswordChange(e) {
  e.preventDefault();
  const login = val('pw-login').trim().toLowerCase();
  if (val('pw-old') !== String(adminCreds.pin)) return showError('pw-error', "Joriy parol noto'g'ri.");
  if (!/^[a-z0-9_]{3,20}$/.test(login)) return showError('pw-error', "Login 3–20 belgi: lotin harflari, raqam yoki _.");
  if (!/^\d{4,8}$/.test(val('pw-new'))) return showError('pw-error', "Yangi parol 4–8 ta raqamdan iborat bo'lishi kerak.");
  if (val('pw-new') !== val('pw-confirm')) return showError('pw-error', 'Parollar bir xil emas.');
  adminCreds = { login, pin: val('pw-new') };
  saveDatabase();
  closeModal('password-modal');
  showToast('🔐 Admin login va paroli yangilandi');
}

/* ================= XABARLAR (CHAT) ================= */
let chatOpen = false;
let chatTab = 'support';
let chatThreadId = null;
let chatAskProfile = false;
let docChatId = null;
let adminChatId = null;
let _cid = null;

const followupDays = () => Math.max(1, Math.min(90, Number(settings.followupDays) || 14));
const clientId = () => {
  if (_cid) return _cid;
  try { _cid = localStorage.getItem('doctime_client_id'); } catch (e) { /* ignore */ }
  if (!_cid) {
    _cid = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem('doctime_client_id', _cid); } catch (e) { /* ignore */ }
  }
  return _cid;
};
const getProfile = () => loadJSON('doctime_profile', { name: '', phone: '' });
const fmtTime = ts => {
  const d = new Date(ts), p = n => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

const FAQ = [
  { q: 'Qanday yozilaman?', a: () => "«Qabulga yozilish» bo'limida viloyat va tumanni tanlang, shifokorning yashil rangdagi bo'sh soatini bosing, ism va telefon raqamingizni kiriting. Talon «Mening talonim» bo'limida paydo bo'ladi." },
  { q: 'Navbatni qanday bekor qilaman?', a: () => "«Mening talonim» bo'limida «Navbatni bekor qilish» tugmasini bosing — vaqt avtomatik bo'shaydi. Kela olmasangiz, iltimos, oldindan bekor qiling." },
  { q: 'Qabulga nima olib kelaman?', a: () => "Pasport yoki ID-karta, oldingi tahlil va xulosalar, doimiy ichadigan dorilar ro'yxatini olib keling." },
  { q: 'Qabul vaqti va narxi', a: () => "Bugungi qabul soatlari odatda 08:30–14:00 oralig'ida. Aniq vaqt va narx har bir shifokor kartochkasida ko'rsatilgan." },
  { q: 'Shifokorga savol bermoqchiman', a: () => `Qabulga yozilgan bo'lsangiz, yuqoridagi «Shifokor» yorlig'ida o'z shifokoringizga yozishingiz mumkin. Ko'rikdan keyin ham ${followupDays()} kun davomida savol berish mumkin.` },
  { q: 'Operator bilan bog\'lanish', a: () => "Savolingizni pastdagi maydonga yozing — registratura xodimi javobni shu yerda yuboradi.", focus: true }
];

/* ---------- Ma'lumot funksiyalari ---------- */
function syncThreads() {
  threads.forEach(th => {
    if (th.type !== 'doctor') return;
    const t = queue.find(q => q.id === th.ticketId);
    if (!t) return;
    if (ACTIVE.includes(t.status)) th.until = null;
    else if (t.status === 'completed') {
      if (!t.completedAt) t.completedAt = Date.now();
      th.until = t.completedAt + followupDays() * 86400000;
    } else th.until = 0;
    th.doctorName = t.doctorName; th.room = t.room;
  });
}

const threadOpen = th => th.type === 'support' || th.until === null || th.until === undefined || Date.now() < th.until;

function postMessage(th, from, text, silent) {
  th.messages.push({ from, text, ts: Date.now() });
  if (th.messages.length > 300) th.messages = th.messages.slice(-300);
  th.updated = Date.now();
  if (silent) return;
  if (from === 'patient') th.unreadStaff = (th.unreadStaff || 0) + 1;
  else th.unreadPatient = (th.unreadPatient || 0) + 1;
}

function ensureDoctorThreads() {
  let changed = false;
  queue.filter(t => myTicketIds.includes(t.id) && (ACTIVE.includes(t.status) || t.status === 'completed')).forEach(t => {
    const id = 'd-' + t.id;
    const existing = threads.find(x => x.id === id);
    if (existing) {
      /* talon shu brauzerga tegishli (yozilgan yoki kod+telefon bilan topilgan) — suhbatni qaytarib olamiz */
      if (existing.clientId !== clientId()) { existing.clientId = clientId(); changed = true; }
      return;
    }
    threads.push({
      id, type: 'doctor', clientId: clientId(), ticketId: t.id, ticketNo: t.ticketNo,
      doctorId: t.doctorId, doctorName: t.doctorName, specialty: t.specialty, room: t.room,
      patientName: t.patientName, phone: t.phone, until: null,
      unreadPatient: 0, unreadStaff: 0, messages: [], updated: Date.now()
    });
    changed = true;
  });
  if (changed) saveDatabase();
}

const myDoctorThreads = () => threads.filter(t => t.type === 'doctor' && t.clientId === clientId()).sort((a, b) => b.updated - a.updated);

function getSupportThread(create) {
  const id = 's-' + clientId();
  let th = threads.find(t => t.id === id);
  const p = getProfile();
  if (!th && create) {
    th = { id, type: 'support', clientId: clientId(), patientName: p.name || 'Mehmon', phone: p.phone || '', unreadPatient: 0, unreadStaff: 0, messages: [], updated: Date.now() };
    threads.push(th);
  }
  if (th && create && p.name) { th.patientName = p.name; th.phone = p.phone; }
  return th;
}

function setBadge(id, n) {
  const el = $(id);
  if (!el) return;
  el.textContent = n;
  el.classList.toggle('hidden', !n);
}

function updateChatBadge() {
  const sum = (arr, k) => arr.reduce((s, t) => s + (t[k] || 0), 0);
  setBadge('chat-fab-badge', sum(threads.filter(t => t.clientId === clientId()), 'unreadPatient'));
  setBadge('nav-doctor-badge', loggedInDoctorId ? sum(threads.filter(t => t.type === 'doctor' && t.doctorId === loggedInDoctorId), 'unreadStaff') : 0);
  setBadge('nav-admin-badge', isAdminLoggedIn ? sum(threads.filter(t => t.type === 'support'), 'unreadStaff') : 0);
}

/* ---------- Umumiy ko'rinish ---------- */
function bubblesHtml(th, viewer) {
  if (!th || !th.messages.length) return '<p class="text-center text-xs text-slate-400 py-6">Hozircha xabar yo\'q</p>';
  return th.messages.map(m => {
    const own = viewer === 'patient' ? m.from === 'patient' : (m.from === 'doctor' || m.from === 'admin');
    const label = { doctor: 'Shifokor', admin: 'Registratura', bot: 'Yordamchi', patient: th.patientName }[m.from] || '';
    const cls = own ? 'bg-teal-600 text-white rounded-br-md' : m.from === 'bot' ? 'bg-amber-50 text-slate-800 border border-amber-200 rounded-bl-md' : 'bg-slate-100 text-slate-800 rounded-bl-md';
    return `<div class="flex ${own ? 'justify-end' : 'justify-start'}">
      <div class="max-w-[85%] px-3.5 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${cls}">
        <div class="text-[10px] font-bold opacity-70 mb-0.5">${esc(label)} • ${fmtTime(m.ts)}</div>${esc(m.text)}
      </div></div>`;
  }).join('');
}

function untilText(th) {
  if (th.type !== 'doctor') return '';
  if (th.until === null || th.until === undefined) return "Qabulgacha va undan keyin ham yozishingiz mumkin.";
  return threadOpen(th) ? `Yozish muddati: ${fmtTime(th.until)} gacha.` : "Yozish muddati tugagan. Yangi muammo bo'lsa, qayta qabulga yoziling.";
}

/* ---------- Bemor oynasi ---------- */
function toggleChat() { chatOpen ? closeChat() : openChat(); }
function openChat(tab, threadId) {
  chatOpen = true;
  if (tab) chatTab = tab;
  if (threadId) chatThreadId = threadId;
  openModal('chat-panel');
  renderChat();
  setTimeout(() => { const i = $('chat-input'); if (i && !i.classList.contains('hidden')) i.focus(); }, 50);
}
function closeChat() { chatOpen = false; closeModal('chat-panel'); }
function switchChatTab(tab) { chatTab = tab; chatAskProfile = false; renderChat(); }
function selectChatThread(id) { chatThreadId = id; renderChat(); }

function renderChat() {
  updateChatBadge();
  if (!chatOpen) return;
  const on = 'bg-white text-teal-700 shadow-sm', off = 'text-slate-600';
  $('chat-tab-support').className = `flex-1 py-2 rounded-xl text-xs font-bold transition-all ${chatTab === 'support' ? on : off}`;
  $('chat-tab-doctor').className = `flex-1 py-2 rounded-xl text-xs font-bold transition-all ${chatTab === 'doctor' ? on : off}`;
  const body = $('chat-body'), form = $('chat-form'), input = $('chat-input');
  let html = '', showForm = true;

  if (chatTab === 'support') {
    const th = getSupportThread(false);
    if (th && th.unreadPatient) { th.unreadPatient = 0; saveDatabase(); }
    html = `<div class="flex flex-wrap gap-1.5 mb-3">${FAQ.map((f, i) => `<button onclick="faqAsk(${i})" class="px-3 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-[11px] font-bold">${esc(f.q)}</button>`).join('')}</div>`;
    if (chatAskProfile) {
      html += `<form onsubmit="submitProfile(event)" class="p-3 mb-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-2" autocomplete="off">
        <p class="text-xs font-bold text-amber-900">Registratura sizga javob berishi uchun ma'lumotlaringizni kiriting:</p>
        <input id="chat-prof-name" required maxlength="60" placeholder="Ism-familiya" class="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm" />
        <input id="chat-prof-phone" type="tel" required value="+998 " oninput="formatPhone(this)" class="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm" />
        <p id="chat-prof-error" class="text-xs font-bold text-rose-600 hidden"></p>
        <button type="submit" class="w-full py-2 rounded-xl bg-teal-600 text-white font-bold text-xs">Saqlash va yuborish</button></form>`;
    }
    html += `<div class="space-y-2">${bubblesHtml(th, 'patient')}</div>`;
  } else {
    ensureDoctorThreads();
    const list = myDoctorThreads();
    if (!list.length) {
      html = `<div class="text-center py-8 space-y-3"><p class="text-sm text-slate-600">Shifokorga yozish uchun avval qabulga yoziling.</p>
        <button onclick="closeChat();switchTab('home')" class="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs">Qabulga yozilish</button></div>`;
      showForm = false;
    } else {
      if (!list.some(t => t.id === chatThreadId)) chatThreadId = list[0].id;
      const th = list.find(t => t.id === chatThreadId);
      if (th.unreadPatient) { th.unreadPatient = 0; saveDatabase(); }
      const open = threadOpen(th);
      showForm = open;
      html = `<select onchange="selectChatThread(this.value)" aria-label="Shifokorni tanlang" class="w-full mb-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold">
          ${list.map(t => `<option value="${esc(t.id)}" ${t.id === th.id ? 'selected' : ''}>${esc(t.ticketNo)} — ${esc(t.doctorName)}</option>`).join('')}</select>
        <p class="text-[11px] text-slate-500 mb-2">${esc(untilText(th))}</p>
        <div class="p-2.5 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-800 font-semibold">⚠️ Shoshilinch holatda (kuchli og'riq, nafas qisilishi, hushdan ketish, qon ketishi) xabar yozmang — darhol <strong>103</strong> ga qo'ng'iroq qiling.</div>
        <div class="space-y-2">${bubblesHtml(th, 'patient')}</div>`;
    }
  }
  body.innerHTML = html;
  body.scrollTop = body.scrollHeight;
  form.classList.toggle('hidden', !showForm);
  input.placeholder = chatTab === 'support' ? 'Savolingizni yozing...' : 'Shifokorga xabar yozing...';
}

function faqAsk(i) {
  const f = FAQ[i];
  const th = getSupportThread(true);
  postMessage(th, 'patient', f.q, true);
  postMessage(th, 'bot', f.a(), true);
  saveDatabase();
  renderChat();
  if (f.focus) $('chat-input').focus();
}

function submitProfile(e) {
  e.preventDefault();
  const name = val('chat-prof-name').trim(), phone = val('chat-prof-phone').trim();
  if (name.length < 3) return showError('chat-prof-error', "Ismni to'liq kiriting.");
  if (!isValidPhone(phone)) return showError('chat-prof-error', "Telefon: +998 XX XXX XX XX");
  try { localStorage.setItem('doctime_profile', JSON.stringify({ name, phone })); } catch (err) { /* ignore */ }
  chatAskProfile = false;
  sendChatMessage({ preventDefault() {} });
}

function sendChatMessage(e) {
  e.preventDefault();
  const text = val('chat-input').trim().slice(0, 500);
  if (!text) return;
  if (chatTab === 'support') {
    if (!getProfile().name) { chatAskProfile = true; renderChat(); return; }
    const th = getSupportThread(true);
    postMessage(th, 'patient', text);
    if (!th.messages.some(m => m.from === 'admin') && !th.messages.slice(-4, -1).some(m => m.ack)) {
      postMessage(th, 'bot', "Xabaringiz registraturaga yuborildi. Javobni shu yerda ko'rasiz.", true);
      th.messages[th.messages.length - 1].ack = true;
    }
  } else {
    const th = threads.find(t => t.id === chatThreadId);
    if (!th || !threadOpen(th)) return showToast('Bu suhbat uchun yozish muddati tugagan.');
    postMessage(th, 'patient', text);
  }
  $('chat-input').value = '';
  refreshAll();
}

/* ---------- Shifokor va admin uchun umumiy xabarlar bloki ---------- */
function messengerHtml(list, cur, cfg) {
  if (!list.length) return `<p class="text-sm text-slate-500">${cfg.empty}</p>`;
  const items = list.map(t => {
    const last = t.messages[t.messages.length - 1], un = t.unreadStaff || 0;
    return `<button onclick="${cfg.sel}('${esc(t.id)}')" class="w-full text-left p-3 rounded-2xl border ${t.id === cur.id ? 'bg-teal-50 border-teal-300' : 'bg-white border-slate-200 hover:bg-slate-50'}">
      <div class="flex items-center justify-between gap-2"><span class="text-sm font-bold text-slate-800 truncate">${esc(t.patientName)}</span>${un ? `<span class="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">${un}</span>` : ''}</div>
      <div class="text-[11px] text-slate-500 truncate">${t.type === 'doctor' ? esc(t.ticketNo) + ' • ' : ''}${esc(t.phone || 'telefon yo\'q')}</div>
      <div class="text-[11px] text-slate-400 truncate">${last ? esc(last.text) : '—'}</div></button>`;
  }).join('');
  const open = threadOpen(cur);
  return `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="space-y-2 max-h-96 overflow-y-auto">${items}</div>
    <div class="md:col-span-2 flex flex-col border border-slate-200 rounded-2xl overflow-hidden">
      <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
        <div class="min-w-0"><div class="text-sm font-extrabold text-slate-900 truncate">${esc(cur.patientName)}</div>
        <div class="text-[11px] text-slate-500 truncate">${esc(cur.phone || '')}${cur.type === 'doctor' ? ' • ' + esc(cur.ticketNo) : ''}${cur.type === 'doctor' ? ' • ' + esc(untilText(cur)) : ''}</div></div>
        ${cfg.del ? `<button onclick="${cfg.del}('${esc(cur.id)}')" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold shrink-0">O'chirish</button>` : ''}
      </div>
      <div id="${cfg.scroll}" class="p-3 space-y-2 h-72 overflow-y-auto bg-white">${bubblesHtml(cur, 'staff')}</div>
      ${open ? `<form onsubmit="${cfg.submit}(event)" class="p-3 border-t border-slate-100 flex gap-2" autocomplete="off">
        <input id="${cfg.input}" maxlength="500" required placeholder="Javob yozing..." class="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
        <button type="submit" class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs">Yuborish</button></form>`
        : '<p class="p-3 text-xs text-slate-500 border-t border-slate-100">Yozish muddati tugagan.</p>'}
    </div></div>`;
}

function renderMessenger(boxId, html, inputId, scrollId) {
  const old = $(inputId);
  const draft = old ? old.value : '';
  const focused = old && document.activeElement === old;
  $(boxId).innerHTML = html;
  const inp = $(inputId);
  if (inp) { inp.value = draft; if (focused) inp.focus(); }
  const sc = $(scrollId);
  if (sc) sc.scrollTop = sc.scrollHeight;
}

const tabVisible = id => $(id) && !$(id).classList.contains('hidden');

/* ---------- Shifokor: bemorlar xabarlari ---------- */
function renderDoctorMessages() {
  const box = $('dash-doc-messages');
  if (!box) return;
  const doc = loggedInDoctorId ? doctors.find(d => d.id === loggedInDoctorId) : null;
  if (!doc) { box.innerHTML = ''; return; }
  const list = threads.filter(t => t.type === 'doctor' && t.doctorId === doc.id).sort((a, b) => b.updated - a.updated);
  if (!list.some(t => t.id === docChatId)) docChatId = list[0] ? list[0].id : null;
  const cur = list.find(t => t.id === docChatId);
  if (cur && cur.unreadStaff && tabVisible('tab-doctor')) { cur.unreadStaff = 0; saveDatabase(); }
  const unread = list.reduce((s, t) => s + (t.unreadStaff || 0), 0);
  const html = `<h3 class="text-base font-bold text-slate-800 mb-1">💬 Bemorlar xabarlari ${unread ? `<span class="ml-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs">${unread} yangi</span>` : ''}</h3>
    <p class="text-xs text-slate-500 mb-3">Bemorlar ko'rikdan keyin ${followupDays()} kun davomida yozishi mumkin.</p>` +
    messengerHtml(list, cur, { sel: 'selectDocThread', submit: 'submitDoctorReply', input: 'doc-reply-input', scroll: 'doc-chat-scroll', empty: "Hozircha bemorlardan xabar yo'q." });
  renderMessenger('dash-doc-messages', html, 'doc-reply-input', 'doc-chat-scroll');
}

function selectDocThread(id) {
  docChatId = id;
  const i = $('doc-reply-input'); if (i) i.value = '';
  renderDoctorMessages();
  updateChatBadge();
}

function submitDoctorReply(e) {
  e.preventDefault();
  const th = threads.find(t => t.id === docChatId);
  const text = val('doc-reply-input').trim().slice(0, 500);
  if (!th || !text) return;
  if (!threadOpen(th)) return showToast('Yozish muddati tugagan.');
  postMessage(th, 'doctor', text);
  $('doc-reply-input').value = '';
  refreshAll();
}

/* ---------- Admin: yordam markazi ---------- */
function renderAdminMessages() {
  const box = $('admin-messages');
  if (!box) return;
  const fd = $('admin-followup-days');
  if (fd && document.activeElement !== fd) fd.value = followupDays();
  const list = threads.filter(t => t.type === 'support' && t.messages.length).sort((a, b) => b.updated - a.updated);
  if (!list.some(t => t.id === adminChatId)) adminChatId = list[0] ? list[0].id : null;
  const cur = list.find(t => t.id === adminChatId);
  if (cur && cur.unreadStaff && tabVisible('tab-admin')) { cur.unreadStaff = 0; saveDatabase(); }
  const unread = list.reduce((s, t) => s + (t.unreadStaff || 0), 0);
  $('admin-msg-unread').textContent = unread ? `${unread} yangi` : '';
  renderMessenger('admin-messages',
    messengerHtml(list, cur, { sel: 'selectAdminThread', submit: 'submitAdminReply', input: 'admin-reply-input', scroll: 'admin-chat-scroll', del: 'deleteSupportThread', empty: "Hozircha bemorlardan murojaat yo'q." }),
    'admin-reply-input', 'admin-chat-scroll');
}

function selectAdminThread(id) {
  adminChatId = id;
  const i = $('admin-reply-input'); if (i) i.value = '';
  renderAdminMessages();
  updateChatBadge();
}

function submitAdminReply(e) {
  e.preventDefault();
  const th = threads.find(t => t.id === adminChatId);
  const text = val('admin-reply-input').trim().slice(0, 500);
  if (!th || !text) return;
  postMessage(th, 'admin', text);
  $('admin-reply-input').value = '';
  refreshAll();
}

function deleteSupportThread(id) {
  if (!confirm("Bu suhbat butunlay o'chirilsinmi?")) return;
  threads = threads.filter(t => t.id !== id);
  refreshAll();
}

function saveFollowupDays() {
  const n = parseInt(val('admin-followup-days'), 10);
  if (!(n >= 1 && n <= 90)) return showToast("Muddat 1 dan 90 kungacha bo'lishi kerak.");
  settings.followupDays = n;
  refreshAll();
  showToast(`Shifokorga yozish muddati: ${n} kun`);
}
