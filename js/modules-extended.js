/**
 * Additional Modules - Part 2
 * Employee Skillset, Goals & KPIs, Interviews, Onboarding KT, Leaves
 */

/**
 * Employee Skillset Module
 */
const EmployeeSkillsetModule = {
    render: (container) => {
        const canAdd = Utils.hasPermission('add');
        const canEdit = Utils.hasPermission('edit');

        container.innerHTML = `
            <div class="module-header">
                <h2>Employee Skillset</h2>
                <div class="module-actions">
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="EmployeeSkillsetModule.showAddModal()">Add/Update Skills</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search by skill..." onkeyup="EmployeeSkillsetModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterSapTeam" class="fiori-select" onchange="EmployeeSkillsetModule.applyFilters()">
                        <option value="">All SAP Teams</option>
                        ${DummyData.sapTeams.map(team => `<option value="${team}">${team}</option>`).join('')}
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="EmployeeSkillsetModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        EmployeeSkillsetModule.renderTable();
    },

    getData: () => {
        return AppState.data.employeeSkills;
    },

    applyFilters: () => {
        EmployeeSkillsetModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterSapTeam').value = '';
        EmployeeSkillsetModule.renderTable();
    },

    renderTable: () => {
        let data = EmployeeSkillsetModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'functionalSkills', 'technicalSkills', 'others']);
        }

        const sapTeam = document.getElementById('filterSapTeam')?.value;
        if (sapTeam) data = data.filter(e => e.sapTeam === sapTeam);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const canEdit = Utils.hasPermission('edit');

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>SAP Team</th>
                            <th>SAP Manager</th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Functional Skills</th>
                            <th>Technical Skills</th>
                            <th>Others</th>
                            ${canEdit ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="8" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(emp => `
                            <tr>
                                <td>${emp.sapTeam}</td>
                                <td>${emp.sapManager}</td>
                                <td>${emp.employeeId}</td>
                                <td><strong>${emp.employeeName}</strong></td>
                                <td>${emp.functionalSkills.map(s => `<span class="skill-tag skill-functional">${s}</span>`).join(' ')}</td>
                                <td>${emp.technicalSkills.map(s => `<span class="skill-tag skill-technical">${s}</span>`).join(' ')}</td>
                                <td>${emp.others.map(s => `<span class="skill-tag skill-other">${s}</span>`).join(' ')}</td>
                                ${canEdit ? `
                                    <td class="table-actions">
                                        <button class="fiori-button-icon" onclick='EmployeeSkillsetModule.showEditModal(${JSON.stringify(emp).replace(/'/g, "&#39;")})' title="Edit">✎</button>
                                    </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === 1 ? 'disabled' : ''} 
                    onclick="EmployeeSkillsetModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="EmployeeSkillsetModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        EmployeeSkillsetModule.renderTable();
    },

    showAddModal: () => {
        const employees = AppState.data.employees;
        const formHTML = `
            <form class="modal-form" onsubmit="EmployeeSkillsetModule.saveSkills(event)">
                <div class="form-group">
                    <label>Select Employee *</label>
                    <select name="employeeId" class="fiori-select" required onchange="EmployeeSkillsetModule.loadEmployeeSkills(this.value)">
                        <option value="">Select Employee</option>
                        ${employees.map(e => `<option value="${e.employeeId}">${e.employeeName} (${e.employeeId})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Functional Skills</label>
                    <input type="text" name="functionalSkills" id="functionalSkillsInput" class="fiori-input" placeholder="Enter skills separated by commas">
                    <small>e.g., SAP MM, SAP SD, Procurement</small>
                </div>
                <div class="form-group">
                    <label>Technical Skills</label>
                    <input type="text" name="technicalSkills" id="technicalSkillsInput" class="fiori-input" placeholder="Enter skills separated by commas">
                    <small>e.g., JavaScript, Python, ABAP</small>
                </div>
                <div class="form-group">
                    <label>Other Skills</label>
                    <input type="text" name="others" id="othersInput" class="fiori-input" placeholder="Enter skills separated by commas">
                    <small>e.g., Project Management, Agile</small>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add/Update Skills', formHTML, 'medium');
    },

    showEditModal: (skillset) => {
        const formHTML = `
            <form class="modal-form" onsubmit="EmployeeSkillsetModule.updateSkills(event, '${skillset.id}')">
                <div class="form-group">
                    <label>Employee</label>
                    <input type="text" class="fiori-input" value="${skillset.employeeName} (${skillset.employeeId})" disabled>
                </div>
                <div class="form-group">
                    <label>Functional Skills</label>
                    <input type="text" name="functionalSkills" class="fiori-input" value="${skillset.functionalSkills.join(', ')}">
                </div>
                <div class="form-group">
                    <label>Technical Skills</label>
                    <input type="text" name="technicalSkills" class="fiori-input" value="${skillset.technicalSkills.join(', ')}">
                </div>
                <div class="form-group">
                    <label>Other Skills</label>
                    <input type="text" name="others" class="fiori-input" value="${skillset.others.join(', ')}">
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit Skills', formHTML, 'medium');
    },

    loadEmployeeSkills: (employeeId) => {
        const existing = AppState.data.employeeSkills.find(s => s.employeeId === employeeId);
        if (existing) {
            document.getElementById('functionalSkillsInput').value = existing.functionalSkills.join(', ');
            document.getElementById('technicalSkillsInput').value = existing.technicalSkills.join(', ');
            document.getElementById('othersInput').value = existing.others.join(', ');
        }
    },

    saveSkills: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employeeId = formData.get('employeeId');
        const employee = AppState.data.employees.find(e => e.employeeId === employeeId);

        if (!employee) {
            Toast.show('Employee not found', 'error');
            return;
        }

        const skillset = {
            id: Utils.generateId('SKILL'),
            sapTeam: employee.sapTeam,
            sapManager: employee.sapManager,
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            functionalSkills: formData.get('functionalSkills').split(',').map(s => s.trim()).filter(s => s),
            technicalSkills: formData.get('technicalSkills').split(',').map(s => s.trim()).filter(s => s),
            others: formData.get('others').split(',').map(s => s.trim()).filter(s => s)
        };

        const existingIndex = AppState.data.employeeSkills.findIndex(s => s.employeeId === employeeId);
        if (existingIndex !== -1) {
            AppState.data.employeeSkills[existingIndex] = skillset;
            Toast.show('Skills updated successfully', 'success');
        } else {
            AppState.data.employeeSkills.push(skillset);
            Toast.show('Skills added successfully', 'success');
        }

        Modal.close();
        EmployeeSkillsetModule.renderTable();
    },

    updateSkills: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.employeeSkills.findIndex(s => s.id === id);

        if (index !== -1) {
            AppState.data.employeeSkills[index] = {
                ...AppState.data.employeeSkills[index],
                functionalSkills: formData.get('functionalSkills').split(',').map(s => s.trim()).filter(s => s),
                technicalSkills: formData.get('technicalSkills').split(',').map(s => s.trim()).filter(s => s),
                others: formData.get('others').split(',').map(s => s.trim()).filter(s => s)
            };

            Toast.show('Skills updated successfully', 'success');
            Modal.close();
            EmployeeSkillsetModule.renderTable();
        }
    }
};

/**
 * Goals & KPIs Module
 */
const GoalsKPIsModule = {
    selectedYear: new Date().getFullYear(),

    render: (container) => {
        const canAdd = Utils.hasPermission('add') || Utils.hasPermission('edit-goals');
        const canEdit = Utils.hasPermission('edit') || Utils.hasPermission('edit-goals');

        const years = [2024, 2025, 2026, 2027];

        container.innerHTML = `
            <div class="module-header">
                <h2>Goals & KPIs</h2>
                <div class="module-actions">
                    <select id="yearFilter" class="fiori-select" onchange="GoalsKPIsModule.changeYear(this.value)" style="margin-right: 1rem;">
                        ${years.map(y => `<option value="${y}" ${y === GoalsKPIsModule.selectedYear ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="GoalsKPIsModule.showAddModal()">Add Goal</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="GoalsKPIsModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterSapTeam" class="fiori-select" onchange="GoalsKPIsModule.applyFilters()">
                        <option value="">All SAP Teams</option>
                        ${DummyData.sapTeams.map(team => `<option value="${team}">${team}</option>`).join('')}
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="GoalsKPIsModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        GoalsKPIsModule.renderTable();
    },

    changeYear: (year) => {
        GoalsKPIsModule.selectedYear = parseInt(year);
        GoalsKPIsModule.renderTable();
    },

    getData: () => {
        return AppState.data.goalsKPIs.filter(g => g.year === GoalsKPIsModule.selectedYear);
    },

    applyFilters: () => {
        GoalsKPIsModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterSapTeam').value = '';
        GoalsKPIsModule.renderTable();
    },

    renderTable: () => {
        let data = GoalsKPIsModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'goalTitle', 'goalDescription']);
        }

        const sapTeam = document.getElementById('filterSapTeam')?.value;
        if (sapTeam) data = data.filter(e => e.sapTeam === sapTeam);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const canEdit = Utils.hasPermission('edit') || Utils.hasPermission('edit-goals');

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>SAP Team</th>
                            <th>SAP Manager</th>
                            <th>Employee Name</th>
                            <th>Goal Title</th>
                            <th>Target</th>
                            <th>H1 Achievement</th>
                            <th>H2 Achievement</th>
                            <th>Trainings</th>
                            <th>Status</th>
                            ${canEdit ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="10" style="text-align:center;">No goals found for ' + GoalsKPIsModule.selectedYear + '</td></tr>' : ''}
                        ${data.map(goal => {
                            const statusClass = goal.kpiStatus === 'Green' ? 'badge-success' : 
                                              goal.kpiStatus === 'Yellow' ? 'badge-warning' : 'badge-error';
                            return `
                            <tr>
                                <td>${goal.sapTeam}</td>
                                <td>${goal.sapManager}</td>
                                <td><strong>${goal.employeeName}</strong></td>
                                <td>${goal.goalTitle}</td>
                                <td>${goal.target}</td>
                                <td>${goal.h1Achievement}</td>
                                <td>${goal.h2Achievement}</td>
                                <td>${goal.trainingsCompleted}</td>
                                <td><span class="badge ${statusClass}">${goal.kpiStatus}</span></td>
                                ${canEdit ? `
                                    <td class="table-actions">
                                        <button class="fiori-button-icon" onclick='GoalsKPIsModule.showEditModal(${JSON.stringify(goal).replace(/'/g, "&#39;")})' title="Edit">✎</button>
                                    </td>
                                ` : ''}
                            </tr>
                        `}).join('')}
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === 1 ? 'disabled' : ''} 
                    onclick="GoalsKPIsModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="GoalsKPIsModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        GoalsKPIsModule.renderTable();
    },

    showAddModal: () => {
        const employees = AppState.data.employees;
        const years = [2024, 2025, 2026, 2027];
        const formHTML = `
            <form class="modal-form" onsubmit="GoalsKPIsModule.saveGoal(event)">
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Select Employee *</label>
                        <select name="employeeId" class="fiori-select" required>
                            <option value="">Select Employee</option>
                            ${employees.map(e => `<option value="${e.employeeId}">${e.employeeName} (${e.employeeId})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Year *</label>
                        <select name="year" class="fiori-select" required>
                            ${years.map(y => `<option value="${y}" ${y === GoalsKPIsModule.selectedYear ? 'selected' : ''}>${y}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Goal Title *</label>
                    <input type="text" name="goalTitle" class="fiori-input" required>
                </div>
                <div class="form-group">
                    <label>Goal Description *</label>
                    <textarea name="goalDescription" class="fiori-input" rows="3" required></textarea>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Target *</label>
                        <input type="text" name="target" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>KPI Status *</label>
                        <select name="kpiStatus" class="fiori-select" required>
                            <option value="Green">Green</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Red">Red</option>
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>H1 Achievement</label>
                        <input type="text" name="h1Achievement" class="fiori-input">
                    </div>
                    <div class="form-group">
                        <label>H2 Achievement</label>
                        <input type="text" name="h2Achievement" class="fiori-input">
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Trainings Completed</label>
                        <input type="text" name="trainingsCompleted" class="fiori-input">
                    </div>
                    <div class="form-group">
                        <label>Feedback</label>
                        <input type="text" name="feedback" class="fiori-input">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add Goal', formHTML, 'large');
    },

    showEditModal: (goal) => {
        const years = [2024, 2025, 2026, 2027];
        const formHTML = `
            <form class="modal-form" onsubmit="GoalsKPIsModule.updateGoal(event, '${goal.id}')">
                <div class="form-group">
                    <label>Employee</label>
                    <input type="text" class="fiori-input" value="${goal.employeeName} (${goal.employeeId})" disabled>
                </div>
                <div class="form-group">
                    <label>Year *</label>
                    <select name="year" class="fiori-select" required>
                        ${years.map(y => `<option value="${y}" ${y === goal.year ? 'selected' : ''}>${y}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Goal Title *</label>
                    <input type="text" name="goalTitle" class="fiori-input" value="${goal.goalTitle}" required>
                </div>
                <div class="form-group">
                    <label>Goal Description *</label>
                    <textarea name="goalDescription" class="fiori-input" rows="3" required>${goal.goalDescription}</textarea>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Target *</label>
                        <input type="text" name="target" class="fiori-input" value="${goal.target}" required>
                    </div>
                    <div class="form-group">
                        <label>KPI Status *</label>
                        <select name="kpiStatus" class="fiori-select" required>
                            <option value="Green" ${goal.kpiStatus === 'Green' ? 'selected' : ''}>Green</option>
                            <option value="Yellow" ${goal.kpiStatus === 'Yellow' ? 'selected' : ''}>Yellow</option>
                            <option value="Red" ${goal.kpiStatus === 'Red' ? 'selected' : ''}>Red</option>
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>H1 Achievement</label>
                        <input type="text" name="h1Achievement" class="fiori-input" value="${goal.h1Achievement}">
                    </div>
                    <div class="form-group">
                        <label>H2 Achievement</label>
                        <input type="text" name="h2Achievement" class="fiori-input" value="${goal.h2Achievement}">
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Trainings Completed</label>
                        <input type="text" name="trainingsCompleted" class="fiori-input" value="${goal.trainingsCompleted}">
                    </div>
                    <div class="form-group">
                        <label>Feedback</label>
                        <input type="text" name="feedback" class="fiori-input" value="${goal.feedback}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit Goal', formHTML, 'large');
    },

    saveGoal: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employeeId = formData.get('employeeId');
        const employee = AppState.data.employees.find(e => e.employeeId === employeeId);

        if (!employee) {
            Toast.show('Employee not found', 'error');
            return;
        }

        const goal = {
            id: Utils.generateId('GOAL'),
            sapTeam: employee.sapTeam,
            sapManager: employee.sapManager,
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            year: parseInt(formData.get('year')),
            goalTitle: formData.get('goalTitle'),
            goalDescription: formData.get('goalDescription'),
            target: formData.get('target'),
            h1Achievement: formData.get('h1Achievement') || '-',
            h2Achievement: formData.get('h2Achievement') || '-',
            trainingsCompleted: formData.get('trainingsCompleted') || '-',
            feedback: formData.get('feedback') || '-',
            kpiStatus: formData.get('kpiStatus')
        };

        AppState.data.goalsKPIs.push(goal);
        Toast.show('Goal added successfully', 'success');
        Modal.close();
        GoalsKPIsModule.renderTable();
    },

    updateGoal: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.goalsKPIs.findIndex(g => g.id === id);

        if (index !== -1) {
            AppState.data.goalsKPIs[index] = {
                ...AppState.data.goalsKPIs[index],
                year: parseInt(formData.get('year')),
                goalTitle: formData.get('goalTitle'),
                goalDescription: formData.get('goalDescription'),
                target: formData.get('target'),
                h1Achievement: formData.get('h1Achievement') || '-',
                h2Achievement: formData.get('h2Achievement') || '-',
                trainingsCompleted: formData.get('trainingsCompleted') || '-',
                feedback: formData.get('feedback') || '-',
                kpiStatus: formData.get('kpiStatus')
            };

            Toast.show('Goal updated successfully', 'success');
            Modal.close();
            GoalsKPIsModule.renderTable();
        }
    }
};