/**
 * ==========================================
 * QUẢN LÝ FORM ĐĂNG NHẬP VÀ ĐĂNG KÝ
 * Đã tích hợp với Storage System
 * ==========================================
 */

// ========================================
// 1. LẤY CÁC PHẦN TỬ FORM TỪ HTML
// ========================================
const loginForm = document.getElementById('loginForm');           // Form đăng nhập
const registerForm = document.getElementById('registerForm');     // Form đăng ký
const loginContainer = document.getElementById('loginContainer'); // Container chứa form đăng nhập
const registerContainer = document.getElementById('registerContainer'); // Container chứa form đăng ký

// ========================================
// 2. CHUYỂN ĐỔI GIỮA FORM ĐĂNG NHẬP VÀ ĐĂNG KÝ
// ========================================

// Khi click vào nút "Chuyển sang Đăng ký"
document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của link (không reload trang)
    loginContainer.classList.add('hidden');      // Ẩn form đăng nhập
    registerContainer.classList.remove('hidden'); // Hiện form đăng ký
});

// Khi click vào nút "Quay lại Đăng nhập"
document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của link
    registerContainer.classList.add('hidden');   // Ẩn form đăng ký
    loginContainer.classList.remove('hidden');   // Hiện form đăng nhập
});

// ========================================
// 3. CÁC HÀM KIỂM TRA TÍNH HỢP LỆ (VALIDATION)
// ========================================

/**
 * Kiểm tra username có hợp lệ không
 * @param {string} username - Tên đăng nhập cần kiểm tra
 * @returns {boolean} - true nếu hợp lệ (6-18 ký tự), false nếu không
 */
function validateUsername(username) {
    return username.length >= 6 && username.length <= 18;
}

/**
 * Kiểm tra email có đúng định dạng không
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} - true nếu đúng định dạng, false nếu không
 */
function validateEmail(email) {
    // Regex để kiểm tra định dạng email cơ bản: example@domain.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Kiểm tra mật khẩu có hợp lệ không
 * @param {string} password - Mật khẩu cần kiểm tra
 * @returns {boolean} - true nếu hợp lệ (8-20 ký tự), false nếu không
 */
function validatePassword(password) {
    return password.length >= 8 && password.length <= 20;
}

// ========================================
// 4. HÀM HIỂN THỊ VÀ XÓA THÔNG BÁO LỖI
// ========================================

/**
 * Hiển thị thông báo lỗi dưới ô input
 * @param {HTMLElement} input - Ô input cần hiển thị lỗi
 * @param {string} message - Nội dung thông báo lỗi
 */
function showError(input, message) {
    const inputGroup = input.parentElement; // Lấy thẻ cha của input (thường là div bọc input)
    
    // Xóa thông báo lỗi cũ nếu có (tránh hiển thị nhiều lỗi trùng lặp)
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Thêm class 'error' vào input để đổi màu viền đỏ
    input.classList.add('error');
    
    // Tạo thẻ div chứa thông báo lỗi
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message'; // Class để style CSS
    errorDiv.textContent = message;        // Nội dung lỗi
    inputGroup.appendChild(errorDiv);      // Thêm vào DOM (hiển thị dưới input)
}

/**
 * Xóa thông báo lỗi của ô input
 * @param {HTMLElement} input - Ô input cần xóa lỗi
 */
function clearError(input) {
    const inputGroup = input.parentElement; // Lấy thẻ cha
    const errorMessage = inputGroup.querySelector('.error-message'); // Tìm thông báo lỗi
    
    // Nếu có thông báo lỗi thì xóa đi
    if (errorMessage) {
        errorMessage.remove();
    }
    
    // Xóa class 'error' để trả input về trạng thái bình thường
    input.classList.remove('error');
}

// ========================================
// 5. KIỂM TRA THỜI GIAN THỰC CHO FORM ĐĂNG NHẬP
// ========================================

// Lấy các ô input từ form đăng nhập
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

/**
 * Kiểm tra email khi người dùng rời khỏi ô input (blur event)
 */
loginEmail.addEventListener('blur', function() {
    const email = this.value.trim(); // Lấy giá trị và xóa khoảng trắng đầu/cuối
    
    if (!email) {
        // Nếu để trống
        showError(this, 'Email không được để trống');
    } else if (!validateEmail(email)) {
        // Nếu sai định dạng
        showError(this, 'Email không đúng định dạng');
    } else {
        // Nếu hợp lệ thì xóa lỗi (nếu có)
        clearError(this);
    }
});

/**
 * Kiểm tra mật khẩu khi người dùng rời khỏi ô input
 */
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

/**
 * Xóa lỗi ngay khi người dùng bắt đầu nhập lại (input event)
 * Giúp trải nghiệm người dùng tốt hơn - không phải đợi blur mới xóa lỗi
 */
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

// Lấy các ô input từ form đăng ký
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const verifyPassword = document.getElementById('verifyPassword');

/**
 * Kiểm tra username khi blur
 */
registerUsername.addEventListener('blur', function() {
    const username = this.value.trim();
    
    if (!username) {
        showError(this, 'Username không được để trống');
    } else if (!validateUsername(username)) {
        showError(this, 'Username phải có từ 6-18 ký tự');
    } else if (userStorage.isUsernameExists(username)) {
        // ✨ MỚI: Kiểm tra username đã tồn tại chưa
        showError(this, 'Username đã tồn tại. Vui lòng chọn username khác.');
    } else {
        clearError(this);
    }
});

/**
 * Kiểm tra email khi blur
 */
registerEmail.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (!email) {
        showError(this, 'Email không được để trống');
    } else if (!validateEmail(email)) {
        showError(this, 'Email không đúng định dạng');
    } else if (userStorage.isEmailExists(email)) {
        // ✨ MỚI: Kiểm tra email đã được đăng ký chưa
        showError(this, 'Email đã được đăng ký. Vui lòng sử dụng email khác.');
    } else {
        clearError(this);
    }
});

