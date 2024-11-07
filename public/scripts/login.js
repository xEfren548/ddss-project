document.getElementById('loginForm').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (email === '' || password === '') {
      event.preventDefault();
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }
  });