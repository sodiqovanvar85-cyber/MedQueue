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
  MY_TICKETS: 'doctime_db_mytickets_v1'
};

let doctors = JSON.parse(localStorage.getItem(DB_KEYS.DOCTORS)) || DEFAULT_DOCTORS;
let queue = JSON.parse(localStorage.getItem(DB_KEYS.QUEUE)) || DEFAULT_QUEUE;
let myTicketIds = JSON.parse(localStorage.getItem(DB_KEYS.MY_TICKETS)) || [102];

function saveDatabase() {
  localStorage.setItem(DB_KEYS.DOCTORS, JSON.stringify(doctors));
  localStorage.setItem(DB_KEYS.QUEUE, JSON.stringify(queue));
  localStorage.setItem(DB_KEYS.MY_TICKETS, JSON.stringify(myTicketIds));
  const badge = document.getElementById('my-ticket-badge');
  if (badge) badge.textContent = myTicketIds.length;
}

function resetDatabase() {
  if (!confirm("Barcha ma'lumotlarni boshlang'ich holatiga qaytarishni xohlaysizmi?")) return;
  localStorage.removeItem(DB_KEYS.DOCTORS);
  localStorage.removeItem(DB_KEYS.QUEUE);
  localStorage.removeItem(DB_KEYS.MY_TICKETS);
  doctors = JSON.parse(JSON.stringify(DEFAULT_DOCTORS));
  queue = JSON.parse(JSON.stringify(DEFAULT_QUEUE));
  myTicketIds = [102];
  saveDatabase();
  renderDoctors();
  renderAdminPanel();
  renderTablo();
  renderMyTickets();
  showToast("🔄 Baza boshlang'ich holatiga qaytarildi!");
}

let selectedSpecialty = 'all';
let activeBookingDocId = null;
let selectedSlotTime = '';
let loggedInDoctor = null;
let isAdminLoggedIn = false;

window.addEventListener('DOMContentLoaded', () => {
  saveDatabase();
  initRegions();
  renderSpecialtyPills();
  renderDoctors();
  renderTablo();
  renderMyTickets();
  updateClock();
  setInterval(updateClock, 1000);
  lucide.createIcons();
});

