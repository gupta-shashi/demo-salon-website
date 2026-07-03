/**
 * Aurae Premium Luxury Salon Studio Architecture Controller
 * Core Vanilla JS Production Script Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Core Modules
    AppLoader.init();
    UXInterface.init();
    AnimationEngine.init();
    SliderEngine.init();
    LightboxGallery.init();
    FormProcessor.init();
});

/**
 * 1. SYSTEM LOADING HANDLER
 */
const AppLoader = {
    init() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.style.display = 'none', 500);
                }, 600);
            });
        }
    }
};

/**
 * 2. CORE UX CORE LOGIC & STATE ENGINE
 */
const UXInterface = {
    init() {
        this.header = document.querySelector('.main-header');
        this.themeBtn = document.getElementById('theme-toggle');
        this.toTopBtn = document.getElementById('back-to-top');
        this.progressBar = document.getElementById('scroll-progress');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.bindEvents();
        this.initTheme();
    },

    bindEvents() {
        // Sticky Header & Progress Metric
        window.addEventListener('scroll', () => {
            this.handleScrollMetrics();
        });

        // Theme Switch Toggle
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        // Top Restructuring
        this.toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile Nav Canvas Drawer
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());

        // Close Mobile Menu on Link Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                if (this.nav.classList.contains('open')) this.toggleMobileMenu();
            });
        });

        // Micro-Interaction Ripple System Execution
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRipple(e, btn));
        });
    },

    handleScrollMetrics() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        // Dynamic Progress Update
        if (this.progressBar) this.progressBar.style.width = `${progress}%`;

        // Sticky Layout Class Injections
        if (scrollTop > 50) {
            this.header.classList.add('sticky');
        } else {
            this.header.classList.remove('sticky');
        }

        // Floating Target Activation
        if (scrollTop > 400) {
            this.toTopBtn.classList.add('show');
        } else {
            this.toTopBtn.classList.remove('show');
        }

        // Dynamic High-Precision Scrollspy Spy Engine
        const scrollPos = scrollTop + 150;
        document.querySelectorAll('section').forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                const id = section.getAttribute('id');
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },

    initTheme() {
        const activeTheme = localStorage.getItem('aurae-theme') || 'light';
        document.body.setAttribute('data-theme', activeTheme);
        this.updateThemeIcon(activeTheme);
    },

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('aurae-theme', nextTheme);
        this.updateThemeIcon(nextTheme);
    },

    updateThemeIcon(theme) {
        const icon = this.themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    },

    toggleMobileMenu() {
        this.nav.classList.toggle('open');
        this.header.classList.toggle('menu-open');
    },

    createRipple(e, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - element.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - element.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        const prevRipple = element.querySelector('.ripple');
        if (prevRipple) prevRipple.remove();

        element.appendChild(circle);
    }
};

/**
 * 3. INTERSECTION OBSERVER ANIMATION ENGINE
 */
const AnimationEngine = {
    init() {
        this.revealTargets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        this.counterTargets = document.querySelectorAll('.stat-number');
        
        this.setupObservers();
    },

    setupObservers() {
        // Elements Entry Scroll Tracking
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Fire Once Performance Strategy
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        this.revealTargets.forEach(target => revealObserver.observe(target));

        // High-Precision Metric Counters Intersection Engine
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counterTargets.forEach(counter => counterObserver.observe(counter));

        // Classic Accordion Engine Micro Logic
        document.querySelectorAll('.accordion-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.parentElement;
                const content = item.querySelector('.accordion-content');
                const isItemActive = item.classList.contains('active');
                
                // Reset Silently
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                });

                if (!isItemActive) {
                    item.classList.add('active');
                    content.style.maxHeight = `${content.scrollHeight + 20}px`;
                }
            });
        });
    },

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds execution frame
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let start = 0;
        
        const timer = setInterval(() => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
                element.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                element.textContent = start.toLocaleString() + '+';
            }
        }, stepTime);
    }
};

/**
 * 4. VANILLA TOUCH TESTIMONIALS SLIDER ENGINE
 */
