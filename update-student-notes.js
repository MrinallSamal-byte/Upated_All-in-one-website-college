const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add syllabus tab
const oldTabs = `<li class="nav-item" role="presentation">
      <button class="nav-link" id="books-tab" data-bs-toggle="tab" data-bs-target="#books" type="button">
        <i class="fas fa-book-open me-2"></i>Book PDFs
      </button>
    </li>`;

const newTabs = `<li class="nav-item" role="presentation">
      <button class="nav-link" id="books-tab" data-bs-toggle="tab" data-bs-target="#books" type="button">
        <i class="fas fa-book-open me-2"></i>Book PDFs
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="syllabus-tab" data-bs-toggle="tab" data-bs-target="#syllabus" type="button">
        <i class="fas fa-list-alt me-2"></i>Syllabus
      </button>
    </li>`;

content = content.replace(oldTabs, newTabs);

// Add syllabus tab content
const booksTabEnd = `</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>`;

const newBooksTabEnd = `</div>

    <!-- Syllabus Tab -->
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>`;

content = content.replace(booksTabEnd, newBooksTabEnd);

fs.writeFileSync(filePath, content);
console.log('✅ Added syllabus tab to student notes');