/**
 * Dummy Data for SAP Partner Sphere
 * Comprehensive dataset for all modules
 */

const DummyData = {
    // User credentials for authentication
    users: [
        { username: 'admin', password: 'admin123', role: 'Admin', name: 'System Administrator' },
        { username: 'manager1', password: 'manager123', role: 'SAP Manager', name: 'John Smith' },
        { username: 'manager2', password: 'manager123', role: 'SAP Manager', name: 'Sarah Johnson' },
        { username: 'lead1', password: 'lead123', role: 'SAP Lead', name: 'Michael Brown' },
        { username: 'employee1', password: 'emp123', role: 'Partner Employee', name: 'Emma Wilson' },
        { username: 'employee2', password: 'emp123', role: 'Partner Employee', name: 'David Lee' },
        { username: 'viewer', password: 'viewer123', role: 'Viewer', name: 'Guest User' }
    ],

    // SAP Teams
    sapTeams: ['SAP Ariba', 'SAP SuccessFactors', 'SAP S/4HANA', 'SAP BTP', 'SAP Analytics Cloud', 'SAP Concur'],

    // SAP Managers
    sapManagers: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Jennifer Davis', 'Robert Wilson'],

    // Partners
    partners: ['Accenture', 'Deloitte', 'IBM', 'Infosys', 'TCS', 'Wipro', 'Capgemini', 'Cognizant'],

    // Locations
    locations: ['Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Gurgaon'],

    // Skills
    functionalSkills: [
        'Procurement', 'Sourcing', 'Contract Management', 'Supplier Management', 
        'HR Management', 'Payroll', 'Talent Management', 'Learning Management',
        'Finance & Controlling', 'Sales & Distribution', 'Material Management',
        'Business Process Management', 'Integration', 'Analytics', 'Reporting'
    ],

    technicalSkills: [
        'SAP ABAP', 'SAP Fiori', 'SAP UI5', 'SAP BTP', 'SAP HANA', 'SAP CPI',
        'JavaScript', 'Java', 'Python', 'REST APIs', 'OData', 'SQL',
        'Node.js', 'React', 'Angular', 'Cloud Foundry', 'Kubernetes', 'Docker'
    ],

    otherSkills: [
        'Agile Methodology', 'Scrum', 'Project Management', 'Team Leadership',
        'Client Communication', 'Problem Solving', 'Documentation', 'Testing'
    ],

    // Employee Database
    employees: [
        {
            id: 'EMP001',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            partnerName: 'Infosys',
            partnerManager: 'Amit Kumar',
            dateOfJoining: '2023-01-15',
            mcm: true,
            location: 'Bangalore',
            birthday: '1995-05-20',
            sapLaptop: true,
            vdi: 'VDI-ARB-001',
            comments: 'Senior developer with strong procurement knowledge'
        },
        {
            id: 'EMP002',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100235',
            employeeName: 'Priya Patel',
            partnerName: 'TCS',
            partnerManager: 'Rajesh Singh',
            dateOfJoining: '2023-03-22',
            mcm: false,
            location: 'Pune',
            birthday: '1993-08-15',
            sapLaptop: true,
            vdi: 'VDI-SF-002',
            comments: 'HR module specialist'
        },
        {
            id: 'EMP003',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100236',
            employeeName: 'Arjun Reddy',
            partnerName: 'Wipro',
            partnerManager: 'Suresh Babu',
            dateOfJoining: '2022-11-10',
            mcm: true,
            location: 'Hyderabad',
            birthday: '1992-03-12',
            sapLaptop: true,
            vdi: 'VDI-S4-003',
            comments: 'ABAP and Fiori expert'
        },
        {
            id: 'EMP004',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            partnerName: 'Accenture',
            partnerManager: 'Vikram Malhotra',
            dateOfJoining: '2023-02-01',
            mcm: false,
            location: 'Mumbai',
            birthday: '1994-11-28',
            sapLaptop: false,
            vdi: 'VDI-BTP-004',
            comments: 'Cloud platform specialist'
        },
        {
            id: 'EMP005',
            sapTeam: 'SAP Analytics Cloud',
            sapManager: 'Robert Wilson',
            employeeId: 'E100238',
            employeeName: 'Karthik Iyer',
            partnerName: 'Deloitte',
            partnerManager: 'Ananya Nair',
            dateOfJoining: '2023-04-15',
            mcm: true,
            location: 'Bangalore',
            birthday: '1996-07-08',
            sapLaptop: true,
            vdi: 'VDI-SAC-005',
            comments: 'Data analytics and reporting expert'
        },
        {
            id: 'EMP006',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100239',
            employeeName: 'Meera Krishnan',
            partnerName: 'Cognizant',
            partnerManager: 'Lakshmi Menon',
            dateOfJoining: '2022-09-20',
            mcm: true,
            location: 'Chennai',
            birthday: '1991-12-05',
            sapLaptop: true,
            vdi: 'VDI-ARB-006',
            comments: 'Sourcing module lead'
        },
        {
            id: 'EMP007',
            sapTeam: 'SAP Concur',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100240',
            employeeName: 'Aditya Verma',
            partnerName: 'IBM',
            partnerManager: 'Deepak Joshi',
            dateOfJoining: '2023-05-10',
            mcm: false,
            location: 'Delhi',
            birthday: '1995-02-18',
            sapLaptop: false,
            vdi: 'VDI-CON-007',
            comments: 'Travel and expense management specialist'
        },
        {
            id: 'EMP008',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100241',
            employeeName: 'Divya Shah',
            partnerName: 'Capgemini',
            partnerManager: 'Naveen Agarwal',
            dateOfJoining: '2023-01-30',
            mcm: true,
            location: 'Gurgaon',
            birthday: '1993-06-22',
            sapLaptop: true,
            vdi: 'VDI-S4-008',
            comments: 'Finance and controlling consultant'
        },
        {
            id: 'EMP009',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100242',
            employeeName: 'Rohit Bose',
            partnerName: 'TCS',
            partnerManager: 'Rajesh Singh',
            dateOfJoining: '2022-12-05',
            mcm: false,
            location: 'Kolkata',
            birthday: '1994-09-14',
            sapLaptop: true,
            vdi: 'VDI-SF-009',
            comments: 'Payroll and time management expert'
        },
        {
            id: 'EMP010',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100243',
            employeeName: 'Ankit Jain',
            partnerName: 'Infosys',
            partnerManager: 'Amit Kumar',
            dateOfJoining: '2023-03-15',
            mcm: true,
            location: 'Bangalore',
            birthday: '1992-04-30',
            sapLaptop: true,
            vdi: 'VDI-BTP-010',
            comments: 'Integration specialist'
        }
    ],

    // Employee Skillsets
    employeeSkills: [
        {
            id: 'EMP001',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            functionalSkills: ['Procurement', 'Sourcing', 'Contract Management'],
            technicalSkills: ['SAP Ariba', 'SAP Fiori', 'REST APIs', 'JavaScript'],
            others: ['Agile Methodology', 'Client Communication', 'Documentation']
        },
        {
            id: 'EMP002',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100235',
            employeeName: 'Priya Patel',
            functionalSkills: ['HR Management', 'Talent Management', 'Learning Management'],
            technicalSkills: ['SAP SuccessFactors', 'SAP UI5', 'OData'],
            others: ['Scrum', 'Problem Solving', 'Team Leadership']
        },
        {
            id: 'EMP003',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100236',
            employeeName: 'Arjun Reddy',
            functionalSkills: ['Finance & Controlling', 'Sales & Distribution'],
            technicalSkills: ['SAP ABAP', 'SAP Fiori', 'SAP HANA', 'SQL'],
            others: ['Agile Methodology', 'Documentation', 'Testing']
        },
        {
            id: 'EMP004',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            functionalSkills: ['Integration', 'Business Process Management'],
            technicalSkills: ['SAP BTP', 'SAP CPI', 'Node.js', 'Cloud Foundry', 'Docker'],
            others: ['Project Management', 'Client Communication']
        },
        {
            id: 'EMP005',
            sapTeam: 'SAP Analytics Cloud',
            sapManager: 'Robert Wilson',
            employeeId: 'E100238',
            employeeName: 'Karthik Iyer',
            functionalSkills: ['Analytics', 'Reporting'],
            technicalSkills: ['SAP Analytics Cloud', 'Python', 'SQL', 'REST APIs'],
            others: ['Problem Solving', 'Documentation', 'Team Leadership']
        },
        {
            id: 'EMP006',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100239',
            employeeName: 'Meera Krishnan',
            functionalSkills: ['Sourcing', 'Supplier Management', 'Contract Management'],
            technicalSkills: ['SAP Ariba', 'SAP UI5', 'JavaScript'],
            others: ['Agile Methodology', 'Team Leadership', 'Client Communication']
        },
        {
            id: 'EMP007',
            sapTeam: 'SAP Concur',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100240',
            employeeName: 'Aditya Verma',
            functionalSkills: ['Finance & Controlling'],
            technicalSkills: ['SAP Concur', 'REST APIs', 'JavaScript'],
            others: ['Documentation', 'Testing']
        },
        {
            id: 'EMP008',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100241',
            employeeName: 'Divya Shah',
            functionalSkills: ['Finance & Controlling', 'Material Management'],
            technicalSkills: ['SAP ABAP', 'SAP Fiori', 'SAP HANA'],
            others: ['Agile Methodology', 'Problem Solving']
        },
        {
            id: 'EMP009',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100242',
            employeeName: 'Rohit Bose',
            functionalSkills: ['Payroll', 'HR Management'],
            technicalSkills: ['SAP SuccessFactors', 'SAP UI5'],
            others: ['Documentation', 'Client Communication']
        },
        {
            id: 'EMP010',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100243',
            employeeName: 'Ankit Jain',
            functionalSkills: ['Integration', 'Business Process Management'],
            technicalSkills: ['SAP BTP', 'SAP CPI', 'Java', 'Kubernetes', 'Docker'],
            others: ['Scrum', 'Project Management', 'Testing']
        }
    ],

    // Goals & KPIs
    goalsKPIs: [
        {
            id: 'EMP001',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            year: 2024,
            goalTitle: 'SAP Ariba Certification',
            goalDescription: 'Complete SAP Ariba Procurement certification and lead 2 implementation projects',
            target: '2 certifications, 2 projects',
            h1Achievements: 'Completed C_ARSUM_2404 certification, Led 1 implementation',
            h2Achievements: 'Completed C_ARCIG_2404 certification, Led 2nd project',
            trainingsCompleted: 'SAP Ariba Procurement, Advanced Sourcing, Contract Management',
            feedback: 'Excellent performance, consistently exceeds expectations',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP001',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            year: 2025,
            goalTitle: 'Team Leadership & Mentoring',
            goalDescription: 'Lead team of 5 developers and mentor 3 junior consultants',
            target: 'Lead 5 members, Mentor 3 juniors',
            h1Achievements: 'Currently leading 4 team members, mentoring 2 juniors',
            h2Achievements: 'Leading 5 team members, mentoring 3 juniors, team productivity +25%',
            trainingsCompleted: 'Leadership Skills, Team Management, Agile Coaching',
            feedback: 'Strong leadership skills demonstrated',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP002',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100235',
            employeeName: 'Priya Patel',
            year: 2024,
            goalTitle: 'SuccessFactors Implementation',
            goalDescription: 'Successfully implement SuccessFactors for 2 clients',
            target: '2 client implementations',
            h1Achievements: 'Completed 1 implementation successfully',
            h2Achievements: 'Completed 2nd implementation with 95% client satisfaction',
            trainingsCompleted: 'SF Employee Central, SF Recruiting, SF Learning',
            feedback: 'Excellent client management and technical skills',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP003',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100236',
            employeeName: 'Arjun Reddy',
            year: 2024,
            goalTitle: 'S/4HANA Migration Project',
            goalDescription: 'Lead S/4HANA migration project and develop custom Fiori apps',
            target: '1 migration, 5 Fiori apps',
            h1Achievements: 'Migration 60% complete, 3 Fiori apps delivered',
            h2Achievements: 'Migration completed on time, 5 Fiori apps deployed',
            trainingsCompleted: 'S/4HANA Migration, Fiori Development, ABAP for HANA',
            feedback: 'Outstanding technical leadership',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP004',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            year: 2024,
            goalTitle: 'BTP Integration Excellence',
            goalDescription: 'Build integration solutions using SAP BTP and CPI',
            target: '10 integrations',
            h1Achievements: '5 integrations completed',
            h2Achievements: '8 integrations completed, 2 in progress',
            trainingsCompleted: 'SAP BTP Fundamentals, CPI, Cloud Foundry',
            feedback: 'Good progress, need to accelerate delivery',
            kpiStatus: 'Yellow'
        },
        {
            id: 'EMP005',
            sapTeam: 'SAP Analytics Cloud',
            sapManager: 'Robert Wilson',
            employeeId: 'E100238',
            employeeName: 'Karthik Iyer',
            year: 2024,
            goalTitle: 'Analytics Dashboard Development',
            goalDescription: 'Create comprehensive analytics dashboards for business users',
            target: '15 dashboards',
            h1Achievements: '8 dashboards created',
            h2Achievements: '16 dashboards delivered with positive feedback',
            trainingsCompleted: 'SAC Planning, SAC Analytics Designer, Data Visualization',
            feedback: 'Exceeded targets, excellent user satisfaction',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP006',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100239',
            employeeName: 'Meera Krishnan',
            year: 2024,
            goalTitle: 'Ariba Sourcing Optimization',
            goalDescription: 'Optimize sourcing processes and reduce cycle time by 30%',
            target: '30% cycle time reduction',
            h1Achievements: '15% reduction achieved',
            h2Achievements: '32% reduction achieved through process improvements',
            trainingsCompleted: 'Advanced Sourcing, Process Optimization, Change Management',
            feedback: 'Excellent process improvement skills',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP007',
            sapTeam: 'SAP Concur',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100240',
            employeeName: 'Aditya Verma',
            year: 2024,
            goalTitle: 'Concur Implementation',
            goalDescription: 'Implement Concur Travel and Expense for new clients',
            target: '2 implementations',
            h1Achievements: '1 implementation in progress',
            h2Achievements: '1 completed, 1 delayed due to client issues',
            trainingsCompleted: 'Concur Travel, Concur Expense, Mobile App Configuration',
            feedback: 'Need better project timeline management',
            kpiStatus: 'Red'
        },
        {
            id: 'EMP008',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100241',
            employeeName: 'Divya Shah',
            year: 2024,
            goalTitle: 'Finance Module Expertise',
            goalDescription: 'Become FICO expert and handle complex requirements',
            target: 'FICO Certification, 3 complex projects',
            h1Achievements: 'Completed certification, working on 2 projects',
            h2Achievements: 'Certification done, successfully delivered 3 projects',
            trainingsCompleted: 'S/4HANA Finance, Advanced FICO, Asset Accounting',
            feedback: 'Strong functional knowledge demonstrated',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP009',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100242',
            employeeName: 'Rohit Bose',
            year: 2024,
            goalTitle: 'Payroll Compliance Excellence',
            goalDescription: 'Ensure payroll compliance across multiple countries',
            target: '5 country payrolls',
            h1Achievements: '3 country payrolls configured',
            h2Achievements: '5 country payrolls live with 100% compliance',
            trainingsCompleted: 'SF Payroll, Tax Configuration, Compliance Management',
            feedback: 'Excellent attention to compliance details',
            kpiStatus: 'Green'
        },
        {
            id: 'EMP010',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100243',
            employeeName: 'Ankit Jain',
            year: 2024,
            goalTitle: 'Cloud Integration Mastery',
            goalDescription: 'Master CPI and build complex integration scenarios',
            target: '20 integration flows',
            h1Achievements: '10 flows completed',
            h2Achievements: '18 flows completed, 2 pending approval',
            trainingsCompleted: 'CPI Advanced, API Management, Integration Patterns',
            feedback: 'Good technical skills, minor delays in delivery',
            kpiStatus: 'Yellow'
        }
    ],

    // Interviews
    interviews: [
        {
            id: 'INT001',
            candidateName: 'Sanjay Kumar',
            position: 'SAP Ariba Consultant',
            interviewDate: '2024-01-15',
            sapPanel: 'John Smith, Rahul Sharma',
            status: 'Completed',
            feedback: 'Strong procurement knowledge, good communication skills',
            result: 'Selected'
        },
        {
            id: 'INT002',
            candidateName: 'Anjali Mehta',
            position: 'SAP SuccessFactors Developer',
            interviewDate: '2024-01-18',
            sapPanel: 'Sarah Johnson, Priya Patel',
            status: 'Completed',
            feedback: 'Excellent technical skills, limited functional knowledge',
            result: 'Hold'
        },
        {
            id: 'INT003',
            candidateName: 'Vikram Singh',
            position: 'SAP S/4HANA ABAP Developer',
            interviewDate: '2024-01-22',
            sapPanel: 'Michael Brown, Arjun Reddy',
            status: 'Completed',
            feedback: 'Strong ABAP and Fiori skills, selected for team',
            result: 'Selected'
        },
        {
            id: 'INT004',
            candidateName: 'Neha Kapoor',
            position: 'SAP BTP Architect',
            interviewDate: '2024-01-25',
            sapPanel: 'Jennifer Davis, Sneha Gupta',
            status: 'Completed',
            feedback: 'Good BTP knowledge but lacks practical experience',
            result: 'Rejected'
        },
        {
            id: 'INT005',
            candidateName: 'Amit Desai',
            position: 'SAP Analytics Consultant',
            interviewDate: '2024-02-01',
            sapPanel: 'Robert Wilson, Karthik Iyer',
            status: 'Completed',
            feedback: 'Excellent analytics and visualization skills',
            result: 'Selected'
        },
        {
            id: 'INT006',
            candidateName: 'Pooja Reddy',
            position: 'SAP Ariba Analyst',
            interviewDate: '2024-02-05',
            sapPanel: 'John Smith, Meera Krishnan',
            status: 'Scheduled',
            feedback: '',
            result: 'Pending'
        },
        {
            id: 'INT007',
            candidateName: 'Ravi Tiwari',
            position: 'SAP Concur Consultant',
            interviewDate: '2024-02-08',
            sapPanel: 'Sarah Johnson, Aditya Verma',
            status: 'Scheduled',
            feedback: '',
            result: 'Pending'
        }
    ],

    // Basic Onboarding KT
    onboardingKT: [
        {
            id: 'EMP001',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            topic: 'SAP Ariba Overview',
            mentorName: 'John Smith',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-01-20'
        },
        {
            id: 'EMP001-2',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            topic: 'Sourcing Module Deep Dive',
            mentorName: 'Meera Krishnan',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-01-25'
        },
        {
            id: 'EMP002',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100235',
            employeeName: 'Priya Patel',
            topic: 'SuccessFactors Platform Introduction',
            mentorName: 'Sarah Johnson',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-03-27'
        },
        {
            id: 'EMP003',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100236',
            employeeName: 'Arjun Reddy',
            topic: 'S/4HANA Architecture',
            mentorName: 'Michael Brown',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2022-11-15'
        },
        {
            id: 'EMP004',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            topic: 'BTP Fundamentals',
            mentorName: 'Jennifer Davis',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'In-process',
            completionDate: ''
        },
        {
            id: 'EMP004-2',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            topic: 'Cloud Platform Integration',
            mentorName: 'Ankit Jain',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'New',
            completionDate: ''
        },
        {
            id: 'EMP005',
            sapTeam: 'SAP Analytics Cloud',
            sapManager: 'Robert Wilson',
            employeeId: 'E100238',
            employeeName: 'Karthik Iyer',
            topic: 'SAC Dashboard Basics',
            mentorName: 'Robert Wilson',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-04-20'
        },
        {
            id: 'EMP006',
            sapTeam: 'SAP Ariba',
            sapManager: 'John Smith',
            employeeId: 'E100239',
            employeeName: 'Meera Krishnan',
            topic: 'Ariba Network Setup',
            mentorName: 'John Smith',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2022-09-25'
        },
        {
            id: 'EMP007',
            sapTeam: 'SAP Concur',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100240',
            employeeName: 'Aditya Verma',
            topic: 'Concur Platform Overview',
            mentorName: 'Sarah Johnson',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'In-process',
            completionDate: ''
        },
        {
            id: 'EMP008',
            sapTeam: 'SAP S/4HANA',
            sapManager: 'Michael Brown',
            employeeId: 'E100241',
            employeeName: 'Divya Shah',
            topic: 'FICO Module Training',
            mentorName: 'Michael Brown',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-02-05'
        },
        {
            id: 'EMP009',
            sapTeam: 'SAP SuccessFactors',
            sapManager: 'Sarah Johnson',
            employeeId: 'E100242',
            employeeName: 'Rohit Bose',
            topic: 'Payroll Configuration',
            mentorName: 'Priya Patel',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Blocked',
            completionDate: ''
        },
        {
            id: 'EMP010',
            sapTeam: 'SAP BTP',
            sapManager: 'Jennifer Davis',
            employeeId: 'E100243',
            employeeName: 'Ankit Jain',
            topic: 'CPI Advanced Concepts',
            mentorName: 'Jennifer Davis',
            ktLink: 'https://teams.microsoft.com/l/meetup-join/...',
            status: 'Completed',
            completionDate: '2023-03-20'
        }
    ],

    // Leaves
    leaves: [
        {
            id: 'LV001',
            employeeId: 'E100234',
            employeeName: 'Rahul Sharma',
            leaveType: 'Annual Leave',
            startDate: '2024-02-15',
            endDate: '2024-02-19',
            status: 'Approved',
            approver: 'John Smith'
        },
        {
            id: 'LV002',
            employeeId: 'E100235',
            employeeName: 'Priya Patel',
            leaveType: 'Sick Leave',
            startDate: '2024-01-22',
            endDate: '2024-01-23',
            status: 'Approved',
            approver: 'Sarah Johnson'
        },
        {
            id: 'LV003',
            employeeId: 'E100236',
            employeeName: 'Arjun Reddy',
            leaveType: 'Annual Leave',
            startDate: '2024-03-10',
            endDate: '2024-03-15',
            status: 'Pending',
            approver: 'Michael Brown'
        },
        {
            id: 'LV004',
            employeeId: 'E100237',
            employeeName: 'Sneha Gupta',
            leaveType: 'Casual Leave',
            startDate: '2024-02-05',
            endDate: '2024-02-05',
            status: 'Approved',
            approver: 'Jennifer Davis'
        },
        {
            id: 'LV005',
            employeeId: 'E100238',
            employeeName: 'Karthik Iyer',
            leaveType: 'Annual Leave',
            startDate: '2024-04-20',
            endDate: '2024-04-25',
            status: 'Pending',
            approver: 'Robert Wilson'
        },
        {
            id: 'LV006',
            employeeId: 'E100239',
            employeeName: 'Meera Krishnan',
            leaveType: 'Maternity Leave',
            startDate: '2024-03-01',
            endDate: '2024-06-30',
            status: 'Approved',
            approver: 'John Smith'
        },
        {
            id: 'LV007',
            employeeId: 'E100240',
            employeeName: 'Aditya Verma',
            leaveType: 'Sick Leave',
            startDate: '2024-01-30',
            endDate: '2024-01-31',
            status: 'Rejected',
            approver: 'Sarah Johnson'
        },
        {
            id: 'LV008',
            employeeId: 'E100241',
            employeeName: 'Divya Shah',
            leaveType: 'Annual Leave',
            startDate: '2024-02-28',
            endDate: '2024-03-03',
            status: 'Approved',
            approver: 'Michael Brown'
        }
    ],

    // Partner Manager Directory
    partnerManagers: [
        {
            id: 'PM001',
            managerName: 'Amit Kumar',
            partner: 'Infosys',
            email: 'amit.kumar@infosys.com',
            phone: '+91-9876543210',
            location: 'Bangalore',
            employeesManaged: 15,
            specialization: 'SAP Ariba, SAP BTP'
        },
        {
            id: 'PM002',
            managerName: 'Rajesh Singh',
            partner: 'TCS',
            email: 'rajesh.singh@tcs.com',
            phone: '+91-9876543211',
            location: 'Pune',
            employeesManaged: 20,
            specialization: 'SAP SuccessFactors, SAP Concur'
        },
        {
            id: 'PM003',
            managerName: 'Suresh Babu',
            partner: 'Wipro',
            email: 'suresh.babu@wipro.com',
            phone: '+91-9876543212',
            location: 'Hyderabad',
            employeesManaged: 18,
            specialization: 'SAP S/4HANA'
        },
        {
            id: 'PM004',
            managerName: 'Vikram Malhotra',
            partner: 'Accenture',
            email: 'vikram.malhotra@accenture.com',
            phone: '+91-9876543213',
            location: 'Mumbai',
            employeesManaged: 25,
            specialization: 'SAP BTP, Cloud Solutions'
        },
        {
            id: 'PM005',
            managerName: 'Ananya Nair',
            partner: 'Deloitte',
            email: 'ananya.nair@deloitte.com',
            phone: '+91-9876543214',
            location: 'Bangalore',
            employeesManaged: 12,
            specialization: 'SAP Analytics Cloud'
        },
        {
            id: 'PM006',
            managerName: 'Lakshmi Menon',
            partner: 'Cognizant',
            email: 'lakshmi.menon@cognizant.com',
            phone: '+91-9876543215',
            location: 'Chennai',
            employeesManaged: 16,
            specialization: 'SAP Ariba'
        },
        {
            id: 'PM007',
            managerName: 'Deepak Joshi',
            partner: 'IBM',
            email: 'deepak.joshi@ibm.com',
            phone: '+91-9876543216',
            location: 'Delhi',
            employeesManaged: 14,
            specialization: 'SAP Concur, SAP Integration'
        },
        {
            id: 'PM008',
            managerName: 'Naveen Agarwal',
            partner: 'Capgemini',
            email: 'naveen.agarwal@capgemini.com',
            phone: '+91-9876543217',
            location: 'Gurgaon',
            employeesManaged: 22,
            specialization: 'SAP S/4HANA, Finance'
        }
    ],

    // Partner Alumni
    partnerAlumni: [
        {
            id: 'ALM001',
            employeeName: 'Rajiv Menon',
            previousRole: 'SAP Ariba Consultant',
            sapTeam: 'SAP Ariba',
            partner: 'Infosys',
            workPeriod: 'Jan 2021 - Dec 2023',
            currentCompany: 'SAP Labs India',
            currentRole: 'Senior Consultant',
            linkedIn: 'https://linkedin.com/in/rajivmenon',
            email: 'rajiv.menon@sap.com'
        },
        {
            id: 'ALM002',
            employeeName: 'Kavita Deshmukh',
            previousRole: 'SAP SuccessFactors Developer',
            sapTeam: 'SAP SuccessFactors',
            partner: 'TCS',
            workPeriod: 'Mar 2020 - Jun 2023',
            currentCompany: 'Amazon',
            currentRole: 'HR Technology Lead',
            linkedIn: 'https://linkedin.com/in/kavitadeshmukh',
            email: 'kavita.d@amazon.com'
        },
        {
            id: 'ALM003',
            employeeName: 'Sunil Rao',
            previousRole: 'SAP ABAP Developer',
            sapTeam: 'SAP S/4HANA',
            partner: 'Wipro',
            workPeriod: 'Jul 2019 - Aug 2023',
            currentCompany: 'Microsoft',
            currentRole: 'Principal Engineer',
            linkedIn: 'https://linkedin.com/in/sunilrao',
            email: 'sunil.rao@microsoft.com'
        },
        {
            id: 'ALM004',
            employeeName: 'Deepika Nambiar',
            previousRole: 'SAP BTP Architect',
            sapTeam: 'SAP BTP',
            partner: 'Accenture',
            workPeriod: 'Feb 2021 - Nov 2023',
            currentCompany: 'Google Cloud',
            currentRole: 'Cloud Solutions Architect',
            linkedIn: 'https://linkedin.com/in/deepikanambiar',
            email: 'deepika.n@google.com'
        },
        {
            id: 'ALM005',
            employeeName: 'Manoj Tripathi',
            previousRole: 'SAP Analytics Consultant',
            sapTeam: 'SAP Analytics Cloud',
            partner: 'Deloitte',
            workPeriod: 'May 2020 - Dec 2023',
            currentCompany: 'Tableau (Salesforce)',
            currentRole: 'Data Analytics Lead',
            linkedIn: 'https://linkedin.com/in/manojtripathi',
            email: 'manoj.t@salesforce.com'
        },
        {
            id: 'ALM006',
            employeeName: 'Anitha Krishnan',
            previousRole: 'SAP Ariba Lead',
            sapTeam: 'SAP Ariba',
            partner: 'Cognizant',
            workPeriod: 'Jan 2018 - Sep 2023',
            currentCompany: 'Oracle',
            currentRole: 'Senior Procurement Consultant',
            linkedIn: 'https://linkedin.com/in/anithakrishnan',
            email: 'anitha.k@oracle.com'
        }
    ]
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DummyData;
}