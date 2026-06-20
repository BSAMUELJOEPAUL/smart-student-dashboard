// ===== DEMO DATA =====
const DEMO_MARKS = [
    { subject: 'Mathematics',       internal: 28, external: 62, total: 90, max: 100 },
    { subject: 'Physics',           internal: 24, external: 54, total: 78, max: 100 },
    { subject: 'Data Structures',   internal: 30, external: 65, total: 95, max: 100 },
    { subject: 'DBMS',              internal: 22, external: 48, total: 70, max: 100 },
    { subject: 'Operating Systems', internal: 26, external: 57, total: 83, max: 100 },
    { subject: 'Computer Networks', internal: 20, external: 43, total: 63, max: 100 },
];

const DEMO_ATTENDANCE = [
    { subject: 'Mathematics',       total: 50, present: 45 },
    { subject: 'Physics',           total: 48, present: 38 },
    { subject: 'Data Structures',   total: 52, present: 50 },
    { subject: 'DBMS',              total: 46, present: 32 },
    { subject: 'Operating Systems', total: 50, present: 44 },
    { subject: 'Computer Networks', total: 44, present: 40 },
];

const DEMO_EXAMS = [
    { subject: 'Mathematics',       date: '2025-08-10', time: '09:00 AM', venue: 'Hall A' },
    { subject: 'Physics',           date: '2025-08-12', time: '02:00 PM', venue: 'Hall B' },
    { subject: 'Data Structures',   date: '2025-08-14', time: '09:00 AM', venue: 'Hall A' },
    { subject: 'DBMS',              date: '2025-08-16', time: '02:00 PM', venue: 'Hall C' },
    { subject: 'Operating Systems', date: '2025-08-18', time: '09:00 AM', venue: 'Hall B' },
];

// ===== STUDENT DATA =====
const student = JSON.parse(localStorage.getItem('student') || '{"fullName":"Demo Student","rollNumber":"CS2024001","email":"demo@student.com","department":"Computer Science","semester":"Semester 5"}');

// ===== TASKS (localStorage) =====
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadStudentInfo();
    renderOverview();
    renderMarks();
    renderAttendance();
    renderExams();
    renderTasks();
    startClock();
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.className = theme;
    updateThemeBtn(theme);
});

// ===== STUDENT INFO =====
function loadStudentInfo() {
    const name = student.fullName || 'Student';
    const initial = name.charAt(0).toUpperCase();
    setText('miniName', name);
    setText('miniRoll', student.rollNumber || '--');
    setText('miniAvatar', initial);
    setText('topAvatar', initial);
    setText('welcomeName', name.split(' ')[0]);
    setText('pAvatar', initial);
    setText('pName', name);
    setText('pRoll', student.rollNumber || '--');
    setText('pDept', student.department || '--');

    const details = [
        { label: 'Full Name', value: name },
        { label: 'Roll Number', value: student.rollNumber || '--' },
        { label: 'Email', value: student.email || '--' },
        { label: 'Department', value: student.department || '--' },
        { label: 'Semester', value: student.semester || '--' },
        { label: 'Status', value: 'Active' },
    ];
    const el = document.getElementById('profileDetails');
    if (el) el.innerHTML = details.map(d => `<div class="detail-item"><label>${d.label}</label><span>${d.value}</span></div>`).join('');
}

// ===== OVERVIEW =====
function renderOverview() {
    const avgMarks = avg(DEMO_MARKS.map(m => (m.total / m.max) * 100)).toFixed(1);
    const avgAtt   = avg(DEMO_ATTENDANCE.map(a => (a.present / a.total) * 100)).toFixed(1);
    const pending  = tasks.filter(t => !t.done).length;
    const upcoming = DEMO_EXAMS.filter(e => daysLeft(e.date) >= 0).length;

    setText('wAvgMarks', avgMarks + '%');
    setText('wAttendance', avgAtt + '%');
    setText('wPending', pending);
    setText('ov-marks', avgMarks + '%');
    setText('ov-att', avgAtt + '%');
    setText('ov-exams', upcoming);
    setText('ov-tasks', pending);

    renderOverviewCharts(avgMarks, avgAtt);
}

