# Personal Website

A small personal site built with plain HTML and CSS. It has no build step or dependencies.

The design takes its cue from [Sean Goedecke's website](https://www.seangoedecke.com/): a narrow text column, charcoal background, serif body text, a bold name heading, and pale blue links. This homepage focuses on an introduction, selected projects, and a GitHub link. Descriptive copy and project titles remain Lorem Ipsum placeholders.

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
