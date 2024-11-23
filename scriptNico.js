document.addEventListener('DOMContentLoaded', () => {
    // Subheader scorrimento
    const subheaderContent = document.getElementById('subheader-content');
    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');
    const itemWidth = subheaderContent.firstElementChild.offsetWidth;
    let scrollPosition = 0;

    // Gestione scorrimento del subheader
    scrollRight.addEventListener('click', () => {
        const maxScroll = subheaderContent.scrollWidth - subheaderContent.offsetWidth;
        scrollPosition += itemWidth * 3;
        scrollPosition = Math.min(scrollPosition, maxScroll);
        subheaderContent.style.transform = `translateX(-${scrollPosition}px)`;
        scrollLeft.style.display = 'block';
    });

    scrollLeft.addEventListener('click', () => {
        scrollPosition -= itemWidth * 3;
        scrollPosition = Math.max(scrollPosition, 0);
        subheaderContent.style.transform = `translateX(-${scrollPosition}px)`;
        if (scrollPosition === 0) {
            scrollLeft.style.display = 'none';
        }
    });

    // Gestione selezione degli oggetti del subheader
    const items = document.querySelectorAll('.subheader-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Gestione scorrimento immagini nella card
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        const imagesContainer = card.querySelector('.images');
        const images = imagesContainer.querySelectorAll('img');
        const dots = card.querySelectorAll('.dots span');
        const prevBtn = card.querySelector('.navigation-btn.left');
        const nextBtn = card.querySelector('.navigation-btn.right');
        let currentIndex = 0;

        function updateCarousel() {
            const offset = currentIndex * -100;
            imagesContainer.style.transform = `translateX(${offset}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
        });
    });

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

    // Scorrimento della mappa e card
    const cardsContainer = document.querySelector(".col-md-8"); // Contenitore delle card
    const footer = document.querySelector("footer"); // Footer
    const mapContainer = document.querySelector(".col-md-4"); // Mappa

    window.addEventListener("scroll", () => {
        const cardsRect = cardsContainer.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Verifica se le card sono finite
        if (cardsRect.bottom <= windowHeight) {
            mapContainer.style.position = "relative"; // Rimuove sticky dalla mappa
            mapContainer.style.top = "auto"; // Reset del top
        } else {
            mapContainer.style.position = "sticky"; // Mantiene la mappa sticky
            mapContainer.style.top = "80px"; // Spazio dal subheader
        }

        // Fa comparire il footer
        if (footerRect.top < windowHeight) {
            footer.style.display = "block"; // Mostra il footer
        }
    });

    // Apertura del modale filtri
    const openFilters = document.getElementById('openFilters');
    const filtersModal = new bootstrap.Modal(document.getElementById('filtersModal'));

    openFilters.addEventListener('click', () => {
        filtersModal.show();
    });
    // Gestione cambio colore per i pulsanti
document.querySelectorAll('.filter-option img').forEach((img) => {
    img.addEventListener('click', () => {
      document.querySelectorAll('.filter-option img').forEach((i) => {
        i.parentElement.classList.remove('selected');
      });
      img.parentElement.classList.add('selected');
    });
  });
  // calcolo dei pulsanti del modale
  document.querySelectorAll('.counter-btnNB').forEach(button => {
    button.addEventListener('click', () => {
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

});