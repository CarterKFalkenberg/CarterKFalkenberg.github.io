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
  let status = 'reading';
  let year = yearButtons.find(button => button.getAttribute('aria-pressed') === 'true').dataset.year;

  function bookCount(total) {
    return `${total} ${total === 1 ? 'book' : 'books'}`;
  }

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
    book.open = true;
    book.querySelector('summary').focus({ preventScroll: true });
    book.scrollIntoView({ block: 'start', behavior: 'instant' });
  }

  window.addEventListener('hashchange', revealLinkedBook);
  renderShelf();
  revealLinkedBook();
})();
