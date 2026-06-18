// Setup Global functions for external calling
window.handleCollabNav = function(e) {
    e.preventDefault();
    const userStr = sessionStorage.getItem('loggedInUser');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    
    if (!user.assignments) return;

    const groupTasks = user.assignments.filter(t => t.isGroup);

    let modalEl = document.getElementById('collabNavModal');
    if (!modalEl) {
        const modalHtml = `
            <div class="modal fade" id="collabNavModal" tabindex="-1" aria-labelledby="collabNavModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background-color: var(--color-surface); border: 1px solid var(--border-hairline); border-radius: var(--radius-card);">
                        <div class="modal-header border-bottom border-hairline">
                            <h5 class="modal-title fw-bold" id="collabNavModalLabel" style="color: var(--text-primary);">
                                <i class="ph-duotone ph-users-three text-primary me-2 fs-4"></i>Pilih Dokumen Kolaborasi
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4" id="collabNavModalBody">
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modalEl = document.getElementById('collabNavModal');
    }

    const modalBody = document.getElementById('collabNavModalBody');
    if (groupTasks.length === 0) {
        modalBody.innerHTML = `<div class="text-center text-muted py-4"><i class="ph-duotone ph-folder-open fs-1 mb-2"></i><br>Belum ada tugas kelompok.</div>`;
    } else {
        modalBody.innerHTML = `<p class="small mb-3" style="color: var(--text-secondary);">Berikut adalah daftar tugas kelompok Anda. Pilih salah satu untuk membuka CollabSpace.</p>` +
            `<div class="list-group list-group-flush">` + 
            groupTasks.map(task => `
                <a href="collab.html?taskId=${task.id}" class="list-group-item list-group-item-action d-flex align-items-center mb-2 rounded border" style="background-color: var(--bg-canvas); border-color: var(--border-hairline) !important; padding: 12px 16px;">
                    <div class="rounded-circle d-flex align-items-center justify-content-center me-3 text-white" style="width: 40px; height: 40px; background-color: var(--color-primary);">
                        <i class="ph-bold ph-rocket fs-5"></i>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <div class="fw-bold text-truncate" style="color: var(--text-primary); font-size: 15px;">${task.title}</div>
                        <div class="small" style="color: var(--text-secondary);"><i class="ph ph-clock me-1"></i>Tenggat: ${task.deadline}</div>
                    </div>
                    <i class="ph-bold ph-caret-right ms-2" style="color: var(--text-secondary);"></i>
                </a>
            `).join('') + `</div>`;
    }

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
};
window.handleBackpackNav = function(e) {
    e.preventDefault();
    const userStr = sessionStorage.getItem('loggedInUser');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    
    if (!user.backpack || !user.backpack.connected) {
        const modalHtml = `
            <div class="modal fade" id="oauthModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background-color: var(--color-surface); color: var(--text-primary); border: 1px solid var(--border-hairline);">
                        <div class="modal-header border-0 pb-0">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center pb-5 px-4">
                            <i class="ph-duotone ph-cloud-arrow-up display-1 mb-3" style="color: var(--color-primary);"></i>
                            <h4 class="fw-bold mb-3">Integrasi Tas Digital</h4>
                            <p class="text-muted small mb-4">Hubungkan ke Google Workspace / Microsoft 365 untuk membuat Tas Digital Anda. File akan tersimpan secara terpusat tanpa membebani server LMS.</p>
                            <button class="btn btn-primary w-100 fw-bold py-2 mb-2" onclick="connectAndRedirect()"><img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" width="18" class="me-2">Hubungkan Google Drive</button>
                            <button class="btn btn-outline-secondary w-100 fw-bold py-2" disabled><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg" width="18" class="me-2">Hubungkan OneDrive</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        let modalDiv = document.getElementById('oauthModal-container');
        if (!modalDiv) {
            modalDiv = document.createElement('div');
            modalDiv.id = 'oauthModal-container';
            document.body.appendChild(modalDiv);
        }
        modalDiv.innerHTML = modalHtml;
        const modal = new bootstrap.Modal(document.getElementById('oauthModal'));
        modal.show();
    } else {
        window.location.href = 'backpack.html';
    }
};

