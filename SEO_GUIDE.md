# SEO & Social Media Card Guide

## Overview

Your CFC website has been upgraded with comprehensive SEO and social media metadata to enable rich card previews when sharing links on WhatsApp, Messenger, Facebook, Twitter, and other platforms.

## What's Been Implemented

### 1. **Root Layout Metadata** (`src/app/layout.tsx`)

Enhanced with:

- **Title Template**: Automatic page title formatting with "| CFC" suffix
- **Open Graph Tags**: For Facebook, WhatsApp, Messenger, LinkedIn
- **Twitter Card Tags**: For Twitter/X sharing
- **Keywords**: SEO-optimized keywords for search engines
- **Robots Meta**: Proper indexing instructions for search engines
- **Site Verification**: Placeholders for Google/Yandex verification

### 2. **Page-Specific Metadata**

#### Home Page (`src/app/page.tsx`)

- Custom metadata for homepage
- Structured data (JSON-LD) for SportsOrganization
- Helps Google understand your site better

#### Fighters List (`src/app/fighters/page.tsx`)

- Metadata optimized for fighter roster page
- Custom Open Graph image reference

#### Fighter Profile (`src/app/fighters/[id]/page.tsx`)

- **Dynamic metadata generation** - Each fighter gets unique metadata
- Uses fighter's name, nickname, record, and bio
- Fighter's image used for social preview
- Fallback to default image if fighter has no image

#### Events Page (`src/app/events/page.tsx`)

- Metadata for upcoming events and fight cards
- Custom Open Graph image reference

## Social Media Preview Images

You need to create the following images and place them in the `src/app` directory:

### Required Images:

1. **`og-image.jpg`** (1200x630px)
   - Default/homepage social preview
   - Should feature CFC branding, octagon, dramatic MMA aesthetic
   - Red and black color scheme

2. **`og-fighters.jpg`** (1200x630px)
   - For fighters listing page
   - Could show multiple fighters or fighter collage
   - Text: "CFC Fighters - Elite MMA Athletes"

3. **`og-events.jpg`** (1200x630px)
   - For events page
   - Could show octagon, event atmosphere
   - Text: "CFC Events - Upcoming Fights"

4. **`og-fighter-default.jpg`** (1200x630px)
   - Fallback for fighter profiles without images
   - Generic fighter silhouette or CFC branding

### Image Specifications:

- **Dimensions**: 1200x630 pixels (Facebook/WhatsApp recommended)
- **Format**: JPG or PNG
- **File Size**: Under 1MB for faster loading
- **Text**: Should be readable at small sizes (mobile previews)
- **Safe Zone**: Keep important content in center 1200x600px area

### Design Tips:

- Use bold, high-contrast colors (red/black theme)
- Include CFC logo
- Keep text large and readable
- Avoid fine details that won't show at small sizes
- Test on mobile devices

## Environment Variables

Add to your `.env` file (already done):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: Update this to your production domain when deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## How Social Media Cards Work

### WhatsApp

- Fetches Open Graph metadata when link is shared
- Shows image, title, and description
- Uses `og:image`, `og:title`, `og:description`

### Facebook/Messenger

- Uses Open Graph protocol
- Shows large image preview with title and description
- Caches metadata (use Facebook Debugger to refresh)

### Twitter/X

- Uses Twitter Card metadata
- Falls back to Open Graph if Twitter tags not present
- Shows large image card with title and description

### LinkedIn

- Uses Open Graph metadata
- Shows professional-looking preview cards

## Testing Your Social Cards

### 1. Facebook Sharing Debugger

URL: https://developers.facebook.com/tools/debug/

- Enter your page URL
- Click "Scrape Again" to refresh cache
- View preview of how card will appear

### 2. Twitter Card Validator

URL: https://cards-dev.twitter.com/validator

- Enter your page URL
- View preview of Twitter card

### 3. LinkedIn Post Inspector

URL: https://www.linkedin.com/post-inspector/

- Enter your page URL
- View LinkedIn preview

### 4. WhatsApp

- Simply share the link in a chat
- WhatsApp will automatically generate preview
- Note: First share might take a moment to load

## Metadata Structure

### Static Pages (Home, Fighters List, Events)

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description...",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    url: "/page-path",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter Title",
    description: "Twitter Description",
    images: ["/og-image.jpg"],
  },
};
```

### Dynamic Pages (Fighter Profiles)

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);
  return {
    title: data.name,
    description: `${data.name} - ${data.details}`,
    openGraph: {
      title: `${data.name} | CFC`,
      description: data.bio,
      images: [{ url: data.image_url }],
    },
  };
}
```

## SEO Best Practices Implemented

✅ **Title Templates** - Consistent branding across all pages
✅ **Meta Descriptions** - Unique, compelling descriptions for each page
✅ **Open Graph Tags** - Rich social media previews
✅ **Twitter Cards** - Optimized Twitter sharing
✅ **Structured Data** - JSON-LD for better search engine understanding
✅ **Keywords** - Relevant MMA/fighting keywords
✅ **Robots Meta** - Proper indexing instructions
✅ **Canonical URLs** - Via metadataBase configuration
✅ **Dynamic Metadata** - Unique metadata for each fighter profile

## Next Steps

### 1. Create Social Preview Images

- Design and create the 4 required OG images
- Place them in `src/app/` directory
- Ensure they meet size specifications (1200x630px)

### 2. Update Production URL

When deploying to production:

```bash
# In .env or deployment platform
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

### 3. Add Social Media Links

Update `src/app/page.tsx` structured data with your social media URLs:

```typescript
"sameAs": [
    "https://www.facebook.com/YourCFCPage",
    "https://twitter.com/YourCFCHandle",
    "https://www.instagram.com/YourCFCProfile",
]
```

### 4. Add Site Verification

When you have verification codes from Google/Yandex:

```typescript
verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
},
```

### 5. Test All Pages

- Test home page sharing
- Test fighters list sharing
- Test individual fighter profile sharing
- Test events page sharing
- Use the debugging tools mentioned above

### 6. Monitor Performance

- Use Google Search Console to monitor SEO performance
- Check social media analytics for link sharing metrics
- Monitor click-through rates from social platforms

## Troubleshooting

### Cards Not Showing

1. Check that images exist in `src/app/` directory
2. Verify `NEXT_PUBLIC_SITE_URL` is set correctly
3. Clear social platform cache using debugging tools
4. Ensure images are accessible (not blocked by robots.txt)

### Wrong Image Showing

1. Clear platform cache (Facebook Debugger, etc.)
2. Check image URL in metadata
3. Verify image dimensions (1200x630px)

### Description Too Long/Short

- Facebook: 200-300 characters optimal
- Twitter: 200 characters optimal
- WhatsApp: Shows first ~150 characters

## Additional Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
- [Schema.org Documentation](https://schema.org/)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Summary

Your CFC website now has enterprise-level SEO and social media optimization:

- ✅ Rich card previews on all major platforms
- ✅ Dynamic metadata for fighter profiles
- ✅ Structured data for better search rankings
- ✅ Optimized for WhatsApp, Messenger, Facebook, Twitter, LinkedIn
- ✅ Professional, branded social sharing experience

Just create the social preview images and you're ready to share!
