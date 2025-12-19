// Internacionalização
const translations = {
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            skills: 'Habilidades',
            projects: 'Projetos',
            contact: 'Contato'
        },
        home: {
            greeting: 'Olá, eu sou',
            role: 'Aspirante a Dev da Turma 7 do <a href="https://www.alphaedtech.org.br/" target="_blank" class="alpha-link">Alpha Edtech</a>',
            tagline: 'Transformo ideias em experiências digitais únicas.'
        },
        about: {
            title: 'Sobre Mim',
            p1: 'Tenho 18 anos e sou apaixonado por tecnologia e design. Acredito no poder do código e da criatividade para criar experiências digitais significativas que fazem a diferença.',
            p2: 'Como Programador, minha missão é criar soluções que não apenas funcionem perfeitamente, mas que também encantem os usuários. Cada projeto é uma oportunidade de aprender algo novo e superar limites.'
        },
        skills: {
            title: 'Habilidades',
            frontend: 'Frontend',
            tools: 'Ferramentas'
        },
        projects: {
            title: 'Projetos',
            meta: 'Dev / Design: Pablo Felipe',
            ecopoint: {
                desc: 'Plataforma web para promover a reciclagem e sustentabilidade, conectando pessoas a pontos de coleta e informações ambientais.'
            },
            starlog: {
                desc: 'Sistema de registro e acompanhamento pessoal com interface minimalista e intuitiva.'
            },
            converter: {
                title: 'Conversor de Temperatura',
                desc: 'Ferramenta prática para conversão entre diferentes escalas de temperatura (Celsius, Fahrenheit, Kelvin).'
            },
            counter: {
                title: 'Contador',
                desc: 'Aplicativo contador simples e funcional com design clean e animações suaves.'
            },
            time: {
                title: 'Horário',
                desc: 'Interface dinâmica que exibe horário atual com mudanças visuais baseadas no período do dia.'
            }
        },
        contact: {
            title: 'Entre em Contato',
            intro: 'Tem algum projeto em mente ou quer trocar uma ideia? Fique à vontade para entrar em contato comigo!',
            email: 'Email:',
            phone: 'Telefone:',
            location: 'Localização:',
            locationValue: 'Tianguá, Ceará, Brasil',
            social: 'Redes Sociais:'
        },
        glitchText: 'Programador'
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact'
        },
        home: {
            greeting: 'Hello, I am',
            role: 'Aspiring Dev from Class 7 of <a href="https://www.alphaedtech.org.br/" target="_blank" class="alpha-link">Alpha Edtech</a>',
            tagline: 'I transform ideas into unique digital experiences.'
        },
        about: {
            title: 'About Me',
            p1: 'I am 18 years old and passionate about technology and design. I believe in the power of code and creativity to create meaningful digital experiences that make a difference.',
            p2: 'As a Developer, my mission is to create solutions that not only work perfectly, but also delight users. Each project is an opportunity to learn something new and push boundaries.'
        },
        skills: {
            title: 'Skills',
            frontend: 'Frontend',
            tools: 'Tools'
        },
        projects: {
            title: 'Projects',
            meta: 'Dev / Design: Pablo Felipe',
            ecopoint: {
                desc: 'Web platform to promote recycling and sustainability, connecting people to collection points and environmental information.'
            },
            starlog: {
                desc: 'Personal tracking and logging system with a minimalist and intuitive interface.'
            },
            converter: {
                title: 'Temperature<br>Converter',
                desc: 'Practical tool for conversion between different temperature scales (Celsius, Fahrenheit, Kelvin).'
            },
            counter: {
                title: 'Counter',
                desc: 'Simple and functional counter app with clean design and smooth animations.'
            },
            time: {
                title: 'Time',
                desc: 'Dynamic interface that displays current time with visual changes based on the time of day.'
            }
        },
        contact: {
            title: 'Get in Touch',
            intro: 'Have a project in mind or want to exchange ideas? Feel free to contact me!',
            email: 'Email:',
            phone: 'Phone:',
            location: 'Location:',
            locationValue: 'Tianguá, Ceará, Brazil',
            social: 'Social Media:'
        },
        glitchText: 'Developer'
    }
};

// Detectar idioma do navegador
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    // Se o navegador estiver em português (pt, pt-BR, pt-PT), usa português, senão inglês
    return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

