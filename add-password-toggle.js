const fs = require('fs');
const path = require('path');

// Update login page
const loginPath = path.join(__dirname, 'frontend', 'public', 'login.html');
let loginContent = fs.readFileSync(loginPath, 'utf8');

// Add show password toggle to login
const oldLoginPassword = `<div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-lock"></i></span>
          <input type="password" id="password" class="form-control" placeholder="Password" required>
        </div>`;

const newLoginPassword = `<div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-lock"></i></span>
          <input type="password" id="password" class="form-control" placeholder="Password" required>
          <button class="btn btn-outline-secondary" type="button" id="togglePassword">
            <i class="fas fa-eye"></i>
          </button>
        </div>`;

loginContent = loginContent.replace(oldLoginPassword, newLoginPassword);

// Add JavaScript for login password toggle
const loginToggleJS = `
    // Password toggle functionality
    document.getElementById('togglePassword').addEventListener('click', function() {
      const passwordField = document.getElementById('password');
      const toggleIcon = this.querySelector('i');
      
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
      }
    });`;

// Add the JS before the existing script closing
loginContent = loginContent.replace('init3DBackground(\'threeDBackground\');', 'init3DBackground(\'threeDBackground\');\n' + loginToggleJS);

fs.writeFileSync(loginPath, loginContent);

// Update signup page
const signupPath = path.join(__dirname, 'frontend', 'public', 'signup.html');
let signupContent = fs.readFileSync(signupPath, 'utf8');

// Add show password toggle to signup
const oldSignupPassword = `<div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input type="password" id="password" class="form-control" placeholder="Password *" minlength="6" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password *" required>
            </div>
          </div>
        </div>`;

const newSignupPassword = `<div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input type="password" id="password" class="form-control" placeholder="Password *" minlength="6" required>
              <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password *" required>
              <button class="btn btn-outline-secondary" type="button" id="toggleConfirmPassword">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>`;

signupContent = signupContent.replace(oldSignupPassword, newSignupPassword);

// Add JavaScript for signup password toggles
const signupToggleJS = `
    // Password toggle functionality
    document.getElementById('togglePassword').addEventListener('click', function() {
      const passwordField = document.getElementById('password');
      const toggleIcon = this.querySelector('i');
      
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
      }
    });

    document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
      const confirmPasswordField = document.getElementById('confirmPassword');
      const toggleIcon = this.querySelector('i');
      
      if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
      } else {
        confirmPasswordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
      }
    });`;

// Add the JS before the closing script tag
signupContent = signupContent.replace('});', '});\n' + signupToggleJS);

fs.writeFileSync(signupPath, signupContent);

console.log('✅ Added password toggle functionality to login and signup pages');