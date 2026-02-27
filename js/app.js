/**
 * SAP Partner Sphere - Main Application
 * Enterprise Partner Workforce Management System
 */

// Application State
const AppState = {
    currentUser: null,
    currentModule: 'employeeDatabase',
    data: {
        employees: [...DummyData.employees],
        employeeSkills: [...DummyData.employeeSkills],
        goalsKPIs: [...DummyData.goalsKPIs],
        interviews: [...DummyData.interviews],
        onboardingKT: [...DummyData.onboardingKT],
        leaves: [...DummyData.leaves],
        partnerManagers: [...DummyData.partnerManagers],
        partnerAlumni: [...DummyData.partnerAlumni]
    },
    filters: {},
    pagination: {
        currentPage: 1,
        pageSize: 10
    },
    sortConfig: {
        column: null,
        direction: 'asc'
    }
};

// Utility Functions
const Utils = {
    // Generate unique ID
    generateId: (prefix = 'ID') => {
        return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    },

    // Format date to readable format
    formatDate: (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    // Calculate date difference in days
    dateDiffInDays: (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    // Check if user has permission
    hasPermission: (action) => {
        const role = AppState.currentUser?.role;
        const permissions = {
            'Admin': ['view', 'add', 'edit', 'delete', 'export'],
            'SAP Manager': ['view', 'add', 'edit', 'export'],
            'SAP Lead': ['view', 'add', 'edit', 'export'],
            'Partner Employee': ['view', 'edit-goals'],
            'Viewer': ['view']
        };
        return permissions[role]?.includes(action) || false;
    },

    // Sanitize HTML to prevent XSS
    sanitizeHTML: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    // Filter data by search term
    filterBySearch: (data, searchTerm, fields) => {
        if (!searchTerm) return data;
        const term = searchTerm.toLowerCase();
        return data.filter(item => {
            return fields.some(field => {
                const value = item[field];
                if (Array.isArray(value)) {
                    return value.some(v => v.toLowerCase().includes(term));
                }
                return value?.toString().toLowerCase().includes(term);
            });
        });
    },

    // Sort data by column
    sortData: (data, column, direction = 'asc') => {
        return [...data].sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            // Handle different data types
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    },

    // Paginate data
    paginateData: (data, page, pageSize) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    },

    // Export to CSV (basic implementation)
    exportToCSV: (data, filename) => {
        if (!data || data.length === 0) {
            Toast.show('No data to export', 'warning');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => {
                let cell = row[header];
                if (Array.isArray(cell)) cell = cell.join('; ');
                if (typeof cell === 'string' && cell.includes(',')) {
                    cell = `"${cell}"`;
                }
                return cell || '';
            }).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone
    validatePhone: (phone) => {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    // Validate required fields
    validateForm: (formData, requiredFields) => {
        const errors = {};
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                errors[field] = 'This field is required';
            }
        });
        return errors;
    }
};

// Toast Notification System
const Toast = {
    container: null,

    init: () => {
        if (!Toast.container) {
            Toast.container = document.createElement('div');
            Toast.container.className = 'toast-container';
            document.body.appendChild(Toast.container);
        }
    },

    show: (message, type = 'info', duration = 4000) => {
        Toast.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                <div class="toast-title">${titles[type] || titles.info}</div>
                <div class="toast-message">${Utils.sanitizeHTML(message)}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        Toast.container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);
    }
};

