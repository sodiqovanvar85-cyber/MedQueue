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

// Ommaviy shifokorlar ro'yxati (Frontendda login va PIN-kodlar yo'q!)
const FALLBACK_DOCTORS = [
  { id: 1, name: "Dr. Azizbek Rahimov", specialty: "Kardiolog", region: "Toshkent viloyati", district: "Chirchiq sh.", clinic: "Chirchiq Markaziy Poliklinikasi", clinicType: "Davlat", room: "204-xona", experience: "14 yil", rating: 4.9, price: "Bepul / 45 000 so'm", prefix: "K", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80", bookedSlots: ["09:00", "09:30"] },
  { id: 2, name: "Dr. Dilnoza Karimova", specialty: "Pediatr", region: "Toshkent viloyati", district: "Qibray tumani", clinic: "MedLine Kids Xususiy Klinikasi", clinicType: "Xususiy", room: "108-xona", experience: "9 yil", rating: 5.0, price: "100 000 so'm", prefix: "P", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=80", bookedSlots: ["08:30", "11:00"] }
];

let doctors = JSON.parse(localStorage.getItem('doctime_public_doctors')) || FALLBACK_DOCTORS;
let queue = JSON.parse(localStorage.getItem('doctime_public_queue')) || [];
let messagesList = JSON.parse(localStorage.getItem('doctime_public_messages')) || [];
let myTicketIds = JSON.parse(localStorage.getItem('doctime_my_tickets')) || [102];

let selectedSpecialty = 'all';
let activeBookingDocId = null;
let selectedSlotTime = '';

// Auth tokens (sessionStorage)
let doctorToken = sessionStorage.getItem('medqueue_doc_token') || '';
let loggedInDoctor = JSON.parse(sessionStorage.getItem('medqueue_doc_info') || 'null');
let adminToken = sessionStorage.getItem('medqueue_admin_token') || '';
let isAdminLoggedIn = Boolean(adminToken);
let adminUsersList = [];
let activeMsgTarget = { name: '', phone: '' };

// Asia/Tashkent vaqti va sanasi
function getTashkentTimeString() {
  return new Date().toLocaleTimeString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getTashkentDateISO() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
}

// =====================================================================
// OFFLAYN REJIM: server topilmasa, ma'lumotlar Chrome xotirasida (localStorage) saqlanadi
// Bu server.js ning vazifasini brauzerda taqlid qiladi (faqat shu brauzer uchun, demo rejim).
// =====================================================================
const LOCAL_DB_KEY = 'doctime_local_db_v1';
let offlineMode = false;

const LOCAL_SEED_DOCTORS = [
  {"id": 1, "name": "Dr. Azizbek Rahimov", "specialty": "Kardiolog", "region": "Toshkent viloyati", "district": "Chirchiq sh.", "clinic": "Chirchiq Markaziy Poliklinikasi", "clinicType": "Davlat", "room": "204-xona", "experience": "14 yil", "rating": 4.9, "price": "Bepul / 45 000 so'm", "prefix": "K", "login": "kardiolog", "pin": "2040", "avatar": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:00", "09:30"]},
  {"id": 2, "name": "Dr. Dilnoza Karimova", "specialty": "Pediatr", "region": "Toshkent viloyati", "district": "Qibray tumani", "clinic": "MedLine Kids Xususiy Klinikasi", "clinicType": "Xususiy", "room": "108-xona", "experience": "9 yil", "rating": 5, "price": "100 000 so'm", "prefix": "P", "login": "pediatr", "pin": "1080", "avatar": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["08:30", "11:00"]},
  {"id": 3, "name": "Dr. Jamshid Rustamov", "specialty": "Stomatolog", "region": "Samarqand viloyati", "district": "Samarqand sh.", "clinic": "SamDent Stomatologiya Markazi", "clinicType": "Xususiy", "room": "12-xona", "experience": "11 yil", "rating": 4.8, "price": "80 000 so'm", "prefix": "S", "login": "stomatolog", "pin": "1200", "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:00"]},
  {"id": 4, "name": "Dr. Malika To'xtayeva", "specialty": "Nevropatolog", "region": "Farg'ona viloyati", "district": "Farg'ona sh.", "clinic": "Farg'ona Diagnostika Markazi", "clinicType": "Davlat", "room": "305-xona", "experience": "17 yil", "rating": 4.9, "price": "35 000 so'm", "prefix": "N", "login": "nevro", "pin": "3050", "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["08:30", "10:00"]},
  {"id": 5, "name": "Dr. Sardorbek Aliyev", "specialty": "Terapevt", "region": "Andijon viloyati", "district": "Andijon sh.", "clinic": "Andijon 1-sonli Oilaviy Poliklinika", "clinicType": "Davlat", "room": "101-xona", "experience": "12 yil", "rating": 4.7, "price": "Bepul", "prefix": "T", "login": "terapevt", "pin": "1010", "avatar": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:30"]},
  {"id": 6, "name": "Dr. Gulnora Saidova", "specialty": "Okulist", "region": "Buxoro viloyati", "district": "Buxoro sh.", "clinic": "Buxoro Nur Ko'z Klinikasi", "clinicType": "Xususiy", "room": "210-xona", "experience": "15 yil", "rating": 5, "price": "90 000 so'm", "prefix": "O", "login": "okulist", "pin": "2100", "avatar": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["11:30"]},
  {"id": 7, "name": "Dr. Otabek Xolmatov", "specialty": "LOR", "region": "Namangan viloyati", "district": "Namangan sh.", "clinic": "Namangan Shifo LOR Markazi", "clinicType": "Xususiy", "room": "114-xona", "experience": "10 yil", "rating": 4.9, "price": "70 000 so'm", "prefix": "L", "login": "lor", "pin": "1140", "avatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["10:30"]},
  {"id": 8, "name": "Dr. Shaxnoza Qodirova", "specialty": "Terapevt", "region": "Qashqadaryo viloyati", "district": "Qarshi sh.", "clinic": "Qarshi Markaziy Poliklinikasi", "clinicType": "Davlat", "room": "105-xona", "experience": "8 yil", "rating": 4.8, "price": "Bepul", "prefix": "T", "login": "qarshi", "pin": "1050", "avatar": "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:00"]},
  {"id": 9, "name": "Dr. Ulug'bek Normatov", "specialty": "Kardiolog", "region": "Surxondaryo viloyati", "district": "Termiz sh.", "clinic": "Termiz Kardiologiya Markazi", "clinicType": "Davlat", "room": "201-xona", "experience": "16 yil", "rating": 4.9, "price": "35 000 so'm", "prefix": "K", "login": "termiz", "pin": "2010", "avatar": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["10:00"]},
  {"id": 10, "name": "Dr. Feruza Matyoqubova", "specialty": "Pediatr", "region": "Xorazm viloyati", "district": "Urganch sh.", "clinic": "Urganch Bolalar Shifoxonasi", "clinicType": "Davlat", "room": "103-xona", "experience": "13 yil", "rating": 5, "price": "Bepul", "prefix": "P", "login": "urganch", "pin": "1030", "avatar": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["08:30"]},
  {"id": 11, "name": "Dr. Boburjon Hasanov", "specialty": "Nevropatolog", "region": "Navoiy viloyati", "district": "Navoiy sh.", "clinic": "Navoiy Med Standard", "clinicType": "Xususiy", "room": "208-xona", "experience": "11 yil", "rating": 4.8, "price": "85 000 so'm", "prefix": "N", "login": "navoiy", "pin": "2080", "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:00"]},
  {"id": 12, "name": "Dr. Nodira Bekmurodova", "specialty": "Terapevt", "region": "Jizzax viloyati", "district": "Jizzax sh.", "clinic": "Jizzax Shahar Poliklinikasi", "clinicType": "Davlat", "room": "110-xona", "experience": "14 yil", "rating": 4.9, "price": "Bepul", "prefix": "T", "login": "jizzax", "pin": "1100", "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["09:30"]},
  {"id": 13, "name": "Dr. Sanjarbek Yo'ldoshev", "specialty": "Stomatolog", "region": "Sirdaryo viloyati", "district": "Guliston sh.", "clinic": "Guliston Denta Lux", "clinicType": "Xususiy", "room": "15-xona", "experience": "9 yil", "rating": 4.8, "price": "75 000 so'm", "prefix": "S", "login": "guliston", "pin": "1500", "avatar": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80", "bookedSlots": ["14:00"]}
];

function localNow() {
  return new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
}

function localSanitize(str = '') {
  return String(str).replace(/[<>]/g, '').trim();
}

// Oddiy xesh (demo uchun; parol ochiq ko'rinmasligi uchun. Haqiqiy xavfsizlik emas!)
function simpleHash(text) {
  const s = String(text) + '|doctime_local_salt';
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

function localError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function localSeedDB() {
  const today = getTashkentDateISO();
  return {
    adminAuth: { login: 'admin', passwordHash: simpleHash('7777') },
    doctors: LOCAL_SEED_DOCTORS.map(({ pin, ...rest }) => ({ ...rest, pinHash: simpleHash(pin) })),
    users: [
      { id: 1001, name: 'Saida Nazarova', phone: '+998 93 456 78 90', email: 'saida.nazarova@mail.uz', registeredAt: localNow() }
    ],
    appointments: [
      { id: 101, ticketNo: 'K-011', patientName: 'Olimjon Mahmudov', phone: '+998 90 123 45 67', email: '', doctorId: 1, doctorName: 'Dr. Azizbek Rahimov', specialty: 'Kardiolog', clinic: 'Chirchiq Markaziy Poliklinikasi', room: '204-xona', date: today, time: '09:00', price: "Bepul / 45 000 so'm", status: 'Tasdiqlandi', createdAt: localNow() },
      { id: 102, ticketNo: 'K-012', patientName: 'Saida Nazarova', phone: '+998 93 456 78 90', email: 'saida.nazarova@mail.uz', doctorId: 1, doctorName: 'Dr. Azizbek Rahimov', specialty: 'Kardiolog', clinic: 'Chirchiq Markaziy Poliklinikasi', room: '204-xona', date: today, time: '09:30', price: "Bepul / 45 000 so'm", status: 'Kutilmoqda', createdAt: localNow() }
    ],
    messages: []
  };
}

function localReadDB() {
  try {
    const raw = localStorage.getItem(LOCAL_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* buzilgan bo'lsa qayta yaratiladi */ }
  const db = localSeedDB();
  localWriteDB(db);
  return db;
}

function localWriteDB(db) {
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(db));
}

function localPublicDoctors(doctors, appointments) {
  const today = getTashkentDateISO();
  return doctors.map(({ pinHash, login, ...pub }) => ({
    ...pub,
    bookedSlots: Array.from(new Set(
      appointments
        .filter(a => Number(a.doctorId) === Number(pub.id) && a.status !== 'Bekor qilindi' && (!a.date || a.date === today))
        .map(a => a.time)
    ))
  }));
}

function localIsAdmin(headers) {
  return String(headers['x-admin-token'] || '').startsWith('local-admin-');
}
function localIsDoctor(headers) {
  return String(headers['x-doctor-token'] || '').startsWith('local-doc-');
}

const LOCAL_PHONE_RE = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;

async function localApi(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = options.headers || {};
  let body = {};
  try { body = options.body ? JSON.parse(options.body) : {}; } catch (e) { body = {}; }
  const cleanPath = path.split('?')[0];
  let m;

  // GET /api/data
  if (method === 'GET' && cleanPath === '/api/data') {
    const db = localReadDB();
    return {
      serverTime: localNow(),
      todayISO: getTashkentDateISO(),
      doctors: localPublicDoctors(db.doctors, db.appointments),
      appointments: db.appointments,
      messages: db.messages || []
    };
  }

  // POST /api/appointments
  if (method === 'POST' && cleanPath === '/api/appointments') {
    const patientName = localSanitize(body.patientName);
    const phone = localSanitize(body.phone);
    const email = localSanitize(body.email);
    const doctorId = Number(body.doctorId);
    const date = localSanitize(body.date) || getTashkentDateISO();
    const time = localSanitize(body.time);

    if (patientName.length < 3) throw localError(400, "Bemor ism-sharifi kamida 3 ta harfdan iborat bo'lishi kerak!");
    if (!LOCAL_PHONE_RE.test(phone)) throw localError(400, "Telefon raqamni to'liq kiriting (+998 XX XXX XX XX)!");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw localError(400, "Email manzili noto'g'ri!");
    if (!doctorId || !time) throw localError(400, "Shifokor va qabul vaqtini tanlang!");

    const db = localReadDB();
    const doc = db.doctors.find(d => Number(d.id) === doctorId);
    if (!doc) throw localError(404, 'Shifokor topilmadi!');

    const taken = db.appointments.some(a => Number(a.doctorId) === doctorId && a.date === date && a.time === time && a.status !== 'Bekor qilindi');
    if (taken) throw localError(409, `Kechirasiz, ${doc.name} uchun ${date} kuni soat ${time} band qilingan! Boshqa vaqtni tanlang.`);

    if (!db.users.find(u => u.phone === phone)) {
      db.users.unshift({ id: Date.now() - 1, name: patientName, phone, email, registeredAt: localNow() });
    }

    const appointment = {
      id: Date.now(),
      ticketNo: `${doc.prefix}-0${Math.floor(10 + Math.random() * 89)}`,
      patientName, phone, email,
      doctorId: doc.id, doctorName: doc.name, specialty: doc.specialty,
      clinic: doc.clinic, room: doc.room, date, time, price: doc.price,
      status: 'Kutilmoqda', createdAt: localNow()
    };
    db.appointments.push(appointment);
    localWriteDB(db);
    return { success: true, appointment, doctors: localPublicDoctors(db.doctors, db.appointments) };
  }

  // POST /api/appointments/:id/cancel
  if (method === 'POST' && (m = cleanPath.match(/^\/api\/appointments\/([^/]+)\/cancel$/))) {
    const db = localReadDB();
    const item = db.appointments.find(a => String(a.id) === String(m[1]));
    if (!item) throw localError(404, 'Talon topilmadi!');
    item.status = 'Bekor qilindi';
    localWriteDB(db);
    return { success: true, appointment: item, doctors: localPublicDoctors(db.doctors, db.appointments) };
  }

  // POST /api/doctor/login
  if (method === 'POST' && cleanPath === '/api/doctor/login') {
    const login = localSanitize(body.login).toLowerCase();
    const pin = String(body.pin || '').trim();
    const db = localReadDB();
    const doc = db.doctors.find(d => String(d.login).toLowerCase() === login);
    if (!doc || doc.pinHash !== simpleHash(pin)) throw localError(401, "Shifokor logini yoki PIN-kodi noto'g'ri!");
    const { pinHash, ...safeDoc } = doc;
    return { success: true, token: `local-doc-${doc.id}-${Date.now()}`, doctor: safeDoc };
  }

  // POST /api/doctor/:id/call-next
  if (method === 'POST' && (m = cleanPath.match(/^\/api\/doctor\/([^/]+)\/call-next$/))) {
    if (!localIsAdmin(headers) && !localIsDoctor(headers)) throw localError(403, 'Avtorizatsiya talab qilinadi!');
    const doctorId = Number(m[1]);
    const db = localReadDB();
    if (!db.doctors.find(d => Number(d.id) === doctorId)) throw localError(404, 'Shifokor topilmadi!');
    db.appointments.forEach(a => {
      if (Number(a.doctorId) === doctorId && a.status === 'Tasdiqlandi') a.status = 'Yakunlandi';
    });
    const next = db.appointments.find(a => Number(a.doctorId) === doctorId && a.status === 'Kutilmoqda');
    if (next) next.status = 'Tasdiqlandi';
    localWriteDB(db);
    return { success: true, calledTicket: next || null, appointments: db.appointments };
  }

  // POST /api/admin/login
  if (method === 'POST' && cleanPath === '/api/admin/login') {
    const login = localSanitize(body.login).toLowerCase();
    const pin = String(body.pin || '').trim();
    const db = localReadDB();
    if (login === db.adminAuth.login && simpleHash(pin) === db.adminAuth.passwordHash) {
      return { success: true, token: `local-admin-${Date.now()}` };
    }
    throw localError(401, "Admin logini yoki paroli noto'g'ri!");
  }

  // POST /api/admin/logout
  if (method === 'POST' && cleanPath === '/api/admin/logout') {
    return { success: true };
  }

  // Quyidagilar faqat admin uchun
  if (cleanPath.startsWith('/api/admin/') && !localIsAdmin(headers)) {
    throw localError(403, 'Ruxsat rad etildi! Faqat Admin kira oladi.');
  }

  // GET /api/admin/overview
  if (method === 'GET' && cleanPath === '/api/admin/overview') {
    const db = localReadDB();
    return {
      users: db.users || [],
      appointments: db.appointments || [],
      messages: db.messages || [],
      doctors: db.doctors.map(({ pinHash, ...d }) => d)
    };
  }

  // PATCH /api/admin/appointments/:id/status
  if (method === 'PATCH' && (m = cleanPath.match(/^\/api\/admin\/appointments\/([^/]+)\/status$/))) {
    const status = localSanitize(body.status);
    if (!['Kutilmoqda', 'Tasdiqlandi', 'Bekor qilindi', 'Yakunlandi'].includes(status)) throw localError(400, "Noto'g'ri status!");
    const db = localReadDB();
    const item = db.appointments.find(a => String(a.id) === String(m[1]));
    if (!item) throw localError(404, 'Qabul topilmadi!');
    item.status = status;
    localWriteDB(db);
    return { success: true, appointment: item, doctors: localPublicDoctors(db.doctors, db.appointments) };
  }

  // POST /api/admin/messages
  if (method === 'POST' && cleanPath === '/api/admin/messages') {
    const phone = localSanitize(body.phone);
    const patientName = localSanitize(body.patientName) || 'Mijoz';
    const text = localSanitize(body.text);
    if (!phone || text.length < 2) throw localError(400, 'Telefon raqam va xabar matni majburiy!');
    const db = localReadDB();
    if (!db.messages) db.messages = [];
    const message = { id: Date.now(), phone, patientName, text, sentAt: localNow() };
    db.messages.unshift(message);
    localWriteDB(db);
    return { success: true, message };
  }

  // POST /api/admin/doctors
  if (method === 'POST' && cleanPath === '/api/admin/doctors') {
    const name = localSanitize(body.name);
    const specialty = localSanitize(body.specialty);
    const room = localSanitize(body.room);
    const region = localSanitize(body.region);
    const district = localSanitize(body.district) || 'Markaziy sh.';
    const clinic = localSanitize(body.clinic);
    const login = localSanitize(body.login).toLowerCase();
    const pin = String(body.pin || '').trim();
    if (!name || !specialty || !clinic || !login || pin.length < 4) throw localError(400, "Barcha maydonlarni to'ldiring (PIN kamida 4 belgi)!");
    const db = localReadDB();
    if (db.doctors.some(d => String(d.login).toLowerCase() === login)) throw localError(409, 'Bu login band! Boshqa login tanlang.');
    db.doctors.unshift({
      id: Date.now(), name, specialty, region, district, clinic, clinicType: 'Davlat', room,
      experience: '8 yil', rating: 5.0, price: "45 000 so'm",
      prefix: specialty.slice(0, 1).toUpperCase(), login, pinHash: simpleHash(pin),
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80',
      bookedSlots: []
    });
    localWriteDB(db);
    return { success: true, doctors: localPublicDoctors(db.doctors, db.appointments) };
  }

  // DELETE /api/admin/doctors/:id
  if (method === 'DELETE' && (m = cleanPath.match(/^\/api\/admin\/doctors\/([^/]+)$/))) {
    const docId = Number(m[1]);
    const db = localReadDB();
    if (db.doctors.length <= 1) throw localError(400, 'Tizimda kamida 1 ta shifokor qolishi kerak!');
    db.doctors = db.doctors.filter(d => Number(d.id) !== docId);
    db.appointments = db.appointments.filter(a => Number(a.doctorId) !== docId);
    localWriteDB(db);
    return { success: true };
  }

  throw localError(404, `Offlayn rejimda bu yo'l yo'q: ${method} ${cleanPath}`);
}

function enableOfflineMode(reason) {
  if (offlineMode) return;
  offlineMode = true;
  console.warn('Offlayn rejim yoqildi:', reason);

  const show = () => {
    if (document.getElementById('offline-banner')) return;
    const bar = document.createElement('div');
    bar.id = 'offline-banner';
    bar.style.cssText = 'background:#fef3c7;color:#92400e;border-bottom:1px solid #fcd34d;padding:8px 14px;font-size:12px;font-weight:600;text-align:center;';
    bar.innerHTML =
      "⚠️ Offlayn rejim: server topilmadi, ma'lumotlar shu brauzer (Chrome) xotirasida saqlanmoqda — boshqa qurilmalarda ko'rinmaydi. " +
      '<button id="offline-retry" style="text-decoration:underline;margin-left:8px;">Serverni qayta tekshirish</button>' +
      '<button id="offline-reset" style="text-decoration:underline;margin-left:8px;">Offlayn ma\'lumotlarni tozalash</button>';
    document.body.prepend(bar);
    document.getElementById('offline-retry').onclick = () => location.reload();
    document.getElementById('offline-reset').onclick = () => {
      if (confirm("Offlayn rejimdagi barcha talonlar va ma'lumotlar o'chiriladi. Davom etasizmi?")) {
        localStorage.removeItem(LOCAL_DB_KEY);
        localStorage.removeItem('doctime_public_doctors');
        localStorage.removeItem('doctime_public_queue');
        localStorage.removeItem('doctime_public_messages');
        localStorage.removeItem('doctime_my_tickets');
        sessionStorage.clear();
        location.reload();
      }
    };
  };
  if (document.body) show(); else window.addEventListener('DOMContentLoaded', show);
}

// ===== SERVER BILAN ISHLASH (xatoni aniq ko'rsatadigan yordamchi) =====
// Agar frontend serverdan alohida ochilsa (masalan Live Server), bu yerga server manzilini yozing:
// const API_BASE = 'http://localhost:3000';
const API_BASE = '';

async function apiFetch(path, options = {}) {
  // Server topilmagan bo'lsa — Chrome xotirasidagi zaxira rejim ishlaydi
  if (offlineMode) return localApi(path, options);

  let res;
  try {
    res = await fetch(API_BASE + path, options);
  } catch (e) {
    enableOfflineMode("Serverga ulanib bo'lmadi");
    return localApi(path, options);
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch (e) { data = null; }
  }

  // Javob JSON emas (Live Server, 404 sahifa va h.k.) — demak haqiqiy server yo'q
  if (data === null) {
    enableOfflineMode(`Server JSON qaytarmadi (${res.status}) — ${path}`);
    return localApi(path, options);
  }

  if (!res.ok) {
    const err = new Error(data.error || `Server xatosi (${res.status}): ${path}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function authHeaders(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra };
  if (adminToken) h['x-admin-token'] = adminToken;
  if (doctorToken) h['x-doctor-token'] = doctorToken;
  return h;
}

function saveLocalCache() {
  localStorage.setItem('doctime_public_doctors', JSON.stringify(doctors));
  localStorage.setItem('doctime_public_queue', JSON.stringify(queue));
  localStorage.setItem('doctime_public_messages', JSON.stringify(messagesList));
  localStorage.setItem('doctime_my_tickets', JSON.stringify(myTicketIds));
  const badge = document.getElementById('my-ticket-badge');
  if (badge) badge.textContent = myTicketIds.length;
}

async function loadFromServerDB() {
  try {
    const data = await apiFetch('/api/data');
    if (!data) return;
    if (data.doctors) doctors = data.doctors;
    if (data.appointments) queue = data.appointments;
    if (data.messages) messagesList = data.messages;
    saveLocalCache();
    renderDoctors();
    renderTablo();
    renderMyTickets();
  } catch (err) {
    console.warn("Server bilan aloqa yo'q, lokal kesh ishlatilmoqda:", err.message);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initRegions();
  renderSpecialtyPills();
  const dateInput = document.getElementById('booking-date-input');
  if (dateInput) {
    const today = getTashkentDateISO();
    dateInput.value = today;
    dateInput.min = today;
  }
  updateClock();
  setInterval(updateClock, 1000);
  loadFromServerDB();
  lucide.createIcons();
});

function updateClock() {
  document.getElementById('live-clock').textContent = getTashkentTimeString();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3800);
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-section').forEach(el => el.classList.add('hidden'));
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
  const activeBtn = document.getElementById(`nav-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active-nav');

  if (tabName === 'tablo') renderTablo();
  if (tabName === 'tickets') renderMyTickets();
  if (tabName === 'doctor') renderDoctorPanel();
  if (tabName === 'admin') fetchAdminOverview();
  lucide.createIcons();
}

function initRegions() {
  const regSelect = document.getElementById('region-select');
  Object.keys(REGIONS_DATA).forEach(region => {
    const opt = document.createElement('option');
    opt.value = region;
    opt.textContent = region;
    regSelect.appendChild(opt);
  });
}

function handleRegionChange() {
  const reg = document.getElementById('region-select').value;
  const distSelect = document.getElementById('district-select');
  distSelect.innerHTML = '';

  if (!reg) {
    distSelect.disabled = true;
    distSelect.innerHTML = '<option value="">Avval viloyatni tanlang</option>';
  } else {
    distSelect.disabled = false;
    distSelect.innerHTML = '<option value="">Barcha tuman va shaharlar</option>';
    REGIONS_DATA[reg].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      distSelect.appendChild(opt);
    });
  }
  renderDoctors();
}

function renderSpecialtyPills() {
  const container = document.getElementById('specialty-pills');
  container.innerHTML = SPECIALTIES.map(s => `
    <button onclick="selectSpecialty('${s.id}')" class="px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
      selectedSpecialty === s.id
        ? 'bg-teal-600 text-white border-teal-600 shadow-md'
        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300'
    }">
      <span>${s.icon}</span>
      <span>${s.name}</span>
    </button>
  `).join('');
}

function selectSpecialty(id) {
  selectedSpecialty = id;
  renderSpecialtyPills();
  renderDoctors();
}

function renderDoctors() {
  const reg = document.getElementById('region-select').value;
  const dist = document.getElementById('district-select').value;
  const query = document.getElementById('search-input').value.toLowerCase();

  const filtered = doctors.filter(d => {
    const matchReg = !reg || d.region === reg;
    const matchDist = !dist || d.district === dist;
    const matchSpec = selectedSpecialty === 'all' || d.specialty === selectedSpecialty;
    const matchQ = !query || d.name.toLowerCase().includes(query) || d.clinic.toLowerCase().includes(query) || d.region.toLowerCase().includes(query);
    return matchReg && matchDist && matchSpec && matchQ;
  });

  document.getElementById('found-count').textContent = `${filtered.length} ta shifokor`;
  const grid = document.getElementById('doctors-grid');

  grid.innerHTML = filtered.map(doc => {
    const booked = doc.bookedSlots || [];
    const freeSlots = ALL_TIME_SLOTS.filter(s => !booked.includes(s));
    const slotsHtml = ALL_TIME_SLOTS.map(slot => {
      const isBooked = booked.includes(slot);
      return `
        <button ${isBooked ? 'disabled' : `onclick="openBookingModal(${doc.id}, '${slot}')"`}
          class="py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-all ${
            isBooked
              ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
              : 'bg-white text-emerald-700 border-emerald-300 hover:bg-teal-600 hover:text-white'
          }">
          ${slot}
        </button>
      `;
    }).join('');

    return `
      <div class="bg-white rounded-3xl p-5 border border-teal-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-start gap-3.5 mb-3.5">
            <img src="${doc.avatar}" alt="${doc.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-100 shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 mb-1">
                <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">${doc.specialty}</span>
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700">${doc.clinicType}</span>
              </div>
              <h3 class="text-base font-extrabold text-slate-900 truncate">${doc.name}</h3>
              <p class="text-xs text-slate-500">⭐ ${doc.rating} • Tajriba: ${doc.experience}</p>
            </div>
          </div>

          <div class="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-3.5">
            <div class="font-semibold text-slate-800 truncate">🏥 ${doc.clinic} (${doc.room})</div>
            <div class="truncate">📍 ${doc.region}, ${doc.district}</div>
            <div class="font-bold text-teal-700 pt-1">💳 ${doc.price}</div>
          </div>

          <div class="mb-4 bg-teal-50/50 border border-teal-100 rounded-2xl p-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-extrabold uppercase text-slate-700">Bugungi bo'sh vaqtlar:</span>
              <span class="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">${freeSlots.length} ta bo'sh</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5">${slotsHtml}</div>
          </div>
        </div>

        <button onclick="openBookingModal(${doc.id}, '${freeSlots[0] || ''}')" class="w-full py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all">
          Vaqt tanlash va yozilish
        </button>
      </div>
    `;
  }).join('');
}

function openBookingModal(docId, defaultSlot) {
  activeBookingDocId = docId;
  const doc = doctors.find(d => String(d.id) === String(docId));
  if (!doc) return;
  const booked = doc.bookedSlots || [];
  const free = ALL_TIME_SLOTS.filter(s => !booked.includes(s));
  selectedSlotTime = defaultSlot || free[0] || '';

  document.getElementById('modal-doc-name').textContent = `${doc.name} (${doc.specialty})`;
  document.getElementById('modal-doc-clinic').textContent = `${doc.clinic} • ${doc.room} • ${doc.price}`;
  document.getElementById('booking-error').classList.add('hidden');

  renderModalSlots();
  const modal = document.getElementById('booking-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function renderModalSlots() {
  const doc = doctors.find(d => String(d.id) === String(activeBookingDocId));
  if (!doc) return;
  const booked = doc.bookedSlots || [];
  const container = document.getElementById('modal-slots-grid');

  container.innerHTML = ALL_TIME_SLOTS.map(slot => {
    const isBooked = booked.includes(slot);
    const isSelected = selectedSlotTime === slot;
    return `
      <button type="button" ${isBooked ? 'disabled' : `onclick="chooseSlot('${slot}')"`}
        class="py-2 rounded-xl text-xs font-bold border transition-all ${
          isBooked
            ? 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
            : isSelected
            ? 'bg-teal-600 text-white border-teal-600 shadow-md'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
        }">
        ${slot} ${isBooked ? '(Band)' : isSelected ? '✓' : ''}
      </button>
    `;
  }).join('');
}

function chooseSlot(slot) {
  selectedSlotTime = slot;
  renderModalSlots();
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function formatPhone(input) {
  let digits = input.value.replace(/\D/g, '');
  if (digits.length < 3 && '998'.startsWith(digits)) digits = '998';
  else if (!digits.startsWith('998')) digits = '998' + digits;
  digits = digits.slice(0, 12);
  let res = '+998';
  if (digits.length > 3) res += ' ' + digits.slice(3, 5);
  if (digits.length > 5) res += ' ' + digits.slice(5, 8);
  if (digits.length > 8) res += ' ' + digits.slice(8, 10);
  if (digits.length > 10) res += ' ' + digits.slice(10, 12);
  input.value = res;
}

// 4-BOSQICH: Frontend + Backend Validatsiya va Dublikat tekshiruvi
async function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('patient-name-input').value.trim();
  const phone = document.getElementById('patient-phone-input').value.trim();
  const email = (document.getElementById('patient-email-input')?.value || '').trim();
  const date = document.getElementById('booking-date-input')?.value || getTashkentDateISO();
  const errEl = document.getElementById('booking-error');
  const showErr = (msg) => { errEl.textContent = msg; errEl.classList.remove('hidden'); };

  if (!selectedSlotTime) return showErr("Iltimos, bo'sh soatlardan birini tanlang!");
  if (name.length < 3) return showErr("Ism-sharifingiz kamida 3 ta harfdan iborat bo'lishi kerak!");
  if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone)) return showErr("Telefon raqamingizni to'liq kiriting (+998 XX XXX XX XX)!");

  const bookedTime = selectedSlotTime;
  const bookedDocId = activeBookingDocId;

  // 1) Faqat server so'rovi shu yerda tekshiriladi
  let result;
  try {
    result = await apiFetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: name,
        phone,
        email,
        doctorId: bookedDocId,
        date,
        time: bookedTime
      })
    });
  } catch (err) {
    showErr(err.message);
    if (err.kind !== 'network') {
      await loadFromServerDB();
      renderModalSlots();
    }
    return;
  }

  if (!result || !result.appointment) {
    return showErr("Server kutilmagan javob qaytardi (appointment topilmadi). Server kodini tekshiring.");
  }

  // 2) Muvaffaqiyatli saqlandi — qolgan interfeys yangilanishi server xatosi emas
  try {
    if (result.doctors) {
      doctors = result.doctors;
    } else {
      const doc = doctors.find(d => String(d.id) === String(bookedDocId));
      if (doc) doc.bookedSlots = [...(doc.bookedSlots || []), bookedTime];
    }
    queue.push(result.appointment);
    myTicketIds.unshift(result.appointment.id);
    saveLocalCache();

    closeBookingModal();
    document.getElementById('patient-name-input').value = '';
    const emailEl = document.getElementById('patient-email-input');
    if (emailEl) emailEl.value = '';
    selectedSlotTime = '';
    errEl.classList.add('hidden');
    renderDoctors();
    showToast(`✅ Bazaga saqlandi! Talon: ${result.appointment.ticketNo || ''} (${date}, ${bookedTime})`);
    switchTab('tickets');
  } catch (uiErr) {
    console.error('Interfeysni yangilashda xato:', uiErr);
    closeBookingModal();
    loadFromServerDB();
  }
}

function renderTablo() {
  const inProg = queue.filter(q => q.status === 'Tasdiqlandi' || q.status === 'in_progress');
  const waiting = queue.filter(q => q.status === 'Kutilmoqda' || q.status === 'waiting');

  document.getElementById('tablo-inprogress').innerHTML = inProg.length === 0
    ? '<p class="text-slate-400 text-xs">Hozir xonalarda bemor yo\'q</p>'
    : inProg.map(item => `
      <div class="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl">
        <div>
          <span class="text-2xl font-black text-emerald-400">${item.ticketNo}</span>
          <p class="text-xs text-slate-300 mt-0.5">${item.patientName} • ${item.doctorName}</p>
        </div>
        <div class="text-right">
          <span class="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm">${item.room}</span>
          <p class="text-[11px] text-emerald-300 mt-1">Tasdiqlandi — Kiring</p>
        </div>
      </div>
    `).join('');

  document.getElementById('tablo-waiting').innerHTML = waiting.length === 0
    ? '<p class="text-slate-400 text-xs">Kutayotgan bemorlar yo\'q</p>'
    : waiting.map(item => `
      <div class="flex items-center justify-between bg-slate-900/90 border border-slate-700 p-3.5 rounded-2xl">
        <div>
          <span class="text-xl font-extrabold text-amber-400">${item.ticketNo}</span>
          <p class="text-xs text-slate-400">${item.patientName} (${item.date || 'Bugun'}, ${item.time})</p>
        </div>
        <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl">${item.room}</span>
      </div>
    `).join('');
}

function getStatusBadgeClass(status) {
  if (status === 'Tasdiqlandi' || status === 'in_progress') return 'bg-emerald-600 text-white';
  if (status === 'Bekor qilindi') return 'bg-rose-100 text-rose-700 border border-rose-200';
  if (status === 'Yakunlandi' || status === 'completed') return 'bg-slate-200 text-slate-700';
  return 'bg-amber-100 text-amber-800';
}

function renderMyTickets() {
  const searchQ = (document.getElementById('ticket-search-input')?.value || '').trim().toLowerCase();
  const myList = queue.filter(q => {
    const isMine = myTicketIds.includes(q.id);
    const matchSearch = searchQ.length > 1 && (
      q.ticketNo.toLowerCase().includes(searchQ) ||
      q.phone.toLowerCase().includes(searchQ) ||
      q.patientName.toLowerCase().includes(searchQ)
    );
    return isMine || matchSearch;
  });

  const container = document.getElementById('my-tickets-list');
  if (myList.length === 0) {
    container.innerHTML = `<p class="text-sm text-slate-500">Sizda hozircha faol talonlar yo'q.</p>`;
  } else {
    container.innerHTML = myList.map(t => `
      <div class="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-2xl font-black text-teal-700">${t.ticketNo}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white border border-teal-200 text-teal-800">📅 ${t.date || 'Bugun'} • ⏰ ${t.time}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeClass(t.status)}">${t.status}</span>
          </div>
          <p class="text-sm font-bold text-slate-900">${t.doctorName} (${t.specialty})</p>
          <p class="text-xs text-slate-600">🏥 ${t.clinic} • <strong>${t.room}</strong> • 💳 ${t.price || 'Bepul'}</p>
          <p class="text-xs text-slate-500">👤 Bemor: ${t.patientName} (${t.phone})</p>
        </div>
        ${t.status !== 'Bekor qilindi' && t.status !== 'Yakunlandi' ? `
          <button onclick="cancelTicket('${t.id}')" class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 self-start sm:self-center">
            Navbatni bekor qilish
          </button>
        ` : ''}
      </div>
    `).join('');
  }

  // Mijozga kelgan xabarlarni ko'rsatish
  const myPhones = myList.map(t => t.phone);
  const myMsgs = messagesList.filter(m => myPhones.includes(m.phone) || (searchQ.length > 3 && m.phone.toLowerCase().includes(searchQ)));
  const msgContainer = document.getElementById('my-messages-list');
  if (msgContainer) {
    msgContainer.innerHTML = myMsgs.length === 0
      ? '<p class="text-xs text-slate-400">Hozircha yangi xabarlar yo\'q.</p>'
      : myMsgs.map(m => `
        <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
          <div class="flex items-center justify-between font-bold text-amber-900">
            <span>🏥 Shifoxona ma'muriyati (${m.patientName} uchun)</span>
            <span class="text-[11px] text-slate-500">${m.sentAt}</span>
          </div>
          <p class="text-slate-800 text-sm">${m.text}</p>
        </div>
      `).join('');
  }
}

async function cancelTicket(id) {
  try {
    await apiFetch(`/api/appointments/${id}/cancel`, { method: 'POST' });
    await loadFromServerDB();
    showToast("Talon bekor qilindi va shifokor vaqti bo'shatildi!");
  } catch (err) {
    showToast(err.message || "Bekor qilishda xatolik!");
  }
}

// SHIFOKOR PANELI (Server orqali tekshiriladi)
async function handleDoctorOnlyLogin(e) {
  e.preventDefault();
  const login = document.getElementById('doc-login-input').value.trim().toLowerCase();
  const pin = document.getElementById('doc-pin-input').value.trim();
  const err = document.getElementById('doc-auth-error');

  let data;
  try {
    data = await apiFetch('/api/doctor/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pin })
    });
  } catch (error) {
    err.textContent = error.message || "Login yoki PIN-kod xato!";
    err.classList.remove('hidden');
    return;
  }
  if (!data || !data.token || !data.doctor) {
    err.textContent = "Server kutilmagan javob qaytardi (token yoki doctor yo'q).";
    err.classList.remove('hidden');
    return;
  }

  doctorToken = data.token;
  loggedInDoctor = data.doctor;
  sessionStorage.setItem('medqueue_doc_token', doctorToken);
  sessionStorage.setItem('medqueue_doc_info', JSON.stringify(loggedInDoctor));
  err.classList.add('hidden');
  document.getElementById('doc-pin-input').value = '';
  renderDoctorPanel();
  showToast(`👨‍⚕️ Xush kelibsiz, ${loggedInDoctor.name}!`);
}

function logoutDoctor() {
  loggedInDoctor = null;
  doctorToken = '';
  sessionStorage.removeItem('medqueue_doc_token');
  sessionStorage.removeItem('medqueue_doc_info');
  renderDoctorPanel();
  showToast("Shifokor kabinetidan chiqildi");
}

function renderDoctorPanel() {
  const loginBox = document.getElementById('doctor-login-box');
  const dashBox = document.getElementById('doctor-dashboard-box');
  if (!loginBox || !dashBox) return;

  if (!loggedInDoctor || !doctorToken) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }

  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');

  document.getElementById('dash-doc-name').textContent = loggedInDoctor.name;
  document.getElementById('dash-doc-info').textContent = `${loggedInDoctor.specialty} • ${loggedInDoctor.clinic} (${loggedInDoctor.room})`;

  const docQueue = queue.filter(q => Number(q.doctorId) === Number(loggedInDoctor.id) && q.status !== 'Yakunlandi' && q.status !== 'Bekor qilindi');
  const container = document.getElementById('dash-doc-queue');

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h3 class="text-base font-bold text-slate-800">Xonangiz navbati (${docQueue.length} nafar bemor)</h3>
      <button onclick="callNextPatient(${loggedInDoctor.id})" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg">
        📢 Keyingi bemorni chaqirish
      </button>
    </div>
    <div class="space-y-2.5">
      ${docQueue.length === 0 ? '<p class="text-sm text-slate-500">Xonangizda kutayotgan bemorlar yo\'q.</p>' : docQueue.map(item => `
        <div class="p-4 rounded-2xl border flex items-center justify-between ${item.status === 'Tasdiqlandi' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}">
          <div>
            <span class="text-lg font-black text-teal-800">${item.ticketNo}</span>
            <span class="ml-2 text-sm font-bold text-slate-800">${item.patientName}</span>
            <p class="text-xs text-slate-500">Sana: ${item.date || 'Bugun'} • Soat: ${item.time} • Tel: ${item.phone}</p>
          </div>
          <span class="px-3 py-1 rounded-lg text-xs font-bold ${getStatusBadgeClass(item.status)}">
            ${item.status}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

// ADMIN PANELI (Server tomonidan himoyalangan)
async function handleAdminLogin(e) {
  e.preventDefault();
  const login = document.getElementById('admin-login-input').value.trim().toLowerCase();
  const pin = document.getElementById('admin-pin-input').value.trim();
  const err = document.getElementById('admin-auth-error');

  let data;
  try {
    data = await apiFetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pin })
    });
  } catch (error) {
    err.textContent = error.message || "Login yoki parol xato!";
    err.classList.remove('hidden');
    return;
  }
  if (!data || !data.token) {
    err.textContent = "Server kutilmagan javob qaytardi (token yo'q).";
    err.classList.remove('hidden');
    return;
  }

  adminToken = data.token;
  sessionStorage.setItem('medqueue_admin_token', adminToken);
  isAdminLoggedIn = true;
  err.classList.add('hidden');
  document.getElementById('admin-pin-input').value = '';
  await fetchAdminOverview();
  showToast("👑 Server orqali Admin tasdiqlandi!");
}

async function logoutAdmin() {
  if (adminToken) {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: { 'x-admin-token': adminToken }
    }).catch(() => {});
  }
  adminToken = '';
  isAdminLoggedIn = false;
  sessionStorage.removeItem('medqueue_admin_token');
  renderAdminPanel();
  showToast("Admin paneldan chiqildi");
}

async function fetchAdminOverview() {
  if (!adminToken) {
    isAdminLoggedIn = false;
    renderAdminPanel();
    return;
  }
  try {
    const data = await apiFetch('/api/admin/overview', {
      headers: { 'x-admin-token': adminToken }
    });
    adminUsersList = (data && data.users) || [];
    queue = (data && data.appointments) || [];
    messagesList = (data && data.messages) || [];
    isAdminLoggedIn = true;
    renderAdminPanel();
  } catch (err) {
    if (err.status === 401 || err.status === 403) {
      adminToken = '';
      isAdminLoggedIn = false;
      sessionStorage.removeItem('medqueue_admin_token');
      renderAdminPanel();
      return;
    }
    console.error(err);
    showToast(err.message);
  }
}

async function updateAppointmentStatus(id, newStatus) {
  try {
    await apiFetch(`/api/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify({ status: newStatus })
    });
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast(`✅ Qabul holati "${newStatus}" deb o'zgartirildi!`);
  } catch (err) {
    showToast(err.message || "Statusni o'zgartirishda xatolik!");
  }
}

