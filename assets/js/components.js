// Kita mengoper objek 'user' secara utuh agar komponen bisa membaca nama dan jenjangnya
const renderSidebar = (activePage, user) => {
    const theme = user.theme;

    // NOTION (S1) - Minimalis, rectangular
    if (theme === 'academic') {
        return `
            <div class="sidebar-academic d-flex flex-column">
                <div class="p-4 fw-bold fs-5 border-bottom border-hairline d-flex align-items-center">
                    <div class="text-white rounded me-2 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px; background-color: var(--color-primary);"><i class="ph-bold ph-graduation-cap small"></i></div>
                    LMS Workspace
                </div>
                <div class="px-4 py-3 border-bottom border-hairline">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="small fw-bold" style="color: var(--text-secondary); font-size: 11px;">ROLE</span>
                        <span class="badge rounded" style="background-color: var(--color-primary); color: #fff;">${user.level}</span>
                    </div>
                    <div class="fw-bold text-truncate" style="color: var(--text-primary); font-size: 14px;">${user.name}</div>
                </div>
                <div class="list-group list-group-flush mt-2 px-2 flex-grow-1">
                    <a href="${user.dashboardUrl}" class="list-group-item rounded mb-1 ${activePage === 'dashboard' ? 'active-nav' : ''}"><i class="ph ph-squares-four me-2"></i>Dashboard</a>
                    <a href="courses.html" class="list-group-item rounded mb-1 ${activePage === 'courses' ? 'active-nav' : ''}"><i class="ph ph-book-open me-2"></i>Courses</a>
                    <a href="assessment.html" class="list-group-item rounded mb-1 ${activePage === 'assessment' ? 'active-nav' : ''}"><i class="ph ph-clipboard-text me-2"></i>Assessment</a>
                    <a href="grades.html" class="list-group-item rounded mb-1 ${activePage === 'grades' ? 'active-nav' : ''}"><i class="ph ph-exam me-2"></i>Grades & Transcript</a>
                    <a href="finance.html" class="list-group-item rounded mb-1 ${activePage === 'finance' ? 'active-nav' : ''}"><i class="ph ph-wallet me-2"></i>Finance</a>
                    <a href="schedule.html" class="list-group-item rounded mb-1 ${activePage === 'schedule' ? 'active-nav' : ''}"><i class="ph ph-calendar-blank me-2"></i>Schedule</a>
                    <a href="#" onclick="handleBackpackNav(event)" class="list-group-item rounded mb-1 ${activePage === 'backpack' ? 'active-nav' : ''}"><i class="ph ph-backpack me-2"></i>Cloud Backpack</a>
                    <a href="#" onclick="handleCollabNav(event)" class="list-group-item rounded mb-1 ${activePage === 'collab' ? 'active-nav' : ''}"><i class="ph ph-users-three me-2"></i>CollabSpace</a>
                </div>
                <div class="mt-auto p-3 border-top border-hairline">
                    <button id="logoutBtn" class="btn w-100 text-start d-flex align-items-center" style="color: var(--text-secondary); font-size: 14px;"><i class="ph ph-sign-out me-2"></i> Logout</button>
                </div>
            </div>
        `;
    }
    // SENTRY (Teacher Console) - Dark Mode & Workspace Switcher
    else if (theme === 'teacher') {
        // Generate opsi dropdown workspace dengan background gelap
        const workspaceOptions = user.workspaces.map(ws =>
            `<option value="${ws.id}" style="background-color: var(--bg-canvas); color: #ffffff;" ${user.activeWorkspace === ws.id ? 'selected' : ''}>${ws.name}</option>`
        ).join('');

        return `
            <div class="sidebar-teacher d-flex flex-column h-100" style="width: 260px; background-color: var(--color-surface); border-right: 1px solid var(--border-hairline);">
                
                <div class="p-4 border-bottom border-hairline">
                    <div class="small fw-bold mb-2" style="color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Workspace Aktif</div>
                    <select class="form-select form-select-sm bg-transparent fw-bold" style="color: var(--text-primary); border-color: var(--border-hairline); cursor: pointer;">
                        ${workspaceOptions}
                    </select>
                </div>

                <div class="list-group list-group-flush mt-3 px-2 flex-grow-1">
                    <a href="${user.dashboardUrl}" class="list-group-item rounded mb-1 ${activePage === 'dashboard' ? 'active-nav' : ''}" style="color: var(--text-secondary); border: none; background: transparent;"><i class="ph ph-squares-four me-2"></i>Command Center</a>
                    <a href="teacher-courses.html" class="list-group-item rounded mb-1 ${activePage === 'courses' ? 'active-nav' : ''}" style="color: var(--text-secondary); border: none; background: transparent;"><i class="ph ph-chalkboard-teacher me-2"></i>Kelola Mata Kuliah</a>
                    <a href="#" class="list-group-item rounded mb-1" style="color: var(--text-secondary); border: none; background: transparent;"><i class="ph ph-users-three me-2"></i>Data Siswa</a>
                    <a href="schedule.html" class="list-group-item rounded mb-1 ${activePage === 'schedule' ? 'active-nav' : ''}" style="color: var(--text-secondary); border: none; background: transparent;"><i class="ph ph-calendar-blank me-2"></i>Jadwal Akademik</a>
                    <a href="grading-panel.html" class="list-group-item rounded mb-1 ${activePage === 'grading-panel' ? 'active-nav' : ''}" style="color: var(--text-secondary); border: none; background: transparent;"><i class="ph ph-check-square-offset me-2"></i>Penilaian (Grading)</a>
                </div>

                <div class="mt-auto p-4 border-top border-hairline">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle d-flex align-items-center justify-content-center me-2 fw-bold text-dark" style="width: 36px; height: 36px; background-color: var(--color-primary);">${user.name.charAt(0)}</div>
                        <div class="overflow-hidden">
                            <div class="fw-bold small text-truncate lh-1 mb-1" style="color: var(--text-primary);">${user.name}</div>
                            <div class="small" style="color: var(--color-primary); font-size: 11px;">Pengajar / Admin</div>
                        </div>
                    </div>
                    <button id="logoutBtn" class="btn w-100 btn-sm text-start fw-semibold" style="border: 1px solid var(--border-hairline); color: var(--text-secondary); border-radius: 6px;"><i class="ph ph-sign-out me-2"></i> Logout</button>
                </div>
            </div>
        `;
    }
    // ZAPIER (Kids) - Playful, Orange
    else if (theme === 'kids') {
        return `
            <div class="sidebar-kids p-3 d-flex flex-column h-100" style="overflow-y: auto;">
                <div class="text-center mb-4 mt-3">
                    <div class="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style="width: 64px; height: 64px; background-color: var(--color-primary);">
                        <i class="ph-fill ph-rocket display-5"></i>
                    </div>
                    <h5 class="fw-bold mt-2" style="color: var(--text-primary);">Halo, ${user.name.split(' ')[0]}!</h5>
                </div>
                <div class="d-flex flex-column gap-3 flex-grow-1">
                    <a href="${user.dashboardUrl}" class="btn-kids-nav ${activePage === 'dashboard' ? 'active-kids' : ''}"><i class="ph-fill ph-house me-2 fs-4"></i> Rumah</a>
                    <a href="courses.html" class="btn-kids-nav ${activePage === 'courses' ? 'active-kids' : ''}"><i class="ph-fill ph-book me-2 fs-4"></i> Pelajaran</a>
                    <a href="assessment.html" class="btn-kids-nav ${activePage === 'assessment' ? 'active-kids' : ''}"><i class="ph-fill ph-star me-2 fs-4"></i> Tugas</a>
                    <a href="grades.html" class="btn-kids-nav ${activePage === 'grades' ? 'active-kids' : ''}"><i class="ph-fill ph-medal me-2 fs-4"></i> Rapotku</a>
                    <a href="schedule.html" class="btn-kids-nav ${activePage === 'schedule' ? 'active-kids' : ''}"><i class="ph-fill ph-calendar-blank me-2 fs-4"></i> Jadwal</a>
                    <a href="#" onclick="handleBackpackNav(event)" class="btn-kids-nav ${activePage === 'backpack' ? 'active-kids' : ''}"><i class="ph-fill ph-backpack me-2 fs-4"></i> Tas Digital</a>
                    <a href="#" onclick="handleCollabNav(event)" class="btn-kids-nav ${activePage === 'collab' ? 'active-kids' : ''}"><i class="ph-fill ph-users-three me-2 fs-4"></i> Kerja Kelompok</a>
                </div>
                <div class="mt-auto pt-3">
                    <button id="logoutBtn" class="btn w-100 rounded-pill py-2" style="background-color: transparent; border: 2px solid var(--border-hairline); color: var(--text-primary); font-weight: 700;"><i class="ph-bold ph-sign-out me-2"></i> Keluar</button>
                </div>
            </div>
        `;
    }
    // LOVABLE (Teens) - Warm cream, charcoal
    else {
        return `
            <div class="sidebar-teens p-4 d-flex flex-column h-100" style="overflow-y: auto;">
                <h5 class="fw-bold mb-4 d-flex align-items-center"><i class="ph-duotone ph-book-bookmark me-2 fs-3"></i> StudySpace</h5>
                <div class="d-flex flex-column gap-2 flex-grow-1">
                    <a href="${user.dashboardUrl}" class="nav-teens ${activePage === 'dashboard' ? 'active' : ''}"><i class="ph-bold ph-squares-four me-2"></i>Dashboard</a>
                    <a href="courses.html" class="nav-teens ${activePage === 'courses' ? 'active' : ''}"><i class="ph-bold ph-book-open me-2"></i>My Courses</a>
                    <a href="assessment.html" class="nav-teens ${activePage === 'assessment' ? 'active' : ''}"><i class="ph-bold ph-clipboard-text me-2"></i>Assignments</a>
                    <a href="grades.html" class="nav-teens ${activePage === 'grades' ? 'active' : ''}"><i class="ph-bold ph-exam me-2"></i>Grades Report</a>
                    <a href="schedule.html" class="nav-teens ${activePage === 'schedule' ? 'active' : ''}"><i class="ph-bold ph-calendar-blank me-2"></i>My Schedule</a>
                    <a href="#" onclick="handleBackpackNav(event)" class="nav-teens ${activePage === 'backpack' ? 'active' : ''}"><i class="ph-bold ph-backpack me-2"></i>Cloud Backpack</a>
                    <a href="#" onclick="handleCollabNav(event)" class="nav-teens ${activePage === 'collab' ? 'active' : ''}"><i class="ph-bold ph-users-three me-2"></i>CollabSpace</a>
                </div>
                <div class="mt-auto pt-4 border-top border-hairline">
                    <div class="d-flex align-items-center mb-3">
                        <div class="text-white rounded d-flex align-items-center justify-content-center me-2 fw-bold" style="width: 36px; height: 36px; background-color: var(--text-primary);">${user.name.charAt(0)}</div>
                        <div class="overflow-hidden">
                            <div class="fw-bold small text-truncate lh-1 mb-1" style="color: var(--text-primary);">${user.name}</div>
                            <div class="small" style="color: var(--text-secondary); font-size: 11px;">${user.level} Student</div>
                        </div>
                    </div>
                    <button id="logoutBtn" class="btn w-100 btn-sm text-start fw-semibold" style="border: 1px solid var(--border-hairline); color: var(--text-primary); border-radius: 6px;"><i class="ph ph-sign-out me-2"></i> Logout</button>
                </div>
            </div>
        `;
    }
};

