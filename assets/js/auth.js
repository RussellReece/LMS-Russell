document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form melakukan refresh halaman

    const inputUser = document.getElementById('username').value;
    const inputPass = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');

    // Mencari user di dalam mock data
    const foundUser = mockUsers.find(user => 
        user.username === inputUser && user.password === inputPass
    );

    if (foundUser) {
        // Jika berhasil login, simpan data ke sessionStorage
        // Ini berguna agar dashboard tahu siapa yang sedang login
        sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        
        // Sembunyikan error jika sebelumnya muncul
        errorMsg.classList.add('d-none');
        
        // Redirect ke dashboard sesuai jenjang/level
        const roleDir = foundUser.level === 'teacher' ? 'pages/teacher/' : 'pages/student/';
        window.location.href = roleDir + foundUser.dashboardUrl;
    } else {
        // Tampilkan pesan error
        errorMsg.classList.remove('d-none');
    }
});