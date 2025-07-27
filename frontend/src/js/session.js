let sessionTimeout;
let timerInterval;
const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes

function sessionExpired() {
  if (timerInterval) clearInterval(timerInterval);
  alert('Your session has expired due to inactivity.');
  window.location.href = '/login';
}

function updateTimerDisplay() {
  const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
  const remainingTime = Math.max(0, SESSION_TIMEOUT - (Date.now() - lastActivity));
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const timeLeftElement = document.getElementById('timeLeft');
  if (timeLeftElement) {
    timeLeftElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export function resetSessionTimer() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(sessionExpired, SESSION_TIMEOUT);
  localStorage.setItem('lastActivity', Date.now());
  updateTimerDisplay();
}

export function initSession() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerDisplay, 1000);
  document.addEventListener('mousemove', resetSessionTimer, false);
  document.addEventListener('keypress', resetSessionTimer, false);
  resetSessionTimer();
}