# Saad’s Accord (one-page mods site)

## What this is
A simple, fast, dark one-page website with:
- A header (title + bio)
- A grid of mod cards (image + video title + mod name)
- When you click a card, it asks which link to open (Amazon / eBay / AliExpress, etc.)
- Social icons (replace links later)

## Edit your mods
Open `mods.js` and replace the example items.

Each mod supports multiple links:
```js
{
  image: "assets/mod-01.jpg",
  videoTitle: "Install + review",
  modName: "Ambient Lighting Kit",
  links: [
    { label: "Amazon", url: "https://..." },
    { label: "eBay", url: "https://..." },
    { label: "AliExpress", url: "https://..." }
  ]
}
```

Tip: If you provide only ONE link, it opens directly (no prompt).

## Add your images
Put your images in the `assets/` folder.
Recommended:
- JPG or PNG
- 1200px wide (or more)
- Keep names simple: `mod-01.jpg`, `mod-02.jpg`, ...

## Deploy for FREE (Netlify easiest)
1. Go to Netlify and log in
2. Drag-and-drop this whole folder (or the ZIP you downloaded) into Netlify Deploy
3. You instantly get a public link

## Deploy for FREE (Vercel)
1. Create a GitHub repo and push this folder
2. In Vercel, import the repo
3. Deploy
