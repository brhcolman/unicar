/* ==========================================
   UNICAR STATE MANAGEMENT & LOGIC
   ========================================== */

// Coordinate dictionary for Unicar Landmarks around Campinas (Leaflet.js)
const COORDINATES = {
  "unicamp": [-22.8184, -47.0647],
  "centro": [-22.9064, -47.0616],
  "centro de campinas": [-22.9064, -47.0616],
  "shopping dom pedro": [-22.8491, -47.0632],
  "barão geraldo": [-22.8271, -47.0812],
  "default": [-22.8184, -47.0647]
};

// Initial Seed Data for Mock DB
const DEFAULT_USERS = {
  "lucas.silva@unicamp.br": {
    name: "Lucas Silva",
    email: "lucas.silva@unicamp.br",
    enrollment: "235123",
    course: "Engenharia da Computação",
    period: "Integral",
    university: "Unicamp",
    gender: "Homem",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop",
    carModel: "Toyota Corolla 2018",
    carPlate: "ABC-3D45",
    ridesCount: 37,
    memberSince: "jan. 2024",
    rating: 4.8,
    ratingsCount: 15
  },
  "thiago.santos@unicamp.br": {
    name: "Thiago Santos",
    email: "thiago.santos@unicamp.br",
    enrollment: "224512",
    course: "Educação Física",
    period: "Noturno",
    university: "Unicamp",
    gender: "Homem",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop",
    carModel: "Toyota Corolla 2018",
    carPlate: "MNO-9F22",
    ridesCount: 22,
    memberSince: "mar. 2024",
    rating: 4.9,
    ratingsCount: 11
  },
  "vanessa.lima@unicamp.br": {
    name: "Vanessa Lima",
    email: "vanessa.lima@unicamp.br",
    enrollment: "241154",
    course: "Administração",
    period: "Matutino",
    university: "Unicamp",
    gender: "Mulher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    carModel: "Ford Fiesta 2020",
    carPlate: "XYZ-7E89",
    ridesCount: 14,
    memberSince: "ago. 2024",
    rating: 4.8,
    ratingsCount: 8
  },
  "gabriel.oliveira@unicamp.br": {
    name: "Gabriel Oliveira",
    email: "gabriel.oliveira@unicamp.br",
    enrollment: "198845",
    course: "Docente - Física",
    period: "Docente",
    university: "Unicamp",
    gender: "Homem",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
    carModel: "Volkswagen Gol 2017",
    carPlate: "QWE-1R23",
    ridesCount: 52,
    memberSince: "fev. 2023",
    rating: 5.0,
    ratingsCount: 24
  },
  "julia.ferreira@unicamp.br": {
    name: "Júlia Ferreira",
    email: "julia.ferreira@unicamp.br",
    enrollment: "248842",
    course: "Arquitetura",
    period: "Integral",
    university: "Unicamp",
    gender: "Trans",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop",
    carModel: "Hyundai HB20 2019",
    carPlate: "JKL-3C45",
    ridesCount: 9,
    memberSince: "mar. 2025",
    rating: 4.7,
    ratingsCount: 3
  }
};

const INITIAL_RIDES = [
  {
    id: "ride-1",
    driverEmail: "thiago.santos@unicamp.br",
    origin: "Unicamp",
    destination: "Centro de Campinas",
    dateTime: "Hoje às 17:00",
    seatsTotal: 4,
    seatsLeft: 2,
    contribution: 8,
    carModel: "Toyota Corolla 2018",
    carPlate: "MNO-9F22"
  },
  {
    id: "ride-2",
    driverEmail: "vanessa.lima@unicamp.br",
    origin: "Unicamp",
    destination: "Shopping Dom Pedro",
    dateTime: "Hoje às 18:30",
    seatsTotal: 4,
    seatsLeft: 2,
    contribution: 6,
    carModel: "Ford Fiesta 2020",
    carPlate: "XYZ-7E89"
  },
  {
    id: "ride-3",
    driverEmail: "gabriel.oliveira@unicamp.br",
    origin: "Unicamp",
    destination: "Barão Geraldo",
    dateTime: "Hoje às 16:15",
    seatsTotal: 4,
    seatsLeft: 3,
    contribution: 0, // Carona solidária gratuita
    carModel: "Volkswagen Gol 2017",
    carPlate: "QWE-1R23"
  },
  {
    id: "ride-4",
    driverEmail: "julia.ferreira@unicamp.br",
    origin: "Unicamp",
    destination: "Shopping Dom Pedro",
    dateTime: "Amanhã às 08:30",
    seatsTotal: 4,
    seatsLeft: 3,
    contribution: 5,
    carModel: "Hyundai HB20 2019",
    carPlate: "JKL-3C45"
  }
];

const INITIAL_CHAT_MESSAGES = {
  "chat-thiago": [
    { sender: "thiago.santos@unicamp.br", text: "Olá! Vi que você vai para o centro hoje às 17h. Tem vaga ainda?", time: "11:30" },
    { sender: "lucas.silva@unicamp.br", text: "Opa, Thiago! Tem sim, duas vagas livres. Pode solicitar pelo app.", time: "11:32" },
    { sender: "thiago.santos@unicamp.br", text: "Fechado! Solicitação enviada.", time: "11:33" }
  ]
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Nova carona no seu trajeto comum!",
    desc: "Vanessa Lima (4.8 ★) acabou de publicar uma carona de Unicamp para Shopping Dom Pedro hoje às 18:30.",
    time: "5 min atrás",
    read: false,
    rideId: "ride-2"
  },
  {
    id: "notif-2",
    title: "Carona confirmada por Thiago Santos",
    desc: "Seu assento na carona de Unicamp para Centro de Campinas foi confirmado com sucesso. Prepare-se!",
    time: "2 horas atrás",
    read: true,
    rideId: "ride-1"
  }
];

