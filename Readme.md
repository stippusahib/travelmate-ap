 TravelMate – Unified Smart Travel Assistant

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20On-Vercel-black)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

 **Live Demo (MVP):** [https://travelmate-ap.vercel.app/](https://travelmate-ap.vercel.app/)

---

##  Project Overview

**The Problem:**
Travel in regions with fragmented transport networks (buses, trains, flights, rideshares) is frustrating. Users must juggle multiple apps, often missing connections or wasting money/time.

**The Solution:**
TravelMate provides a **single interface** that integrates direct and connected journeys. Users can search, filter (eco-friendly), and sort (fastest/cheapest) in one responsive web app.

This hackathon project showcases:

* **End-to-End lifecycle** – idea → code → live deployment.
* **Smart search UX** – autocomplete, swap locations, date picker.
* **Connected trips** – beyond direct routes.
* **Modern design** – dark/light mode, card layout, responsive.

---

##  Features

*  **Smart Search** with autocomplete, date picker, swap button.
*  **Connected Journeys** (multi-leg).
*  **Results Display** with provider logos, cost/time, and “Book Now” CTA.
*  **Sorting & Filters** – fastest, cheapest, eco-friendly.
*  **Light/Dark Mode Toggle**.
*  **Responsive UI** using Breeze theme styling. 
*  **Smart Search** with autocomplete, date picker, swap button.
*  **Connected Journeys** (multi-leg).
*  **Results Display** with provider logos, cost/time, and “Book Now” CTA.
*  **Sorting & Filters** – fastest, cheapest, eco-friendly.
*  **Light/Dark Mode Toggle**.
*  **Responsive UI** using Breeze theme styling.
*  **Community Suggestions** – A brand-new, beautifully designed section below the search results showing dummy data for user-reported trips. These cards have a distinct look and include a **“Show Details”** button that smoothly expands to show more information.
*  **FAQ Section** – A clean, professional, and interactive FAQ section with an accordion-style layout where users can click each question to reveal the answer.
*  **Professional Footer** – A sleek footer now appears at the bottom of the page.

---

##  Tech Stack & Libraries

* **Frontend:** React (CRA bootstrap, functional components, hooks).
* **Styling:** CSS (custom + Breeze theme).
* **Routing & State:** React hooks (`useState`, `useEffect`, `useMemo`, `useRef`).
* **Data:** Local `data.json` (mock routes & journeys).
* **Deployment:** Vercel.

**Key Dependencies (from `package.json`):**

* `react`
* `react-dom`
* `react-scripts`
* (Plus dev tooling from Create React App).

---

##  Repository Structure

```
travelmate-ap/
├── public/
│   ├── bus.png
│   ├── favicon.ico
│   ├── index.html
│   ├── logo.png
│   ├── manifest.json
│   ├── metro.png
│   ├── plane.png
│   ├── robots.txt
│   ├── train.png
│   └── uber.png
│
├── src/
│   ├── components/
│   │   ├── MultiLegResultCard.js
│   │   ├── ResultCard.js
│   │   ├── ResultsDisplay.js
│   │   └── SearchForm.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.js
│   ├── data.json
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```


### Prerequisites

* Node.js (v14+)
* npm (v6+)

### Setup

```bash
# Clone the repo
git clone https://github.com/stippusahib/travelmate-ap.git
cd travelmate-ap

# Install dependencies
npm install

# Start local dev server
npm start
```

* Opens at `http://localhost:3000`
* Build for production: `npm run build`


 Commit History

This project has **81 commits** showing a real development journey.

 Key Highlights

* **Core Features:** Added components (SearchForm, ResultCard, MultiLegResultCard, ResultsDisplay).
* **Styling & UI:** Multiple CSS refinements (dark mode, layout tweaks).
* **Data Layer:** Introduced and updated `data.json`.
* **Collaboration:** Contributions via PRs from teammates (`Krishna217217`, `Rishitaa22`).
* **Repo Cleanup:** Removed default CRA logos/assets, renamed icons.

### Full Commit Log (latest → oldest)

| **Commit ID** | **Message** |
| :------------ | :------------------------------------------------------------------- |
| 5b04c96       | Update App.css                                                       |
| 50c1be7       | Update App.jsx                                                       |
| 0818767       | Update App.css                                                       |
| a81e688       | Update App.jsx                                                       |
| 294f466       | Update manifest.json                                                 |
| e677300       | Update App.css                                                       |
| df3b346       | Update App.jsx                                                       |
| f420acd       | Update App.css                                                       |
| 4181b12       | Update App.jsx                                                       |
| 698ad3b       | Update App.css                                                       |
| 50b9f0a       | Update App.jsx                                                       |
| 26b894e       | Update index.html                                                    |
| e870f0d       | Update index.html                                                    |
| 8cac662       | Rename android-chrome-512x512.png to logo512.png                     |
| b56449f       | Rename android-chrome-192x192.png to logo192.png                     |
| 839987d       | Add files via upload                                                 |
| 41698e0       | Delete public/favicon.ico                                            |
| 7cab7f0       | Update manifest.json                                                 |
| f090217       | Update index.html                                                    |
| 856ffb9       | Delete README.md                                                     |
| 1fa1984       | Create Readme.md                                                     |
| 205f76c       | Update App.css                                                       |
| 71101d5       | Update App.jsx                                                       |
| c533b16       | Add files via upload                                                 |
| 34002b3       | Rename favicon.ico.png to favicon.ico                                |
| 98faa3e       | Add files via upload                                                 |
| 8e31f83       | Add files via upload                                                 |
| 4248940       | Delete public/favicon.ico                                            |
| 2295442       | Update App.jsx                                                       |
| 8ed8ae1       | Update App.css                                                       |
| c02121c       | Update App.css                                                       |
| 67551d7       | Update App.jsx                                                       |
| b8eec43       | Rename car.png to uber.png                                           |
| 7c4a9cf       | Add files via upload                                                 |
| 6632618       | Update App.css                                                       |
| f4671bf       | Update App.jsx                                                       |
| 2aa075b       | Update App.jsx                                                       |
| 2dad66b       | Merge pull request #8 from Krishna217217/patch-4                     |
| 3f6cd10       | Update data.json                                                     |
| bfd5f5a       | Delete public/uber.png                                               |
| 0656d1e       | Update App.jsx                                                       |
| 8012dda       | Merge branch 'main' of https://github.com/stippusahib/travelmate-ap  |
| a716234       | donee                                                                |
| b0226e9       | Update App.jsx                                                       |
| f3da88c       | Update App.css                                                       |
| 6687033       | Update App.css                                                       |
| 5e3ae03       | Update App.jsx                                                       |
| 842e5fa       | Merge pull request #7 from Krishna217217/patch-3                     |
| 92e3b3a       | Update data.json                                                     |
| 9d7b1e9       | Update App.css                                                       |
| 541345c       | Update App.jsx                                                       |
| 71c99c9       | Update App.css                                                       |
| 09186e6       | Update App.jsx                                                       |
| a0df815       | Update App.css                                                       |
| e56b48c       | Update App.jsx                                                       |
| 5912380       | Update App.jsx                                                       |
| 871736c       | Update App.jsx                                                       |
| 1ecc822       | Update App.css                                                       |
| 9f3e988       | Update App.css                                                       |
| 5deaa58       | Update App.css                                                       |
| 9b0ce60       | Update App.jsx                                                       |
| 781511a       | Update App.css                                                       |
| d4cfddd       | Update App.jsx                                                       |
| 2c02c7e       | Update App.css                                                       |
| 52fd8c4       | Update App.jsx                                                       |
| 802df35       | Update App.css                                                       |
| 5af7c47       | Update App.jsx                                                       |
| 6a729de       | done                                                                 |
| d30d93e       | Update App.css                                                       |
| 871b2b2       | Add files via upload                                                 |
| b9ab69c       | Delete public/logo512.png                                            |
| 74ba61c       | Delete public/logo192.png                                            |
| 06ff8de       | Delete src/logo.svg                                                  |
| a21f22d       | Merge branch 'main' of https://github.com/stippusahib/travelmate-ap  |
| db13d28       | app.jsx updated                                                      |
| f1bfd8a       | Update data.json                                                     |
| 7c77a63       | Update App.css                                                       |
| 2f1d9df       | Merge pull request #6 from Krishna217217/patch-2                     |
| e61c775       | Create data.json                                                     |
| 6739d7c       | Merge pull request #3 from Rishitaa22/patch-2                        |
| 604fa87       | Merge pull request #4 from Rishitaa22/patch-3                        |
| 95c46c5       | Merge pull request #5 from Rishitaa22/patch-4                        |
| 5e7c350       | Create SearchForm.js                                                 |
| caae3b9       | Create ResultsDisplay.js                                             |
| a3545e3       | Merge pull request #2 from Krishna217217/patch-1                     |
| 09b668e       | Create ResultCard.js                                                 |
| c864871       | Merge pull request #1 from Rishitaa22/patch-1                        |
| 4024191       | Update package.json                                                  |
| f6cb7b7       | Create MultiLegResultCard.js                                         |
| 3d677f3       | Initialize project using Create React App                            |


 Deployment

* **Platform:** Vercel
* **Branch:** `main` (auto-deployed)
* **Live URL:** [https://travelmate-ap.vercel.app/](https://travelmate-ap.vercel.app/)



 Future Scope

* Integrate real APIs (IRCTC, RedBus, Uber/Ola, flight APIs).
* Backend (Supabase/Postgres) for journeys & user data.
* Authentication & personalized dashboards.
* AI-powered recommendations (cost, time, eco score).
* Offline/PWA mode.



 Contributors

* Tippu Sahib ([@stippusahib](https://github.com/stippusahib))
* Krishna217217 ([@Krishna217217](https://github.com/Krishna217217))
* Rishitaa22 ([@Rishitaa22](https://github.com/Rishitaa22))
* Alfievarghese ([@Alfievarghese](https://github.com/Alfievarghese))

 License

This project is licensed under Mandi Masala Team.
Use or production of this code or idea without written perimission is not allowed.
