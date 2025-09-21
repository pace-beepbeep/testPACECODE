import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import ScrollReveal from 'scrollreveal';

// Inisialisasi ScrollReveal
const sr = ScrollReveal({
    distance: '60px',
    duration: 1000,
    delay: 700,
});

// Menerapkan animasi ke semua elemen <section>
sr.reveal('.seksikepsek', {
    delay: 500,
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    reset: true
});

// Kamu juga bisa menambahkan animasi spesifik lainnya di sini
// sr.reveal('.headline');

// ===================================
// NAVBAR DROPDOWN LOGIC
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const dropdownLinks = document.querySelectorAll('.nav-link-dropdown');

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-panel').forEach(panel => {
            panel.classList.remove('visible', 'opacity-100', 'translate-y-0');
            panel.classList.add('invisible', 'opacity-0', '-translate-y-2');
        });
    };

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Mencegah klik menyebar ke document

            const targetPanel = link.nextElementSibling;
            const isTargetPanelOpen = !targetPanel.classList.contains('invisible');

            closeAllDropdowns();

            if (!isTargetPanelOpen && targetPanel) {
                targetPanel.classList.remove('invisible', 'opacity-0', '-translate-y-2');
                targetPanel.classList.add('visible', 'opacity-100', 'translate-y-0');
            }
        });
    });

    // Tutup semua dropdown jika klik di luar
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });
});