window.connectAndRedirect = function() {
    const userStr = sessionStorage.getItem('loggedInUser');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    
    const btn = document.querySelector('#oauthModal .btn-primary');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Menghubungkan...';
    
    setTimeout(() => {
        user.backpack = { connected: true, provider: 'gdrive', structure: [{ id: 'root', name: 'LMS_Backpack', type: 'folder', children: [] }] };
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        
        const modalEl = document.getElementById('oauthModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if(modal) modal.hide();
        
        window.location.href = 'backpack.html';
    }, 1500);
};

document.addEventListener('DOMContentLoaded', function () {
    const userDataString = sessionStorage.getItem('loggedInUser');
    if (!userDataString) {
        window.location.href = 'index.html';
        return;
    }
    const user = JSON.parse(userDataString);

    // Set Tema Atribut Global Dasar
    document.body.setAttribute('data-theme', user.theme || 'academic');

    let currentPage = 'dashboard';
    if (window.location.pathname.includes('courses')) currentPage = 'courses';
    if (window.location.pathname.includes('course-detail')) currentPage = 'course-detail';
    if (window.location.pathname.includes('task-detail')) currentPage = 'task-detail';
    if (window.location.pathname.includes('grades')) currentPage = 'grades';
    if (window.location.pathname.includes('grading-panel')) currentPage = 'grading-panel';
    if (window.location.pathname.includes('backpack')) currentPage = 'backpack';
    if (window.location.pathname.includes('collab')) currentPage = 'collab';
    if (window.location.pathname.includes('assessment')) currentPage = 'assessment';
    if (window.location.pathname.includes('schedule')) currentPage = 'schedule';

    const pageTitle = currentPage === 'courses' ? 'My Courses' : currentPage === 'assessment' ? 'Assignments' : currentPage === 'course-detail' ? 'Course Detail' : currentPage === 'task-detail' ? 'Task Detail' : currentPage === 'grades' ? 'Grades Report' : currentPage === 'grading-panel' ? 'Grading Panel' : currentPage === 'backpack' ? 'Cloud Backpack' : currentPage === 'collab' ? 'CollabSpace' : currentPage === 'schedule' ? 'My Schedule' : 'Dashboard';

    // Render Navigasi Struktural Global
    const sidebarContainer = document.getElementById('sidebar-container');
    const navbarContainer = document.getElementById('navbar-container');
    if (sidebarContainer) sidebarContainer.innerHTML = renderSidebar(currentPage, user);
    if (navbarContainer) navbarContainer.innerHTML = renderNavbar(pageTitle, user);

    // ========================================================
    // KOMPONEN: JADWAL HARI INI (DASHBOARD)
    // ========================================================
    const scheduleContainer = document.getElementById('schedule-container');
    if (scheduleContainer && user.ongoingClass) {
        scheduleContainer.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <div class="rounded-circle p-2 d-flex align-items-center justify-content-center" style="background-color: var(--color-surface); color: var(--color-primary); width: 40px; height: 40px;">
                    <i class="ph-fill ph-video-camera fs-5"></i>
                </div>
                <div class="ms-3">
                    <h6 class="fw-bold mb-0" style="color: var(--text-primary);">${user.ongoingClass.name}</h6>
                    <small style="color: var(--text-secondary);">${user.ongoingClass.lecturer}</small>
                </div>
            </div>
            <p class="small mb-3" style="color: var(--text-secondary);"><i class="ph ph-clock me-1"></i> ${user.ongoingClass.time}</p>
            <a href="course-detail.html?courseId=${user.ongoingClass.id}" class="btn btn-primary w-100 btn-sm fw-semibold text-center text-decoration-none d-block">
                Masuk Kelas Sesi Ini
            </a>
        `;
    }

    // ========================================================
    // KOMPONEN: TUGAS BELUM SELESAI (DASHBOARD)
    // ========================================================
    const uncompletedTasksContainer = document.getElementById('uncompleted-tasks-container');
    if (uncompletedTasksContainer && user.assignments) {
        const uncompletedTasks = user.assignments.filter(task => task.status === 'todo' || task.status === 'inprogress');
        if (uncompletedTasks.length === 0) {
            uncompletedTasksContainer.innerHTML = `
                <div class="text-center p-4">
                    <i class="ph ph-check-circle display-6 text-success mb-2"></i>
                    <p class="small text-muted mb-0">Semua tugas telah diselesaikan! Luar biasa.</p>
                </div>
            `;
        } else {
            uncompletedTasksContainer.innerHTML = uncompletedTasks.map(task => `
                <a href="task-detail.html?taskId=${task.id}" class="list-group-item list-group-item-action bg-transparent border-0 border-start border-4 ${task.priority === 'high' ? 'border-danger' : 'border-warning'} mb-2 p-3 d-flex justify-content-between align-items-center text-decoration-none" style="background-color: var(--color-surface) !important; border-radius: 0 var(--radius-btn) var(--radius-btn) 0;">
                    <div>
                        <h6 class="fw-bold mb-1" style="color: var(--text-primary); font-size: 15px;">${task.title}</h6>
                        <span class="badge btn-sm" style="background-color: var(--bg-canvas); color: var(--color-primary); border: 1px solid var(--border-hairline); font-size: 11px;">
                            ${task.status.toUpperCase()}
                        </span>
                    </div>
                    <div class="text-end">
                        <small class="fw-semibold d-block ${task.priority === 'high' ? 'text-danger' : 'text-warning'}"><i class="ph ph-clock me-1"></i>${task.deadline}</small>
                    </div>
                </a>
            `).join('');
        }
    }

    const progressContainer = document.getElementById('progress-container');
    if (progressContainer && user.enrolledCourses) {
        progressContainer.innerHTML = user.enrolledCourses.slice(0, 3).map(course => `
            <div class="mb-3">
                <div class="d-flex justify-content-between small mb-1">
                    <span class="fw-semibold text-truncate pe-2">${course.name}</span>
                    <span style="color: var(--text-secondary);">${course.progress}%</span>
                </div>
                <div class="progress" style="height: 8px; background-color: var(--bg-canvas); border-radius: var(--radius-btn);">
                    <div class="progress-bar" style="width: ${course.progress}%; background-color: var(--color-primary); border-radius: var(--radius-btn);"></div>
                </div>
            </div>
        `).join('');
    }

    // ========================================================
    // LOGIKA HALAMAN COURSES LIST (`courses.html`)
    // ========================================================
    const courseListContainer = document.getElementById('course-list-container');
    const filterButtonsContainer = document.getElementById('filter-buttons-container');
    if (courseListContainer && filterButtonsContainer) {
        let categories = [];
        if (user.theme === 'academic') {
            categories = [{ key: 'all', label: 'Semua MK' }, { key: 'jurusan', label: 'MK Jurusan' }, { key: 'umum', label: 'MK Umum' }, { key: 'komunitas', label: 'HIMA / UKM' }];
        } else if (user.theme === 'teens' || user.level === 'SD') {
            categories = [{ key: 'all', label: 'Semua Pelajaran' }, { key: 'wajib', label: 'Mata Pelajaran Utama' }, { key: 'ekskul', label: 'Ekstrakurikuler' }];
        } else {
            categories = [{ key: 'all', label: 'Semua Kegiatan Inti' }];
        }

        filterButtonsContainer.innerHTML = categories.map((cat, idx) => `
            <button class="btn btn-sm ${idx === 0 ? 'btn-dark' : 'btn-light'} filter-btn" data-filter="${cat.key}" style="border-radius: var(--radius-btn);">
                ${cat.label}
            </button>
        `).join('');

        const displayCourses = (filterType) => {
            const filteredData = filterType === 'all' ? user.enrolledCourses : user.enrolledCourses.filter(c => c.type === filterType);
            courseListContainer.innerHTML = filteredData.map(course => {
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 p-4 d-flex flex-column">
                            <h5 class="fw-bold mb-2" style="color: var(--text-primary);">${course.name}</h5>
                            <p class="small mb-4" style="color: var(--text-secondary);"><i class="ph ph-chalkboard-teacher me-1"></i> ${course.lecturer}</p>
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between small mb-1">
                                    <span style="color: var(--text-secondary);">Progress</span>
                                    <span class="fw-bold">${course.progress}%</span>
                                </div>
                                <div class="progress mb-3" style="height: 6px; background-color: var(--color-surface);">
                                    <div class="progress-bar" style="width: ${course.progress}%; background-color: var(--color-primary);"></div>
                                </div>
                                <a href="course-detail.html?courseId=${course.id}" class="btn btn-primary w-100 btn-sm text-decoration-none d-block text-center">Buka Materi</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        };

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('btn-dark'); b.classList.add('btn-light'); });
                this.classList.remove('btn-light'); this.classList.add('btn-dark');
                displayCourses(this.getAttribute('data-filter'));
            });
        });
        displayCourses('all');

        // Course Distribution Logic
        const distributionContainer = document.getElementById('course-distribution-container');
        if (distributionContainer && user.courseDistribution) {
            let html = `
                <div class="table-responsive bg-white rounded shadow-sm border" style="border-color: var(--border-hairline) !important;">
                    <table class="table table-bordered mb-0 align-middle text-center" style="font-size: 14px;">
                        <thead style="background-color: #e9ecef; color: #555;">
                            <tr>
                                <th class="py-3" style="width: 8%;">SEMESTER</th>
                                <th class="py-3">COURSE<br>CODE</th>
                                <th class="py-3 text-start">COURSE NAME</th>
                                <th class="py-3">CREDITS</th>
                                <th class="py-3" style="width: 12%;">QUALITY<br>CONTROL<br>COURSE<br>(UJIAN<br>PENGAWASAN<br>MUTU)</th>
                                <th class="py-3">GRADE<br>MINIMUM</th>
                                <th class="py-3">GRADE</th>
                                <th class="py-3">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            user.courseDistribution.forEach(sem => {
                sem.courses.forEach((course, index) => {
                    html += `<tr>`;
                    if (index === 0) {
                        html += `<td rowspan="${sem.courses.length}" class="fw-semibold bg-light">${sem.semester}</td>`;
                    }
                    html += `
                        <td class="text-muted">${course.code}</td>
                        <td class="text-start" style="color: #444;">${course.name}</td>
                        <td>${course.credits}</td>
                        <td>${course.qc}</td>
                        <td>${course.minGrade}</td>
                        <td class="fw-semibold">${course.grade}</td>
                        <td class="fw-bold" style="color: ${course.status === 'PASSED' ? 'var(--color-success)' : 'var(--color-danger)'};">${course.status}</td>
                    </tr>`;
                });
            });
            
            html += `</tbody></table></div>`;
            distributionContainer.innerHTML = html;
        }
    }

    // ========================================================
    // LOGIKA HALAMAN COURSE DETAIL (`course-detail.html`)
    // ========================================================
    if (currentPage === 'course-detail') {
        const urlParams = new URLSearchParams(window.location.search);
        const activeCourseId = urlParams.get('courseId') || (user.ongoingClass ? user.ongoingClass.id : user.enrolledCourses[0].id);
        const activeCourse = user.enrolledCourses.find(c => c.id === activeCourseId);

        if (activeCourse) {
            // Render Info Header
            document.getElementById('course-detail-title').innerHTML = `${activeCourse.name} <button class="btn btn-sm btn-outline-primary ms-3" onclick="window.location.href='backpack.html'" style="border-radius: var(--radius-btn); vertical-align: middle;"><i class="ph-bold ph-folder-open me-1"></i> Buka Folder Kelas Ini</button>`;
            document.getElementById('course-detail-lecturer').innerHTML = `<i class="ph ph-chalkboard-teacher me-1"></i> ${activeCourse.lecturer}`;

            // Tampilkan badge Sesi Berlangsung jika mata kuliah ini sedang aktif
            if (user.ongoingClass && activeCourse.id === user.ongoingClass.id) {
                document.getElementById('course-status-badge').classList.remove('d-none');
            }

            // Render Tabbed Syllabus
            const syllabusContainer = document.getElementById('courseAccordion');
            if (syllabusContainer && activeCourse.syllabus) {
                // Determine active tab
                let activeIndex = activeCourse.syllabus.findIndex(m => m.status === 'Sedang Berjalan');
                if (activeIndex === -1) activeIndex = activeCourse.syllabus.length - 1;
                
                // Hapus kelas accordion untuk menggunakan tab
                syllabusContainer.className = 'syllabus-tabs-container';

                let tabsHTML = `<ul class="nav nav-pills mb-4 overflow-auto flex-nowrap pb-2" id="courseSyllabusTabs" role="tablist" style="border-bottom: 2px solid var(--color-surface); gap: 0.5rem; scrollbar-width: none;">`;
                let contentHTML = `<div class="tab-content" id="courseSyllabusTabsContent">`;

                activeCourse.syllabus.forEach((materi, idx) => {
                    const isActive = idx === activeIndex;
                    const badgeColor = materi.status === 'Selesai' ? '#20c997' : (materi.status === 'Sedang Berjalan' ? 'var(--color-primary)' : 'var(--text-secondary)');
                    
                    tabsHTML += `
                        <li class="nav-item" role="presentation">
                            <button class="nav-link ${isActive ? 'active' : ''} fw-bold d-flex align-items-center" id="tab-${idx}" data-bs-toggle="tab" data-bs-target="#content-${idx}" type="button" role="tab" style="border-radius: var(--radius-btn); white-space: nowrap; ${isActive ? '' : 'color: var(--text-secondary); background-color: var(--color-surface);'}">
                                ${materi.title.includes('Minggu') || materi.title.includes('Sesi') ? materi.title.split(':')[0] : 'Sesi ' + materi.week}
                                <span class="ms-2 rounded-circle d-inline-block" style="width: 8px; height: 8px; background-color: ${badgeColor};"></span>
                            </button>
                        </li>
                    `;

                    const listItemsHTMLNormal = materi.items.map(item => {
                        let taskLink = '#';
                        if (item.type === 'task') {
                            const foundTask = user.assignments?.find(a => a.title === item.name);
                            if (foundTask) taskLink = `task-detail.html?taskId=${foundTask.id}`;
                        }

                        if (item.type === 'attendance') {
                            return `
                                <a href="#" class="d-flex align-items-center p-3 mb-3 bg-white border rounded shadow-sm hover-elevate transition-all text-decoration-none attendance-trigger" data-idx="${idx}" style="border-color: var(--border-hairline) !important;">
                                    <div class="rounded p-2 me-3" style="background-color: rgba(var(--color-primary-rgb), 0.05);">
                                        <i class="ph-duotone ph-scan fs-3" style="color: var(--color-primary);"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold d-block mb-1" style="color: var(--color-primary); font-size: 15px;">${item.name}</div>
                                        <div class="small mt-1" style="color: var(--text-secondary);">Klik untuk memindai QR di monitor guru</div>
                                    </div>
                                </a>
                            `;
                        }

                        let iconClass = 'ph-file-pdf'; let iconColor = '#dc3545';
                        if (item.type === 'video') { iconClass = 'ph-video-camera'; iconColor = 'var(--color-primary)'; }
                        if (item.type === 'task') { iconClass = 'ph-clipboard-text'; iconColor = '#ffc107'; }
                        if (item.type === 'link') { iconClass = 'ph-link'; iconColor = '#0d6efd'; }

                        const deadlineInfo = item.type === 'task' ? `<div class="small text-danger fw-semibold mt-1">${item.desc}</div>` : `<div class="small mt-1" style="color: var(--text-secondary);">${item.desc}</div>`;

                        return `
                            <div class="d-flex align-items-start p-3 mb-3 bg-white border rounded shadow-sm hover-elevate transition-all" style="border-color: var(--border-hairline) !important;">
                                <div class="rounded p-2 me-3" style="background-color: rgba(var(--color-primary-rgb), 0.05);">
                                    <i class="ph-fill ${iconClass} fs-3" style="color: ${iconColor};"></i>
                                </div>
                                <div>
                                    <a href="${taskLink}" class="fw-bold text-decoration-none d-block mb-1 hover-elevate" style="color: var(--text-primary); font-size: 15px;">${item.name}</a>
                                    ${deadlineInfo}
                                </div>
                                <a href="${taskLink}" class="btn btn-sm btn-light ms-auto mt-2 rounded-circle"><i class="ph-bold ${item.type === 'task' ? 'ph-arrow-right' : 'ph-download-simple'}"></i></a>
                            </div>
                        `;
                    }).join('');

                    const listItemsHTMLCard = materi.items.map(item => {
                        let taskLink = '#';
                        if (item.type === 'task') {
                            const foundTask = user.assignments?.find(a => a.title === item.name);
                            if (foundTask) taskLink = `task-detail.html?taskId=${foundTask.id}`;
                        }

                        if (item.type === 'attendance') {
                            return `
                                <a href="#" class="d-flex align-items-center mb-4 text-white text-decoration-none attendance-trigger" data-idx="${idx}">
                                    <div class="bg-white rounded d-flex align-items-center justify-content-center me-3 position-relative" style="width: 45px; height: 45px; color: var(--color-primary);">
                                        <i class="ph-bold ph-scan fs-4"></i>
                                        <span class="position-absolute top-0 start-0 translate-middle p-1 bg-success border border-light rounded-circle" style="width: 15px; height: 15px;"><i class="ph-bold ph-check text-white" style="font-size: 8px; position:absolute; top:2px; left:2px;"></i></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="fw-semibold" style="font-size: 14px;">${item.name}</div>
                                        <div class="small" style="font-size: 12px; opacity: 0.9;">• 1h 40m</div>
                                    </div>
                                </a>
                            `;
                        }

                        let iconClass = 'ph-file-pdf'; 
                        if (item.type === 'video') iconClass = 'ph-video-camera';
                        if (item.type === 'task') iconClass = 'ph-clipboard-text';
                        if (item.type === 'link') iconClass = 'ph-link';

                        return `
                            <div class="d-flex align-items-center mb-4 text-white">
                                <div class="bg-white rounded d-flex align-items-center justify-content-center me-3 position-relative" style="width: 45px; height: 45px; color: var(--color-primary);">
                                    <i class="ph-bold ${iconClass} fs-4"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <a href="${taskLink}" class="text-white text-decoration-none d-block hover-elevate">
                                        <div class="fw-semibold" style="font-size: 14px;">${item.name}</div>
                                        <div class="small" style="font-size: 12px; opacity: 0.9;">• 10m</div>
                                    </a>
                                </div>
                                <a href="${taskLink}" class="btn btn-sm text-white ms-auto rounded-circle" style="background-color: rgba(255,255,255,0.2); width: 28px; height: 28px; padding: 0; display: flex; align-items: center; justify-content: center;"><i class="ph-bold ${item.type === 'task' ? 'ph-arrow-right' : 'ph-download-simple'} fs-6"></i></a>
                            </div>
                        `;
                    }).join('');

                    const learningOutcomeHTML = `
                        <div class="mb-4">
                            <button class="btn btn-sm text-start p-0 d-flex align-items-center fw-semibold w-100" type="button" data-bs-toggle="collapse" data-bs-target="#lo-${idx}" aria-expanded="false" style="color: var(--color-primary);">
                                <i class="ph-bold ph-caret-right me-2 transition-transform" id="icon-lo-${idx}"></i> Lihat Learning Outcome & Sub Topik
                            </button>
                            <div class="collapse mt-3" id="lo-${idx}">
                                <div class="p-0 border-0 bg-transparent">
                                    <h6 class="fw-bold mb-2" style="color: var(--text-primary); font-size: 14px;">Learning Outcome</h6>
                                    <ul class="small mb-3 ps-3 text-muted" style="color: var(--color-primary) !important;">
                                        <li>CPMK 3: Menjelaskan komponen antarmuka pengguna dan fitur utama HTML 5</li>
                                        <li>CPMK 4: Mengembangkan aplikasi web seluler berdasarkan HTML 5</li>
                                    </ul>
                                    <h6 class="fw-bold mb-2" style="color: var(--text-primary); font-size: 14px;">Sub Topic</h6>
                                    <ul class="small mb-0 ps-3 text-muted" style="color: var(--color-primary) !important;">
                                        <li>Container vs UI Component</li>
                                        <li>Form</li>
                                        <li>Handling Events</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;

                    contentHTML += `
                        <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="content-${idx}" role="tabpanel">
                            <div class="row g-4 transition-all" id="row-${idx}">
                                <div class="col-12 transition-all" id="col-info-${idx}">
                                    <div id="info-content-${idx}" class="d-block transition-all">
                                        <h4 class="fw-normal mb-3" style="color: var(--text-primary); font-size: 22px;">${materi.week} Component State and Props [L]</h4>
                                        
                                        ${learningOutcomeHTML}
                                    </div>
                                    <div id="scanner-container-${idx}" class="d-none transition-all">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h5 class="fw-bold mb-0" style="color: var(--text-primary);">Presensi Berjalan</h5>
                                            <button class="btn btn-sm btn-outline-secondary btn-close-scanner" data-idx="${idx}"><i class="ph ph-x"></i> Kembali</button>
                                        </div>
                                        <div class="p-4 border border-primary rounded text-center d-flex flex-column align-items-center attendance-form-container" style="background-color: var(--bg-canvas);">
                                            <div class="bg-dark rounded d-flex flex-column align-items-center justify-content-center mb-3 position-relative overflow-hidden shadow-inner" style="width: 100%; max-width: 320px; height: 220px; border: 2px solid var(--text-secondary);">
                                                <div class="position-absolute w-100 h-100" style="background: rgba(0,0,0,0.5);"></div>
                                                <div class="position-absolute" style="width: 200px; height: 200px; border: 2px solid #0f0; border-radius: 12px; box-shadow: 0 0 0 1000px rgba(0,0,0,0.6);">
                                                    <div class="w-100 position-absolute scan-line" style="height: 2px; background: #0f0; top: 0; box-shadow: 0 0 8px #0f0;"></div>
                                                </div>
                                                <style>
                                                    @keyframes scanAnim {
                                                        0% { top: 0%; }
                                                        50% { top: 100%; }
                                                        100% { top: 0%; }
                                                    }
                                                    .scan-line { animation: scanAnim 3s infinite linear; }
                                                </style>
                                                <div class="text-center position-relative z-3">
                                                    <i class="ph-duotone ph-camera text-white mb-2" style="font-size: 32px; opacity: 0.8;"></i>
                                                    <p class="small text-white mb-0 px-3" style="opacity: 0.9;">Arahkan kamera ke QR Code di layar proyektor / dosen</p>
                                                </div>
                                            </div>
                                            
                                            <div class="small fw-semibold mb-2 mt-2" style="color: var(--text-secondary);">ATAU MASUKKAN PIN MANUAL</div>
                                            
                                            <div class="d-flex gap-2 mb-4 justify-content-center">
                                                <input type="text" class="form-control text-center fw-bold fs-4 p-2 pin-input" maxlength="1" style="width: 55px; height: 60px; border-radius: var(--radius-btn); background-color: var(--bg-canvas); border-color: var(--border-hairline); color: var(--text-primary);">
                                                <input type="text" class="form-control text-center fw-bold fs-4 p-2 pin-input" maxlength="1" style="width: 55px; height: 60px; border-radius: var(--radius-btn); background-color: var(--bg-canvas); border-color: var(--border-hairline); color: var(--text-primary);">
                                                <input type="text" class="form-control text-center fw-bold fs-4 p-2 pin-input" maxlength="1" style="width: 55px; height: 60px; border-radius: var(--radius-btn); background-color: var(--bg-canvas); border-color: var(--border-hairline); color: var(--text-primary);">
                                                <input type="text" class="form-control text-center fw-bold fs-4 p-2 pin-input" maxlength="1" style="width: 55px; height: 60px; border-radius: var(--radius-btn); background-color: var(--bg-canvas); border-color: var(--border-hairline); color: var(--text-primary);">
                                            </div>
                                            
                                            <button class="btn btn-primary fw-bold w-100 py-3 btn-submit-absen" style="max-width: 320px; border-radius: var(--radius-btn);">Hadir Sekarang</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 transition-all" id="col-materi-${idx}">
                                    <!-- View Default (Gambar 1) -->
                                    <div id="materi-normal-view-${idx}" class="d-block transition-all">
                                        <h5 class="fw-bold mb-4" style="color: var(--text-primary);">Materi & Aktivitas</h5>
                                        ${listItemsHTMLNormal.length > 0 ? listItemsHTMLNormal : '<div class="text-muted">Belum ada materi</div>'}
                                    </div>
                                    
                                    <!-- View Card (Gambar 2) -->
                                    <div id="materi-card-view-${idx}" class="d-none h-100 transition-all">
                                        <div class="card border-0 shadow-sm rounded-3 overflow-hidden h-100" style="background-color: var(--color-primary);">
                                            <div class="card-header border-0 p-3 pb-2 text-white bg-transparent" style="font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.2) !important;">
                                                Things to do in this session
                                            </div>
                                            <div class="card-body p-4 bg-transparent pt-3">
                                                ${listItemsHTMLCard.length > 0 ? listItemsHTMLCard : '<div class="text-center p-4 text-white"><i class="ph-duotone ph-folder-open fs-1 mb-2"></i><br>Belum ada materi</div>'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });

                tabsHTML += `</ul>`;
                contentHTML += `</div>`;
                
                syllabusContainer.innerHTML = tabsHTML + contentHTML;

                // Bind Attendance Trigger
                syllabusContainer.querySelectorAll('.attendance-trigger').forEach(trigger => {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        const idx = e.currentTarget.getAttribute('data-idx');
                        
                        // Enforce split layout if not split
                        const colInfo = syllabusContainer.querySelector(`#col-info-${idx}`);
                        const colMateri = syllabusContainer.querySelector(`#col-materi-${idx}`);
                        const normalView = syllabusContainer.querySelector(`#materi-normal-view-${idx}`);
                        const cardView = syllabusContainer.querySelector(`#materi-card-view-${idx}`);
                        
                        if(colInfo && colMateri && normalView && cardView) {
                            colInfo.classList.remove('col-12'); colInfo.classList.add('col-lg-7');
                            colMateri.classList.remove('col-12'); colMateri.classList.add('col-lg-5');
                            normalView.classList.remove('d-block'); normalView.classList.add('d-none');
                            cardView.classList.remove('d-none'); cardView.classList.add('d-block');
                        }

                        // Swap info to scanner
                        syllabusContainer.querySelector(`#info-content-${idx}`).classList.add('d-none');
                        syllabusContainer.querySelector(`#scanner-container-${idx}`).classList.remove('d-none');
                    });
                });

                // Bind Close Scanner
                syllabusContainer.querySelectorAll('.btn-close-scanner').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.currentTarget.getAttribute('data-idx');
                        syllabusContainer.querySelector(`#info-content-${idx}`).classList.remove('d-none');
                        syllabusContainer.querySelector(`#scanner-container-${idx}`).classList.add('d-none');
                        
                        // Check if LO is collapsed, if so revert to single column
                        const loCollapse = syllabusContainer.querySelector(`#lo-${idx}`);
                        if (!loCollapse.classList.contains('show')) {
                            const colInfo = syllabusContainer.querySelector(`#col-info-${idx}`);
                            const colMateri = syllabusContainer.querySelector(`#col-materi-${idx}`);
                            const normalView = syllabusContainer.querySelector(`#materi-normal-view-${idx}`);
                            const cardView = syllabusContainer.querySelector(`#materi-card-view-${idx}`);
                            
                            if(colInfo && colMateri && normalView && cardView) {
                                colInfo.classList.remove('col-lg-7'); colInfo.classList.add('col-12');
                                colMateri.classList.remove('col-lg-5'); colMateri.classList.add('col-12');
                                normalView.classList.remove('d-none'); normalView.classList.add('d-block');
                                cardView.classList.remove('d-block'); cardView.classList.add('d-none');
                            }
                        }
                    });
                });

                // Animasi icon caret pada collapse Learning Outcome dan Ganti Layout
                const collapses = syllabusContainer.querySelectorAll('.collapse');
                collapses.forEach(collapse => {
                    collapse.addEventListener('show.bs.collapse', (e) => {
                        const idx = e.target.id.split('-')[1];
                        if (idx === undefined) return;
                        const icon = syllabusContainer.querySelector(`#icon-lo-${idx}`);
                        if(icon) { icon.classList.remove('ph-caret-right'); icon.classList.add('ph-caret-down'); }
                        
                        // Ubah Layout
                        const colInfo = syllabusContainer.querySelector(`#col-info-${idx}`);
                        const colMateri = syllabusContainer.querySelector(`#col-materi-${idx}`);
                        const normalView = syllabusContainer.querySelector(`#materi-normal-view-${idx}`);
                        const cardView = syllabusContainer.querySelector(`#materi-card-view-${idx}`);
                        
                        if(colInfo && colMateri && normalView && cardView) {
                            colInfo.classList.remove('col-12');
                            colInfo.classList.add('col-lg-7');
                            
                            colMateri.classList.remove('col-12');
                            colMateri.classList.add('col-lg-5');
                            
                            normalView.classList.remove('d-block');
                            normalView.classList.add('d-none');
                            
                            cardView.classList.remove('d-none');
                            cardView.classList.add('d-block');
                        }
                    });
                    collapse.addEventListener('hide.bs.collapse', (e) => {
                        const idx = e.target.id.split('-')[1];
                        if (idx === undefined) return;
                        const icon = syllabusContainer.querySelector(`#icon-lo-${idx}`);
                        if(icon) { icon.classList.remove('ph-caret-down'); icon.classList.add('ph-caret-right'); }
                        
                        // Jika scanner sedang aktif, jangan kembalikan layout ke 1 kolom
                        const scannerContainer = syllabusContainer.querySelector(`#scanner-container-${idx}`);
                        if (!scannerContainer.classList.contains('d-none')) return;

                        // Kembalikan Layout
                        const colInfo = syllabusContainer.querySelector(`#col-info-${idx}`);
                        const colMateri = syllabusContainer.querySelector(`#col-materi-${idx}`);
                        const normalView = syllabusContainer.querySelector(`#materi-normal-view-${idx}`);
                        const cardView = syllabusContainer.querySelector(`#materi-card-view-${idx}`);
                        
                        if(colInfo && colMateri && normalView && cardView) {
                            colInfo.classList.remove('col-lg-7');
                            colInfo.classList.add('col-12');
                            
                            colMateri.classList.remove('col-lg-5');
                            colMateri.classList.add('col-12');
                            
                            normalView.classList.remove('d-none');
                            normalView.classList.add('d-block');
                            
                            cardView.classList.remove('d-block');
                            cardView.classList.add('d-none');
                        }
                    });
                });
            }

        }

        // TAMBAHKAN KODE INI UNTUK UX KOTAK PIN DI DALAM ACCORDION:
        const pinInputs = document.querySelectorAll('.pin-input');
        pinInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase(); // Mengizinkan angka dan huruf
                if (e.target.value !== '' && index < pinInputs.length - 1) pinInputs[index + 1].focus();
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value === '' && index > 0) pinInputs[index - 1].focus();
            });
            input.addEventListener('focus', (e) => { e.target.select(); });
        });

        // =======================================================
        // TAMBAHAN BARU: LOGIKA POP-UP VALIDASI ABSENSI
        // =======================================================

        // 1. Injeksi HTML Pop-Up (Modal) ke dalam body
        const modalHTML = `
            <div class="modal fade" id="attendanceModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg" style="background-color: var(--color-surface); border-radius: var(--radius-card);">
                  <div class="modal-body text-center p-5">
                    <div id="modalIcon" class="mb-4"></div>
                    <h4 id="modalTitle" class="fw-bold mb-2" style="color: var(--text-primary);"></h4>
                    <p id="modalDesc" style="color: var(--text-secondary);"></p>
                    <button type="button" class="btn btn-primary w-100 py-2 fw-semibold mt-3" data-bs-dismiss="modal" style="border-radius: var(--radius-btn);">Tutup</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        // Hindari duplikasi modal jika berpindah halaman
        if (!document.getElementById('attendanceModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const attendanceModal = new bootstrap.Modal(document.getElementById('attendanceModal'));

        // 2. Logika ketika tombol "Hadir Sekarang" ditekan
        document.querySelectorAll('.btn-submit-absen').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.closest('.attendance-form-container');
                const inputs = container.querySelectorAll('.pin-input');
                let pinValue = '';

                inputs.forEach(input => pinValue += input.value);

                // SIMULASI BACKEND: Anggap sukses jika semua 4 kotak terisi penuh
                if (pinValue.length === 4) {
                    // Tampilkan Pop-Up Sukses
                    document.getElementById('modalIcon').innerHTML = '<i class="ph-fill ph-check-circle text-success" style="font-size: 80px;"></i>';
                    document.getElementById('modalTitle').textContent = 'Absensi Berhasil!';
                    document.getElementById('modalDesc').textContent = 'Kehadiran Anda telah tercatat dalam sistem.';
                    attendanceModal.show();

                    // Ubah UI agar QR & PIN hilang dan berganti jadi status "Sudah Hadir"
                    // (Sifatnya menetap meskipun Accordion ditutup dan dibuka lagi)
                    container.innerHTML = `
                        <div class="text-center p-4 w-100">
                            <i class="ph-fill ph-check-circle text-success mb-2" style="font-size: 50px;"></i>
                            <h5 class="fw-bold text-success mb-1">Anda Sudah Hadir</h5>
                            <p class="small mb-0" style="color: var(--text-secondary);">Waktu Presensi: ${new Date().toLocaleTimeString('id-ID')} WIB</p>
                        </div>
                    `;
                } else {
                    // Tampilkan Pop-Up Gagal (Jika kosong atau kurang dari 4 digit)
                    document.getElementById('modalIcon').innerHTML = '<i class="ph-fill ph-warning-circle text-danger" style="font-size: 80px;"></i>';
                    document.getElementById('modalTitle').textContent = 'Absensi Gagal';
                    document.getElementById('modalDesc').textContent = 'PIN harus 4 digit. Silakan periksa kembali kode di layar proyektor.';
                    attendanceModal.show();

                    // Kita TIDAK mengubah 'container', sehingga kotak PIN tetap ada untuk mencoba lagi
                }
            });
        });

        // =======================================================
        // TAMBAHAN BARU: RENDERING PEOPLE & ATTENDANCE
        // =======================================================
        const peopleContainer = document.getElementById('course-people-container');
        const attendanceContainer = document.getElementById('course-attendance-container');

        if (peopleContainer && user.classmates) {
            let html = `
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold mb-0" style="color: var(--text-primary);">People in This Course</h5>
                    <div class="input-group input-group-sm" style="width: 200px;">
                        <input type="text" class="form-control" placeholder="Search..." style="border-radius: var(--radius-btn) 0 0 var(--radius-btn);">
                        <button class="btn btn-outline-secondary" style="border-radius: 0 var(--radius-btn) var(--radius-btn) 0;"><i class="ph-bold ph-magnifying-glass"></i></button>
                    </div>
                </div>
                <div class="table-responsive rounded border" style="border-color: var(--border-hairline) !important;">
                    <table class="table mb-0 align-middle">
                        <thead style="background-color: #f8f9fa;">
                            <tr>
                                <th class="py-3 text-muted small fw-semibold border-0" style="width: 30%;">NAME</th>
                                <th class="py-3 text-muted small fw-semibold border-0">NIM</th>
                                <th class="py-3 text-muted small fw-semibold border-0">ROLE</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            user.classmates.forEach(person => {
                html += `
                    <tr>
                        <td class="py-3 border-bottom border-hairline">
                            <div class="d-flex align-items-center">
                                <div class="rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold text-white shadow-sm" style="width: 36px; height: 36px; background-color: var(--color-primary);">${person.name.charAt(0)}</div>
                                <div>
                                    <div class="fw-semibold" style="color: var(--text-primary); font-size: 14px;">${person.name}</div>
                                    <div class="small text-muted" style="font-size: 12px;">${person.email}</div>
                                </div>
                            </div>
                        </td>
                        <td class="py-3 border-bottom border-hairline" style="color: var(--text-secondary); font-size: 14px;">${person.nim}</td>
                        <td class="py-3 border-bottom border-hairline"><span class="badge bg-light text-dark border">Student</span></td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
            peopleContainer.innerHTML = html;
        }

        if (attendanceContainer && user.attendanceData) {
            let sumHTML = `
                <div class="row g-0 mb-4 bg-white rounded border overflow-hidden shadow-sm" style="border-color: var(--border-hairline) !important;">
                    <div class="col-md-3 p-4 border-end d-flex align-items-center">
                        <div class="text-muted fs-5">Attendance<br>Summary</div>
                    </div>
                    <div class="col-md-9 d-flex">
                        <div class="flex-grow-1 p-4 border-end text-center d-flex flex-column justify-content-center">
                            <div class="small text-muted mb-1">Total Session</div>
                            <div class="fs-1 fw-light" style="color: var(--text-primary);">${user.attendanceData.summary.totalSession}</div>
                        </div>
                        <div class="flex-grow-1 p-4 border-end text-center d-flex flex-column justify-content-center">
                            <div class="small text-muted mb-1">Total Attendance</div>
                            <div class="fs-1 fw-light" style="color: var(--text-primary);">${user.attendanceData.summary.totalAttendance}</div>
                        </div>
                        <div class="flex-grow-1 p-4 text-center d-flex flex-column justify-content-center">
                            <div class="small text-muted mb-1">Minimal Attendance</div>
                            <div class="fs-1 fw-light" style="color: var(--text-primary);">${user.attendanceData.summary.minimalAttendance}</div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive bg-white rounded border shadow-sm" style="border-color: var(--border-hairline) !important;">
                    <table class="table mb-0 align-middle text-center" style="font-size: 13px;">
                        <thead style="background-color: #f8f9fa;">
                            <tr>
                                <th class="py-3 border-0 text-start ps-4">Session <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                <th class="py-3 border-0">Delivery <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                <th class="py-3 border-0">Start Date <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                <th class="py-3 border-0">End Date <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                <th class="py-3 border-0">Attend <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                <th class="py-3 border-0">Attendance Requirements</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            user.attendanceData.history.forEach(row => {
                const attendIcon = row.status === 'present' 
                    ? `<i class="ph-fill ph-check-circle text-success fs-4"></i>` 
                    : `<i class="ph-fill ph-x-circle text-danger fs-4"></i>`;
                
                sumHTML += `
                    <tr style="border-bottom: 1px solid #eaeaea;">
                        <td class="py-3 text-start ps-4 text-muted">${row.session}</td>
                        <td class="py-3 text-muted">${row.delivery}</td>
                        <td class="py-3 text-muted">${row.startDate.replace(', ', '<br>')}</td>
                        <td class="py-3 text-muted">${row.endDate.replace(', ', '<br>')}</td>
                        <td class="py-3">${attendIcon}</td>
                        <td class="py-3">
                            <span class="badge bg-success-subtle text-success border border-success rounded d-inline-flex align-items-center">
                                <i class="ph-bold ph-check me-1"></i> ${row.req}
                            </span>
                        </td>
                    </tr>
                `;
            });

            sumHTML += `</tbody></table></div>`;
            attendanceContainer.innerHTML = sumHTML;
        }
    }


    // ========================================================
    // LOGIKA HALAMAN TASK DETAIL (`task-detail.html`)
    // ========================================================
    if (currentPage === 'task-detail') {
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('taskId');
        
        let activeTask = null;
        if (user.assignments) {
            activeTask = user.assignments.find(t => t.id == taskId);
        }

        if (activeTask) {
            const course = user.enrolledCourses.find(c => c.id === activeTask.courseId);
            
            // Render Info Kiri
            const titleEl = document.getElementById('task-detail-title');
            const courseEl = document.getElementById('task-detail-course');
            const deadlineEl = document.getElementById('task-detail-deadline');
            const statusBadgeEl = document.getElementById('task-status-badge');
            
            if (titleEl) titleEl.innerHTML = `${activeTask.title} <button class="btn btn-sm btn-outline-primary ms-3 fw-semibold" onclick="handleBackpackNav(event)" style="border-radius: var(--radius-btn); vertical-align: middle; font-size: 14px;"><i class="ph-bold ph-folder-open me-1"></i> Buka Folder Tugas</button>`;
            if (courseEl) courseEl.innerHTML = `<i class="ph ph-book-open me-1"></i> ${course ? course.name : 'Mata Kuliah'}`;
            if (deadlineEl) deadlineEl.innerHTML = `<i class="ph ph-clock me-1"></i> Tenggat: ${activeTask.deadline}`;
            
            const backBtn = document.getElementById('back-to-course-btn');
            if (backBtn && course) {
                backBtn.href = `course-detail.html?courseId=${course.id}`;
                backBtn.innerHTML = `<i class="ph ph-arrow-left me-1"></i> Kembali ke ${course.name}`;
            }
            
            if (statusBadgeEl) {
                let badgeClass = 'bg-secondary';
                if (activeTask.status === 'todo') badgeClass = 'bg-warning text-dark';
                if (activeTask.status === 'inprogress') badgeClass = 'bg-primary';
                if (activeTask.status === 'submitted') badgeClass = 'bg-success';
                statusBadgeEl.className = `badge ${badgeClass} fs-6`;
                statusBadgeEl.textContent = activeTask.status.toUpperCase();
            }

            if (activeTask.isGroup) {
                const collabContainer = document.getElementById('task-collab-btn-container');
                if (collabContainer) {
                    collabContainer.innerHTML = `
                        <div class="mt-4 p-4 border border-primary rounded" style="background-color: rgba(var(--color-primary-rgb), 0.05);">
                            <div class="d-flex align-items-center mb-3">
                                <i class="ph-fill ph-users-three fs-1 text-primary me-3"></i>
                                <div>
                                    <h6 class="fw-bold text-primary mb-1">Tugas Kelompok</h6>
                                    <p class="small text-muted mb-0">Tugas ini dikerjakan bersama tim Anda di CollabSpace.</p>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-lg w-100 fw-bold shadow-sm" onclick="window.location.href='collab.html'" style="border-radius: var(--radius-btn);"><i class="ph-bold ph-rocket me-2"></i>Masuk ke CollabSpace (Lana's Branch)</button>
                        </div>
                    `;
                }
            }

            // Render Timeline Kanan
            const timelineContainer = document.getElementById('task-timeline-container');
            if (timelineContainer && activeTask.submissionHistory) {
                let timelineHTML = `<div class="position-relative ms-3 border-start border-2 border-primary pb-3">`;
                
                activeTask.submissionHistory.forEach((node, index) => {
                    let dotColor = 'var(--color-secondary)';
                    let bgAlert = '';
                    let extraContent = '';
                    
                    if (node.color === 'secondary') {
                        dotColor = '#6c757d';
                    } else if (node.color === 'warning') {
                        dotColor = '#ffc107';
                        bgAlert = 'background-color: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107;';
                    } else if (node.color === 'danger') {
                        dotColor = '#dc3545';
                        bgAlert = 'background-color: rgba(220, 53, 69, 0.1); border-left: 3px solid #dc3545;';
                        if (node.comment) {
                            extraContent = `
                                <div class="mt-2">
                                    <button class="btn btn-sm btn-outline-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComment${index}" aria-expanded="false" aria-controls="collapseComment${index}">
                                        <i class="ph ph-chat-text me-1"></i> Lihat Komentar Dosen
                                    </button>
                                    <div class="collapse mt-2" id="collapseComment${index}">
                                        <div class="card card-body bg-white border-danger text-danger small shadow-sm p-2">
                                            " ${node.comment} "
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    } else if (node.color === 'success') {
                        dotColor = '#28a745';
                        bgAlert = 'background-color: rgba(40, 167, 69, 0.1); border-left: 3px solid #28a745;';
                        if (activeTask.score) {
                             extraContent = `<div class="mt-2 fw-bold text-success"><i class="ph ph-check-circle me-1"></i> Nilai Akhir: ${activeTask.score}</div>`;
                        }
                    }

                    timelineHTML += `
                        <div class="position-relative mb-4" style="padding-left: 20px;">
                            <span class="position-absolute rounded-circle shadow-sm" style="width: 14px; height: 14px; background-color: ${dotColor}; left: -8px; top: 5px; border: 2px solid var(--color-surface);"></span>
                            <div class="p-3 rounded" style="${bgAlert ? bgAlert : 'background-color: var(--color-surface);'}">
                                <h6 class="fw-bold mb-1" style="color: var(--text-primary);">${node.title}</h6>
                                <div class="small mb-1 fw-semibold" style="color: var(--text-secondary);"><i class="ph ph-calendar-blank me-1"></i> ${node.date}</div>
                                <p class="small mb-0" style="color: var(--text-primary);">${node.desc}</p>
                                ${extraContent}
                            </div>
                        </div>
                    `;
                });
                
                timelineHTML += `</div>`;
                timelineContainer.innerHTML = timelineHTML;
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN ASSESSMENT (KANBAN BOARD)
    // ========================================================
    const todoColumn = document.getElementById('todo-tasks-container');
    const inprogressColumn = document.getElementById('inprogress-tasks-container');
    const doneColumn = document.getElementById('done-tasks-container');

    if (todoColumn && user.assignments) {
        const priorityOrder = { high: 1, medium: 2, low: 3 };

        const renderTask = (task) => {
            const course = user.enrolledCourses ? user.enrolledCourses.find(c => c.id === task.courseId) : null;
            const courseName = course ? course.name : 'Mata Pelajaran';
            return `
            <a href="task-detail.html?taskId=${task.id}" class="card p-3 mb-3 task-priority-${task.priority} text-decoration-none d-block">
                <span class="badge mb-2 align-self-start fw-bold" style="background-color: var(--color-surface); color: var(--color-primary); border: 1px solid var(--border-hairline); font-size: 11px;">
                    ${task.priority.toUpperCase()}
                </span>
                ${task.isGroup ? `<span class="badge bg-primary mb-2 ms-1 fw-bold" style="font-size: 11px;"><i class="ph-fill ph-users-three me-1"></i>Group Project</span>` : ''}
                <h6 class="fw-bold mb-1 mt-2" style="color: var(--text-primary);">${task.title}</h6>
                <div class="small mb-3" style="color: var(--color-primary); font-weight: 600; position: relative; z-index: 2;" onclick="event.preventDefault(); window.location.href='course-detail.html?courseId=${task.courseId}'">
                    <i class="ph ph-book-open me-1"></i> ${courseName}
                </div>
                <div class="d-flex justify-content-between align-items-center small" style="color: var(--text-secondary);">
                    <span><i class="ph ph-calendar-blank me-1"></i>${task.deadline}</span>
                    ${task.score ? `<span style="color: #20c997; font-weight:bold;">${task.score}</span>` : ''}
                </div>
            </a>
            `;
        };

        const filterAndSort = (status) => user.assignments
            .filter(t => t.status === status)
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
            .map(renderTask).join('');

        todoColumn.innerHTML = filterAndSort('todo');
        inprogressColumn.innerHTML = filterAndSort('inprogress');
        doneColumn.innerHTML = filterAndSort('submitted');
    }

    // Logika Logout Fleksibel
    document.body.addEventListener('click', function (e) {
        const logoutButton = e.target.closest('#logoutBtn');
        if (logoutButton) {
            sessionStorage.removeItem('loggedInUser');
            const basePath = window.location.pathname.includes('/pages/') ? '../../' : './';
            window.location.href = basePath + 'index.html';
        }
    });

    // ========================================================
    // LOGIKA WORKSPACE SWITCHER (TEACHER CONSOLE ISOLATION)
    // ========================================================
    let currentTeacherWorkspace = user.activeWorkspace || 'univ';

    const renderTeacherCourses = () => {
        const courseListContainer = document.getElementById('teacher-course-list');
        const workspaceTitle = document.getElementById('workspace-title');

        if (!courseListContainer) return; // Proteksi jika tidak berada di halaman teacher-courses

        // Sinkronisasi Judul Halaman Utama berdasarkan Workspace aktif
        if (currentTeacherWorkspace === 'univ') {
            workspaceTitle.innerHTML = `Kelola Mata Kuliah <span class="badge ms-2" style="background-color: rgba(155, 81, 224, 0.2); color: #9b51e0; font-size:12px;">Level: S1</span>`;
        } else {
            workspaceTitle.innerHTML = `Kelola Mata Kuliah <span class="badge ms-2" style="background-color: rgba(28, 28, 28, 0.2); color: #ffffff; border:1px solid var(--border-hairline); font-size:12px;">Level: SMA</span>`;
        }

        // Ambil data pelajaran guru yang sesuai dengan kecocokan ID ruang kerja (univ/sma)
        // Kita menggunakan metode pencocokan string ID untuk isolasi data aman
        const availableClasses = user.teachingClasses.filter(cls => {
            if (currentTeacherWorkspace === 'univ') return !cls.id.includes('sma') && !cls.id.includes('smp');
            return cls.id.includes('sma') || cls.id.includes('smp');
        });

        courseListContainer.innerHTML = availableClasses.map((cls, idx) => `
            <button class="list-group-item list-group-item-action bg-transparent text-start p-3 border rounded mb-2 btn-select-class-cms" 
                    data-class-id="${cls.id}" 
                    style="border-color: var(--border-hairline); color: var(--text-primary);">
                <div class="fw-bold fs-6 mb-1 text-white">${cls.name}</div>
                <div class="d-flex justify-content-between small text-muted">
                    <span><i class="ph ph-users me-1"></i> ${cls.students} Siswa</span>
                    <span><i class="ph ph-calendar-blank me-1"></i> ${cls.nextSession.split(',')[0]}</span>
                </div>
            </button>
        `).join('');

        // Reset tampilan kanan jika workspace berpindah
        document.getElementById('teacherSyllabusBuilder').innerHTML = `
            <div class="text-center py-5 text-muted" id="syllabus-empty-state">
                <i class="ph ph-layout display-4 mb-2"></i>
                <p class="small">Silakan pilih salah satu kelas aktif dari daftar ruang kerja untuk mengelola silabus.</p>
            </div>
        `;
        document.getElementById('active-managed-course').textContent = 'Pilih kelas di sebelah kiri';
        document.getElementById('active-managed-lecturer').textContent = '';
        document.getElementById('btn-add-week').setAttribute('disabled', 'true');
    };

    // Deteksi perubahan element dropdown Workspace Switcher di dalam Sidebar
    document.body.addEventListener('change', function (e) {
        if (e.target && e.target.closest('.sidebar-teacher select')) {
            currentTeacherWorkspace = e.target.value;
            user.activeWorkspace = currentTeacherWorkspace;
            sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Kunci keadaan state di session

            // Re-render konten utama halaman CMS jika guru memindahkan opsi workspace
            renderTeacherCourses();

            // Jika berada di dashboard utama guru, lakukan relokasi atau refresh widget
            if (window.location.pathname.includes('teacher-dashboard')) {
                window.location.reload();
            }
        }
    });

    // Pemicu aksi klik kelas kiri untuk menampilkan struktur pembuatan silabus CMS
    document.body.addEventListener('click', function (e) {
        const classBtn = e.target.closest('.btn-select-class-cms');
        if (classBtn) {
            document.querySelectorAll('.btn-select-class-cms').forEach(b => b.style.borderColor = 'var(--border-hairline)');
            classBtn.style.borderColor = 'var(--color-primary)';

            const classId = classBtn.getAttribute('data-class-id');
            const targetClass = user.teachingClasses.find(c => c.id === classId);

            document.getElementById('active-managed-course').textContent = targetClass.name;
            document.getElementById('active-managed-lecturer').innerHTML = `<i class="ph ph-clock me-1"></i> Jadwal Sesi: ${targetClass.nextSession}`;
            document.getElementById('btn-add-week').removeAttribute('disabled');

            // Simulasi Render Silabus Moodle-Style builder untuk guru menyusun materi
            document.getElementById('teacherSyllabusBuilder').innerHTML = `
                <div class="accordion-item mb-3 border-0 bg-transparent">
                    <h2 class="accordion-header">
                        <button class="accordion-button syllabus-btn rounded fw-bold text-white" type="button" data-bs-toggle="collapse" data-bs-target="#cmsWeek15">
                            Minggu Sesi 15: Pengembangan Komponen UI Adaptif
                        </button>
                    </h2>
                    <div id="cmsWeek15" class="accordion-collapse collapse show">
                        <div class="accordion-body p-3 mt-2 rounded" style="background-color: var(--bg-canvas); border-left: 3px solid var(--color-primary);">
                            <div class="d-flex flex-column gap-2">
                                <div class="p-2 border border-dashed rounded d-flex justify-content-between align-items-center" style="border-color: var(--border-hairline);">
                                    <span class="small text-white"><i class="ph-fill ph-file-pdf me-2 text-danger"></i> Dokumentasi Pokok Silabus.pdf</span>
                                    <button class="btn btn-sm text-danger"><i class="ph ph-trash"></i></button>
                                </div>
                                <div class="p-2 border border-dashed rounded d-flex justify-content-between align-items-center" style="border-color: var(--border-hairline);">
                                    <span class="small text-white"><i class="ph-fill ph-clipboard-text me-2 text-warning"></i> Penugasan Proyek Kelompok Utama</span>
                                    <button class="btn btn-sm text-danger"><i class="ph ph-trash"></i></button>
                                </div>
                                <div class="d-flex gap-2 mt-2">
                                    <button class="btn btn-sm btn-outline-light" style="border-color: var(--border-hairline); font-size:12px;">+ Tambah Berkas PDF</button>
                                    <button class="btn btn-sm btn-outline-light" style="border-color: var(--border-hairline); font-size:12px;">+ Tambah Link Diskusi</button>
                                    <button class="btn btn-sm btn-outline-warning" data-bs-toggle="modal" data-bs-target="#createGroupTaskModal" style="font-size:12px; color:#ffc107;">+ Buat Slot Tugas Kelompok</button>                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    // Inisialisasi awal saat halaman kelola mata kuliah dimuat pertama kali
    if (window.location.pathname.includes('teacher-courses')) {
        renderTeacherCourses();
    }

    // ========================================================
    // LOGIKA CMS: INTEGRASI FORMULIR & BATASAN TUGAS KELOMPOK (DRAG & DROP)
    // ========================================================
    const groupAllocationMode = document.getElementById('groupAllocationMode');
    const manualPanel = document.getElementById('manual-group-assignment-panel');
    const selfPanel = document.getElementById('self-group-info-panel');
    const unassignedPool = document.getElementById('unassigned-students-pool');
    const bucketsContainer = document.getElementById('groups-buckets-container');
    const maxMembersInput = document.getElementById('maxMembersInput');
    const btnAddGroupBucket = document.getElementById('btn-add-group-bucket');

    if (groupAllocationMode) {
        let availableStudents = ["Russell Reece", "Ari Okta Pratama", "Kautsar Rahman Zaki", "Nadiatu Dzaqiah", "Arita Kya Nadindra"];
        let groupCount = 2;

        // 1. Fungsi Toggle perpindahan metode
        groupAllocationMode.addEventListener('change', function () {
            if (this.value === 'manual') {
                manualPanel.classList.remove('d-none');
                selfPanel.classList.add('d-none');
            } else {
                manualPanel.classList.add('d-none');
                selfPanel.classList.remove('d-none');
            }
        });

        // 2. Render Awal (Dengan atribut draggable="true" dan zona drop)
        const renderGroupManagementComponents = () => {
            // Jadikan wadah kiri sebagai zona drop
            unassignedPool.classList.add('bucket-drop-zone');

            unassignedPool.innerHTML = availableStudents.map(student => `
                <div class="p-2 mb-2 rounded student-draggable d-flex justify-content-between align-items-center" draggable="true" data-student-name="${student}">
                    <span class="small text-white fw-bold">${student}</span>
                    <i class="ph ph-dots-six-vertical text-muted"></i>
                </div>
            `).join('');

            if (bucketsContainer.innerHTML.trim() === "" || bucketsContainer.querySelector('#syllabus-empty-state')) {
                let initialBucketsHTML = '';
                for (let i = 1; i <= groupCount; i++) {
                    initialBucketsHTML += createBucketHTML(i);
                }
                bucketsContainer.innerHTML = initialBucketsHTML;
            }
        };

        // Fungsi pembuat template HTML untuk Wadah Kelompok
        const createBucketHTML = (id) => `
            <div class="col-md-6 mb-2">
                <div class="card p-3 group-bucket-card h-100">
                    <div class="fw-bold small text-white border-bottom border-hairline pb-2 mb-2 d-flex justify-content-between align-items-center">
                        <span>Kelompok ${id}</span>
                        <span class="badge bg-transparent border border-secondary current-member-indicator" style="font-size:10px;">0 / ${maxMembersInput ? maxMembersInput.value : 5} Anggota</span>
                    </div>
                    <div class="bucket-slots-list bucket-drop-zone group-bucket-slots d-flex flex-column gap-1 p-1">
                        <span class="text-muted small text-center italic-placeholder py-2 w-100" style="font-size:11px; display:block;">Belum ada anggota</span>
                    </div>
                </div>
            </div>
        `;

        // 3. Tambah Wadah Kelompok Baru
        btnAddGroupBucket.addEventListener('click', function () {
            groupCount++;
            bucketsContainer.insertAdjacentHTML('beforeend', createBucketHTML(groupCount));
            updateAllBucketCounters(); // Update teks rasio agar sinkron
        });

        // 4. ALGORITMA DRAG AND DROP
        let draggedStudent = null;
        let sourceZone = null;

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList && e.target.classList.contains('student-draggable')) {
                draggedStudent = e.target;
                sourceZone = e.target.closest('.bucket-drop-zone');
                e.dataTransfer.effectAllowed = 'move';
                // Delay sedikit agar elemen aslinya disembunyikan sementara shadow-nya ikut mouse
                setTimeout(() => e.target.style.opacity = '0.4', 0);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList && e.target.classList.contains('student-draggable')) {
                e.target.style.opacity = '1';
                draggedStudent = null;
                sourceZone = null;
                // Bersihkan efek menyala dari semua area saat kursor dilepas
                document.querySelectorAll('.bucket-drop-zone').forEach(zone => zone.classList.remove('drag-over-highlight'));
            }
        });

        document.addEventListener('dragover', (e) => {
            const dropZone = e.target.closest('.bucket-drop-zone');
            if (dropZone && draggedStudent) {
                e.preventDefault(); // Wajib untuk mengizinkan 'drop'
                dropZone.classList.add('drag-over-highlight');
            }
        });

        document.addEventListener('dragleave', (e) => {
            const dropZone = e.target.closest('.bucket-drop-zone');
            if (dropZone) {
                dropZone.classList.remove('drag-over-highlight');
            }
        });

        document.addEventListener('drop', (e) => {
            const dropZone = e.target.closest('.bucket-drop-zone');
            if (dropZone && draggedStudent) {
                e.preventDefault();
                dropZone.classList.remove('drag-over-highlight');

                // Validasi Kuota Maksimal jika targetnya adalah kelompok (bukan pool kiri)
                const isGroupBucket = dropZone.classList.contains('group-bucket-slots');

                if (isGroupBucket) {
                    const maxAllowed = parseInt(maxMembersInput.value);
                    // Hitung jumlah anggota di kotak target saat ini
                    const currentMembers = dropZone.querySelectorAll('.student-draggable').length;

                    // Tolak jika kotak beda dengan sumber asalnya, dan target sudah penuh
                    if (dropZone !== sourceZone && currentMembers >= maxAllowed) {
                        alert(`Kelompok penuh! Maksimal ${maxAllowed} anggota. Silakan sesuaikan batas maksimal atau pilih kelompok lain.`);
                        return; // Batalkan perpindahan
                    }
                }

                // Sembunyikan teks placeholder "Belum ada anggota" jika ada
                const placeholder = dropZone.querySelector('.italic-placeholder');
                if (placeholder) placeholder.style.display = 'none';

                // Pindahkan elemen HTML siswa ke zona baru
                dropZone.appendChild(draggedStudent);

                // Perbarui semua penghitung angka
                updateAllBucketCounters();
            }
        });

        // 5. Fungsi Update Visual (Menghitung Ulang Anggota & Teks Placeholder)
        function updateAllBucketCounters() {
            const maxAllowed = parseInt(maxMembersInput.value);

            // Loop seluruh kotak kelompok di kanan
            document.querySelectorAll('.group-bucket-card').forEach(card => {
                const slots = card.querySelector('.group-bucket-slots');
                const indicator = card.querySelector('.current-member-indicator');
                const membersCount = slots.querySelectorAll('.student-draggable').length;

                // Update Badge angka (Misal: 2 / 5 Anggota)
                indicator.textContent = `${membersCount} / ${maxAllowed} Anggota`;

                // Mainkan visibilitas placeholder "Belum ada anggota"
                let placeholder = slots.querySelector('.italic-placeholder');
                if (membersCount === 0) {
                    if (!placeholder) {
                        slots.insertAdjacentHTML('afterbegin', `<span class="text-muted small text-center italic-placeholder py-2 w-100" style="font-size:11px; display:block;">Belum ada anggota</span>`);
                    } else {
                        placeholder.style.display = 'block';
                    }
                }
            });
        }

        // Pemicu saat nilai input maksimal diubah secara manual, update teks rasio secara live
        maxMembersInput.addEventListener('input', updateAllBucketCounters);

        // Render saat modal terbuka
        document.getElementById('createGroupTaskModal').addEventListener('show.bs.modal', function () {
            renderGroupManagementComponents();
            // Reset jika ada yang berubah
            if (document.querySelectorAll('.group-bucket-card').length > 0) updateAllBucketCounters();
        });
    }

    // ========================================================
    // LOGIKA HALAMAN GRADES (STUDENT)
    // ========================================================
    if (currentPage === 'grades' && user.performanceData) {
        const gradingContainer = document.getElementById('grading-visualization-container');
        if (gradingContainer) {
            if (user.level === 'S1') {
                // UNIVERSITAS: Transcript Table
                const academicData = user.performanceData.filter(d => d.type === 'academic');
                let totalSks = 0;
                let totalScore = 0;
                
                const tableRows = academicData.map((d, index) => {
                    totalSks += d.sks;
                    totalScore += (d.score * d.sks);
                    return `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td>${d.code}</td>
                            <td>${d.aspect}</td>
                            <td class="text-center">${d.sks}</td>
                            <td class="text-center fw-bold">${d.grade}</td>
                            <td class="text-center">${d.score}</td>
                        </tr>
                    `;
                }).join('');
                
                const gpa = (totalScore / totalSks / 25).toFixed(2); // Simplified GPA calculation out of 4.0

                gradingContainer.innerHTML = `
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover mb-0" style="background-color: var(--color-surface); color: var(--text-primary);">
                            <thead class="table-dark">
                                <tr>
                                    <th class="text-center" width="5%">No</th>
                                    <th width="15%">Kode MK</th>
                                    <th>Mata Kuliah</th>
                                    <th class="text-center" width="10%">SKS</th>
                                    <th class="text-center" width="10%">Huruf Mutu</th>
                                    <th class="text-center" width="10%">Nilai (0-100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                            <tfoot class="fw-bold" style="background-color: rgba(var(--color-primary-rgb), 0.1);">
                                <tr>
                                    <td colspan="3" class="text-end">Total SKS Diambil:</td>
                                    <td class="text-center">${totalSks}</td>
                                    <td class="text-end">Indeks Prestasi Kumulatif (IPK):</td>
                                    <td class="text-center text-primary fs-5">${gpa}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                `;
            } else {
                // TK-SMA: Radar Chart
                gradingContainer.innerHTML = `
                    <div class="row align-items-center">
                        <div class="col-md-6 text-center mb-4 mb-md-0">
                            <canvas id="studentRadarChart" style="max-height: 400px;"></canvas>
                        </div>
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-4" style="color: var(--text-primary);">Analisis Kemampuan Siswa</h5>
                            <ul class="list-group list-group-flush bg-transparent">
                                ${user.performanceData.map(d => `
                                    <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center" style="border-color: var(--border-hairline); color: var(--text-primary);">
                                        <div class="d-flex align-items-center">
                                            <span class="badge ${d.type === 'academic' ? 'bg-primary' : 'bg-warning text-dark'} me-3">${d.type === 'academic' ? 'Akademik' : 'Soft Skill'}</span>
                                            <span class="fw-semibold">${d.aspect}</span>
                                        </div>
                                        <span class="fw-bold">${d.score} / 100</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;

                // Initialize Chart.js
                const labels = user.performanceData.map(d => d.aspect);
                const scores = user.performanceData.map(d => d.score);
                const ctx = document.getElementById('studentRadarChart');
                
                if (ctx) {
                    new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Student Performance',
                                data: scores,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                            }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                r: {
                                    angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                                    grid: { color: 'rgba(128, 128, 128, 0.2)' },
                                    pointLabels: { color: 'var(--text-primary)', font: { size: 12, family: "'Inter', sans-serif" } },
                                    ticks: { color: 'var(--text-secondary)', backdropColor: 'transparent', min: 0, max: 100 }
                                }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }
                    });
                }
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN GRADING PANEL (TEACHER)
    // ========================================================
    if (currentPage === 'grading-panel' && user.theme === 'teacher') {
        const tableContainer = document.getElementById('teacher-grading-table-container');
        if (tableContainer) {
            if (typeof mockUsers !== 'undefined') {
                const studentUsers = mockUsers.filter(u => u.level !== 'Teacher');
                
                const tableRows = studentUsers.map((u, index) => {
                    let avg = 0;
                    if (u.performanceData && u.performanceData.length > 0) {
                        const sum = u.performanceData.reduce((acc, curr) => acc + curr.score, 0);
                        avg = (sum / u.performanceData.length).toFixed(1);
                    }
                    
                    return `
                        <tr class="bg-transparent" style="border-bottom: 1px solid var(--border-hairline); background-color: transparent !important;">
                            <td class="text-center align-middle" style="color: var(--text-secondary);">${index + 1}</td>
                            <td class="align-middle">
                                <div class="d-flex align-items-center">
                                    <div class="rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold text-dark" style="width: 32px; height: 32px; background-color: var(--color-primary);">${u.name.charAt(0)}</div>
                                    <div>
                                        <div class="fw-bold text-white mb-0" style="font-size: 14px;">${u.name}</div>
                                        <div class="small" style="color: var(--text-secondary); font-size: 11px;">@${u.username}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center"><span class="badge" style="background-color: rgba(255, 255, 255, 0.1); color: #fff;">${u.level}</span></td>
                            <td class="align-middle text-center"><span class="fw-bold" style="color: var(--color-primary);">${avg}</span></td>
                            <td class="align-middle text-center">
                                <button class="btn btn-sm btn-outline-light me-1" style="font-size: 12px; border-color: var(--border-hairline);"><i class="ph ph-pencil-simple"></i> Edit</button>
                                <button class="btn btn-sm btn-outline-success" style="font-size: 12px;"><i class="ph ph-check"></i> Finalize</button>
                            </td>
                        </tr>
                    `;
                }).join('');

                tableContainer.innerHTML = `
                    <table class="table table-borderless table-hover mb-0 table-dark" style="background-color: transparent; --bs-table-bg: transparent;">
                        <thead style="background-color: rgba(255,255,255,0.05); border-bottom: 1px solid var(--border-hairline);">
                            <tr>
                                <th class="text-center text-muted fw-semibold small py-3" width="5%">NO</th>
                                <th class="text-muted fw-semibold small py-3" width="35%">NAMA SISWA</th>
                                <th class="text-center text-muted fw-semibold small py-3" width="15%">JENJANG</th>
                                <th class="text-center text-muted fw-semibold small py-3" width="15%">RATA-RATA</th>
                                <th class="text-center text-muted fw-semibold small py-3" width="20%">AKSI</th>
                            </tr>
                        </thead>
                        <tbody style="background-color: transparent;">
                            ${tableRows}
                        </tbody>
                    </table>
                `;
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN BACKPACK (STUDENT)
    // ========================================================
    if (currentPage === 'backpack') {
        const btnGdrive = document.getElementById('btn-connect-gdrive');
        const statusGdrive = document.getElementById('gdrive-status');
        const treeContainer = document.getElementById('backpack-tree');
        const emptyState = document.getElementById('backpack-empty-state');
        const btnSimEnroll = document.getElementById('btn-sim-enroll');
        const btnOpenCloud = document.getElementById('btn-open-cloud');
        const btnOnedrive = document.getElementById('btn-connect-onedrive');
        const statusOnedrive = document.getElementById('onedrive-status');

        // Function to render tree
        const renderTree = (node) => {
            let icon = node.type === 'folder' ? '<i class="ph-fill ph-folder folder-icon me-2"></i>' : '<i class="ph-duotone ph-file-text file-icon me-2"></i>';
            let html = `<li><div class="d-flex align-items-center">${icon}<span class="fw-medium">${node.name}</span> <span class="small text-muted ms-2">${node.size || ''}</span></div>`;
            if (node.children && node.children.length > 0) {
                html += `<ul class="folder-tree">`;
                node.children.forEach(child => {
                    html += renderTree(child);
                });
                html += `</ul>`;
            }
            html += `</li>`;
            return html;
        };

        const updateBackpackUI = () => {
            if (user.backpack && user.backpack.connected) {
                if (user.backpack.provider === 'gdrive') {
                    statusGdrive.innerHTML = '<span class="text-success fw-bold"><i class="ph-bold ph-check-circle me-1"></i>Connected</span>';
                    statusGdrive.classList.remove('text-muted');
                    btnGdrive.textContent = 'Disconnect';
                    btnGdrive.classList.replace('btn-outline-primary', 'btn-outline-danger');
                    if (btnOnedrive) btnOnedrive.disabled = true;
                    if (btnOpenCloud) {
                        btnOpenCloud.innerHTML = '<i class="ph-bold ph-arrow-square-out me-1"></i> Buka di Google Drive';
                        btnOpenCloud.href = 'https://drive.google.com/drive/my-drive';
                    }
                } else if (user.backpack.provider === 'onedrive') {
                    if (statusOnedrive) {
                        statusOnedrive.innerHTML = '<span class="text-success fw-bold"><i class="ph-bold ph-check-circle me-1"></i>Connected</span>';
                        statusOnedrive.classList.remove('text-muted');
                    }
                    if (btnOnedrive) {
                        btnOnedrive.textContent = 'Disconnect';
                        btnOnedrive.classList.replace('btn-outline-primary', 'btn-outline-danger');
                    }
                    if (btnGdrive) btnGdrive.disabled = true;
                    if (btnOpenCloud) {
                        btnOpenCloud.innerHTML = '<i class="ph-bold ph-arrow-square-out me-1"></i> Buka di OneDrive';
                        btnOpenCloud.href = 'https://onedrive.live.com';
                    }
                }
                
                emptyState.classList.add('d-none');
                treeContainer.classList.remove('d-none');
                btnSimEnroll.classList.remove('d-none');
                if (btnOpenCloud) btnOpenCloud.classList.remove('d-none');

                // Render tree
                let treeHtml = '';
                user.backpack.structure.forEach(node => {
                    treeHtml += renderTree(node);
                });
                treeContainer.innerHTML = treeHtml;
            }
        };

        if (btnGdrive) {
            btnGdrive.addEventListener('click', () => {
                if (!user.backpack) {
                    user.backpack = { connected: false, provider: null, structure: [] };
                }
                
                if (!user.backpack.connected) {
                    btnGdrive.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Menghubungkan...';
                    setTimeout(() => {
                        user.backpack.connected = true;
                        user.backpack.provider = 'gdrive';
                        if (user.backpack.structure.length === 0) {
                            user.backpack.structure = [{ id: 'root', name: 'LMS_Backpack', type: 'folder', children: [] }];
                        }
                        updateBackpackUI();
                    }, 1500);
                } else {
                    user.backpack.connected = false;
                    user.backpack.provider = null;
                    statusGdrive.innerHTML = 'Belum terhubung';
                    statusGdrive.classList.add('text-muted');
                    btnGdrive.textContent = 'Tautkan';
                    btnGdrive.classList.replace('btn-outline-danger', 'btn-outline-primary');
                    btnGdrive.disabled = false;
                    
                    if (statusOnedrive) {
                        statusOnedrive.innerHTML = 'Belum terhubung';
                        statusOnedrive.classList.add('text-muted');
                    }
                    if (btnOnedrive) {
                        btnOnedrive.textContent = 'Tautkan';
                        btnOnedrive.classList.replace('btn-outline-danger', 'btn-outline-primary');
                        btnOnedrive.disabled = false;
                    }
                    
                    emptyState.classList.remove('d-none');
                    treeContainer.classList.add('d-none');
                    btnSimEnroll.classList.add('d-none');
                    if (btnOpenCloud) btnOpenCloud.classList.add('d-none');
                }
            });
        }

        if (btnOnedrive) {
            btnOnedrive.addEventListener('click', () => {
                if (!user.backpack) {
                    user.backpack = { connected: false, provider: null, structure: [] };
                }
                
                if (!user.backpack.connected) {
                    btnOnedrive.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Menghubungkan...';
                    setTimeout(() => {
                        user.backpack.connected = true;
                        user.backpack.provider = 'onedrive';
                        if (user.backpack.structure.length === 0) {
                            user.backpack.structure = [{ id: 'root', name: 'LMS_Backpack', type: 'folder', children: [] }];
                        }
                        updateBackpackUI();
                    }, 1500);
                } else {
                    user.backpack.connected = false;
                    user.backpack.provider = null;
                    statusOnedrive.innerHTML = 'Belum terhubung';
                    statusOnedrive.classList.add('text-muted');
                    btnOnedrive.textContent = 'Tautkan';
                    btnOnedrive.classList.replace('btn-outline-danger', 'btn-outline-primary');
                    btnOnedrive.disabled = false;
                    
                    if (statusGdrive) {
                        statusGdrive.innerHTML = 'Belum terhubung';
                        statusGdrive.classList.add('text-muted');
                    }
                    if (btnGdrive) {
                        btnGdrive.textContent = 'Tautkan';
                        btnGdrive.classList.replace('btn-outline-danger', 'btn-outline-primary');
                        btnGdrive.disabled = false;
                    }
                    
                    emptyState.classList.remove('d-none');
                    treeContainer.classList.add('d-none');
                    btnSimEnroll.classList.add('d-none');
                    if (btnOpenCloud) btnOpenCloud.classList.add('d-none');
                }
            });
        }

        if (btnSimEnroll) {
            btnSimEnroll.addEventListener('click', () => {
                const rootFolder = user.backpack.structure[0];
                let semFolder = rootFolder.children.find(c => c.name === '2026_Even');
                if (!semFolder) {
                    semFolder = { id: 'sem_new', name: '2026_Even', type: 'folder', children: [] };
                    rootFolder.children.push(semFolder);
                }
                
                const newCourse = {
                    id: 'crs_' + Math.floor(Math.random()*1000),
                    name: 'MataKuliah_Baru_' + Math.floor(Math.random()*100),
                    type: 'folder',
                    children: [
                        { id: 'f_new', name: 'Tugas_Awal.docx', type: 'file', size: '0 KB' }
                    ]
                };
                
                semFolder.children.push(newCourse);
                updateBackpackUI();
            });
        }

        // Initialize UI on load
        if (user.backpack && user.backpack.connected) {
            updateBackpackUI();
        }
    }

    // ========================================================
    // LOGIKA HALAMAN COLLABSPACE (STUDENT)
    // ========================================================
    if (currentPage === 'collab') {
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('taskId') || 2;
        
        const btnBackToTask = document.getElementById('btn-back-to-task');
        if (btnBackToTask) {
            btnBackToTask.href = `task-detail.html?taskId=${taskId}`;
        }
        
        if (user.assignments) {
            const activeTask = user.assignments.find(t => t.id == taskId);
            if (activeTask) {
                const titleEl = document.getElementById('collab-doc-title');
                if (titleEl) titleEl.textContent = `Collab: ${activeTask.title}`;
            }
        }

        const renderBlock = (block, isDiff = false, diffType = '') => {
            let diffClass = '';
            if (isDiff) {
                diffClass = diffType === 'modified' ? 'block-diff-modified' : 'block-diff-added';
            }
            if (block.type === 'h2') {
                return `<div class="block-item block-h2 ${diffClass}">${block.content}</div>`;
            } else {
                return `<div class="block-item block-p ${diffClass}">${block.content}</div>`;
            }
        };

        if (typeof mockCollabState !== 'undefined') {
            document.getElementById('collab-doc-title').textContent = mockCollabState.documentTitle;
            document.getElementById('member-branch-name').textContent = mockCollabState.memberBranch.branchName;

            const mainEditor = document.getElementById('main-branch-editor');
            const memberEditor = document.getElementById('member-branch-editor');

            if (mainEditor) {
                mainEditor.innerHTML = mockCollabState.mainBranch.map(b => renderBlock(b)).join('');
            }

            if (memberEditor) {
                memberEditor.innerHTML = mockCollabState.memberBranch.content.map((b, index) => {
                    const mainBlock = mockCollabState.mainBranch.find(mb => mb.id === b.id);
                    if (!mainBlock) return renderBlock(b, true, 'added');
                    if (mainBlock.content !== b.content) return renderBlock(b, true, 'modified');
                    return renderBlock(b);
                }).join('');
            }

            const btnMerge = document.getElementById('btn-merge');
            if (btnMerge) {
                btnMerge.addEventListener('click', () => {
                    btnMerge.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Merging...';
                    setTimeout(() => {
                        // Merge logic: copy member branch content to main branch
                        mockCollabState.mainBranch = JSON.parse(JSON.stringify(mockCollabState.memberBranch.content));
                        
                        mainEditor.innerHTML = mockCollabState.mainBranch.map(b => renderBlock(b)).join('');
                        
                        // Clear diffs on member branch
                        memberEditor.innerHTML = mockCollabState.memberBranch.content.map(b => renderBlock(b)).join('');

                        btnMerge.innerHTML = '<i class="ph-bold ph-check me-2"></i>Merged Successfully';
                        btnMerge.classList.replace('btn-success', 'btn-outline-secondary');
                        btnMerge.disabled = true;
                    }, 1000);
                });
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN GRADES (`grades.html`)
    // ========================================================
    if (currentPage === 'grades') {
        const gradingContainer = document.getElementById('grading-visualization-container');
        if (gradingContainer) {
            if (user.detailedGrades) {
                let html = `
                    <div class="table-responsive bg-white rounded shadow-sm border" style="border-color: var(--border-hairline) !important;">
                        <table class="table table-bordered mb-0 align-middle text-center" style="font-size: 14px;">
                            <thead style="background-color: #e9ecef; color: #555;">
                                <tr>
                                    <th class="py-3" style="width: 8%;">SCU</th>
                                    <th class="py-3 text-start">COMPONENT</th>
                                    <th class="py-3">WEIGHT</th>
                                    <th class="py-3">SCORE</th>
                                    <th class="py-3">TOTAL</th>
                                    <th class="py-3">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                
                user.detailedGrades.forEach(course => {
                    const rowCount = course.components.length;
                    course.components.forEach((comp, index) => {
                        html += `<tr>`;
                        if (index === 0) {
                            html += `
                                <td rowspan="${rowCount}" class="fw-semibold bg-light" style="color: var(--text-primary); vertical-align: middle;">${course.scu}</td>
                            `;
                        }
                        
                        html += `
                            <td class="text-start text-muted">${comp.name}</td>
                            <td class="text-muted">${comp.weight}</td>
                            <td class="fw-semibold" style="color: #444;">${comp.score}</td>
                        `;
                        
                        if (index === 0) {
                            html += `
                                <td rowspan="${rowCount}" class="fw-semibold text-muted" style="vertical-align: middle;">${course.total}</td>
                                <td rowspan="${rowCount}" class="fw-semibold text-muted" style="vertical-align: middle;">${course.grade}</td>
                            `;
                        }
                        html += `</tr>`;
                    });
                });
                
                html += `</tbody></table></div>`;
                gradingContainer.innerHTML = html;
            } else {
                gradingContainer.innerHTML = `<div class="text-center py-5 text-muted small"><i class="ph-duotone ph-warning-circle fs-1 mb-2"></i><div>Data nilai belum tersedia.</div></div>`;
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN FINANCE (`finance.html`)
    // ========================================================
    if (currentPage === 'finance') {
        const summaryContainer = document.getElementById('finance-summary-container');
        const tableContainer = document.getElementById('finance-table-container');

        if (user.financeData) {
            // Render Summary
            if (summaryContainer) {
                summaryContainer.innerHTML = `
                    <div class="row gx-5 gy-2">
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="text-muted small">Total Billing <span style="font-size: 10px;">(TOTAL TAGIHAN)</span></span>
                                <span class="fw-semibold">: Rp <span class="float-end ms-2">${user.financeData.summary.totalBilling}</span></span>
                            </div>
                            <div class="d-flex justify-content-between mb-1">
                                <span class="text-muted small">Total Payment <span style="font-size: 10px;">(TOTAL PEMBAYARAN)</span></span>
                                <span class="fw-semibold">: Rp <span class="float-end ms-2">${user.financeData.summary.totalPayment}</span></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="text-muted small">Deposit <span style="font-size: 10px;">(DEPOSIT)</span></span>
                                <span class="fw-semibold">: Rp <span class="float-end ms-2">${user.financeData.summary.deposit}</span></span>
                            </div>
                            <div class="d-flex justify-content-between mb-1">
                                <span class="text-muted small">Outstanding Payment <span style="font-size: 10px;">(SISA TAGIHAN)</span></span>
                                <span class="fw-semibold">: Rp <span class="float-end ms-2">${user.financeData.summary.outstandingPayment}</span></span>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Render Table
            if (tableContainer) {
                let html = `
                    <div class="table-responsive bg-white rounded border" style="border-color: var(--border-hairline) !important;">
                        <table class="table mb-0 align-middle text-center" style="font-size: 13px;">
                            <thead style="background-color: #e9ecef; color: #555;">
                                <tr>
                                    <th class="py-3" style="width: 5%;">NO. <i class="ph-fill ph-caret-up ms-1" style="color: var(--color-primary);"></i></th>
                                    <th class="py-3">PERIOD<br><span style="font-size: 10px;">(PERIODE)</span> <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                    <th class="py-3 text-start">DESCRIPTION<br><span style="font-size: 10px;">(DESKRIPSI)</span></th>
                                    <th class="py-3">DUE DATE<br><span style="font-size: 10px;">(JATUH TEMPO)</span> <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                    <th class="py-3 text-end">BILLING (Rp)<br><span style="font-size: 10px;">(TAGIHAN (Rp))</span> <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                    <th class="py-3 text-end">PAYMENT (Rp)<br><span style="font-size: 10px;">(PEMBAYARAN (Rp))</span> <i class="ph-fill ph-caret-up ms-1 text-muted"></i></th>
                                    <th class="py-3">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                user.financeData.history.forEach((row, index) => {
                    let indoStatus = '';
                    if (row.status.includes("Due Date")) indoStatus = 'Belum Jatuh Tempo (Auto Debit)';
                    else if (row.status.includes("Haven't Paid")) indoStatus = 'Belum Lunas (Auto Debit)';
                    
                    html += `
                        <tr style="border-bottom: 1px solid #eaeaea;">
                            <td class="text-muted">${index + 1}</td>
                            <td class="text-muted">${row.period}</td>
                            <td class="text-start">
                                <span style="color: #444;">${row.description}</span><br>
                                <span class="text-muted" style="font-size: 11px;">(Biaya Kuliah Semester)</span>
                            </td>
                            <td class="text-muted">${row.dueDate}</td>
                            <td class="text-end text-muted">${row.billing}</td>
                            <td class="text-end text-muted">${row.payment}</td>
                            <td class="text-muted">
                                ${row.status === 'Paid' ? 'Paid' : `
                                    ${row.status.split(' (')[0]}<br>
                                    <span style="font-size: 10px;">(${indoStatus})</span>
                                `}
                            </td>
                        </tr>
                    `;
                });

                html += `</tbody></table></div>`;
                tableContainer.innerHTML = html;
            }
        }
    }

    // ========================================================
    // LOGIKA HALAMAN SCHEDULE (`schedule.html`)
    // ========================================================
    if (currentPage === 'schedule') {
        const scheduleListContainer = document.getElementById('schedule-list-container');
        const miniCalendarContainer = document.getElementById('mini-calendar-container');

        if (scheduleListContainer && user.scheduleData) {
            // Group schedule data by date
            const groupedSchedule = {};
            user.scheduleData.forEach(item => {
                if (!groupedSchedule[item.date]) {
                    groupedSchedule[item.date] = { groupStr: item.groupStr, items: [] };
                }
                groupedSchedule[item.date].items.push(item);
            });

            let listHTML = '';
            for (const [date, data] of Object.entries(groupedSchedule)) {
                const dayStr = data.groupStr.split(' ')[0];
                const dateNum = data.groupStr.split(' ')[1];

                let itemsHTML = '';
                data.items.forEach(item => {
                    let badgeClass = 'schedule-badge';
                    let badgeText = '';
                    if (item.type === 'class') { badgeText = 'Onsite Class'; }
                    else if (item.type === 'exam') { badgeText = 'Onsite Exam'; badgeClass += ' badge-exam'; }
                    else if (item.type === 'assignment') { badgeText = 'Assignment'; badgeClass += ' badge-exam'; }

                    itemsHTML += `
                        <div class="d-flex justify-content-between mb-4 border-bottom border-hairline pb-4" style="border-bottom-color: #eaeaea !important; ${data.items[data.items.length-1] === item ? 'border-bottom: none !important; margin-bottom: 0 !important; padding-bottom: 0 !important;' : ''}">
                            <div class="flex-grow-1 pe-3">
                                <h6 class="fw-bold mb-1" style="color: var(--text-primary); font-size: 15px;">${item.courseCode} <span class="fw-normal text-muted ms-1">${item.courseName}</span></h6>
                                <p class="mb-2" style="color: var(--text-primary);">${item.session}</p>
                                <div class="small text-muted d-flex align-items-center mb-1"><i class="ph-bold ${item.icon} me-2 fs-6"></i> ${item.details}</div>
                                <div class="small text-muted d-flex align-items-center mb-1"><i class="ph-bold ph-clock me-2 fs-6"></i> ${item.time}</div>
                                ${item.location ? `<div class="small text-muted d-flex align-items-center mb-1"><i class="ph-bold ph-map-pin me-2 fs-6"></i> ${item.location}</div>` : ''}
                                ${item.seat ? `<div class="small text-muted d-flex align-items-center"><i class="ph-bold ph-armchair me-2 fs-6"></i> ${item.seat}</div>` : ''}
                            </div>
                            <div class="text-end">
                                <span class="${badgeClass}">${badgeText}</span>
                            </div>
                        </div>
                    `;
                });

                listHTML += `
                    <div class="d-flex mb-4">
                        <div class="me-4 text-center date-col">
                            <div class="text-muted small">${dayStr}</div>
                            <div class="fs-2 fw-light lh-1" style="color: var(--text-primary);">${dateNum}</div>
                        </div>
                        <div class="flex-grow-1 border rounded p-4 bg-white shadow-sm" style="border-color: var(--border-hairline) !important;">
                            ${itemsHTML}
                        </div>
                    </div>
                `;
            }
            scheduleListContainer.innerHTML = listHTML;
        }

        if (miniCalendarContainer) {
            // Static mock calendar for June 2026 based on the provided image
            const eventDates = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 22, 23, 24, 25, 26, 29, 30];
            let calHTML = '<div class="calendar-grid">';
            
            // May 31 (Sun)
            calHTML += `<div class="calendar-day text-muted">31</div>`;
            
            // June 1 to 30
            for (let i = 1; i <= 30; i++) {
                const isEvent = eventDates.includes(i);
                const isActive = i === 18;
                // Generate a random color for the dot from red, purple, gray, cyan
                const dotColors = ['#dc3545', '#6f42c1', '#6c757d', '#0dcaf0'];
                const randomColor = dotColors[Math.floor(Math.random() * dotColors.length)];

                calHTML += `
                    <div class="calendar-day ${isActive ? 'active shadow-sm' : ''}">
                        ${i}
                        ${isEvent ? `<div class="event-dot" ${!isActive ? `style="background-color: ${randomColor};"` : ''}></div>` : ''}
                    </div>
                `;
            }

            // July 1 to 4
            for (let i = 1; i <= 4; i++) {
                calHTML += `<div class="calendar-day text-muted">${i}</div>`;
            }

            calHTML += '</div>';
            miniCalendarContainer.innerHTML = calHTML;
        }
    }

});