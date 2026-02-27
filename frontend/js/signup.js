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
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      message.innerText = "Signup successful! Redirecting to login...";
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    } else {
      message.innerText = result.msg || 'Signup failed';
    }
  } catch (err) {
    message.innerText = 'Error connecting to server';
  }
});