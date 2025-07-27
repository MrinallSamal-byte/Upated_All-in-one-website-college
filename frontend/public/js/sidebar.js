const sidebarHTML = `
<div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">ITER College Portal</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <a href="/pages/dashboard.htm" class="nav-link text-white" aria-current="page">
                <i class="fas fa-home me-2"></i>
                Dashboard
            </a>
        </li>
        <li>
            <a href="/pages/attendance.htm" class="nav-link text-white">
                <i class="fas fa-chart-bar me-2"></i>
                Attendance
            </a>
        </li>
        <li>
            <a href="/pages/marks.htm" class="nav-link text-white">
                <i class="fas fa-graduation-cap me-2"></i>
                Marks
            </a>
        </li>
        <li>
            <a href="/pages/admitcard.htm" class="nav-link text-white">
                <i class="fas fa-id-card me-2"></i>
                Admit Card
            </a>
        </li>
        <li>
            <a href="/pages/pyqs.htm" class="nav-link text-white">
                <i class="fas fa-file-alt me-2"></i>
                PYQs
            </a>
        </li>
        <li>
            <a href="/pages/hostelmenu.htm" class="nav-link text-white">
                <i class="fas fa-utensils me-2"></i>
                Hostel Menu
            </a>
        </li>
        <li>
            <a href="/pages/events.htm" class="nav-link text-white">
                <i class="fas fa-calendar-day me-2"></i>
                Events
            </a>
        </li>
        <li>
            <a href="/pages/timetable.htm" class="nav-link text-white">
                <i class="fas fa-calendar-alt me-2"></i>
                Timetable
            </a>
        </li>
        <li>
            <a href="/pages/syllabus.htm" class="nav-link text-white">
                <i class="fas fa-list-alt me-2"></i>
                Syllabus
            </a>
        </li>
        <li>
            <a href="/pages/notes.htm" class="nav-link text-white">
                <i class="fas fa-book me-2"></i>
                Notes
            </a>
        </li>
        <li>
            <a href="/pages/assignments.htm" class="nav-link text-white">
                <i class="fas fa-tasks me-2"></i>
                Assignments
            </a>
        </li>
        <li>
            <a href="/pages/notice.htm" class="nav-link text-white">
                <i class="fas fa-bullhorn me-2"></i>
                Notices
            </a>
        </li>
        <li>
            <a href="/pages/support.htm" class="nav-link text-white">
                <i class="fas fa-question-circle me-2"></i>
                Support
            </a>
        </li>
        <li>
            <a href="/pages/profile.htm" class="nav-link text-white">
                <i class="fas fa-user me-2"></i>
                Profile
            </a>
        </li>
        <li>
            <a href="/pages/history.htm" class="nav-link text-white">
                <i class="fas fa-history me-2"></i>
                History
            </a>
        </li>
        <li>
            <a href="/pages/documents.htm" class="nav-link text-white">
                <i class="fas fa-file me-2"></i>
                Documents
            </a>
        </li>
        <li>
            <a href="/pages/clubs.htm" class="nav-link text-white">
                <i class="fas fa-users me-2"></i>
                Clubs
            </a>
        </li>
        <li>
            <a href="/pages/clubevents.htm" class="nav-link text-white">
                <i class="fas fa-star me-2"></i>
                Club Events
            </a>
        </li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="/pages/profile.htm">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.querySelector('.sidebar');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarHTML;
    }
});
