/**
 * Navigation Component
 * Side navigation menu with module switching
 */

const Navigation = {
    modules: [
        { id: 'employeeDatabase', name: 'Employee Database', icon: '👥' },
        { id: 'employeeSkillset', name: 'Employee Skillset', icon: '🎯' },
        { id: 'goalsKPIs', name: 'Goals & KPIs', icon: '📊' },
        { id: 'interviews', name: 'Interviews', icon: '💼' },
        { id: 'onboardingKT', name: 'Basic Onboarding KT', icon: '📚' },
        { id: 'leaves', name: 'Leaves', icon: '🗓️' },
        { id: 'partnerManagers', name: 'Partner Manager Directory', icon: '📋' },
        { id: 'partnerAlumni', name: 'Partner Alumni', icon: '🎓' }
    ],

    render: () => {
        return `
            <div class="nav-header">
                <h3>Modules</h3>
            </div>
            <ul class="nav-menu">
                ${Navigation.modules.map(module => `
                    <li class="nav-item ${AppState.currentModule === module.id ? 'active' : ''}" 
                        onclick="Navigation.navigateTo('${module.id}')">
                        <span class="nav-icon">${module.icon}</span>
                        <span class="nav-text">${module.name}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    },

    navigateTo: (moduleId) => {
        AppState.currentModule = moduleId;
        
        // Update active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.nav-item').classList.add('active');
        
        // Close mobile menu
        Navigation.close();
        
        // Load module
        Modules.load(moduleId);
    },

    toggle: () => {
        const nav = document.getElementById('sideNav');
        const overlay = document.getElementById('navOverlay');
        nav.classList.toggle('open');
        overlay.classList.toggle('active');
    },

    close: () => {
        const nav = document.getElementById('sideNav');
        const overlay = document.getElementById('navOverlay');
        nav.classList.remove('open');
        overlay.classList.remove('active');
    }
};