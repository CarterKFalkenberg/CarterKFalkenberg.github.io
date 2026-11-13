# Personal Website

A small personal site built with plain HTML, CSS, and JavaScript. It has no build step or dependencies.

The design takes its cue from [Sean Goedecke's website](https://www.seangoedecke.com/): a narrow text column, charcoal background, serif body text, a bold name heading, and pale blue links. This homepage includes an introduction, selected projects, writing, an interactive reading shelf, and a GitHub link. Descriptive copy, project titles, and writing remain placeholders; the reading shelf contains real books.

## Preview locally

From this folder, run:

```sh
/usr/bin/python3 -m http.server 8000 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8000> in a browser. You can also open `index.html` directly. No package installation is needed.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the site to GitHub Pages on pushes to `main`. The repository is configured to use GitHub Actions as its Pages source.

## Make it yours

Replace the Lorem Ipsum text and project names in `index.html`. Adjust the basic layout and colors in `styles.css`.

## Reading section

The reading section uses `reading.css` and `reading.js`. The catalog contains 40 books supplied from Goodreads screenshots: 5 currently reading, 19 finished in 2025, and 16 finished in 2026. The cards use locally hosted cover images in `assets/books/`, preserving each image’s proportions. Only ratings explicitly visible in the supplied screenshots are included; favorite quotes are empty until supplied.

Clicking a cover opens a native dialog with its one-sentence description and any favorite quotes. Escape, the close button, or the backdrop dismisses it and restores focus to the cover. The shelf opens on Reading; switching to Finished shows the latest year (currently 2026), with compact horizontal year pills. Saved `#book-…` links select the correct status and year and open the book. All descriptions and quotes remain readable inline without JavaScript.

Edit `data/books.json` to maintain the catalog. Each record includes a unique ID, title, author, genre, status, cover path, one-sentence description, and quotes array. Finished books have a year; ratings and abbreviated author captions are optional. Source links record the book and cover provenance and are not fetched by visitors. Add a local cover asset, then regenerate the static shelf and filter counts:

```sh
/usr/bin/python3 scripts/build_books.py
```

Commit the catalog, generated `index.html`, and cover assets together. The site itself still needs no build step or dependencies.

## Writing section

The writing section has three sample pieces in `index.html`, each with a title, short description, essay/note label, and expandable body. Replace the placeholder text with your own writing. It uses native HTML disclosure controls, so reading and keyboard navigation work without JavaScript. Its layout is in `styles.css`, and its heading shares the site's section label style.
