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


let isDateSelected = false;
let isTimezoneSelected = false;
let selectedDate = null;
let selectedTimezone = null;

const form = document.getElementById('detailsForm'); // Reference to your form element


  // Function to add selected date and timezone to hidden input fields
  function updateFormFields() {
    const hiddenDateField = document.getElementById('selectedDateField');
    const hiddenTimezoneField = document.getElementById('selectedTimezoneField');



    if (selectedDate && selectedTimezone) {
      hiddenDateField.value = selectedDate.toISOString(); // Store date as ISO string for easy processing
      hiddenTimezoneField.value = selectedTimezone; // Store the selected timezone
    }
  }


function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();


  datesContainer.innerHTML = "";


  for (let i = 0; i < firstDay; i++) {
    datesContainer.innerHTML += `<span></span>`;
  }
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


renderCalendar(currentMonth, currentYear);


document.addEventListener('DOMContentLoaded', () => {
  const dropdownButton = document.getElementById('dropdown-button');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const timezoneSearch = document.getElementById('timezone-search');
  const timezoneSelector = document.getElementById('timezone-selector');
  const selectedTimezoneDisplay = document.getElementById('selected-timezone');
  const selectedDateDisplay = document.getElementById('selected-date');
  const timeFormatSwitch = document.getElementById('time-format-switch');
  const timeFormatLabel = document.getElementById('time-format-label');
  const modal = document.getElementById("detailsModal");


  let is24Hour = false;


  const timeZones = Intl.supportedValuesOf('timeZone');


  const populateTimezones = (filter = '') => {
    timezoneSelector.innerHTML = ''; 
    const filteredZones = timeZones.filter((tz) =>
      tz.toLowerCase().includes(filter.toLowerCase())
    );


    filteredZones.forEach((tz) => {
      const option = document.createElement('option');
      option.value = tz;


      const formattedTime = new Date().toLocaleTimeString('en-US', {
        timeZone: tz,
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
      });


      option.textContent = `${tz} (${formattedTime})`;
      timezoneSelector.appendChild(option);
    });
  };


  populateTimezones();


  dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
  });


  timezoneSearch.addEventListener('input', (e) => {
    populateTimezones(e.target.value);
  });


  timeFormatSwitch.addEventListener('change', () => {
    is24Hour = timeFormatSwitch.checked;
    timeFormatLabel.textContent = is24Hour ? '24-Hour' : 'AM/PM';
    populateTimezones(); 
  });


  timezoneSelector.addEventListener('change', () => {
    selectedTimezone = timezoneSelector.value;
    selectedTimezoneDisplay.textContent = selectedTimezone;
    dropdownMenu.classList.remove('active'); 
    isTimezoneSelected = true;
    updateFormFields(); // Update hidden form fields when a timezone is selected

    checkModalTrigger();
  });


  datesContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN' && event.target.textContent) {
      const selectedDay = event.target.textContent;
      selectedDate = new Date(currentYear, currentMonth, selectedDay);


      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      selectedDateDisplay.textContent = formattedDate;


      isDateSelected = true;
      updateFormFields(); // Update hidden form fields when a date is selected

      checkModalTrigger();
    }
  });


  document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('active');
    }
  });


  function checkModalTrigger() {
    if (isDateSelected && isTimezoneSelected) {
      modal.classList.add('active');
    }
  }
});
