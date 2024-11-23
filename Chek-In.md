
# Logica del Sistema di Check-In con Calendari Dinamici

Questo progetto implementa un sistema interattivo per la gestione dei check-in con calendari dinamici affiancati. Il codice combina gestione degli eventi, manipolazione DOM e logica per la costruzione di interfacce interattive.

---

## Logica di Funzionamento: Spiegazione Dettagliata e Teoria

### 1. Prevenzione della Propagazione degli Eventi
```javascript
function preventEventPropagation(event) {
    event.stopPropagation();
}
```
- **Motivazione**:
  - Impedisce la propagazione di eventi verso elementi genitori, utile per evitare comportamenti non desiderati, come la chiusura di menu durante un clic interno.
- **Teoria**:
  - `stopPropagation` interrompe il bubbling degli eventi, che altrimenti propagherebbero dall'elemento figlio verso l'alto nella gerarchia DOM.

---

### 2. Gestione dei Menu Interattivi
```javascript
function toggleMenu(menu, otherMenus = []) {
    otherMenus.forEach(m => m.classList.remove('show'));
    menu.classList.toggle('show');
}
```
- **Motivazione**:
  - Permette di attivare o disattivare un menu, garantendo che altri menu si chiudano automaticamente.
- **Teoria**:
  - `classList.toggle` alterna la presenza di una classe CSS.
  - La chiusura degli altri menu avviene iterando con `forEach`, garantendo che solo un menu sia visibile.

---

### 3. Cambiamento di Mese
```javascript
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    populateCalendars(currentDate);
}
```
- **Motivazione**:
  - Permette di navigare tra i mesi, aggiornando lo stato e il contenuto dei calendari.
- **Teoria**:
  - `setMonth` modifica il mese nella variabile globale `currentDate`.
  - Dopo l'aggiornamento, `populateCalendars` rigenera i calendari con i nuovi dati.

---

### 4. Generazione dei Calendari
#### Popolamento di Due Calendari Affiancati
```javascript
function populateCalendars(date) {
    calendarGrid.innerHTML = ''; // Cancella il contenuto attuale

    const currentMonth = createCalendarMonth(date);
    const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const nextMonth = createCalendarMonth(nextMonthDate);

    calendarGrid.appendChild(currentMonth);
    calendarGrid.appendChild(nextMonth);
}
```
- **Motivazione**:
  - Mostrare il mese corrente e il successivo, migliorando la visibilità per selezioni future.
- **Spiegazione**:
  - Il contenitore del calendario viene svuotato con `innerHTML = ''`.
  - Si crea il calendario per il mese corrente e il successivo usando `createCalendarMonth`, quindi vengono aggiunti al DOM.

---

#### Creazione di un Calendario Mensile
```javascript
function createCalendarMonth(date) {
    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    ...
    return calendarContainer;
}
```
- **Motivazione**:
  - La funzione genera dinamicamente una struttura DOM per rappresentare un mese.
- **Teoria**:
  - Calcoli come `getDay` e `getDate` sono usati per determinare l'inizio, la fine e i giorni dei mesi precedenti e successivi.
  - L'approccio basato su tabelle consente un layout semantico e facile da personalizzare.

---

### 5. Gestione degli Eventi

#### Attivazione dei Tab
```javascript
[tabDates, tabMonths, tabFlexible].forEach(tab => {
    tab.addEventListener('click', event => {
        document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        preventEventPropagation(event);
    });
});
```
- **Motivazione**:
  - Cambiare lo stato attivo tra più pulsanti di tabulazione.
- **Spiegazione Teorica**:
  - La classe `active` viene aggiunta o rimossa dinamicamente per evidenziare il tab corrente.

---

#### Attivazione del Menu Check-In
```javascript
sezioneCheckin.addEventListener('click', event => {
    toggleMenu(dropdownMenu, [dropdownMenuDove, dropdownChi]);
    populateCalendars(currentDate);
    preventEventPropagation(event);
});
```
- **Motivazione**:
  - Mostrare il menu di check-in e aggiornare i calendari al clic.
- **Teoria**:
  - `toggleMenu` gestisce la visibilità del menu, mentre `populateCalendars` aggiorna dinamicamente il contenuto.

---

#### Navigazione tra i Mesi
```javascript
prevMonthButton.addEventListener('click', event => {
    preventEventPropagation(event);
    changeMonth(-1);
});
nextMonthButton.addEventListener('click', event => {
    preventEventPropagation(event);
    changeMonth(1);
});
```
- **Motivazione**:
  - Consentire la navigazione con pulsanti avanti e indietro.
- **Teoria**:
  - La funzione `changeMonth` aggiorna lo stato globale `currentDate` e rigenera i calendari.

---

#### Chiusura del Menu al Clic Esterno
```javascript
document.addEventListener('click', event => {
    if (!sezioneCheckin.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});
```
- **Motivazione**:
  - Migliorare l'esperienza utente chiudendo il menu quando si clicca fuori.
- **Spiegazione**:
  - `contains` verifica se l'elemento cliccato fa parte della gerarchia del menu.

---

## Conclusioni

Questo sistema utilizza:
- **Gestione degli eventi**: Per migliorare l'interattività.
- **Manipolazione DOM dinamica**: Per generare calendari e gestire stati.
- **Modularità**: Le funzioni possono essere riutilizzate in altri contesti.

### Personalizzazioni
- **Temi**: Le classi CSS `show`, `active` e `inactive` possono essere stilizzate.
- **Localizzazione**: Gli array `monthNames` e `weekdays` possono essere tradotti.
