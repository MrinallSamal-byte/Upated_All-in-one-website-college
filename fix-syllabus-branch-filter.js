const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the getSyllabusContent function to show only selected branch
const oldSyllabusFunction = `function getSyllabusContent(branch, semester, filterText) {
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
    }`;

const newSyllabusFunction = `function getSyllabusContent(branch, semester, filterText) {
      const branchName = {
        'CSE': 'Computer Science & Engineering',
        'ECE': 'Electronics & Communication',
        'EEE': 'Electrical & Electronics',
        'MECH': 'Mechanical Engineering',
        'CIVIL': 'Civil Engineering'
      };
      
      // If no branch selected, show message to select branch
      if (!branch) {
        return \`
          <div class="alert alert-warning">
            <i class="fas fa-exclamation-triangle me-2"></i>Please select a branch to view syllabus
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body text-center">
                  <i class="fas fa-filter fa-3x text-muted mb-3"></i>
                  <h5>Filter Required</h5>
                  <p class="text-muted">Select a branch from the filter above to view branch-specific syllabus.</p>
                </div>
              </div>
            </div>
          </div>
        \`;
      }
      
      return \`
        <div class="alert alert-info">
          <i class="fas fa-filter me-2"></i>Showing syllabus for: <strong>\${filterText}</strong>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h6 class="mb-0">\${branchName[branch]} Syllabus</h6>
              </div>
              <div class="card-body">
                <div class="list-group list-group-flush">
                  \${semester ? 
                    \`<a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>\${semester}\${semester === '1' ? 'st' : semester === '2' ? 'nd' : semester === '3' ? 'rd' : 'th'} Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>\` :
                    \`<a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>1st Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>2nd Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>3rd Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>4th Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>5th Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>6th Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>7th Semester Syllabus - \${branchName[branch]}</span>
                        <small>2024-25</small>
                      </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <span><i class="fas fa-file-pdf text-danger me-2"></i>8th Semester Syllabus - \${branchName[branch]}</span>
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
    }`;

content = content.replace(oldSyllabusFunction, newSyllabusFunction);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed syllabus filter to show only selected branch');