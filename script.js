// 1. TIL LUG'ATI (UZ, RU, EN) — RASMDAGI MATNLAR BILAN
const TRANSLATIONS = {
  uz: {
    subtitle: "Elektron navbat tizimi",
    hero_badge: "O'zbekiston bo'ylab 5 000+ malakali shifokorlar",
    hero_title_1: "Shifokorga navbat",
    hero_title_2: "kutmasdan",
    hero_title_3: "onlayn yoziling",
    hero_desc: "Viloyat va tumaningizni tanlang — sizga eng yaqin davlat va xususiy shifoxonalardagi mutaxassislarni ko'rsatamiz. Aniq vaqt belgilab, koridordagi uzun navbatlarni unuting.",
    nav_book: "Qabulga yozilish",
    nav_tablo: "Jonli Tablo",
    nav_ticket: "Mening talonim",
    nav_doctor: "Shifokor paneli",
    nav_admin: "Admin panel",
    sec_title: "Viloyat va shifokorni tanlang",
    sec_desc: "O'z hududingizni belgilang va bo'sh soatni tanlab talon oling",
    label_region: "Viloyat",
    label_district: "Tuman / Shahar",
    all_regions: "Barcha viloyatlar",
    all_districts: "Barcha tuman va shaharlar",
    choose_region_first: "Avval viloyatni tanlang",
    no_doctors: "Ushbu hudud yoki yo'nalish bo'yicha shifokor topilmadi.",
    view_all_docs: "Barcha shifokorlarni ko'rish",
    book_btn: "Vaqt tanlash va yozilish",
    all_booked: "Hamma vaqt band",
    tablo_main: "JONLI NAVBAT TABLOSI",
    tablo_live: "Jonli",
    tablo_in_room: "Hozir xonada (Qabulda)",
    tablo_wait_room: "Navbat kutayotganlar",
    tablo_empty_in: "Hozir xonalarda bemor yo'q",
    tablo_empty_wait: "Kutayotgan bemorlar yo'q",
    myticket_title: "Mening elektron talonlarim",
    myticket_empty: "Sizda hozircha faol talonlar yo'q.",
    time_prefix: "Soat",
    status_in: "Xonaga kiring",
    status_wait: "Kutmoqda",
    btn_cancel: "Bekor qilish",
    toast_cancelled: "Talon bekor qilindi va soat bo'shatildi!",
    toast_booked: "Talon olindi:",
    doc_login_title: "Shifokor kabineti",
    doc_login_desc: "Kirish uchun login va PIN-kodni tering",
    doc_lbl_login: "Login",
    doc_lbl_pin: "PIN-kod",
    doc_btn_submit: "Kirish",
    btn_doc_logout: "Kabinetdan chiqish",
    doc_room_queue: "Xona navbati",
    btn_call_next: "Keyingi bemorni chaqirish",
    no_waiting_patients: "Navbatda bemorlar yo'q",
    all_patients_called: "Kutayotgan bemorlar qolmadi",
    toast_called: "Chaqirildi:",
    adm_login_title: "Admin Panel",
    adm_login_desc: "Login: admin | Parol: 7777",
    adm_lbl_login: "Login",
    adm_lbl_pin: "Parol",
    adm_btn_submit: "Kirish",
    adm_dash_title: "Boshqaruv Paneli",
    adm_dash_desc: "Shifokorlar va xonalarni boshqarish",
    btn_add_doc: "+ Shifokor qo'shish",
    btn_reset_db: "Bazani tozalash",
    btn_adm_logout: "Chiqish",
    btn_delete_doc: "Shifokorni o'chirish",
    confirm_reset: "Barcha ma'lumotlar tozalanib boshlang'ich holatga qaytsinmi?",
    min_doc_alert: "Tizimda kamida 1 ta shifokor qolishi shart!",
    toast_doc_deleted: "Shifokor bazadan o'chirildi",
    toast_doc_added: "Yangi shifokor muvaffaqiyatli qo'shildi!",
    auth_doc_err: "Login yoki PIN-kod noto'g'ri! (Masalan: kardiolog / 2040)",
    auth_adm_err: "Login yoki parol xato! (admin / 7777)",
    m_choose_slot: "Bo'sh vaqtni tanlang",
    m_patient_name: "Bemor F.I.Sh",
    m_patient_name_ph: "Ism familiyangiz",
    m_patient_phone: "Telefon raqam",
    m_btn_confirm: "Talon olish",
    m_add_title: "Yangi shifokor qo'shish",
    m_lbl_name: "F.I.Sh",
    m_lbl_spec: "Mutaxassislik",
    m_lbl_room: "Xona",
    m_lbl_reg: "Viloyat",
    m_lbl_dist: "Tuman/Shahar",
    m_lbl_clinic: "Klinika nomi",
    m_lbl_login: "Login",
    m_lbl_pin: "PIN-kod",
    m_btn_save: "Bazaga saqlash",
    err_select_slot: "Iltimos, bo'sh soatlardan birini tanlang!",
    err_phone_length: "Telefon raqamingizni to'liq kiriting (+998 XX XXX XX XX)!",
    patient_word: "Bemor",
    price_free: "Bepul",
    som: "so'm",
    specs: {
      all: "Barcha yo'nalishlar",
      Kardiolog: "Kardiolog",
      Pediatr: "Pediatr",
      Stomatolog: "Stomatolog",
      Terapevt: "Terapevt"
    }
  },
  ru: {
    subtitle: "Электронная система очередей",
    hero_badge: "Более 5 000+ квалифицированных врачей по Узбекистану",
    hero_title_1: "Запись к врачу",
    hero_title_2: "без очередей",
    hero_title_3: "в онлайн режиме",
    hero_desc: "Выберите регион и район — покажем специалистов в ближайших государственных и частных клиниках. Выберите точное время и забудьте о долгих очередях в коридорах.",
    nav_book: "Запись на прием",
    nav_tablo: "Онлайн Табло",
    nav_ticket: "Мой талон",
    nav_doctor: "Кабинет врача",
    nav_admin: "Панель админа",
    sec_title: "Выберите регион и врача",
    sec_desc: "Укажите ваш регион и выберите свободное время для получения талона",
    label_region: "Регион (Область)",
    label_district: "Район / Город",
    all_regions: "Все регионы",
    all_districts: "Все районы и города",
    choose_region_first: "Сначала выберите регион",
    no_doctors: "В этом регионе или по этой специальности врачи не найдены.",
    view_all_docs: "Показать всех врачей",
    book_btn: "Выбрать время и записаться",
    all_booked: "Все часы заняты",
    tablo_main: "ОНЛАЙН ТАБЛО ОЧЕРЕДИ",
    tablo_live: "В эфире",
    tablo_in_room: "Сейчас в кабинете (Прием)",
    tablo_wait_room: "Ожидают в очереди",
    tablo_empty_in: "Сейчас в кабинетах нет пациентов",
    tablo_empty_wait: "Ожидающих пациентов нет",
    myticket_title: "Мои электронные талоны",
    myticket_empty: "У вас пока нет активных талонов.",
    time_prefix: "В",
    status_in: "Войдите в кабинет",
    status_wait: "Ожидание",
    btn_cancel: "Отменить",
    toast_cancelled: "Талон отменен, время освобождено!",
    toast_booked: "Талон получен:",
    doc_login_title: "Кабинет врача",
    doc_login_desc: "Введите логин и PIN-код для входа",
    doc_lbl_login: "Логин",
    doc_lbl_pin: "PIN-код",
    doc_btn_submit: "Войти",
    btn_doc_logout: "Выйти из кабинета",
    doc_room_queue: "Очередь в кабинет",
    btn_call_next: "Вызвать следующего",
    no_waiting_patients: "В очереди никого нет",
    all_patients_called: "Ожидающих пациентов не осталось",
    toast_called: "Вызван:",
    adm_login_title: "Панель администратора",
    adm_login_desc: "Логин: admin | Пароль: 7777",
    adm_lbl_login: "Логин",
    adm_lbl_pin: "Пароль",
    adm_btn_submit: "Войти",
    adm_dash_title: "Панель управления",
    adm_dash_desc: "Управление врачами и кабинетами",
    btn_add_doc: "+ Добавить врача",
    btn_reset_db: "Сбросить базу",
    btn_adm_logout: "Выйти",
    btn_delete_doc: "Удалить врача",
    confirm_reset: "Сбросить все данные и вернуть базу в исходное состояние?",
    min_doc_alert: "В системе должен оставаться хотя бы 1 врач!",
    toast_doc_deleted: "Врач удален из базы",
    toast_doc_added: "Новый врач успешно добавлен!",
    auth_doc_err: "Неверный логин или PIN-код! (Например: kardiolog / 2040)",
    auth_adm_err: "Неверный логин или пароль! (admin / 7777)",
    m_choose_slot: "Выберите свободное время",
    m_patient_name: "Ф.И.О Пациента",
    m_patient_name_ph: "Ваше имя и фамилия",
    m_patient_phone: "Номер телефона",
    m_btn_confirm: "Получить талон",
    m_add_title: "Добавление нового врача",
    m_lbl_name: "Ф.И.О Врача",
    m_lbl_spec: "Специальность",
    m_lbl_room: "Кабинет",
    m_lbl_reg: "Регион",
    m_lbl_dist: "Район/Город",
    m_lbl_clinic: "Название клиники",
    m_lbl_login: "Логин",
    m_lbl_pin: "PIN-код",
    m_btn_save: "Сохранить в базу",
    err_select_slot: "Пожалуйста, выберите доступное время!",
    err_phone_length: "Введите номер телефона полностью (+998 XX XXX XX XX)!",
    patient_word: "Пациент",
    price_free: "Бесплатно",
    som: "сум",
    specs: {
      all: "Все специальности",
      Kardiolog: "Кардиолог",
      Pediatr: "Педиатр",
      Stomatolog: "Стоматолог",
      Terapevt: "Терапевт"
    }
  },
  en: {
    subtitle: "Electronic Queue Management System",
    hero_badge: "5,000+ certified doctors across Uzbekistan",
    hero_title_1: "Book doctor visits",
    hero_title_2: "without waiting",
    hero_title_3: "online & hassle-free",
    hero_desc: "Select your region and district — discover top specialists in nearby public and private medical centers. Schedule an exact time and skip the long hallway queues.",
    nav_book: "Book Appointment",
    nav_tablo: "Live Tablo",
    nav_ticket: "My Ticket",
    nav_doctor: "Doctor Portal",
    nav_admin: "Admin Panel",
    sec_title: "Select Region and Doctor",
    sec_desc: "Choose your location and pick an available time slot for your appointment",
    label_region: "Region",
    label_district: "District / City",
    all_regions: "All regions",
    all_districts: "All districts and cities",
    choose_region_first: "Select region first",
    no_doctors: "No doctors found for the selected area or specialty.",
    view_all_docs: "View all doctors",
    book_btn: "Select time & book",
    all_booked: "Fully booked",
    tablo_main: "LIVE QUEUE BOARD",
    tablo_live: "Live",
    tablo_in_room: "Currently in Room (Serving)",
    tablo_wait_room: "Waiting in Queue",
    tablo_empty_in: "No patients currently in rooms",
    tablo_empty_wait: "No waiting patients",
    myticket_title: "My Digital Tickets",
    myticket_empty: "You have no active tickets yet.",
    time_prefix: "At",
    status_in: "Proceed to Room",
    status_wait: "Waiting",
    btn_cancel: "Cancel",
    toast_cancelled: "Ticket cancelled and slot released!",
    toast_booked: "Ticket booked:",
    doc_login_title: "Doctor Sign In",
    doc_login_desc: "Enter your username and PIN to log in",
    doc_lbl_login: "Username",
    doc_lbl_pin: "PIN Code",
    doc_btn_submit: "Sign In",
    btn_doc_logout: "Sign Out",
    doc_room_queue: "Room Queue",
    btn_call_next: "Call Next Patient",
    no_waiting_patients: "No patients waiting",
    all_patients_called: "No remaining patients",
    toast_called: "Called:",
    adm_login_title: "Admin Panel",
    adm_login_desc: "Login: admin | Password: 7777",
    adm_lbl_login: "Username",
    adm_lbl_pin: "Password",
    adm_btn_submit: "Sign In",
    adm_dash_title: "Control Dashboard",
    adm_dash_desc: "Manage doctors and consultation rooms",
    btn_add_doc: "+ Add Doctor",
    btn_reset_db: "Reset Database",
    btn_adm_logout: "Sign Out",
    btn_delete_doc: "Delete Doctor",
    confirm_reset: "Reset all records and restore default data?",
    min_doc_alert: "At least one doctor must remain in the system!",
    toast_doc_deleted: "Doctor removed from database",
    toast_doc_added: "New doctor added successfully!",
    auth_doc_err: "Invalid login or PIN code! (e.g. kardiolog / 2040)",
    auth_adm_err: "Invalid credentials! (admin / 7777)",
    m_choose_slot: "Choose available slot",
    m_patient_name: "Patient Full Name",
    m_patient_name_ph: "Your full name",
    m_patient_phone: "Phone Number",
    m_btn_confirm: "Get Ticket",
    m_add_title: "Add New Doctor",
    m_lbl_name: "Full Name",
    m_lbl_spec: "Specialty",
    m_lbl_room: "Room",
    m_lbl_reg: "Region",
    m_lbl_dist: "District/City",
    m_lbl_clinic: "Clinic Name",
    m_lbl_login: "Username",
    m_lbl_pin: "PIN Code",
    m_btn_save: "Save to Database",
    err_select_slot: "Please choose an available time slot!",
    err_phone_length: "Please enter your full phone number (+998 XX XXX XX XX)!",
    patient_word: "Patient",
    price_free: "Free",
    som: "UZS",
    specs: {
      all: "All Specialties",
      Kardiolog: "Cardiologist",
      Pediatr: "Pediatrician",
      Stomatolog: "Dentist",
      Terapevt: "General Practitioner"
    }
  }
};

