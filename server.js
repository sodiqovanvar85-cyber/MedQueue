const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB_FILE = path.join(__dirname, 'database.json');
const PASSWORD_SALT = process.env.MEDQUEUE_SALT || 'medqueue_uz_tashkent_secure_salt_2026';

// 1. Vaqtni qat'iy Asia/Tashkent mintaqasida olish
function getTashkentNow() {
  return new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
}

function getTashkentDateISO() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  const y = parts.find(p => p.type === 'year').value;
  const m = parts.find(p => p.type === 'month').value;
  const d = parts.find(p => p.type === 'day').value;
  return `${y}-${m}-${d}`;
}

// 2. Parollarni xavfsiz xeshlash (PBKDF2 - SHA512)
function hashPassword(plainText) {
  return crypto
    .pbkdf2Sync(String(plainText), PASSWORD_SALT, 10000, 64, 'sha512')
    .toString('hex');
}

function verifyPassword(plainText, storedHash) {
  const hash = hashPassword(plainText);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

// 3. XSS va zararli belgilardan tozalash
function sanitize(str = '') {
  return String(str).replace(/[<>]/g, '').trim();
}

// 4. Boshlang'ich 12 viloyat shifokorlari (Parollar faqat xesh ko'rinishida saqlanadi)
function getInitialDoctors() {
  const rawDocs = [
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

  return rawDocs.map(({ pin, ...rest }) => ({
    ...rest,
    pinHash: hashPassword(pin)
  }));
}

function initDB() {
  const today = getTashkentDateISO();
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      adminAuth: {
        login: 'admin',
        passwordHash: hashPassword('7777')
      },
      doctors: getInitialDoctors(),
      users: [
        {
          id: 1001,
          name: "Saida Nazarova",
          phone: "+998 93 456 78 90",
          email: "saida.nazarova@mail.uz",
          registeredAt: getTashkentNow()
        }
      ],
      appointments: [
        {
          id: 101,
          ticketNo: "K-011",
          patientName: "Olimjon Mahmudov",
          phone: "+998 90 123 45 67",
          email: "",
          doctorId: 1,
          doctorName: "Dr. Azizbek Rahimov",
          specialty: "Kardiolog",
          clinic: "Chirchiq Markaziy Poliklinikasi",
          room: "204-xona",
          date: today,
          time: "09:00",
          price: "Bepul / 45 000 so'm",
          status: "Tasdiqlandi",
          createdAt: getTashkentNow()
        },
        {
          id: 102,
          ticketNo: "K-012",
          patientName: "Saida Nazarova",
          phone: "+998 93 456 78 90",
          email: "saida.nazarova@mail.uz",
          doctorId: 1,
          doctorName: "Dr. Azizbek Rahimov",
          specialty: "Kardiolog",
          clinic: "Chirchiq Markaziy Poliklinikasi",
          room: "204-xona",
          date: today,
          time: "09:30",
          price: "Bepul / 45 000 so'm",
          status: "Kutilmoqda",
          createdAt: getTashkentNow()
        }
      ],
      messages: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Frontendga shifokorlar ro'yxatini uzatishda pinHash va loginni olib tashlash (Maxfiy kalitlar himoyasi)
function getPublicDoctors(doctors = [], appointments = []) {
  const today = getTashkentDateISO();
  return doctors.map(({ pinHash, login, ...publicDoc }) => {
    const activeBookedTimes = appointments
      .filter(a => Number(a.doctorId) === Number(publicDoc.id) && a.status !== 'Bekor qilindi' && (!a.date || a.date === today))
      .map(a => a.time);
    return {
      ...publicDoc,
      bookedSlots: Array.from(new Set(activeBookedTimes))
    };
  });
}

// Sessiya tokenlari (Server xotirasida)
const activeAdminTokens = new Set();
const activeDoctorTokens = new Map(); // token -> doctorId

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || !activeAdminTokens.has(token)) {
    return res.status(403).json({ error: "Ruxsat rad etildi! Faqat Admin kira oladi." });
  }
  next();
}

function requireDoctorOrAdmin(req, res, next) {
  const adminToken = req.headers['x-admin-token'];
  const docToken = req.headers['x-doctor-token'];
  if ((adminToken && activeAdminTokens.has(adminToken)) || (docToken && activeDoctorTokens.has(docToken))) {
    return next();
  }
  return res.status(403).json({ error: "Avtorizatsiya talab qilinadi!" });
}

// Validatsiya yordamchi funksiyalar
function isValidPhone(phone) {
  return /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(String(phone).trim());
}

function isValidEmail(email) {
  if (!email) return true; // ixtiyoriy
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

// 1. Ommaviy ma'lumotlarni olish (Parol va xeshlar frontendga yuborilmaydi)
app.get('/api/data', (req, res) => {
  const db = readDB();
  res.json({
    serverTime: getTashkentNow(),
    todayISO: getTashkentDateISO(),
    doctors: getPublicDoctors(db.doctors, db.appointments),
    appointments: db.appointments || [],
    messages: db.messages || []
  });
});

// 2. Foydalanuvchini ro'yxatdan o'tkazish
app.post('/api/register', (req, res) => {
  const name = sanitize(req.body.name);
  const phone = sanitize(req.body.phone);
  const email = sanitize(req.body.email);

  if (name.length < 3) {
    return res.status(400).json({ error: "Ism-sharif kamida 3 ta harfdan iborat bo'lishi shart!" });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: "Telefon raqamni +998 XX XXX XX XX formatida to'liq kiriting!" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email manzili noto'g'ri formatda!" });
  }

  const db = readDB();
  let user = db.users.find(u => u.phone === phone);

  if (!user) {
    user = {
      id: Date.now(),
      name,
      phone,
      email,
      registeredAt: getTashkentNow()
    };
    db.users.unshift(user);
    writeDB(db);
  } else if (email && !user.email) {
    user.email = email;
    writeDB(db);
  }

  res.status(201).json({ success: true, user });
});

// 3. Qabulga yozilish (Dublikat tekshiruvi + Validatsiya + Asia/Tashkent vaqti)
app.post('/api/appointments', (req, res) => {
  const patientName = sanitize(req.body.patientName);
  const phone = sanitize(req.body.phone);
  const email = sanitize(req.body.email);
  const doctorId = Number(req.body.doctorId);
  const date = sanitize(req.body.date) || getTashkentDateISO();
  const time = sanitize(req.body.time);

  if (patientName.length < 3) {
    return res.status(400).json({ error: "Bemor ism-sharifi kamida 3 ta harfdan iborat bo'lishi kerak!" });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: "Telefon raqamni to'liq kiriting (+998 XX XXX XX XX)!" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email manzili noto'g'ri!" });
  }
  if (!doctorId || !time) {
    return res.status(400).json({ error: "Shifokor va qabul vaqtini tanlang!" });
  }

  const db = readDB();
  const doc = db.doctors.find(d => Number(d.id) === doctorId);
  if (!doc) {
    return res.status(404).json({ error: "Shifokor topilmadi!" });
  }

  // 4-BOSQICH TALABI: Bir shifokorning bir vaqtga ikkita qabulini yozib qo'yishning oldini olish
  const isSlotTaken = db.appointments.some(
    a => Number(a.doctorId) === doctorId &&
         a.date === date &&
         a.time === time &&
         a.status !== 'Bekor qilindi'
  );

  if (isSlotTaken) {
    return res.status(409).json({
      error: `Kechirasiz, ${doc.name} uchun ${date} kuni soat ${time} band qilingan! Boshqa vaqtni tanlang.`
    });
  }

  // Foydalanuvchini users jadvalida ham ro'yxatdan o'tkazish
  let user = db.users.find(u => u.phone === phone);
  if (!user) {
    user = {
      id: Date.now() - 1,
      name: patientName,
      phone,
      email,
      registeredAt: getTashkentNow()
    };
    db.users.unshift(user);
  }

  const randomNum = Math.floor(10 + Math.random() * 89);
  const ticketNo = `${doc.prefix}-0${randomNum}`;

  const newAppointment = {
    id: Date.now(),
    ticketNo,
    patientName,
    phone,
    email,
    doctorId: doc.id,
    doctorName: doc.name,
    specialty: doc.specialty,
    clinic: doc.clinic,
    room: doc.room,
    date,
    time,
    price: doc.price,
    status: "Kutilmoqda",
    createdAt: getTashkentNow()
  };

  db.appointments.push(newAppointment);
  writeDB(db);

  res.status(201).json({
    success: true,
    appointment: newAppointment,
    doctors: getPublicDoctors(db.doctors, db.appointments)
  });
});

// 4. Bemor o'z talonini bekor qilishi
app.post('/api/appointments/:id/cancel', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const item = db.appointments.find(a => String(a.id) === String(id));
  if (!item) {
    return res.status(404).json({ error: "Talon topilmadi!" });
  }
  item.status = "Bekor qilindi";
  writeDB(db);
  res.json({
    success: true,
    appointment: item,
    doctors: getPublicDoctors(db.doctors, db.appointments)
  });
});

// 5. Shifokor Login (Parol xesh orqali serverda tekshiriladi)
app.post('/api/doctor/login', (req, res) => {
  const login = sanitize(req.body.login).toLowerCase();
  const pin = String(req.body.pin || '').trim();

  const db = readDB();
  const doc = db.doctors.find(d => d.login.toLowerCase() === login);
  if (!doc || !verifyPassword(pin, doc.pinHash)) {
    return res.status(401).json({ error: "Shifokor logini yoki PIN-kodi noto'g'ri!" });
  }

  const token = crypto.randomBytes(24).toString('hex');
  activeDoctorTokens.set(token, doc.id);

  const { pinHash, ...safeDoc } = doc;
  res.json({ success: true, token, doctor: safeDoc });
});

// 6. Shifokor yoki Admin keyingi bemorni xonaga chaqirishi
app.post('/api/doctor/:doctorId/call-next', requireDoctorOrAdmin, (req, res) => {
  const doctorId = Number(req.params.doctorId);
  const db = readDB();
  const doc = db.doctors.find(d => Number(d.id) === doctorId);
  if (!doc) return res.status(404).json({ error: "Shifokor topilmadi!" });

  // Avvalgi "Tasdiqlandi" (xonadagi) bemorni "Yakunlandi" qilish
  db.appointments.forEach(a => {
    if (Number(a.doctorId) === doctorId && a.status === 'Tasdiqlandi') {
      a.status = 'Yakunlandi';
    }
  });

  // Navbatdagi "Kutilmoqda" turgan birinchi bemorni "Tasdiqlandi" qilish
  const nextPatient = db.appointments.find(
    a => Number(a.doctorId) === doctorId && a.status === 'Kutilmoqda'
  );

  if (nextPatient) {
    nextPatient.status = 'Tasdiqlandi';
  }

  writeDB(db);
  res.json({
    success: true,
    calledTicket: nextPatient || null,
    appointments: db.appointments
  });
});

// 7. Admin Login (Xeshlangan parol tekshiruvi)
app.post('/api/admin/login', (req, res) => {
  const login = sanitize(req.body.login).toLowerCase();
  const pin = String(req.body.pin || '').trim();

  const db = readDB();
  if (login === db.adminAuth.login && verifyPassword(pin, db.adminAuth.passwordHash)) {
    const token = crypto.randomBytes(24).toString('hex');
    activeAdminTokens.add(token);
    return res.json({ success: true, token });
  }
  res.status(401).json({ error: "Admin logini yoki paroli noto'g'ri!" });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const token = req.headers['x-admin-token'];
  activeAdminTokens.delete(token);
  res.json({ success: true });
});

// 8. Admin ma'lumotlari (Server tomonidan himoyalangan)
app.get('/api/admin/overview', requireAdmin, (req, res) => {
  const db = readDB();
  res.json({
    users: db.users || [],
    appointments: db.appointments || [],
    messages: db.messages || [],
    doctors: db.doctors.map(({ pinHash, ...d }) => d)
  });
});

// 9. Admin: Qabul statusini o'zgartirish (4 xil status)
app.patch('/api/admin/appointments/:id/status', requireAdmin, (req, res) => {
  const { id } = req.params;
  const status = sanitize(req.body.status);
  const allowedStatuses = ["Kutilmoqda", "Tasdiqlandi", "Bekor qilindi", "Yakunlandi"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Noto'g'ri status!" });
  }

  const db = readDB();
  const item = db.appointments.find(a => String(a.id) === String(id));
  if (!item) return res.status(404).json({ error: "Qabul topilmadi!" });

  item.status = status;
  writeDB(db);
  res.json({
    success: true,
    appointment: item,
    doctors: getPublicDoctors(db.doctors, db.appointments)
  });
});

// 10. Admin: Mijozga xabar yuborish
app.post('/api/admin/messages', requireAdmin, (req, res) => {
  const phone = sanitize(req.body.phone);
  const patientName = sanitize(req.body.patientName) || "Mijoz";
  const text = sanitize(req.body.text);

  if (!phone || text.length < 2) {
    return res.status(400).json({ error: "Telefon raqam va xabar matni majburiy!" });
  }

  const db = readDB();
  if (!db.messages) db.messages = [];

  const newMsg = {
    id: Date.now(),
    phone,
    patientName,
    text,
    sentAt: getTashkentNow()
  };

  db.messages.unshift(newMsg);
  writeDB(db);
  res.status(201).json({ success: true, message: newMsg });
});

// 11. Admin: Yangi shifokor qo'shish (Paroli xeshlanib saqlanadi)
app.post('/api/admin/doctors', requireAdmin, (req, res) => {
  const name = sanitize(req.body.name);
  const specialty = sanitize(req.body.specialty);
  const room = sanitize(req.body.room);
  const region = sanitize(req.body.region);
  const district = sanitize(req.body.district) || "Markaziy sh.";
  const clinic = sanitize(req.body.clinic);
  const login = sanitize(req.body.login).toLowerCase();
  const pin = String(req.body.pin || '').trim();

  if (!name || !specialty || !clinic || !login || pin.length < 4) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring (PIN kamida 4 belgi)!" });
  }

  const db = readDB();
  if (db.doctors.some(d => d.login.toLowerCase() === login)) {
    return res.status(409).json({ error: "Bu login band! Boshqa login tanlang." });
  }

  const newDoc = {
    id: Date.now(),
    name,
    specialty,
    region,
    district,
    clinic,
    clinicType: "Davlat",
    room,
    experience: "8 yil",
    rating: 5.0,
    price: "45 000 so'm",
    prefix: specialty.slice(0, 1).toUpperCase(),
    login,
    pinHash: hashPassword(pin),
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80",
    bookedSlots: []
  };

  db.doctors.unshift(newDoc);
  writeDB(db);
  res.status(201).json({
    success: true,
    doctors: getPublicDoctors(db.doctors, db.appointments)
  });
});

// 12. Admin: Shifokorni o'chirish
app.delete('/api/admin/doctors/:id', requireAdmin, (req, res) => {
  const docId = Number(req.params.id);
  const db = readDB();
  if (db.doctors.length <= 1) {
    return res.status(400).json({ error: "Tizimda kamida 1 ta shifokor qolishi kerak!" });
  }
  db.doctors = db.doctors.filter(d => Number(d.id) !== docId);
  db.appointments = db.appointments.filter(a => Number(a.doctorId) !== docId);
  writeDB(db);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  initDB();
  console.log(`✅ MedQueue Server (Asia/Tashkent) ishga tushdi: http://localhost:${PORT}`);
});
