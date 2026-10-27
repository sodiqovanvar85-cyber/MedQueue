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
    const res = await fetch('/api/data');
    if (!res.ok) return;
    const data = await res.json();
    if (data.doctors) doctors = data.doctors;
    if (data.appointments) queue = data.appointments;
    if (data.messages) messagesList = data.messages;
    saveLocalCache();
    renderDoctors();
    renderTablo();
    renderMyTickets();
  } catch (err) {
    console.warn("Server bilan aloqa yo'q, lokal kesh ishlatilmoqda.");
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
  const doc = doctors.find(d => d.id === docId);
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
  const doc = doctors.find(d => d.id === activeBookingDocId);
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
  if (!digits.startsWith('998')) digits = '998' + digits;
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

  if (!selectedSlotTime) {
    errEl.textContent = "Iltimos, bo'sh soatlardan birini tanlang!";
    errEl.classList.remove('hidden');
    return;
  }
  if (name.length < 3) {
    errEl.textContent = "Ism-sharifingiz kamida 3 ta harfdan iborat bo'lishi kerak!";
    errEl.classList.remove('hidden');
    return;
  }
  if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone)) {
    errEl.textContent = "Telefon raqamingizni to'liq kiriting (+998 XX XXX XX XX)!";
    errEl.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: name,
        phone,
        email,
        doctorId: activeBookingDocId,
        date,
        time: selectedSlotTime
      })
    });

    const result = await res.json();
    if (!res.ok) {
      errEl.textContent = result.error || "Qabulga yozilishda xatolik!";
      errEl.classList.remove('hidden');
      await loadFromServerDB();
      renderModalSlots();
      return;
    }

    if (result.doctors) doctors = result.doctors;
    queue.push(result.appointment);
    myTicketIds.unshift(result.appointment.id);
    saveLocalCache();

    closeBookingModal();
    document.getElementById('patient-name-input').value = '';
    if (document.getElementById('patient-email-input')) document.getElementById('patient-email-input').value = '';
    renderDoctors();
    showToast(`✅ Bazaga saqlandi! Talon: ${result.appointment.ticketNo} (${date}, ${selectedSlotTime})`);
    switchTab('tickets');
  } catch (err) {
    errEl.textContent = "Server bilan bog'lanishda xatolik yuz berdi!";
    errEl.classList.remove('hidden');
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
    const res = await fetch(`/api/appointments/${id}/cancel`, { method: 'POST' });
    if (res.ok) {
      await loadFromServerDB();
      showToast("Talon bekor qilindi va shifokor vaqti bo'shatildi!");
    }
  } catch (err) {
    showToast("Bekor qilishda xatolik!");
  }
}

// SHIFOKOR PANELI (Server orqali tekshiriladi)
async function handleDoctorOnlyLogin(e) {
  e.preventDefault();
  const login = document.getElementById('doc-login-input').value.trim().toLowerCase();
  const pin = document.getElementById('doc-pin-input').value.trim();
  const err = document.getElementById('doc-auth-error');

  try {
    const res = await fetch('/api/doctor/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pin })
    });
    const data = await res.json();
    if (!res.ok) {
      err.textContent = data.error || "Login yoki PIN-kod xato!";
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
  } catch (error) {
    err.textContent = "Server bilan aloqa xatosi!";
    err.classList.remove('hidden');
  }
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

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pin })
    });
    const data = await res.json();

    if (!res.ok) {
      err.textContent = data.error || "Login yoki parol xato!";
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
  } catch (error) {
    err.textContent = "Server bilan bog'lanishda xatolik!";
    err.classList.remove('hidden');
  }
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
    const res = await fetch('/api/admin/overview', {
      headers: { 'x-admin-token': adminToken }
    });
    if (res.status === 403) {
      adminToken = '';
      isAdminLoggedIn = false;
      sessionStorage.removeItem('medqueue_admin_token');
      renderAdminPanel();
      return;
    }
    const data = await res.json();
    adminUsersList = data.users || [];
    queue = data.appointments || [];
    messagesList = data.messages || [];
    isAdminLoggedIn = true;
    renderAdminPanel();
  } catch (err) {
    console.error(err);
  }
}

async function updateAppointmentStatus(id, newStatus) {
  try {
    const res = await fetch(`/api/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken
      },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      await loadFromServerDB();
      await fetchAdminOverview();
      showToast(`✅ Qabul holati "${newStatus}" deb o'zgartirildi!`);
    }
  } catch (err) {
    showToast("Statusni o'zgartirishda xatolik!");
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
    const res = await fetch('/api/admin/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken
      },
      body: JSON.stringify({
        patientName: activeMsgTarget.name,
        phone: activeMsgTarget.phone,
        text
      })
    });
    if (res.ok) {
      closeMessageModal();
      await loadFromServerDB();
      await fetchAdminOverview();
      showToast(`📩 Xabar ${activeMsgTarget.name} (${activeMsgTarget.phone}) ga yuborildi!`);
    }
  } catch (err) {
    showToast("Xabar yuborishda xatolik!");
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
    const headers = { 'Content-Type': 'application/json' };
    if (adminToken) headers['x-admin-token'] = adminToken;
    if (doctorToken) headers['x-doctor-token'] = doctorToken;

    const res = await fetch(`/api/doctor/${docId}/call-next`, {
      method: 'POST',
      headers
    });
    const data = await res.json();
    if (res.ok) {
      await loadFromServerDB();
      if (isAdminLoggedIn) await fetchAdminOverview();
      renderDoctorPanel();
      renderTablo();
      if (data.calledTicket) {
        showToast(`📢 ${data.calledTicket.ticketNo} (${data.calledTicket.patientName}) xonaga chaqirildi!`);
      } else {
        showToast("Kutayotgan bemorlar qolmadi.");
      }
    }
  } catch (err) {
    showToast("Chaqirishda xatolik!");
  }
}

async function deleteDoctor(docId) {
  try {
    const res = await fetch(`/api/admin/doctors/${docId}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': adminToken }
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "O'chirishda xatolik!");
      return;
    }
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast("🗑️ Shifokor bazadan o'chirildi.");
  } catch (err) {
    showToast("Server xatosi!");
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
    const res = await fetch('/api/admin/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Shifokor qo'shishda xatolik!");
      return;
    }
    closeAddDoctorModal();
    document.getElementById('new-doc-name').value = '';
    document.getElementById('new-doc-clinic').value = '';
    document.getElementById('new-doc-login').value = '';
    document.getElementById('new-doc-pin').value = '';
    await loadFromServerDB();
    await fetchAdminOverview();
    showToast(`✅ ${payload.name} xeshlangan parol bilan bazaga saqlandi!`);
  } catch (err) {
    showToast("Server xatosi!");
  }
}
