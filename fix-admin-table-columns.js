const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Remove phone column from table header
content = content.replace(
  '<th>Phone</th>',
  ''
);

// Update table rows to remove phone column
const oldTableRow = `tbody.innerHTML = students.map(student => \`
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
        \`).join('');`;

const newTableRow = `tbody.innerHTML = students.map(student => \`
          <tr>
            <td>\${student.register_no}</td>
            <td>\${student.name}</td>
            <td>\${student.department}</td>
            <td>\${student.email}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" onclick="editStudent(\${student.id})">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent(\${student.id})">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        \`).join('');`;

content = content.replace(oldTableRow, newTableRow);

// Update search results table row as well
const oldSearchRow = `tbody.innerHTML = students.map(student => \`
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
          \`).join('');`;

const newSearchRow = `tbody.innerHTML = students.map(student => \`
            <tr>
              <td>\${student.register_no}</td>
              <td>\${student.name}</td>
              <td>\${student.department}</td>
              <td>\${student.email}</td>
              <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editStudent(\${student.id})">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(\${student.id})">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          \`).join('');`;

content = content.replace(oldSearchRow, newSearchRow);

// Update colspan for error messages
content = content.replace(
  '<tr><td colspan="6" class="text-center">Loading students...</td></tr>',
  '<tr><td colspan="5" class="text-center">Loading students...</td></tr>'
);

content = content.replace(
  '<tr><td colspan="6" class="text-center text-danger">Error loading students</td></tr>',
  '<tr><td colspan="5" class="text-center text-danger">Error loading students</td></tr>'
);

content = content.replace(
  '<tr><td colspan="6" class="text-center text-muted">No students found</td></tr>',
  '<tr><td colspan="5" class="text-center text-muted">No students found</td></tr>'
);

content = content.replace(
  '<tr><td colspan="6" class="text-center text-danger">Error searching students</td></tr>',
  '<tr><td colspan="5" class="text-center text-danger">Error searching students</td></tr>'
);

// Remove phone field from modal form
content = content.replace(
  `<div class="mb-3">
              <label class="form-label">Phone *</label>
              <input type="tel" class="form-control" id="studentPhone" pattern="[0-9]{10}" required>
            </div>`,
  ''
);

// Remove phone from edit function
content = content.replace(
  'document.getElementById(\'studentPhone\').value = student.phone || \'\';',
  ''
);

// Remove phone from save function
content = content.replace(
  'phone: document.getElementById(\'studentPhone\').value,',
  ''
);

fs.writeFileSync(filePath, content);
console.log('✅ Removed phone column from admin student management');