// Global App State Object
let state = {
  users: DEFAULT_USERS,
  currentUser: DEFAULT_USERS["lucas.silva@unicamp.br"], // Logged in user simulation
  rides: INITIAL_RIDES,
  bookings: [], // { rideId: x, passengerEmail: y, status: 'pending'|'confirmed'|'completed' }
  chats: INITIAL_CHAT_MESSAGES, // key: 'chat-[email]' or 'chat-[rideId]', value: array of message objects
  notifications: DEFAULT_NOTIFICATIONS,
  activeMyRidesTab: "passenger", // passenger | driver
  currentChatPartner: null, // user object of the partner we are chatting with
  currentRatingTarget: null, // { bookingId: x, userToRate: email }
  selectedStars: 5
};

// Load state from localStorage on startup
function loadState() {
  const savedState = localStorage.getItem("unicar_app_state");
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Failed to parse saved state, resetting storage.", e);
    }
  } else {
    // Save initial seed on first boot
    saveState();
  }
}

function saveState() {
  localStorage.setItem("unicar_app_state", JSON.stringify({
    users: state.users,
    currentUser: state.currentUser,
    rides: state.rides,
    bookings: state.bookings,
    chats: state.chats,
    notifications: state.notifications
  }));
}

/* ==========================================
   NAVIGATION AND VIEW SYSTEM
   ========================================== */

function navigateTo(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach(scr => {
    scr.classList.remove("active");
  });
  
  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }

  // White text status-bar for splash and profile header backgrounds
  const statusBar = document.querySelector(".status-bar");
  if (screenId === "screen-splash" || screenId === "screen-profile") {
    statusBar.classList.add("white-text");
  } else {
    statusBar.classList.remove("white-text");
  }

  // Trigger screen-specific rendering
  if (screenId === "screen-home") {
    // Show or hide gender safety toggle based on current user's gender
    const safetyToggleContainer = document.getElementById("gender-safety-filter-container");
    if (safetyToggleContainer) {
      if (state.currentUser && (state.currentUser.gender === "Mulher" || state.currentUser.gender === "Trans")) {
        safetyToggleContainer.style.display = "flex";
      } else {
        safetyToggleContainer.style.display = "none";
        const safetyToggle = document.getElementById("gender-safety-toggle");
        if (safetyToggle) safetyToggle.checked = false;
      }
    }

    const originQuery = document.getElementById("search-origin") ? document.getElementById("search-origin").value.trim().toLowerCase() : "";
    const destQuery = document.getElementById("search-dest") ? document.getElementById("search-dest").value.trim().toLowerCase() : "";
    renderRidesList(originQuery, destQuery);
    updateGlobalChatBadges();
  } else if (screenId === "screen-my-rides") {
    renderMyRides();
    updateGlobalChatBadges();
  } else if (screenId === "screen-chats-list") {
    renderChatsList();
    updateGlobalChatBadges();
  } else if (screenId === "screen-profile") {
    renderProfileDetails();
    updateGlobalChatBadges();
  }

  // Update Lucide SVG icons in target layout
  lucide.createIcons();
}

function navigateToTab(screenId) {
  // Tab Bar active state toggles
  document.querySelectorAll(".tab-bar .tab-item").forEach(item => {
    item.classList.remove("active");
  });

  navigateTo(screenId);

  // Active tab element styling
  const activeTabs = document.querySelectorAll(`[onclick="navigateToTab('${screenId}')"]`);
  activeTabs.forEach(tab => tab.classList.add("active"));
}

/* ==========================================
   AUTHENTICATION SIMULATORS
   ========================================== */

function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("login-email").value.trim().toLowerCase();
  
  // Login simulation (checks if email is in our local DB, otherwise creates or rejects)
  if (state.users[emailInput]) {
    state.currentUser = state.users[emailInput];
  } else {
    // Auto-create a user if email domain is valid
    if (!validateUniversityEmail(emailInput)) {
      alert("Por favor, use um e-mail institucional válido (ex: @unicamp.br, @usp.br ou .edu.br)!");
      return;
    }
    const namePart = emailInput.split("@")[0];
    const cleanName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(".", " ");
    
    state.users[emailInput] = {
      name: cleanName,
      email: emailInput,
      enrollment: "Matrícula Ativa",
      course: "Engenharia da Computação",
      period: "Integral",
      university: emailInput.split("@")[1].split(".")[0].toUpperCase(),
      gender: "Homem",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
      carModel: "",
      carPlate: "",
      ridesCount: 0,
      memberSince: "Hoje",
      rating: 5.0,
      ratingsCount: 0
    };
    state.currentUser = state.users[emailInput];
  }

  saveState();
  navigateToTab("screen-home");
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const enrollment = document.getElementById("reg-enrollment").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const course = document.getElementById("reg-course").value;
  const period = document.getElementById("reg-period").value;
  
  // Validation for university domain check
  if (!validateUniversityEmail(email)) {
    alert("Erro: Apenas emails institucionais ativos (contendo .edu ou .br) são permitidos para comprovar vínculo universitário!");
    return;
  }

  // Matrícula validation proof simulated
  const fileStatus = document.getElementById("file-upload-status").innerText;
  if (fileStatus === "Enviar comprovante acadêmico" || fileStatus === "") {
    alert("Por favor, faça o upload de seu comprovante de matrícula ativo para análise do sistema!");
    return;
  }

  const uniName = email.split("@")[1].split(".")[0].toUpperCase();

  const gender = document.getElementById("reg-gender").value;

  // Create new user profile
  state.users[email] = {
    name: name,
    email: email,
    enrollment: enrollment,
    course: course,
    period: period,
    university: uniName,
    gender: gender,
    avatar: REGISTER_AVATARS[currentAvatarIndex],
    carModel: "",
    carPlate: "",
    ridesCount: 0,
    memberSince: "maio 2026",
    rating: 5.0,
    ratingsCount: 0
  };

  state.currentUser = state.users[email];
  saveState();

  alert("Matrícula validada automaticamente! Sua conta acadêmica UNICAR foi criada.");
  navigateToTab("screen-home");
}

