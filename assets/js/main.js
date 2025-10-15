/*=============== MENU SHOW Y HIDDEN ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ACCORDION SKILLS ===============*/
const skillsContent = document.getElementsByClassName('skills-content'),
      skillsHeader = document.querySelectorAll('.skills-header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills-content skills-close'
    }
    if(itemClass === 'skills-content skills-close'){
        this.parentNode.className = 'skills-content skills-open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*=============== PROJECTS SWIPER  ===============*/
let swiperProjects = new Swiper(".projects-container", {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark'
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'fa-sun' : 'fa-moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light theme
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
  const icon = themeButton.querySelector('i')
  icon.classList.remove('fa-moon', 'fa-sun')
  icon.classList.add(selectedIcon === 'fa-sun' ? 'fa-sun' : 'fa-moon')
} else {
  // Se não há tema salvo, começamos com o modo escuro (ícone do sol para trocar para claro)
  const icon = themeButton.querySelector('i')
  icon.classList.remove('fa-moon')
  icon.classList.add('fa-sun')
}

// Activate / deactivate the theme manually with the button
if(themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the light theme
        document.body.classList.toggle(lightTheme)
        const icon = themeButton.querySelector('i')
        
        // Add pulse effect
        themeButton.classList.add('active-pulse')
        setTimeout(() => {
            themeButton.classList.remove('active-pulse')
        }, 1000)
        
        if(document.body.classList.contains(lightTheme)) {
            // Se está no tema claro, mostra lua para voltar ao escuro
            icon.classList.remove('fa-sun')
            icon.classList.add('fa-moon')
        } else {
            // Se está no tema escuro, mostra sol para ir ao claro
            icon.classList.remove('fa-moon')
            icon.classList.add('fa-sun')
        }
        
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.querySelector('.contact-form'),
      contactName = document.getElementById('name'),
      contactEmail = document.getElementById('email'),
      contactProject = document.getElementById('project'),
      contactMessage = document.getElementById('message')

const sendEmail = (e) => {
    e.preventDefault()
    
    // Check if the field has a value
    if(contactName.value === '' || contactEmail.value === '' || contactProject.value === '' || contactMessage.value === '') {
        // Add and remove color
        contactForm.classList.remove('color-green')
        contactForm.classList.add('color-red')

        // Show message
        alert('Preencha todos os campos!')
    } else {
        // serviceID - templateID - #form - publicKey
        // You need to create account on EmailJS and get these IDs
        
        // For now, we'll just show a success message
        contactForm.classList.add('color-green')
        contactForm.classList.remove('color-red')

        // Show message and clear fields
        alert('Mensagem enviada com sucesso! ✅')
        
        // Remove message after three seconds
        setTimeout(() => {
            contactForm.classList.remove('color-green')
        }, 3000)
        
        // Clear form fields
        contactName.value = ''
        contactEmail.value = ''
        contactProject.value = ''
        contactMessage.value = ''
    }
}

if(contactForm) {
    contactForm.addEventListener('submit', sendEmail)
}

/*=============== TYPING ANIMATION ===============*/
const typingElement = document.querySelector('.home-subtitle');
if (typingElement) {
    const texts = [
        'Desenvolvedor Full Stack & Mobile',
        'Especialista em React & React Native',
        'Expert em Node.js & C#',
        'Criador de Soluções Digitais'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeAnimation() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeAnimation, typeSpeed);
    }

    // Start the animation after page load
    window.addEventListener('load', () => {
        setTimeout(typeAnimation, 1000);
    });
}

/*=============== ANIMATE ON SCROLL ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-img, .about-data, .skills-content, .projects-content, .contact-information, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

/*=============== SKILLS PROGRESS ANIMATION ===============*/
const animateProgress = () => {
    const skillBars = document.querySelectorAll('.skills-percentage');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const percentage = bar.style.width || bar.classList[1]?.replace('skills-', '')?.replace(/[^0-9]/g, '') + '%';
            bar.style.width = percentage;
        }
    });
};

window.addEventListener('scroll', animateProgress);

/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Add entrance animation to home section
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);

// Add reveal class to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
});

/*=============== PARTICLES BACKGROUND ===============*/
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--first-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 3 + 2}s infinite linear;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
    
    .reveal {
        transform: translateY(150px);
        opacity: 0;
        transition: all 0.6s ease;
    }
    
    .reveal.active {
        transform: translateY(0);
        opacity: 1;
    }
    
    .color-red {
        border-color: #ff0000 !important;
    }
    
    .color-green {
        border-color: #00ff00 !important;
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', createParticles);
