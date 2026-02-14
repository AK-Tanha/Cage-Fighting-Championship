# Pre-Deployment Checklist - SEO & Social Media

## 📋 Complete This Before Going Live

### ✅ Phase 1: Image Creation (REQUIRED)

- [ ] **Create og-image.jpg** (1200x630px)
  - Homepage/default social preview
  - CFC branding, octagon, red/black theme
  - Save to: `src/app/og-image.jpg`

- [ ] **Create og-fighters.jpg** (1200x630px)
  - Fighters page social preview
  - Fighter collage or action shots
  - Save to: `src/app/og-fighters.jpg`

- [ ] **Create og-events.jpg** (1200x630px)
  - Events page social preview
  - Octagon, arena atmosphere
  - Save to: `src/app/og-events.jpg`

- [ ] **Create og-fighter-default.jpg** (1200x630px)
  - Fallback for fighters without photos
  - Generic fighter silhouette + CFC branding
  - Save to: `src/app/og-fighter-default.jpg`

**Resources:**

- See `IMAGE_SPECS.md` for detailed specifications
- Use AI prompts provided in IMAGE_SPECS.md
- Try Canva for quick creation

---

### ✅ Phase 2: Environment Configuration (REQUIRED)

- [ ] **Update .env for production**

  ```bash
  # Change from:
  NEXT_PUBLIC_SITE_URL=http://localhost:3000

  # To your actual domain:
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  ```

- [ ] **Verify environment variable is set in deployment platform**
  - Vercel: Add to Environment Variables
  - Netlify: Add to Environment Variables
  - Other: Check platform documentation

---

### ✅ Phase 3: Content Review (RECOMMENDED)

- [ ] **Review metadata descriptions**
  - Check `src/app/layout.tsx` - root description
  - Check `src/app/page.tsx` - home description
  - Check `src/app/fighters/page.tsx` - fighters description
  - Check `src/app/events/page.tsx` - events description

- [ ] **Verify titles are appropriate**
  - All titles follow pattern: "Page Name | CFC"
  - No typos or errors

- [ ] **Check keywords are relevant**
  - See `src/app/layout.tsx` keywords array
  - Add/remove as needed for your market

---

### ✅ Phase 4: Social Media Setup (OPTIONAL)

- [ ] **Add social media links to structured data**
  - Edit `src/app/page.tsx`
  - Uncomment and fill in `sameAs` array:
    ```typescript
    "sameAs": [
        "https://www.facebook.com/YourCFCPage",
        "https://twitter.com/YourCFCHandle",
        "https://www.instagram.com/YourCFCProfile",
    ]
    ```

- [ ] **Update Twitter handle**
  - Edit `src/app/layout.tsx`
  - Change `creator: '@CFC'` to your actual handle

---

### ✅ Phase 5: Site Verification (OPTIONAL)

- [ ] **Get Google Search Console verification code**
  - Go to: https://search.google.com/search-console
  - Add your property
  - Get verification meta tag code

- [ ] **Add verification to metadata**
  - Edit `src/app/layout.tsx`
  - Uncomment and add code:
    ```typescript
    verification: {
        google: 'your-verification-code-here',
    }
    ```

- [ ] **Verify ownership in Google Search Console**

---

### ✅ Phase 6: Build & Deploy (REQUIRED)

- [ ] **Test build locally**

  ```bash
  npm run build
  ```

  - Should complete without errors
  - Check for any warnings

- [ ] **Test locally**

  ```bash
  npm run start
  ```

  - Visit http://localhost:3000
  - Check all pages load
  - View page source, verify metadata is present

- [ ] **Deploy to production**
  - Push to your repository
  - Deploy via your platform (Vercel, Netlify, etc.)
  - Wait for deployment to complete

- [ ] **Verify production site is live**
  - Visit your production URL
  - All pages should load correctly

---

### ✅ Phase 7: Testing (REQUIRED)

- [ ] **Test with Facebook Sharing Debugger**
  - URL: https://developers.facebook.com/tools/debug/
  - Test homepage: `https://yourdomain.com`
  - Test fighters page: `https://yourdomain.com/fighters`
  - Test a fighter profile: `https://yourdomain.com/fighters/[id]`
  - Test events page: `https://yourdomain.com/events`
  - Click "Scrape Again" if needed
  - Verify images show correctly
  - Verify titles and descriptions are correct

- [ ] **Test with Twitter Card Validator**
  - URL: https://cards-dev.twitter.com/validator
  - Test same pages as above
  - Verify card type is "summary_large_image"
  - Verify images and text display correctly

- [ ] **Test with LinkedIn Post Inspector**
  - URL: https://www.linkedin.com/post-inspector/
  - Test homepage and key pages
  - Verify professional appearance

