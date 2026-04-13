# Renovation-Project
An Ebay/Creglist Website inspired page for HowmOwners to make requests for ContractWorkers.

## Purpose
This is the main branch. This is where the main project will be.

## Current Version
Currently, it is in a DEMO-G3 phase. An updated, but basic test version showing what the HOMEPAGE and REQUEST_FORM will look like, but with updated techniques learned from Weeks 6-11.

## Current Functionality
Post Requst -> Directs to requestForm.html \
First Contact Button -> Displays Email of Requester \
Filter DropDown -> Options work, but doesn't do anything at the moment \
Search keyword -> Typing works, but doesn't do anything at the moment \
DEMO: Clear Requests -> Clears Requsts Object Database (Removes all Requests)

## How to Run
python3 -m http.server 4040
http://localhost:4040

## Module Map
- main.js — app startup
- api.js — data handling
- state.js — app state + selectors
- render.js — UI rendering
- dom.js — DOM references
- components/RequestCard.js — UI component

## ...

## Component Contract
/*
// Component: RequestCard
// Input: { request, onContact }
// Output: DOM node
// Events: onContact()
// Dependencies: none
*/

