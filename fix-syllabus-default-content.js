const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the entire default syllabus tab content
const oldSyllabusContent = `    <!-- Syllabus Tab -->
    <div class="tab-pane fade" id="syllabus" role="tabpanel">
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h6 class="mb-0">Computer Science & Engineering</h6>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action">
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
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header bg-success text-white">
              <h6 class="mb-0">Electronics & Communication</h6>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action">
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
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header bg-info text-white">
              <h6 class="mb-0">Mechanical Engineering</h6>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action">
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
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header bg-warning text-dark">
              <h6 class="mb-0">Civil Engineering</h6>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action">
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

const newSyllabusContent = `    <!-- Syllabus Tab -->
    <div class="tab-pane fade" id="syllabus" role="tabpanel">
      <div class="alert alert-info">
        <i class="fas fa-info-circle me-2"></i>Please use the filter above to select your branch and semester to view relevant syllabus documents.
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body text-center py-5">
              <i class="fas fa-filter fa-4x text-muted mb-3"></i>
              <h4>Filter Required</h4>
              <p class="text-muted">Select your branch from the filter section above to view branch-specific syllabus documents.</p>
              <p class="text-muted">You can also filter by semester to see specific semester syllabus.</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

content = content.replace(oldSyllabusContent, newSyllabusContent);

fs.writeFileSync(filePath, content);
console.log('✅ Updated default syllabus content to require filtering');