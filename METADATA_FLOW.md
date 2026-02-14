# Metadata Architecture - Visual Guide

## 🏗️ How Metadata Works in Your CFC Site

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER SHARES A LINK                          │
│              https://yoursite.com/fighters/123                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              SOCIAL PLATFORM (WhatsApp/Facebook/etc)            │
│                                                                  │
│  1. Platform detects URL in message                            │
│  2. Sends HTTP request to fetch page metadata                  │
│  3. Looks for Open Graph tags in HTML <head>                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR NEXT.JS APPLICATION                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Root Layout (layout.tsx)                                │  │
│  │  • Default metadata for all pages                        │  │
│  │  • Title template: "%s | CFC"                            │  │
│  │  • Default OG image: /og-image.jpg                       │  │
│  │  • Site-wide settings                                    │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Page-Level Metadata                                     │  │
│  │                                                           │  │
│  │  For /fighters/123:                                      │  │
│  │  • generateMetadata() function runs                      │  │
│  │  • Fetches fighter data from API                         │  │
│  │  • Generates dynamic metadata:                           │  │
│  │    - title: "John Smith | CFC"                           │  │
│  │    - description: "John Smith - Heavyweight..."          │  │
│  │    - og:image: fighter.image_url                         │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  HTML Output (sent to social platform)                   │  │
│  │                                                           │  │
│  │  <head>                                                   │  │
│  │    <meta property="og:title" content="John Smith | CFC"/>│  │
│  │    <meta property="og:description" content="..."/>       │  │
│  │    <meta property="og:image" content="https://..."/>     │  │
│  │    <meta property="og:url" content="/fighters/123"/>     │  │
│  │    <meta name="twitter:card" content="summary_large..."/>│  │
│  │  </head>                                                  │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              SOCIAL PLATFORM PROCESSES METADATA                 │
│                                                                  │
│  1. Extracts og:title, og:description, og:image                │
│  2. Downloads the image from og:image URL                      │
│  3. Generates preview card                                      │
│  4. Caches the result                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER SEES RICH PREVIEW                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │         [Fighter Photo - 1200x630px]                   │    │
│  │                                                         │    │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ John "The Hammer" Smith | CFC                          │    │
│  │ Heavyweight fighter with 15-2-0 record. Elite MMA...   │    │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  User clicks → Visits your site                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Metadata Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    METADATA PRIORITY                            │
└─────────────────────────────────────────────────────────────────┘

    Page-Specific Metadata (Highest Priority)
           ↓ overrides
    Root Layout Metadata (Default/Fallback)
           ↓ uses
    Environment Variables (NEXT_PUBLIC_SITE_URL)

Example for /fighters/123:

1. generateMetadata() in fighters/[id]/page.tsx
   ├─ title: "John Smith"
   ├─ description: "John Smith - Heavyweight fighter..."
   └─ og:image: fighter.image_url

2. If fighter has no image:
   └─ Falls back to: "/og-fighter-default.jpg"

3. Title template from layout.tsx:
   "John Smith" → "John Smith | CFC"

4. metadataBase from layout.tsx:
   "/og-image.jpg" → "https://yoursite.com/og-image.jpg"
```

---

## 🎯 Different Pages, Different Metadata

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOME PAGE (/)                           │
├─────────────────────────────────────────────────────────────────┤
│ Title: "Home | CFC"                                             │
│ Description: "Experience the ultimate in cage fighting..."      │
│ Image: /og-image.jpg                                            │
│ Structured Data: SportsOrganization schema                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FIGHTERS LIST (/fighters)                    │
├─────────────────────────────────────────────────────────────────┤
│ Title: "Fighters | CFC"                                         │
│ Description: "Meet the elite fighters of CFC..."                │
│ Image: /og-fighters.jpg                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              FIGHTER PROFILE (/fighters/123)                    │
├─────────────────────────────────────────────────────────────────┤
│ Title: "John Smith | CFC"                    ← Dynamic!         │
│ Description: "John Smith - Heavyweight..."   ← From API!        │
│ Image: fighter.image_url                     ← Fighter's photo! │
│ Type: "profile"                              ← Special type     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      EVENTS (/events)                           │
├─────────────────────────────────────────────────────────────────┤
│ Title: "Events | CFC"                                           │
│ Description: "Upcoming CFC events, fight cards..."              │
│ Image: /og-events.jpg                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Dynamic Metadata Flow (Fighter Profiles)

```
User shares: /fighters/abc123
         │
         ▼
