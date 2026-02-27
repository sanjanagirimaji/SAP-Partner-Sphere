/**
 * Modules Controller
 * Handles loading and rendering of different modules
 */

const Modules = {
    load: (moduleId) => {
        const container = document.getElementById('moduleContainer');
        if (!container) return;

        // Reset pagination and filters
        AppState.pagination.currentPage = 1;
        AppState.filters = {};

        // Load appropriate module
        switch (moduleId) {
            case 'employeeDatabase':
                EmployeeDatabaseModule.render(container);
                break;
            case 'employeeSkillset':
                EmployeeSkillsetModule.render(container);
                break;
            case 'goalsKPIs':
                GoalsKPIsModule.render(container);
                break;
            case 'interviews':
                InterviewsModule.render(container);
                break;
            case 'onboardingKT':
                OnboardingKTModule.render(container);
                break;
            case 'leaves':
                LeavesModule.render(container);
                break;
            case 'partnerManagers':
                PartnerManagersModule.render(container);
                break;
            case 'partnerAlumni':
                PartnerAlumniModule.render(container);
                break;
            default:
                container.innerHTML = '<p>Module not found</p>';
        }
    }
};

/**
 * Employee Database Module
 */
const EmployeeDatabaseModule = {
    render: (container) => {
        const canAdd = Utils.hasPermission('add');
        const canExport = Utils.hasPermission('export');

        container.innerHTML = `
            <div class="module-header">
                <h2>Employee Database</h2>
                <div class="module-actions">
                    ${canExport ? '<button class="fiori-button fiori-button-secondary" onclick="EmployeeDatabaseModule.export()">Export to CSV</button>' : ''}
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="EmployeeDatabaseModule.showAddModal()">Add Employee</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="EmployeeDatabaseModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterSapTeam" class="fiori-select" onchange="EmployeeDatabaseModule.applyFilters()">
                        <option value="">All SAP Teams</option>
                        ${DummyData.sapTeams.map(team => `<option value="${team}">${team}</option>`).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <select id="filterSapManager" class="fiori-select" onchange="EmployeeDatabaseModule.applyFilters()">
                        <option value="">All Managers</option>
                        ${DummyData.sapManagers.map(mgr => `<option value="${mgr}">${mgr}</option>`).join('')}
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="EmployeeDatabaseModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        EmployeeDatabaseModule.renderTable();
    },

    getData: () => {
        return AppState.data.employees;
    },

    applyFilters: () => {
        EmployeeDatabaseModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterSapTeam').value = '';
        document.getElementById('filterSapManager').value = '';
        EmployeeDatabaseModule.renderTable();
    },

    renderTable: () => {
        let data = EmployeeDatabaseModule.getData();

        // Apply search filter
        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'employeeId', 'partnerName', 'location']);
        }

        // Apply dropdown filters
        const sapTeam = document.getElementById('filterSapTeam')?.value;
        const sapManager = document.getElementById('filterSapManager')?.value;
        if (sapTeam) data = data.filter(e => e.sapTeam === sapTeam);
        if (sapManager) data = data.filter(e => e.sapManager === sapManager);

        // Apply sorting
        if (AppState.sortConfig.column) {
            data = Utils.sortData(data, AppState.sortConfig.column, AppState.sortConfig.direction);
        }

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        
        // Apply pagination
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const canEdit = Utils.hasPermission('edit');
        const canDelete = Utils.hasPermission('delete');

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th onclick="EmployeeDatabaseModule.sort('sapTeam')">SAP Team</th>
                            <th onclick="EmployeeDatabaseModule.sort('sapManager')">SAP Manager</th>
                            <th onclick="EmployeeDatabaseModule.sort('employeeId')">Employee ID</th>
                            <th onclick="EmployeeDatabaseModule.sort('employeeName')">Employee Name</th>
                            <th onclick="EmployeeDatabaseModule.sort('partnerName')">Partner</th>
                            <th onclick="EmployeeDatabaseModule.sort('partnerManager')">Partner Manager</th>
                            <th onclick="EmployeeDatabaseModule.sort('dateOfJoining')">Date of Joining</th>
                            <th>MCM</th>
                            <th onclick="EmployeeDatabaseModule.sort('location')">Location</th>
                            <th>Birthday</th>
                            <th>SAP Laptop</th>
                            <th>VDI</th>
                            ${canEdit || canDelete ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="13" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(emp => `
                            <tr>
                                <td>${emp.sapTeam}</td>
                                <td>${emp.sapManager}</td>
                                <td>${emp.employeeId}</td>
                                <td><strong>${emp.employeeName}</strong></td>
                                <td>${emp.partnerName}</td>
                                <td>${emp.partnerManager}</td>
                                <td>${Utils.formatDate(emp.dateOfJoining)}</td>
                                <td><span class="badge ${emp.mcm ? 'badge-success' : 'badge-neutral'}">${emp.mcm ? 'Yes' : 'No'}</span></td>
                                <td>${emp.location}</td>
                                <td>${Utils.formatDate(emp.birthday)}</td>
                                <td><span class="badge ${emp.sapLaptop ? 'badge-success' : 'badge-neutral'}">${emp.sapLaptop ? 'Yes' : 'No'}</span></td>
                                <td>${emp.vdi}</td>
                                ${canEdit || canDelete ? `
                                    <td class="table-actions">
                                        ${canEdit ? `<button class="fiori-button-icon" onclick='EmployeeDatabaseModule.showEditModal(${JSON.stringify(emp).replace(/'/g, "&#39;")})' title="Edit">✎</button>` : ''}
                                        ${canDelete ? `<button class="fiori-button-icon error" onclick="EmployeeDatabaseModule.deleteEmployee('${emp.id}')" title="Delete">✕</button>` : ''}
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
                    onclick="EmployeeDatabaseModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="EmployeeDatabaseModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    sort: (column) => {
        if (AppState.sortConfig.column === column) {
            AppState.sortConfig.direction = AppState.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            AppState.sortConfig.column = column;
            AppState.sortConfig.direction = 'asc';
        }
        EmployeeDatabaseModule.renderTable();
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        EmployeeDatabaseModule.renderTable();
    },

    showAddModal: () => {
        const formHTML = `
            <form class="modal-form" onsubmit="EmployeeDatabaseModule.saveEmployee(event)">
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>SAP Team *</label>
                        <select name="sapTeam" class="fiori-select" required>
                            <option value="">Select Team</option>
                            ${DummyData.sapTeams.map(t => `<option value="${t}">${t}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>SAP Manager *</label>
                        <select name="sapManager" class="fiori-select" required>
                            <option value="">Select Manager</option>
                            ${DummyData.sapManagers.map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Employee ID *</label>
                        <input type="text" name="employeeId" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>Employee Name *</label>
                        <input type="text" name="employeeName" class="fiori-input" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Partner *</label>
                        <select name="partnerName" class="fiori-select" required>
                            <option value="">Select Partner</option>
                            ${DummyData.partners.map(p => `<option value="${p}">${p}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Partner Manager *</label>
                        <input type="text" name="partnerManager" class="fiori-input" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Date of Joining *</label>
                        <input type="date" name="dateOfJoining" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>Location *</label>
                        <select name="location" class="fiori-select" required>
                            <option value="">Select Location</option>
                            ${DummyData.locations.map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Birthday</label>
                        <input type="date" name="birthday" class="fiori-input">
                    </div>
                    <div class="form-group">
                        <label>VDI</label>
                        <input type="text" name="vdi" class="fiori-input">
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="mcm"> MCM
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="sapLaptop"> SAP Laptop
                        </label>
                    </div>
                </div>
                <div class="modal-form-row single-column">
                    <div class="form-group">
                        <label>Comments</label>
                        <textarea name="comments" class="fiori-input" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add Employee', formHTML, 'large');
    },

    showEditModal: (employee) => {
        const formHTML = `
            <form class="modal-form" onsubmit="EmployeeDatabaseModule.updateEmployee(event, '${employee.id}')">
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>SAP Team *</label>
                        <select name="sapTeam" class="fiori-select" required>
                            ${DummyData.sapTeams.map(t => `<option value="${t}" ${employee.sapTeam === t ? 'selected' : ''}>${t}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>SAP Manager *</label>
                        <select name="sapManager" class="fiori-select" required>
                            ${DummyData.sapManagers.map(m => `<option value="${m}" ${employee.sapManager === m ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Employee ID *</label>
                        <input type="text" name="employeeId" class="fiori-input" value="${employee.employeeId}" required>
                    </div>
                    <div class="form-group">
                        <label>Employee Name *</label>
                        <input type="text" name="employeeName" class="fiori-input" value="${employee.employeeName}" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Partner *</label>
                        <select name="partnerName" class="fiori-select" required>
                            ${DummyData.partners.map(p => `<option value="${p}" ${employee.partnerName === p ? 'selected' : ''}>${p}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Partner Manager *</label>
                        <input type="text" name="partnerManager" class="fiori-input" value="${employee.partnerManager}" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Date of Joining *</label>
                        <input type="date" name="dateOfJoining" class="fiori-input" value="${employee.dateOfJoining}" required>
                    </div>
                    <div class="form-group">
                        <label>Location *</label>
                        <select name="location" class="fiori-select" required>
                            ${DummyData.locations.map(l => `<option value="${l}" ${employee.location === l ? 'selected' : ''}>${l}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Birthday</label>
                        <input type="date" name="birthday" class="fiori-input" value="${employee.birthday || ''}">
                    </div>
                    <div class="form-group">
                        <label>VDI</label>
                        <input type="text" name="vdi" class="fiori-input" value="${employee.vdi || ''}">
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="mcm" ${employee.mcm ? 'checked' : ''}> MCM
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="sapLaptop" ${employee.sapLaptop ? 'checked' : ''}> SAP Laptop
                        </label>
                    </div>
                </div>
                <div class="modal-form-row single-column">
                    <div class="form-group">
                        <label>Comments</label>
                        <textarea name="comments" class="fiori-input" rows="3">${employee.comments || ''}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit Employee', formHTML, 'large');
    },

    saveEmployee: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employee = {
            id: Utils.generateId('EMP'),
            sapTeam: formData.get('sapTeam'),
            sapManager: formData.get('sapManager'),
            employeeId: formData.get('employeeId'),
            employeeName: formData.get('employeeName'),
            partnerName: formData.get('partnerName'),
            partnerManager: formData.get('partnerManager'),
            dateOfJoining: formData.get('dateOfJoining'),
            mcm: formData.get('mcm') === 'on',
            location: formData.get('location'),
            birthday: formData.get('birthday'),
            sapLaptop: formData.get('sapLaptop') === 'on',
            vdi: formData.get('vdi'),
            comments: formData.get('comments')
        };

        AppState.data.employees.push(employee);
        Toast.show('Employee added successfully', 'success');
        Modal.close();
        EmployeeDatabaseModule.renderTable();
    },

    updateEmployee: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.employees.findIndex(e => e.id === id);
        
        if (index !== -1) {
            AppState.data.employees[index] = {
                ...AppState.data.employees[index],
                sapTeam: formData.get('sapTeam'),
                sapManager: formData.get('sapManager'),
                employeeId: formData.get('employeeId'),
                employeeName: formData.get('employeeName'),
                partnerName: formData.get('partnerName'),
                partnerManager: formData.get('partnerManager'),
                dateOfJoining: formData.get('dateOfJoining'),
                mcm: formData.get('mcm') === 'on',
                location: formData.get('location'),
                birthday: formData.get('birthday'),
                sapLaptop: formData.get('sapLaptop') === 'on',
                vdi: formData.get('vdi'),
                comments: formData.get('comments')
            };

            Toast.show('Employee updated successfully', 'success');
            Modal.close();
            EmployeeDatabaseModule.renderTable();
        }
    },

    deleteEmployee: (id) => {
        Modal.confirm(
            'Delete Employee',
            'Are you sure you want to delete this employee? This action cannot be undone.',
            () => {
                const index = AppState.data.employees.findIndex(e => e.id === id);
                if (index !== -1) {
                    AppState.data.employees.splice(index, 1);
                    Toast.show('Employee deleted successfully', 'success');
                    EmployeeDatabaseModule.renderTable();
                }
            }
        );
    },

    export: () => {
        const data = EmployeeDatabaseModule.getData();
        Utils.exportToCSV(data, 'employee_database');
    }
};