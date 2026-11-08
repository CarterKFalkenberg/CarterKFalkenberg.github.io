(() => {
  'use strict';

  const books = {
    lumen: { title: 'Lumen et Umbra', cover: 'Lumen<br>et Umbra', author: 'Elias Vale', note: 'A quiet reminder to pay attention. The kind of book that feels a little different every time you return to it.' },
    orbis: { title: 'Orbis Alius', cover: 'Orbis<br>Alius', author: 'Ada Laurent', note: 'A window into a world I’d walked past without noticing. It left me with better questions than the ones I started with.' },
    ars: { title: 'Ars Vivendi', cover: 'Ars<br>Vivendi', author: 'Lucia Venn', note: 'On living deliberately, staying curious, and finding enough in the everyday. Plenty of underlines in this one.' },
    noctis: { title: 'Noctis Silvarum', cover: 'Noctis<br>Silvarum', author: 'Theo Arden', note: 'A strange little world, beautifully built. I finished the story and immediately missed being inside it.' },
    tempus: { title: 'Tempus Fugit', cover: 'Tempus<br>Fugit', author: 'Milo West', note: 'The “one more chapter” book that turned into a very late night. Every answer opens another door.' },
  };
  const section = document.querySelector('#reading');
  if (!section) return;

  const choices = [...section.querySelectorAll('.book-choice')];
  const worm = section.querySelector('.bookworm');
  const answer = section.querySelector('.book-answer');
  const cover = section.querySelector('.featured-cover');
  const filters = [...section.querySelectorAll('[data-filter]')];
  const shelfBooks = [...section.querySelectorAll('.shelf-book')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = choices[0];
  let currentAnimation;
  let coverAnimation;
  let wormTimer;

  function positionWorm() {
    worm.style.transform = `translateY(${selected.offsetTop + (selected.offsetHeight - worm.offsetHeight) / 2}px)`;
  }

  function pickBook(button) {
    if (selected === button) return;
    selected = button;
    choices.forEach(choice => {
      const active = choice === button;
      choice.classList.toggle('is-selected', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    positionWorm();
    clearTimeout(wormTimer);
    worm.classList.remove('is-travelling');
    // Restart the small wiggle even when a visitor changes their mind mid-hop.
    void worm.offsetWidth;
    worm.classList.add('is-travelling');
    wormTimer = setTimeout(() => worm.classList.remove('is-travelling'), 580);

    const book = books[button.dataset.pick];
    cover.className = `featured-cover cover-${button.dataset.pick}`;
    cover.querySelector('.cover-title').innerHTML = book.cover;
    cover.querySelector('.cover-author').textContent = book.author.toUpperCase();
    section.querySelector('#featured-title').textContent = book.title;
    section.querySelector('#featured-author').textContent = book.author;
    section.querySelector('#featured-note').textContent = book.note;
    section.querySelector('#shelf-link').href = `#book-${button.dataset.pick}`;

    currentAnimation?.cancel();
    coverAnimation?.cancel();
    if (!reducedMotion.matches && answer.animate) {
      currentAnimation = answer.animate([
        { opacity: 0, transform: 'translateY(9px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 420, easing: 'cubic-bezier(.22, 1, .36, 1)' });
      coverAnimation = cover.animate([
        { transform: 'rotate(2deg) translateY(4px)' },
        { transform: 'rotate(-4deg) translateY(0)' },
      ], { duration: 580, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    }
  }

  function filterShelf(value) {
    filters.forEach(button => {
      const active = button.dataset.filter === value;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    shelfBooks.forEach(book => {
      book.hidden = value !== 'all' && book.dataset.status !== value;
      if (!book.hidden) visible++;
    });
    section.querySelector('#shelf-count').textContent = `${visible} ${visible === 1 ? 'book' : 'books'}`;
  }

  choices.forEach(button => {
    button.setAttribute('aria-controls', 'book-answer');
    button.addEventListener('click', () => pickBook(button));
  });
  filters.forEach(button => {
    button.querySelector('span').textContent = shelfBooks.filter(book => button.dataset.filter === 'all' || book.dataset.status === button.dataset.filter).length;
  });
  filters.forEach(button => button.addEventListener('click', () => filterShelf(button.dataset.filter)));
  section.querySelector('#shelf-link').addEventListener('click', event => {
    event.preventDefault();
    filterShelf('all');
    const target = document.getElementById(`book-${selected.dataset.pick}`);
    target.open = true;
    target.querySelector('summary').focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
    history.replaceState(null, '', `#${target.id}`);
  });

  // Direct links to a title should reveal its note as well.
  function revealHash() {
    const target = shelfBooks.find(book => `#${book.id}` === location.hash);
    if (target) {
      filterShelf('all');
      target.open = true;
    }
  }
  window.addEventListener('hashchange', revealHash);
  window.addEventListener('resize', positionWorm);
  document.fonts?.ready.then(positionWorm);
  positionWorm();
  filterShelf('all');
  revealHash();
})();
