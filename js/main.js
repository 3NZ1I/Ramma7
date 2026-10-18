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
  if (mobileMenuBtn && mobileDrawer && closeDrawerBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.add('open');
    });

    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });

    document.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });

    document.querySelectorAll('.mobile-drawer .trigger-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        mobileDrawer.classList.remove('open');
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
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ===================================================================
  // Interactive Syria Map Engine (14 Governorates)
  // ===================================================================
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
  }

  // Map Hover & Click Handlers
  const syriaSvgWrapper = document.querySelector('.syria-svg-wrapper');

  function handleGovHover(e, govKey) {
    if (!governoratesData[govKey]) return;
    updateGovernorateDisplay(govKey);

    if (mapTooltip && syriaSvgWrapper) {
      const g = governoratesData[govKey];
      const name = (currentLang === 'ar') ? g.nameAr : g.nameEn;
      const statusText = (currentLang === 'ar') ? 'تغطية نشطة 24/7' : 'Active 24/7 Coverage';
      mapTooltip.innerHTML = `<span class="map-tooltip-badge">${statusText}</span> ${name}`;
      mapTooltip.style.display = 'block';

      // Position tooltip relative to wrapper container
      const rect = syriaSvgWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mapTooltip.style.left = `${x}px`;
      mapTooltip.style.top = `${y}px`;
    }
  }

  document.querySelectorAll('.gov-path, .gov-pin').forEach(el => {
    const govKey = el.getAttribute('data-gov');

    el.addEventListener('mouseenter', (e) => handleGovHover(e, govKey));
    el.addEventListener('mousemove', (e) => handleGovHover(e, govKey));

    el.addEventListener('mouseleave', () => {
      if (mapTooltip) mapTooltip.style.display = 'none';
    });

    el.addEventListener('click', () => {
      updateGovernorateDisplay(govKey);
    });

    // Mobile touch support
    el.addEventListener('touchstart', (e) => {
      updateGovernorateDisplay(govKey);
    }, { passive: true });
  });

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
  function openModal(carKey, govKey) {
    if (carKey && fleetData[carKey]) {
      selectedVehicleKey = carKey;
      if (modalVehicleSelect) {
        modalVehicleSelect.value = carKey;
      }
    }
    if (govKey && modalGovSelect) {
      modalGovSelect.value = govKey;
    }
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
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

  // Connect "Request Contract Proposal" buttons
  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carKey = btn.getAttribute('data-car-key') || 'h1';
      openModal(carKey, activeGovernorateKey);
    });
  });

  // Quick RFP Form Submit
  const quickRfpForm = document.getElementById('quickRfpForm');
  if (quickRfpForm) {
    quickRfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedType = document.getElementById('quickCarType')?.value || 'h1';
      const selectedArea = document.getElementById('quickOperatingArea')?.value || 'damascus';
      openModal(selectedType, selectedArea);
    });
  }

  // Modal RFP WhatsApp & Email Submission
  if (rfpForm) {
    rfpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const orgName = document.getElementById('modalOrgName')?.value || '';
      const contactPerson = document.getElementById('modalContactPerson')?.value || '';
      const phone = document.getElementById('modalPhone')?.value || '';
      const email = document.getElementById('modalEmail')?.value || '';
      const carKey = modalVehicleSelect?.value || 'h1';
      const fleetCount = document.getElementById('modalFleetCount')?.value || '1';
      const contractPeriod = document.getElementById('modalContractPeriod')?.value || 'Monthly';
      const driverPreference = document.getElementById('modalDriverPref')?.value || 'With Driver';
      const selectedGov = modalGovSelect?.value || activeGovernorateKey;
      const govName = governoratesData[selectedGov] ? ((currentLang === 'ar') ? governoratesData[selectedGov].nameAr : governoratesData[selectedGov].nameEn) : selectedGov;
      const operationalNotes = document.getElementById('modalNotes')?.value || '';

      const carName = (currentLang === 'ar') ? fleetData[carKey]?.nameAr : fleetData[carKey]?.nameEn;

      let message = '';
      if (currentLang === 'ar') {
        message = `مرحباً شركة رماح ترافيل (Rammah Travel)، نود طلب استدراج عرض أسعار لعقد أسطول / شاحنات في سوريا:\n\n` +
                  `🏢 اسم الجهة / المنظمة / الشركة: ${orgName}\n` +
                  `👤 مسؤول التواصل: ${contactPerson}\n` +
                  `📱 هاتف التواصل: ${phone}\n` +
                  `✉️ البريد الرسمي: ${email}\n` +
                  `🚗 طراز المركبة أو الشاحنة: ${carName}\n` +
                  `🔢 عدد المركبات / الشاحنات: ${fleetCount}\n` +
                  `📍 المحافظة الأساسية المستهدفة: ${govName}\n` +
                  `📅 مدة التعاقد التقديرية: ${contractPeriod}\n` +
                  `👨‍✈️ خيار السائق: ${driverPreference}\n` +
                  (operationalNotes ? `📝 تفاصيل ونطاق العمل الميداني: ${operationalNotes}\n\n` : `\n`) +
                  `يرجى موافاتنا بالعرض الفني والمالي وشروط التعاقد. شكراً جزيلاً.`;
      } else {
        message = `Hello Rammah Travel Fleet Contracting, We would like to request an official RFP / Contract Proposal in Syria:\n\n` +
                  `🏢 Organization / Company: ${orgName}\n` +
                  `👤 Focal Point / Contact: ${contactPerson}\n` +
                  `📱 Contact Phone: ${phone}\n` +
                  `✉️ Official Email: ${email}\n` +
                  `🚗 Vehicle / Truck Model: ${carName}\n` +
                  `🔢 Number of Units: ${fleetCount}\n` +
                  `📍 Primary Target Governorate: ${govName}\n` +
                  `📅 Expected Contract Term: ${contractPeriod}\n` +
                  `👨‍✈️ Driver Service: ${driverPreference}\n` +
                  (operationalNotes ? `📝 Operational Notes: ${operationalNotes}\n\n` : `\n`) +
                  `Please provide us with your technical and commercial proposal. Thank you.`;
      }

      const whatsappUrl = `https://wa.me/${CONTACT_PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      closeModal();
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