// Detectar o idioma atual
const currentLang = detectLanguage();

// Elementos do DOM
const cursor = document.getElementById('custom-cursor');
const glitchElement = document.getElementById('glitch-text');

// Aplicar tradução
function applyTranslation(lang) {
    const t = translations[lang];
    
    // Atualizar todos os elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;
        
        // Navegar pelo objeto de tradução
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.innerHTML = value;
        }
    });
    
    // Atualizar o texto do glitch
    if (glitchElement) {
        glitchElement.textContent = t.glitchText;
    }
    
    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

// Inicializar idioma
applyTranslation(currentLang);

// Detectar dispositivos touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Esconder cursor customizado em dispositivos touch
if (isTouchDevice) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// Typing animation
const typingText = 'Pablo Felipe';
const typingElement = document.getElementById('typing-name');
let charIndex = 0;

function typeWriter() {
    if (charIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    } else {
        // Remove cursor after typing
        setTimeout(() => {
            typingElement.style.removeProperty('--show-cursor');
            const style = document.createElement('style');
            style.textContent = '.logo::after { display: none; }';
            document.head.appendChild(style);
            // Start glitch animation after typing ends
            setTimeout(startGlitchAnimation, 300);
        }, 500);
    }
}

// Glitch animation for tagline
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`αβγδεζηθικλμνξοπρστυφχψω';

function startGlitchAnimation() {
    // Usar o texto traduzido do glitch
    const glitchText = translations[currentLang].glitchText;
    const letters = glitchText.split('');
    const revealed = new Array(letters.length).fill(false);
    let iterations = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
        glitchElement.textContent = letters.map((letter, index) => {
            if (revealed[index]) {
                return letter;
            }
            
            if (letter === ' ') {
                revealed[index] = true;
                return ' ';
            }
            
            // Progressivamente revela as letras
            if (iterations > index) {
                revealed[index] = true;
                return letter;
            }
            
            // Mostra símbolos aleatórios
            return symbols[Math.floor(Math.random() * symbols.length)];
        }).join('');
        
        iterations++;
        
        if (iterations > maxIterations) {
            glitchElement.textContent = glitchText;
            clearInterval(interval);
        }
    }, 50);
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 2900);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se há tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});


const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

// Esconder canvas de rastro em dispositivos touch
if (isTouchDevice) {
    canvas.style.display = 'none';
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const maxPoints = 15;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Não atualizar cursor customizado em dispositivos touch
    if (!isTouchDevice) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        

        const target = e.target;
        const isClickable = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.onclick !== null ||
                           window.getComputedStyle(target).cursor === 'pointer';
        
        if (isClickable) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        } else {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
        }
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const pageWrapper = document.querySelector('.page-wrapper');

pageWrapper.addEventListener('wheel', (e) => {

    if (e.clientX <= 640) {
        e.preventDefault();
        mainContent.scrollTop += e.deltaY;
    }
}, { passive: false });


const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const targetPosition = targetSection.offsetTop;
            const startPosition = mainContent.scrollTop;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                

                const ease = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                mainContent.scrollTop = startPosition + distance * ease;
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

function animate() {
    // Não animar rastro em dispositivos touch
    if (!isTouchDevice) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        points.push({ x: mouseX, y: mouseY });
        
        if (points.length > maxPoints) {
            points.shift();
        }
        

        if (points.length < 2) {
            requestAnimationFrame(animate);
            return;
        }
        
        const smoothed = [points[0]];
        for (let i = 1; i < points.length; i++) {
            const prev = smoothed[smoothed.length - 1];
            const curr = points[i];
            smoothed.push({
                x: prev.x * 0.5 + curr.x * 0.5,
                y: prev.y * 0.5 + curr.y * 0.5
            });
        }
        
        ctx.beginPath();
        ctx.moveTo(smoothed[0].x, smoothed[0].y);
        
        for (let i = 1; i < smoothed.length - 1; i++) {
            const xc = (smoothed[i].x + smoothed[i + 1].x) / 2;
            const yc = (smoothed[i].y + smoothed[i + 1].y) / 2;
            ctx.quadraticCurveTo(smoothed[i].x, smoothed[i].y, xc, yc);
        }
        
        ctx.lineTo(mouseX, mouseY);
        
        // Detecta se o tema claro está ativo
        const isLightTheme = body.classList.contains('light-theme');
        const trailColor = isLightTheme ? '0, 0, 0' : '255, 255, 255';
        
        const gradient = ctx.createLinearGradient(
            smoothed[0].x, smoothed[0].y,
            mouseX, mouseY
        );
        gradient.addColorStop(0, `rgba(${trailColor}, 0)`);
        gradient.addColorStop(0.5, `rgba(${trailColor}, 0.5)`);
        gradient.addColorStop(1, `rgba(${trailColor}, 0.9)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