// Top Navbar - Menghapus duplikasi tombol logout
const renderNavbar = (pageTitle, user) => {
    return `
        <nav class="navbar-global d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-hairline">
            <h4 class="mb-0 fw-bold header-title">${pageTitle}</h4>
            <div class="d-flex align-items-center gap-2">
                <div class="d-flex flex-column text-end d-none d-md-flex">
                    <span class="fw-semibold lh-1" style="color: var(--text-primary); font-size: 14px;">${user.name}</span>
                    <span style="color: var(--text-secondary); font-size: 11px; margin-top: 2px;">LMS System</span>
                </div>
                <div class="rounded-circle d-flex align-items-center justify-content-center ms-2" style="width: 36px; height: 36px; background-color: var(--color-surface); border: 1px solid var(--border-hairline);">
                    <i class="ph-fill ph-user" style="color: var(--color-primary);"></i>
                </div>
            </div>
        </nav>
    `;
};

// Course Card Reusable
const renderCourseCard = (courseName, lecturer, progress, colorClass) => {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 p-4 d-flex flex-column">
                <h5 class="fw-bold mb-2">${courseName}</h5>
                <p class="small mb-4" style="color: var(--text-secondary);"><i class="ph ph-chalkboard-teacher me-1"></i> ${lecturer}</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between small mb-1">
                        <span style="color: var(--text-secondary);">Progress</span>
                        <span class="fw-bold">${progress}%</span>
                    </div>
                    <div class="progress mb-3" style="height: 6px; background-color: var(--color-surface); border-radius: 4px;">
                        <div class="progress-bar" style="width: ${progress}%; background-color: var(--color-primary); border-radius: 4px;"></div>
                    </div>
                    <button class="btn btn-primary w-100 btn-sm">Buka Materi</button>
                </div>
            </div>
        </div>
    `;
};