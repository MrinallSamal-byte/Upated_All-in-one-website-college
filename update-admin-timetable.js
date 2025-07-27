const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add timetable tab to upload section
const oldTabs = `<li class="nav-item">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#syllabus-upload">Syllabus</button>
          </li>`;

const newTabs = `<li class="nav-item">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#syllabus-upload">Syllabus</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#timetable-upload">Timetable</button>
          </li>`;

content = content.replace(oldTabs, newTabs);

// Add timetable upload form
const syllabusTab = `<div class="tab-pane fade" id="syllabus-upload">
            <form id="syllabusForm" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-4">
                  <label class="form-label">Branch</label>
                  <select class="form-select" name="branch" required>
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical & Electronics</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Semester</label>
                  <select class="form-select" name="semester" required>
                    <option value="">Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Academic Year</label>
                  <select class="form-select" name="academic_year" required>
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="form-label">Upload Syllabus</label>
                  <input type="file" class="form-control" name="file" accept=".pdf" required>
                </div>
              </div>
              <button type="submit" class="btn btn-info mt-3">Upload Syllabus</button>
            </form>
          </div>`;

const newSyllabusTab = syllabusTab + `

          <!-- Timetable Upload -->
          <div class="tab-pane fade" id="timetable-upload">
            <form id="timetableForm" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-4">
                  <label class="form-label">Branch</label>
                  <select class="form-select" name="branch" required>
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical & Electronics</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Semester</label>
                  <select class="form-select" name="semester" required>
                    <option value="">Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Academic Year</label>
                  <select class="form-select" name="academic_year" required>
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="form-label">Upload Timetable</label>
                  <input type="file" class="form-control" name="file" accept=".pdf,.jpg,.jpeg,.png" required>
                  <small class="text-muted">Supported formats: PDF, JPG, PNG</small>
                </div>
              </div>
              <button type="submit" class="btn btn-success mt-3">Upload Timetable</button>
            </form>
          </div>`;

content = content.replace(syllabusTab, newSyllabusTab);

// Add timetable form submission handler
const oldJS = `document.getElementById('syllabusForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        const response = await fetch('/api/admin/upload/syllabus', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          alert('Syllabus uploaded successfully!');
          e.target.reset();
        } else {
          alert('Error uploading syllabus');
        }
      } catch (error) {
        alert('Error uploading syllabus');
      }
    });`;

const newJS = oldJS + `

    document.getElementById('timetableForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        const response = await fetch('/api/admin/upload/timetable', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          alert('Timetable uploaded successfully!');
          e.target.reset();
        } else {
          alert('Error uploading timetable');
        }
      } catch (error) {
        alert('Error uploading timetable');
      }
    });`;

content = content.replace(oldJS, newJS);

fs.writeFileSync(filePath, content);
console.log('✅ Added timetable upload to admin dashboard');