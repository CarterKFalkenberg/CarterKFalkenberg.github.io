# Personal Website

A small personal site built with plain HTML, CSS, and JavaScript. It has no build step or dependencies.

The design takes its cue from [Sean Goedecke's website](https://www.seangoedecke.com/): a narrow text column, charcoal background, serif body text, a bold name heading, and pale blue links. This homepage includes an introduction, selected projects, an interactive reading shelf, and a GitHub link. Descriptive copy, project titles, and books remain placeholders.

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

The reading section uses `reading.css` and `reading.js`, keeping the original site's dark, text-first layout. It includes seven clearly marked sample books, reading/finished filters, ratings, and expandable notes. The sentence picker animates a little bookworm to the selected recommendation and links directly to its shelf note. Keyboard controls and reduced-motion preferences are supported; the catalog and notes also work without JavaScript.

Replace the sample shelf entries in `index.html` and the five recommendation records at the top of `reading.js` with real books. Keep each recommendation key matched to its shelf entry's `book-` ID and cover class. Filter counts are calculated from shelf entries when JavaScript is available.
