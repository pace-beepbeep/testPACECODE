import './style.css';

// ===================================
// NAVBAR DROPDOWN LOGIC
// ===================================
// Pastikan dropdown di header tetap berfungsi
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
            e.stopPropagation();
            const targetPanel = link.nextElementSibling;
            const isTargetPanelOpen = !targetPanel.classList.contains('invisible');
            closeAllDropdowns();
            if (!isTargetPanelOpen && targetPanel) {
                targetPanel.classList.remove('invisible', 'opacity-0', '-translate-y-2');
                targetPanel.classList.add('visible', 'opacity-100', 'translate-y-0');
            }
        });
    });
    document.addEventListener('click', () => closeAllDropdowns());
});

// ===================================
// JURUSAN PAGE DYNAMIC CONTENT LOGIC
// ===================================
async function initJurusanPage() {
    const params = new URLSearchParams(window.location.search);
    const currentJurusanId = params.get('id');

    const contentJurusan = document.getElementById('content-jurusan');
    const contentError = document.getElementById('content-error');
    
    try {
        const response = await fetch('/data/jurusan.json');
        if (!response.ok) throw new Error('Data tidak ditemukan');
        const allJurusanData = await response.json();

        // 1. Isi Sidebar Navigasi
        populateSidebar(allJurusanData, currentJurusanId);

        // 2. Tampilkan konten jurusan yang dipilih
        const currentData = allJurusanData[currentJurusanId];
        if (currentData) {
            populateMainContent(currentData);
        } else {
            showError();
        }

    } catch (error) {
        showError();
        console.error('Gagal memuat data jurusan:', error);
    }

    function showError() {
        contentJurusan.classList.add('hidden');
        contentError.classList.remove('hidden');
    }
}

function populateSidebar(allData, currentId) {
    const sidebarList = document.getElementById('jurusan-list-sidebar');
    sidebarList.innerHTML = ''; // Kosongkan list

    for (const id in allData) {
        const jurusan = allData[id];
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = `/jurusan.html?id=${id}`;
        a.textContent = jurusan.nama;
        a.className = 'block px-3 py-2 rounded-md font-medium transition-colors duration-200';

        if (id === currentId) {
            // Style untuk link yang aktif
            a.classList.add('bg-purple-600', 'text-white');
        } else {
            // Style untuk link yang tidak aktif
            a.classList.add('text-gray-700', 'hover:bg-gray-100');
        }
        
        li.appendChild(a);
        sidebarList.appendChild(li);
    }
}

// Ganti fungsi populateMainContent yang lama dengan yang ini
function populateMainContent(data) {
    // Ubah judul halaman
    document.title = `${data.nama} - SMKN 1 Dlanggu`;

    // Isi breadcrumb
    document.getElementById('breadcrumb').textContent = `Home / Jurusan / ${data.nama}`;
    
    // Isi konten utama
    document.getElementById('nama-jurusan').textContent = data.nama;
    document.getElementById('deskripsi-jurusan').textContent = data.deskripsi;
    
    // Set gambar utama (ambil gambar pertama dari galeri)
    if (data.gallery && data.gallery.length > 0) {
        document.getElementById('gambar-utama').src = data.gallery[0];
    }

    // Isi daftar keahlian
    const keahlianList = document.getElementById('keahlian-list');
    keahlianList.innerHTML = ''; // Kosongkan daftar
    data.keahlian.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        keahlianList.appendChild(li);
    });

    // ===================================
    // KODE BARU UNTUK MENAMPILKAN GURU
    // ===================================
    const guruSection = document.getElementById('guru-section');
    const guruGrid = document.getElementById('guru-grid');
    guruGrid.innerHTML = ''; // Kosongkan grid

    if (data.guru && data.guru.length > 0) {
        guruSection.classList.remove('hidden'); // Tampilkan section jika ada data guru
        data.guru.forEach(guru => {
            const guruCard = document.createElement('div');
            guruCard.innerHTML = `
                <img src="${guru.foto}" alt="${guru.nama}" class="w-100 h-50 rounded-lg mx-auto object-cover shadow-md mb-2">
                <p class="font-semibold text-sm text-gray-700">${guru.nama}</p>
            `;
            guruGrid.appendChild(guruCard);
        });
    } else {
        guruSection.classList.add('hidden'); // Sembunyikan section jika tidak ada data guru
    }
}

// Jalankan semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initJurusanPage);