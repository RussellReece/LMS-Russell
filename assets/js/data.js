const mockUsers = [
    {
        username: 'russell_r', password: 'password123', name: 'Russell Reece', level: 'S1', theme: 'academic', dashboardUrl: 'univ-dashboard.html',
        enrolledCourses: [
            {
                id: 'is-analysis', name: "Information Systems Analysis", lecturer: "Dr. Jane Doe, M.Kom.", progress: 75, type: 'jurusan',
                syllabus: [
                    { week: 1, title: "Konsep Dasar Analisis Sistem", status: "Selesai", items: [{ type: "pdf", name: "Modul 1: Pengantar", desc: "PDF • 1.2 MB" }] },
                    { week: 2, title: "UML & Use Case Diagram", status: "Sedang Berjalan", items: [{ type: "task", name: "Laporan Analisis Sistem Berjalan", desc: "Tenggat: Besok, 23:59", priority: "high" }] }
                ]
            },
            {
                id: 'km-framework', name: "Knowledge Management Frameworks", lecturer: "Prof. Alan Smith", progress: 45, type: 'jurusan',
                syllabus: [
                    { week: 1, title: "Apa itu Knowledge Management?", status: "Selesai", items: [{ type: "video", name: "Rekaman Sesi 1", desc: "Video • 2j 10m" }] },
                    { week: 2, title: "SOCIAL Framework", status: "Sedang Berjalan", items: [{ type: "task", name: "Review Jurnal SOCIAL Framework", desc: "Tenggat: 25 Mei 2026", priority: "medium" }] }
                ]
            },
            {
                id: 'web-react', name: "Front-end React & Tailwind v4", lecturer: "Dr. Budi Santoso", progress: 90, type: 'jurusan',
                syllabus: [
                    { week: 14, title: "State Management & Hooks", status: "Selesai", items: [{ type: "task", name: "UAS Java Programming", desc: "Dinilai: 90/100", priority: "medium" }] },
                    {
                        week: 15, title: "Tailwind Component Design", status: "Sedang Berjalan",
                        items: [
                            { type: "attendance", name: "Presensi Sesi Berjalan", desc: "Masukkan 4 digit PIN dari proyektor kelas." },
                            { type: "link", name: "Dokumentasi Tailwind", desc: "Eksternal Link" },
                            { type: "task", name: "Landing Page Empact Component", desc: "Tenggat: 30 Mei 2026", priority: "low" }
                        ]
                    }
                ]
            },
            { id: 'univ-english', name: "Bahasa Inggris Akademik", lecturer: "Ibu Grace, M.Hum.", progress: 100, type: 'umum', syllabus: [{ week: 1, title: "Academic Reading", status: "Selesai", items: [{ type: "pdf", name: "Reading Material", desc: "PDF" }] }] },
            { id: 'univ-pancasila', name: "Pendidikan Kewarganegaraan", lecturer: "Drs. Ahmad, M.Si.", progress: 60, type: 'umum', syllabus: [{ week: 1, title: "Pancasila Dasar Negara", status: "Selesai", items: [{ type: "pdf", name: "Materi Bab 1", desc: "PDF" }] }] },
            { id: 'hima-si', name: "Himpunan Mahasiswa Sistem Informasi", lecturer: "Lana (Ketua HIMA)", progress: 85, type: 'komunitas', syllabus: [{ week: 1, title: "Rapat Kerja Tahunan", status: "Selesai", items: [{ type: "pdf", name: "Notulensi Raker", desc: "PDF" }] }] },
            { id: 'ukm-english', name: "UKM English Club Election", lecturer: "Nadiatu Dzaqiah", progress: 20, type: 'komunitas', syllabus: [{ week: 1, title: "Campaign Strategy", status: "Sedang Berjalan", items: [{ type: "link", name: "Form Pendaftaran", desc: "GForm" }] }] }
        ],
        ongoingClass: { id: 'web-react', name: "Front-end React & Tailwind v4", lecturer: "Dr. Budi Santoso", time: "15:20 - 17:00 WIB" },
        assignments: [
            { 
                id: 1, courseId: 'is-analysis', title: "Laporan Analisis Sistem Berjalan", deadline: "Besok, 23:59", priority: "high", status: "todo",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: '9 Mei 2026, 08:00', desc: 'Tugas dibuka dan dibaca.', color: 'secondary' }
                ]
            },
            { 
                id: 2, courseId: 'km-framework', title: "Review Jurnal SOCIAL Framework", deadline: "25 Mei 2026", priority: "medium", status: "todo", isGroup: true,
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: '10 Mei 2026, 10:15', desc: 'Tugas dibuka.', color: 'secondary' },
                    { type: 'submitted', title: 'Submitted v1', date: '11 Mei 2026, 14:00', desc: 'Menunggu penilaian.', color: 'warning' },
                    { type: 'revision', title: 'Revision Requested', date: '12 Mei 2026, 09:00', desc: 'Mohon perbaiki format penulisan sitasi.', comment: 'Terdapat sitasi yang tidak sesuai format APA style, tolong perbaiki bagian daftar pustaka.', color: 'danger' }
                ]
            },
            { 
                id: 3, courseId: 'web-react', title: "Landing Page Empact Component", deadline: "30 Mei 2026", priority: "low", status: "inprogress",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: '8 Mei 2026, 13:00', desc: 'Siswa mulai mengerjakan.', color: 'secondary' }
                ]
            },
            { 
                id: 4, courseId: 'web-react', title: "UAS Java Programming", deadline: "Selesai", priority: "medium", status: "submitted", score: "90/100",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: '1 Mei 2026, 08:00', desc: 'Ujian dimulai.', color: 'secondary' },
                    { type: 'submitted', title: 'Submitted v1', date: '1 Mei 2026, 10:00', desc: 'Jawaban dikirim.', color: 'warning' },
                    { type: 'graded', title: 'Final Submission Graded', date: '5 Mei 2026, 15:30', desc: 'Dinilai: 90/100', color: 'success' }
                ]
            }
        ],
        performanceData: [
            { aspect: "Information Systems Analysis", code: "IS101", score: 85, type: "academic", sks: 3, grade: "A" },
            { aspect: "Knowledge Management", code: "IS102", score: 78, type: "academic", sks: 3, grade: "B+" },
            { aspect: "Web Development", code: "CS201", score: 92, type: "academic", sks: 4, grade: "A" },
            { aspect: "English", code: "UN101", score: 88, type: "academic", sks: 2, grade: "A" },
            { aspect: "Kepemimpinan", code: "SS101", score: 85, type: "softskill", sks: 0, grade: "A" },
            { aspect: "Kerja Sama Tim", code: "SS102", score: 90, type: "softskill", sks: 0, grade: "A" }
        ],
        backpack: {
            connected: false,
            provider: null,
            structure: [
                { id: 'root', name: 'LMS_Backpack', type: 'folder', children: [
                    { id: 'sem', name: '2026_Even', type: 'folder', children: [
                        { id: 'crs', name: 'Information_Systems_Analysis', type: 'folder', children: [
                            { id: 'f1', name: 'Draft_Proposal.docx', type: 'file', size: '1.2 MB' }
                        ]}
                    ]}
                ]}
            ]
        },
        courseDistribution: [
            {
                semester: 1,
                courses: [
                    { code: 'CHAR6001005', name: 'Character Building: Pancasila', credits: 2, qc: 'No', minGrade: 'C', grade: 'A', status: 'PASSED' },
                    { code: 'ENTR6001005', name: 'Design Thinking', credits: 2, qc: 'No', minGrade: 'D', grade: 'A', status: 'PASSED' },
                    { code: 'ISYS6001005', name: 'Pemrograman Dasar', credits: '2 / 2', qc: 'No', minGrade: 'D', grade: 'A', status: 'PASSED' },
                    { code: 'ISYS6002005', name: 'Sistem Informasi Industri Kreatif', credits: 4, qc: 'Yes', minGrade: 'C', grade: 'B+', status: 'PASSED' },
                    { code: 'ACCT6001005', name: 'Pengantar Akuntansi', credits: 4, qc: 'No', minGrade: 'D', grade: 'A-', status: 'PASSED' },
                    { code: 'ISYS6004005', name: 'Proses Bisnis Fundamental', credits: 2, qc: 'No', minGrade: 'D', grade: 'A-', status: 'PASSED' }
                ]
            },
            {
                semester: 2,
                courses: [
                    { code: 'ISYS6003005', name: 'Analisis dan Perancangan Sistem Informasi', credits: 4, qc: 'Yes', minGrade: 'C', grade: 'A', status: 'PASSED' },
                    { code: 'ISYS6005005', name: 'UX Research and Design', credits: 4, qc: 'No', minGrade: 'D', grade: 'A', status: 'PASSED' },
                    { code: 'ISYS6006005', name: 'Sistem Basis Data', credits: '2 / 2', qc: 'No', minGrade: 'D', grade: 'A', status: 'PASSED' },
                    { code: 'ISYS6007005', name: 'Manajemen Proyek Sistem Informasi', credits: 4, qc: 'Yes', minGrade: 'C', grade: 'A', status: 'PASSED' }
                ]
            }
        ],
        detailedGrades: [
            {
                scu: 2,
                name: 'Character Building: Pancasila',
                components: [
                    { name: 'THEORY: ASSIGNMENT', weight: '20.0%', score: 'N/A' },
                    { name: 'THEORY: MID EXAM', weight: '30.0%', score: '89' },
                    { name: 'THEORY: FINAL EXAM', weight: '50.0%', score: 'N/A' }
                ],
                total: 'N/A',
                grade: 'N/A'
            },
            {
                scu: 4,
                name: 'Analisis dan Perancangan Sistem Informasi',
                components: [
                    { name: 'THEORY: PROJECT', weight: '50.0%', score: 'N/A' },
                    { name: 'THEORY: FINAL EXAM', weight: '30.0%', score: 'N/A' },
                    { name: 'THEORY: MID EXAM', weight: '20.0%', score: '95' }
                ],
                total: 'N/A',
                grade: 'N/A'
            },
            {
                scu: 4,
                name: 'Sistem Basis Data',
                components: [
                    { name: 'LAB: ASSIGNMENT', weight: '20.0%', score: 'N/A' },
                    { name: 'LAB: FINAL EXAM', weight: '20.0%', score: 'N/A' },
                    { name: 'THEORY: ASSIGNMENT', weight: '12.0%', score: 'N/A' },
                    { name: 'THEORY: MID EXAM', weight: '18.0%', score: '94' },
                    { name: 'THEORY: FINAL EXAM', weight: '30.0%', score: 'N/A' }
                ],
                total: 'N/A',
                grade: 'N/A'
            },
            {
                scu: 6,
                name: 'UX Research and Design',
                components: [
                    { name: 'LAB: ASSIGNMENT', weight: '15.0%', score: 'N/A' },
                    { name: 'LAB: FINAL EXAM', weight: '15.0%', score: 'N/A' },
                    { name: 'THEORY: ASSIGNMENT', weight: '14.0%', score: 'N/A' },
                    { name: 'THEORY: FINAL EXAM', weight: '35.0%', score: 'N/A' },
                    { name: 'THEORY: MID EXAM', weight: '21.0%', score: '86' }
                ],
                total: 'N/A',
                grade: 'N/A'
            }
        ],
        financeData: {
            summary: {
                totalBilling: '30.000.000,00',
                totalPayment: '24.000.000,00',
                deposit: '0,00',
                outstandingPayment: '6.000.000,00'
            },
            history: [
                {
                    period: '2026, Odd Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '14 Aug 2026',
                    billing: '3.000.000,00',
                    payment: '0,00',
                    status: "Haven't Due Date yet (Auto Debit)"
                },
                {
                    period: '2026, Odd Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '29 May 2026',
                    billing: '3.000.000,00',
                    payment: '0,00',
                    status: "Haven't Paid (Auto Debit)"
                },
                {
                    period: '2025, Even Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '30 Jan 2026',
                    billing: '3.000.000,00',
                    payment: '3.000.000,00',
                    status: 'Paid'
                },
                {
                    period: '2025, Even Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '29 Nov 2025',
                    billing: '3.000.000,00',
                    payment: '3.000.000,00',
                    status: 'Paid'
                },
                {
                    period: '2025, Odd Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '26 Aug 2025',
                    billing: '3.000.000,00',
                    payment: '3.000.000,00',
                    status: 'Paid'
                },
                {
                    period: '2025, Odd Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '26 May 2025',
                    billing: '3.000.000,00',
                    payment: '3.000.000,00',
                    status: 'Paid'
                },
                {
                    period: '2024, Even Semester',
                    description: 'Fixed Tuition Fee',
                    dueDate: '3 Feb 2025',
                    billing: '3.000.000,00',
                    payment: '3.000.000,00',
                    status: 'Paid'
                }
            ]
        },
        classmates: [
            { nim: '2702345601', name: 'Alvin Wibowo', email: 'alvin.wibowo@binus.ac.id' },
            { nim: '2702345602', name: 'Bagas Aditya', email: 'bagas.aditya@binus.ac.id' },
            { nim: '2702345603', name: 'Clara Bella', email: 'clara.bella@binus.ac.id' },
            { nim: '2702345604', name: 'Daniel Pratama', email: 'daniel.pratama@binus.ac.id' },
            { nim: '2702345605', name: 'Erika Larasati', email: 'erika.larasati@binus.ac.id' },
            { nim: '2702345606', name: 'Fahri Muhammad', email: 'fahri.muhammad@binus.ac.id' },
            { nim: '2702345607', name: 'Gita Saraswati', email: 'gita.saraswati@binus.ac.id' },
            { nim: '2702345608', name: 'Hendra Saputra', email: 'hendra.saputra@binus.ac.id' }
        ],
        attendanceData: {
            summary: { totalSession: 13, totalAttendance: 12, minimalAttendance: 11 },
            history: [
                { session: 'Session 1', delivery: 'Onsite - F2F', startDate: '12 Feb 2026, 15:20 GMT+7', endDate: '12 Feb 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 2', delivery: 'Onsite - F2F', startDate: '19 Feb 2026, 15:20 GMT+7', endDate: '19 Feb 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 3', delivery: 'Onsite - F2F', startDate: '26 Feb 2026, 15:20 GMT+7', endDate: '26 Feb 2026, 17:00 GMT+7', status: 'absent', req: 'Classroom Check-In' },
                { session: 'Session 4', delivery: 'Onsite - F2F', startDate: '05 Mar 2026, 15:20 GMT+7', endDate: '05 Mar 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 5', delivery: 'Onsite - F2F', startDate: '12 Mar 2026, 15:20 GMT+7', endDate: '12 Mar 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 6', delivery: 'Onsite - F2F', startDate: '26 Mar 2026, 15:20 GMT+7', endDate: '26 Mar 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 7', delivery: 'Onsite - F2F', startDate: '02 Apr 2026, 15:20 GMT+7', endDate: '02 Apr 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 8', delivery: 'Onsite - F2F', startDate: '06 May 2026, 15:20 GMT+7', endDate: '06 May 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 9', delivery: 'Onsite - F2F', startDate: '07 May 2026, 15:20 GMT+7', endDate: '07 May 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 10', delivery: 'Onsite - F2F', startDate: '21 May 2026, 15:20 GMT+7', endDate: '21 May 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 11', delivery: 'Onsite - F2F', startDate: '04 Jun 2026, 15:20 GMT+7', endDate: '04 Jun 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 12', delivery: 'Onsite - F2F', startDate: '11 Jun 2026, 15:20 GMT+7', endDate: '11 Jun 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' },
                { session: 'Session 13', delivery: 'Onsite - F2F', startDate: '18 Jun 2026, 15:20 GMT+7', endDate: '18 Jun 2026, 17:00 GMT+7', status: 'present', req: 'Classroom Check-In' }
            ]
        },
        scheduleData: [
            { id: 1, date: '2026-06-18', groupStr: 'Thu 18', type: 'class', courseCode: 'BA05 - LAB', courseName: 'Pemrograman Front-End Web', icon: 'ph-users', details: 'F2F', session: 'Session 13', time: '13:20 - 15:00 GMT+7', location: 'Kampus Utama Universitas Satu - B302' },
            { id: 2, date: '2026-06-18', groupStr: 'Thu 18', type: 'class', courseCode: 'BA05 - LAB', courseName: 'Office Automation Industri Kreatif', icon: 'ph-users', details: 'F2F', session: 'Session 13', time: '15:20 - 17:00 GMT+7', location: 'Kampus Utama Universitas Satu - B204' },
            { id: 3, date: '2026-06-22', groupStr: 'Mon 22', type: 'exam', courseCode: 'LA03 - LEC', courseName: 'Character Building: Kewarganegaraan', icon: 'ph-exam', details: 'FIN', session: 'THEORY: FINAL EXAM', time: '10:00 - 11:40 GMT+7', location: '1BNDUNG - B201', seat: 'Seat 9' },
            { id: 4, date: '2026-06-23', groupStr: 'Tue 23', type: 'exam', courseCode: 'LA05 - LEC', courseName: 'Social Media Marketing & Analytics', icon: 'ph-exam', details: 'FIN', session: 'THEORY: FINAL EXAM', time: '15:00 - 16:40 GMT+7', location: '1BNDUNG - B103', seat: 'Seat 2' },
            { id: 5, date: '2026-06-24', groupStr: 'Wed 24', type: 'exam', courseCode: 'LA05 - LEC', courseName: 'Data and Information Management', icon: 'ph-exam', details: 'FIN', session: 'THEORY: FINAL EXAM', time: '13:00 - 14:40 GMT+7', location: '1BNDUNG - B201', seat: 'Seat 6' },
            { id: 6, date: '2026-06-24', groupStr: 'Wed 24', type: 'assignment', courseCode: 'LA03 - LEC', courseName: 'Character Building: Kewarganegaraan', icon: 'ph-clipboard-text', details: 'Assignment Details:', session: 'Portal Pengumpulan Tugas Artikel', time: 'Due Date: 24 Juni 2026, 23:59 GMT+7', location: '' }
        ]
    },
    {
        username: 'ari_okta', password: 'password123', name: 'Ari Okta Pratama', level: 'SMA', theme: 'teens', dashboardUrl: 'teens-dashboard.html',
        enrolledCourses: [
            { id: 'sma-mat', name: "Matematika Peminatan", lecturer: "Bpk. Hermawan", progress: 70, type: 'wajib', syllabus: [{ week: 1, title: "Limit Fungsi", status: "Selesai", items: [] }] },
            { id: 'sma-fis', name: "Fisika Kuantum Dasar", lecturer: "Ibu Citra, M.Pd.", progress: 55, type: 'wajib', syllabus: [{ week: 1, title: "Teori Kuantum", status: "Selesai", items: [] }] },
            {
                id: 'sma-kim', name: "Kimia Unsur Alkali", lecturer: "Drs. Sukarna", progress: 90, type: 'wajib',
                syllabus: [
                    { week: 1, title: "Sifat Kimia Golongan 1A", status: "Selesai", items: [{ type: "video", name: "Video Reaksi Natrium", desc: "Video Singkat" }] },
                    { week: 2, title: "Praktikum Laboratorium", status: "Sedang Berjalan", items: [{ type: "task", name: "Eksperimen Reaktivitas Natrium", desc: "Tenggat: 2 Hari Lagi", priority: "high" }] }
                ]
            },
            { id: 'sma-bio', name: "Biologi Genetika", lecturer: "Ibu Ani", progress: 40, type: 'wajib', syllabus: [{ week: 1, title: "Hukum Mendel", status: "Selesai", items: [] }] },
            { id: 'sma-indo', name: "Bahasa Indonesia Editorial", lecturer: "Bpk. Danu", progress: 100, type: 'wajib', syllabus: [{ week: 1, title: "Teks Editorial", status: "Selesai", items: [] }] },
            { id: 'sma-robot', name: "Ekstrakurikuler Robotika", lecturer: "Kak Rian", progress: 30, type: 'ekskul', syllabus: [{ week: 1, title: "Arduino Dasar", status: "Sedang Berjalan", items: [] }] }
        ],
        ongoingClass: { id: 'sma-kim', name: "Kimia Unsur Alkali", lecturer: "Drs. Sukarna", time: "10:00 - 11:30 WIB" },
        assignments: [
            { 
                id: 5, courseId: 'sma-kim', title: "Eksperimen Reaktivitas Natrium", deadline: "2 Hari Lagi", priority: "high", status: "todo",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: 'Kemarin, 14:00', desc: 'Tugas telah dilihat.', color: 'secondary' }
                ]
            }
        ],
        performanceData: [
            { aspect: "Matematika / Logika", score: 80, type: "academic" },
            { aspect: "Sains / Analisis", score: 85, type: "academic" },
            { aspect: "Bahasa / Komunikasi", score: 90, type: "academic" },
            { aspect: "Kreativitas", score: 75, type: "softskill" },
            { aspect: "Kedisiplinan", score: 88, type: "softskill" },
            { aspect: "Kerja Sama Tim", score: 95, type: "softskill" }
        ]
    },
    {
        username: 'kautsar_z', password: 'password123', name: 'Kautsar Rahman Zaki', level: 'SMP', theme: 'teens', dashboardUrl: 'teens-dashboard.html',
        enrolledCourses: [
            { id: 'smp-mat', name: "Matematika Aljabar", lecturer: "Ibu Restu", progress: 85, type: 'wajib', syllabus: [{ week: 1, title: "Aljabar", status: "Selesai", items: [] }] },
            {
                id: 'smp-ipa', name: "IPA Terpadu", lecturer: "Bpk. Lukman", progress: 60, type: 'wajib',
                syllabus: [
                    { week: 1, title: "Besaran & Satuan", status: "Selesai", items: [{ type: "pdf", name: "Modul Besaran", desc: "PDF" }] },
                    { week: 2, title: "Tekanan Zat Cair", status: "Sedang Berjalan", items: [{ type: "task", name: "Laporan Praktikum Tekanan Hidrostatis", desc: "Tenggat: Besok", priority: "medium" }] }
                ]
            },
            { id: 'smp-ips', name: "IPS Sejarah Dunia", lecturer: "Ibu Susi", progress: 70, type: 'wajib', syllabus: [{ week: 1, title: "Sejarah", status: "Selesai", items: [] }] },
            { id: 'smp-ing', name: "Bahasa Inggris Komunikasi", lecturer: "Mr. Alex", progress: 95, type: 'wajib', syllabus: [{ week: 1, title: "Tenses", status: "Selesai", items: [] }] },
            { id: 'smp-ppkn', name: "Pendidikan Pancasila", lecturer: "Drs. Iman", progress: 50, type: 'wajib', syllabus: [{ week: 1, title: "Pancasila", status: "Selesai", items: [] }] },
            { id: 'smp-pram', name: "Ekstrakurikuler Pramuka", lecturer: "Kak Hadi", progress: 100, type: 'ekskul', syllabus: [{ week: 1, title: "Tali Temali", status: "Selesai", items: [] }] }
        ],
        ongoingClass: { id: 'smp-ipa', name: "IPA Terpadu", lecturer: "Bpk. Lukman", time: "08:00 - 09:30 WIB" },
        assignments: [
            { 
                id: 6, courseId: 'smp-ipa', title: "Laporan Praktikum Tekanan Hidrostatis", deadline: "Besok", priority: "medium", status: "todo",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: 'Kemarin, 09:00', desc: 'Siswa membuka instruksi tugas.', color: 'secondary' }
                ]
            }
        ],
        performanceData: [
            { aspect: "Matematika / Logika", score: 85, type: "academic" },
            { aspect: "Sains / Analisis", score: 75, type: "academic" },
            { aspect: "Bahasa / Komunikasi", score: 80, type: "academic" },
            { aspect: "Kreativitas", score: 90, type: "softskill" },
            { aspect: "Kedisiplinan", score: 85, type: "softskill" },
            { aspect: "Kerja Sama Tim", score: 88, type: "softskill" }
        ]
    },
    {
        username: 'nadiatu_d', password: 'password123', name: 'Nadiatu Dzaqiah', level: 'SD', theme: 'kids', dashboardUrl: 'kids-dashboard.html',
        enrolledCourses: [
            { id: 'sd-mat', name: "Berhitung Perkalian & Pembagian", lecturer: "Ibu Dewi", progress: 65, type: 'wajib', syllabus: [{ week: 1, title: "Perkalian Dasar", status: "Selesai", items: [] }] },
            { id: 'sd-indo', name: "Membaca & Menulis Cerita", lecturer: "Bpk. Eko", progress: 80, type: 'wajib', syllabus: [{ week: 1, title: "Membaca Puisi", status: "Selesai", items: [] }] },
            { id: 'sd-ipa', name: "Mengenal Makhluk Hidup", lecturer: "Ibu Sari", progress: 90, type: 'wajib', syllabus: [{ week: 1, title: "Tumbuhan", status: "Selesai", items: [] }] },
            { id: 'sd-ips', name: "Mengenal Peta Indonesia", lecturer: "Bpk. Roni", progress: 50, type: 'wajib', syllabus: [{ week: 1, title: "Peta Pulau Jawa", status: "Selesai", items: [] }] },
            { id: 'sd-art', name: "Seni Rupa & Prakarya", lecturer: "Ibu Mega", progress: 75, type: 'wajib', syllabus: [{ week: 1, title: "Menggambar", status: "Selesai", items: [] }] },
            {
                id: 'sd-draw', name: "Ekskul Menggambar Komik", lecturer: "Kak Yudi", progress: 40, type: 'ekskul',
                syllabus: [
                    { week: 1, title: "Bentuk Dasar Karakter", status: "Selesai", items: [{ type: "video", name: "Video Menggambar Wajah", desc: "15 mnt" }] },
                    { week: 2, title: "Pixel Art", status: "Sedang Berjalan", items: [{ type: "task", name: "Menggambar Karakter Pixel Art", desc: "Tenggat: 3 Hari Lagi", priority: "low" }] }
                ]
            }
        ],
        ongoingClass: { id: 'sd-mat', name: "Berhitung Perkalian & Pembagian", lecturer: "Ibu Dewi", time: "09:30 - 11:00 WIB" },
        assignments: [
            { 
                id: 7, courseId: 'sd-draw', title: "Menggambar Karakter Pixel Art", deadline: "3 Hari Lagi", priority: "low", status: "todo",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: 'Hari ini, 07:00', desc: 'Tugas baru.', color: 'secondary' }
                ]
            }
        ],
        performanceData: [
            { aspect: "Berhitung", score: 70, type: "academic" },
            { aspect: "Membaca & Menulis", score: 85, type: "academic" },
            { aspect: "Kesenian", score: 95, type: "academic" },
            { aspect: "Kreativitas", score: 90, type: "softskill" },
            { aspect: "Kedisiplinan", score: 80, type: "softskill" },
            { aspect: "Kerja Sama Tim", score: 85, type: "softskill" }
        ]
    },
    {
        username: 'arita_k', password: 'password123', name: 'Arita Kya Nadindra', level: 'TK', theme: 'kids', dashboardUrl: 'kids-dashboard.html',
        enrolledCourses: [
            {
                id: 'tk-draw', name: "Mewarnai & Mengenal Bentuk", lecturer: "Ibu Nina", progress: 45, type: 'inti',
                syllabus: [
                    { week: 1, title: "Mengenal Warna Merah & Biru", status: "Selesai", items: [{ type: "video", name: "Lagu Warna", desc: "Video" }] },
                    { week: 2, title: "Bentuk Segitiga & Kotak", status: "Sedang Berjalan", items: [{ type: "task", name: "Menyusun Balok Rumah", desc: "Tenggat: Besok Pagi", priority: "high" }] }
                ]
            },
            { id: 'tk-count', name: "Berhitung Angka Ceria", lecturer: "Ibu Nina", progress: 50, type: 'inti', syllabus: [{ week: 1, title: "Angka 1-5", status: "Selesai", items: [] }] },
            { id: 'tk-sing', name: "Bernyanyi & Gerak Tubuh", lecturer: "Ibu Nina", progress: 85, type: 'inti', syllabus: [{ week: 1, title: "Kepala Pundak", status: "Selesai", items: [] }] },
            { id: 'tk-read', name: "Membaca Suku Kata Dasar", lecturer: "Ibu Nina", progress: 30, type: 'inti', syllabus: [{ week: 1, title: "Ba-Bi-Bu", status: "Selesai", items: [] }] },
            { id: 'tk-moral', name: "Budi Pekerti & Berbagi Teman", lecturer: "Ibu Nina", progress: 90, type: 'inti', syllabus: [{ week: 1, title: "Mengucap Maaf", status: "Selesai", items: [] }] }
        ],
        ongoingClass: { id: 'tk-draw', name: "Mewarnai & Mengenal Bentuk", lecturer: "Ibu Nina", time: "08:00 - 09:30 WIB" },
        assignments: [
            { 
                id: 8, courseId: 'tk-draw', title: "Menyusun Balok Rumah", deadline: "Besok Pagi", priority: "high", status: "todo",
                submissionHistory: [
                    { type: 'draft', title: 'Draft Created', date: 'Hari ini, 08:00', desc: 'Belum dikerjakan.', color: 'secondary' }
                ]
            }
        ],
        performanceData: [
            { aspect: "Mengenal Angka", score: 65, type: "academic" },
            { aspect: "Mengenal Huruf", score: 70, type: "academic" },
            { aspect: "Motorik Kasar & Halus", score: 90, type: "academic" },
            { aspect: "Kreativitas", score: 85, type: "softskill" },
            { aspect: "Kemampuan Berbagi", score: 95, type: "softskill" },
            { aspect: "Kemandirian", score: 80, type: "softskill" }
        ]
    },
    {
        username: 'budi_guru', password: 'password123', name: 'Dr. Budi Santoso', level: 'Teacher', theme: 'teacher', dashboardUrl: './teacher-dashboard.html',
        workspaces: [
            { id: 'univ', name: 'Universitas - Fakultas IT' },
            { id: 'sma', name: 'SMA - Lintas Minat IT' }
        ],
        activeWorkspace: 'univ',
        teachingClasses: [
            { id: 'web-react', name: "Front-end React & Tailwind", students: 45, nextSession: "Hari ini, 15:20 WIB" },
            { id: 'sma-ui-ux', name: "UI/UX Research", students: 30, nextSession: "Besok, 10:00 WIB" } // ID DIUBAH
        ],
        tasksToGrade: [
            { title: "Landing Page Empact", course: "Front-end React", count: 12 },
            { title: "Wireframing Agilis", course: "UI/UX Research", count: 28 }
        ]
    }
];

// Mock CollabSpace State
const mockCollabState = {
    documentTitle: "Laporan Riset UX: LMS Multi-Platform",
    mainBranch: [
        { id: 'b1', type: 'h2', content: 'Bab 1: Pendahuluan' },
        { id: 'b2', type: 'p', content: 'Pembelajaran berbasis LMS saat ini memiliki banyak hambatan terkait UX. Antarmuka yang kaku menyulitkan adaptasi bagi siswa usia dini.' }
    ],
    memberBranch: {
        author: "Lana",
        branchName: "Lana_Branch",
        content: [
            { id: 'b1', type: 'h2', content: 'Bab 1: Pendahuluan (Revisi Lana)' },
            { id: 'b2', type: 'p', content: 'Pembelajaran berbasis LMS saat ini memiliki banyak hambatan terkait UX, khususnya untuk rentang usia K-12. Antarmuka yang kaku menyulitkan adaptasi bagi siswa usia dini.' },
            { id: 'b3', type: 'p', content: 'Oleh karena itu, dibutuhkan pendekatan gamifikasi dan sistem tema dinamis untuk menyelesaikan masalah ini secara holistik.' }
        ]
    }
};