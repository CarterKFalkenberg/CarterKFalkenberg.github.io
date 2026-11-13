# Personal Website

A small personal site built with plain HTML, CSS, and JavaScript. It has no build step or dependencies.

The design takes its cue from [Sean Goedecke's website](https://www.seangoedecke.com/): a narrow text column, charcoal background, serif body text, a bold name heading, and pale blue links. This homepage includes an introduction, selected projects, writing, an interactive reading shelf, and a GitHub link. Descriptive copy, project titles, writing, and books remain placeholders.

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

The reading section uses `reading.css` and `reading.js`, keeping the original site's dark, text-first layout. It includes seven clearly marked sample books in a grid of illustrated cover cards, Reading and Finished filters, and ratings. Clicking a cover opens a native dialog with its one-sentence description and optional favorite quotes; Escape, the close button, or the backdrop dismisses it and restores focus to the cover. Finished books are filtered by circular 2025/2026 selectors, defaulting to 2026. Saved `#book-…` links select the correct status and year and open the book. Keyboard controls and reduced-motion preferences are supported; all books and quotes remain readable inline without JavaScript.

Replace the sample books, descriptions, and quotes in `index.html` with real content. Each book has a `data-status` of `reading` or `finished`; finished books also have a `data-year` matching a year selector. Omit the favorite-quotes heading and list when a book has no quotes. All filter counts are calculated from the book entries. Add another `.year-filter` button to support a new year and use `aria-pressed="true"` to choose the default year.

## Writing section

The writing section has three sample pieces in `index.html`, each with a title, short description, essay/note label, and expandable body. Replace the placeholder text with your own writing. It uses native HTML disclosure controls, so reading and keyboard navigation work without JavaScript. Its layout is in `styles.css`, and its heading shares the site's section label style.
