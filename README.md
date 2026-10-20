# Dewank Saini — Portfolio (static multi-page site)

Pages: index.html · work.html · about.html · contact.html. No build step.

## Deploy on Vercel
1. Upload this folder to a GitHub repo (or run `npx vercel` inside it).
2. In Vercel: Add New → Project → import the repo. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

## Replace placeholders (everything is in js/main.js, top of file)
- `booking`: your Calendly / Cal.com link. Empty means the button opens an email to you.
- `showreel`: `assets/showreel.mp4` (put the file in /assets) or a YouTube link.
- `projects`: for each project set `title`, `video` (file or YouTube link) and `img` (thumbnail in /assets).
- Social links and email are in the same object.
