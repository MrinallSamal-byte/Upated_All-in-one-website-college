const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the entire students section with enhanced version
const oldStudentsSection = `<!-- Students Section -->
  <div id="students-section" class="section" style="display:none;">
    <div class="card">
      <div class="card-header bg-success text-white d-flex justify-content-between">
        <h5 class="mb-0">Student Management</h5>
        <button class="btn btn-light btn-sm" onclick="showAddStudent()">Add New Student</button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Register No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="studentsTable">
              <tr><td colspan="6" class="text-center">Loading students...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;

const newStudentsSection = `<!-- Students Section -->
  <div id="students-section" class="section" style="display:none;">
    <div class="card">
      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Student Management</h5>
        <button class="btn btn-light btn-sm" onclick="showAddStudent()">
          <i class="fas fa-plus me-1"></i>Add New Student
        </button>
      </div>
      <div class="card-body">
        <!-- Search Section -->
        <div class="row mb-3">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input type="text" class="form-control" id="studentSearch" placeholder="Search by Register Number or Name">
            </div>
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary" onclick="searchStudents()">
              <i class="fas fa-search me-1"></i>Search
            </button>
            <button class="btn btn-secondary ms-2" onclick="loadStudents()">
              <i class="fas fa-refresh me-1"></i>Reset
            </button>
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Register No</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="studentsTable">
              <tr><td colspan="6" class="text-center">Loading students...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Add/Edit Student Modal -->
  <div class="modal fade" id="studentModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="studentModalTitle">Add New Student</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="studentForm">
            <input type="hidden" id="studentId">
            <div class="mb-3">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-control" id="studentName" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Registration Number *</label>
              <input type="text" class="form-control" id="studentRegisterNo" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Department *</label>
              <select class="form-select" id="studentDepartment" required>
                <option value="">Select Department</option>
                <option value="CSE">Computer Science & Engineering</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical & Electronics</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Email *</label>
              <input type="email" class="form-control" id="studentEmail" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Phone *</label>
              <input type="tel" class="form-control" id="studentPhone" pattern="[0-9]{10}" required>
            </div>
            <div class="mb-3" id="passwordSection">
              <label class="form-label">Password *</label>
              <input type="password" class="form-control" id="studentPassword" minlength="6">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" onclick="saveStudent()">Save Student</button>
        </div>
      </div>
    </div>
  </div>`;

content = content.replace(oldStudentsSection, newStudentsSection);

// Add enhanced JavaScript functions
const oldJS = `async function loadStudents() {
      try {
        const response = await fetch('/api/admin/students');
        const students = await response.json();
        
        const tbody = document.getElementById('studentsTable');
        tbody.innerHTML = students.map(student => \`
          <tr>
            <td>\${student.register_no}</td>
            <td>\${student.name}</td>
            <td>\${student.department}</td>
            <td>\${student.semester}</td>
            <td>\${student.email}</td>
            <td>
              <button class="btn btn-sm btn-warning">Edit</button>
              <button class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        \`).join('');
      } catch (error) {
        document.getElementById('studentsTable').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading students</td></tr>';
      }
    }`;

const newJS = `async function loadStudents() {
      try {
        const response = await fetch('/api/admin/students');
        const students = await response.json();
        
        const tbody = document.getElementById('studentsTable');
        tbody.innerHTML = students.map(student => \`
          <tr>
            <td>\${student.register_no}</td>
            <td>\${student.name}</td>
            <td>\${student.department}</td>
            <td>\${student.email}</td>
            <td>\${student.phone || 'N/A'}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" onclick="editStudent(\${student.id})">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent(\${student.id})">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        \`).join('');
      } catch (error) {
        document.getElementById('studentsTable').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading students</td></tr>';
      }
    }

    async function searchStudents() {
      const searchTerm = document.getElementById('studentSearch').value.trim();
      if (!searchTerm) {
        loadStudents();
        return;
      }

      try {
        const response = await fetch(\`/api/admin/students/search?q=\${encodeURIComponent(searchTerm)}\`);
        const students = await response.json();
        
        const tbody = document.getElementById('studentsTable');
        if (students.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No students found</td></tr>';
        } else {
          tbody.innerHTML = students.map(student => \`
            <tr>
              <td>\${student.register_no}</td>
              <td>\${student.name}</td>
              <td>\${student.department}</td>
              <td>\${student.email}</td>
              <td>\${student.phone || 'N/A'}</td>
              <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editStudent(\${student.id})">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(\${student.id})">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          \`).join('');
        }
      } catch (error) {
        document.getElementById('studentsTable').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error searching students</td></tr>';
      }
    }

    function showAddStudent() {
      document.getElementById('studentModalTitle').textContent = 'Add New Student';
      document.getElementById('studentForm').reset();
      document.getElementById('studentId').value = '';
      document.getElementById('passwordSection').style.display = 'block';
      document.getElementById('studentPassword').required = true;
      new bootstrap.Modal(document.getElementById('studentModal')).show();
    }

    async function editStudent(id) {
      try {
        const response = await fetch(\`/api/admin/students/\${id}\`);
        const student = await response.json();
        
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentRegisterNo').value = student.register_no;
        document.getElementById('studentDepartment').value = student.department;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone || '';
        document.getElementById('passwordSection').style.display = 'none';
        document.getElementById('studentPassword').required = false;
        
        new bootstrap.Modal(document.getElementById('studentModal')).show();
      } catch (error) {
        alert('Error loading student data');
      }
    }

    async function saveStudent() {
      const id = document.getElementById('studentId').value;
      const isEdit = !!id;
      
      const studentData = {
        name: document.getElementById('studentName').value,
        registerNo: document.getElementById('studentRegisterNo').value,
        department: document.getElementById('studentDepartment').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        userType: 'student'
      };

      if (!isEdit) {
        studentData.password = document.getElementById('studentPassword').value;
      }

      try {
        const url = isEdit ? \`/api/admin/students/\${id}\` : '/api/auth/signup';
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData)
        });

        if (response.ok) {
          alert(isEdit ? 'Student updated successfully!' : 'Student added successfully!');
          bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
          loadStudents();
        } else {
          const error = await response.json();
          alert(error.error || 'Error saving student');
        }
      } catch (error) {
        alert('Error saving student');
      }
    }

    async function deleteStudent(id) {
      if (!confirm('Are you sure you want to delete this student?')) return;

      try {
        const response = await fetch(\`/api/admin/students/\${id}\`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Student deleted successfully!');
          loadStudents();
        } else {
          alert('Error deleting student');
        }
      } catch (error) {
        alert('Error deleting student');
      }
    }`;

content = content.replace(oldJS, newJS);

fs.writeFileSync(filePath, content);
console.log('✅ Enhanced admin student management with CRUD operations');