function updateClock() {
  const now = new Date();
  document.getElementById('live-clock').textContent = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
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
  if (tabName === 'admin') renderAdminPanel();
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
    const freeSlots = ALL_TIME_SLOTS.filter(s => !doc.bookedSlots.includes(s));
    const slotsHtml = ALL_TIME_SLOTS.map(slot => {
      const isBooked = doc.bookedSlots.includes(slot);
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
  const doc = doctors.find(d => d.id === docId);
  const free = ALL_TIME_SLOTS.filter(s => !doc.bookedSlots.includes(s));
  selectedSlotTime = defaultSlot || free[0] || '';

  document.getElementById('modal-doc-name').textContent = `${doc.name} (${doc.specialty})`;
  document.getElementById('modal-doc-clinic').textContent = `${doc.clinic} • ${doc.room}`;
  document.getElementById('booking-error').classList.add('hidden');

  renderModalSlots();
  const modal = document.getElementById('booking-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function renderModalSlots() {
  const doc = doctors.find(d => d.id === activeBookingDocId);
  const container = document.getElementById('modal-slots-grid');

  container.innerHTML = ALL_TIME_SLOTS.map(slot => {
    const isBooked = doc.bookedSlots.includes(slot);
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
  const name = document.getElementById('patient-name-input').value.trim();
  const phone = document.getElementById('patient-phone-input').value.trim();
  const errEl = document.getElementById('booking-error');

  if (!selectedSlotTime) {
    errEl.textContent = "Iltimos, bo'sh soatlardan birini tanlang!";
    errEl.classList.remove('hidden');
    return;
  }

  const doc = doctors.find(d => d.id === activeBookingDocId);
  doc.bookedSlots.push(selectedSlotTime);

  const ticketNo = `${doc.prefix}-0${Math.floor(15 + Math.random() * 80)}`;
  const newTicket = {
    id: Date.now(),
    ticketNo,
    patientName: name,
    phone,
    doctorId: doc.id,
    doctorName: doc.name,
    specialty: doc.specialty,
    clinic: doc.clinic,
    room: doc.room,
    time: selectedSlotTime,
    status: 'waiting'
  };

  queue.push(newTicket);
  myTicketIds.unshift(newTicket.id);
  saveDatabase();

  closeBookingModal();
  document.getElementById('patient-name-input').value = '';
  renderDoctors();
  showToast(`✅ Navbat olindi! Talon: ${ticketNo} (${selectedSlotTime})`);
  switchTab('tickets');
}

function renderTablo() {
  const inProg = queue.filter(q => q.status === 'in_progress');
  const waiting = queue.filter(q => q.status === 'waiting');

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
          <p class="text-[11px] text-emerald-300 mt-1">Kirishingiz mumkin</p>
        </div>
      </div>
    `).join('');

  document.getElementById('tablo-waiting').innerHTML = waiting.length === 0
    ? '<p class="text-slate-400 text-xs">Kutayotgan bemorlar yo\'q</p>'
    : waiting.map(item => `
      <div class="flex items-center justify-between bg-slate-900/90 border border-slate-700 p-3.5 rounded-2xl">
        <div>
          <span class="text-xl font-extrabold text-amber-400">${item.ticketNo}</span>
          <p class="text-xs text-slate-400">${item.patientName} (Soat ${item.time})</p>
        </div>
        <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl">${item.room}</span>
      </div>
    `).join('');
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
    return;
  }

  container.innerHTML = myList.map(t => `
    <div class="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-black text-teal-700">${t.ticketNo}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Soat ${t.time} da</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${t.status === 'in_progress' ? 'bg-emerald-600 text-white' : 'bg-white text-teal-700 border border-teal-200'}">
            ${t.status === 'in_progress' ? 'Xonaga kiring!' : 'Navbat kutmoqda'}
          </span>
        </div>
        <p class="text-sm font-bold text-slate-900">${t.doctorName} (${t.specialty})</p>
        <p class="text-xs text-slate-600">🏥 ${t.clinic} • <strong>${t.room}</strong></p>
        <p class="text-xs text-slate-500">👤 Bemor: ${t.patientName} (${t.phone})</p>
      </div>
      <button onclick="cancelTicket(${t.id})" class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 self-start sm:self-center">
        Navbatni bekor qilish
      </button>
    </div>
  `).join('');
}

function cancelTicket(id) {
  const t = queue.find(item => item.id === id);
  if (t) {
    const doc = doctors.find(d => d.id === t.doctorId);
    if (doc) doc.bookedSlots = doc.bookedSlots.filter(s => s !== t.time);
  }
  queue = queue.filter(item => item.id !== id);
  myTicketIds = myTicketIds.filter(itemId => itemId !== id);
  saveDatabase();

  renderMyTickets();
  renderDoctors();
  renderAdminPanel();
  renderDoctorPanel();
  renderTablo();
  showToast("Talon bekor qilindi va shifokor vaqti bo'shatildi!");
}

function quickFillDoc(login, pin) {
  document.getElementById('doc-login-input').value = login;
  document.getElementById('doc-pin-input').value = pin;
  document.getElementById('doc-auth-error').classList.add('hidden');
}

function handleDoctorOnlyLogin(e) {
  e.preventDefault();
  const login = document.getElementById('doc-login-input').value.trim().toLowerCase();
  const pin = document.getElementById('doc-pin-input').value.trim();
  const doc = doctors.find(d => d.login.toLowerCase() === login && d.pin === pin);

  if (!doc) {
    const err = document.getElementById('doc-auth-error');
    err.textContent = "Shifokor logini yoki PIN-kodi xato!";
    err.classList.remove('hidden');
    return;
  }

  loggedInDoctor = doc;
  document.getElementById('doc-auth-error').classList.add('hidden');
  renderDoctorPanel();
  showToast(`👨‍⚕️ Xush kelibsiz, ${doc.name}!`);
}

function logoutDoctor() {
  loggedInDoctor = null;
  renderDoctorPanel();
  showToast("Shifokor kabinetidan chiqildi");
}

function renderDoctorPanel() {
  const loginBox = document.getElementById('doctor-login-box');
  const dashBox = document.getElementById('doctor-dashboard-box');
  if (!loginBox || !dashBox) return;

  if (!loggedInDoctor) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }

  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');

  document.getElementById('dash-doc-name').textContent = loggedInDoctor.name;
  document.getElementById('dash-doc-info').textContent = `${loggedInDoctor.specialty} • ${loggedInDoctor.clinic} (${loggedInDoctor.room})`;

  const docQueue = queue.filter(q => q.doctorId === loggedInDoctor.id && q.status !== 'completed');
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
        <div class="p-4 rounded-2xl border flex items-center justify-between ${item.status === 'in_progress' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}">
          <div>
            <span class="text-lg font-black text-teal-800">${item.ticketNo}</span>
            <span class="ml-2 text-sm font-bold text-slate-800">${item.patientName}</span>
            <p class="text-xs text-slate-500">Soat: ${item.time} • Tel: ${item.phone}</p>
          </div>
          <span class="px-3 py-1 rounded-lg text-xs font-bold ${item.status === 'in_progress' ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800'}">
            ${item.status === 'in_progress' ? 'Xonada (Qabulda)' : 'Kutmoqda'}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

function quickFillAdmin(login, pin) {
  document.getElementById('admin-login-input').value = login;
  document.getElementById('admin-pin-input').value = pin;
  document.getElementById('admin-auth-error').classList.add('hidden');
}

function handleAdminLogin(e) {
  e.preventDefault();
  const login = document.getElementById('admin-login-input').value.trim().toLowerCase();
  const pin = document.getElementById('admin-pin-input').value.trim();

  if (login === 'admin' && pin === '7777') {
    isAdminLoggedIn = true;
    document.getElementById('admin-auth-error').classList.add('hidden');
    renderAdminPanel();
    showToast("👑 Bosh Admin paneliga xush kelibsiz!");
  } else {
    const err = document.getElementById('admin-auth-error');
    err.textContent = "Admin logini yoki paroli noto'g'ri! (admin / 7777)";
    err.classList.remove('hidden');
  }
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  renderAdminPanel();
  showToast("Admin paneldan chiqildi");
}

function renderAdminPanel() {
  const loginBox = document.getElementById('admin-login-box');
  const dashBox = document.getElementById('admin-dashboard-box');
  if (!loginBox || !dashBox) return;

  if (!isAdminLoggedIn) {
    loginBox.classList.remove('hidden');
    dashBox.classList.add('hidden');
    return;
  }

  loginBox.classList.add('hidden');
  dashBox.classList.remove('hidden');

  const waitingCount = queue.filter(q => q.status === 'waiting').length;
  const inProgCount = queue.filter(q => q.status === 'in_progress').length;
  const completedCount = queue.filter(q => q.status === 'completed').length;

  document.getElementById('admin-stats-grid').innerHTML = `
    <div class="p-5 rounded-2xl bg-white border border-teal-100 shadow-xs">
      <div class="text-[11px] font-extrabold uppercase text-slate-400">Bazadagi Shifokorlar</div>
      <div class="text-3xl font-black text-slate-900 mt-1">${doctors.length} ta</div>
      <div class="text-xs text-teal-600 font-semibold mt-0.5">LocalStorage DB faol</div>
    </div>
    <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
      <div class="text-[11px] font-extrabold uppercase text-amber-700">Hozir kutmoqda</div>
      <div class="text-3xl font-black text-slate-900 mt-1">${waitingCount}</div>
      <div class="text-xs text-slate-500 mt-0.5">Koridordagi bemorlar</div>
    </div>
    <div class="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
      <div class="text-[11px] font-extrabold uppercase text-emerald-700">Hozir qabulda</div>
      <div class="text-3xl font-black text-emerald-700 mt-1">${inProgCount}</div>
      <div class="text-xs text-slate-500 mt-0.5">Shifokor xonasida</div>
    </div>
    <div class="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col justify-between">
      <div>
        <div class="text-[11px] font-extrabold uppercase text-teal-700">Yakunlangan: ${completedCount} ta</div>
      </div>
      <button onclick="resetDatabase()" class="mt-2 py-2 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold transition-all">
        🔄 Bazani boshlang'ich holatga qaytarish
      </button>
    </div>
  `;

  document.getElementById('admin-rooms-grid').innerHTML = doctors.map(doc => {
    const currentInRoom = queue.find(q => q.doctorId === doc.id && q.status === 'in_progress');
    const waitingList = queue.filter(q => q.doctorId === doc.id && q.status === 'waiting');
    return `
      <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-teal-700 mb-1">
            <span>${doc.specialty} (${doc.room})</span>
            <span class="text-[11px] font-mono text-slate-500">Login: ${doc.login} | PIN: ${doc.pin}</span>
          </div>
          <h4 class="font-extrabold text-slate-900 text-base">${doc.name}</h4>
          <p class="text-[11px] text-slate-500 mb-3 truncate">${doc.region} • ${doc.clinic}</p>
          <div class="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 mb-3">
            <div>Xonada: <strong class="text-emerald-700">${currentInRoom ? `${currentInRoom.ticketNo} (${currentInRoom.patientName})` : "Bo'sh"}</strong></div>
            <div>Navbatda: <strong class="text-amber-700">${waitingList.length} kishi</strong></div>
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

  const activeTickets = queue.filter(q => q.status !== 'completed');
  document.getElementById('admin-all-tickets').innerHTML = activeTickets.length === 0
    ? '<p class="text-sm text-slate-500">Hozircha faol talonlar yo\'q.</p>'
    : activeTickets.map(t => `
      <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span class="text-base font-black text-teal-700">${t.ticketNo}</span>
          <span class="ml-2 text-sm font-bold text-slate-900">${t.patientName}</span>
          <span class="ml-2 text-xs text-slate-500">(${t.phone})</span>
          <p class="text-xs text-slate-600 mt-0.5">${t.doctorName} • <strong>${t.room}</strong> • Soat: <strong>${t.time}</strong></p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${t.status === 'in_progress' ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800'}">
            ${t.status === 'in_progress' ? 'Xonada' : 'Kutmoqda'}
          </span>
          <button onclick="cancelTicket(${t.id})" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200">
            Bekor qilish
          </button>
        </div>
      </div>
    `).join('');
}

function callNextPatient(docId) {
  const doc = doctors.find(d => d.id === docId);
  queue.forEach(q => {
    if (q.doctorId === docId && q.status === 'in_progress') q.status = 'completed';
  });
  const next = queue.find(q => q.doctorId === docId && q.status === 'waiting');
  if (next) {
    next.status = 'in_progress';
    showToast(`📢 ${next.ticketNo} (${next.patientName}) — ${doc.room}ga chaqirildi!`);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(`Talon raqami ${next.ticketNo}. ${doc.room}ga kiring.`);
      u.lang = 'uz-UZ';
      window.speechSynthesis.speak(u);
    }
  } else {
    showToast(`${doc.name} xonasida kutayotgan bemorlar qolmadi.`);
  }
  saveDatabase();
  renderDoctorPanel();
  renderAdminPanel();
  renderTablo();
}

function deleteDoctor(docId) {
  if (doctors.length <= 1) {
    showToast("Tizimda kamida 1 ta shifokor qolishi kerak!");
    return;
  }
  const doc = doctors.find(d => d.id === docId);
  doctors = doctors.filter(d => d.id !== docId);
  queue = queue.filter(q => q.doctorId !== docId);
  saveDatabase();
  renderDoctors();
  renderAdminPanel();
  showToast(`🗑️ ${doc.name} bazadan o'chirildi.`);
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

function submitNewDoctor(e) {
  e.preventDefault();
  const name = document.getElementById('new-doc-name').value.trim();
  const spec = document.getElementById('new-doc-spec').value;
  const room = document.getElementById('new-doc-room').value.trim();
  const region = document.getElementById('new-doc-region').value;
  const clinic = document.getElementById('new-doc-clinic').value.trim();
  const login = document.getElementById('new-doc-login').value.trim().toLowerCase();
  const pin = document.getElementById('new-doc-pin').value.trim();

  const districts = REGIONS_DATA[region] || ["Markaziy sh."];
  const newDoc = {
    id: Date.now(),
    name,
    specialty: spec,
    region,
    district: districts[0],
    clinic,
    clinicType: "Davlat",
    room,
    experience: "8 yil",
    rating: 5.0,
    price: "45 000 so'm",
    prefix: spec.slice(0, 1).toUpperCase(),
    login,
    pin,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80",
    bookedSlots: []
  };

  doctors.unshift(newDoc);
  saveDatabase();
  closeAddDoctorModal();
  document.getElementById('new-doc-name').value = '';
  document.getElementById('new-doc-clinic').value = '';
  document.getElementById('new-doc-login').value = '';
  renderDoctors();
  renderAdminPanel();
  showToast(`✅ ${newDoc.name} bazaga saqlandi!`);
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

function submitWalkInTicket(e) {
  e.preventDefault();
  const docId = Number(document.getElementById('walkin-doc-select').value);
  const name = document.getElementById('walkin-patient-name').value.trim();
  const phone = document.getElementById('walkin-patient-phone').value.trim();

  const doc = doctors.find(d => d.id === docId);
  const freeSlots = ALL_TIME_SLOTS.filter(s => !doc.bookedSlots.includes(s));
  const assignedTime = freeSlots[0] || "16:00 (Qo'shimcha)";
  if (freeSlots[0]) doc.bookedSlots.push(freeSlots[0]);

  const ticketNo = `${doc.prefix}-0${Math.floor(15 + Math.random() * 80)}`;
  const newTicket = {
    id: Date.now(),
    ticketNo,
    patientName: name,
    phone,
    doctorId: doc.id,
    doctorName: doc.name,
    specialty: doc.specialty,
    clinic: doc.clinic,
    room: doc.room,
    time: assignedTime,
    status: 'waiting'
  };

  queue.push(newTicket);
  myTicketIds.unshift(newTicket.id);
  saveDatabase();

  closeWalkInModal();
  document.getElementById('walkin-patient-name').value = '';
  renderDoctors();
  renderAdminPanel();
  renderTablo();
  showToast(`🎟️ Registratura taloni bazaga saqlandi: ${ticketNo}`);
}