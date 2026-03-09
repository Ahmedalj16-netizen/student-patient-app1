// Check if user is logged in
window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    displayUserInfo(user);
    loadStudents();
    loadPatients();
    loadUsers();
});

// Display user information
function displayUserInfo(user) {
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById('userGreeting').textContent = `Welcome, ${user.firstName}!`;
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
});

// Menu navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        const section = item.getAttribute('data-section');
        document.getElementById(section).classList.add('active');
    });
});

// Load students
async function loadStudents() {
    try {
        const response = await fetch('/api/db?action=students');
        const students = await response.json();
        
        const tbody = document.getElementById('studentsList');
        tbody.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.studentId}</td>
                <td>${student.major || 'N/A'}</td>
                <td>${student.enrollmentDate || 'N/A'}</td>
                <td><span class="status-badge active">${student.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Load patients
async function loadPatients() {
    try {
        const response = await fetch('/api/db?action=patients');
        const patients = await response.json();
        
        const tbody = document.getElementById('patientsList');
        tbody.innerHTML = '';
        
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.firstName} ${patient.lastName}</td>
                <td>${patient.email}</td>
                <td>${patient.patientId}</td>
                <td>${patient.dateOfBirth || 'N/A'}</td>
                <td><span class="status-badge active">${patient.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading patients:', error);
    }
}

// Load all users
async function loadUsers() {
    try {
        const response = await fetch('/api/db?action=users');
        const users = await response.json();
        
        const tbody = document.getElementById('usersList');
        tbody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
            tbody.appendChild(row);
        });
        
        // Populate user select dropdowns for modals
        populateUserSelects(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Populate user select dropdowns
function populateUserSelects(users) {
    const studentSelect = document.getElementById('studentUserId');
    const patientSelect = document.getElementById('patientUserId');
    
    studentSelect.innerHTML = '<option value="">Select a user</option>';
    patientSelect.innerHTML = '<option value="">Select a user</option>';
    
    users.forEach(user => {
        const option1 = document.createElement('option');
        option1.value = user.id;
        option1.textContent = `${user.firstName} ${user.lastName} (${user.email})`;
        studentSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = user.id;
        option2.textContent = `${user.firstName} ${user.lastName} (${user.email})`;
        patientSelect.appendChild(option2);
    });
}

// Modal functionality
const studentModal = document.getElementById('studentModal');
const patientModal = document.getElementById('patientModal');

document.getElementById('addStudentBtn').addEventListener('click', () => {
    studentModal.classList.add('open');
});

document.getElementById('addPatientBtn').addEventListener('click', () => {
    patientModal.classList.add('open');
});

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.remove('open');
    });
});

window.addEventListener('click', (e) => {
    if (e.target === studentModal) studentModal.classList.remove('open');
    if (e.target === patientModal) patientModal.classList.remove('open');
});

// Add student form
document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('studentUserId').value;
    const studentId = document.getElementById('studentId').value;
    const major = document.getElementById('major').value;
    const enrollmentDate = document.getElementById('enrollmentDate').value;
    
    try {
        const response = await fetch('/api/db?action=students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                studentId,
                major,
                enrollmentDate
            })
        });
        
        if (response.ok) {
            alert('Student added successfully!');
            studentModal.classList.remove('open');
            document.getElementById('addStudentForm').reset();
            loadStudents();
        } else {
            alert('Failed to add student');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        alert('An error occurred');
    }
});

// Add patient form
document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('patientUserId').value;
    const patientId = document.getElementById('patientId').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const medicalHistory = document.getElementById('medicalHistory').value;
    
    try {
        const response = await fetch('/api/db?action=patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                patientId,
                dateOfBirth,
                medicalHistory
            })
        });
        
        if (response.ok) {
            alert('Patient added successfully!');
            patientModal.classList.remove('open');
            document.getElementById('addPatientForm').reset();
            loadPatients();
        } else {
            alert('Failed to add patient');
        }
    } catch (error) {
        console.error('Error adding patient:', error);
        alert('An error occurred');
    }
});