- [ ] **Real-world test: WhatsApp**
  - Share homepage link in WhatsApp chat
  - Verify rich preview appears
  - Check image loads correctly
  - Verify title and description are readable

- [ ] **Real-world test: Facebook**
  - Create a post with your link
  - Verify rich preview appears
  - Check image quality
  - Verify text is correct

- [ ] **Real-world test: Twitter**
  - Tweet your link
  - Verify Twitter Card appears
  - Check image and text

---

### ✅ Phase 8: SEO Setup (RECOMMENDED)

- [ ] **Submit sitemap to Google Search Console**
  - URL: https://search.google.com/search-console
  - Go to Sitemaps section
  - Submit: `https://yourdomain.com/sitemap.xml`

- [ ] **Verify robots.txt is accessible**
  - Visit: `https://yourdomain.com/robots.txt`
  - Should show robots directives and sitemap reference

- [ ] **Check Google indexing**
  - Search: `site:yourdomain.com`
  - Pages should start appearing within days/weeks

---

### ✅ Phase 9: Monitoring (ONGOING)

- [ ] **Set up Google Analytics** (if not already done)
  - Track page views
  - Monitor referral traffic from social platforms

- [ ] **Monitor Google Search Console**
  - Check for crawl errors
  - Monitor search performance
  - Review coverage reports

- [ ] **Track social sharing metrics**
  - Facebook Insights (if you have a page)
  - Twitter Analytics
  - Monitor click-through rates

- [ ] **Review and update images periodically**
  - Seasonal updates
  - Special events
  - Branding changes

---

## 🚨 Common Issues & Solutions

### Issue: Images not showing in social preview

**Solutions:**

- [ ] Verify images exist in `src/app/` directory
- [ ] Check image filenames match exactly (case-sensitive)
- [ ] Ensure images are 1200x630px
- [ ] Use Facebook Debugger to clear cache
- [ ] Wait 5-10 minutes and try again

### Issue: Wrong description showing

**Solutions:**

- [ ] Clear platform cache using debugging tools
- [ ] Check metadata in page source (View Source)
- [ ] Verify no conflicting meta tags
- [ ] Redeploy if needed

### Issue: Title not formatted correctly

**Solutions:**

- [ ] Check title template in `layout.tsx`
- [ ] Verify page exports metadata correctly
- [ ] Check for typos in metadata object

### Issue: Dynamic fighter metadata not working

**Solutions:**

- [ ] Verify API is returning fighter data
- [ ] Check `generateMetadata` function for errors
- [ ] Test with different fighter IDs
- [ ] Check server logs for errors

---

## 📊 Success Metrics

After deployment, you should see:

### Immediate (Within 24 hours):

- ✅ Rich previews on all social platforms
- ✅ Images loading correctly
- ✅ Titles and descriptions displaying properly

### Short-term (Within 1 week):

- ✅ Increased click-through rates from social shares
- ✅ More social media engagement
- ✅ Pages appearing in Google Search Console

### Long-term (Within 1 month):

- ✅ Improved search rankings
- ✅ More organic traffic
- ✅ Higher social sharing rates
- ✅ Better brand recognition

---

## 🎯 Priority Levels

### MUST DO (Before Launch):

1. Create at least `og-image.jpg`
2. Update `NEXT_PUBLIC_SITE_URL`
3. Test build locally
4. Deploy to production
5. Test with Facebook Debugger

### SHOULD DO (Within First Week):

1. Create all 4 OG images
2. Test on all platforms
3. Submit sitemap to Google
4. Set up Google Search Console

### NICE TO HAVE (Ongoing):

1. Add social media links
2. Set up verification codes
3. Monitor analytics
4. Update images seasonally

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All 4 OG images created and uploaded
- [ ] Production URL configured
- [ ] Build successful
- [ ] Deployed to production
- [ ] Tested on Facebook/WhatsApp
- [ ] Tested on Twitter
- [ ] Sitemap submitted to Google
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Metadata visible in page source

---

## 🎉 You're Ready!

Once all items are checked, your CFC website will have:

- ✅ Professional social media cards
- ✅ Rich previews on WhatsApp, Messenger, Facebook, Twitter
- ✅ Better SEO and search rankings
- ✅ Improved click-through rates
- ✅ Enhanced brand presence

**Questions?** See:

- `QUICK_START.md` - Quick overview
- `SEO_GUIDE.md` - Comprehensive guide
- `IMAGE_SPECS.md` - Image requirements
- `METADATA_FLOW.md` - How it all works

---

**Last Updated:** 2026-02-14
**Status:** Ready for deployment
