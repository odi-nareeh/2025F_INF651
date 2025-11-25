# 2025F_INF651
interactive web application
# Interactive Web Application — Final Project

## Overview
This project demonstrates front-end JavaScript concepts covered in the course:
- Event handling (click, input, submit)
- DOM manipulation (rendering product list, cart updates)
- Conditional logic and loops (filtering, sorting, cart aggregation)
- Data handling with arrays/objects and modular code (IIFE modules)
- Reusable functions and separation of concerns

## Files
- `index.html` — main HTML file (links `styles.css` and `script.js`)
- `styles.css` — styling and responsive rules
- `script.js` — modular JavaScript (ProductModule, CartModule, Utils, App)

## How to run locally
1. Place `index.html`, `styles.css`, and `script.js` in the same folder.
2. Ensure the three image files are present at the listed local paths or update the `src` paths in `index.html`.
3. Open `index.html` in a browser (Chrome/Firefox recommended).
   

## Implementation notes
- JavaScript structure uses IIFE modules for encapsulation and to keep state private.
- DOM updates are minimal and batched by re-rendering the affected lists.
- Form validation is performed live and on-submit; the form simulates a send and then resets.
- Code is intentionally readable and commented for graders.

## Submission checklist (for Blackboard / GitHub)
Before submission, include the following in your GitHub repo or ZIP:
- All source files: `index.html`, `styles.css`, `app.js`.
- README.md with run instructions (this file).
- `submission.pdf` — a short PDF (8 pages) summarizing features, JS concepts used, challenges, and possible enhancements.
- A single ZIP or GitHub link to the repository..

### Grading mapping
- Functionality: interactive product filtering, cart (add/remove), checkout demo, contact form.
- JavaScript Usage: events, DOM manipulation, loops, conditional logic, arrays/objects, modular code.
- User Experience: responsive layout, clear controls, accessible labels and ARIA `aria-live` for product updates.
- Planning & Documentation: README + submission PDF should explain design choices.
- Code Quality: modular, readable, small utility helpers.


