# Museu Vivo Implementation Plan

**Goal:** Implement the supplied six-room exhibition and emotional support brief, preserving the approved Figma identity.
**Architecture:** React + TypeScript with content separated from interaction. One museum route, calm support route and sources route; desktop ScrollTrigger, mobile scroll-snap, vertical/reduced-motion fallback. No backend or personal data storage.
**Tech Stack:** Vite, React, TypeScript, Tailwind, GSAP, Lucide.
**Spec:** User-supplied Texto colado.txt and Figma zxyDcjBjpF1ftE0CwEI05B.

## Global constraints
- Six rooms: Entrada, Raízes, Escrevivência, Acervo, Vozes, Legado.
- Preserve #F4EFE6, #292921, #783D48, #405549 and Cormorant Garamond / DM Sans.
- Support: Tristeza, Raiva, Medo, Solidão, Não sei dizer. No diagnosis or data collection.
- Visible keyboard focus; reduced motion; vertical reading; mobile swipe.

## Review focus
- Keyboard navigation must not move hidden/offscreen controls into inaccessible areas.
- Nested book carousel must not advance museum rooms.
- Resizing and route changes must clean ScrollTrigger and restore scrolling.
- Long content must remain readable on short screens and mobile.
- Direct links and return from support must restore meaningful navigation.

## Tasks
- [ ] Create content model and test navigation clamping and required feelings.
- [ ] Implement museum navigation, six rooms, book details and timeline.
- [ ] Add desktop scroll choreography, mobile swipe and reading fallback.
- [ ] Implement contextual support, practical guidance and verified sources.
- [ ] Build and validate desktop/mobile/keyboard/reduced-motion; publish the exact checked source.

## Decisions
The supplied brief explicitly requests implementation now; proceed inline without a further design gate. Reuse the Figma's editorial typography and wine poster; add verified images only in the new biography/acervo areas. Keep support educational. Use native browser scrolling, no Lenis. Site publication stays private by default.
