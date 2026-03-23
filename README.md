# Currency Converter

A beginner-friendly currency converter built with React and Vite. It uses functional components, React Hooks, and the Frankfurter public exchange-rate API to convert currencies in real time.

## Features

- Amount input field
- From/To currency dropdowns
- Live conversion on every change
- Swap button to switch currencies
- Loading and error states
- Responsive card-based UI

## Project Structure

- `src/App.jsx` - App entry component
- `src/components/Converter.jsx` - Main conversion logic and UI
- `src/components/Dropdown.jsx` - Reusable dropdown component
- `src/styles.css` - Responsive styling

## Run Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Suggested Git Commits

```bash
git init
git add .
git commit -m "chore: scaffold React currency converter with Vite"

git add .
git commit -m "feat: build responsive currency converter UI"

git add .
git commit -m "feat: integrate live exchange rates and swap action"
```

## Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Deploy to Vercel

1. Push this project to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Click **Add New -> Project**.
4. Import your GitHub repository.
5. Keep the default framework preset as **Vite**.
6. Leave build settings as default:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **Deploy**.
8. After deployment finishes, open the generated Vercel URL and test a few currency conversions.

## Notes

The app fetches rates from `https://api.frankfurter.app/latest`, which does not require an API key for basic usage.
