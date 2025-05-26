---
'sveltekit-embed': patch
---

feat: Enhance Bluesky component with unique iframe IDs and height
adjustment logic

- Implemented unique ID generation for each iframe instance to ensure
  proper height updates.
- Updated message handling to only adjust height for the specific
  iframe that sent the message.
- Added comprehensive tests to verify functionality for multiple
  instances and edge cases, ensuring robustness in height adjustments
  and iframe identification.
