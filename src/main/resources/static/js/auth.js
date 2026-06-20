const API = 'http://localhost:8080/api';

function togglePw(id, icon) {
    const el = document.getElementById(id);
    el.type = el.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

function showMsg(id, text, type) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = `msg show ${type}`;
    setTimeout(() => el.className = 'msg', 4000);
}

function setBtn(id, loading, defaultText) {
    const btn = document.getElementById(id);
    btn.disabled = loading;
    btn.querySelector('span').textContent = loading ? 'Please wait...' : defaultText;
}

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        setBtn('loginBtn', true, 'Sign In');
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('student', JSON.stringify(data));
                showMsg('loginMsg', 'Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            } else {
                showMsg('loginMsg', data.error || 'Invalid credentials', 'error');
            }
        } catch {
            // Demo mode - no backend
            const demo = { fullName: email, rollNumber: 'CS2024001', email, department: 'Computer Science', semester: 'Semester 5' };
            localStorage.setItem('student', JSON.stringify(demo));
            showMsg('loginMsg', 'Demo login! Redirecting...', 'success');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        }
        setBtn('loginBtn', false, 'Sign In');
    });
}

// REGISTER
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const pw = document.getElementById('password').value;
        const cpw = document.getElementById('confirmPassword').value;
        if (pw !== cpw) return showMsg('registerMsg', 'Passwords do not match', 'error');
        if (pw.length < 6) return showMsg('registerMsg', 'Password must be at least 6 characters', 'error');
        setBtn('registerBtn', true, 'Create Account');
        try {
            const res = await fetch(`${API}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: document.getElementById('fullName').value,
                    rollNumber: document.getElementById('rollNumber').value,
                    email: document.getElementById('email').value,
                    department: document.getElementById('department').value,
                    semester: document.getElementById('semester').value,
                    password: pw
                })
            });
            const data = await res.json();
            if (res.ok) {
                showMsg('registerMsg', 'Account created! Redirecting to login...', 'success');
                setTimeout(() => window.location.href = 'login.html', 1400);
            } else {
                showMsg('registerMsg', data.error || 'Registration failed', 'error');
            }
        } catch {
            showMsg('registerMsg', 'Account created (demo)! Redirecting...', 'success');
            setTimeout(() => window.location.href = 'login.html', 1400);
        }
        setBtn('registerBtn', false, 'Create Account');
    });
}

// FORGOT PASSWORD
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
    forgotForm.addEventListener('submit', async e => {
        e.preventDefault();
        setBtn('forgotBtn', true, 'Send Reset Link');
        try {
            const res = await fetch(`${API}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: document.getElementById('email').value })
            });
            const data = await res.json();
            showMsg('forgotMsg', res.ok ? (data.message || 'Reset link sent!') : (data.error || 'Failed'), res.ok ? 'success' : 'error');
        } catch {
            showMsg('forgotMsg', 'Reset link sent to your email! (demo)', 'success');
        }
        setBtn('forgotBtn', false, 'Send Reset Link');
    });
}
