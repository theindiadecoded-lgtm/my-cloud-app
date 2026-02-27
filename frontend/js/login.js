const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      localStorage.setItem('token', result.token);
      window.location.href = 'dashboard.html';
    } else {
      message.innerText = result.msg || 'Login failed';
    }
  } catch (err) {
    message.innerText = 'Error connecting to server';
  }
});