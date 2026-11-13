(() => {
  'use strict';

  const section = document.querySelector('#reading');
  if (!section) return;

  const books = [...section.querySelectorAll('.shelf-book')];
  const statusButtons = [...section.querySelectorAll('[data-filter]')];
  const yearButtons = [...section.querySelectorAll('.year-filter')];
  const years = section.querySelector('#year-filters');
  const count = section.querySelector('#shelf-count');
  const empty = section.querySelector('#shelf-empty');
  const reader = section.querySelector('#book-reader');
  const closeButton = reader.querySelector('.reader-close');
  let openedFrom = null;
  let status = 'reading';
  let year = yearButtons.find(button => button.getAttribute('aria-pressed') === 'true').dataset.year;

  function bookCount(total) {
    return `${total} ${total === 1 ? 'book' : 'books'}`;
  }

  function openBook(book) {
    openedFrom = book.querySelector('.book-card');
    reader.querySelector('#reader-title').textContent = book.dataset.title;
    reader.querySelector('#reader-byline').textContent = [book.dataset.author, book.dataset.genre, book.dataset.year].filter(Boolean).join(' · ');
    reader.querySelector('#reader-rating').textContent = book.querySelector('.book-rating')?.getAttribute('aria-label') || 'Currently reading';
    reader.querySelector('#reader-cover').replaceChildren(book.querySelector('.book-cover').cloneNode(true));
    reader.querySelector('#reader-content').replaceChildren(book.querySelector('.book-note').cloneNode(true));
    document.documentElement.classList.add('book-reader-open');
    reader.scrollTop = 0;
    if (!reader.open) reader.showModal();
  }

  // Keep the source descriptions readable if JavaScript or dialog support is unavailable.
  if (typeof reader.showModal === 'function') {
    section.classList.add('shelf-enhanced');
    books.forEach(book => {
      const button = book.querySelector('.book-card');
      button.disabled = false;
      button.addEventListener('click', () => openBook(book));
    });
  }
  closeButton.addEventListener('click', () => reader.close());
  reader.addEventListener('close', () => {
    document.documentElement.classList.remove('book-reader-open');
    openedFrom?.focus({ preventScroll: true });
  });
  reader.addEventListener('click', event => {
    if (event.target !== reader) return;
    const bounds = reader.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) reader.close();
  });

  function renderShelf() {
    statusButtons.forEach(button => {
      const selected = button.dataset.filter === status;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('span').textContent = books.filter(book => book.dataset.status === button.dataset.filter).length;
    });
    years.hidden = status !== 'finished';
    yearButtons.forEach(button => {
      const selected = button.dataset.year === year;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      const total = books.filter(book => book.dataset.status === 'finished' && book.dataset.year === button.dataset.year).length;
      button.querySelector('.year-count').textContent = bookCount(total);
    });

    let visible = 0;
    books.forEach(book => {
      book.hidden = book.dataset.status !== status || (status === 'finished' && book.dataset.year !== year);
      if (!book.hidden) visible++;
    });
    count.textContent = bookCount(visible);
    empty.hidden = visible !== 0;
  }

  statusButtons.forEach(button => button.addEventListener('click', () => {
    status = button.dataset.filter;
    renderShelf();
  }));
  yearButtons.forEach(button => button.addEventListener('click', () => {
    year = button.dataset.year;
    renderShelf();
  }));

  // A saved book link selects its status and year before opening its quotes.
  function revealLinkedBook() {
    const book = books.find(book => `#${book.id}` === location.hash);
    if (!book) return;
    status = book.dataset.status;
    if (status === 'finished') year = book.dataset.year;
    renderShelf();
    book.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (typeof reader.showModal === 'function') openBook(book);
  }

  window.addEventListener('hashchange', revealLinkedBook);
  renderShelf();
  revealLinkedBook();
})();