const SliderEngine = {
    init() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        
        if (!this.slides.length) return;

        this.currentIndex = 0;
        this.timer = null;

        this.buildLayout();
        this.bindEvents();
        this.startAutoPlay();
    },

    buildLayout() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    },

    bindEvents() {
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });
    },

    goToSlide(index) {
        const slider = document.querySelector('.testimonial-slider');
        this.slides[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        
        slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.slides[this.currentIndex].classList.add('active');
        
        // Sync Dots state
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[this.currentIndex].classList.add('active');
    },

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    },

    startAutoPlay() {
        this.timer = setInterval(() => this.nextSlide(), 6000);
    },

    resetAutoPlay() {
        clearInterval(this.timer);
        this.startAutoPlay();
    }
};

/**
 * 5. MODULAR LIGHTBOX LOOKBOOK DYNAMIC FRAMEWORK
 */
const LightboxGallery = {
    init() {
        this.lightbox = document.getElementById('gallery-lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.caption = document.getElementById('lightbox-caption');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.galleryItems = document.querySelectorAll('.masonry-item');

        if (!this.lightbox) return;
        this.bindEvents();
    },

    bindEvents() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.querySelector('img').getAttribute('src');
                const txt = item.querySelector('.gallery-overlay span').textContent;
                
                this.lightboxImg.setAttribute('src', src);
                this.caption.textContent = txt;
                this.lightbox.style.display = 'flex';
                
                setTimeout(() => this.lightbox.classList.add('show'), 10);
                document.body.style.overflow = 'hidden'; // Lock Scroll tracking
            });
        });

        const closeMechanism = () => {
            this.lightbox.classList.remove('show');
            setTimeout(() => this.lightbox.style.display = 'none', 400);
            document.body.style.overflow = 'auto';
        };

        this.closeBtn.addEventListener('click', closeMechanism);
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) closeMechanism();
        });
    }
};

/**
 * 6. FORM PROCESSOR & CLIENT-SIDE VALIDATION ENGINE
 */
const FormProcessor = {
    init() {
        this.form = document.getElementById('booking-form');
        this.feedback = document.getElementById('form-feedback');
        
        if (!this.form) return;
        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateInputs()) {
                this.executeSubmission();
            }
        });

        // Inline instant error cleanup mechanisms
        this.form.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('input', () => {
                if (element.value.trim() !== "") {
                    element.parentElement.classList.remove('invalid');
                }
            });
        });
    },

    validateInputs() {
        let isFormValid = true;
        const name = document.getElementById('user-name');
        const phone = document.getElementById('user-phone');
        const email = document.getElementById('user-email');
        const service = document.getElementById('select-service');
        const date = document.getElementById('booking-date');
        const time = document.getElementById('booking-time');

        // Text Verification rules
        if (!name.value.trim()) { this.markInvalid(name); isFormValid = false; }
        
        // Regex Phone Formats validation rules
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
        if (!phoneRegex.test(phone.value.trim())) { this.markInvalid(phone); isFormValid = false; }

        // Clean Email structures
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) { this.markInvalid(email); isFormValid = false; }

        // Dropdowns checks
        if (!service.value) { this.markInvalid(service); isFormValid = false; }

        // Future Dates restriction engine
        if (!date.value) { 
            this.markInvalid(date); isFormValid = false; 
        } else {
            const chosenDate = new Date(date.value);
            const today = new Date();
            today.setHours(0,0,0,0);
            if(chosenDate < today) {
                this.markInvalid(date); isFormValid = false;
            }
        }

        if (!time.value) { this.markInvalid(time); isFormValid = false; }

        return isFormValid;
    },

    markInvalid(element) {
        element.parentElement.classList.add('invalid');
    },

    executeSubmission() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing Luxury Allocation...";

        // Simulate secure async network submission latency
        setTimeout(() => {
            this.form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Reservation Request";
            
            this.feedback.className = "form-feedback success";
            this.feedback.innerHTML = `<strong>Reservation Request Received!</strong><br>Our concierge team will review the itinerary schedule and transmit confirmation via SMS / Email within 15 minutes.`;
            
            setTimeout(() => this.feedback.className = "form-feedback hidden", 8000);
        }, 2200);
    }
};