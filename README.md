# Personal Website

A small, responsive personal site built with plain HTML, CSS, and JavaScript. There is no build step or package manager to install.

## Files

- `index.html` — page content and metadata
- `styles.css` — layout, colors, and responsive styles
- `script.js` — small browser-side enhancements
- `favicon.svg` — site icon
- `.github/workflows/pages.yml` — publishes the site to GitHub Pages on pushes to `main`

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

## Publish with GitHub Pages

The Pages workflow is ready to publish this repository. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. After that, pushes to `main` publish the site; the workflow can also be started manually from the **Actions** tab.

## Make it yours

Update the name, introduction, project cards, contact details, page title, and description in `index.html`. Adjust the colors and typography near the top of `styles.css`. Replace the GitHub profile links if your username changes.
