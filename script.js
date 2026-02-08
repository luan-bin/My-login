// Get forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');

// Toggle between login and register
document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault();
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Validation functions
function validateUsername(username) {
    return username.length >= 6 && username.length <= 18;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && password.length <= 20;
}

// Show error message
function showError(input, message) {
    const inputGroup = input.parentElement;
    
    // Remove existing error if any
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    input.classList.add('error');
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    inputGroup.appendChild(errorDiv);
}

// Clear error message
function clearError(input) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    input.classList.remove('error');
}

// Real-time validation for Login
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

loginEmail.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (!email) {
        showError(this, 'Email không được để trống');
    } else if (!validateEmail(email)) {
        showError(this, 'Email không đúng định dạng');
    } else {
        clearError(this);
    }
});

loginPassword.addEventListener('blur', function() {
    const password = this.value;
    
    if (!password) {
        showError(this, 'Mật khẩu không được để trống');
    } else if (!validatePassword(password)) {
        showError(this, 'Mật khẩu phải có từ 8-20 ký tự');
    } else {
        clearError(this);
    }
});

loginEmail.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

loginPassword.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

// Real-time validation for Register
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const verifyPassword = document.getElementById('verifyPassword');

registerUsername.addEventListener('blur', function() {
    const username = this.value.trim();
    
    if (!username) {
        showError(this, 'Username không được để trống');
    } else if (!validateUsername(username)) {
        showError(this, 'Username phải có từ 6-18 ký tự');
    } else {
        clearError(this);
    }
});

registerEmail.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (!email) {
        showError(this, 'Email không được để trống');
    } else if (!validateEmail(email)) {
        showError(this, 'Email không đúng định dạng');
    } else {
        clearError(this);
    }
});

registerPassword.addEventListener('blur', function() {
    const password = this.value;
    
    if (!password) {
        showError(this, 'Mật khẩu không được để trống');
    } else if (!validatePassword(password)) {
        showError(this, 'Mật khẩu phải có từ 8-20 ký tự');
    } else {
        clearError(this);
    }
});

verifyPassword.addEventListener('blur', function() {
    const password = registerPassword.value;
    const verify = this.value;
    
    if (!verify) {
        showError(this, 'Vui lòng xác nhận mật khẩu');
    } else if (password !== verify) {
        showError(this, 'Mật khẩu xác nhận không khớp');
    } else {
        clearError(this);
    }
});

// Clear error on input
registerUsername.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

registerEmail.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

registerPassword.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
    // Also revalidate verify password if it has value
    if (verifyPassword.value && verifyPassword.classList.contains('error')) {
        verifyPassword.dispatchEvent(new Event('blur'));
    }
});

verifyPassword.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

// Login Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    
    let hasError = false;
    
    // Validate email
    if (!email) {
        showError(loginEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(loginEmail, 'Email không đúng định dạng');
        hasError = true;
    } else {
        clearError(loginEmail);
    }
    
    // Validate password
    if (!password) {
        showError(loginPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(loginPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(loginPassword);
    }
    
    // If no errors, submit form
    if (!hasError) {
        showSuccessMessage('Đăng nhập thành công!', 'Chào mừng bạn quay trở lại');
        console.log('Login successful!', { email, password });
    }
});

// Register Form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const verify = verifyPassword.value;
    
    let hasError = false;
    
    // Validate username
    if (!username) {
        showError(registerUsername, 'Username không được để trống');
        hasError = true;
    } else if (!validateUsername(username)) {
        showError(registerUsername, 'Username phải có từ 6-18 ký tự');
        hasError = true;
    } else {
        clearError(registerUsername);
    }
    
    // Validate email
    if (!email) {
        showError(registerEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(registerEmail, 'Email không đúng định dạng');
        hasError = true;
    } else {
        clearError(registerEmail);
    }
    
    // Validate password
    if (!password) {
        showError(registerPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(registerPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(registerPassword);
    }
    
    // Validate verify password
    if (!verify) {
        showError(verifyPassword, 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (password !== verify) {
        showError(verifyPassword, 'Mật khẩu xác nhận không khớp');
        hasError = true;
    } else {
        clearError(verifyPassword);
    }
    
    // If no errors, submit form
    if (!hasError) {
        showSuccessMessage('Đăng ký thành công!', 'Tài khoản của bạn đã được tạo');
        console.log('Registration successful!', { username, email, password });
    }
});

// Show success message
function showSuccessMessage(title, message) {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.innerHTML = `
        <div class="success-message">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(successOverlay);
    
    // Remove after 2 seconds and reset form
    setTimeout(() => {
        successOverlay.remove();
        loginForm.reset();
        registerForm.reset();
        // Redirect or reload page
        // window.location.href = '/dashboard';
    }, 2000);
}