let currentLang = localStorage.getItem('med_lang') || 'uz';

const REGIONS_DATA = {
  "Toshkent viloyati": ["Chirchiq sh.", "Olmaliq sh.", "Angren sh.", "Qibray tumani"],
  "Samarqand viloyati": ["Samarqand sh.", "Urgut tumani", "Kattaqo'rg'on sh."],
  "Farg'ona viloyati": ["Farg'ona sh.", "Qo'qon sh.", "Marg'ilon sh."],
  "Andijon viloyati": ["Andijon sh.", "Asaka tumani", "Shahrixon tumani"]
};

const SPECIALTIES = [
  { id: 'all', icon: '🩺' },
  { id: 'Kardiolog', icon: '❤️' },
  { id: 'Pediatr', icon: '👶' },
  { id: 'Stomatolog', icon: '🦷' },
  { id: 'Terapevt', icon: '👨‍⚕️' }
];

const ALL_SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];

const INITIAL_DOCTORS = [
  { id: 1, name: "Dr. Azizbek Rahimov", specialty: "Kardiolog", region: "Toshkent viloyati", district: "Chirchiq sh.", clinic: "Chirchiq Markaziy Poliklinikasi", room: "204-xona", rating: 4.9, price: "45 000 so'm", prefix: "K", login: "kardiolog", pin: "2040", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200", bookedSlots: ["09:00"] },
  { id: 2, name: "Dr. Dilnoza Karimova", specialty: "Pediatr", region: "Toshkent viloyati", district: "Qibray tumani", clinic: "MedLine Kids", room: "108-xona", rating: 5.0, price: "100 000 so'm", prefix: "P", login: "pediatr", pin: "1080", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200", bookedSlots: ["08:30"] },
  { id: 3, name: "Dr. Jamshid Rustamov", specialty: "Stomatolog", region: "Samarqand viloyati", district: "Samarqand sh.", clinic: "SamDent Markazi", room: "12-xona", rating: 4.8, price: "80 000 so'm", prefix: "S", login: "stomatolog", pin: "1200", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200", bookedSlots: [] },
  { id: 4, name: "Dr. Malika To'xtayeva", specialty: "Terapevt", region: "Farg'ona viloyati", district: "Farg'ona sh.", clinic: "Farg'ona Med Shifo", room: "305-xona", rating: 4.9, price: "35 000 so'm", prefix: "T", login: "terapevt", pin: "3050", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200", bookedSlots: [] },
  { id: 5, name: "Dr. Sardor Aliyev", specialty: "Kardiolog", region: "Andijon viloyati", district: "Andijon sh.", clinic: "Andijon Kardiologiya", room: "101-xona", rating: 4.7, price: "Bepul", prefix: "K", login: "andijon", pin: "1010", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200", bookedSlots: [] }
];

let doctors = JSON.parse(localStorage.getItem('med_doctors')) || INITIAL_DOCTORS;
let queue = JSON.parse(localStorage.getItem('med_queue')) || [
  { id: 101, ticketNo: "K-012", patientName: "Saida Nazarova", phone: "+998 93 456 78 90", doctorId: 1, doctorName: "Dr. Azizbek Rahimov", specialty: "Kardiolog", room: "204-xona", time: "09:00", status: "in_progress" }
];
let myTickets = JSON.parse(localStorage.getItem('med_mytickets')) || [101];

let currentSpec = 'all';
let activeDocId = null;
let selectedSlot = '';
let loggedDoc = null;
let isAdmin = false;

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('med_lang', lang);
  updateStaticTexts();
  initRegions();
  renderPills();
  renderDoctors();
  renderTablo();
  renderMyTickets();
  if (loggedDoc) renderDocPanel();
  if (isAdmin) renderAdminPanel();
  lucide.createIcons();
}

function updateStaticTexts() {
  ['uz', 'ru', 'en'].forEach(l => {
    const btn = document.getElementById(`lang-btn-${l}`);
    if (btn) {
      btn.className = `px-2 py-1 rounded-lg transition-all ${l === currentLang ? 'lang-active shadow-sm' : 'lang-inactive'}`;
    }
  });

  const ids = {
    't-subtitle': t('subtitle'),
    't-hero-badge': t('hero_badge'),
    't-hero-title-1': t('hero_title_1'),
    't-hero-title-2': t('hero_title_2'),
    't-hero-title-3': t('hero_title_3'),
    't-hero-desc': t('hero_desc'),
    't-nav-book': t('nav_book'),
    't-nav-tablo': t('nav_tablo'),
    't-nav-ticket': t('nav_ticket'),
    't-nav-doctor': t('nav_doctor'),
    't-nav-admin': t('nav_admin'),
    't-m-nav-book': t('nav_book'),
    't-m-nav-tablo': t('nav_tablo'),
    't-m-nav-ticket': t('nav_ticket'),
    't-m-nav-doctor': t('nav_doctor'),
    't-m-nav-admin': t('nav_admin'),
    't-sec-title': t('sec_title'),
    't-sec-desc': t('sec_desc'),
    't-label-region': t('label_region'),
    't-label-district': t('label_district'),
    't-tablo-main': t('tablo_main'),
    't-tablo-live': t('tablo_live'),
    't-tablo-in-room': t('tablo_in_room'),
    't-tablo-wait-room': t('tablo_wait_room'),
    't-myticket-title': t('myticket_title'),
    't-doc-login-title': t('doc_login_title'),
    't-doc-login-desc': t('doc_login_desc'),
    't-doc-lbl-login': t('doc_lbl_login'),
    't-doc-lbl-pin': t('doc_lbl_pin'),
    't-doc-btn-submit': t('doc_btn_submit'),
    't-btn-doc-logout': t('btn_doc_logout'),
    't-adm-login-title': t('adm_login_title'),
    't-adm-login-desc': t('adm_login_desc'),
    't-adm-lbl-login': t('adm_lbl_login'),
    't-adm-lbl-pin': t('adm_lbl_pin'),
    't-adm-btn-submit': t('adm_btn_submit'),
    't-adm-dash-title': t('adm_dash_title'),
    't-adm-dash-desc': t('adm_dash_desc'),
    't-btn-add-doc': t('btn_add_doc'),
    't-btn-reset-db': t('btn_reset_db'),
    't-btn-adm-logout': t('btn_adm_logout'),
    't-lbl-choose-slot': t('m_choose_slot'),
    't-lbl-patient-name': t('m_patient_name'),
    't-lbl-patient-phone': t('m_patient_phone'),
    't-btn-confirm-ticket': t('m_btn_confirm'),
    't-m-add-title': t('m_add_title'),
    't-m-lbl-name': t('m_lbl_name'),
    't-m-lbl-spec': t('m_lbl_spec'),
    't-m-lbl-room': t('m_lbl_room'),
    't-m-lbl-reg': t('m_lbl_reg'),
    't-m-lbl-dist': t('m_lbl_dist'),
    't-m-lbl-clinic': t('m_lbl_clinic'),
    't-m-lbl-login': t('m_lbl_login'),
    't-m-lbl-pin': t('m_lbl_pin'),
    't-m-btn-save': t('m_btn_save')
  };

  Object.keys(ids).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = ids[id];
  });

  const pName = document.getElementById('p-name');
  if (pName) pName.placeholder = t('m_patient_name_ph');

  const ndSpec = document.getElementById('nd-spec');
  if (ndSpec) {
    ndSpec.innerHTML = `
      <option value="Kardiolog">${t('specs').Kardiolog}</option>
      <option value="Pediatr">${t('specs').Pediatr}</option>
      <option value="Stomatolog">${t('specs').Stomatolog}</option>
      <option value="Terapevt">${t('specs').Terapevt}</option>
    `;
  }
}

function saveDB() {
  localStorage.setItem('med_doctors', JSON.stringify(doctors));
  localStorage.setItem('med_queue', JSON.stringify(queue));
  localStorage.setItem('med_mytickets', JSON.stringify(myTickets));
  const badge = document.getElementById('my-ticket-badge');
  if (badge) badge.textContent = myTickets.length;
}

function resetStorage() {
  if (!confirm(t('confirm_reset'))) return;
  localStorage.clear();
  location.reload();
}

window.addEventListener('DOMContentLoaded', () => {
  saveDB();
  updateStaticTexts();
  initRegions();
  renderPills();
  renderDoctors();
  renderTablo();
  renderMyTickets();
  setInterval(() => {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  }, 1000);
  lucide.createIcons();
});

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3200);
}

