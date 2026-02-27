const uploadForm = document.getElementById('uploadForm');
const filesList = document.getElementById('filesList');
const logoutBtn = document.getElementById('logout');
const token = localStorage.getItem('token');

if (!token) window.location.href = 'index.html';

// Upload file
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('fileInput').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/files/upload', {  // <-- Changed to relative path
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    if (res.ok) loadFiles();
    else alert(data.msg || 'Upload failed');
  } catch (err) {
    console.error(err);
    alert('Error connecting to server');
  }
});

// Load user's files
async function loadFiles() {
  try {
    const res = await fetch('/api/files', {  // <-- Changed to relative path
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const files = await res.json();
    filesList.innerHTML = files.map(f => `
      <div class="file-item">
        <p>${f.filename}</p>
        <a href="${f.filePath}" target="_blank">View</a>
        <button onclick="deleteFile('${f._id}')">Delete</button>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    alert('Error loading files');
  }
}

// Delete file
async function deleteFile(id) {
  if (!confirm('Are you sure you want to delete this file?')) return;

  try {
    const res = await fetch(`/api/files/${id}`, {  // <-- Changed to relative path
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    if (res.ok) loadFiles();
    else alert(data.msg || 'Delete failed');
  } catch (err) {
    console.error(err);
    alert('Error connecting to server');
  }
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

// Initial load
loadFiles();