┌─────────────────────────────────────────┐
│  generateMetadata() function called     │
│  with params: { id: "abc123" }          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  getFighterById("abc123")               │
│  Fetches from API                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Fighter Data Received:                 │
│  {                                      │
│    name: "John Smith",                  │
│    nickname: "The Hammer",              │
│    weight_class: "Heavyweight",         │
│    record: { wins: 15, losses: 2 },     │
│    bio: "Elite fighter from...",        │
│    image_url: "https://..."             │
│  }                                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Build Metadata Object:                 │
│  {                                      │
│    title: "John Smith",                 │
│    description: "John Smith -           │
│      Heavyweight fighter with           │
│      15-2-0 record. Elite fighter...",  │
│    openGraph: {                         │
│      title: "John 'The Hammer'          │
│        Smith | CFC Fighter Profile",    │
│      image: fighter.image_url,          │
│      type: "profile"                    │
│    }                                    │
│  }                                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Next.js Renders HTML with Metadata     │
│  Social platform receives rich preview  │
└─────────────────────────────────────────┘
```

---

## 🌐 Platform-Specific Behavior

```
┌─────────────────────────────────────────────────────────────────┐
│                        WHATSAPP                                 │
├─────────────────────────────────────────────────────────────────┤
│ Uses: Open Graph tags                                           │
│ Shows: Image + Title + Description                              │
│ Cache: Aggressive (hard to refresh)                             │
│ Image: Displays at ~360x189px on mobile                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        FACEBOOK                                 │
├─────────────────────────────────────────────────────────────────┤
│ Uses: Open Graph tags                                           │
│ Shows: Large image card in feed                                 │
│ Cache: Can refresh via Sharing Debugger                         │
│ Image: Displays at ~500x261px on desktop                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        TWITTER/X                                │
├─────────────────────────────────────────────────────────────────┤
│ Uses: Twitter Card tags (falls back to OG)                      │
│ Shows: summary_large_image card                                 │
│ Cache: Can refresh via Card Validator                           │
│ Image: Displays at ~506x265px on desktop                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        LINKEDIN                                 │
├─────────────────────────────────────────────────────────────────┤
│ Uses: Open Graph tags                                           │
│ Shows: Professional preview card                                │
│ Cache: Can refresh via Post Inspector                           │
│ Image: Displays at ~552x289px on desktop                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        MESSENGER                                │
├─────────────────────────────────────────────────────────────────┤
│ Uses: Open Graph tags (same as Facebook)                        │
│ Shows: Image + Title + Description                              │
│ Cache: Shares cache with Facebook                               │
│ Image: Similar to WhatsApp display                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Image Resolution Journey

```
Your Image Creation:
    1200 x 630 pixels
         │
         ▼
Stored on Server:
    /src/app/og-image.jpg
    (1200 x 630 pixels)
         │
         ▼
Platform Downloads:
    Full resolution
    (1200 x 630 pixels)
         │
         ▼
Platform Processes:
    Resizes for different contexts
         │
         ├─→ Desktop Feed: ~500-550px wide
         ├─→ Mobile Feed: ~360px wide
         └─→ Thumbnail: ~150px wide
         │
         ▼
User Sees:
    Optimized preview
    (varies by device/platform)

Why 1200x630?
• Facebook recommended size
• Works well across all platforms
• Good balance of quality vs file size
• Aspect ratio ~1.91:1 (ideal for social)
```

---

## 🔍 SEO Impact Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE CRAWLER VISITS                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Reads Metadata:                                                │
│  • <title> tag                                                  │
│  • <meta name="description">                                    │
│  • <meta name="keywords">                                       │
│  • Open Graph tags                                              │
│  • Structured Data (JSON-LD)                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Google Understands:                                            │
│  • Page topic (from title, description, keywords)               │
│  • Content type (from structured data)                          │
│  • Organization info (from SportsOrganization schema)           │
│  • Social signals (from OG tags)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Improved Rankings:                                             │
│  • Better categorization                                        │
│  • Rich snippets in search results                              │
│  • Knowledge graph eligibility                                  │
│  • Higher click-through rates                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 User Experience Journey

```
BEFORE (No Metadata):
──────────────────────────────────────────────────────────────
Friend: "Check out this fighter!"
You: *receives plain link*
    https://cfc.com/fighters/123

You: *no context, hesitant to click*
Click-through: 10-20%


AFTER (With Metadata):
──────────────────────────────────────────────────────────────
Friend: "Check out this fighter!"
You: *receives rich preview*
    ┌─────────────────────────────────────┐
    │                                     │
    │    [Professional Fighter Photo]    │
    │                                     │
    ├─────────────────────────────────────┤
    │ John "The Hammer" Smith | CFC      │
    │ Heavyweight fighter, 15-2-0 record │
    └─────────────────────────────────────┘

You: *sees context, excited to learn more*
Click-through: 30-50% (2-3x improvement!)
```

---

## 🎯 Complete Data Flow Example

```
1. USER ACTION
   └─ Shares: https://cfc.com/fighters/abc123 in WhatsApp

2. WHATSAPP
   └─ Fetches: GET https://cfc.com/fighters/abc123

3. YOUR SERVER (Next.js)
   ├─ Runs: generateMetadata({ params: { id: "abc123" } })
   ├─ Calls: getFighterById("abc123")
   ├─ Receives: Fighter data from API
   └─ Returns: HTML with metadata

4. HTML RESPONSE
   <head>
     <title>John Smith | CFC</title>
     <meta property="og:title" content="John 'The Hammer' Smith | CFC"/>
     <meta property="og:description" content="Heavyweight fighter..."/>
     <meta property="og:image" content="https://cfc.com/fighter-123.jpg"/>
     <meta property="og:type" content="profile"/>
   </head>

5. WHATSAPP
   ├─ Parses: Metadata from HTML
   ├─ Downloads: Image from og:image URL
   ├─ Generates: Preview card
   └─ Caches: Result for future shares

6. USER SEES
   └─ Rich preview card with image, title, description

7. USER CLICKS
   └─ Visits your site with context and interest
```

---

## 🚀 Performance Considerations

```
Metadata Generation Speed:
┌─────────────────────────────────────────┐
│ Static Pages (Home, Fighters List)     │
│ • Metadata: Pre-defined                 │
│ • Speed: Instant                        │
│ • Cache: Aggressive                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Dynamic Pages (Fighter Profiles)        │
│ • Metadata: Generated on request        │
│ • Speed: ~100-500ms (API call)          │
│ • Cache: Per-request                    │
│ • Optimization: Consider ISR/SSG        │
└─────────────────────────────────────────┘

Image Loading:
┌─────────────────────────────────────────┐
│ First Share:                            │
│ • Platform downloads image              │
│ • Processes and caches                  │
│ • Time: 1-3 seconds                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Subsequent Shares:                      │
│ • Platform uses cached version          │
│ • Time: Instant                         │
│ • Cache duration: Varies by platform    │
└─────────────────────────────────────────┘
```

---

This visual guide shows how all the pieces work together to create rich social media previews!
