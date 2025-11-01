# Gifly (GifFeedbackApp)

Compact demo app to search GIFs, view details, and save per-GIF feedback (star + comment) stored locally.

Summary
- Purpose: GIF search + per-item feedback stored locally for demo/testing.
- Entry: App.tsx
- Key files:
 -  src/screens/splash/SplashScreen.tsx
  - src/screens/home/HomeScreen.tsx 
  - src/components/SearchBar.tsx
  - src/components/GifCard.tsx 
  - src/components/StarRating.tsx 
  - src/hooks/useGifs.ts — search, pagination, refresh logic
  - src/api/giphyApi.ts — Giphy requests
  - Feedback persisted locally as feedback_<gifId>

How to run (Windows)
1. Install dependencies:
   - npm install
2. Start the app:
   - Run on device/emulator: npm run android or npm run ios (or scan QR if configured)

How to test (manual)
1. Open the app and wait for Home.
2. Search: type in the search field (debounced, default 500ms). Search runs for trimmed queries length >= 3; empty clears results.
3. Tap a GIF to open the Feedback screen. Select stars, add an optional comment, submit. Feedback is saved locally under key feedback_<gifId>.
4. Pagination & refresh: scroll to load more results; pull-to-refresh reloads the list.

Reasoning behind the approach
- Small, focused layers: API layer, data hook, and minimal reusable UI components for maintainability.
- Debounced search + minimum query length to reduce requests and improve UX.
- Local per-item persistence avoids backend complexity for a demo; keys use the GIF id for direct lookup.
- Pagination via limit/offset supports infinite scroll with bounded payloads.

Assumptions
- Demo scope: API key may be present in code for convenience (not production-secure).
- No authentication; feedback is local to the device.
- Search threshold of 3 characters chosen to reduce noisy queries.
- Page size tuned for demo usability, not heavy production traffic.

Total time taken — Total: 6.0 hours
- Giphy API integration: 0.5h
- Data hook (pagination, search): 1.0h
- Home screen list + refresh: 1.0h
- SearchBar (debounce & UX): 0.5h
- Feedback screen (load/save persistence): 1.5h
- StarRating & GifCard UI: 0.5h
- Navigation & wiring: 1.0h

Which parts relied on web searches
- Confirmed Giphy endpoints, query parameters and response fields used by src/api/giphyApi.ts.  
- Validated persistence patterns and key strategy for per-item storage.  
- Checked navigation typing and screen/param wiring for correct routing.  
- Reviewed GIF rendering and memory/performance tips for the list items.  
- Reviewed debounce and cancellation best practices for the SearchBar.  
- Applied architecture best practices: separation of concerns, single-responsibility components, hooks for data logic.