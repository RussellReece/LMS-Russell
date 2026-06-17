document.addEventListener('DOMContentLoaded', function() {
    // 1. Cek apakah ada data user di sessionStorage
    const userDataString = sessionStorage.getItem('loggedInUser');

    // Jika tidak ada data, berarti belum login. Tendang kembali ke index.html
    if (!userDataString) {
        window.location.href = 'index.html';
        return; // Hentikan eksekusi script selanjutnya
    }

    // 2. Parse string JSON kembali menjadi Object JavaScript
    const user = JSON.parse(userDataString);

    // 3. Masukkan data user ke elemen HTML yang relevan
    const sidebarNameElem = document.getElementById('sidebarUserName');
    const topbarNameElem = document.getElementById('topbarUserName');
    const welcomeNameElem = document.getElementById('welcomeName');

    if (sidebarNameElem) sidebarNameElem.textContent = user.name;
    if (topbarNameElem) topbarNameElem.textContent = user.name;
    if (welcomeNameElem) welcomeNameElem.textContent = user.name.split(' ')[0]; // Ambil nama depan saja

    // 4. Logika Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Hapus session
            sessionStorage.removeItem('loggedInUser');
            // Arahkan ke halaman login
            window.location.href = 'index.html';
        });
    }
});