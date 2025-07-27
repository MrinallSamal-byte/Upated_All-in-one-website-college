const fs = require('fs');
const path = require('path');

// Branch-specific semester mapping
const branchSemesters = {
  'CSE': 8,
  'ECE': 8, 
  'EEE': 8,
  'MECH': 8,
  'CIVIL': 8
};

// Update admin dashboard
const adminPath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let adminContent = fs.readFileSync(adminPath, 'utf8');

// Add JavaScript for dynamic semester options
const dynamicSemesterJS = `
    // Dynamic semester options based on branch
    function updateSemesterOptions(branchSelect, semesterSelect) {
      const branch = branchSelect.value;
      const semesters = {
        'CSE': 8, 'ECE': 8, 'EEE': 8, 'MECH': 8, 'CIVIL': 8
      };
      
      semesterSelect.innerHTML = '<option value="">Select Semester</option>';
      
      if (branch && semesters[branch]) {
        for (let i = 1; i <= semesters[branch]; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i + (i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th') + ' Semester';
          semesterSelect.appendChild(option);
        }
      }
    }

    // Add event listeners when page loads
    document.addEventListener('DOMContentLoaded', function() {
      // Notes form
      const notesBranch = document.querySelector('#notesForm [name="branch"]');
      const notesSemester = document.querySelector('#notesForm [name="semester"]');
      if (notesBranch && notesSemester) {
        notesBranch.addEventListener('change', () => updateSemesterOptions(notesBranch, notesSemester));
      }

      // PYQ form
      const pyqBranch = document.querySelector('#pyqForm [name="branch"]');
      const pyqSemester = document.querySelector('#pyqForm [name="semester"]');
      if (pyqBranch && pyqSemester) {
        pyqBranch.addEventListener('change', () => updateSemesterOptions(pyqBranch, pyqSemester));
      }

      // Syllabus form
      const syllabusBranch = document.querySelector('#syllabusForm [name="branch"]');
      const syllabusSemester = document.querySelector('#syllabusForm [name="semester"]');
      if (syllabusBranch && syllabusSemester) {
        syllabusBranch.addEventListener('change', () => updateSemesterOptions(syllabusBranch, syllabusSemester));
      }

      // Timetable form
      const timetableBranch = document.querySelector('#timetableForm [name="branch"]');
      const timetableSemester = document.querySelector('#timetableForm [name="semester"]');
      if (timetableBranch && timetableSemester) {
        timetableBranch.addEventListener('change', () => updateSemesterOptions(timetableBranch, timetableSemester));
      }
    });`;

// Add the JavaScript before the closing script tag
adminContent = adminContent.replace('async function loadStudents() {', dynamicSemesterJS + '\n\n    async function loadStudents() {');

fs.writeFileSync(adminPath, adminContent);

// Update teacher dashboard
const teacherPath = path.join(__dirname, 'frontend', 'pages', 'teacher-dashboard.htm');
let teacherContent = fs.readFileSync(teacherPath, 'utf8');

// Add the same JavaScript to teacher dashboard
teacherContent = teacherContent.replace('// Set current date', dynamicSemesterJS + '\n\n    // Set current date');

// Add event listeners for teacher forms
const teacherFormJS = `
    // Add event listeners for teacher forms
    document.addEventListener('DOMContentLoaded', function() {
      // Attendance form
      const attBranch = document.querySelector('#attendanceForm [name="branch"]');
      const attSemester = document.querySelector('#attendanceForm [name="semester"]');
      if (attBranch && attSemester) {
        attBranch.addEventListener('change', () => updateSemesterOptions(attBranch, attSemester));
      }

      // Marks form
      const marksBranch = document.querySelector('#marksForm [name="branch"]');
      const marksSemester = document.querySelector('#marksForm [name="semester"]');
      if (marksBranch && marksSemester) {
        marksBranch.addEventListener('change', () => updateSemesterOptions(marksBranch, marksSemester));
      }

      // Upload forms
      const uploadBranch = document.querySelector('#notesUploadForm [name="branch"]');
      const uploadSemester = document.querySelector('#notesUploadForm [name="semester"]');
      if (uploadBranch && uploadSemester) {
        uploadBranch.addEventListener('change', () => updateSemesterOptions(uploadBranch, uploadSemester));
      }
    });`;

teacherContent = teacherContent.replace('updateDateTime();', 'updateDateTime();\n' + teacherFormJS);

fs.writeFileSync(teacherPath, teacherContent);

console.log('✅ Updated semester options to be branch-specific in admin and teacher dashboards');