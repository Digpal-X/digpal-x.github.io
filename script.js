/* =========================================
   FINAL HACKER TERMINAL - script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initHackerCursor();
    initTextScrambler();
    initScrollReveal(); // This is the function we updated
    initTypingEffect();
});

/* --- 1. MATRIX RAIN --- */
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    canvas.style.position = 'fixed'; canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.zIndex = '-1'; canvas.style.opacity = '0.25';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
    const columns = Math.floor(width / 20);
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = { x: i * 20, y: Math.random() * -1000, speed: Math.random() * 2 + 1, color: '#00ff41' };
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'; ctx.fillRect(0, 0, width, height); ctx.font = '15px monospace';
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            if (Math.random() > 0.995) drop.color = '#ff3333'; else if (Math.random() > 0.98) drop.color = '#00ff41';
            ctx.fillStyle = drop.color;
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], drop.x, drop.y);
            drop.y += drop.speed * 10;
            if (drop.y > height && Math.random() > 0.975) { drop.y = Math.random() * -100; drop.speed = Math.random() * 2 + 1; }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* --- 2. HACKER CURSOR --- */
function initHackerCursor() {
    const cursor = document.createElement('div');
    Object.assign(cursor.style, { width: '20px', height: '20px', border: '1px solid #ff3333', position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: '9999', transform: 'translate(-50%, -50%)', transition: '0.1s' });
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
    document.querySelectorAll('a, button, .project-card, input').forEach(t => {
        t.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'; cursor.style.borderColor = '#00ff41'; cursor.style.borderRadius = '0'; });
        t.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; cursor.style.borderColor = '#ff3333'; cursor.style.borderRadius = '50%'; });
    });
}

/* --- 3. SCROLL REVEAL (UPDATED FOR NEW SECTIONS) --- */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    // UPDATED SELECTOR: Added .timeline-item and .certification-card
    document.querySelectorAll('.project-card, .skill-item, .hero-text, .section-header, .timeline-item, .certification-card').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = '0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
}

/* --- 4. TEXT SCRAMBLER --- */
function initTextScrambler() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    document.querySelectorAll('.glitch, h2, .nav-links a').forEach(el => {
        el.dataset.value = el.innerText;
        el.addEventListener('mouseover', e => {
            let iter = 0; const orig = e.target.dataset.value;
            clearInterval(e.target.interval);
            e.target.interval = setInterval(() => {
                e.target.innerText = orig.split("").map((l, i) => i < iter ? orig[i] : letters[Math.floor(Math.random() * 36)]).join("");
                if (iter >= orig.length) clearInterval(e.target.interval);
                iter += 1 / 3;
            }, 30);
        });
    });
}

/* --- 5. TYPING & FORM --- */
function initTypingEffect() {
    const p = document.querySelector('.prompt');
    if(p) { const txt = p.innerText; p.innerText = ''; let i = 0; 
    function type() { if (i < txt.length) { p.innerText += txt.charAt(i); i++; setTimeout(type, 50); } } type(); }
}

const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); const btn = form.querySelector('button'); const orig = btn.innerText;
        btn.innerText = "ENCRYPTING..."; btn.style.background = "#ff3333"; btn.style.color = "#000";
        setTimeout(() => { btn.innerText = "PACKET SENT"; btn.style.background = "#00ff41"; setTimeout(() => { form.reset(); btn.innerText = orig; btn.style.background = "transparent"; btn.style.color = "#00ff41"; }, 3000); }, 1500);
    });
}