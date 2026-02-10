/**
 * ==========================================
 * HỆ THỐNG LƯU TRỮ THÔNG TIN NGƯỜI DÙNG
 * Sử dụng localStorage để lưu trữ dữ liệu
 * ==========================================
 */

// ========================================
// 1. CLASS QUẢN LÝ LƯU TRỮ NGƯỜI DÙNG
// ========================================

class UserStorage {
    constructor() {
        // Key để lưu danh sách users trong localStorage
        this.USERS_KEY = 'mindx_cinema_users';
        // Key để lưu thông tin user đang đăng nhập
        this.CURRENT_USER_KEY = 'mindx_cinema_current_user';
        
        // Khởi tạo storage nếu chưa có
        this.initializeStorage();
    }

    /**
     * Khởi tạo storage lần đầu tiên
     * Tạo mảng rỗng nếu chưa có dữ liệu
     */
    initializeStorage() {
        if (!localStorage.getItem(this.USERS_KEY)) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
        }
    }

    /**
     * Lấy tất cả người dùng từ localStorage
     * @returns {Array} - Mảng chứa tất cả users
     */
    getAllUsers() {
        try {
            const users = localStorage.getItem(this.USERS_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Lỗi khi đọc dữ liệu users:', error);
            return [];
        }
    }

    /**
     * Lưu danh sách users vào localStorage
     * @param {Array} users - Mảng users cần lưu
     */
    saveUsers(users) {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu users:', error);
            return false;
        }
    }

    /**
     * Kiểm tra email đã tồn tại chưa
     * @param {string} email - Email cần kiểm tra
     * @returns {boolean} - true nếu đã tồn tại, false nếu chưa
     */
    isEmailExists(email) {
        const users = this.getAllUsers();
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    /**
     * Kiểm tra username đã tồn tại chưa
     * @param {string} username - Username cần kiểm tra
     * @returns {boolean} - true nếu đã tồn tại, false nếu chưa
     */
    isUsernameExists(username) {
        const users = this.getAllUsers();
        return users.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    /**
     * Đăng ký người dùng mới
     * @param {Object} userData - Thông tin người dùng {username, email, password}
     * @returns {Object} - {success: boolean, message: string, user: Object}
     */
    registerUser(userData) {
        const { username, email, password } = userData;

        // Kiểm tra email đã tồn tại
        if (this.isEmailExists(email)) {
            return {
                success: false,
                message: 'Email đã được đăng ký. Vui lòng sử dụng email khác.',
                user: null
            };
        }

        // Kiểm tra username đã tồn tại
        if (this.isUsernameExists(username)) {
            return {
                success: false,
                message: 'Username đã tồn tại. Vui lòng chọn username khác.',
                user: null
            };
        }

        // Tạo object user mới
        const newUser = {
            id: this.generateUserId(),              // ID duy nhất
            username: username.trim(),              // Tên đăng nhập
            email: email.trim().toLowerCase(),      // Email (lowercase)
            password: this.hashPassword(password),  // Mật khẩu đã mã hóa
            createdAt: new Date().toISOString(),    // Thời gian tạo
            lastLogin: null,                        // Lần đăng nhập cuối
            isActive: true                          // Trạng thái tài khoản
        };

        // Lấy danh sách users hiện tại và thêm user mới
        const users = this.getAllUsers();
        users.push(newUser);

        // Lưu vào localStorage
        if (this.saveUsers(users)) {
            return {
                success: true,
                message: 'Đăng ký thành công!',
                user: this.sanitizeUser(newUser) // Loại bỏ password khi trả về
            };
        } else {
            return {
                success: false,
                message: 'Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.',
                user: null
            };
        }
    }

    /**
     * Đăng nhập người dùng
     * @param {string} email - Email đăng nhập
     * @param {string} password - Mật khẩu
     * @returns {Object} - {success: boolean, message: string, user: Object}
     */
    loginUser(email, password) {
        const users = this.getAllUsers();
        
        // Tìm user theo email
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        // Kiểm tra user có tồn tại không
        if (!user) {
            return {
                success: false,
                message: 'Email hoặc mật khẩu không chính xác.',
                user: null
            };
        }

        // Kiểm tra tài khoản có bị khóa không
        if (!user.isActive) {
            return {
                success: false,
                message: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.',
                user: null
            };
        }

        // Kiểm tra mật khẩu
        if (!this.verifyPassword(password, user.password)) {
            return {
                success: false,
                message: 'Email hoặc mật khẩu không chính xác.',
                user: null
            };
        }

        // Cập nhật thời gian đăng nhập cuối
        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);

        // Lưu thông tin user đang đăng nhập
        this.setCurrentUser(user);

        return {
            success: true,
            message: 'Đăng nhập thành công!',
            user: this.sanitizeUser(user)
        };
    }

    /**
     * Đăng xuất người dùng hiện tại
     */
    logoutUser() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    /**
     * Lấy thông tin user đang đăng nhập
     * @returns {Object|null} - Thông tin user hoặc null nếu chưa đăng nhập
     */
    getCurrentUser() {
        try {
            const user = localStorage.getItem(this.CURRENT_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Lỗi khi đọc current user:', error);
            return null;
        }
    }

    /**
     * Lưu thông tin user đang đăng nhập
     * @param {Object} user - Thông tin user
     */
    setCurrentUser(user) {
        try {
            const sanitizedUser = this.sanitizeUser(user);
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(sanitizedUser));
        } catch (error) {
            console.error('Lỗi khi lưu current user:', error);
        }
    }

    /**
     * Kiểm tra user có đang đăng nhập không
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    /**
     * Tạo ID ngẫu nhiên cho user
     * @returns {string} - ID duy nhất
     */
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Mã hóa mật khẩu (simple hash - trong thực tế nên dùng bcrypt ở server)
     * @param {string} password - Mật khẩu gốc
     * @returns {string} - Mật khẩu đã hash
     */
    hashPassword(password) {
        // ⚠️ LƯU Ý: Đây chỉ là mã hóa đơn giản cho demo
        // Trong thực tế, PHẢI mã hóa ở server-side bằng bcrypt, argon2...
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return 'hashed_' + Math.abs(hash).toString(36);
    }

    /**
     * Xác thực mật khẩu
     * @param {string} inputPassword - Mật khẩu người dùng nhập
     * @param {string} storedPassword - Mật khẩu đã hash trong database
     * @returns {boolean}
     */
    verifyPassword(inputPassword, storedPassword) {
        return this.hashPassword(inputPassword) === storedPassword;
    }

    /**
     * Loại bỏ thông tin nhạy cảm (password) khỏi object user
     * @param {Object} user - User object
     * @returns {Object} - User object đã sanitize
     */
    sanitizeUser(user) {
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }

    /**
     * Xóa tất cả dữ liệu (dùng cho testing hoặc reset)
     * ⚠️ NGUY HIỂM - Chỉ dùng khi cần thiết
     */
    clearAllData() {
        if (confirm('⚠️ BẠN CÓ CHẮC MUỐN XÓA TẤT CẢ DỮ LIỆU NGƯỜI DÙNG?')) {
            localStorage.removeItem(this.USERS_KEY);
            localStorage.removeItem(this.CURRENT_USER_KEY);
            this.initializeStorage();
            console.log('✅ Đã xóa tất cả dữ liệu!');
        }
    }

    /**
     * Xuất dữ liệu ra file JSON (backup)
     */
    exportData() {
        const data = {
            users: this.getAllUsers(),
            exportedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mindx_cinema_backup_${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('✅ Đã xuất dữ liệu thành công!');
    }

    /**
     * Lấy thống kê người dùng
     * @returns {Object} - Thống kê
     */
    getStatistics() {
        const users = this.getAllUsers();
        return {
            totalUsers: users.length,
            activeUsers: users.filter(u => u.isActive).length,
            inactiveUsers: users.filter(u => !u.isActive).length,
            usersWithLogin: users.filter(u => u.lastLogin !== null).length,
            recentRegistrations: users.filter(u => {
                const createdDate = new Date(u.createdAt);
                const daysDiff = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
                return daysDiff <= 7; // Đăng ký trong 7 ngày qua
            }).length
        };
    }
}

// ========================================
// KHỞI TẠO INSTANCE GLOBAL
// ========================================

// Tạo instance để sử dụng trong toàn bộ ứng dụng
const userStorage = new UserStorage();

// Export để có thể import ở file khác (nếu dùng ES6 modules)
// export default userStorage;

// ========================================
// CONSOLE HELPER FUNCTIONS (Dùng để test)
// ========================================

/**
 * Hiển thị tất cả users trong console
 */
function showAllUsers() {
    const users = userStorage.getAllUsers();
    console.table(users.map(u => ({
        ID: u.id,
        Username: u.username,
        Email: u.email,
        'Created At': new Date(u.createdAt).toLocaleString('vi-VN'),
        'Last Login': u.lastLogin ? new Date(u.lastLogin).toLocaleString('vi-VN') : 'Chưa đăng nhập',
        Active: u.isActive ? '✅' : '❌'
    })));
}

/**
 * Hiển thị thống kê
 */
function showStats() {
    const stats = userStorage.getStatistics();
    console.log('📊 THỐNG KÊ NGƯỜI DÙNG:');
    console.table(stats);
}

// Thêm vào window để có thể gọi từ console
window.userStorage = userStorage;
window.showAllUsers = showAllUsers;
window.showStats = showStats;

console.log('✅ Storage system đã được khởi tạo!');
console.log('💡 Bạn có thể dùng các lệnh sau trong Console:');
console.log('   - showAllUsers() : Xem tất cả users');
console.log('   - showStats() : Xem thống kê');
console.log('   - userStorage.exportData() : Xuất dữ liệu ra file');
console.log('   - userStorage.clearAllData() : Xóa tất cả dữ liệu');