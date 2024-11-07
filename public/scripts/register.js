document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtener los valores de los campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const errorMessage = document.getElementById('error-message');
  
    // Expresiones regulares para validar email y teléfono
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d{10,}$/;
  
    // Validaciones
    if (!name || !email || !password || !confirmPassword || !phone) {
      errorMessage.textContent = "Por favor, completa todos los campos.";
      errorMessage.style.display = "block";
      return;
    }
    
    if (!emailPattern.test(email)) {
      errorMessage.textContent = "Por favor, ingresa un email válido.";
      errorMessage.style.display = "block";
      return;
    }
    
    if (password !== confirmPassword) {
      errorMessage.textContent = "Las contraseñas no coinciden.";
      errorMessage.style.display = "block";
      return;
    }
    
    if (!phonePattern.test(phone)) {
      errorMessage.textContent = "El número de teléfono debe tener al menos 10 dígitos.";
      errorMessage.style.display = "block";
      return;
    }
  
    // Si todas las validaciones pasan, puedes enviar el formulario o hacer otra acción
    errorMessage.style.display = "none";
    alert("Registro exitoso.");
    // Aquí podrías enviar los datos al servidor, limpiar el formulario, etc.
});
  