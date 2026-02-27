const form = document.getElementById('signupForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem('token', result.token); // <-- store token
      message.innerText = "Signup successful! Redirecting to dashboard...";
      setTimeout(() => { 
        window.location.href = 'dashboard.html'; 
      }, 1500);
    } else {
      message.innerText = result.msg || 'Signup failed';
    }
  } catch (err) {
    console.error(err);
    message.innerText = 'Error connecting to server';
  }
});
