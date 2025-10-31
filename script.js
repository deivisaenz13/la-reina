
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración del Swiper (SIN autoplay)
    const swiper = new Swiper(".mySwiper", {
        // Efecto de carrusel 3D
        effect: "coverflow",
        
        // Configuración visual
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        
        // Efecto coverflow personalizado
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        
        // IMPORTANTE: Autoplay desactivado (comentado)
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        
        // Navegación con botones
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Paginación con puntos
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        
        // Velocidad de transición suave
        speed: 600,
        
        // Eventos del carrusel
        on: {
            // Cuando se cambia de slide
            slideChange: function() {
                console.log('Slide actual:', this.realIndex + 1);
            },
            
            // Cuando se hace click en un slide
            click: function(swiper, event) {
                // Opcional: hacer algo cuando se clickea un slide
                // console.log('Click en slide');
            }
        }
    });
    
    // ==========================================
    // 2. CONTROLES ADICIONALES DEL CARRUSEL
    // ==========================================
    
    // Control con teclado (flechas izquierda/derecha)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            swiper.slideNext();
        }
    });
    
    // Prevenir scroll del body cuando se usa el carrusel con touch
    const swiperContainer = document.querySelector('.mySwiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('touchstart', function(e) {
            // Permitir el scroll horizontal del carrusel
        }, { passive: true });
    }
    
});


// ==========================================
// 3. NAVEGACIÓN SUAVE (SMOOTH SCROLL)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcular offset para el navbar sticky
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        }
    });
});


// ==========================================
// 4. ACTIVE STATE EN NAVEGACIÓN
// ==========================================
window.addEventListener('scroll', function() {
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    
    // Detectar la sección actual
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Actualizar links activos
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href').substring(1);
        if (linkHref === currentSection) {
            link.classList.add('active');
        }
    });
});


// ==========================================
// 5. MEJORAS DE ACCESIBILIDAD
// ==========================================

// Agregar roles ARIA a los controles del carrusel
document.addEventListener('DOMContentLoaded', function() {
    
    // Botones de navegación
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    
    if (prevBtn) {
        prevBtn.setAttribute('role', 'button');
        prevBtn.setAttribute('aria-label', 'Producto anterior');
    }
    
    if (nextBtn) {
        nextBtn.setAttribute('role', 'button');
        nextBtn.setAttribute('aria-label', 'Producto siguiente');
    }
    
    // Paginación
    const pagination = document.querySelector('.swiper-pagination');
    if (pagination) {
        pagination.setAttribute('role', 'tablist');
        pagination.setAttribute('aria-label', 'Navegación de productos');
    }
    
});


// ==========================================
// 6. MANEJO DEL MENÚ MÓVIL
// ==========================================

// Cerrar menú al hacer click fuera
document.addEventListener('click', function(e) {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuToggle && menuToggle.checked) {
        // Si el click fue fuera del menú y del icono
        if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            menuToggle.checked = false;
        }
    }
});


// ==========================================
// 7. LAZY LOADING DE IMÁGENES (OPCIONAL)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observar imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


// ==========================================
// 8. FUNCIONES DE UTILIDAD
// ==========================================

/**
 * Debounce function para optimizar eventos de scroll/resize
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al scroll
const handleScroll = debounce(function() {
    // Aquí puedes agregar más funcionalidad optimizada para scroll
}, 100);

window.addEventListener('scroll', handleScroll);


// ==========================================
// 9. PERFORMANCE MONITORING (DESARROLLO)
// ==========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Solo en desarrollo
    console.log('🚀 Página cargada correctamente');
    console.log('📱 Ancho de pantalla:', window.innerWidth, 'px');
    console.log('🎨 Tema detectado:', 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Oscuro' : 'Claro'
    );
}


// ==========================================
// 10. EXPORTAR FUNCIONES (SI ES NECESARIO)
// ==========================================
// Descomentar si necesitas usar estas funciones desde otros scripts
// window.appFunctions = {
//     debounce: debounce
// };


// ==========================================
// FIN DEL SCRIPT
// ==========================================