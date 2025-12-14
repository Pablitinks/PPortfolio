const cursor = document.getElementById('custom-cursor');


const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const maxPoints = 15;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
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
    
    const gradient = ctx.createLinearGradient(
        smoothed[0].x, smoothed[0].y,
        mouseX, mouseY
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    requestAnimationFrame(animate);
}

animate();
