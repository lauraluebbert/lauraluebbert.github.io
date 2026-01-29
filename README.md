# lauraluebbert.com

Personal website for Laura Luebbert - Biologist and ML researcher.

## Interactive Features

This website includes many fun interactive elements:

- **Animated Background** - Floating gradient blobs that respond to mouse movement
- **Custom Cursor** - Smooth-following cursor with hover effects (desktop only)
- **Dark/Light Mode** - Toggle between themes with animated transition
- **Typing Effect** - Multilingual welcome message cycles through languages
- **Scroll Animations** - Elements fade and slide in as you scroll
- **Scroll Progress Bar** - Gradient bar at top showing page progress
- **Interactive Timeline** - CV entries animate on hover
- **Animated Skill Bars** - Skills animate when scrolled into view
- **Photo Lightbox** - Click adventure photos to view fullscreen with navigation
- **Magnetic Buttons** - Social links subtly follow cursor
- **Ripple Effects** - Click ripples on buttons
- **Page Transitions** - Smooth transitions between pages
- **Easter Egg** - Click the logo 5 times for a surprise!

## Local Development

To preview the site locally:

```bash
cd /Users/laura/Documents/lauraluebbert.com
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploying to GitHub Pages

### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Name the repository `lauraluebbert.com`
3. Make it public
4. Don't initialize with README (we already have files)

### 2. Push Your Code

```bash
cd /Users/laura/Documents/lauraluebbert.com
git add .
git commit -m "Initial commit: interactive personal website"
git branch -M main
git remote add origin https://github.com/lauraluebbert/lauraluebbert.com.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at `https://lauraluebbert.github.io/lauraluebbert.com/`

### 4. Configure Custom Domain

In repository **Settings** > **Pages**:
1. Enter `www.lauraluebbert.com` in the "Custom domain" field
2. Click **Save**
3. Check "Enforce HTTPS" (after DNS propagates)

### 5. Configure DNS at Your Domain Registrar

Add these DNS records:

**For apex domain (lauraluebbert.com):**
```
Type: A
Name: @
Values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: lauraluebbert.github.io
```

## Adding Your Images

The site expects images in the following locations:

### Profile & My Roots
- `images/profile.jpg` - Your profile photo (square, 400x400px+)
- `images/siurana.jpg` - Siurana village photo

### Adventures Gallery
Create `images/adventures/` with:
- `half-dome.jpg`, `kings-canyon.jpg`, `sequoia.jpg`, `zion.jpg`, `inyo.jpg`, `anza-borrego.jpg`
- `florida-springs.jpg`, `goliath-groupers.jpg`, `catalina-kelp.jpg`, `florida-night-dive.jpg`, `boynton-beach.jpg`, `captain-curls.jpg`
- `pyrenees.jpg`, `la-mora.jpg`, `sf-bay.jpg`

**Tip:** Optimize images to under 500KB each using [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/).

## File Structure

```
lauraluebbert.com/
├── index.html          # Homepage with typing effect
├── my-roots.html       # Catalan heritage with 3D tradition cards
├── cv.html             # CV with interactive timeline & skill bars
├── research.html       # Research projects with hover effects
├── adventures.html     # Photo gallery with lightbox
├── contact.html        # Contact with magnetic buttons
├── css/
│   └── style.css       # All styles + animations + dark mode
├── js/
│   └── main.js         # All interactive features
├── images/
│   ├── profile.jpg
│   ├── siurana.jpg
│   └── adventures/
├── CNAME               # Custom domain config
└── README.md
```

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --primary-color: #2c3e50;
  /* ... */
}
```

### Typing Words
Edit in `js/main.js`:
```javascript
const words = ['welcome!', 'willkommen!', 'benvinguts!', 'bienvenidos!'];
```

### Dark Mode
Theme preference is saved to localStorage and respects system preferences.

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive with touch-friendly interactions
- Custom cursor disabled on mobile devices

## License

All rights reserved. Content and images are property of Laura Luebbert.
