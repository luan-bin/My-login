/**
 * ==========================================
 * QUẢN LÝ FORM ĐĂNG NHẬP VÀ ĐĂNG KÝ
 * Đã tích hợp với Storage System
 * ==========================================
 */

// ========================================
// 1. LẤY CÁC PHẦN TỬ FORM TỪ HTML
// ========================================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');

// ========================================
// 2. CHUYỂN ĐỔI GIỮA FORM ĐĂNG NHẬP VÀ ĐĂNG KÝ
// ========================================

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

// ========================================
// 3. CÁC HÀM KIỂM TRA TÍNH HỢP LỆ
// ========================================

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

// ========================================
// 4. HÀM HIỂN THỊ VÀ XÓA THÔNG BÁO LỖI
// ========================================

function showError(input, message) {
    const inputGroup = input.parentElement;
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    inputGroup.appendChild(errorDiv);
}

function clearError(input) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.classList.remove('error');
}

// ========================================
// 5. KIỂM TRA THỜI GIAN THỰC CHO FORM ĐĂNG NHẬP
// ========================================

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

// ========================================
// 6. KIỂM TRA THỜI GIAN THỰC CHO FORM ĐĂNG KÝ
// ========================================

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
    } else if (userStorage.isUsernameExists(username)) {
        showError(this, 'Username đã tồn tại. Vui lòng chọn username khác.');
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
    } else if (userStorage.isEmailExists(email)) {
        showError(this, 'Email đã được đăng ký. Vui lòng sử dụng email khác.');
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
    if (verifyPassword.value && verifyPassword.classList.contains('error')) {
        verifyPassword.dispatchEvent(new Event('blur'));
    }
});

verifyPassword.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        clearError(this);
    }
});

// ========================================
// 7. XỬ LÝ KHI SUBMIT FORM ĐĂNG NHẬP
// ========================================

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    let hasError = false;
    
    if (!email) {
        showError(loginEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(loginEmail, 'Email không đúng định dạng');
        hasError = true;
    } else {
        clearError(loginEmail);
    }
    
    if (!password) {
        showError(loginPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(loginPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(loginPassword);
    }
    
    if (!hasError) {
        const result = userStorage.loginUser(email, password);
        
        if (result.success) {
            showSuccessMessage('Đăng nhập thành công!', 'Chào mừng bạn quay trở lại');
            console.log('✅ Login successful!', result.user);
            
            // Chuyển hướng đến trang chủ sau 1.5 giây
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError(loginPassword, result.message);
        }
    }
});

// ========================================
// 8. XỬ LÝ KHI SUBMIT FORM ĐĂNG KÝ
// ========================================

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const verify = verifyPassword.value;
    let hasError = false;
    
    if (!username) {
        showError(registerUsername, 'Username không được để trống');
        hasError = true;
    } else if (!validateUsername(username)) {
        showError(registerUsername, 'Username phải có từ 6-18 ký tự');
        hasError = true;
    } else if (userStorage.isUsernameExists(username)) {
        showError(registerUsername, 'Username đã tồn tại. Vui lòng chọn username khác.');
        hasError = true;
    } else {
        clearError(registerUsername);
    }
    
    if (!email) {
        showError(registerEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(registerEmail, 'Email không đúng định dạng');
        hasError = true;
    } else if (userStorage.isEmailExists(email)) {
        showError(registerEmail, 'Email đã được đăng ký. Vui lòng sử dụng email khác.');
        hasError = true;
    } else {
        clearError(registerEmail);
    }
    
    if (!password) {
        showError(registerPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(registerPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(registerPassword);
    }
    
    if (!verify) {
        showError(verifyPassword, 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (password !== verify) {
        showError(verifyPassword, 'Mật khẩu xác nhận không khớp');
        hasError = true;
    } else {
        clearError(verifyPassword);
    }
    
    if (!hasError) {
        const result = userStorage.registerUser({
            username: username,
            email: email,
            password: password
        });
        
        if (result.success) {
            showSuccessMessage('Đăng ký thành công!', 'Tài khoản của bạn đã được tạo', true);
            console.log('✅ Registration successful!', result.user);
        } else {
            if (result.message.includes('Email')) {
                showError(registerEmail, result.message);
            } else if (result.message.includes('Username')) {
                showError(registerUsername, result.message);
            }
        }
    }
});

// ========================================
// 9. HÀM HIỂN THỊ THÔNG BÁO THÀNH CÔNG
// ========================================

function showSuccessMessage(title, message, isRegister = false) {
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
    
    setTimeout(() => {
        successOverlay.remove();
        
        if (isRegister) {
            registerForm.reset();
            registerContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        } else {
            loginForm.reset();
        }
    }, 1500);
}

console.log('✅ Login/Register system loaded');