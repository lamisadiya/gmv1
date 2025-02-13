const monthYear = document.getElementById('monthYear');
const datesContainer = document.getElementById('dates');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  datesContainer.innerHTML = "";

  // Add blank spaces for days of the week before the 1st
  for (let i = 0; i < firstDay; i++) {
    datesContainer.innerHTML += `<span></span>`;
  }

  // Add dates of the month
  for (let date = 1; date <= lastDate; date++) {
    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    datesContainer.innerHTML += `<span class="${isToday ? 'today' : ''}">${date}</span>`;
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Initialize Calendar
renderCalendar(currentMonth, currentYear);