function renderOverviewCharts(avgMarks, avgAtt) {
    // Marks bar chart
    const mc = document.getElementById('marksOverviewChart');
    if (mc) {
        new Chart(mc, {
            type: 'bar',
            data: {
                labels: DEMO_MARKS.map(m => m.subject.split(' ')[0]),
                datasets: [{
                    label: 'Marks %',
                    data: DEMO_MARKS.map(m => ((m.total / m.max) * 100).toFixed(1)),
                    backgroundColor: ['#6c63ff','#00c9a7','#ff9f43','#ff6584','#48dbfb','#1dd1a1'],
                    borderRadius: 8,
                }]
            },
            options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#aaa' } }, x: { grid: { display: false }, ticks: { color: '#aaa' } } } }
        });
    }

    // Attendance doughnut
    const ac = document.getElementById('attOverviewChart');
    if (ac) {
        const present = DEMO_ATTENDANCE.reduce((s, a) => s + a.present, 0);
        const absent  = DEMO_ATTENDANCE.reduce((s, a) => s + (a.total - a.present), 0);
        new Chart(ac, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Absent'],
                datasets: [{ data: [present, absent], backgroundColor: ['#00c9a7','#ff6584'], borderWidth: 0, hoverOffset: 6 }]
            },
            options: { plugins: { legend: { labels: { color: '#aaa', font: { size: 12 } } } }, cutout: '70%' }
        });
    }
}

// ===== MARKS =====
function getGrade(pct) {
    if (pct >= 90) return { g: 'O',  cls: 'grade-o' };
    if (pct >= 80) return { g: 'A+', cls: 'grade-a' };
    if (pct >= 70) return { g: 'A',  cls: 'grade-a' };
    if (pct >= 60) return { g: 'B',  cls: 'grade-b' };
    if (pct >= 50) return { g: 'C',  cls: 'grade-c' };
    return { g: 'F', cls: 'grade-f' };
}

function renderMarks() {
    const tbody = document.getElementById('marksBody');
    if (!tbody) return;
    tbody.innerHTML = DEMO_MARKS.map(m => {
        const pct = ((m.total / m.max) * 100).toFixed(1);
        const { g, cls } = getGrade(pct);
        const status = pct >= 50 ? '<span class="tag pass">Pass</span>' : '<span class="tag fail">Fail</span>';
        return `<tr>
            <td><strong>${m.subject}</strong></td>
            <td>${m.internal}</td>
            <td>${m.external}</td>
            <td><strong>${m.total}/${m.max}</strong></td>
            <td><span class="${cls}">${g}</span></td>
            <td>${status}</td>
        </tr>`;
    }).join('');

    renderMarksChart();
    renderGradeSummary();
}

