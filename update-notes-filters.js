const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add filter section before the tabs
const filterSection = `  <!-- Filter Section -->
  <div class="card mb-4">
    <div class="card-header bg-secondary text-white">
      <h6 class="mb-0">Filter by Branch & Semester</h6>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label">Branch</label>
          <select class="form-select" id="branchFilter">
            <option value="">All Branches</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="EEE">Electrical & Electronics</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Semester</label>
          <select class="form-select" id="semesterFilter">
            <option value="">All Semesters</option>
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
      </div>
      <button class="btn btn-primary mt-3" onclick="applyFilters()">
        <i class="fas fa-filter me-2"></i>Apply Filters
      </button>
    </div>
  </div>

`;

// Insert filter section before the navigation tabs
content = content.replace('  <!-- Navigation Tabs -->', filterSection + '  <!-- Navigation Tabs -->');

// Add JavaScript for filtering
const filterJS = `
    // Filter functionality
    window.applyFilters = function() {
      const branch = document.getElementById('branchFilter').value;
      const semester = document.getElementById('semesterFilter').value;
      
      if (!branch && !semester) {
        alert('Please select at least one filter option');
        return;
      }
      
      // Show loading message
      const activeTab = document.querySelector('.tab-pane.active');
      if (activeTab) {
        activeTab.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin me-2"></i>Loading filtered content...</div>';
      }
      
      // Simulate API call for filtered content
      setTimeout(() => {
        loadFilteredContent(branch, semester);
      }, 1000);
    };
    
    function loadFilteredContent(branch, semester) {
      const activeTab = document.querySelector('.tab-pane.active');
      if (!activeTab) return;
      
      let filterText = '';
      if (branch && semester) {
        filterText = \`\${branch} - \${semester}\${semester === '1' ? 'st' : semester === '2' ? 'nd' : semester === '3' ? 'rd' : 'th'} Semester\`;
      } else if (branch) {
        filterText = branch;
      } else if (semester) {
        filterText = \`\${semester}\${semester === '1' ? 'st' : semester === '2' ? 'nd' : semester === '3' ? 'rd' : 'th'} Semester\`;
      }
      
      activeTab.innerHTML = \`
        <div class="alert alert-info">
          <i class="fas fa-filter me-2"></i>Showing content for: <strong>\${filterText}</strong>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h6 class="mb-0">Filtered Content</h6>
              </div>
              <div class="card-body">
                <p class="text-muted">Content filtered by your selection will appear here.</p>
                <p>This feature will load notes, PYQs, books, and syllabus based on your branch and semester selection.</p>
              </div>
            </div>
          </div>
        </div>
      \`;
    }`;

// Add the JavaScript before the existing script tag
content = content.replace('// Embedded sidebar script', filterJS + '\n\n    // Embedded sidebar script');

fs.writeFileSync(filePath, content);
console.log('✅ Added branch and semester filters to notes page');