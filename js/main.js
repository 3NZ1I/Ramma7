/* ===================================================================
   RAMMAH TRAVEL - CORE LOGIC & INTERACTION ENGINE
   Enterprise & Luxury Car Rental Syria
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let currentLang = localStorage.getItem('rammah_lang') || 'ar'; // Default Arabic for Syrian market
  let currentCurrency = localStorage.getItem('rammah_currency') || 'USD';
  const exchangeRateUSD_SYP = 14800; // Syrian Pound indicative market rate

  // Fleet Base Pricing in USD/day
  const fleetPricing = {
    'maybach': { usd: 650, nameEn: 'Mercedes-Maybach S680', nameAr: 'مرسيدس-مايباخ S680' },
    'rangerover': { usd: 450, nameEn: 'Range Rover Autobiography', nameAr: 'رينج روفر أوتوبيوغرافي' },
    'escalade': { usd: 500, nameEn: 'Cadillac Escalade Sport Platinum', nameAr: 'كاديلاك إسكاليد سبورت بلاتينيوم' },
    'vipvan': { usd: 400, nameEn: 'Mercedes-Benz V-Class Maybach VIP', nameAr: 'مرسيدس-بنز V-Class تعديل مايباخ VIP' }
  };

  let selectedVehicleKey = 'maybach';

  // DOM Elements
  const langToggleBtn = document.getElementById('langToggle');
  const currencyToggleBtn = document.getElementById('currencyToggle');
  const mainHeader = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalVehicleSelect = document.getElementById('modalVehicleSelect');
  const modalDaysInput = document.getElementById('modalDaysInput');
  const addonAirportCheck = document.getElementById('addonAirport');
  const addonArmoredCheck = document.getElementById('addonArmored');

  // Summary Elements
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDuration = document.getElementById('summaryDuration');
  const summaryAddons = document.getElementById('summaryAddons');
  const summaryTotal = document.getElementById('summaryTotal');

  // Format Currency
  function formatMoney(amountUSD) {
    if (currentCurrency === 'SYP') {
      const sypAmount = Math.round(amountUSD * exchangeRateUSD_SYP);
      return sypAmount.toLocaleString() + (currentLang === 'ar' ? ' ل.س' : ' SYP');
    } else {
      return '$' + amountUSD.toLocaleString();
    }
  }

  // Update All Rates in Fleet Cards
  function updateFleetPricesDisplay() {
    document.querySelectorAll('.fleet-card').forEach(card => {
      const carKey = card.getAttribute('data-car-key');
      const badge = card.querySelector('.rate-value');
      if (badge && fleetPricing[carKey]) {
        badge.textContent = formatMoney(fleetPricing[carKey].usd);
      }
    });
    updateModalSummary();
  }

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

    updateFleetPricesDisplay();
  }

  // Language Toggle Event
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = (currentLang === 'ar') ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }

  // Currency Toggle Event
  if (currencyToggleBtn) {
    currencyToggleBtn.addEventListener('click', () => {
      currentCurrency = (currentCurrency === 'USD') ? 'SYP' : 'USD';
      localStorage.setItem('rammah_currency', currentCurrency);
      currencyToggleBtn.textContent = (currentCurrency === 'USD') ? 'USD ($)' : (currentLang === 'ar' ? 'ل.س (SYP)' : 'SYP (ل.س)');
      updateFleetPricesDisplay();
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
    mobileMenuBtn.addEventListener('click', () => {
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

  // Modal Open & Calculation Logic
  function openModal(carKey) {
    if (carKey && fleetPricing[carKey]) {
      selectedVehicleKey = carKey;
      if (modalVehicleSelect) {
        modalVehicleSelect.value = carKey;
      }
    }
    updateModalSummary();
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

  // Connect "Book a Vehicle" buttons
  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carKey = btn.getAttribute('data-car-key') || 'maybach';
      openModal(carKey);
    });
  });

  // Quick Booking Form Submit
  const quickBookingForm = document.getElementById('quickBookingForm');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedType = document.getElementById('quickCarType')?.value || 'maybach';
      openModal(selectedType);
    });
  }

  // Update Modal Pricing Summary
  function updateModalSummary() {
    const carKey = modalVehicleSelect ? modalVehicleSelect.value : selectedVehicleKey;
    const baseDailyRate = fleetPricing[carKey] ? fleetPricing[carKey].usd : 500;
    const days = parseInt(modalDaysInput ? modalDaysInput.value : 1) || 1;

    let addonsUSD = 0;
    if (addonAirportCheck && addonAirportCheck.checked) addonsUSD += 100;
    if (addonArmoredCheck && addonArmoredCheck.checked) addonsUSD += 250;

    const totalEstimateUSD = (baseDailyRate * days) + addonsUSD;

    if (summarySubtotal) summarySubtotal.textContent = formatMoney(baseDailyRate);
    if (summaryDuration) summaryDuration.textContent = `${days} ${currentLang === 'ar' ? 'أيام' : 'Days'}`;
    if (summaryAddons) summaryAddons.textContent = formatMoney(addonsUSD);
    if (summaryTotal) summaryTotal.textContent = formatMoney(totalEstimateUSD);
  }

  if (modalVehicleSelect) modalVehicleSelect.addEventListener('change', updateModalSummary);
  if (modalDaysInput) modalDaysInput.addEventListener('input', updateModalSummary);
  if (addonAirportCheck) addonAirportCheck.addEventListener('change', updateModalSummary);
  if (addonArmoredCheck) addonArmoredCheck.addEventListener('change', updateModalSummary);

  // Modal WhatsApp Dispatch Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modalName')?.value || '';
      const phone = document.getElementById('modalPhone')?.value || '';
      const carKey = modalVehicleSelect?.value || 'maybach';
      const days = modalDaysInput?.value || '1';
      const carName = (currentLang === 'ar') ? fleetPricing[carKey].nameAr : fleetPricing[carKey].nameEn;
      const airportService = (addonAirportCheck && addonAirportCheck.checked) ? (currentLang === 'ar' ? 'نعم (استقبال VIP)' : 'Yes (Airport VIP)') : (currentLang === 'ar' ? 'لا' : 'No');
      const armoredService = (addonArmoredCheck && addonArmoredCheck.checked) ? (currentLang === 'ar' ? 'نعم (مرافقة أمنية وتصفيح)' : 'Yes (Armored Escort)') : (currentLang === 'ar' ? 'لا' : 'No');

      let message = '';
      if (currentLang === 'ar') {
        message = `مرحباً رماح ترافيل (Rammah Travel)، أود تأكيد حجز واستفسار تنفيذي:\n\n` +
                  `👤 الاسم / الجهة: ${name}\n` +
                  `📱 رقم التواصل: ${phone}\n` +
                  `🚗 السيارة المختارة: ${carName}\n` +
                  `📅 مدة الحجز: ${days} يوم\n` +
                  `✈️ استقبال مطار دمشق الدولي VIP: ${airportService}\n` +
                  `🛡️ حماية وتصفيح ومرافقة أمنية: ${armoredService}\n\n` +
                  `يرجى تأكيد التوافر وتفاصيل التسليم في سوريا. شكراً جزيلاً.`;
      } else {
        message = `Hello Rammah Travel Concierge, I would like to request an executive reservation:\n\n` +
                  `👤 Name / Entity: ${name}\n` +
                  `📱 Contact Phone: ${phone}\n` +
                  `🚗 Vehicle Selected: ${carName}\n` +
                  `📅 Duration: ${days} Day(s)\n` +
                  `✈️ Damascus Airport VIP Meet & Greet: ${airportService}\n` +
                  `🛡️ Armored Escort / Protection: ${armoredService}\n\n` +
                  `Please confirm vehicle availability and reservation details in Syria. Thank you.`;
      }

      const whatsappUrl = `https://wa.me/963944000888?text=${encodeURIComponent(message)}`;
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

  // Initial application of default language and prices
  applyLanguage(currentLang);
});
