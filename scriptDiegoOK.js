
// Dati dinamici delle card
let cardsData = [
  { id: 1, title: "Trasquera, Italia", description: "241 € a notte" },
  { id: 2, title: "Useglio, Italia", description: "732 € a notte" },
  { id: 3, title: "Bettmeralp, Svizzera", description: "213 € a notte" },
  { id: 4, title: "Varzo, Italia", description: "142 € a notte" },
  { id: 5, title: "Lauterbrunnen, Svizzera", description: "277 € a notte" },
  { id: 6, title: "Boleto - Madonna del sasso, Italia", description: "125 € a notte" },
  { id: 7, title: "Bormio, Italia", description: "1.624 € a notte" },
  { id: 8, title: "Monno, Italia", description: "211 € a notte" },
  { id: 9, title: "Mund, Svizzera", description: "153 € a notte" },
  { id: 10, title: "Casa Vacanze - Varenna, Italia", description: " € a notte" },
];

document.addEventListener('DOMContentLoaded', () => {

  //--------------------CARD-------------------------

  let cardSection = document.getElementById("cardSection"); // Seleziona la sezione in cui inserire le card
  // Funzione per creare e aggiungere le card
  function populateCards(data) {
    data.forEach(card => {
      // Crea il contenitore della card
      let cardDiv = document.createElement("div");
      cardDiv.className = "cardHome";
      let cardImg = document.createElement("div");
      cardImg.className = "cardImg";

      // Crea l'immagine
      let img = document.createElement("img");
      img.src = `assets/CARD/${card.id}.webp`;
      img.alt = card.title;

      // Crea il titolo
      let title = document.createElement("h5");
      title.textContent = card.title;

      // Crea la descrizione
      let description = document.createElement("p");
      description.textContent = card.description;

      // Aggiungi gli elementi al contenitore della card
      cardImg.appendChild(img);
      cardDiv.appendChild(cardImg)
      cardDiv.appendChild(title);
      cardDiv.appendChild(description);

      // Aggiungi la card alla sezione
      cardSection.appendChild(cardDiv);
    });
  }

  // Popola le card con i dati
  populateCards(cardsData);

  // -------------Gestione del menu utente-----------------------

  let userIcon = document.getElementById('userIcon'); // icona utente
  let userMenu = document.getElementById('userMenu'); // menu utente

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

  // ---------------focus su input, al clik dell'intera sezione-----------
  let hoverSections = document.querySelectorAll('.hover-section'); // focus su input, al clik dell'intera sezione

  hoverSections.forEach(section => {
    section.addEventListener('click', () => {
      let input = section.querySelector('input');
      if (input) {
        input.focus(); // Sposta il cursore nel campo input
      }
    });
  });


  // --------------ATTIVAZIONE SERACH-------------

  let searchButton = document.getElementById('search-button'); // search button

  // Aggiungi l'evento a ciascuna sezione
  hoverSections.forEach((section) => {
    section.addEventListener('click', () => {
      // Aggiungi la classe "expanded" al pulsante di ricerca
      searchButton.classList.add('expanded');
    });
  });

  // Rimuovi l'espansione cliccando fuori
  document.addEventListener('click', (event) => {
    if (!searchButton.contains(event.target) && !Array.from(hoverSections).some(section => section.contains(event.target))) {
      searchButton.classList.remove('expanded');
    }
  });

  // ---------------MENU DOVE--------------------

  let sezioneDove = document.getElementById('location-section'); // sezione DOVE
  let dropdownMenuDove = sezioneDove.querySelector('.location-menu'); //menu DOVE 

  // Mostra/nascondi il menu a tendina al clic
  sezioneDove.addEventListener('click', () => {
    let isMenuOpen = dropdownMenuDove.classList.contains('show');

    // Chiudi il menu se è già aperto
    if (isMenuOpen) {
      dropdownMenuDove.classList.remove('show');
    } else {
      dropdownMenuDove.classList.add('show');
    }
  });

  // Chiudi il menu se clicco fuori
  document.addEventListener('click', (event) => {
    if (!sezioneDove.contains(event.target)) {
      dropdownMenuDove.classList.remove('show');
    }
  });

  //--------------CHECKIN--------------------

  let sezioneCheckin = document.getElementById('check-in-section'); // sezione checkin
  let dropdownMenu = sezioneCheckin.querySelector('.calendar-menu'); // menu checkin
  let calendarGrid = document.getElementById('calendarGrid'); // Griglia per calendario dinamico
  let prevMonthButton = document.getElementById('prevMonth'); // bottone mese precedente
  let nextMonthButton = document.getElementById('nextMonth'); // bottone mese successivo

  let tabDates = document.getElementById('tab-dates'); //tabs data header menu calendario
  let tabMonths = document.getElementById('tab-months'); //tabs mesi header menu calendario
  let tabFlexible = document.getElementById('tab-flexible'); //tabs flessible header menu calendario

// Variabile globale che rappresenta la data corrente
let currentDate = new Date();


// Funzione per impedire la propagazione di un evento
// Uso: Evita che l'evento attuale si propaghi agli elementi genitori, utile per menu e overlay
function preventEventPropagation(event) {
  event.stopPropagation();
}

// Funzione per alternare la visibilità di un menu e chiudere altri menu aperti
// menu: elemento da aprire/chiudere
// otherMenus: array di altri menu da chiudere
function toggleMenu(menu, otherMenus = []) {
  // Chiudi tutti gli altri menu passati come argomento
  otherMenus.forEach(m => m.classList.remove('show'));
  // Alterna lo stato di visibilità del menu corrente
  menu.classList.toggle('show');
}

// Funzione per cambiare il mese corrente
// offset: numero di mesi da aggiungere (positivo o negativo)
function changeMonth(offset) {
  // Aggiorna il mese nella variabile globale currentDate
  currentDate.setMonth(currentDate.getMonth() + offset);
  // Rigenera i calendari con la nuova data
  populateCalendars(currentDate);
}

// Funzione per popolare i calendari con due mesi affiancati
// date: data di riferimento per il primo mese
function populateCalendars(date) {
  // Svuota il contenitore dei calendari per prepararne uno nuovo
  calendarGrid.innerHTML = '';

  // Crea il calendario per il mese corrente
  const currentMonth = createCalendarMonth(date);
  // Crea il calendario per il mese successivo
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const nextMonth = createCalendarMonth(nextMonthDate);

  // Aggiungi entrambi i calendari al contenitore
  calendarGrid.appendChild(currentMonth);
  calendarGrid.appendChild(nextMonth);
}

// Funzione per creare un calendario per un mese specifico
// date: data di riferimento per determinare il mese
function createCalendarMonth(date) {
  // Array di nomi dei mesi e giorni della settimana
  const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  // Estrai informazioni principali dalla data
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  // Crea il contenitore del calendario
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-month');

  // Intestazione del mese (es. "Marzo 2024")
  const monthHeader = document.createElement('h6');
  monthHeader.textContent = `${monthNames[month]} ${year}`;
  calendarContainer.appendChild(monthHeader);

  // Crea la tabella del calendario
  const table = document.createElement('table');
  table.classList.add('table', 'table-borderless', 'text-center');

  // Intestazione della tabella con i giorni della settimana
  const thead = document.createElement('thead');
  const weekdaysRow = document.createElement('tr');
  weekdays.forEach(day => {
      const th = document.createElement('th');
      th.textContent = day; // Aggiunge il nome del giorno
      weekdaysRow.appendChild(th);
  });
  thead.appendChild(weekdaysRow);
  table.appendChild(thead);

  // Corpo della tabella
  const tbody = document.createElement('tbody');
  let day = 1; // Giorni del mese corrente
  let nextMonthDay = 1; // Giorni del mese successivo

  for (let week = 0; week < 6; week++) {
      const tr = document.createElement('tr'); // Crea una riga per ogni settimana

      for (let weekday = 0; weekday < 7; weekday++) {
          const td = document.createElement('td'); // Crea una cella per ogni giorno

          if (week === 0 && weekday < (firstDayOfMonth || 7) - 1) {
              // Giorni del mese precedente
              td.textContent = lastDateOfPrevMonth - ((firstDayOfMonth || 7) - 2 - weekday);
              td.classList.add('inactive'); // Giorni disattivati
          } else if (day <= lastDateOfMonth) {
              // Giorni del mese corrente
              td.textContent = day;
              td.classList.add(new Date(year, month, day) < today ? 'inactive' : 'active');
              day++;
          } else {
              // Giorni del mese successivo
              td.textContent = nextMonthDay++;
              td.classList.add('inactive');
          }

          tr.appendChild(td); // Aggiungi la cella alla riga
      }
      tbody.appendChild(tr); // Aggiungi la riga alla tabella

      // Interrompi il ciclo quando il mese è completato
      if (day > lastDateOfMonth && nextMonthDay > 7) break;
  }

  table.appendChild(tbody);
  calendarContainer.appendChild(table);

  return calendarContainer; // Restituisce il contenitore del calendario
}

// Aggiungi listener per gestire i tab
[tabDates, tabMonths, tabFlexible].forEach(tab => {
  tab.addEventListener('click', event => {
      // Rimuove lo stato attivo da tutti i tab
      document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
      // Aggiunge lo stato attivo al tab cliccato
      tab.classList.add('active');
      preventEventPropagation(event); // Evita chiusure accidentali
  });
});

// Listener per il menu di check-in
sezioneCheckin.addEventListener('click', event => {
  // Mostra il menu di check-in e chiude gli altri
  toggleMenu(dropdownMenu, [dropdownMenuDove, dropdownChi]);
  populateCalendars(currentDate); // Rigenera i calendari
  preventEventPropagation(event); // Impedisce la chiusura accidentale
});

// Listener per navigare tra i mesi
prevMonthButton.addEventListener('click', event => {
  preventEventPropagation(event); // Evita la propagazione
  changeMonth(-1); // Vai al mese precedente
});
nextMonthButton.addEventListener('click', event => {
  preventEventPropagation(event); // Evita la propagazione
  changeMonth(1); // Vai al mese successivo
});

// Listener per chiudere il menu cliccando fuori
document.addEventListener('click', event => {
  if (!sezioneCheckin.contains(event.target)) {
      dropdownMenu.classList.remove('show'); // Chiude il menu
  }
});

  //-----------SELEZIONE DELLE DATE-------------

  let checkinInput = document.querySelector('#check-in-section input'); // selezione l'input del chekin
  let checkoutInput = document.querySelector('#check-out-section input'); // seleziono l'input del chekput
  let isSelectingCheckin = true; // Flag per sapere se si sta selezionando il check-in o il check-out

  // Funzione per resettare le selezioni sul calendario
  const resetSelections = () => {
    // Rimuovi le classi di selezione da tutte le celle attive
    document.querySelectorAll('.active').forEach((cell) => {
      cell.classList.remove('selected-checkin', 'selected-checkout');
    });
  };

  // Listener per la griglia del calendario
  calendarGrid.addEventListener('click', (event) => {
    let cell = event.target;


    // Previene la chiusura del menu
    event.stopPropagation();

    // Verifica che l'elemento cliccato sia una cella valida del calendario
    if (cell.tagName === 'TD' && !cell.classList.contains('inactive')) {
      let selectedDate = cell.textContent.trim(); // Legge la data selezionata
      let currentMonth = currentDate.getMonth() + 1; // Mese corrente (1-based)
      let currentYear = currentDate.getFullYear(); // Anno corrente

      if (isSelectingCheckin) {
        // Selezione del check-in
        resetSelections(); // Resetta tutte le selezioni precedenti
        cell.classList.add('selected-checkin'); // Evidenzia la data selezionata
        checkinInput.value = `${selectedDate}/${currentMonth}/${currentYear}`; // Aggiorna l'input del check-in
        isSelectingCheckin = false; // Passa alla selezione del check-out
      } else {
        // Selezione del check-out
        if (!cell.classList.contains('selected-checkin')) {
          cell.classList.add('selected-checkout'); // Evidenzia la data selezionata
          checkoutInput.value = `${selectedDate}/${currentMonth}/${currentYear}`; // Aggiorna l'input del check-out

          // Torna alla selezione del check-in
          isSelectingCheckin = true;
        }
      }
    }
  });

  //------------------MENU CHI---------------

  let sezioneChi = document.getElementById('sezione-chi'); // sezione chi
  let dropdownChi = document.querySelector('.chi-dropdown'); // menu chi)

  sezioneChi.addEventListener('click', event => {
    toggleMenu(dropdownChi, [dropdownMenuDove, dropdownMenu]);
    populateCalendars(currentDate);
    preventEventPropagation(event);
  });

  // // Mostra/nascondi il menu a tendina al clic
  // sezioneChi.addEventListener('click', () => {
  //   let isMenuOpen = dropdownChi.classList.contains('show');

  //   // Chiudi il menu se è già aperto
  //   if (isMenuOpen) {
  //     dropdownChi.classList.remove('show');
  //   } else {
  //     dropdownChi.classList.add('show');
  //   }
  // });

  // Chiudi il menu se clicco fuori
  document.addEventListener('click', (event) => {
    if (!sezioneChi.contains(event.target)) {
      dropdownChi.classList.remove('show');
    }
  });

  // calcolo dei pulsanti del modale
  document.querySelectorAll('.counter-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      // Trova il target da aggiornare
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      // Prende il valore corrente
      let currentValue = parseInt(targetElement.textContent, 10);

      // Controlla se il valore corrente è NaN (fallback a 0)
      if (isNaN(currentValue)) {
        currentValue = 0;
      }

      // Aggiorna il valore in base al tipo di pulsante (+ o -)
      if (button.classList.contains('btn-plus')) {
        currentValue++;
      } else if (button.classList.contains('btn-minus') && currentValue > 0) {
        currentValue--;
      }

      // Imposta il nuovo valore
      targetElement.textContent = currentValue;
    });
  });

  // ------------- AGGIORNA CAMPO OSPITI ------------------

    // Seleziona il contatore e l'input della sezione "Ospiti"
    const contatoreAdulti = document.getElementById('bedrooms'); // Contatore "Adulti"
    const inputOspiti = document.querySelector('.ospiti'); // Input "Ospiti"

    // Funzione per sincronizzare l'input con il valore del contatore
    function aggiornaInputOspiti() {
        inputOspiti.value = `Ospiti: ${contatoreAdulti.textContent}`; // Aggiorna l'input
    }

    // Crea un osservatore per rilevare cambiamenti nel contatore
    const osservatore = new MutationObserver(() => {
        aggiornaInputOspiti(); // Aggiorna l'input al cambiamento
    });

    // Configura l'osservatore per monitorare il contenuto del contatore
    osservatore.observe(contatoreAdulti, { childList: true, subtree: true });

    // Inizializza l'input con il valore attuale del contatore
    aggiornaInputOspiti();  
}); //---------------FINE------------------------------



