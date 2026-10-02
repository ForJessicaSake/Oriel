# Oriel

A small contemporary gallery site. See the current exhibition, look through the works, and keep a shortlist in the browser.

No database, accounts, or admin. The works are static, and the shortlist stays in `localStorage`.

## Tools

- [Next.js](https://nextjs.org) 16, App Router, `next/image`, `next/font`
- React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- pnpm
- ESLint (`eslint-config-next`)
- Fonts: DM Serif Display and Inter
- Photographs from [Unsplash](https://unsplash.com/license)

Motion is written in CSS. There is no animation library.

## Animation

Easing is `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion` turns the movement off.

- Headline words clip up into place
- The page enters with a short rise
- Pictures uncover with a wipe, then scale slightly on hover
- Sections reveal on scroll, with a blur that clears
- The exhibition room swaps when you change shows
- The shortlist count pops when it changes
- The nav link draws an underline
- A custom cursor follows the pointer on fine pointers, and stays off on touch

```bash
pnpm dev
```