animate();

// Floating symbols
const symbolsContainer = document.getElementById('floating-symbols');

function createFloatingSymbol() {
    if (!symbolsContainer) return;
    
    const symbol = document.createElement('div');
    symbol.className = 'floating-symbol';
    symbol.textContent = '</>';
    
    // Define a cor baseada no tema atual
    const isLightTheme = body.classList.contains('light-theme');
    symbol.style.color = isLightTheme ? '#000000' : '#ffffff';
    
    // Posição aleatória
    symbol.style.left = Math.random() * 100 + '%';
    symbol.style.top = Math.random() * 100 + '%';
    
    // Rotações 3D aleatórias (range reduzido para não ficarem muito finos)
    const rotateX = Math.random() * 60 - 30; // -30 a 30 graus
    const rotateY = Math.random() * 60 - 30; // -30 a 30 graus
    const rotateZ = Math.random() * 90 - 45; // -45 a 45 graus
    
    // Cria keyframe único para este símbolo
    const animationName = `float${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const keyframes = `
        @keyframes ${animationName} {
            0% {
                opacity: 0;
                transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(0);
            }
            10% {
                opacity: 0.03;
            }
            50% {
                opacity: 0.08;
                transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(-10px);
            }
            90% {
                opacity: 0.03;
            }
            100% {
                opacity: 0;
                transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(-20px);
            }
        }
    `;
    
    // Adiciona o keyframe ao documento
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    // Aplica a animação
    symbol.style.animation = `${animationName} 4s ease-in-out forwards`;
    
    symbolsContainer.appendChild(symbol);
    
    // Remove o elemento e stylesheet após a animação
    setTimeout(() => {
        symbol.remove();
        styleSheet.remove();
    }, 4100);
}

// Cria múltiplos símbolos de uma vez
function createMultipleSymbols() {
    const count = Math.floor(Math.random() * 3) + 2; // Entre 2-4 símbolos
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFloatingSymbol();
        }, i * 200); // Pequeno delay entre cada símbolo
    }
}

// Cria símbolos em intervalos aleatórios
function startFloatingSymbols() {
    createMultipleSymbols();
    
    const nextInterval = Math.random() * 3000 + 2000; // Entre 2-5 segundos
    setTimeout(startFloatingSymbols, nextInterval);
}

// Inicia após a página carregar
setTimeout(startFloatingSymbols, 2000);


// Detectar se é dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 'ontouchstart' in window || 
                 navigator.maxTouchPoints > 0;

// Forçar ocultar preview em dispositivos móveis
if (isMobile) {
    const allPreviews = document.querySelectorAll('.project-preview');
    allPreviews.forEach(preview => {
        preview.style.display = 'none';
        preview.style.opacity = '0';
        preview.style.visibility = 'hidden';
    });
    
    // Monitorar constantemente e forçar fechar se abrir
    setInterval(() => {
        allPreviews.forEach(preview => {
            if (preview.style.display !== 'none' || 
                preview.style.opacity !== '0' || 
                preview.style.visibility !== 'hidden') {
                preview.style.display = 'none';
                preview.style.opacity = '0';
                preview.style.visibility = 'hidden';
            }
        });
    }, 100);
} else {
    // Preview apenas em desktop
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        const preview = link.parentElement.querySelector('.project-preview');
        
        if (preview) {
            link.addEventListener('mouseenter', () => {
                preview.style.opacity = '1';
                preview.style.visibility = 'visible';
            });
            
            link.addEventListener('mouseleave', () => {
                preview.style.opacity = '0';
                preview.style.visibility = 'hidden';
            });
            
            link.addEventListener('click', (e) => {
                preview.style.opacity = '0';
                preview.style.visibility = 'hidden';
            });
        }
    });
}
