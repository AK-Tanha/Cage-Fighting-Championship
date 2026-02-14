# Social Media Preview Images - Quick Reference

## Required Images for src/app/ Directory

### 1. og-image.jpg

**Purpose**: Default/Homepage social preview
**Dimensions**: 1200 x 630 pixels
**Content Ideas**:

- CFC logo prominently displayed
- Octagon cage silhouette or wireframe
- Bold text: "CAGE FIGHTING CHAMPIONSHIP"
- Tagline: "The Global Leader in Elite MMA Competition"
- Red (#FE0002) and black color scheme
- Dramatic lighting effects, metallic textures
- Energy/impact effects

---

### 2. og-fighters.jpg

**Purpose**: Fighters listing page preview
**Dimensions**: 1200 x 630 pixels
**Content Ideas**:

- Collage of 3-4 fighter silhouettes or action shots
- Bold text: "CFC FIGHTERS"
- Subtitle: "Elite MMA Athletes"
- Red and black theme
- Dynamic, aggressive composition
- Could show fighters in fighting stances

---

### 3. og-events.jpg

**Purpose**: Events page preview
**Dimensions**: 1200 x 630 pixels
**Content Ideas**:

- Octagon from dramatic angle
- Crowd atmosphere or arena lights
- Bold text: "CFC EVENTS"
- Subtitle: "Upcoming Fights & Championships"
- Event/championship feel
- Red spotlight effects
- Calendar or date elements (optional)

---

### 4. og-fighter-default.jpg

**Purpose**: Fallback for fighter profiles without images
**Dimensions**: 1200 x 630 pixels
**Content Ideas**:

- Generic fighter silhouette
- CFC logo and branding
- Text: "CFC FIGHTER PROFILE"
- Octagon background pattern
- Professional, clean design
- Red and black color scheme

---

## Design Specifications

### Technical Requirements

- **Dimensions**: Exactly 1200 x 630 pixels
- **Format**: JPG (preferred) or PNG
- **File Size**: Under 1MB (under 500KB ideal)
- **Color Mode**: RGB
- **Resolution**: 72 DPI minimum

### Safe Zones

- **Primary Content**: Center 1200 x 600 pixels
- **Critical Text**: Center 1000 x 500 pixels
- Avoid important content in outer 15px on all sides

### Typography

- **Minimum Font Size**: 48px for body text
- **Headline Size**: 72-120px recommended
- **Font Weight**: Bold or Black weights
- **Readability**: High contrast, avoid thin fonts

### Color Palette

- **Primary Red**: #FE0002
- **Black**: #000000
- **White**: #FFFFFF
- **Gray Accents**: #1A1A1A, #2A2A2A

### Design Style

- Modern, aggressive, professional
- High contrast for mobile visibility
- Bold, geometric shapes
- Metallic/glossy effects
- Dynamic angles and perspectives
- Energy/motion blur effects

---

## Platform Preview Sizes

### WhatsApp

- Shows ~360 x 189 pixels on mobile
- Text must be readable at this size

### Facebook Feed

- Desktop: ~500 x 261 pixels
- Mobile: ~360 x 189 pixels

### Twitter

- Desktop: ~506 x 265 pixels
- Mobile: ~360 x 189 pixels

### LinkedIn

- Desktop: ~552 x 289 pixels
- Mobile: ~360 x 189 pixels

**Key Takeaway**: Design for mobile first (360px wide preview)

---

## Quick Design Checklist

- [ ] Image is exactly 1200 x 630 pixels
- [ ] File size is under 1MB
- [ ] Text is readable at 360px width
- [ ] Important content in center safe zone
- [ ] High contrast between text and background
- [ ] CFC branding/logo included
- [ ] Red (#FE0002) and black color scheme
- [ ] Professional, premium appearance
- [ ] No fine details that won't show at small size
- [ ] Saved as JPG in src/app/ directory

---

## Design Tools

### Free Options

- **Canva**: canva.com (has social media templates)
- **Figma**: figma.com (professional design tool)
- **GIMP**: gimp.org (Photoshop alternative)
- **Photopea**: photopea.com (online Photoshop clone)

### Paid Options

- **Adobe Photoshop**: Industry standard
- **Adobe Illustrator**: For vector graphics
- **Affinity Photo**: One-time purchase alternative

### AI Generation

- **Midjourney**: High-quality AI images
- **DALL-E**: OpenAI image generation
- **Stable Diffusion**: Open-source AI generation

---

## Example Prompts for AI Generation

### For og-image.jpg:

```
A dynamic social media card for a Cage Fighting Championship (CFC) website.
Bold red (#FE0002) and black color scheme with a fierce, professional MMA aesthetic.
Features a stylized octagon cage silhouette in the background, dramatic lighting effects,
and bold text "CFC - CAGE FIGHTING CHAMPIONSHIP" with tagline "The Global Leader in
Elite MMA Competition". Modern, aggressive design with metallic textures and energy
effects. 1200x630 pixels.
```

### For og-fighters.jpg:

```
Social media preview card showing elite MMA fighters. Dynamic composition with
3-4 fighter silhouettes in action poses. Bold red (#FE0002) and black color scheme.
Text: "CFC FIGHTERS - Elite MMA Athletes". Professional, aggressive design with
dramatic lighting and energy effects. 1200x630 pixels.
```

### For og-events.jpg:

```
Social media card for MMA events page. Shows octagon cage from dramatic angle with
arena lighting and crowd atmosphere. Bold red (#FE0002) and black color scheme.
Text: "CFC EVENTS - Upcoming Fights & Championships". Professional, exciting design
with spotlight effects. 1200x630 pixels.
```

### For og-fighter-default.jpg:

```
Generic fighter profile social media card. Professional fighter silhouette with
CFC branding. Bold red (#FE0002) and black color scheme. Text: "CFC FIGHTER PROFILE".
Clean, modern design with octagon pattern background. 1200x630 pixels.
```

---

## Testing Your Images

1. **Size Check**: Verify exactly 1200 x 630 pixels
2. **File Size**: Confirm under 1MB
3. **Mobile Preview**: View at 360px width - is text readable?
4. **Contrast**: Is text clearly visible?
5. **Branding**: Is CFC identity clear?
6. **Platform Tests**: Use Facebook Debugger, Twitter Card Validator

---

## Where to Place Images

All images go in: `/Users/mdrayhan/Cage-Fighting-Championship/src/app/`

```
src/
  app/
    og-image.jpg          ← Homepage preview
    og-fighters.jpg       ← Fighters page preview
    og-events.jpg         ← Events page preview
    og-fighter-default.jpg ← Fighter profile fallback
    favicon.ico
    layout.tsx
    page.tsx
    ...
```

---

## Need Help?

If you need assistance creating these images:

1. Use the AI prompts above with Midjourney/DALL-E
2. Hire a designer on Fiverr/Upwork
3. Use Canva templates and customize
4. Ask for help generating with AI tools

Remember: These images are crucial for professional social media sharing!