function switchTab(name) {
  document.querySelectorAll('.tab-section').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`tab-${name}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
  const b = document.getElementById(`nav-${name}`);
  if (b) b.classList.add('active-nav');

  if (name === 'home') renderDoctors();
  if (name === 'tablo') renderTablo();
  if (name === 'tickets') renderMyTickets();
  if (name === 'doctor') renderDocPanel();
  if (name === 'admin') renderAdminPanel();
  lucide.createIcons();
}

function initRegions() {
  const sel = document.getElementById('region-select');
  if (!sel) return;
  const currentVal = sel.value;
  sel.innerHTML = `<option value="">${t('all_regions')}</option>`;
  Object.keys(REGIONS_DATA).forEach(r => {
    const o = document.createElement('option');
    o.value = r;
    o.textContent = r;
    sel.appendChild(o);
  });
  sel.value = currentVal;
  handleRegionChange();
}

function handleRegionChange() {
  const r = document.getElementById('region-select').value;
  const dSel = document.getElementById('district-select');
  if (!dSel) return;
  dSel.innerHTML = `<option value="">${t('all_districts')}</option>`;
  if (!r) {
    dSel.disabled = true;
    dSel.innerHTML = `<option value="">${t('choose_region_first')}</option>`;
  } else {
    dSel.disabled = false;
    REGIONS_DATA[r].forEach(d => {
      const o = document.createElement('option');
      o.value = d;
      o.textContent = d;
      dSel.appendChild(o);
    });
  }
  renderDoctors();
}

function renderPills() {
  const pillsEl = document.getElementById('specialty-pills');
  if (!pillsEl) return;
  pillsEl.innerHTML = SPECIALTIES.map(s => `
    <button onclick="currentSpec='${s.id}'; renderPills(); renderDoctors();" class="px-3.5 py-2 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${currentSpec === s.id ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-slate-50 text-slate-700 hover:border-teal-300'}">
      ${s.icon} ${t('specs')[s.id]}
    </button>
  `).join('');
}

function renderDoctors() {
  const regEl = document.getElementById('region-select');
  const distEl = document.getElementById('district-select');
  const gridEl = document.getElementById('doctors-grid');
  if (!gridEl) return;

  const reg = regEl ? regEl.value : '';
  const dist = distEl ? distEl.value : '';
  const filtered = doctors.filter(d => (!reg || d.region === reg) && (!dist || d.district === dist) && (currentSpec === 'all' || d.specialty === currentSpec));

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
        <p class="text-slate-400 text-sm font-semibold">${t('no_doctors')}</p>
        <button onclick="document.getElementById('region-select').value=''; currentSpec='all'; renderPills(); renderDoctors();" class="mt-3 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-xs font-bold hover:bg-teal-100">${t('view_all_docs')}</button>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(doc => {
    const free = ALL_SLOTS.filter(s => !doc.bookedSlots.includes(s));
    const localizedSpec = t('specs')[doc.specialty] || doc.specialty;
    return `
      <div class="bg-white rounded-3xl p-5 border border-teal-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <img src="${doc.avatar}" class="w-12 h-12 rounded-2xl object-cover border" />
            <div class="min-w-0">
              <span class="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">${localizedSpec}</span>
              <h3 class="font-extrabold text-slate-900 truncate mt-0.5">${doc.name}</h3>
              <p class="text-xs text-slate-500">⭐ ${doc.rating} • ${doc.price}</p>
            </div>
          </div>
          <div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3 border border-slate-100">
            <p class="font-bold truncate text-slate-800">🏥 ${doc.clinic} (${doc.room})</p>
            <p class="text-[11px] text-slate-500 truncate">📍 ${doc.region}, ${doc.district}</p>
          </div>
          <div class="grid grid-cols-3 gap-1 mb-3">
            ${ALL_SLOTS.map(slot => `
              <button ${doc.bookedSlots.includes(slot) ? 'disabled' : `onclick="openBooking(${doc.id}, '${slot}')"`} class="py-1 rounded text-[11px] font-bold border transition-all ${doc.bookedSlots.includes(slot) ? 'bg-slate-100 text-slate-400 line-through cursor-not-allowed' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-teal-600 hover:text-white'}">
                ${slot}
              </button>
            `).join('')}
          </div>
        </div>
        <button onclick="openBooking(${doc.id}, '${free[0] || ''}')" class="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-sm">
          ${free.length > 0 ? t('book_btn') : t('all_booked')}
        </button>
      </div>
    `;
  }).join('');
}

function openBooking(docId, slot) {
  activeDocId = docId;
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;

  const freeSlots = ALL_SLOTS.filter(s => !doc.bookedSlots.includes(s));
  selectedSlot = (slot && !doc.bookedSlots.includes(slot)) ? slot : (freeSlots[0] || '');
  
  const localizedSpec = t('specs')[doc.specialty] || doc.specialty;
  document.getElementById('m-doc-title').textContent = `${doc.name} (${localizedSpec})`;
  renderModalSlots(doc);

  document.getElementById('booking-modal').classList.remove('hidden');
  document.getElementById('booking-modal').classList.add('flex');
}

function renderModalSlots(doc) {
  document.getElementById('m-slots').innerHTML = ALL_SLOTS.map(s => {
    const isBooked = doc.bookedSlots.includes(s);
    const isSelected = selectedSlot === s;
    return `
      <button type="button" ${isBooked ? 'disabled' : `onclick="chooseModalSlot('${s}')"`} class="py-2 rounded-xl text-xs font-bold border transition-all ${isBooked ? 'bg-slate-100 text-slate-400 line-through' : isSelected ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'}">
        ${s}
      </button>
    `;
  }).join('');
}

function chooseModalSlot(slot) {
  selectedSlot = slot;
  const doc = doctors.find(d => d.id === activeDocId);
  if (doc) renderModalSlots(doc);
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
  document.getElementById('booking-modal').classList.remove('flex');
}

function formatPhoneInput(input) {
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
  const name = document.getElementById('p-name').value.trim();
  const phone = document.getElementById('p-phone').value.trim();

  if (!selectedSlot) {
    alert(t('err_select_slot'));
    return;
  }
  if (phone.length < 17) {
    alert(t('err_phone_length'));
    return;
  }

  const doc = doctors.find(d => d.id === activeDocId);
  doc.bookedSlots.push(selectedSlot);

  const ticket = {
    id: Date.now(),
    ticketNo: `${doc.prefix}-0${Math.floor(10 + Math.random() * 89)}`,
    patientName: name,
    phone,
    doctorId: doc.id,
    doctorName: doc.name,
    specialty: doc.specialty,
    room: doc.room,
    time: selectedSlot,
    status: 'waiting'
  };

  queue.push(ticket);
  myTickets.unshift(ticket.id);
  saveDB();

  document.getElementById('p-name').value = '';
  closeBookingModal();
  renderDoctors();
  showToast(`${t('toast_booked')} ${ticket.ticketNo}`);
  switchTab('tickets');
}

function renderTablo() {
  const inProgEl = document.getElementById('tablo-inprogress');
  const waitingEl = document.getElementById('tablo-waiting');
  if (!inProgEl || !waitingEl) return;

  const inProgList = queue.filter(q => q.status === 'in_progress');
  const waitingList = queue.filter(q => q.status === 'waiting');

  inProgEl.innerHTML = inProgList.length === 0 ? `<p class="text-xs text-slate-400">${t('tablo_empty_in')}</p>` : inProgList.map(q => `
    <div class="bg-emerald-950/60 border border-emerald-500/40 p-3.5 rounded-xl flex justify-between items-center">
      <div>
        <span class="text-xl font-black text-emerald-400">${q.ticketNo}</span>
        <p class="text-xs text-slate-300">${q.patientName} • ${q.doctorName}</p>
      </div>
      <span class="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg">${q.room}</span>
    </div>
  `).join('');

  waitingEl.innerHTML = waitingList.length === 0 ? `<p class="text-xs text-slate-400">${t('tablo_empty_wait')}</p>` : waitingList.map(q => `
    <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
      <div>
        <span class="text-lg font-bold text-amber-400">${q.ticketNo}</span>
        <p class="text-xs text-slate-400">${q.patientName} (${q.time})</p>
      </div>
      <span class="text-xs text-slate-300 font-semibold">${q.room}</span>
    </div>
  `).join('');
}

function renderMyTickets() {
  const listEl = document.getElementById('my-tickets-list');
  if (!listEl) return;
  const list = queue.filter(q => myTickets.includes(q.id));
  
  listEl.innerHTML = list.length === 0 ? `<p class="text-sm text-slate-500">${t('myticket_empty')}</p>` : list.map(tkt => `
    <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <div class="flex gap-2 items-center">
          <span class="text-xl font-black text-teal-700">${tkt.ticketNo}</span>
          <span class="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">${t('time_prefix')} ${tkt.time}</span>
          <span class="text-xs font-bold ${tkt.status === 'in_progress' ? 'bg-emerald-600 text-white' : 'bg-white text-teal-700 border'} px-2 py-0.5 rounded">
            ${tkt.status === 'in_progress' ? t('status_in') : t('status_wait')}
          </span>
        </div>
        <p class="text-sm font-bold text-slate-900 mt-1">${tkt.doctorName} • <strong>${tkt.room}</strong></p>
        <p class="text-xs text-slate-500">${t('patient_word')}: ${tkt.patientName} (${tkt.phone})</p>
      </div>
      <button onclick="cancelTicket(${tkt.id})" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-all">
        ${t('btn_cancel')}
      </button>
    </div>
  `).join('');
}

function cancelTicket(id) {
  const tkt = queue.find(q => q.id === id);
  if (tkt) {
    const doc = doctors.find(d => d.id === tkt.doctorId);
    if (doc) doc.bookedSlots = doc.bookedSlots.filter(s => s !== tkt.time);
  }
  queue = queue.filter(q => q.id !== id);
  myTickets = myTickets.filter(tid => tid !== id);
  saveDB();
  renderMyTickets();
  renderDoctors();
  renderTablo();
  showToast(t('toast_cancelled'));
}

// Shifokor kabineti
function handleDoctorLogin(e) {
  e.preventDefault();
  const l = document.getElementById('doc-login').value.trim().toLowerCase();
  const p = document.getElementById('doc-pin').value.trim();
  const doc = doctors.find(d => d.login.toLowerCase() === l && d.pin === p);
  const errEl = document.getElementById('doc-auth-err');

  if (!doc) {
    if (errEl) {
      errEl.textContent = t('auth_doc_err');
      errEl.classList.remove('hidden');
    }
    return;
  }
  if (errEl) errEl.classList.add('hidden');
  document.getElementById('doc-pin').value = '';
  loggedDoc = doc;
  renderDocPanel();
}

function logoutDoctor() {
  loggedDoc = null;
  renderDocPanel();
}

function renderDocPanel() {
  const loginBox = document.getElementById('doctor-login-box');
  const dashBox = document.getElementById('doctor-dash');
  if (!loginBox || !dashBox) return;

  if (!loggedDoc) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }
  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');
  document.getElementById('d-name').textContent = loggedDoc.name;
  const localizedSpec = t('specs')[loggedDoc.specialty] || loggedDoc.specialty;
  document.getElementById('d-info').textContent = `${localizedSpec} • ${loggedDoc.clinic} (${loggedDoc.room})`;

  const dq = queue.filter(q => q.doctorId === loggedDoc.id && q.status !== 'completed');
  document.getElementById('d-queue').innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-sm font-bold text-slate-800">${t('doc_room_queue')} (${dq.length})</h3>
      <button onclick="callNext(${loggedDoc.id})" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm">
        📢 ${t('btn_call_next')}
      </button>
    </div>
    <div class="space-y-2">
      ${dq.map(i => `
        <div class="p-3 border rounded-xl flex justify-between items-center ${i.status === 'in_progress' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}">
          <div>
            <span class="font-black text-teal-800 text-base">${i.ticketNo}</span> 
            <strong class="ml-2 text-slate-800">${i.patientName}</strong> 
            <span class="text-xs text-slate-500">(${i.time})</span>
          </div>
          <span class="text-xs font-bold px-2 py-0.5 rounded ${i.status === 'in_progress' ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800'}">
            ${i.status === 'in_progress' ? t('status_in') : t('status_wait')}
          </span>
        </div>
      `).join('') || `<p class="text-xs text-slate-400">${t('no_waiting_patients')}</p>`}
    </div>
  `;
}

