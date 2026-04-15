# Renovation-Project
---
## Purpose
An eBay/Craigslist-inspired website for homeowners to post renovation requests for contractors.

## Branch
This is the main branch. This is where the main project will be.

## Current Version
This is a demo version showcasing the homepage and request form, incorporating concepts from Weeks 6–11 such as component-based rendering, state management, API handling, and `IndexedDB` persistence.

## Current Functionality
Post Request → Redirects to requestForm.html  
Form Submission → Saves request (with images) to IndexedDB  
Contact Button → Displays requester email  
Filter Dropdown → Filters requests by category  
Search Keyword → Filters requests by title/description  
Retry Button → Reloads data on API error  
Clear Requests → Clears IndexedDB (demo feature) 

Search and filter update results dynamically without page reload using state-driven rendering.

## How to Run
python3 -m http.server 4040 \
http://localhost:4040

## Module Map
- `main.js` — initializes app and wires event listeners
- `api.js` — handles data fetching, validation, and IndexedDB utilities
- `state.js` — stores global state and provides filtering/sorting selectors
- `render.js` — renders UI based on current state
- `dom.js` — centralizes DOM element references
- `components/RequestCard.js` — reusable UI component for displaying a request
- `app.js` — handles IndexedDB setup and form submission logic

## Technologies
- JavaScript (ES Modules)
- `IndexedDB` (browser storage)
  - Will try to replace this for final demo
- Fetch API
- HTML/CSS

## Component Contract
~~~
/*
// Component: RequestCard
// Input: { request, onContact }
// Output: DOM node
// Events: onContact()
// Dependencies: none
*/
~~~

## Data Handling Design

This project intentionally separates two data sources:

- The homepage uses `api.js` to fetch requests from `requests.json` (simulating a backend API).
- The request form uses `IndexedDB` (in `app.js`) to demonstrate client-side persistence.

This separation is intentional for demonstration purposes:
- API layer → shows async fetch, validation, and error handling
- `IndexedDB` → shows browser-based storage and file/image handling

In a full production version, these would be integrated into a single data flow.