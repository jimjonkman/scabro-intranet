const toast = document.querySelector('.toast');
const addUpdate = document.querySelector('#addUpdate');
const filterUpdates = document.querySelector('#filterUpdates');
const calendarButton = document.querySelector('.add-calendar');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

addUpdate.addEventListener('click', () => showToast('Update composer is ready for your note.'));
filterUpdates.addEventListener('click', () => showToast('Showing all team updates.'));
calendarButton.addEventListener('click', () => showToast('New calendar event started.'));

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((navItem) => navItem.classList.remove('active'));
    item.classList.add('active');
  });
});