function handleLogout() {
  if (confirm("Deseja mesmo sair de sua conta?")) {
    state.currentUser = DEFAULT_USERS["lucas.silva@unicamp.br"]; // Reset to default mock
    saveState();
    navigateTo("screen-splash");
  }
}

function validateUniversityEmail(email) {
  const parts = email.split("@");
  if (parts.length < 2) return false;
  const domain = parts[1];
  return domain.includes(".edu") || domain.includes(".br");
}

function triggerFilePicker() {
  document.getElementById("reg-proof").click();
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    document.getElementById("file-upload-status").innerHTML = `<span style="color:#16a34a; font-weight:600;"><i data-lucide="check" style="width:12px; height:12px; display:inline; margin-right:4px;"></i> Comprovante Anexado (${file.name})</span>`;
    lucide.createIcons();
  }
}

// Preset avatars list for dynamic registration pictures selection
const REGISTER_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop"
];
let currentAvatarIndex = 0;

function cycleRegisterAvatar() {
  currentAvatarIndex = (currentAvatarIndex + 1) % REGISTER_AVATARS.length;
  const img = document.getElementById("register-avatar-preview");
  if (img) {
    img.src = REGISTER_AVATARS[currentAvatarIndex];
  }
}

/* ==========================================
   RIDE SEARCH AND MATCHING ENGINE
   ========================================== */

function swapLocations() {
  const orig = document.getElementById("search-origin");
  const dest = document.getElementById("search-dest");
  const temp = orig.value;
  orig.value = dest.value;
  dest.value = temp;
}

function performRideSearch() {
  const originQuery = document.getElementById("search-origin").value.trim().toLowerCase();
  const destQuery = document.getElementById("search-dest").value.trim().toLowerCase();
  
  renderRidesList(originQuery, destQuery);
}

