/* ===================================================================
   RAMMAH TRAVEL - CORE LOGIC & INTERACTION ENGINE
   Enterprise, INGO & Government Fleet Contracting (Syria)
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
    'sedan': { nameEn: 'Hyundai Corporate Sedans (Elantra / Sonata)', nameAr: 'هيونداي سيدان للشركات والمنظمات (إلنترا / سوناتا)' },
    'multi': { nameEn: 'Mixed Integrated Fleet (Multi-Vehicle)', nameAr: 'أسطول متكامل ومختلط (عدة مركبات)' }
  };

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
  }

  // Language Toggle Event
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
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

  // Modal Open & Close Logic
  function openModal(carKey) {
    if (carKey && fleetData[carKey]) {
      selectedVehicleKey = carKey;
      if (modalVehicleSelect) {
        modalVehicleSelect.value = carKey;
      }
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
      openModal(carKey);
    });
  });

  // Quick RFP Form Submit
  const quickRfpForm = document.getElementById('quickRfpForm');
  if (quickRfpForm) {
    quickRfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedType = document.getElementById('quickCarType')?.value || 'h1';
      openModal(selectedType);
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
      const operationalNotes = document.getElementById('modalNotes')?.value || '';

      const carName = (currentLang === 'ar') ? fleetData[carKey]?.nameAr : fleetData[carKey]?.nameEn;

      let message = '';
      if (currentLang === 'ar') {
        message = `مرحباً شركة رماح ترافيل (Rammah Travel)، نود طلب استدراج عرض أسعار لعقد أسطول مركبات في سوريا:\n\n` +
                  `🏢 اسم الجهة / المنظمة / الشركة: ${orgName}\n` +
                  `👤 مسؤول التواصل: ${contactPerson}\n` +
                  `📱 هاتف التواصل: ${phone}\n` +
                  `✉️ البريد الرسمي: ${email}\n` +
                  `🚗 طراز المركبة المطلوب: ${carName}\n` +
                  `🔢 عدد المركبات المطلوبة: ${fleetCount}\n` +
                  `📅 مدة التعاقد التقديرية: ${contractPeriod}\n` +
                  `👨‍✈️ خيار السائق: ${driverPreference}\n` +
                  (operationalNotes ? `📝 تفاصيل ونطاق العمل: ${operationalNotes}\n\n` : `\n`) +
                  `يرجى موافاتنا بالعرض الفني والمالي وشروط التعاقد. شكراً جزيلاً.`;
      } else {
        message = `Hello Rammah Travel Fleet Contracting, We would like to request an official RFP / Contract Proposal in Syria:\n\n` +
                  `🏢 Organization / Company: ${orgName}\n` +
                  `👤 Focal Point / Contact: ${contactPerson}\n` +
                  `📱 Contact Phone: ${phone}\n` +
                  `✉️ Official Email: ${email}\n` +
                  `🚗 Vehicle Model: ${carName}\n` +
                  `🔢 Number of Units: ${fleetCount}\n` +
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

  // Initial application of default language
  applyLanguage(currentLang);
});
