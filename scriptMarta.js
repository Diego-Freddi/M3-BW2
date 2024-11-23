document.addEventListener('DOMContentLoaded', () => {
  let checkInSection = document.getElementById('checkin'); 
  let checkOutSection = document.getElementById('checkout'); 
  let calendarMenu = document.getElementById('calendarMenu'); 
  let calendarGrid = document.getElementById('calendarGrid'); 
  let prevMonthButton = document.getElementById('prevMonth'); 
  let nextMonthButton = document.getElementById('nextMonth'); 
  let currentDate = new Date();
  let isSelectingCheckin = true; 

     // Gestione del menu utente
     const userIcon = document.getElementById('userIcon'); 
     const userMenu = document.getElementById('userMenu'); 
 
     // Toggle menu al clic sull'icona utente
     userIcon.addEventListener('click', (event) => {
         event.stopPropagation(); 
         userMenu.classList.toggle('show'); 
     });
 
     document.addEventListener('click', (event) => {
         if (!userMenu.contains(event.target) && !userIcon.contains(event.target)) {
             userMenu.classList.remove('show'); 
         }
     });

  // Function to display the calendar menu
  checkInSection.addEventListener('click', (event) => {
    calendarMenu.classList.toggle('show');
    populateCalendar(currentDate);
    event.stopPropagation();
  });

  // Handle calendar navigation
  prevMonthButton.addEventListener('click', (event) => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    populateCalendar(currentDate);
    event.stopPropagation();
  });

  nextMonthButton.addEventListener('click', (event) => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    populateCalendar(currentDate);
    event.stopPropagation();
  });

  // Close the calendar if clicked outside
  document.addEventListener('click', (event) => {
    if (!calendarMenu.contains(event.target) && !checkInSection.contains(event.target)) {
      calendarMenu.classList.remove('show');
    }
  });

  // Populate the calendar grid
  function populateCalendar(date) {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = date.getMonth();
    let year = date.getFullYear();

    // Update the current month/year
    document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;

    // Calculate the first day of the month and the last date
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    // Clear the existing calendar grid
    calendarGrid.innerHTML = '';

    // Create the table header with weekdays
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    weekdays.forEach((day) => {
      let th = document.createElement('th');
      th.textContent = day;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    calendarGrid.appendChild(thead);

    // Create the table body with the days of the month
    let tbody = document.createElement('tbody');
    let day = 1;
    for (let i = 0; i < 6; i++) { // Loop over weeks
      let row = document.createElement('tr');
      for (let j = 0; j < 7; j++) { // Loop over days of the week
        let td = document.createElement('td');

        if (i === 0 && j < firstDay) {
          td.classList.add('inactive');
          td.textContent = '';
        } else if (day <= lastDate) {
          td.textContent = day++;
          td.classList.add('active');
          td.addEventListener('click', (e) => handleDateSelection(e, month, year));
        } else {
          td.classList.add('inactive');
          td.textContent = '';
        }

        row.appendChild(td);
      }
      tbody.appendChild(row);
    }
    calendarGrid.appendChild(tbody);
  }

  // Handle date selection
  function handleDateSelection(event, month, year) {
    let selectedDate = event.target.textContent;
    let formattedDate = `${selectedDate}/${month + 1}/${year}`;

    if (isSelectingCheckin) {
      checkInSection.value = formattedDate;
      event.target.classList.add('selected-checkin');
      isSelectingCheckin = false;
    } else {
      checkOutSection.value = formattedDate;
      event.target.classList.add('selected-checkout');
      isSelectingCheckin = true;
    }
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const calendarMenu = document.getElementById('calendarMenu');

  function showCalendar(inputElement) {
    // Mostra il calendario sotto l'input
    const rect = inputElement.getBoundingClientRect();
    calendarMenu.style.display = 'block';
    calendarMenu.style.top = `${rect.bottom + window.scrollY}px`;  // posiziona il calendario appena sotto l'input
    calendarMenu.style.left = `${rect.left}px`;  // Allinea il calendario con l'input a sinistra
  }

  function hideCalendar() {
    calendarMenu.style.display = 'none';
  }

  // Mostra il calendario quando si clicca sull'input Check-in o Check-out
  checkinInput.addEventListener('click', function () {
    showCalendar(checkinInput);
  });

  checkoutInput.addEventListener('click', function () {
    showCalendar(checkoutInput);
  });

  // Nasconde il calendario quando si clicca fuori
  document.addEventListener('click', function (event) {
    if (!calendarMenu.contains(event.target) && !checkinInput.contains(event.target) && !checkoutInput.contains(event.target)) {
      hideCalendar();
    }
  });
});