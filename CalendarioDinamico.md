
# Calendario Dinamico in JavaScript

Questo progetto implementa una funzione, `createCalendarMonth`, per generare un calendario dinamico per un mese specifico. La funzione utilizza JavaScript puro per creare una struttura DOM che rappresenta il calendario, comprendendo giorni attivi e inattivi.

---

## Logica di Funzionamento: Spiegazione Dettagliata e Teoria

### 1. Creazione di Nomi di Mesi e Giorni della Settimana
```javascript
const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
```
- **Motivazione**:
  - Gli array vengono utilizzati per evitare hardcoding. Questo approccio migliora la leggibilità del codice e consente una facile localizzazione (ad esempio, traduzione in altre lingue).
- **Teoria**: L'accesso tramite indice rende immediato il recupero del nome corretto per un mese o un giorno.

---

### 2. Estrazione dei Dati Essenziali
```javascript
const year = date.getFullYear();
const month = date.getMonth();
const today = new Date();
const firstDayOfMonth = new Date(year, month, 1).getDay() || 7;
const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
```
- **Motivazione**:
  - I metodi di `Date` vengono utilizzati per estrarre informazioni come l'anno, il mese e i giorni.
- **Spiegazione**:
  - `new Date(year, month, 1).getDay()` restituisce il giorno della settimana (0 per Domenica, 1 per Lunedì). `|| 7` mappa la Domenica a `7` per semplificare i calcoli basati su una settimana che inizia da Lunedì.
  - `new Date(year, month + 1, 0).getDate()` restituisce l'ultimo giorno del mese successivo. Questo trucco sfrutta il fatto che il giorno `0` in una data corrisponde all'ultimo giorno del mese precedente.

---

### 3. Struttura Principale del Calendario
```javascript
const calendarContainer = document.createElement('div');
calendarContainer.classList.add('calendar-month');
```
- **Motivazione**: Creare un contenitore principale per modularità e separazione delle responsabilità.
- **Teoria**: L'uso del DOM dinamico consente di mantenere il calendario indipendente dall'HTML statico. La classe `calendar-month` è un punto di ancoraggio per personalizzazioni CSS.

---

### 4. Intestazione del Calendario
```javascript
const monthHeader = document.createElement('h6');
monthHeader.textContent = `${monthNames[month]} ${year}`;
calendarContainer.appendChild(monthHeader);
```
- **Motivazione**:
  - L'intestazione serve a indicare chiaramente il mese e l'anno rappresentati.
- **Spiegazione Teorica**:
  - Concatenare stringhe con template literals (`${}`) migliora la leggibilità e riduce la complessità rispetto a concatenazioni multiple.

---

### 5. Creazione della Tabella
#### Intestazione dei Giorni
```javascript
const table = document.createElement('table');
table.classList.add('table', 'table-borderless', 'text-center');

const thead = document.createElement('thead');
const weekdaysRow = document.createElement('tr');
weekdays.forEach(day => {
  const th = document.createElement('th');
  th.textContent = day;
  weekdaysRow.appendChild(th);
});
thead.appendChild(weekdaysRow);
table.appendChild(thead);
```
- **Motivazione**: L'intestazione dei giorni della settimana aiuta a orientare visivamente gli utenti.
- **Spiegazione Teorica**:
  - `forEach` è più leggibile di un ciclo `for` tradizionale per iterazioni semplici.
  - Le celle `<th>` sono semanticamente corrette per rappresentare intestazioni di colonne.

---

### 6. Generazione del Corpo del Calendario
#### Logica Dettagliata
```javascript
let day = 1; 
let nextMonthDay = 1;
let started = false;

for (let week = 0; week < 6; week++) {
  const tr = document.createElement('tr');
  for (let weekday = 1; weekday <= 7; weekday++) {
    const td = document.createElement('td');
    if (!started && weekday < firstDayOfMonth) {
      td.textContent = lastDateOfPrevMonth - (firstDayOfMonth - weekday - 1);
      td.classList.add('inactive');
    } else if (day <= lastDateOfMonth) {
      td.textContent = day;
      td.classList.add(new Date(year, month, day) < today ? 'inactive' : 'active');
      day++;
      started = true;
    } else {
      td.textContent = nextMonthDay++;
      td.classList.add('inactive');
    }
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
  if (day > lastDateOfMonth && nextMonthDay > 7) break;
}
```
- **Motivazione**:
  - Riempire la tabella rispettando i giorni di mesi precedenti, correnti e successivi.
- **Teoria del Funzionamento**:
  - **Condizioni per giorni**:
    - `if (!started && weekday < firstDayOfMonth)`: Riempi con i giorni del mese precedente.
    - `else if (day <= lastDateOfMonth)`: Aggiungi i giorni del mese corrente.
    - `else`: Riempi con i giorni del mese successivo.
  - La classe CSS `inactive` è usata per i giorni fuori dal mese corrente.

---

### 7. Restituzione del Calendario
```javascript
table.appendChild(tbody);
calendarContainer.appendChild(table);
return calendarContainer;
```
- **Motivazione**: Restituisce un elemento DOM pronto per essere inserito nell'interfaccia.
- **Teoria**: Questo approccio incapsula la logica del calendario in una funzione riutilizzabile.

---

## Applicazione
### Esempio di Utilizzo
```javascript
const calendar = createCalendarMonth(new Date());
document.body.appendChild(calendar);
```
- **Funzionamento**:
  - Genera un calendario per il mese corrente.
  - Aggiunge il calendario al corpo della pagina HTML.

---

## Conclusioni e Vantaggi

- **Separazione di Concerni**:
  - Struttura HTML, stile CSS e logica JavaScript sono ben distinti.
- **Modularità**:
  - La funzione è indipendente, facilitando il riutilizzo in altri progetti.
- **Teoria delle Best Practices**:
  - Utilizzo di metodi standard del DOM per garantire compatibilità e leggibilità.

### Personalizzazione
- Modifica di `monthNames` e `weekdays` per supportare altre lingue.
- Aggiunta di stili CSS personalizzati alle classi `active` e `inactive`.