function openMessageModal(name, phone) {
  activeMsgTarget = { name, phone };
  document.getElementById('msg-patient-name').textContent = name;
  document.getElementById('msg-patient-phone').textContent = phone;
  document.getElementById('msg-text-input').value = '';
  const m = document.getElementById('message-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeMessageModal() {
  const m = document.getElementById('message-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

async function submitSendMessage(e) {
  e.preventDefault();
  const text = document.getElementById('msg-text-input').value.trim();
  if (!text) return;

  try {
    await apiFetch('/api/admin/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify({
        patientName: activeMsgTarget.name,
        phone: activeMsgTarget.phone,
        text
      })
    });
    closeMessageModal();
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast(`📩 Xabar ${activeMsgTarget.name} (${activeMsgTarget.phone}) ga yuborildi!`);
  } catch (err) {
    showToast(err.message || "Xabar yuborishda xatolik!");
  }
}

function renderAdminPanel() {
  const loginBox = document.getElementById('admin-login-box');
  const dashBox = document.getElementById('admin-dashboard-box');
  if (!loginBox || !dashBox) return;

  if (!isAdminLoggedIn || !adminToken) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }

  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');

  const waitingCount = queue.filter(q => q.status === 'Kutilmoqda').length;
  const confirmedCount = queue.filter(q => q.status === 'Tasdiqlandi').length;
  const completedCount = queue.filter(q => q.status === 'Yakunlandi').length;

  document.getElementById('admin-stats-grid').innerHTML = `
    <div class="p-5 rounded-2xl bg-white border border-teal-100 shadow-xs">
      <div class="text-[11px] font-extrabold uppercase text-slate-400">Ro'yxatdan o'tganlar</div>
      <div class="text-3xl font-black text-slate-900 mt-1">${adminUsersList.length} ta</div>
      <div class="text-xs text-teal-600 font-semibold mt-0.5">Mijoz akkauntlari</div>
    </div>
    <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
      <div class="text-[11px] font-extrabold uppercase text-amber-700">Kutilmoqda</div>
      <div class="text-3xl font-black text-slate-900 mt-1">${waitingCount}</div>
      <div class="text-xs text-slate-500 mt-0.5">Navbat kutayotganlar</div>
    </div>
    <div class="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
      <div class="text-[11px] font-extrabold uppercase text-emerald-700">Tasdiqlandi</div>
      <div class="text-3xl font-black text-emerald-700 mt-1">${confirmedCount}</div>
      <div class="text-xs text-slate-500 mt-0.5">Tasdiqlangan qabullar</div>
    </div>
    <div class="p-5 rounded-2xl bg-teal-50/80 border border-teal-200">
      <div class="text-[11px] font-extrabold uppercase text-teal-700">Yakunlandi</div>
      <div class="text-3xl font-black text-teal-800 mt-1">${completedCount}</div>
      <div class="text-xs text-slate-500 mt-0.5">Ko'rilgan bemorlar</div>
    </div>
  `;

  document.getElementById('admin-all-tickets').innerHTML = queue.length === 0
    ? '<p class="text-sm text-slate-500">Hozircha qabulga yozilgan bemorlar yo\'q.</p>'
    : queue.map(t => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-base font-black text-teal-700">${t.ticketNo}</span>
            <span class="text-sm font-bold text-slate-900">${t.patientName}</span>
            <span class="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">${t.phone}</span>
            ${t.email ? `<span class="text-xs text-slate-500">✉️ ${t.email}</span>` : ''}
          </div>
          <p class="text-xs text-slate-600">
            👨‍⚕️ <strong>${t.doctorName}</strong> (${t.specialty}, ${t.room}) • 📅 Sana: <strong>${t.date || 'Bugun'}</strong> • ⏰ Soat: <strong>${t.time}</strong> • 💳 Narx: <strong>${t.price}</strong>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${getStatusBadgeClass(t.status)}">${t.status}</span>

          <select onchange="updateAppointmentStatus('${t.id}', this.value)" class="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="Kutilmoqda" ${t.status === 'Kutilmoqda' ? 'selected' : ''}>⏳ Kutilmoqda</option>
            <option value="Tasdiqlandi" ${t.status === 'Tasdiqlandi' ? 'selected' : ''}>✅ Tasdiqlandi</option>
            <option value="Bekor qilindi" ${t.status === 'Bekor qilindi' ? 'selected' : ''}>❌ Bekor qilindi</option>
            <option value="Yakunlandi" ${t.status === 'Yakunlandi' ? 'selected' : ''}>🏁 Yakunlandi</option>
          </select>

          <button onclick="openMessageModal('${t.patientName}', '${t.phone}')" class="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs">
            💬 Xabar yuborish
          </button>
        </div>
      </div>
    `).join('');

  const usersContainer = document.getElementById('admin-users-list');
  if (usersContainer) {
    usersContainer.innerHTML = adminUsersList.length === 0
      ? '<p class="text-sm text-slate-500">Hozircha ro\'yxatdan o\'tgan foydalanuvchilar yo\'q.</p>'
      : adminUsersList.map(u => `
        <div class="p-3.5 rounded-2xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">ID: #${u.id}</span>
              <span class="text-sm font-extrabold text-slate-900">${u.name}</span>
              <span class="text-xs font-mono font-bold text-teal-700">${u.phone}</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              ${u.email ? `✉️ Email: <strong>${u.email}</strong> • ` : ''}🕒 Ro'yxatdan o'tgan (Asia/Tashkent): <strong>${u.registeredAt}</strong>
            </p>
          </div>
          <button onclick="openMessageModal('${u.name}', '${u.phone}')" class="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 font-bold text-xs">
            💬 Mijozga xabar yozish
          </button>
        </div>
      `).join('');
  }

  document.getElementById('admin-rooms-grid').innerHTML = doctors.map(doc => {
    const currentInRoom = queue.find(q => Number(q.doctorId) === Number(doc.id) && q.status === 'Tasdiqlandi');
    const waitingList = queue.filter(q => Number(q.doctorId) === Number(doc.id) && q.status === 'Kutilmoqda');
    return `
      <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-teal-700 mb-1">
            <span>${doc.specialty}</span>
            <span>${doc.room}</span>
          </div>
          <h4 class="font-extrabold text-slate-900 text-base">${doc.name}</h4>
          <p class="text-[11px] text-slate-500 mb-3 truncate">${doc.region} • ${doc.clinic}</p>
          <div class="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 mb-3">
            <div>Xonada: <strong class="text-emerald-700">${currentInRoom ? `${currentInRoom.ticketNo} (${currentInRoom.patientName})` : "Bo'sh"}</strong></div>
            <div>Kutilmoqda: <strong class="text-amber-700">${waitingList.length} kishi</strong></div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="callNextPatient(${doc.id})" class="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all">
            📢 Keyingisini chaqirish
          </button>
          <button onclick="deleteDoctor(${doc.id})" title="Shifokorni bazadan o'chirish" class="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold">
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function callNextPatient(docId) {
  try {
    const data = await apiFetch(`/api/doctor/${docId}/call-next`, {
      method: 'POST',
      headers: authHeaders()
    });
    await loadFromServerDB();
    if (isAdminLoggedIn) await fetchAdminOverview();
    renderDoctorPanel();
    renderTablo();
    if (data && data.calledTicket) {
      showToast(`📢 ${data.calledTicket.ticketNo} (${data.calledTicket.patientName}) xonaga chaqirildi!`);
    } else {
      showToast("Kutayotgan bemorlar qolmadi.");
    }
  } catch (err) {
    showToast(err.message || "Chaqirishda xatolik!");
  }
}

async function deleteDoctor(docId) {
  if (!confirm("Shifokorni bazadan o'chirishni tasdiqlaysizmi?")) return;
  try {
    await apiFetch(`/api/admin/doctors/${docId}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': adminToken }
    });
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast("🗑️ Shifokor bazadan o'chirildi.");
  } catch (err) {
    showToast(err.message || "O'chirishda xatolik!");
  }
}

function openAddDoctorModal() {
  const m = document.getElementById('add-doctor-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeAddDoctorModal() {
  const m = document.getElementById('add-doctor-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

async function submitNewDoctor(e) {
  e.preventDefault();
  const payload = {
    name: document.getElementById('new-doc-name').value.trim(),
    specialty: document.getElementById('new-doc-spec').value,
    room: document.getElementById('new-doc-room').value.trim(),
    region: document.getElementById('new-doc-region').value,
    clinic: document.getElementById('new-doc-clinic').value.trim(),
    login: document.getElementById('new-doc-login').value.trim().toLowerCase(),
    pin: document.getElementById('new-doc-pin').value.trim()
  };

  try {
    await apiFetch('/api/admin/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify(payload)
    });
    closeAddDoctorModal();
    document.getElementById('new-doc-name').value = '';
    document.getElementById('new-doc-clinic').value = '';
    document.getElementById('new-doc-login').value = '';
    document.getElementById('new-doc-pin').value = '';
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast(`✅ ${payload.name} bazaga saqlandi!`);
  } catch (err) {
    showToast(err.message || "Shifokor qo'shishda xatolik!");
  }
}

// ===== HTML'da chaqirilgan, lekin avval yozilmagan funksiyalar =====
function quickFillDoc(login, pin) {
  document.getElementById('doc-login-input').value = login;
  document.getElementById('doc-pin-input').value = pin;
}

function quickFillAdmin(login, pin) {
  document.getElementById('admin-login-input').value = login;
  document.getElementById('admin-pin-input').value = pin;
}

function openWalkInModal() {
  const sel = document.getElementById('walkin-doc-select');
  sel.innerHTML = doctors.map(d => `<option value="${d.id}">${d.name} — ${d.specialty} (${d.room})</option>`).join('');
  const m = document.getElementById('walkin-modal');
  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeWalkInModal() {
  const m = document.getElementById('walkin-modal');
  m.classList.add('hidden');
  m.classList.remove('flex');
}

async function submitWalkInTicket(e) {
  e.preventDefault();
  const docId = document.getElementById('walkin-doc-select').value;
  const name = document.getElementById('walkin-patient-name').value.trim();
  const phone = document.getElementById('walkin-patient-phone').value.trim();

  if (name.length < 3) return showToast("Bemor ismini to'liq kiriting!");
  if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone)) return showToast("Telefon raqamini to'liq kiriting (+998 XX XXX XX XX)!");

  const doc = doctors.find(d => String(d.id) === String(docId));
  if (!doc) return showToast("Shifokor topilmadi!");
  const free = ALL_TIME_SLOTS.filter(s => !(doc.bookedSlots || []).includes(s));
  if (free.length === 0) return showToast("Bu shifokorda bugun bo'sh vaqt qolmagan!");

  try {
    const result = await apiFetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify({
        patientName: name,
        phone,
        email: '',
        doctorId: doc.id,
        date: getTashkentDateISO(),
        time: free[0]
      })
    });
    closeWalkInModal();
    document.getElementById('walkin-patient-name').value = '';
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast(`✅ Talon berildi: ${(result && result.appointment && result.appointment.ticketNo) || ''} (${free[0]})`);
  } catch (err) {
    showToast(err.message || "Talon chiqarishda xatolik!");
  }
}