// Modal System
const Modal = {
    show: (title, content, size = 'medium', onClose = null) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'currentModal';

        const modal = document.createElement('div');
        modal.className = `modal ${size}`;

        modal.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title">${Utils.sanitizeHTML(title)}</h3>
                <button class="modal-close" onclick="Modal.close()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                Modal.close();
            }
        });

        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                Modal.close();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        if (onClose) {
            overlay.dataset.onClose = 'true';
            overlay._onCloseCallback = onClose;
        }
    },

    close: () => {
        const overlay = document.getElementById('currentModal');
        if (overlay) {
            if (overlay._onCloseCallback) {
                overlay._onCloseCallback();
            }
            overlay.remove();
        }
    },

    confirm: (title, message, onConfirm, onCancel = null) => {
        const content = `
            <div class="modal-confirmation">
                <div class="modal-confirmation-icon warning">⚠</div>
                <div class="modal-confirmation-title">${Utils.sanitizeHTML(title)}</div>
                <div class="modal-confirmation-message">${Utils.sanitizeHTML(message)}</div>
            </div>
            <div class="modal-footer">
                <button class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                <button class="fiori-button fiori-button-error" onclick="Modal.executeConfirm()">Confirm</button>
            </div>
        `;

        Modal.show(title, content, 'small');
        
        // Store callback temporarily
        window._modalConfirmCallback = onConfirm;
        window._modalCancelCallback = onCancel;
    },

    executeConfirm: () => {
        if (window._modalConfirmCallback) {
            window._modalConfirmCallback();
            delete window._modalConfirmCallback;
        }
        if (window._modalCancelCallback) {
            delete window._modalCancelCallback;
        }
        Modal.close();
    }
};

// Authentication System
const Auth = {
    login: (username, password) => {
        const user = DummyData.users.find(u => 
            u.username === username && u.password === password
        );

        if (user) {
            AppState.currentUser = { ...user };
            delete AppState.currentUser.password; // Remove password from state
            localStorage.setItem('currentUser', JSON.stringify(AppState.currentUser));
            return true;
        }
        return false;
    },

    logout: () => {
        AppState.currentUser = null;
        localStorage.removeItem('currentUser');
        App.showLoginScreen();
    },

    checkAuth: () => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            AppState.currentUser = JSON.parse(storedUser);
            return true;
        }
        return false;
    },

    getCurrentUser: () => {
        return AppState.currentUser;
    }
};

// Main Application Controller
const App = {
    init: () => {
        console.log('Initializing SAP Partner Sphere...');
        
        // Check authentication
        if (Auth.checkAuth()) {
            App.showMainApp();
        } else {
            App.showLoginScreen();
        }
    },

    showLoginScreen: () => {
        document.body.innerHTML = `
            <div class="login-screen">
                <div class="login-container">
                    <div class="login-header">
                        <div class="sap-logo">SAP Partner Sphere</div>
                        <div class="tagline">Partner Workforce, Simplified</div>
                    </div>
                    <form class="login-form" onsubmit="App.handleLogin(event)">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" class="fiori-input" required autofocus>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="fiori-input" required>
                        </div>
                        <button type="submit" class="fiori-button fiori-button-primary" style="width: 100%;">
                            Login
                        </button>
                        <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--sap-text-secondary); text-align: center;">
                            Demo Credentials:<br>
                            admin/admin123 | manager1/manager123 | employee1/emp123 | viewer/viewer123
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    handleLogin: (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (Auth.login(username, password)) {
            Toast.show('Login successful', 'success');
            App.showMainApp();
        } else {
            Toast.show('Invalid username or password', 'error');
        }
    },

    showMainApp: () => {
        const user = Auth.getCurrentUser();
        
        document.body.innerHTML = `
            <div class="main-app">
                <header class="app-header">
                    <div class="header-left">
                        <button class="menu-toggle" onclick="Navigation.toggle()">☰</button>
                        <div>
                            <div class="app-title">SAP Partner Sphere</div>
                            <div class="app-tagline">Partner Workforce, Simplified</div>
                        </div>
                    </div>
                    <div class="header-right">
                        <span class="user-info">${user.name} (${user.role})</span>
                        <button class="fiori-button fiori-button-transparent" onclick="Auth.logout()">
                            Logout
                        </button>
                    </div>
                </header>
                <div class="app-body">
                    <nav class="side-nav" id="sideNav">
                        ${Navigation.render()}
                    </nav>
                    <div class="nav-overlay" id="navOverlay" onclick="Navigation.close()"></div>
                    <main class="main-content" id="mainContent">
                        <div class="module-container" id="moduleContainer">
                            <!-- Module content will be loaded here -->
                        </div>
                    </main>
                </div>
            </div>
        `;

        // Load initial module
        Modules.load(AppState.currentModule);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});