/**
 * Kiểm tra mật khẩu khi blur
 */
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

/**
 * Kiểm tra xác nhận mật khẩu khi blur
 * QUAN TRỌNG: So sánh với mật khẩu đã nhập ở trên
 */
verifyPassword.addEventListener('blur', function() {
    const password = registerPassword.value; // Lấy mật khẩu gốc
    const verify = this.value;                // Lấy mật khẩu xác nhận
    
    if (!verify) {
        showError(this, 'Vui lòng xác nhận mật khẩu');
    } else if (password !== verify) {
        // So sánh 2 mật khẩu có giống nhau không
        showError(this, 'Mật khẩu xác nhận không khớp');
    } else {
        clearError(this);
    }
});

/**
 * Xóa lỗi khi người dùng bắt đầu nhập lại
 */
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
    
    // QUAN TRỌNG: Nếu ô xác nhận mật khẩu đã có giá trị và đang bị lỗi
    // thì kiểm tra lại khi người dùng thay đổi mật khẩu gốc
    if (verifyPassword.value && verifyPassword.classList.contains('error')) {
        verifyPassword.dispatchEvent(new Event('blur')); // Tự động trigger sự kiện blur
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
    e.preventDefault(); // Ngăn form submit mặc định (không reload trang)
    
    // Lấy giá trị từ các ô input
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    
    // Biến đánh dấu có lỗi hay không
    let hasError = false;
    
    // ===== KIỂM TRA EMAIL =====
    if (!email) {
        showError(loginEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(loginEmail, 'Email không đúng định dạng');
        hasError = true;
    } else {
        clearError(loginEmail);
    }
    
    // ===== KIỂM TRA MẬT KHẨU =====
    if (!password) {
        showError(loginPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(loginPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(loginPassword);
    }
    
    // ===== NẾU KHÔNG CÓ LỖI THÌ THỰC HIỆN ĐĂNG NHẬP =====
    if (!hasError) {
        // ✨ MỚI: Sử dụng UserStorage để đăng nhập
        const result = userStorage.loginUser(email, password);
        
        if (result.success) {
            // Đăng nhập thành công
            showSuccessMessage('Đăng nhập thành công!', 'Chào mừng bạn quay trở lại');
            
            console.log('✅ Login successful!', result.user);
            
            // TODO: Chuyển hướng đến trang chính sau khi đăng nhập
            // setTimeout(() => {
            //     window.location.href = 'index.html';
            // }, 2000);
        } else {
            // Đăng nhập thất bại - hiển thị lỗi
            showError(loginPassword, result.message);
        }
    }
});

// ========================================
// 8. XỬ LÝ KHI SUBMIT FORM ĐĂNG KÝ
// ========================================

registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit mặc định
    
    // Lấy giá trị từ các ô input
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const verify = verifyPassword.value;
    
    // Biến đánh dấu có lỗi hay không
    let hasError = false;
    
    // ===== KIỂM TRA USERNAME =====
    if (!username) {
        showError(registerUsername, 'Username không được để trống');
        hasError = true;
    } else if (!validateUsername(username)) {
        showError(registerUsername, 'Username phải có từ 6-18 ký tự');
        hasError = true;
    } else if (userStorage.isUsernameExists(username)) {
        // ✨ MỚI: Kiểm tra username đã tồn tại
        showError(registerUsername, 'Username đã tồn tại. Vui lòng chọn username khác.');
        hasError = true;
    } else {
        clearError(registerUsername);
    }
    
    // ===== KIỂM TRA EMAIL =====
    if (!email) {
        showError(registerEmail, 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError(registerEmail, 'Email không đúng định dạng');
        hasError = true;
    } else if (userStorage.isEmailExists(email)) {
        // ✨ MỚI: Kiểm tra email đã được đăng ký
        showError(registerEmail, 'Email đã được đăng ký. Vui lòng sử dụng email khác.');
        hasError = true;
    } else {
        clearError(registerEmail);
    }
    
    // ===== KIỂM TRA MẬT KHẨU =====
    if (!password) {
        showError(registerPassword, 'Mật khẩu không được để trống');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(registerPassword, 'Mật khẩu phải có từ 8-20 ký tự');
        hasError = true;
    } else {
        clearError(registerPassword);
    }
    
    // ===== KIỂM TRA XÁC NHẬN MẬT KHẨU =====
    if (!verify) {
        showError(verifyPassword, 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (password !== verify) {
        // QUAN TRỌNG: So sánh 2 mật khẩu phải giống nhau
        showError(verifyPassword, 'Mật khẩu xác nhận không khớp');
        hasError = true;
    } else {
        clearError(verifyPassword);
    }
    
    // ===== NẾU KHÔNG CÓ LỖI THÌ THỰC HIỆN ĐĂNG KÝ =====
    if (!hasError) {
        // ✨ MỚI: Sử dụng UserStorage để đăng ký
        const result = userStorage.registerUser({
            username: username,
            email: email,
            password: password
        });
        
        if (result.success) {
            // Đăng ký thành công
            showSuccessMessage('Đăng ký thành công!', 'Tài khoản của bạn đã được tạo', true);
            
            console.log('✅ Registration successful!', result.user);
        } else {
            // Đăng ký thất bại - hiển thị lỗi (có thể do email/username trùng)
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

/**
 * Hiển thị popup thông báo thành công
 * @param {string} title - Tiêu đề thông báo
 * @param {string} message - Nội dung thông báo
 * @param {boolean} isRegister - true nếu là form đăng ký, false nếu là đăng nhập
 */
function showSuccessMessage(title, message, isRegister = false) {
    // Tạo overlay phủ toàn màn hình
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    
    // Tạo HTML cho popup thành công (có icon tick xanh)
    successOverlay.innerHTML = `
        <div class="success-message">
            <!-- Icon tick tròn xanh -->
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `;
    
    // Thêm popup vào body để hiển thị
    document.body.appendChild(successOverlay);
    
    // ===== TỰ ĐỘNG ẨN SAU 2 GIÂY VÀ XỬ LÝ TIẾP =====
    setTimeout(() => {
        successOverlay.remove(); // Xóa popup
        
        if (isRegister) {
            // Nếu là ĐĂNG KÝ thành công
            registerForm.reset();                       // Reset form đăng ký (xóa sạch dữ liệu)
            registerContainer.classList.add('hidden');  // Ẩn form đăng ký
            loginContainer.classList.remove('hidden');  // Hiện form đăng nhập (để user đăng nhập)
        } else {
            // Nếu là ĐĂNG NHẬP thành công
            loginForm.reset(); // Reset form đăng nhập
            
            // TODO: Chuyển hướng đến trang chính sau khi đăng nhập
            // window.location.href = '/dashboard';
            // hoặc window.location.href = 'index.html';
        }
    }, 2000); // 2000ms = 2 giây
}

// ========================================
// 10. KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP KHI LOAD TRANG
// ========================================

// Khi trang được load, kiểm tra xem user đã đăng nhập chưa
window.addEventListener('DOMContentLoaded', function() {
    const currentUser = userStorage.getCurrentUser();
    
    if (currentUser) {
        console.log('✅ User đã đăng nhập:', currentUser);
        // TODO: Có thể tự động chuyển hướng đến trang chính
        // window.location.href = 'index.html';
    } else {
        console.log('ℹ️ User chưa đăng nhập');
    }
});