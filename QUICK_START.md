# Quick Start - Social Media Cards Setup

## 🎯 Goal

Enable rich card-style previews when sharing your CFC links on WhatsApp, Messenger, Facebook, Twitter, etc.

## ✅ What's Already Done

- ✅ All metadata code implemented
- ✅ Dynamic metadata for fighter profiles
- ✅ Sitemap and robots.txt created
- ✅ Build tested and working
- ✅ Environment variables configured

## 🚨 What You Need to Do (3 Steps)

### Step 1: Create 4 Social Preview Images

Create these images (1200x630px) and save them in `src/app/`:

1. **og-image.jpg** - Homepage preview
2. **og-fighters.jpg** - Fighters page preview
3. **og-events.jpg** - Events page preview
4. **og-fighter-default.jpg** - Fighter profile fallback

**See `IMAGE_SPECS.md` for detailed specs and AI prompts!**

#### Quick Design Tips:

- Use red (#FE0002) and black colors
- Include CFC logo/branding
- Make text large and bold (readable at small sizes)
- Keep important content in center
- File size under 1MB

#### Where to Create:

- Use Canva (free, easy)
- Use AI (Midjourney, DALL-E) - prompts in IMAGE_SPECS.md
- Hire designer on Fiverr
- Use Photoshop/Figma

---

### Step 2: Update Production URL

When deploying to production, edit `.env`:

```bash
# Change this:
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# To your actual domain:
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

### Step 3: Test Your Cards

After creating images and deploying:

1. **Facebook/WhatsApp/Messenger Test:**
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again"
   - View preview

2. **Twitter Test:**
   - Go to: https://cards-dev.twitter.com/validator
   - Enter your URL
   - View preview

3. **Real Test:**
   - Share a link in WhatsApp
   - Share a link on Facebook
   - Tweet a link
   - See the rich preview!

---

## 📱 What Users Will See

### Before (No Metadata):

```
User shares: https://yoursite.com/fighters/123

WhatsApp shows:
https://yoursite.com/fighters/123
(just a plain text link)
```

### After (With Metadata):

```
User shares: https://yoursite.com/fighters/123

WhatsApp shows:
┌─────────────────────────────────────┐
│                                     │
│     [Fighter Photo - 1200x630]     │
│                                     │
├─────────────────────────────────────┤
│ John "The Hammer" Smith | CFC      │
│ Heavyweight fighter with 15-2-0... │
└─────────────────────────────────────┘
(rich preview card with image!)
```

---

## 🎨 Image Creation Priority

### Must Have:

1. **og-image.jpg** - Most important (homepage/default)

### Should Have:

2. **og-fighters.jpg** - For fighters page
3. **og-events.jpg** - For events page

### Nice to Have:

4. **og-fighter-default.jpg** - Fallback (fighters usually have images)

**Start with #1, then add others as time allows.**

---

## 🔧 Troubleshooting

### "My card isn't showing!"

1. Check images exist in `src/app/` folder
2. Check image names match exactly (case-sensitive)
3. Clear cache using Facebook Debugger
4. Wait a few minutes and try again

### "Wrong image showing"

1. Use Facebook Debugger to clear cache
2. Check image URL in metadata
3. Verify image is 1200x630px

### "Description is cut off"

- Keep descriptions under 200 characters
- Most important info first

---

## 📊 Expected Impact

### Engagement Boost:

- 📈 **2-3x higher** click-through rates
- 👀 **More attention** in social feeds
- ✅ **More trust** from professional appearance
- 🔄 **More shares** due to visual appeal

### SEO Benefits:

- 🔍 Better search rankings
- 📍 Rich snippets in Google
- 🤖 Better content understanding
- ⭐ Improved site authority

---

## 📁 File Locations

### Code Files (Already Done):

```
src/app/
├── layout.tsx          ← Enhanced metadata
├── page.tsx            ← Home metadata + structured data
├── sitemap.ts          ← Sitemap generator
├── robots.ts           ← Robots.txt
├── fighters/
│   ├── page.tsx        ← Fighters list metadata
│   └── [id]/page.tsx   ← Dynamic fighter metadata
└── events/
    └── page.tsx        ← Events metadata
```

### Images (You Need to Create):

```
src/app/
├── og-image.jpg              ← CREATE THIS
├── og-fighters.jpg           ← CREATE THIS
├── og-events.jpg             ← CREATE THIS
└── og-fighter-default.jpg   ← CREATE THIS
```

---

## 🎯 Success Checklist

- [ ] Read `IMAGE_SPECS.md`
- [ ] Create `og-image.jpg` (1200x630px)
- [ ] Create `og-fighters.jpg` (1200x630px)
- [ ] Create `og-events.jpg` (1200x630px)
- [ ] Create `og-fighter-default.jpg` (1200x630px)
- [ ] Place all images in `src/app/` folder
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env` (for production)
- [ ] Deploy to production
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator
- [ ] Share a link in WhatsApp - see the preview!
- [ ] Celebrate! 🎉

---

## 💡 Pro Tips

1. **Start Simple**: Create basic images first, improve later
2. **Use Templates**: Canva has social media card templates
3. **Test Mobile**: Most shares happen on mobile
4. **Keep Branding Consistent**: Use same colors/style across all images
5. **Update Regularly**: Change images for special events/seasons

---

## 🆘 Need Help?

### For Image Creation:

- See `IMAGE_SPECS.md` for detailed specs
- Use AI prompts provided in IMAGE_SPECS.md
- Try Canva's free templates

### For Testing:

- See `SEO_GUIDE.md` for testing tools
- Use Facebook Debugger to refresh cache

### For Technical Details:

- See `SEO_GUIDE.md` for comprehensive info
- Check Next.js metadata documentation

---

## 🚀 Ready to Go!

You're **95% done**! Just create those 4 images and you'll have professional social media cards that will:

✨ Make your links stand out
✨ Increase click-through rates
✨ Build trust and credibility
✨ Boost SEO rankings
✨ Grow your audience

**Next action**: Open `IMAGE_SPECS.md` and create your first image!

---

_Questions? Check `SEO_GUIDE.md` for detailed information._
