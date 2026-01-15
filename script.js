document.addEventListener('DOMContentLoaded', () => {
    
    
    const images = ['spor1.webp', 'spor2.webp', 'spor3.webp', 'spor4.webp', 'spor5.webp', 'spor6.webp', 'spor7.webp'];
    const wrapper = document.getElementById('gallery-wrapper');
    const slider = document.querySelector('.gallery-flow');

    if (wrapper) {
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'gallery-item';
            wrapper.appendChild(img);
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScroll;

    const startAutoScroll = () => {
        if (autoScroll) clearInterval(autoScroll);
        
        autoScroll = setInterval(() => {
            if (!isDown && slider) { 
                slider.scrollLeft += 1; 
                
                if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1)) {
                    slider.scrollLeft = 0;
                }
            }
        }, 20); 
    };

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            clearInterval(autoScroll); 
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoScroll(); 
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoScroll(); 
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        startAutoScroll();
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});