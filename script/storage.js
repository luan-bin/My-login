/**
 * ==========================================
 * HỆ THỐNG QUẢN LÝ NGƯỜI DÙNG - USER STORAGE
 * Sử dụng LocalStorage để lưu trữ dữ liệu
 * ==========================================
 */

const userStorage = {
    // Key để lưu trong localStorage
    STORAGE_KEY: 'comic_users',
    CURRENT_USER_KEY: 'comic_current_user',
    
    /**
     * Lấy danh sách tất cả người dùng từ localStorage
     * @returns {Array} Mảng chứa thông tin người dùng
     */
    getAllUsers() {
        const usersData = localStorage.getItem(this.STORAGE_KEY);
        return usersData ? JSON.parse(usersData) : [];
    },
    
    /**
     * Lưu danh sách người dùng vào localStorage
     * @param {Array} users - Mảng chứa thông tin người dùng
     */
    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },
    
    /**
     * Kiểm tra email đã tồn tại chưa
     * @param {string} email - Email cần kiểm tra
     * @returns {boolean} true nếu email đã tồn tại
     */
    isEmailExists(email) {
        const users = this.getAllUsers();
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    },
    
    /**
     * Kiểm tra username đã tồn tại chưa
     * @param {string} username - Username cần kiểm tra
     * @returns {boolean} true nếu username đã tồn tại
     */
    isUsernameExists(username) {
        const users = this.getAllUsers();
        return users.some(user => user.username.toLowerCase() === username.toLowerCase());
    },
    
    /**
     * Đăng ký người dùng mới
     * @param {Object} userData - Thông tin người dùng {username, email, password}
     * @returns {Object} {success: boolean, message: string, user: Object}
     */
    registerUser(userData) {
        const { username, email, password } = userData;
        
        // Kiểm tra email đã tồn tại
        if (this.isEmailExists(email)) {
            return {
                success: false,
                message: 'Email đã được đăng ký. Vui lòng sử dụng email khác.'
            };
        }
        
        // Kiểm tra username đã tồn tại
        if (this.isUsernameExists(username)) {
            return {
                success: false,
                message: 'Username đã tồn tại. Vui lòng chọn username khác.'
            };
        }
        
        // Tạo user mới
        const newUser = {
            id: Date.now(), // ID duy nhất dựa trên timestamp
            username: username,
            email: email,
            password: password, // Trong thực tế nên mã hóa password
            createdAt: new Date().toISOString(),
            avatar: 'https://via.placeholder.com/40' // Avatar mặc định
        };
        
        // Lưu vào danh sách
        const users = this.getAllUsers();
        users.push(newUser);
        this.saveUsers(users);
        
        return {
            success: true,
            message: 'Đăng ký thành công!',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            }
        };
    },
    
    /**
     * Đăng nhập người dùng
     * @param {string} email - Email đăng nhập
     * @param {string} password - Mật khẩu
     * @returns {Object} {success: boolean, message: string, user: Object}
     */
    loginUser(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );
        
        if (!user) {
            return {
                success: false,
                message: 'Email hoặc mật khẩu không chính xác'
            };
        }
        
        // Lưu thông tin user hiện tại
        const currentUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            loginAt: new Date().toISOString()
        };
        
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
        
        return {
            success: true,
            message: 'Đăng nhập thành công!',
            user: currentUser
        };
    },
    
    /**
     * Lấy thông tin người dùng hiện tại
     * @returns {Object|null} Thông tin user hoặc null nếu chưa đăng nhập
     */
    getCurrentUser() {
        const userData = localStorage.getItem(this.CURRENT_USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },
    
    /**
     * Đăng xuất người dùng
     */
    logoutUser() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    },
    
    /**
     * Kiểm tra người dùng đã đăng nhập chưa
     * @returns {boolean} true nếu đã đăng nhập
     */
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
};

// Log để debug
console.log('✅ User Storage System loaded');