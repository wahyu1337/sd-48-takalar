// src/script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.getElementById('close-sidebar');

    function openSidebar() {
        if(sidebar) sidebar.classList.add('active');
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeSidebar() {
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(hamburger) hamburger.addEventListener('click', openSidebar);
    if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if(overlay) overlay.addEventListener('click', closeSidebar);

    // Gallery Pagination Logic
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        // Dummy data for gallery
        const galleryData = [
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+1', caption: 'Upacara Bendera' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+2', caption: 'Pramuka' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+3', caption: 'Lomba Menggambar' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+4', caption: 'Hari Guru' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+5', caption: 'Senam Pagi' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+6', caption: 'Kerja Bakti' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+7', caption: 'Kunjungan Edukasi' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+8', caption: 'Pentas Seni' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+9', caption: 'Penyerahan Raport' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+10', caption: 'Rapat Orang Tua' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+11', caption: 'Kegiatan UKS' },
            { img: 'https://placehold.co/400x300/f8fafc/dc2626?text=Kegiatan+12', caption: 'Pekan Olahraga' },
        ];

        const itemsPerPage = 6; // 3x2 grid (3 kolom, 2 baris)
        let currentPage = 1;
        const totalPages = Math.ceil(galleryData.length / itemsPerPage);

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageInfo = document.getElementById('page-info');

        function renderGallery(page) {
            galleryGrid.innerHTML = '';
            
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const currentItems = galleryData.slice(start, end);

            currentItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.className = 'gallery-image';
                img.src = item.img;
                img.alt = item.caption;
                
                img.onerror = function() {
                    this.onerror = null; // Mencegah infinite loop (flicker bug)
                    this.src = 'https://placehold.co/400x300/f1f5f9/64748b?text=Foto+Tidak+Tersedia';
                };

                const caption = document.createElement('div');
                caption.className = 'gallery-caption';
                caption.textContent = item.caption;

                itemDiv.appendChild(img);
                itemDiv.appendChild(caption);
                galleryGrid.appendChild(itemDiv);
            });

            if (pageInfo) pageInfo.textContent = `Halaman ${page} dari ${totalPages}`;
            if (prevBtn) prevBtn.disabled = page === 1;
            if (nextBtn) nextBtn.disabled = page === totalPages;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderGallery(currentPage);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderGallery(currentPage);
                }
            });
        }

        // Initial render
        if(galleryData.length > 0) {
            renderGallery(currentPage);
        }
    }
});
