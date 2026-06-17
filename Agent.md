# System Prompt & Context for AI Agent: Multi-Level LMS Project

## 1. Project Overview
**Name:** Multi-Platform & Multi-Level Learning Management System (LMS)
**Architecture:** Frontend Prototype (Headless CMS ready). UI/UX relies on Vanilla JavaScript, Bootstrap 5, and custom CSS variables.
**Core Concept:** A single LMS platform that serves multiple education levels (TK, SD, SMP, SMA, University) and Teachers. The UI dynamically changes based on the user's role and level.
- **Student UI:** Dynamic themes (`academic` for S1, `teens` for SMP/SMA, `kids` for TK/SD).
- **Teacher/Admin UI:** Sentry-inspired Design Language (Data-dense, Dark Mode, Midnight Violet `#1f1633` background, Electric Lime `#c2ef4e` accents).

## 2. Directory & File Structure
- `index.html`: Login simulation & routing.
- `assets/css/style.css`: Global styles, dynamic theme variables (`[data-theme="..."]`), drag-and-drop visuals, and Sentry dark mode overrides.
- `assets/js/data.js`: Centralized mock database simulating a backend API (Users, Courses, Syllabus, Assignments, Workspaces).
- `assets/js/components.js`: Reusable UI components (Sidebar, Navbar) rendered dynamically via JS based on user role.
- `assets/js/app.js`: Core logic, routing, event listeners, dynamic DOM manipulation, and interactive algorithms (Drag & Drop, OTP advance, Workspace Switching).
- **Student Pages:** `course-detail.html`, `assessment.html` (Kanban Board), and role-specific dashboards.
- **Teacher Pages:** `teacher-dashboard.html` (Command Center), `teacher-courses.html` (CMS Course Builder), `attendance-projection.html` (Fullscreen Projector UI for OTP/QR).

## 3. Progress Completed (What is already built)
✅ **Core Routing & Theming:** Users are routed to specific dashboards based on their `level`. Themes apply automatically via `data-theme` body attribute.
✅ **Student Kanban Board:** Task management interface filtering assignments by `todo`, `inprogress`, and `submitted`.
✅ **Interactive Course Detail:** Syllabus rendered as a Bootstrap Accordion. Includes an integrated, collapsible Attendance Panel (QR/PIN).
✅ **Dynamic PIN UX:** Auto-advancing input fields for 4-digit PIN entry with success/fail validation pop-ups.
✅ **Teacher Command Center:** Sentry-styled dashboard with "Workspace Switcher" to isolate data (e.g., S1 vs SMA).
✅ **Live Attendance Projector:** Fullscreen UI (`attendance-projection.html`) generating a new 4-digit PIN every 10 seconds with a visual progress bar and real-time student join simulation.
✅ **CMS Course Builder:** `teacher-courses.html` layout for syllabus management.
✅ **Advanced Group Allocation Modal:** A complex UI for creating group tasks. Features:
  - Toggle between "Manual Teacher Allocation" and "Student Self-Selection".
  - **Drag and Drop Matrix:** Teachers can drag students from an unassigned pool into group buckets.
  - **Dynamic Constraints:** Strict logic to prevent exceeding max members per group.

## 4. Next Steps & Future Roadmap (What needs to be built)
The following features are planned and should be developed sequentially based on previous architectural discussions:

### Phase 2: Advanced Student Utilities
**[x] 1. Submission Timeline Tree (`task-detail.html`)**
- Replace standard assignment tables with a vertical "Commit History" timeline (inspired by GitHub/RPG progression).
- Nodes: Draft Created (Grey) -> Submitted v1 (Yellow) -> Revision Requested (Red) -> Graded (Green).

**[x] 2. Dual-Mode Grading System (`grades.html` & `grading-panel.html`)**
- Render different grading UIs from the exact same data based on `user.level`.
- **K-12 (TK-SMA):** Radar Chart visualizing Soft-Skills vs. Academic performance.
- **University (S1):** Dense Classic Transcript table (SKS, Mutu, IPK/IPS).

### Phase 3: Advanced Integrations
**[x] 3. Personal Cloud Backpack**
- **Concept:** 0-byte server storage for the LMS.
- **Feature:** OAuth UI simulation (Google Drive / OneDrive) in settings.
- **Logic:** Simulate automatic folder creation (e.g., `LMS_Backpack/2026_Even/React`) when enrolling in a course.

**[x] 4. CollabSpace (Git-Based Document Editor)**
- **Concept:** Branching document editor for group tasks.
- **UI:** Block-based editor (Notion style) with Split-Screen view comparing "Main Draft" vs "Member's Branch".
- **Action:** "Merge to Main" button for the group leader.
- **Embeds:** Universal embed container for Figma, Miro, or Canva links.

## 5. Agent Instructions & Rules
1. **Never break existing functionality:** When adding new features, ensure they hook into the existing routing in `app.js` and data structures in `data.js`.
2. **Maintain Theming Rules:** Teacher UI MUST remain in Sentry dark mode. Student UI must respect the dynamic variables (do not hardcode colors unless necessary for specific accents).
3. **Vanilla DOM Manipulation:** The project relies on Vanilla JS and Bootstrap 5. Do not introduce React, Vue, or heavy frameworks. Use template literals `` `...` `` for DOM injection.
4. **Data Consistency:** Any new feature requiring data (like grading or timeline nodes) must have corresponding dummy data structures created in `data.js` first.