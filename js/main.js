document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('show');
            }
        });
    }

    // Active link based on current page
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
        const href = a.getAttribute('href');
        if (href === current) {
            a.classList.add('active');
            a.setAttribute('data-active', 'true');
        }
    });

    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const onScroll = () => {
        const trigger = window.innerHeight * 0.9;
        revealEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < trigger) el.classList.add('show');
        });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Skills progress bars animation
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillProgressBars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
                bar.classList.add('animate');
            }
        });
    };

    // Check if skills section is visible and animate
    const skillsSection = document.querySelector('.skills-category');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkills, 300);
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }

    // Testimonials slider
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = slider.querySelector('.slides');
        const dots = slider.querySelectorAll('.dot');
        let index = 0;

        const go = (i) => {
            index = (i + dots.length) % dots.length;
            slides.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, di) => d.classList.toggle('active', di === index));
        };

        dots.forEach((d, di) => d.addEventListener('click', () => go(di)));
        setInterval(() => go(index + 1), 5000);
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // Back to top button
    const toTop = document.querySelector('.back-to-top');
    const onTopScroll = () => {
        if (!toTop) return;
        if (window.scrollY > 300) toTop.classList.add('show'); else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', onTopScroll, { passive: true });
    onTopScroll();
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Contact form handler (no backend)
    const form = document.querySelector('form[data-contact]');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            console.log('Contact form submitted:', data);
            form.reset();
            alert('Thanks! Your message has been recorded. Replace this with your email service.');
        });
    }

    // Interactive skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Tool cards interaction
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) rotateY(2deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
});