function callNext(docId) {
  queue.forEach(q => { if (q.doctorId === docId && q.status === 'in_progress') q.status = 'completed'; });
  const next = queue.find(q => q.doctorId === docId && q.status === 'waiting');
  if (next) {
    next.status = 'in_progress';
    showToast(`📢 ${t('toast_called')} ${next.ticketNo} (${next.patientName})`);
  } else {
    showToast(t('all_patients_called'));
  }
  saveDB();
  renderDocPanel();
  renderTablo();
}

// Admin boshqaruvi
function handleAdminLogin(e) {
  e.preventDefault();
  const admLogin = document.getElementById('adm-login').value.trim();
  const admPin = document.getElementById('adm-pin').value.trim();
  const errEl = document.getElementById('adm-auth-err');

  if (admLogin === 'admin' && admPin === '7777') {
    if (errEl) errEl.classList.add('hidden');
    document.getElementById('adm-pin').value = '';
    isAdmin = true;
    renderAdminPanel();
  } else {
    if (errEl) {
      errEl.textContent = t('auth_adm_err');
      errEl.classList.remove('hidden');
    }
  }
}

function logoutAdmin() {
  isAdmin = false;
  renderAdminPanel();
}

function renderAdminPanel() {
  const loginBox = document.getElementById('admin-login-box');
  const dashBox = document.getElementById('admin-dash');
  if (!loginBox || !dashBox) return;

  if (!isAdmin) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }
  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');

  document.getElementById('admin-rooms').innerHTML = doctors.map(d => {
    const localizedSpec = t('specs')[d.specialty] || d.specialty;
    return `
      <div class="p-4 border rounded-2xl bg-slate-50 flex flex-col justify-between">
        <div>
          <div class="flex justify-between text-xs font-bold text-teal-700 mb-1">
            <span>${localizedSpec} (${d.room})</span>
            <span class="text-slate-400">${d.region}</span>
          </div>
          <h4 class="font-extrabold text-slate-900">${d.name}</h4>
          <p class="text-xs text-slate-500 font-mono mt-1">Login: ${d.login} | PIN: ${d.pin}</p>
        </div>
        <button onclick="deleteDoc(${d.id})" class="mt-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all">
          ${t('btn_delete_doc')}
        </button>
      </div>
    `;
  }).join('');
}

