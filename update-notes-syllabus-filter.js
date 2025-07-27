const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Update the loadFilteredContent function to include syllabus
const oldFilterFunction = `function loadFilteredContent(branch, semester) {
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

const newFilterFunction = `function loadFilteredContent(branch, semester) {
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
      
      // Show filtered content for all tabs
      const tabId = activeTab.id;
      let content = '';
      
      if (tabId === 'syllabus') {
        content = getSyllabusContent(branch, semester, filterText);
      } else {
        content = getGeneralContent(filterText);
      }
      
      activeTab.innerHTML = content;
    }
    
    function getSyllabusContent(branch, semester, filterText) {
      const branchName = {
        'CSE': 'Computer Science & Engineering',
        'ECE': 'Electronics & Communication',
        'EEE': 'Electrical & Electronics',
        'MECH': 'Mechanical Engineering',
        'CIVIL': 'Civil Engineering'
      };
      
      return \`
        <div class="alert alert-info">
          <i class="fas fa-filter me-2"></i>Showing syllabus for: <strong>\${filterText}</strong>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h6 class="mb-0">\${branch ? branchName[branch] : 'All Branches'} Syllabus</h6>
              </div>
              <div class="card-body">
                <div class="list-group list-group-flush">
                  \${semester ? 
                    \`<a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>\${semester}\${semester === '1' ? 'st' : semester === '2' ? 'nd' : semester === '3' ? 'rd' : 'th'} Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>\` :
                    \`<a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>1st Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>2nd Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>3rd Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>4th Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>5th Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>6th Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>7th Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>8th Semester Syllabus</span>
                        <small>2024-25</small>
                      </div>
                    </a>\`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }
    
    function getGeneralContent(filterText) {
      return \`
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
                <p>This feature will load notes, PYQs, and books based on your branch and semester selection.</p>
              </div>
            </div>
          </div>
        </div>
      \`;
    }`;

content = content.replace(oldFilterFunction, newFilterFunction);

fs.writeFileSync(filePath, content);
console.log('✅ Updated notes filter to include syllabus content');