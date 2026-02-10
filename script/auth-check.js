/**
 * ==========================================
 * KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP TRÊN TRANG CHỦ
 * ==========================================
 */

// Kiểm tra xem user đã đăng nhập chưa
function checkLoginStatus() {
    const currentUser = userStorage.getCurrentUser();
    const userInfoDiv = document.getElementById('userInfo');
    
    if (currentUser) {
        // User đã đăng nhập - hiển thị thông tin user
        console.log('✅ User đã đăng nhập:', currentUser);
        
        userInfoDiv.innerHTML = `
            <div class="user-dropdown">
                <div class="user-avatar" id="userAvatar">
                    <img src="${currentUser.avatar}" alt="${currentUser.username}">
                    <span class="username">${currentUser.username}</span>
                </div>
                <div class="dropdown-menu" id="dropdownMenu">
                    <div class="dropdown-item">
                        <strong>${currentUser.username}</strong>
                        <small>${currentUser.email}</small>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Trang cá nhân
                    </a>
                    <a href="#" class="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Truyện đang đọc
                    </a>
                    <a href="#" class="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Truyện yêu thích
                    </a>
                    <a href="#" class="dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6m8.66-9a9 9 0 1 1-17.32 0"></path>
                        </svg>
                        Cài đặt
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-btn" id="logoutBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Đăng xuất
                    </a>
                </div>
            </div>
        `;
        
        // Thêm sự kiện toggle dropdown
        const userAvatar = document.getElementById('userAvatar');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Đóng dropdown khi click ra ngoài
        document.addEventListener('click', function(e) {
            if (!userAvatar.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Xử lý đăng xuất
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hiển thị confirm
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                userStorage.logoutUser();
                console.log('✅ User đã đăng xuất');
                window.location.reload(); // Reload trang
            }
        });
        
    } else {
        // User chưa đăng nhập - hiển thị nút đăng nhập
        console.log('ℹ️ User chưa đăng nhập');
        
        userInfoDiv.innerHTML = `
            <a href="login.html" class="login-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Đăng nhập
            </a>
        `;
    }
}

// Chạy khi trang load
window.addEventListener('DOMContentLoaded', checkLoginStatus);

console.log('✅ Auth check system loaded');