function deleteDoc(id) {
  if (doctors.length <= 1) {
    alert(t('min_doc_alert'));
    return;
  }
  doctors = doctors.filter(d => d.id !== id);
  queue = queue.filter(q => q.doctorId !== id);
  saveDB();
  renderAdminPanel();
  renderDoctors();
  showToast(t('toast_doc_deleted'));
}

function openAddDocModal() {
  const rSel = document.getElementById('nd-region');
  rSel.innerHTML = '';
  Object.keys(REGIONS_DATA).forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    rSel.appendChild(opt);
  });
  updateNewDocDistricts();

  document.getElementById('add-doc-modal').classList.remove('hidden');
  document.getElementById('add-doc-modal').classList.add('flex');
}

function updateNewDocDistricts() {
  const reg = document.getElementById('nd-region').value;
  const dSel = document.getElementById('nd-district');
  dSel.innerHTML = '';
  (REGIONS_DATA[reg] || []).forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    dSel.appendChild(opt);
  });
}

function closeAddDocModal() {
  document.getElementById('add-doc-modal').classList.add('hidden');
  document.getElementById('add-doc-modal').classList.remove('flex');
}

function submitNewDoc(e) {
  e.preventDefault();
  const spec = document.getElementById('nd-spec').value;
  const nd = {
    id: Date.now(),
    name: document.getElementById('nd-name').value.trim(),
    specialty: spec,
    region: document.getElementById('nd-region').value,
    district: document.getElementById('nd-district').value,
    clinic: document.getElementById('nd-clinic').value.trim(),
    room: document.getElementById('nd-room').value.trim(),
    rating: 5.0,
    price: `50 000 ${t('som')}`,
    prefix: spec[0],
    login: document.getElementById('nd-login').value.trim().toLowerCase(),
    pin: document.getElementById('nd-pin').value.trim(),
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",
    bookedSlots: []
  };

  doctors.unshift(nd);
  saveDB();

  document.getElementById('nd-name').value = '';
  document.getElementById('nd-clinic').value = '';
  document.getElementById('nd-login').value = '';
  document.getElementById('nd-pin').value = '';

  closeAddDocModal();
  renderDoctors();
  renderAdminPanel();
  showToast(t('toast_doc_added'));
}
