/* ===================================================================
   RAMMAH TRAVEL - CORE LOGIC & INTERACTION ENGINE
   Enterprise, INGO & Government Fleet & Truck Contracting (Syria)
   Interactive 14-Governorate Syria Map (Gold & Emerald Green)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let currentLang = localStorage.getItem('rammah_lang') || 'ar'; // Default Arabic for Syrian audience

  // Primary Contact Info
  const CONTACT_PHONE_WHATSAPP = '905352512448';
  const CONTACT_EMAIL = 'info@rammah-trvl.com';

  const fleetData = {
    'h1': { nameEn: 'Hyundai H-1 Passenger Van (9-12 Seats)', nameAr: 'فان هيونداي H-1 للنقل الجماعي (9-12 راكب)' },
    'santafe': { nameEn: 'Hyundai Santa Fe 4WD (CM & Newer Models)', nameAr: 'هيونداي سنتافيه دفع رباعي 4x4 (طراز CM والحديث)' },
    'porter': { nameEn: 'Hyundai Porter Light Cargo Truck (1.5 - 2 Tons)', nameAr: 'شاحنة هيونداي بورتر للنقل الخفيف (1.5 - 2 طن)' },
    'mighty': { nameEn: 'Hyundai Mighty Heavy Carrier (3.5 - 5.5 Tons)', nameAr: 'شاحنة هيونداي مايتي للنقل الثقيل والقوافل (3.5 - 5.5 طن)' },
    'sedan': { nameEn: 'Hyundai Corporate Sedans (Elantra / Sonata)', nameAr: 'هيونداي سيدان للشركات والمنظمات (إلنترا / سوناتا)' },
    'multi': { nameEn: 'Integrated Mixed Fleet (Vans, 4WD & Trucks)', nameAr: 'أسطول متكامل ومختلط (فانات، دفع رباعي وشاحنات)' }
  };

  // 14 Syrian Governorates Data
  const governoratesData = {
    'damascus': {
      nameAr: 'دمشق',
      nameEn: 'Damascus',
      descAr: 'الإدارة العامة، كراج مطار دمشق الدولي، حي المزة الدبلوماسي، وورشة الصيانة المركزية الكبرى.',
      descEn: 'Central Administrative Headquarters, Airport VIP Depot, Diplomatic Quarter, and primary maintenance facility.',
      fleetAr: 'فانات H-1، سنتافيه 4WD، شاحنات بورتر ومايتي، وسيدان',
      fleetEn: 'H-1 Vans, Santa Fe 4WD, Porter & Mighty Trucks, Sedans',
      responseAr: 'أقل من 30 دقيقة',
      responseEn: '< 30 Min'
    },
    'rifdimashq': {
      nameAr: 'ريف دمشق',
      nameEn: 'Rural Damascus',
      descAr: 'تغطية كاملة للمدن الصناعية (عدرا، حوش بلاس)، مستودعات الشحن اللوجستي، والبلدات المحيطة بالعاصمة.',
      descEn: 'Extensive industrial zone coverage (Adra), logistical transport depots, and regional field project corridors.',
      fleetAr: 'شاحنات نقل بضائع مايتي، فانات كوادر، وسيارات دفع رباعي',
      fleetEn: 'Mighty Freight Trucks, Crew Vans, 4WD SUVs',
      responseAr: 'أقل من 40 دقيقة',
      responseEn: '< 40 Min'
    },
    'aleppo': {
      nameAr: 'حلب',
      nameEn: 'Aleppo',
      descAr: 'المركز التشغيلي للشمال السوري، خدمة المنظمات الإنسانية، الوفود التجارية، والمدينة الصناعية بالشيخ نجار.',
      descEn: 'Northern operations hub serving humanitarian response agencies, trade delegations, and Sheikh Najjar industrial zone.',
      fleetAr: 'أسطول فانات H-1 للمنظمات، شاحنات نقل ثقيل، وسنتافيه 4WD',
      fleetEn: 'INGO H-1 Vans, Heavy Logistics Trucks, Santa Fe 4WD',
      responseAr: 'أقل من 35 دقيقة',
      responseEn: '< 35 Min'
    },
    'homs': {
      nameAr: 'حمص',
      nameEn: 'Homs',
      descAr: 'نقطة ارتكاز لوجستية مركزية تربط الشمال بالجنوب والساحل، مع فرق استجابة سريعة وشاحنات نقل بين المحافظات.',
      descEn: 'Strategic central transit node connecting North, South, and Coast with rapid technical support backup.',
      fleetAr: 'شاحنات قوافل مايتي، فانات نقل جماعي، وسيارات دفع رباعي',
      fleetEn: 'Mighty Convoy Trucks, Passenger Vans, 4WD Field Units',
      responseAr: 'أقل من 30 دقيقة',
      responseEn: '< 30 Min'
    },
    'hama': {
      nameAr: 'حماة',
      nameEn: 'Hama',
      descAr: 'خطوط إمداد وتنقلات زراعية وتنموية، ومحطة تزويد وصيانة للمركبات والشاحنات العابرة في وسط سوريا.',
      descEn: 'Agricultural and developmental transport lines, field teams transit, and scheduled fleet maintenance.',
      fleetAr: 'فانات نقل كوادر، شاحنات توزيع بورتر، وسيارات ميدانية',
      fleetEn: 'Staff Vans, Porter Distribution Trucks, Field Cars',
      responseAr: 'أقل من 45 دقيقة',
      responseEn: '< 45 Min'
    },
    'latakia': {
      nameAr: 'اللاذقية',
      nameEn: 'Latakia',
      descAr: 'مركز تشغيل ساحلي متكامل، خدمات الشحن من وإلى المرفأ، واللوجستيات الإغاثية والتجارية للمنظمات والشركات.',
      descEn: 'Primary maritime seaport hub, coastal humanitarian logistics, port cargo transfers, and executive travel.',
      fleetAr: 'شاحنات شحن وتفريغ، فانات H-1، وسيارات دفع رباعي وسيدان',
      fleetEn: 'Port Freight Trucks, H-1 Vans, 4WD SUVs & Sedans',
      responseAr: 'أقل من 35 دقيقة',
      responseEn: '< 35 Min'
    },
    'tartus': {
      nameAr: 'طرطوس',
      nameEn: 'Tartus',
      descAr: 'خدمة المرفأ والمارينا، نقل الشحنات البحرية، وبرامج الدعم المجتمعي والوفود الساحلية.',
      descEn: 'Maritime port logistics, commercial freight, seaside humanitarian projects, and coastal transport.',
      fleetAr: 'شاحنات نقل بضائع مايتي، شاحنات بورتر مبردة، وفانات',
      fleetEn: 'Mighty Cargo Trucks, Porter Refrig Trucks, Vans',
      responseAr: 'أقل من 35 دقيقة',
      responseEn: '< 35 Min'
    },
    'idlib': {
      nameAr: 'إدلب',
      nameEn: 'Idlib',
      descAr: 'تأمين قوافل الإغاثة، فانات الفرق الميدانية، وشاحنات توزيع المساعدات والمستلزمات الطبية والغذائية.',
      descEn: 'Dedicated humanitarian relief fleets, mobile clinic logistics, and supply distribution convoys.',
      fleetAr: 'فانات مهام إنسانية H-1، شاحنات بورتر، وسنتافيه 4WD',
      fleetEn: 'Humanitarian H-1 Vans, Porter Trucks, Santa Fe 4WD',
      responseAr: 'أقل من 45 دقيقة',
      responseEn: '< 45 Min'
    },
    'daraa': {
      nameAr: 'درعا',
      nameEn: 'Daraa',
      descAr: 'تغطية كاملة للمنطقة الجنوبية، دعم برامج الاستقرار والمشاريع التنموية والشحن الزراعي والتجاري.',
      descEn: 'Southern corridor operations, border logistics support, agricultural transport, and INGO field staff.',
      fleetAr: 'فانات ركاب، شاحنات نقل خفيف بورتر، وسيارات ميدانية',
      fleetEn: 'Passenger Vans, Porter Light Trucks, Field 4WD',
      responseAr: 'أقل من 40 دقيقة',
      responseEn: '< 40 Min'
    },
    'suwayda': {
      nameAr: 'السويداء',
      nameEn: 'As-Suwayda',
      descAr: 'تنقلات آمنة ومريحة، سيارات دفع رباعي للطرق الجبلية والوعرة، وشاحنات نقل البضائع والمشاريع التنموية.',
      descEn: 'Southern executive mobility, community relief transport, and dependable 4WD field supply lines.',
      fleetAr: 'سنتافيه 4WD جبلية، فانات H-1، وشاحنات توزيع بورتر',
      fleetEn: 'Mountain-ready Santa Fe 4WD, H-1 Vans, Porter Trucks',
      responseAr: 'أقل من 45 دقيقة',
      responseEn: '< 45 Min'
    },
    'quneitra': {
      nameAr: 'القنيطرة',
      nameEn: 'Quneitra',
      descAr: 'خدمة المناطق الريفية المفتوحة، سيارات دفع رباعي للمهام الميدانية وفرق المتابعة والتقييم للمنظمات.',
      descEn: 'Southwestern terrain transit, specialized rural development transport, and reliable 4WD support.',
      fleetAr: 'سيارات دفع رباعي سنتافيه، فانات كوادر، وشاحنات خفيفة',
      fleetEn: 'Santa Fe 4WD SUVs, Field Vans, Light Trucks',
      responseAr: 'أقل من 45 دقيقة',
      responseEn: '< 45 Min'
    },
    'deirezzor': {
      nameAr: 'دير الزور',
      nameEn: 'Deir ez-Zor',
      descAr: 'قوافل الشحن الثقيل على المحور الشرقي، شاحنات مايتي، ودعم المنظمات الإنسانية على ضفاف الفرات.',
      descEn: 'Eastern regional logistics, long-haul supply convoys, energy sector transport, and relief missions.',
      fleetAr: 'شاحنات مايتي حمولة ثقيلة، سيارات دفع رباعي مجهزة، وفانات',
      fleetEn: 'Heavy Duty Mighty Trucks, Equipped 4WDs, Vans',
      responseAr: 'أقل من 50 دقيقة',
      responseEn: '< 50 Min'
    },
    'raqqa': {
      nameAr: 'الرقة',
      nameEn: 'Raqqa',
      descAr: 'لوجستيات التعافي المجتمعي، فانات وكوادر المنظمات، وتوزيع الإمدادات الغذائية والطبية عبر شاحنات مجهزة.',
      descEn: 'Euphrates corridor humanitarian logistics, food security transport, and community recovery projects.',
      fleetAr: 'شاحنات نقل إغاثي بورتر ومايتي، فانات H-1، وسنتافيه',
      fleetEn: 'Porter & Mighty Relief Trucks, H-1 Vans, Santa Fe',
      responseAr: 'أقل من 45 دقيقة',
      responseEn: '< 45 Min'
    },
    'hasakah': {
      nameAr: 'الحسكة',
      nameEn: 'Al-Hasakah',
      descAr: 'تغطية الجزيرة السورية والمناطق الزراعية، شاحنات نقل ثقيل وسيارات ميدانية مجهزة لكافة الفصول والطرق.',
      descEn: 'Northeastern agricultural hub, INGO field operations, cross-governorate freight, and heavy carrier lines.',
      fleetAr: 'شاحنات مايتي قوافل، شاحنات بورتر، وسنتافيه 4WD',
      fleetEn: 'Mighty Convoy Trucks, Porter Trucks, Santa Fe 4WD',
      responseAr: 'أقل من 50 دقيقة',
      responseEn: '< 50 Min'
    }
  };

  let activeGovernorateKey = 'damascus';
  let selectedVehicleKey = 'h1';

  // DOM Elements
  const langToggleBtn = document.getElementById('langToggle');
  const mainHeader = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const rfpForm = document.getElementById('rfpForm');
  const modalVehicleSelect = document.getElementById('modalVehicleSelect');
  const modalGovSelect = document.getElementById('modalGovSelect');

  // Map Dashboard Elements
  const dashGovName = document.getElementById('dashGovName');
  const dashGovDesc = document.getElementById('dashGovDesc');
  const dashFleetVal = document.getElementById('dashFleetVal');
  const dashResponseVal = document.getElementById('dashResponseVal');
  const mapTooltip = document.getElementById('mapTooltip');
  const btnDispatchDistrict = document.getElementById('btnDispatchDistrict');

  // Apply Language & Translations
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('rammah_lang', lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    const dict = window.translations[lang];
    if (!dict) return;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Translate Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Update Lang button text
    if (langToggleBtn) {
      langToggleBtn.innerHTML = (lang === 'ar') 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> English` 
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> العربية`;
    }
    const drawerLangToggle = document.getElementById('drawerLangToggle');
    if (drawerLangToggle) {
      drawerLangToggle.innerHTML = (lang === 'ar')
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> English`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> العربية`;
    }

    // Refresh Map Dashboard Display with current language
    updateGovernorateDisplay(activeGovernorateKey);
  }

  // Language Toggle Event
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = (currentLang === 'ar') ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }
  const drawerLangToggle = document.getElementById('drawerLangToggle');
  if (drawerLangToggle) {
    drawerLangToggle.addEventListener('click', () => {
      const newLang = (currentLang === 'ar') ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }

  // Header Scroll State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && mobileDrawer && closeDrawerBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });

    closeDrawerBtn.addEventListener('click', () => {
      closeDrawer();
    });

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', () => {
        closeDrawer();
      });
    }

    document.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.querySelectorAll('.mobile-drawer .trigger-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // Fleet Category Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Service Tabs in Quick Booking
  let activeQuickServiceTab = 'with-driver';
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeQuickServiceTab = btn.getAttribute('data-tab') || 'with-driver';
    });
  });

  // ===================================================================
  // Interactive Syria Map Engine (14 Governorates)
  // ===================================================================
  // Map Pin Coordinates in 670.92 x 590.26 SVG ViewBox
  const govPinCoords = {
    'damascus': { x: 67, y: 449 },
    'rifdimashq': { x: 110, y: 435 },
    'aleppo': { x: 205, y: 129 },
    'homs': { x: 197, y: 334 },
    'hama': { x: 117, y: 234 },
    'latakia': { x: 41, y: 194 },
    'tartus': { x: 48, y: 279 },
    'idlib': { x: 109, y: 174 },
    'daraa': { x: 54, y: 519 },
    'suwayda': { x: 113, y: 534 },
    'quneitra': { x: 23, y: 504 },
    'deirezzor': { x: 453, y: 244 },
    'raqqa': { x: 314, y: 144 },
    'hasakah': { x: 520, y: 94 }
  };

  const syriaSvgWrapper = document.querySelector('.syria-svg-wrapper');

  function showGovTooltip(govKey) {
    if (!mapTooltip || !govPinCoords[govKey] || !governoratesData[govKey]) return;
    const g = governoratesData[govKey];
    const name = (currentLang === 'ar') ? g.nameAr : g.nameEn;
    const statusText = (currentLang === 'ar') ? 'تغطية نشطة 24/7' : 'Active 24/7';
    mapTooltip.innerHTML = `<span class="map-tooltip-badge">${statusText}</span> ${name}`;

    const coord = govPinCoords[govKey];
    const leftPct = (coord.x / 670.92) * 100;
    const topPct = (coord.y / 590.26) * 100;

    mapTooltip.style.left = `${leftPct.toFixed(2)}%`;
    mapTooltip.style.top = `${topPct.toFixed(2)}%`;
    mapTooltip.style.right = 'auto';
    mapTooltip.style.bottom = 'auto';
    mapTooltip.style.display = 'block';
  }

  function updateGovernorateDisplay(govKey) {
    if (!governoratesData[govKey]) return;
    activeGovernorateKey = govKey;
    const g = governoratesData[govKey];

    if (dashGovName) {
      dashGovName.textContent = (currentLang === 'ar') ? g.nameAr : g.nameEn;
    }
    if (dashGovDesc) {
      dashGovDesc.textContent = (currentLang === 'ar') ? g.descAr : g.descEn;
    }
    if (dashFleetVal) {
      dashFleetVal.textContent = (currentLang === 'ar') ? g.fleetAr : g.fleetEn;
    }
    if (dashResponseVal) {
      if (currentLang === 'ar') {
        dashResponseVal.textContent = g.responseAr || 'أقل من 30 دقيقة';
      } else {
        dashResponseVal.innerHTML = `<span dir="ltr">${g.responseEn || '< 30 Min'}</span>`;
      }
    }

    // Highlight map elements
    document.querySelectorAll('.gov-path').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-gov') === govKey);
    });

    document.querySelectorAll('.gov-pin').forEach(pin => {
      pin.classList.toggle('active', pin.getAttribute('data-gov') === govKey);
    });

    document.querySelectorAll('.gov-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-gov') === govKey);
    });

    // If modal governorate select exists, sync it
    if (modalGovSelect) {
      modalGovSelect.value = govKey;
    }

    // Anchor the tooltip directly over the governorate pin
    showGovTooltip(govKey);
  }

  // Map Hover & Click Handlers
  function handleGovHover(govKey) {
    if (!governoratesData[govKey]) return;
    updateGovernorateDisplay(govKey);
  }

  document.querySelectorAll('.gov-path, .gov-pin').forEach(el => {
    const govKey = el.getAttribute('data-gov');

    el.addEventListener('mouseenter', () => handleGovHover(govKey));
    el.addEventListener('click', () => updateGovernorateDisplay(govKey));

    // Mobile touch support
    el.addEventListener('touchstart', () => {
      updateGovernorateDisplay(govKey);
    }, { passive: true });
  });

  if (syriaSvgWrapper) {
    syriaSvgWrapper.addEventListener('mouseleave', () => {
      if (mapTooltip) mapTooltip.style.display = 'none';
    });
  }

  // Governorates Quick Select Pills
  document.querySelectorAll('.gov-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const govKey = btn.getAttribute('data-gov');
      updateGovernorateDisplay(govKey);
    });
  });

  // Dispatch button from Map Dashboard
  if (btnDispatchDistrict) {
    btnDispatchDistrict.addEventListener('click', () => {
      openModal('h1', activeGovernorateKey);
    });
  }

  // ===================================================================
  // Modal Open & Close Logic
  // ===================================================================
  function openModal(param1, param2) {
    let carKey = 'h1';
    let govKey = activeGovernorateKey || 'damascus';
    let duration = 'monthly';
    let entityType = 'ingo';
    let driverPref = activeQuickServiceTab || 'with-driver';

    if (typeof param1 === 'object' && param1 !== null) {
      if (param1.carKey) carKey = param1.carKey;
      if (param1.govKey) govKey = param1.govKey;
      if (param1.duration) duration = param1.duration;
      if (param1.entityType) entityType = param1.entityType;
      if (param1.driverPref) driverPref = param1.driverPref;
    } else {
      if (param1) carKey = param1;
      if (param2) govKey = param2;
    }

    if (modalVehicleSelect) {
      modalVehicleSelect.value = carKey;
    }
    if (modalGovSelect) {
      modalGovSelect.value = govKey;
    }
    const modalEntityType = document.getElementById('modalEntityType');
    if (modalEntityType) {
      modalEntityType.value = entityType;
    }
    const modalContractPeriod = document.getElementById('modalContractPeriod');
    if (modalContractPeriod) {
      modalContractPeriod.value = duration;
    }
    const modalDriverPref = document.getElementById('modalDriverPref');
    if (modalDriverPref) {
      modalDriverPref.value = driverPref;
    }

    // Smart Labor Preference logic:
    // If cargo truck (porter/mighty), default to 'required' or 'not-required'
    // If passenger car (h1, santafe, sedan), default to 'not-applicable'
    const modalLaborPref = document.getElementById('modalLaborPref');
    if (modalLaborPref) {
      if (carKey === 'porter' || carKey === 'mighty') {
        if (modalLaborPref.value === 'not-applicable') {
          modalLaborPref.value = 'required';
        }
      } else if (carKey !== 'multi') {
        modalLaborPref.value = 'not-applicable';
      }
    }

    // Reset status alert and input errors
    const modalStatusAlert = document.getElementById('modalStatusAlert');
    if (modalStatusAlert) {
      modalStatusAlert.style.display = 'none';
      modalStatusAlert.className = 'modal-status-alert';
      modalStatusAlert.textContent = '';
    }
    document.querySelectorAll('.form-control.input-error').forEach(el => el.classList.remove('input-error'));

    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const modalOrgName = document.getElementById('modalOrgName');
      if (modalOrgName) {
        setTimeout(() => modalOrgName.focus(), 150);
      }
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Update labor preference automatically when vehicle select changes
  if (modalVehicleSelect) {
    modalVehicleSelect.addEventListener('change', () => {
      const carKey = modalVehicleSelect.value;
      const modalLaborPref = document.getElementById('modalLaborPref');
      if (modalLaborPref) {
        if (carKey === 'porter' || carKey === 'mighty') {
          if (modalLaborPref.value === 'not-applicable') {
            modalLaborPref.value = 'required';
          }
        } else if (carKey !== 'multi') {
          modalLaborPref.value = 'not-applicable';
        }
      }
    });
  }

  // Connect "Request Contract Proposal" trigger buttons across page
  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carKey = btn.getAttribute('data-car-key') || 'h1';
      openModal(carKey, activeGovernorateKey);
    });
  });

  // Quick RFP Form Submit (Transfers all selected items to the pop-up modal)
  const quickRfpForm = document.getElementById('quickRfpForm');
  if (quickRfpForm) {
    quickRfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedType = document.getElementById('quickCarType')?.value || 'h1';
      const selectedArea = document.getElementById('quickOperatingArea')?.value || 'damascus';
      const selectedDuration = document.getElementById('quickDuration')?.value || 'monthly';
      const selectedEntityType = document.getElementById('quickEntityType')?.value || 'ingo';
      openModal({
        carKey: selectedType,
        govKey: selectedArea,
        duration: selectedDuration,
        entityType: selectedEntityType,
        driverPref: activeQuickServiceTab || 'with-driver'
      });
    });
  }

  // ===================================================================
  // RFQ Data Extraction, Bilingual Message Builders & Submissions
  // ===================================================================
  function buildRfqData() {
    const orgNameInput = document.getElementById('modalOrgName');
    const contactPersonInput = document.getElementById('modalContactPerson');
    const phoneInput = document.getElementById('modalPhone');
    const emailInput = document.getElementById('modalEmail');
    const statusAlert = document.getElementById('modalStatusAlert');

    const orgName = orgNameInput?.value.trim() || '';
    const contactPerson = contactPersonInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';

    // Validate required contact fields
    let hasError = false;
    let firstErrorEl = null;

    [orgNameInput, contactPersonInput, phoneInput, emailInput].forEach(inp => {
      if (inp) {
        if (!inp.value.trim()) {
          inp.classList.add('input-error');
          hasError = true;
          if (!firstErrorEl) firstErrorEl = inp;
        } else {
          inp.classList.remove('input-error');
        }
      }
    });

    if (hasError) {
      if (statusAlert) {
        statusAlert.className = 'modal-status-alert error';
        statusAlert.textContent = (currentLang === 'ar')
          ? 'يرجى تعبئة الحقول الأساسية المطلوبة (اسم الجهة، مسؤول التواصل، رقم الهاتف، والبريد الإلكتروني).'
          : 'Please complete all required fields (Organization Name, Focal Point, Phone, and Email).';
        statusAlert.style.display = 'block';
      }
      if (firstErrorEl) firstErrorEl.focus();
      return null;
    }

    const entityTypeKey = document.getElementById('modalEntityType')?.value || 'ingo';
    const carKey = modalVehicleSelect?.value || 'h1';
    const govKey = modalGovSelect?.value || activeGovernorateKey || 'damascus';
    const fleetCount = document.getElementById('modalFleetCount')?.value || '1';
    const durationKey = document.getElementById('modalContractPeriod')?.value || 'monthly';
    const driverPrefKey = document.getElementById('modalDriverPref')?.value || 'with-driver';
    const laborPrefKey = document.getElementById('modalLaborPref')?.value || 'not-applicable';
    const notes = document.getElementById('modalNotes')?.value.trim() || '';

    // Localized Sector / Entity Type
    const entityTypeMap = {
      'ingo': { ar: 'منظمة إنسانية دولية / محلية (INGO / NGO)', en: 'Humanitarian INGO / Local NGO' },
      'corp': { ar: 'شركة خاصة / منشأة تجارية', en: 'Private Enterprise / Commercial Entity' },
      'gov': { ar: 'جهة أو وزارة حكومية / بعثة رسمية', en: 'Government Entity / Official Delegation' }
    };
    const entityTypeName = entityTypeMap[entityTypeKey] ? entityTypeMap[entityTypeKey][currentLang] : entityTypeKey;

    // Localized Vehicle Name
    const carName = (currentLang === 'ar') 
      ? (fleetData[carKey]?.nameAr || carKey) 
      : (fleetData[carKey]?.nameEn || carKey);

    // Localized Governorate Name
    const govName = governoratesData[govKey]
      ? ((currentLang === 'ar') ? governoratesData[govKey].nameAr : governoratesData[govKey].nameEn)
      : govKey;

    // Localized Contract Duration
    const durationMap = {
      'monthly': { ar: 'عقد شهري (1 إلى 6 أشهر)', en: 'Monthly Term (1 to 6 Months)' },
      'annual': { ar: 'عقد سنوي قابل للتجديد (12 شهراً فأكثر)', en: 'Annual Renewable Term (12+ Months)' },
      'project': { ar: 'عقد مخصص لمشروع إنساني / تنموي', en: 'Custom Project / Mission Duration' }
    };
    const durationName = durationMap[durationKey] ? durationMap[durationKey][currentLang] : durationKey;

    // Localized Driver Preference / Contract Category
    const driverPrefMap = {
      'with-driver': { ar: 'عقود مع سائقين معتمدين ومخصصين', en: 'With Dedicated Certified Driver(s)' },
      'without-driver': { ar: 'عقود بدون سائق (تشغيل ذاتي للمنظمة)', en: 'Without Driver (Self-Managed Fleet)' },
      'project-based': { ar: 'عقود مخصصة للمشاريع والبعثات الميدانية', en: 'Project & Mission-Dedicated Flexible Contract' }
    };
    const driverPrefName = driverPrefMap[driverPrefKey] ? driverPrefMap[driverPrefKey][currentLang] : driverPrefKey;

    // Localized Labor Preference
    const laborPrefMap = {
      'not-applicable': { ar: 'غير منطبق (N/A - الخدمة غير مطلوبة أو المركبة ليست شاحنة)', en: 'Not Applicable (N/A - Non-Cargo Vehicle or Not Needed)' },
      'not-required': { ar: 'شاحنة فقط (التحميل والتنزيل بمعرفة المنظمة)', en: 'Truck Only (Loading Handled by Client)' },
      'required': { ar: 'مطلوب طاقم عمال تحميل وتنزيل معتمد مع الشاحنة', en: 'Required: Certified Loading & Unloading Crew with Truck' }
    };
    const laborPrefName = laborPrefMap[laborPrefKey] ? laborPrefMap[laborPrefKey][currentLang] : laborPrefKey;

    return {
      orgName,
      entityTypeName,
      contactPerson,
      phone,
      email,
      carName,
      fleetCount,
      govName,
      durationName,
      driverPrefName,
      laborPrefName,
      notes
    };
  }

  // Format WhatsApp Message (Bilingual)
  function formatWhatsAppMessage(data) {
    if (currentLang === 'ar') {
      return `مرحباً شركة رماح ترافيل (Rammah Travel)،\n` +
             `نود تقديم طلب استدراج عروض أسعار لعقد أسطول / شاحنات في سوريا بالبيانات التالية:\n\n` +
             `📋 بيانات المنشأة ومسؤول التواصل:\n` +
             `• اسم المنظمة / الجهة: ${data.orgName}\n` +
             `• نوع المنشأة / القطاع: ${data.entityTypeName}\n` +
             `• مسؤول التواصل: ${data.contactPerson}\n` +
             `• هاتف / واتساب: ${data.phone}\n` +
             `• البريد الإلكتروني: ${data.email}\n\n` +
             `🚛 تفاصيل الأسطول والتعاقد:\n` +
             `• طراز المركبة أو الشاحنة: ${data.carName}\n` +
             `• عدد الوحدات المطلوبة: ${data.fleetCount}\n` +
             `• المحافظة ونطاق العمل الأساسي: ${data.govName}\n` +
             `• مدة التعاقد التقديرية: ${data.durationName}\n` +
             `• تفضيل السائقين: ${data.driverPrefName}\n` +
             `• خدمة عمال التحميل والتنزيل: ${data.laborPrefName}\n\n` +
             (data.notes ? `📝 تفاصيل ونطاق العمل الميداني:\n${data.notes}\n\n` : '') +
             `يرجى موافاتنا بالعرض الفني والمالي وشروط التعاقد. شكراً جزيلاً.`;
    } else {
      return `Hello Rammah Travel Fleet Contracting Syria,\n` +
             `We would like to submit an official Request for Quotation (RFQ) for fleet / truck contracting in Syria with the following details:\n\n` +
             `📋 Organization & Contact Details:\n` +
             `• Organization / Company: ${data.orgName}\n` +
             `• Sector / Entity Type: ${data.entityTypeName}\n` +
             `• Focal Point / Contact Person: ${data.contactPerson}\n` +
             `• Phone / WhatsApp: ${data.phone}\n` +
             `• Official Email: ${data.email}\n\n` +
             `🚛 Fleet & Operational Requirements:\n` +
             `• Vehicle / Truck Model: ${data.carName}\n` +
             `• Number of Units: ${data.fleetCount}\n` +
             `• Primary Target Governorate: ${data.govName}\n` +
             `• Expected Contract Term: ${data.durationName}\n` +
             `• Driver Preference: ${data.driverPrefName}\n` +
             `• Loading & Unloading Labor: ${data.laborPrefName}\n\n` +
             (data.notes ? `📝 Operational Notes & Scope of Work:\n${data.notes}\n\n` : '') +
             `Please provide us with your formal technical and commercial proposal. Thank you.`;
    }
  }

  // Format Email Subject and Body (Bilingual)
  function formatEmailPayload(data) {
    let subject = '';
    let body = '';

    if (currentLang === 'ar') {
      subject = `طلب استدراج عروض وأسعار أسطول في سوريا - ${data.orgName} - ${data.carName}`;
      body = `السادة إدارة العقود والعمليات في شركة رماح ترافيل المحترمين،\n\n` +
             `تحية طيبة وبعد،\n\n` +
             `نود إرسال طلب استدراج عروض وأسعار لتعاقد وتشغيل أسطول مركبات / شاحنات في سوريا وفق المعطيات التالية:\n\n` +
             `1. بيانات المنشأة وجهة التواصل:\n` +
             `   - اسم المنظمة / الشركة: ${data.orgName}\n` +
             `   - نوع المنشأة / القطاع: ${data.entityTypeName}\n` +
             `   - مسؤول التواصل: ${data.contactPerson}\n` +
             `   - الهاتف / الواتساب: ${data.phone}\n` +
             `   - البريد الإلكتروني: ${data.email}\n\n` +
             `2. المتطلبات التشغيلية للأسطول:\n` +
             `   - طراز المركبة أو الشاحنة: ${data.carName}\n` +
             `   - عدد المركبات / الشاحنات: ${data.fleetCount}\n` +
             `   - المحافظة ونطاق العمل الأساسي: ${data.govName}\n` +
             `   - مدة التعاقد المتوقعة: ${data.durationName}\n` +
             `   - تفضيل السائقين وفئة التعاقد: ${data.driverPrefName}\n` +
             `   - خدمة عمال تحميل وتنزيل الشاحنات والبضائع: ${data.laborPrefName}\n\n` +
             (data.notes ? `3. تفاصيل ونطاق العمل الميداني:\n   ${data.notes}\n\n` : '') +
             `نرجو منكم موافاتنا بالعرض الفني والمالي وجدول الصيانة والدعم في أقرب وقت.\n\n` +
             `مع خالص التحية والتقدير،\n` +
             `${data.contactPerson}\n` +
             `${data.orgName}\n` +
             `${data.phone}`;
    } else {
      subject = `RFQ / Fleet Contracting Proposal Syria - ${data.orgName} - ${data.carName}`;
      body = `Dear Rammah Travel Operations & Commercial Team,\n\n` +
             `We would like to submit an official Request for Quotation (RFQ) for vehicle fleet and cargo truck contracting in Syria:\n\n` +
             `1. Organization & Contact Information:\n` +
             `   - Organization / Entity: ${data.orgName}\n` +
             `   - Sector / Entity Type: ${data.entityTypeName}\n` +
             `   - Focal Point: ${data.contactPerson}\n` +
             `   - Phone / WhatsApp: ${data.phone}\n` +
             `   - Official Email: ${data.email}\n\n` +
             `2. Fleet & Contracting Specifications:\n` +
             `   - Vehicle / Truck Model: ${data.carName}\n` +
             `   - Quantity / Units: ${data.fleetCount}\n` +
             `   - Primary Operating Governorate: ${data.govName}\n` +
             `   - Expected Contract Term: ${data.durationName}\n` +
             `   - Driver Service Preference: ${data.driverPrefName}\n` +
             `   - Cargo Loading / Unloading Labor: ${data.laborPrefName}\n\n` +
             (data.notes ? `3. Scope of Work & Operational Notes:\n   ${data.notes}\n\n` : '') +
             `Please review these requirements and provide us with your formal technical and commercial proposal.\n\n` +
             `Best regards,\n` +
             `${data.contactPerson}\n` +
             `${data.orgName}\n` +
             `${data.phone}`;
    }

    return { subject, body };
  }

  // Event Listeners for WhatsApp & Email Submit Buttons
  const btnSubmitWhatsApp = document.getElementById('btnSubmitWhatsApp');
  const btnSubmitEmail = document.getElementById('btnSubmitEmail');
  const modalStatusAlert = document.getElementById('modalStatusAlert');

  if (btnSubmitWhatsApp) {
    btnSubmitWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const data = buildRfqData();
      if (!data) return;

      const message = formatWhatsAppMessage(data);
      const whatsappUrl = `https://wa.me/${CONTACT_PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      if (modalStatusAlert) {
        modalStatusAlert.className = 'modal-status-alert success';
        modalStatusAlert.textContent = (currentLang === 'ar')
          ? 'تم تجهيز وتوجيه طلبك بنجاح عبر واتساب كونسيرج!'
          : 'Your RFQ request has been generated and forwarded via WhatsApp!';
        modalStatusAlert.style.display = 'block';
      }

      setTimeout(() => closeModal(), 1600);
    });
  }

  if (btnSubmitEmail) {
    btnSubmitEmail.addEventListener('click', (e) => {
      e.preventDefault();
      const data = buildRfqData();
      if (!data) return;

      const { subject, body } = formatEmailPayload(data);
      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (modalStatusAlert) {
        modalStatusAlert.className = 'modal-status-alert success';
        modalStatusAlert.textContent = (currentLang === 'ar')
          ? 'تم تجهيز مسودة البريد الإلكتروني الرسمي بنجاح!'
          : 'Official RFQ email draft has been generated successfully!';
        modalStatusAlert.style.display = 'block';
      }

      setTimeout(() => closeModal(), 1600);
    });
  }

  if (rfpForm) {
    rfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnSubmitWhatsApp) {
        btnSubmitWhatsApp.click();
      }
    });
  }

  // IntersectionObserver for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Initial application of default language & map state
  applyLanguage(currentLang);
  updateGovernorateDisplay('damascus');
});
