/**
 * Additional Modules - Part 3
 * Interviews, Onboarding KT, Leaves, Partner Managers, Partner Alumni
 */

/**
 * Interviews Module
 */
const InterviewsModule = {
    render: (container) => {
        const canAdd = Utils.hasPermission('add');
        const canEdit = Utils.hasPermission('edit');
        const canDelete = Utils.hasPermission('delete');

        container.innerHTML = `
            <div class="module-header">
                <h2>Interviews</h2>
                <div class="module-actions">
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="InterviewsModule.showAddModal()">Add Interview</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="InterviewsModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterResult" class="fiori-select" onchange="InterviewsModule.applyFilters()">
                        <option value="">All Results</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hold">Hold</option>
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="InterviewsModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        InterviewsModule.renderTable();
    },

    getData: () => {
        return AppState.data.interviews;
    },

    applyFilters: () => {
        InterviewsModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterResult').value = '';
        InterviewsModule.renderTable();
    },

    renderTable: () => {
        let data = InterviewsModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['candidateName', 'position', 'sapPanel']);
        }

        const result = document.getElementById('filterResult')?.value;
        if (result) data = data.filter(i => i.result === result);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const canEdit = Utils.hasPermission('edit');
        const canDelete = Utils.hasPermission('delete');

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Position</th>
                            <th>Interview Date</th>
                            <th>SAP Panel</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Feedback</th>
                            ${canEdit || canDelete ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="8" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(interview => {
                            const resultClass = interview.result === 'Selected' ? 'badge-success' : 
                                              interview.result === 'Rejected' ? 'badge-error' : 'badge-warning';
                            return `
                            <tr>
                                <td><strong>${interview.candidateName}</strong></td>
                                <td>${interview.position}</td>
                                <td>${Utils.formatDate(interview.interviewDate)}</td>
                                <td>${interview.sapPanel}</td>
                                <td><span class="badge badge-info">${interview.status}</span></td>
                                <td><span class="badge ${resultClass}">${interview.result}</span></td>
                                <td>${interview.feedback}</td>
                                ${canEdit || canDelete ? `
                                    <td class="table-actions">
                                        ${canEdit ? `<button class="fiori-button-icon" onclick='InterviewsModule.showEditModal(${JSON.stringify(interview).replace(/'/g, "&#39;")})' title="Edit">✎</button>` : ''}
                                        ${canDelete ? `<button class="fiori-button-icon error" onclick="InterviewsModule.deleteInterview('${interview.id}')" title="Delete">✕</button>` : ''}
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
                    onclick="InterviewsModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="InterviewsModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        InterviewsModule.renderTable();
    },

    showAddModal: () => {
        const formHTML = `
            <form class="modal-form" onsubmit="InterviewsModule.saveInterview(event)">
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Candidate Name *</label>
                        <input type="text" name="candidateName" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>Position *</label>
                        <input type="text" name="position" class="fiori-input" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Interview Date *</label>
                        <input type="date" name="interviewDate" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>SAP Panel *</label>
                        <select name="sapPanel" class="fiori-select" required>
                            <option value="">Select Panel</option>
                            ${DummyData.sapManagers.map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Result *</label>
                        <select name="result" class="fiori-select" required>
                            <option value="Hold">Hold</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Feedback</label>
                    <textarea name="feedback" class="fiori-input" rows="3"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add Interview', formHTML, 'medium');
    },

    showEditModal: (interview) => {
        const formHTML = `
            <form class="modal-form" onsubmit="InterviewsModule.updateInterview(event, '${interview.id}')">
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Candidate Name *</label>
                        <input type="text" name="candidateName" class="fiori-input" value="${interview.candidateName}" required>
                    </div>
                    <div class="form-group">
                        <label>Position *</label>
                        <input type="text" name="position" class="fiori-input" value="${interview.position}" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Interview Date *</label>
                        <input type="date" name="interviewDate" class="fiori-input" value="${interview.interviewDate}" required>
                    </div>
                    <div class="form-group">
                        <label>SAP Panel *</label>
                        <select name="sapPanel" class="fiori-select" required>
                            ${DummyData.sapManagers.map(m => `<option value="${m}" ${interview.sapPanel === m ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="Scheduled" ${interview.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
                            <option value="Completed" ${interview.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Cancelled" ${interview.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Result *</label>
                        <select name="result" class="fiori-select" required>
                            <option value="Hold" ${interview.result === 'Hold' ? 'selected' : ''}>Hold</option>
                            <option value="Selected" ${interview.result === 'Selected' ? 'selected' : ''}>Selected</option>
                            <option value="Rejected" ${interview.result === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Feedback</label>
                    <textarea name="feedback" class="fiori-input" rows="3">${interview.feedback}</textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit Interview', formHTML, 'medium');
    },

    saveInterview: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const interview = {
            id: Utils.generateId('INT'),
            candidateName: formData.get('candidateName'),
            position: formData.get('position'),
            interviewDate: formData.get('interviewDate'),
            sapPanel: formData.get('sapPanel'),
            status: formData.get('status'),
            result: formData.get('result'),
            feedback: formData.get('feedback') || '-'
        };

        AppState.data.interviews.push(interview);
        Toast.show('Interview added successfully', 'success');
        Modal.close();
        InterviewsModule.renderTable();
    },

    updateInterview: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.interviews.findIndex(i => i.id === id);

        if (index !== -1) {
            AppState.data.interviews[index] = {
                ...AppState.data.interviews[index],
                candidateName: formData.get('candidateName'),
                position: formData.get('position'),
                interviewDate: formData.get('interviewDate'),
                sapPanel: formData.get('sapPanel'),
                status: formData.get('status'),
                result: formData.get('result'),
                feedback: formData.get('feedback') || '-'
            };

            Toast.show('Interview updated successfully', 'success');
            Modal.close();
            InterviewsModule.renderTable();
        }
    },

    deleteInterview: (id) => {
        Modal.confirm(
            'Delete Interview',
            'Are you sure you want to delete this interview record?',
            () => {
                const index = AppState.data.interviews.findIndex(i => i.id === id);
                if (index !== -1) {
                    AppState.data.interviews.splice(index, 1);
                    Toast.show('Interview deleted successfully', 'success');
                    InterviewsModule.renderTable();
                }
            }
        );
    }
};

/**
 * Onboarding KT Module
 */
const OnboardingKTModule = {
    render: (container) => {
        const canAdd = Utils.hasPermission('add');
        const canEdit = Utils.hasPermission('edit');

        container.innerHTML = `
            <div class="module-header">
                <h2>Basic Onboarding KT</h2>
                <div class="module-actions">
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="OnboardingKTModule.showAddModal()">Add Topic</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="OnboardingKTModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterStatus" class="fiori-select" onchange="OnboardingKTModule.applyFilters()">
                        <option value="">All Status</option>
                        <option value="New">New</option>
                        <option value="In-process">In-process</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="OnboardingKTModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        OnboardingKTModule.renderTable();
    },

    getData: () => {
        return AppState.data.onboardingKT;
    },

    applyFilters: () => {
        OnboardingKTModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterStatus').value = '';
        OnboardingKTModule.renderTable();
    },

    renderTable: () => {
        let data = OnboardingKTModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'topic', 'mentorName']);
        }

        const status = document.getElementById('filterStatus')?.value;
        if (status) data = data.filter(k => k.status === status);

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
                            <th>Employee Name</th>
                            <th>Topic</th>
                            <th>Mentor Name</th>
                            <th>KT Link</th>
                            <th>Status</th>
                            <th>Completion Date</th>
                            ${canEdit ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="9" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(kt => {
                            const statusClass = kt.status === 'Completed' ? 'badge-success' : 
                                              kt.status === 'In-process' ? 'badge-info' :
                                              kt.status === 'Blocked' ? 'badge-error' : 'badge-neutral';
                            return `
                            <tr>
                                <td>${kt.sapTeam}</td>
                                <td>${kt.sapManager}</td>
                                <td><strong>${kt.employeeName}</strong></td>
                                <td>${kt.topic}</td>
                                <td>${kt.mentorName}</td>
                                <td>${kt.ktLink ? `<a href="${kt.ktLink}" target="_blank" class="link">View</a>` : '-'}</td>
                                <td><span class="badge ${statusClass}">${kt.status}</span></td>
                                <td>${kt.completionDate ? Utils.formatDate(kt.completionDate) : '-'}</td>
                                ${canEdit ? `
                                    <td class="table-actions">
                                        <button class="fiori-button-icon" onclick='OnboardingKTModule.showEditModal(${JSON.stringify(kt).replace(/'/g, "&#39;")})' title="Edit">✎</button>
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
                    onclick="OnboardingKTModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="OnboardingKTModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        OnboardingKTModule.renderTable();
    },

    showAddModal: () => {
        const employees = AppState.data.employees;
        const formHTML = `
            <form class="modal-form" onsubmit="OnboardingKTModule.saveKT(event)">
                <div class="form-group">
                    <label>Select Employee *</label>
                    <select name="employeeId" class="fiori-select" required>
                        <option value="">Select Employee</option>
                        ${employees.map(e => `<option value="${e.employeeId}">${e.employeeName} (${e.employeeId})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Topic *</label>
                    <input type="text" name="topic" class="fiori-input" required>
                </div>
                <div class="form-group">
                    <label>Mentor Name *</label>
                    <input type="text" name="mentorName" class="fiori-input" required>
                </div>
                <div class="form-group">
                    <label>KT Link</label>
                    <input type="url" name="ktLink" class="fiori-input" placeholder="https://...">
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="New">New</option>
                            <option value="In-process">In-process</option>
                            <option value="Completed">Completed</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Completion Date</label>
                        <input type="date" name="completionDate" class="fiori-input">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add KT Topic', formHTML, 'medium');
    },

    showEditModal: (kt) => {
        const formHTML = `
            <form class="modal-form" onsubmit="OnboardingKTModule.updateKT(event, '${kt.id}')">
                <div class="form-group">
                    <label>Employee</label>
                    <input type="text" class="fiori-input" value="${kt.employeeName} (${kt.employeeId})" disabled>
                </div>
                <div class="form-group">
                    <label>Topic *</label>
                    <input type="text" name="topic" class="fiori-input" value="${kt.topic}" required>
                </div>
                <div class="form-group">
                    <label>Mentor Name *</label>
                    <input type="text" name="mentorName" class="fiori-input" value="${kt.mentorName}" required>
                </div>
                <div class="form-group">
                    <label>KT Link</label>
                    <input type="url" name="ktLink" class="fiori-input" value="${kt.ktLink || ''}">
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="New" ${kt.status === 'New' ? 'selected' : ''}>New</option>
                            <option value="In-process" ${kt.status === 'In-process' ? 'selected' : ''}>In-process</option>
                            <option value="Completed" ${kt.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Blocked" ${kt.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Completion Date</label>
                        <input type="date" name="completionDate" class="fiori-input" value="${kt.completionDate || ''}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit KT Topic', formHTML, 'medium');
    },

    saveKT: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employeeId = formData.get('employeeId');
        const employee = AppState.data.employees.find(e => e.employeeId === employeeId);

        if (!employee) {
            Toast.show('Employee not found', 'error');
            return;
        }

        const kt = {
            id: Utils.generateId('KT'),
            sapTeam: employee.sapTeam,
            sapManager: employee.sapManager,
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            topic: formData.get('topic'),
            mentorName: formData.get('mentorName'),
            ktLink: formData.get('ktLink'),
            status: formData.get('status'),
            completionDate: formData.get('completionDate')
        };

        AppState.data.onboardingKT.push(kt);
        Toast.show('KT topic added successfully', 'success');
        Modal.close();
        OnboardingKTModule.renderTable();
    },

    updateKT: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.onboardingKT.findIndex(k => k.id === id);

        if (index !== -1) {
            AppState.data.onboardingKT[index] = {
                ...AppState.data.onboardingKT[index],
                topic: formData.get('topic'),
                mentorName: formData.get('mentorName'),
                ktLink: formData.get('ktLink'),
                status: formData.get('status'),
                completionDate: formData.get('completionDate')
            };

            Toast.show('KT topic updated successfully', 'success');
            Modal.close();
            OnboardingKTModule.renderTable();
        }
    }
};

/**
 * Leaves Module
 */
const LeavesModule = {
    render: (container) => {
        const canAdd = Utils.hasPermission('add');
        const canEdit = Utils.hasPermission('edit');

        container.innerHTML = `
            <div class="module-header">
                <h2>Leaves</h2>
                <div class="module-actions">
                    ${canAdd ? '<button class="fiori-button fiori-button-primary" onclick="LeavesModule.showAddModal()">Add Leave Request</button>' : ''}
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="LeavesModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterStatus" class="fiori-select" onchange="LeavesModule.applyFilters()">
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="LeavesModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        LeavesModule.renderTable();
    },

    getData: () => {
        return AppState.data.leaves;
    },

    applyFilters: () => {
        LeavesModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterStatus').value = '';
        LeavesModule.renderTable();
    },

    renderTable: () => {
        let data = LeavesModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'employeeId', 'leaveType']);
        }

        const status = document.getElementById('filterStatus')?.value;
        if (status) data = data.filter(l => l.status === status);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const canEdit = Utils.hasPermission('edit');

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Days</th>
                            <th>Status</th>
                            <th>Approver</th>
                            ${canEdit ? '<th>Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="9" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(leave => {
                            const days = Utils.dateDiffInDays(leave.startDate, leave.endDate) + 1;
                            const statusClass = leave.status === 'Approved' ? 'badge-success' : 
                                              leave.status === 'Rejected' ? 'badge-error' : 'badge-warning';
                            return `
                            <tr>
                                <td>${leave.employeeId}</td>
                                <td><strong>${leave.employeeName}</strong></td>
                                <td>${leave.leaveType}</td>
                                <td>${Utils.formatDate(leave.startDate)}</td>
                                <td>${Utils.formatDate(leave.endDate)}</td>
                                <td>${days} day${days > 1 ? 's' : ''}</td>
                                <td><span class="badge ${statusClass}">${leave.status}</span></td>
                                <td>${leave.approver}</td>
                                ${canEdit ? `
                                    <td class="table-actions">
                                        <button class="fiori-button-icon" onclick='LeavesModule.showEditModal(${JSON.stringify(leave).replace(/'/g, "&#39;")})' title="Edit">✎</button>
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
                    onclick="LeavesModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="LeavesModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        LeavesModule.renderTable();
    },

    showAddModal: () => {
        const employees = AppState.data.employees;
        const formHTML = `
            <form class="modal-form" onsubmit="LeavesModule.saveLeave(event)">
                <div class="form-group">
                    <label>Select Employee *</label>
                    <select name="employeeId" class="fiori-select" required>
                        <option value="">Select Employee</option>
                        ${employees.map(e => `<option value="${e.employeeId}">${e.employeeName} (${e.employeeId})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Leave Type *</label>
                    <select name="leaveType" class="fiori-select" required>
                        <option value="">Select Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Earned Leave">Earned Leave</option>
                        <option value="Maternity Leave">Maternity Leave</option>
                        <option value="Paternity Leave">Paternity Leave</option>
                        <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" name="startDate" class="fiori-input" required>
                    </div>
                    <div class="form-group">
                        <label>End Date *</label>
                        <input type="date" name="endDate" class="fiori-input" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Approver *</label>
                        <select name="approver" class="fiori-select" required>
                            <option value="">Select Approver</option>
                            ${DummyData.sapManagers.map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Save</button>
                </div>
            </form>
        `;
        Modal.show('Add Leave Request', formHTML, 'medium');
    },

    showEditModal: (leave) => {
        const formHTML = `
            <form class="modal-form" onsubmit="LeavesModule.updateLeave(event, '${leave.id}')">
                <div class="form-group">
                    <label>Employee</label>
                    <input type="text" class="fiori-input" value="${leave.employeeName} (${leave.employeeId})" disabled>
                </div>
                <div class="form-group">
                    <label>Leave Type *</label>
                    <select name="leaveType" class="fiori-select" required>
                        <option value="Sick Leave" ${leave.leaveType === 'Sick Leave' ? 'selected' : ''}>Sick Leave</option>
                        <option value="Casual Leave" ${leave.leaveType === 'Casual Leave' ? 'selected' : ''}>Casual Leave</option>
                        <option value="Earned Leave" ${leave.leaveType === 'Earned Leave' ? 'selected' : ''}>Earned Leave</option>
                        <option value="Maternity Leave" ${leave.leaveType === 'Maternity Leave' ? 'selected' : ''}>Maternity Leave</option>
                        <option value="Paternity Leave" ${leave.leaveType === 'Paternity Leave' ? 'selected' : ''}>Paternity Leave</option>
                        <option value="Unpaid Leave" ${leave.leaveType === 'Unpaid Leave' ? 'selected' : ''}>Unpaid Leave</option>
                    </select>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" name="startDate" class="fiori-input" value="${leave.startDate}" required>
                    </div>
                    <div class="form-group">
                        <label>End Date *</label>
                        <input type="date" name="endDate" class="fiori-input" value="${leave.endDate}" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select name="status" class="fiori-select" required>
                            <option value="Pending" ${leave.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Approved" ${leave.status === 'Approved' ? 'selected' : ''}>Approved</option>
                            <option value="Rejected" ${leave.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Approver *</label>
                        <select name="approver" class="fiori-select" required>
                            ${DummyData.sapManagers.map(m => `<option value="${m}" ${leave.approver === m ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="fiori-button fiori-button-secondary" onclick="Modal.close()">Cancel</button>
                    <button type="submit" class="fiori-button fiori-button-primary">Update</button>
                </div>
            </form>
        `;
        Modal.show('Edit Leave Request', formHTML, 'medium');
    },

    saveLeave: (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employeeId = formData.get('employeeId');
        const employee = AppState.data.employees.find(e => e.employeeId === employeeId);

        if (!employee) {
            Toast.show('Employee not found', 'error');
            return;
        }

        const startDate = new Date(formData.get('startDate'));
        const endDate = new Date(formData.get('endDate'));

        if (endDate < startDate) {
            Toast.show('End date must be after start date', 'error');
            return;
        }

        const leave = {
            id: Utils.generateId('LEAVE'),
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            leaveType: formData.get('leaveType'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            status: formData.get('status'),
            approver: formData.get('approver')
        };

        AppState.data.leaves.push(leave);
        Toast.show('Leave request added successfully', 'success');
        Modal.close();
        LeavesModule.renderTable();
    },

    updateLeave: (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const index = AppState.data.leaves.findIndex(l => l.id === id);

        const startDate = new Date(formData.get('startDate'));
        const endDate = new Date(formData.get('endDate'));

        if (endDate < startDate) {
            Toast.show('End date must be after start date', 'error');
            return;
        }

        if (index !== -1) {
            AppState.data.leaves[index] = {
                ...AppState.data.leaves[index],
                leaveType: formData.get('leaveType'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                status: formData.get('status'),
                approver: formData.get('approver')
            };

            Toast.show('Leave request updated successfully', 'success');
            Modal.close();
            LeavesModule.renderTable();
        }
    }
};

/**
 * Partner Managers Module
 */
const PartnerManagersModule = {
    render: (container) => {
        container.innerHTML = `
            <div class="module-header">
                <h2>Partner Manager Directory</h2>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="PartnerManagersModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterPartner" class="fiori-select" onchange="PartnerManagersModule.applyFilters()">
                        <option value="">All Partners</option>
                        ${DummyData.partners.map(p => `<option value="${p}">${p}</option>`).join('')}
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="PartnerManagersModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        PartnerManagersModule.renderTable();
    },

    getData: () => {
        return AppState.data.partnerManagers;
    },

    applyFilters: () => {
        PartnerManagersModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterPartner').value = '';
        PartnerManagersModule.renderTable();
    },

    renderTable: () => {
        let data = PartnerManagersModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['managerName', 'partner', 'email', 'location']);
        }

        const partner = document.getElementById('filterPartner')?.value;
        if (partner) data = data.filter(m => m.partner === partner);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>Partner</th>
                            <th>Manager Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Team Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(mgr => `
                            <tr>
                                <td><strong>${mgr.partner}</strong></td>
                                <td>${mgr.managerName}</td>
                                <td><a href="mailto:${mgr.email}" class="link">${mgr.email}</a></td>
                                <td>${mgr.phone}</td>
                                <td>${mgr.location}</td>
                                <td>${mgr.teamSize}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === 1 ? 'disabled' : ''} 
                    onclick="PartnerManagersModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="PartnerManagersModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        PartnerManagersModule.renderTable();
    }
};

/**
 * Partner Alumni Module
 */
const PartnerAlumniModule = {
    render: (container) => {
        container.innerHTML = `
            <div class="module-header">
                <h2>Partner Alumni</h2>
            </div>
            
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" id="searchInput" class="fiori-input" placeholder="Search..." onkeyup="PartnerAlumniModule.applyFilters()">
                </div>
                <div class="filter-group">
                    <select id="filterPartner" class="fiori-select" onchange="PartnerAlumniModule.applyFilters()">
                        <option value="">All Partners</option>
                        ${DummyData.partners.map(p => `<option value="${p}">${p}</option>`).join('')}
                    </select>
                </div>
                <button class="fiori-button fiori-button-secondary" onclick="PartnerAlumniModule.clearFilters()">Clear Filters</button>
            </div>

            <div id="tableContainer"></div>
        `;

        PartnerAlumniModule.renderTable();
    },

    getData: () => {
        return AppState.data.partnerAlumni;
    },

    applyFilters: () => {
        PartnerAlumniModule.renderTable();
    },

    clearFilters: () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterPartner').value = '';
        PartnerAlumniModule.renderTable();
    },

    renderTable: () => {
        let data = PartnerAlumniModule.getData();

        const searchTerm = document.getElementById('searchInput')?.value;
        if (searchTerm) {
            data = Utils.filterBySearch(data, searchTerm, ['employeeName', 'employeeId', 'partnerName', 'currentCompany']);
        }

        const partner = document.getElementById('filterPartner')?.value;
        if (partner) data = data.filter(a => a.partnerName === partner);

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / AppState.pagination.pageSize);
        data = Utils.paginateData(data, AppState.pagination.currentPage, AppState.pagination.pageSize);

        const tableHTML = `
            <div class="table-container">
                <table class="fiori-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Partner</th>
                            <th>SAP Team</th>
                            <th>Date of Joining</th>
                            <th>Date of Exit</th>
                            <th>Current Company</th>
                            <th>LinkedIn</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length === 0 ? '<tr><td colspan="8" style="text-align:center;">No data found</td></tr>' : ''}
                        ${data.map(alumni => `
                            <tr>
                                <td><strong>${alumni.employeeName}</strong></td>
                                <td>${alumni.employeeId}</td>
                                <td>${alumni.partnerName}</td>
                                <td>${alumni.sapTeam}</td>
                                <td>${Utils.formatDate(alumni.dateOfJoining)}</td>
                                <td>${Utils.formatDate(alumni.dateOfExit)}</td>
                                <td>${alumni.currentCompany}</td>
                                <td>${alumni.linkedIn ? `<a href="${alumni.linkedIn}" target="_blank" class="link">View Profile</a>` : '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === 1 ? 'disabled' : ''} 
                    onclick="PartnerAlumniModule.changePage(${AppState.pagination.currentPage - 1})">Previous</button>
                <span class="pagination-info">Page ${AppState.pagination.currentPage} of ${totalPages} (${totalItems} items)</span>
                <button class="fiori-button fiori-button-secondary" 
                    ${AppState.pagination.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="PartnerAlumniModule.changePage(${AppState.pagination.currentPage + 1})">Next</button>
            </div>
        `;

        document.getElementById('tableContainer').innerHTML = tableHTML;
    },

    changePage: (page) => {
        AppState.pagination.currentPage = page;
        PartnerAlumniModule.renderTable();
    }
};