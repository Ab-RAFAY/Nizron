# 🚀 Managing Nizron Landing Page Content

This guide explains how to update the dynamic sections of your landing page. All sections are designed to be easily updated by modifying simple arrays in their respective component files.

---

## 🏢 1. Client Marquee (Partner Logos)
**File Path:** `src/components/home/client-marquee.tsx`

To add a new client logo:
1. Open the file and find the `clients` array at the top.
2. Add a new object to the array:
```tsx
{ id: 8, name: 'New Client Name', logo: '/path/to/logo.png' }
```
*Note: Store logos in the `/public` folder and use paths like `/logo.png`.*

---

## 🛠️ 2. Tech Stack (Frameworks)
**File Path:** `src/components/home/tech-stack.tsx`

The tech stack is split into two rows: `frontendTech` and `backendTech`.

### To add a Frontend Framework:
1. Find the `frontendTech` array.
2. Add a new entry:
```tsx
{ name: 'New Framework', logo: 'https://cdn.jsdelivr.net/... (or local path)' }
```

### To add a Backend Framework:
1. Find the `backendTech` array.
2. Add a new entry similar to the frontend ones.

---

## 💬 3. Testimonials (Client Reviews)
**File Path:** `src/components/home/testimonials-marquee.tsx`

To add a new customer review:
1. Find the `testimonials` array at the top of the file.
2. Add a new review object:
```tsx
{
  name: "Client Full Name",
  role: "Their Job Title",
  company: "Company Name",
  content: "The quote/review text goes here.",
  avatar: "CN" // Initials for the profile circle
}
```

---

## 💡 Pro Tips:
- **Hot Reload**: Saving any of these files will instantly update the live site while `npm run dev` is running.
- **Images**: For the best look, use transparent `.svg` or `.png` images for logos.
- **Initial Letters**: For testimonials, use 1-2 capital letters for the `avatar` field.