function renderRidesList(originFilter = "", destFilter = "") {
  const container = document.getElementById("rides-list-container");
  container.innerHTML = "";

  const safetyToggle = document.getElementById("gender-safety-toggle");
  const filterOnlyFemaleTrans = safetyToggle && safetyToggle.checked;

  // Filter rides from active list, excluding user's own offered rides
  const filteredRides = state.rides.filter(ride => {
    const isOwnRide = ride.driverEmail === state.currentUser.email;
    const matchesOrigin = ride.origin.toLowerCase().includes(originFilter);
    const matchesDest = ride.destination.toLowerCase().includes(destFilter);
    
    if (isOwnRide || !matchesOrigin || !matchesDest) return false;

    // Apply gender safety filter if active
    if (filterOnlyFemaleTrans) {
      const driver = state.users[ride.driverEmail];
      return driver && (driver.gender === "Mulher" || driver.gender === "Trans");
    }
    return true;
  });

  if (filteredRides.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="alert-circle"></i>
        <p>Nenhuma carona encontrada para esse trajeto.</p>
        <button class="btn btn-secondary-outline margin-t" onclick="navigateTo('screen-create-ride')">Oferecer esta Carona</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filteredRides.forEach(ride => {
    const driver = state.users[ride.driverEmail] || {
      name: "Usuário Unicar",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
      course: "Geral",
      university: "Unicar",
      gender: "Gênero"
    };

    // Calculate rating stars block
    let starsHtml = "";
    const floorRating = Math.floor(driver.rating);
    for (let i = 0; i < 5; i++) {
      if (i < floorRating) {
        starsHtml += `<i data-lucide="star"></i>`;
      } else {
        starsHtml += `<i data-lucide="star" style="fill:none; stroke:#cbd5e1;"></i>`;
      }
    }

    // Check booking status for current ride
    const booking = state.bookings.find(b => b.rideId === ride.id && b.passengerEmail === state.currentUser.email);
    let actionBtn = "";
    
    if (booking) {
      if (booking.status === "pending") {
        actionBtn = `<span class="status-label pending">Solicitado</span>`;
      } else if (booking.status === "confirmed") {
        actionBtn = `<span class="status-label confirmed">Confirmada</span>`;
      } else if (booking.status === "completed") {
        actionBtn = `<span class="status-label completed">Finalizada</span>`;
      }
    } else {
      actionBtn = `<button class="ride-request-btn" onclick="requestRide('${ride.id}')">Solicitar Carona</button>`;
    }

    const priceText = ride.contribution > 0 ? `R$ ${ride.contribution.toFixed(2)}` : "Grátis";

    const card = document.createElement("div");
    card.className = "ride-item-card";
    card.innerHTML = `
      <div class="ride-card-main">
        <div class="ride-avatar">
          <img src="${driver.avatar}" alt="${driver.name}">
          <div class="ride-avatar-badge">
            <i data-lucide="graduation-cap"></i>
          </div>
        </div>
        <div class="ride-details-col">
          <div class="ride-driver-row">
            <span class="ride-driver-name">${driver.name} (${driver.gender || "Gênero não informado"})</span>
            <span class="ride-rating-val"><i data-lucide="star"></i> ${driver.rating.toFixed(1)}</span>
          </div>
          <span class="ride-subtext">${driver.course} • ${driver.university}</span>
          <div class="ride-rating-stars">${starsHtml}</div>
          <div class="ride-info-tags">
            <span class="ride-car-tag"><i data-lucide="car"></i> ${ride.carModel}</span>
            <span class="ride-car-tag"><i data-lucide="calendar"></i> ${ride.dateTime}</span>
            <span class="ride-car-tag"><i data-lucide="map-pin"></i> Saindo de: ${ride.origin}</span>
          </div>
        </div>
      </div>
      <div class="ride-card-footer">
        <span class="ride-seats-left"><i data-lucide="users"></i> ${ride.seatsLeft} de ${ride.seatsTotal} vagas livres</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="route-map-btn" onclick="openRouteMap('${ride.id}')">
            <i data-lucide="map"></i> Ver Rota
          </button>
          <span class="ride-price-badge">${priceText}</span>
          ${actionBtn}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

function requestRide(rideId) {
  const ride = state.rides.find(r => r.id === rideId);
  if (!ride) return;

  if (ride.seatsLeft <= 0) {
    alert("Infelizmente esta carona já está lotada!");
    return;
  }

  // Create booking
  const newBooking = {
    rideId: rideId,
    passengerEmail: state.currentUser.email,
    status: "confirmed" // Auto-confirmed for high fidelity proto speed
  };

  state.bookings.push(newBooking);
  ride.seatsLeft -= 1;

  // Automatically start chat with the driver
  const driver = state.users[ride.driverEmail];
  const chatKey = `chat-${driver.email}`;
  
  if (!state.chats[chatKey]) {
    state.chats[chatKey] = [
      { sender: driver.email, text: `Olá! Confirmei sua carona de ${ride.origin} para ${ride.destination}. Nos vemos no horário!`, time: getFormattedTime() }
    ];
  } else {
    // Add ride confirmation text to existing thread
    state.chats[chatKey].push({
      sender: driver.email,
      text: `Carona confirmada para hoje (${ride.origin} → ${ride.destination}). Tudo certo para o horário?`,
      time: getFormattedTime()
    });
  }

  saveState();
  alert(`Carona com ${driver.name} solicitada e confirmada com sucesso!`);
  
  const originQuery = document.getElementById("search-origin") ? document.getElementById("search-origin").value.trim().toLowerCase() : "";
  const destQuery = document.getElementById("search-dest") ? document.getElementById("search-dest").value.trim().toLowerCase() : "";
  renderRidesList(originQuery, destQuery);
}

/* ==========================================
   OFFER/CREATE RIDE ACTION
   ========================================== */

function handleCreateRide(event) {
  event.preventDefault();
  
  const origin = document.getElementById("ride-origin").value.trim();
  const dest = document.getElementById("ride-dest").value.trim();
  const dateVal = document.getElementById("ride-date").value;
  const timeVal = document.getElementById("ride-time").value;
  const seats = parseInt(document.getElementById("ride-seats").value);
  const contr = parseFloat(document.getElementById("ride-contribution").value) || 0;
  
  // Format Date human-friendly (e.g. "Hoje às 17:00" or "02/06 às 15:30")
  let formattedTime = `${dateVal} às ${timeVal}`;
  const today = new Date().toISOString().split("T")[0];
  if (dateVal === today) {
    formattedTime = `Hoje às ${timeVal}`;
  } else {
    const dParts = dateVal.split("-");
    if (dParts.length === 3) {
      formattedTime = `${dParts[2]}/${dParts[1]} às ${timeVal}`;
    }
  }

  // Build car details card link for current user if profile details are blank
  if (!state.currentUser.carModel) {
    state.currentUser.carModel = document.getElementById("ride-car-desc").value;
    state.currentUser.carPlate = document.getElementById("ride-car-plate").value;
  }

  const newRide = {
    id: `ride-${Date.now()}`,
    driverEmail: state.currentUser.email,
    origin: origin,
    destination: dest,
    dateTime: formattedTime,
    seatsTotal: seats,
    seatsLeft: seats,
    contribution: contr,
    carModel: state.currentUser.carModel,
    carPlate: state.currentUser.carPlate
  };

  state.rides.unshift(newRide);
  saveState();

  alert("Sua carona foi oferecida e está visível para toda a comunidade universitária!");
  
  // Clear form inputs
  document.getElementById("ride-dest").value = "";
  
  state.activeMyRidesTab = "driver";
  navigateToTab("screen-my-rides");
}

/* ==========================================
   MY RIDES VIEW & TRIP MANAGEMENT
   ========================================== */

function switchMyRidesTab(tabType) {
  state.activeMyRidesTab = tabType;
  
  // Highlight buttons
  document.getElementById("tab-passenger-btn").classList.toggle("active", tabType === "passenger");
  document.getElementById("tab-driver-btn").classList.toggle("active", tabType === "driver");

  renderMyRides();
}

function renderMyRides() {
  const container = document.getElementById("my-rides-list");
  const offerShortcut = document.getElementById("offer-ride-shortcut");
  container.innerHTML = "";

  if (state.activeMyRidesTab === "passenger") {
    offerShortcut.style.display = "none";
    
    // Find all rides passenger has booked
    const passengerBookings = state.bookings.filter(b => b.passengerEmail === state.currentUser.email);
    
    if (passengerBookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i data-lucide="compass"></i>
          <p>Você não solicitou nenhuma carona ainda.</p>
          <button class="btn btn-secondary margin-t" onclick="navigateToTab('screen-home')">Buscar Caronas</button>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    passengerBookings.forEach(booking => {
      const ride = state.rides.find(r => r.id === booking.rideId);
      if (!ride) return;
      const driver = state.users[ride.driverEmail];

      const statusBadge = booking.status === "confirmed" 
        ? `<span class="status-label confirmed">Confirmada</span>` 
        : booking.status === "completed" 
        ? `<span class="status-label completed">Finalizada</span>`
        : `<span class="status-label pending">Pendente</span>`;

      const actionBtn = booking.status === "confirmed"
        ? `<button class="btn btn-outline-blue flex-1" onclick="openRatingFlow('${booking.rideId}', '${booking.passengerEmail}', '${driver.email}')">Finalizar & Avaliar</button>`
        : ``;

      const card = document.createElement("div");
      card.className = "ride-item-card";
      card.innerHTML = `
        <div class="ride-card-main">
          <div class="ride-avatar">
            <img src="${driver.avatar}" alt="${driver.name}">
          </div>
          <div class="ride-details-col">
            <div class="ride-driver-row">
              <span class="ride-driver-name">${ride.origin} → ${ride.destination}</span>
              ${statusBadge}
            </div>
            <span class="ride-subtext" style="color:var(--text-main); font-weight:700;">Motorista: ${driver.name}</span>
            <span class="ride-subtext"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${ride.dateTime}</span>
            <span class="ride-subtext"><i data-lucide="car" style="width:12px; height:12px;"></i> ${ride.carModel} (${ride.carPlate})</span>
          </div>
        </div>
        <div class="my-ride-meta">
          <span>Contribuição: R$ ${ride.contribution.toFixed(2)}</span>
          <div class="my-ride-actions flex-1" style="justify-content: flex-end;">
            <button class="btn btn-outline-grey" style="padding: 6px 12px; font-size:0.75rem;" onclick="openChatWith('${driver.email}')">
              <i data-lucide="message-square" style="width:14px; height:14px;"></i> Chat
            </button>
            ${actionBtn}
          </div>
        </div>
      `;
      container.appendChild(card);
    });

  } else {
    // Driver Mode
    offerShortcut.style.display = "block";
    
    // Find all rides current user is offering
    const myOfferedRides = state.rides.filter(r => r.driverEmail === state.currentUser.email);

    if (myOfferedRides.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i data-lucide="car"></i>
          <p>Você não publicou nenhuma oferta de carona.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    myOfferedRides.forEach(ride => {
      // Find bookings for this ride
      const rideBookings = state.bookings.filter(b => b.rideId === ride.id);
      let passengersListHtml = "";
      
      if (rideBookings.length > 0) {
        passengersListHtml = `<div style="border-top:1px solid #f1f5f9; padding-top:8px; margin-top:5px;">
          <p style="font-size:0.75rem; font-weight:700; color:var(--text-main); margin-bottom:5px;">Passageiros confirmados:</p>
          <div style="display:flex; flex-direction:column; gap:6px;">`;
        
        rideBookings.forEach(booking => {
          const pass = state.users[booking.passengerEmail] || { name: "Passageiro" };
          passengersListHtml += `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
                <img src="${pass.avatar}" style="width:20px; height:20px; border-radius:50%; object-fit:cover;">
                ${pass.name} (${pass.course})
              </span>
              <button class="btn btn-outline-grey" style="padding: 4px 8px; font-size:0.7rem; width:auto;" onclick="openChatWith('${pass.email}')">Chat</button>
            </div>
          `;
        });
        passengersListHtml += `</div></div>`;
      } else {
        passengersListHtml = `<p style="font-size:0.72rem; color:var(--text-muted); margin-top:5px;">Aguardando adesão de passageiros...</p>`;
      }

      const card = document.createElement("div");
      card.className = "ride-item-card";
      card.innerHTML = `
        <div class="ride-card-main">
          <div class="ride-details-col">
            <div class="ride-driver-row">
              <span class="ride-driver-name" style="font-size:1rem;">${ride.origin} → ${ride.destination}</span>
              <span class="status-label offered">Oferecida</span>
            </div>
            <span class="ride-subtext"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${ride.dateTime}</span>
            <span class="ride-subtext"><i data-lucide="users" style="width:12px; height:12px;"></i> ${ride.seatsLeft} de ${ride.seatsTotal} vagas restantes</span>
            ${passengersListHtml}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  lucide.createIcons();
}

/* ==========================================
   CHAT SYSTEM (REAL-TIME SIMULATION)
   ========================================== */

function updateGlobalChatBadges() {
  // Count unread simulated rooms (for fidelity, let's toggle a badge)
  const badgeVal = 1; // Default mock unread message count
  
  const ids = ["global-chat-badge", "global-chat-badge-myrides", "global-chat-badge-chats", "global-chat-badge-profile"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = badgeVal > 0 ? "flex" : "none";
      el.innerText = badgeVal;
    }
  });
}

function renderChatsList() {
  const container = document.getElementById("chats-list-container");
  container.innerHTML = "";

  const chatKeys = Object.keys(state.chats);

  if (chatKeys.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="message-square"></i>
        <p>Você não tem nenhuma conversa ativa.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  chatKeys.forEach(key => {
    const partnerEmail = key.replace("chat-", "");
    const partner = state.users[partnerEmail] || {
      name: "Colega Acadêmico",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
      course: "Universitário"
    };

    const messages = state.chats[key];
    const lastMsg = messages[messages.length - 1];
    
    // Unread simulation details
    const isUnread = partnerEmail === "thiago.santos@unicamp.br";

    const item = document.createElement("div");
    item.className = `chat-room-item ${isUnread ? "unread" : ""}`;
    item.onclick = () => openChatWith(partnerEmail);
    item.innerHTML = `
      <div class="chat-room-avatar">
        <img src="${partner.avatar}" alt="${partner.name}">
      </div>
      <div class="chat-room-details">
        <div class="chat-room-top">
          <span class="chat-room-name">${partner.name}</span>
          <span class="chat-room-time">${lastMsg ? lastMsg.time : ""}</span>
        </div>
        <div class="chat-room-bottom">
          <span class="chat-room-msg ${isUnread ? "unread-text" : ""}">${lastMsg ? lastMsg.text : ""}</span>
          ${isUnread ? '<span class="unread-badge">1</span>' : ""}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function openChatWith(partnerEmail) {
  const partner = state.users[partnerEmail];
  if (!partner) return;

  state.currentChatPartner = partner;
  
  // Set UI elements
  document.getElementById("chat-partner-name").innerText = partner.name;
  document.getElementById("chat-partner-avatar").src = partner.avatar;
  document.getElementById("chat-partner-status").innerText = "Online";

  renderChatMessages();
  navigateTo("screen-chat-details");

  // Read message simulation
  if (partnerEmail === "thiago.santos@unicamp.br") {
    // Hide unread indicators for test fidelity after opening
    updateGlobalChatBadges();
    const badges = document.querySelectorAll(".unread-badge, .chat-badge");
    badges.forEach(b => b.style.display = "none");
    const unreadItem = document.querySelector(".chat-room-item.unread");
    if (unreadItem) {
      unreadItem.classList.remove("unread");
      const unreadText = unreadItem.querySelector(".chat-room-msg.unread-text");
      if (unreadText) unreadText.classList.remove("unread-text");
    }
  }
}

function renderChatMessages() {
  const container = document.getElementById("chat-messages-container");
  container.innerHTML = "";

  if (!state.currentChatPartner) return;
  const chatKey = `chat-${state.currentChatPartner.email}`;
  const messages = state.chats[chatKey] || [];

  messages.forEach(msg => {
    const isOutgoing = msg.sender === state.currentUser.email;
    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${isOutgoing ? "outgoing" : "incoming"}`;
    bubble.innerHTML = `
      ${msg.text}
      <span class="message-meta">${msg.time}</span>
    `;
    container.appendChild(bubble);
  });

  // Auto-scroll chat area down
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function handleSendChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById("chat-message-input");
  const text = input.value.trim();
  
  if (!text || !state.currentChatPartner) return;

  const chatKey = `chat-${state.currentChatPartner.email}`;
  if (!state.chats[chatKey]) {
    state.chats[chatKey] = [];
  }

  // Push outgoing message
  const userMsg = {
    sender: state.currentUser.email,
    text: text,
    time: getFormattedTime()
  };
  state.chats[chatKey].push(userMsg);
  input.value = "";

  renderChatMessages();
  saveState();

  // Simulate delayed driver response
  simulateDriverResponse(state.currentChatPartner.email);
}

function simulateDriverResponse(driverEmail) {
  const responses = [
    "Combinado! Te encontro no local de embarque no horário combinado.",
    "Beleza! Vou estacionar próximo à rotatória principal.",
    "Perfeito. Se puder, me avisa quando estiver chegando lá.",
    "Fechado. Qualquer alteração ou atraso eu aviso por aqui!",
    "Oi! Sim, sem problemas. Te espero lá."
  ];

  const randomIdx = Math.floor(Math.random() * responses.length);
  const responseText = responses[randomIdx];

  setTimeout(() => {
    const chatKey = `chat-${driverEmail}`;
    
    // Only append if the chat database exists
    if (state.chats[chatKey]) {
      state.chats[chatKey].push({
        sender: driverEmail,
        text: responseText,
        time: getFormattedTime()
      });

      // Update screen live if user is currently looking at this active conversation
      if (state.currentChatPartner && state.currentChatPartner.email === driverEmail) {
        renderChatMessages();
      }
      saveState();
    }
  }, 1800); // 1.8 second natural response delay
}

function triggerLateAlert() {
  if (!state.currentChatPartner) {
    // Send to first active chat room if profile button is clicked
    const chatKeys = Object.keys(state.chats);
    if (chatKeys.length > 0) {
      const email = chatKeys[0].replace("chat-", "");
      openChatWith(email);
    } else {
      alert("Nenhum chat de viagem ativo encontrado para notificar atrasos.");
      return;
    }
  }

  const chatKey = `chat-${state.currentChatPartner.email}`;
  const text = "Olá, estou a caminho, mas posso me atrasar cerca de 5 a 10 minutos devido ao trânsito do campus! Obrigado pela paciência.";
  
  state.chats[chatKey].push({
    sender: state.currentUser.email,
    text: text,
    time: getFormattedTime()
  });

  renderChatMessages();
  saveState();
}

function getFormattedTime() {
  const now = new Date();
  const hr = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${hr}:${min}`;
}

/* ==========================================
   9. PROFILE SCREEN INTERACTIVITY & EDIT
   ========================================== */

function renderProfileDetails() {
  const u = state.currentUser;
  
  // Render user basic profile
  document.getElementById("profile-name").innerText = u.name;
  document.getElementById("profile-tagline").innerHTML = `${u.course} • <span class="profile-uni-badge"><i data-lucide="graduation-cap" style="width:12px; height:12px; display:inline-block; margin-right:2px; vertical-align:middle;"></i> ${u.university}</span>`;
  document.getElementById("profile-rating-num").innerText = u.rating.toFixed(1);
  document.getElementById("profile-avatar").src = u.avatar;
  
  // Mini footer user card
  document.getElementById("profile-avatar-mini").src = u.avatar;
  document.getElementById("profile-name-mini").innerText = u.name;
  document.getElementById("profile-details-mini").innerText = `${u.course} • ${u.university}`;

  // Vehicle settings checking
  if (u.carModel) {
    document.getElementById("profile-car-model").innerText = u.carModel;
    document.getElementById("profile-car-plate").innerText = u.carPlate;
    document.getElementById("profile-car-plate-alt").innerText = u.carPlate;
    document.getElementById("profile-car-plate-mini").innerText = u.carPlate;
    document.getElementById("profile-car-plate-mini").style.display = "inline-block";
    document.querySelector(".profile-card.car-card").style.display = "flex";
  } else {
    // Hide car card if current user is not a driver yet
    document.querySelector(".profile-card.car-card").style.display = "none";
    document.getElementById("profile-car-plate-mini").style.display = "none";
  }

  document.getElementById("profile-rides-count").innerText = `${u.ridesCount} caronas realizadas`;
  document.getElementById("profile-member-since").innerText = `Desde ${u.memberSince}`;

  // Rating Stars
  const starsContainer = document.getElementById("profile-stars");
  starsContainer.innerHTML = "";
  const floorRating = Math.floor(u.rating);
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("i");
    star.setAttribute("data-lucide", "star");
    if (i >= floorRating) {
      star.style.fill = "none";
      star.style.stroke = "rgba(255, 255, 255, 0.4)";
    }
    starsContainer.appendChild(star);
  }

  lucide.createIcons();
}

function showProfileOptions() {
  alert(`UNICAR v1.0.0\nStatus Acadêmico: Ativo (${state.currentUser.university})\nMatrícula: ${state.currentUser.enrollment}`);
}

function openEditProfile() {
  const modal = document.getElementById("modal-edit-profile");
  modal.classList.add("active");
  
  // Populate form with current values
  document.getElementById("edit-name").value = state.currentUser.name;
  document.getElementById("edit-course").value = state.currentUser.course;
  document.getElementById("edit-gender").value = state.currentUser.gender || "Homem";
  document.getElementById("edit-car-model").value = state.currentUser.carModel || "";
  document.getElementById("edit-car-plate").value = state.currentUser.carPlate || "";
}

function closeEditProfile() {
  document.getElementById("modal-edit-profile").classList.remove("active");
}

function handleSaveProfile(event) {
  event.preventDefault();
  
  state.currentUser.name = document.getElementById("edit-name").value.trim();
  state.currentUser.course = document.getElementById("edit-course").value.trim();
  state.currentUser.gender = document.getElementById("edit-gender").value;
  state.currentUser.carModel = document.getElementById("edit-car-model").value.trim();
  state.currentUser.carPlate = document.getElementById("edit-car-plate").value.trim().toUpperCase();

  // Sync back to users registry
  state.users[state.currentUser.email] = state.currentUser;
  
  saveState();
  closeEditProfile();
  renderProfileDetails();
  alert("Perfil atualizado com sucesso!");
}

/* ==========================================
   REVIEW AND RATING ENGINE MODALS
   ========================================== */

function openRatingFlow(rideId, passengerEmail, driverEmail) {
  state.currentRatingTarget = { rideId, passengerEmail, driverEmail };
  
  const driver = state.users[driverEmail];
  document.getElementById("rating-driver-name").innerText = driver.name;
  
  setSelectStars(5); // Default to 5 stars
  document.getElementById("rating-comment").value = "";

  document.getElementById("modal-rating").classList.add("active");
  lucide.createIcons();
}

function closeRatingModal() {
  document.getElementById("modal-rating").classList.remove("active");
}

function setSelectStars(val) {
  state.selectedStars = val;
  document.querySelectorAll(".star-select").forEach(star => {
    const starNum = parseInt(star.getAttribute("data-star"));
    star.classList.toggle("active", starNum <= val);
  });
}

function submitRating() {
  if (!state.currentRatingTarget) return;
  const { rideId, passengerEmail, driverEmail } = state.currentRatingTarget;
  
  const driver = state.users[driverEmail];
  if (driver) {
    // Recalculate average stars rating
    const currentTotalPoints = driver.rating * driver.ratingsCount;
    driver.ratingsCount += 1;
    driver.rating = (currentTotalPoints + state.selectedStars) / driver.ratingsCount;
    driver.ridesCount += 1;
  }

  // Set booking status to completed
  const booking = state.bookings.find(b => b.rideId === rideId && b.passengerEmail === passengerEmail);
  if (booking) {
    booking.status = "completed";
  }

  saveState();
  closeRatingModal();
  switchMyRidesTab("passenger");
  alert("Obrigado por avaliar seu colega! Juntos fazemos uma comunidade mais segura.");
}

/* ==========================================
   INITIALIZATION AND CLOCK TIMER
   ========================================== */

function updatePhoneTime() {
  const clock = document.getElementById("status-time");
  if (clock) {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    clock.innerText = `${hrs}:${mins}`;
  }
}

// On Page Load Startup
window.addEventListener("DOMContentLoaded", () => {
  loadState();
  
  // Set current phone clock
  updatePhoneTime();
  setInterval(updatePhoneTime, 30000);
  
  // Set default search date & time
  const searchDate = document.getElementById("search-date");
  const searchTime = document.getElementById("search-time");
  if (searchDate) {
    searchDate.value = new Date().toISOString().split("T")[0];
  }
  if (searchTime) {
    const now = new Date();
    searchTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // Set default creation date
  const datePicker = document.getElementById("ride-date");
  if (datePicker) {
    datePicker.value = new Date().toISOString().split("T")[0];
  }

  // Pre-load default app screen (Splash)
  navigateTo("screen-splash");
});

/* ==========================================
   LEAFLET MAP INTEGRATION & ROUTE CONTROL
   ========================================== */

let leafletMap = null;
let routeLayer = null;
let markersGroup = null;

function openRouteMap(rideId) {
  const ride = state.rides.find(r => r.id === rideId);
  if (!ride) return;

  const driver = state.users[ride.driverEmail] || { name: "Motorista" };
  document.getElementById("map-route-title").innerText = `${ride.origin} → ${ride.destination}`;
  document.getElementById("map-route-desc").innerText = `Motorista: ${driver.name} (${ride.carModel})`;

  document.getElementById("modal-route-map").classList.add("active");

  // Initialize or reset Leaflet Map
  setTimeout(() => {
    const origCoord = COORDINATES[ride.origin.toLowerCase().trim()] || COORDINATES["unicamp"];
    const destCoord = COORDINATES[ride.destination.toLowerCase().trim()] || COORDINATES["centro"];

    if (!leafletMap) {
      leafletMap = L.map("route-map").setView(origCoord, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      
      markersGroup = L.layerGroup().addTo(leafletMap);
    } else {
      markersGroup.clearLayers();
      if (routeLayer) {
        leafletMap.removeLayer(routeLayer);
      }
    }

    // Add Markers
    const origMarker = L.marker(origCoord).addTo(markersGroup).bindPopup(`<b>Origem:</b> ${ride.origin}`).openPopup();
    const destMarker = L.marker(destCoord).addTo(markersGroup).bindPopup(`<b>Destino:</b> ${ride.destination}`);

    // Draw dotted route line
    routeLayer = L.polyline([origCoord, destCoord], {
      color: '#1d4ed8',
      weight: 5,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(leafletMap);

    // Fit map bounds
    const group = new L.featureGroup([origMarker, destMarker]);
    leafletMap.fitBounds(group.getBounds().pad(0.25));
    
    // Force resize map for container fitting
    leafletMap.invalidateSize();
  }, 250);
}

function closeMapModal() {
  document.getElementById("modal-route-map").classList.remove("active");
}

/* ==========================================
   SIMULATED INTERACTIVE NOTIFICATIONS
   ========================================== */

function openNotificationsModal() {
  const modal = document.getElementById("modal-notifications");
  if (!modal) return;
  modal.classList.add("active");
  
  // Render list
  const container = document.getElementById("notifications-container");
  container.innerHTML = "";
  
  if (state.notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="bell-off"></i>
        <p>Sem novas notificações.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  state.notifications.forEach(n => {
    const item = document.createElement("div");
    item.className = `notification-item ${n.read ? "" : "unread"}`;
    item.onclick = () => {
      n.read = true;
      saveState();
      closeNotificationsModal();
      
      // If notification has a linked ride, display its map route directly
      if (n.rideId) {
        openRouteMap(n.rideId);
      }
    };
    item.innerHTML = `
      <div class="notification-icon-wrapper">
        <i data-lucide="bell"></i>
      </div>
      <div class="notification-content">
        <h6>${n.title}</h6>
        <p>${n.desc}</p>
        <span class="notification-time">${n.time}</span>
      </div>
    `;
    container.appendChild(item);
  });
  
  // Hide unread badge
  const dot = document.querySelector(".notification-badge-btn .badge-dot");
  if (dot) dot.style.display = "none";
  
  lucide.createIcons();
}

function closeNotificationsModal() {
  document.getElementById("modal-notifications").classList.remove("active");
}
