# Tanvi Vipin — Portfolio

React + Vite port of the original single-file `tanvi-portfolio.html`. Same design, colours and copy.

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build into dist/
```

## Structure

- `src/App.jsx` — page composition (ticker → nav → hero/about → skills → work → contact → footer)
- `src/index.css` — colour variables (`--bg`, `--rose`, `--olive`, …), base typography, shared section styles
- `src/components/` — one `.jsx` + matching `.css` per section
- `src/data/content.js` — ticker words, nav links, skills and work entries, so copy edits stay out of the markup
- `src/assets/` — hero portrait, paper texture, star doodle (extracted from the base64 blobs in the original HTML)
- `public/Tanvi_Vipin_Resume.pdf` — served as-is by the nav Resume button

## Placeholders still to fill

The Skills, Work and Contact sections carry the original `[bracketed]` placeholder text. Edit `src/data/content.js`
for skills and work, and `src/components/Contact.jsx` for the contact line and the `SAY HELLO` link target.
