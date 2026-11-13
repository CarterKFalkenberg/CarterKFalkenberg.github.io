#!/usr/bin/env python3
"""Refresh the static reading shelf from data/books.json; no browser build needed."""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
START = '<!-- Generated reading shelf: scripts/build_books.py -->'
END = '<!-- End generated reading shelf -->'


def e(value):
    return escape(str(value), quote=True)


def build():
    books = json.loads((ROOT / 'data/books.json').read_text())
    ids = [book['id'] for book in books]
    if len(ids) != len(set(ids)):
        raise ValueError('Book IDs must be unique')
    for book in books:
        if book['status'] not in ('reading', 'finished'):
            raise ValueError(f"Unknown status for {book['id']}")
        if book['status'] == 'finished' and not book.get('year'):
            raise ValueError(f"Missing finished year for {book['id']}")
        if not (ROOT / book['cover']).is_file():
            raise ValueError(f"Missing cover for {book['id']}")
        if 'rating' in book and not 0 <= book['rating'] <= 5:
            raise ValueError(f"Rating outside 0–5 for {book['id']}")
    years = sorted({book['year'] for book in books if book['status'] == 'finished'}, reverse=True)
    rows = [START, '''        <div class="reading-heading">
          <h2 id="reading-title" class="section-label">reading</h2>
          <span class="shelf-count" id="shelf-count" aria-live="polite">%s books</span>
        </div>
        <div class="shelf-filters" role="group" aria-label="Reading status">''' % len(books)]
    for status, label in [('reading', 'Reading'), ('finished', 'Finished')]:
        count = sum(book['status'] == status for book in books)
        selected = status == 'finished'
        rows.append(f'          <button type="button" data-filter="{status}"' + (' class="is-selected"' if selected else '') + f' aria-pressed="{str(selected).lower()}" aria-controls="bookshelf">{label} <span>{count}</span></button>')
    rows.extend(['        </div>', '        <div class="year-filters" id="year-filters" role="group" aria-label="Filter finished books by year">'])
    for year in years:
        selected = year == max(years)
        count = sum(book.get('year') == year for book in books)
        rows.append(f'          <button type="button" class="year-filter' + (' is-selected' if selected else '') + f'" data-year="{year}" aria-pressed="{str(selected).lower()}" aria-controls="bookshelf" aria-label="Books finished in {year}">\n            <span class="year-number">{year}</span><span class="year-count">{count} books</span>\n          </button>')
    rows.extend(['        </div>', '        <div class="bookshelf" id="bookshelf" aria-labelledby="reading-title">'])
    for book in books:
        year = f' data-year="{book["year"]}"' if 'year' in book else ''
        rating = book.get('rating')
        badge = ''
        if rating is not None:
            badge = f'<span class="book-rating" aria-label="Rated {rating} out of 5"><span aria-hidden="true">★</span> {rating}<span class="rating-total">/5</span></span>'
        rows.append(f'''          <article class="shelf-book" id="book-{e(book['id'])}" data-status="{book['status']}"{year} data-title="{e(book['title'])}" data-author="{e(book['author'])}" data-genre="{e(book['genre'])}">
            <button type="button" class="book-card" aria-label="{e(book['title'])} by {e(book['author'])}: description and quotes" aria-haspopup="dialog" aria-controls="book-reader" disabled>
              <span class="book-cover" aria-hidden="true"><img src="{e(book['cover'])}" alt="" loading="lazy" decoding="async" /></span>
              <span class="book-card-caption"><span class="book-author">{e(book.get('author_caption', book['author']))}</span>{badge}</span>
            </button>
            <div class="book-note">
              <p class="book-description">{e(book['description'])}</p>''')
        if book.get('quotes'):
            rows.append('              <h3 class="section-label">favorite quotes</h3>\n              <ul class="book-quotes">')
            rows.extend(f'                <li><blockquote><p>{e(quote)}</p></blockquote></li>' for quote in book['quotes'])
            rows.append('              </ul>')
        rows.append('            </div>\n          </article>')
    rows.extend(['        </div>', '        ' + END])
    path = ROOT / 'index.html'
    html = path.read_text()
    if START in html:
        start = html.index(START)
        end = html.index(END, start) + len(END)
    else:
        start = html.index('        <div class="reading-heading">')
        end = html.index('        <dialog class="book-reader"', start)
    path.write_text(html[:start] + '\n'.join(rows) + '\n' + html[end:].lstrip('\n'))
    print(f'Rendered {len(books)} books into index.html')


if __name__ == '__main__':
    build()
