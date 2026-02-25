# portfolio-website
# Nileshkumar Sharma – Personal Portfolio

A responsive, modern portfolio website for a Front-End Developer and CS student. Built with **HTML**, **CSS**, and **Vanilla JavaScript**—no frameworks.

## Features

- **Responsive navbar** with smooth scroll, mobile hamburger menu, and active link highlight
- **Hero section** with gradient background and call-to-action
- **About** section with education and career objective
- **Skills** section with animated progress bars (HTML, CSS, JavaScript, Git, Responsive Design)
- **Projects** section with 3 project cards (placeholder links; replace with your own)
- **Contact form** with client-side validation (name, email, message)
- **Dark / Light mode** toggle with preference saved in `localStorage`
- **Scroll animations** (fade-in) and hover effects on cards and buttons
- **Footer** with social links and copyright

## Folder Structure

```
portfolio/
├── index.html          # Single-page structure (all sections)
├── css/
│   └── style.css       # All styles, variables, responsive layout
├── js/
│   └── main.js         # Navbar, theme, form validation, scroll effects
├── assets/
│   └── images/         # Place project screenshots or images here
└── README.md           # This file
```

## How to Run

1. Clone or download this folder.
2. Open `index.html` in a browser (double-click or use **File → Open**).
3. Or run a local server, for example:
   - **VS Code:** Install “Live Server” and right-click `index.html` → “Open with Live Server”.
   - **Node:** `npx serve .` from the `portfolio` folder.
   - **Python:** `python -m http.server 8000` from the `portfolio` folder, then visit `http://localhost:8000`.

## Customization

- **Personal info:** Edit name, role, tagline, bio, education, and career objective in `index.html`.
- **Skills:** Change labels and `data-level` values in the `.skill-card` elements in `index.html`.
- **Projects:** Replace placeholder text, add real project images in `assets/images/`, and set `href` for “Live Demo” and “GitHub” buttons.
- **Contact:** Form is front-end only; connect it to your backend or a service (e.g. Formspree, Netlify Forms) for real submissions.
- **Theme:** Colors and fonts are controlled by CSS variables in `css/style.css` (`:root` and `[data-theme="dark"]`).

## Tech Stack

- HTML5 (semantic sections)
- CSS3 (Flexbox, Grid, custom properties, transitions, media queries)
- Vanilla JavaScript (no dependencies)
- Google Fonts: Outfit (body), Playfair Display (headings)

## Browser Support

Works in modern browsers (Chrome, Firefox, Safari, Edge). Uses `backdrop-filter` for navbar blur; fallback is solid background.

---

**Nileshkumar Sharma** – Front-End Developer | CS Student