function renderMarksChart() {
    const c = document.getElementById('marksChart');
    if (!c) return;
    new Chart(c, {
        type: 'bar',
        data: {
            labels: DEMO_MARKS.map(m => m.subject.split(' ')[0]),
            datasets: [
                { label: 'Internal', data: DEMO_MARKS.map(m => m.internal), backgroundColor: 'rgba(108,99,255,0.8)', borderRadius: 6 },
                { label: 'External', data: DEMO_MARKS.map(m => m.external), backgroundColor: 'rgba(0,201,167,0.8)', borderRadius: 6 },
            ]
        },
        options: { plugins: { legend: { labels: { color: '#aaa' } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#aaa' } }, x: { grid: { display: false }, ticks: { color: '#aaa', maxRotation: 0 } } } }
    });
}

function renderGradeSummary() {
    const el = document.getElementById('gradeSummary');
    if (!el) return;
    el.innerHTML = DEMO_MARKS.map(m => {
        const pct = ((m.total / m.max) * 100).toFixed(1);
        const { g, cls } = getGrade(pct);
        const color = pct >= 75 ? '#1dd1a1' : pct >= 50 ? '#ff9f43' : '#ff6584';
        return `<div class="gs-row">
            <span class="gs-subject">${m.subject}</span>
            <div class="gs-info">
                <span class="gs-percent">${pct}%</span>
                <span class="${cls}">${g}</span>
            </div>
        </div>
        <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${color}"></div></div>`;
    }).join('');
}

// ===== ATTENDANCE =====
function renderAttendance() {
    const tbody = document.getElementById('attBody');
    if (!tbody) return;
    tbody.innerHTML = DEMO_ATTENDANCE.map(a => {
        const pct = ((a.present / a.total) * 100).toFixed(1);
        const absent = a.total - a.present;
        let tag;
        if (pct >= 75) tag = '<span class="tag safe">Safe</span>';
        else if (pct >= 65) tag = '<span class="tag warning">Warning</span>';
        else tag = '<span class="tag danger">Danger</span>';
        return `<tr>
            <td><strong>${a.subject}</strong></td>
            <td>${a.total}</td>
            <td>${a.present}</td>
            <td>${absent}</td>
            <td><strong>${pct}%</strong></td>
            <td>${tag}</td>
        </tr>`;
    }).join('');
}

function calcAttendance() {
    const total    = parseInt(document.getElementById('calcTotal').value) || 0;
    const attended = parseInt(document.getElementById('calcAttended').value) || 0;
    const el = document.getElementById('calcResult');
    if (!total || !attended) { el.textContent = 'Enter valid values'; el.className = 'calc-result'; return; }
    if (attended > total) { el.textContent = 'Attended > Total!'; el.className = 'calc-result bad'; return; }
    const pct = ((attended / total) * 100).toFixed(1);
    const needed75 = Math.ceil(0.75 * total);
    if (pct >= 75) {
        const canSkip = Math.floor((attended - 0.75 * total) / 0.25);
        el.textContent = `${pct}% ✓ You can skip ${canSkip} more class${canSkip !== 1 ? 'es' : ''}`;
        el.className = 'calc-result good';
    } else {
        const moreNeeded = needed75 - attended;
        el.textContent = `${pct}% ✗ Attend ${moreNeeded} more class${moreNeeded !== 1 ? 'es' : ''} to reach 75%`;
        el.className = 'calc-result bad';
    }
}

// ===== EXAMS =====
function renderExams() {
    const tbody = document.getElementById('examBody');
    if (!tbody) return;
    tbody.innerHTML = DEMO_EXAMS.map(e => {
        const d = daysLeft(e.date);
        let chip;
        if (d < 0)       chip = `<span class="days-chip far">Done</span>`;
        else if (d <= 3)  chip = `<span class="days-chip soon">${d}d left</span>`;
        else if (d <= 7)  chip = `<span class="days-chip near">${d}d left</span>`;
        else              chip = `<span class="days-chip far">${d}d left</span>`;
        return `<tr>
            <td><strong>${e.subject}</strong></td>
            <td>${formatDate(e.date)}</td>
            <td>${e.time}</td>
            <td>${e.venue}</td>
            <td>${chip}</td>
        </tr>`;
    }).join('');
}

// ===== TASKS =====
function renderTasks() {
    const el = document.getElementById('assignList');
    if (!el) return;
    if (!tasks.length) { el.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text2)"><i class="fas fa-check-circle" style="font-size:2rem;margin-bottom:10px;color:var(--green)"></i><br>No assignments yet!</div>'; return; }
    el.innerHTML = tasks.map((t, i) => `
        <div class="assign-card ${t.done ? 'done' : ''}">
            <div>
                <div class="a-title">${t.title}</div>
                <div class="a-sub"><i class="fas fa-book"></i> ${t.subject}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
                <div class="a-due"><i class="fas fa-calendar"></i> ${formatDate(t.due)}</div>
                <div class="a-actions">
                    <button class="done-btn" onclick="toggleTask(${i})" title="Mark done"><i class="fas fa-check"></i></button>
                    <button class="del-btn"  onclick="deleteTask(${i})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>`).join('');
    // update overview count
    setText('wPending', tasks.filter(t => !t.done).length);
    setText('ov-tasks', tasks.filter(t => !t.done).length);
}

function openTaskModal()  { document.getElementById('taskModal').classList.add('open'); }
function closeTaskModal() { document.getElementById('taskModal').classList.remove('open'); }

function addTask() {
    const title   = document.getElementById('tTitle').value.trim();
    const subject = document.getElementById('tSubject').value.trim();
    const due     = document.getElementById('tDue').value;
    if (!title || !subject || !due) return alert('Please fill all fields');
    tasks.push({ title, subject, due, done: false });
    saveTasks();
    renderTasks();
    closeTaskModal();
    document.getElementById('tTitle').value = '';
    document.getElementById('tSubject').value = '';
    document.getElementById('tDue').value = '';
}

function toggleTask(i) { tasks[i].done = !tasks[i].done; saveTasks(); renderTasks(); }
function deleteTask(i)  { tasks.splice(i, 1); saveTasks(); renderTasks(); }

// ===== NAV =====
function show(section, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const sec = document.getElementById('sec-' + section);
    if (sec) sec.classList.add('active');
    if (el) el.classList.add('active');
    else {
        document.querySelectorAll('.nav-item').forEach(n => {
            if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + section + "'")) n.classList.add('active');
        });
    }
    const titles = { overview:'Dashboard', profile:'My Profile', marks:'Marks & Grades', attendance:'Attendance', exams:'Exam Schedule', assignments:'Assignments' };
    setText('pageTitle', titles[section] || 'Dashboard');
    if (window.innerWidth <= 768) closeSidebar();
}

// ===== SIDEBAR =====
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
}

// ===== THEME =====
function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    const theme = isDark ? 'light' : 'dark';
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    updateThemeBtn(theme);
}
function updateThemeBtn(theme) {
    const icon  = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (icon)  icon.className  = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// ===== CLOCK =====
function startClock() {
    function tick() {
        const now = new Date();
        setText('clock', now.toLocaleTimeString());
    }
    tick();
    setInterval(tick, 1000);
}

// ===== LOGOUT =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('student');
        window.location.href = 'login.html';
    }
}

// ===== HELPERS =====
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function avg(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function daysLeft(dateStr) { return Math.ceil((new Date(dateStr) - new Date()) / 86400000); }
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
