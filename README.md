# 📦 Project: Lollypop Shop

**Lollypop Shop** is a simple and modern candy store web application built with **Vue 3** and **Vite**.

It demonstrates:

- 🛒 Product listing and detail pages (static catalog data)
- 🛍️ Shopping cart with localStorage persistence
- ❤️ Favorites with localStorage persistence
- 🌟 Responsive UI built with Naive UI

---

# 🚀 Technologies Used

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Naive UI](https://www.naiveui.com/) for components

---

# Project Setup

```bash
npm install
npm run dev
```

Environment:

- Copy `.env.example` to `.env` and fill in your own keys:
  - `EMAIL_FROM`, `EMAIL_TO`, `SES_REGION` for the Netlify function `netlify/functions/send-preorder.js` (preorder emails).
  - Optional Firebase `VITE_FIREBASE_*` keys if you wire this up to your own project (current data is static).
- No Firebase/Auth configuration is required for local demo (all data is static).

---

# Live Demo

- Production: https://katiadobra.github.io/lollypop-vue/
- Local preview: `npm run build && npm run preview`

---

# GitHub Pages Deployment

- CI build + deploy lives in `.github/workflows/deploy.yml` (runs on pushes to `main` or manually).
- To verify locally: `npm run build && npm run preview`.

---

# ✨ Future Improvements (optional ideas)

- [ ] Swap static catalog for API-driven products
- [ ] Admin panel for managing products
- [ ] Order history for users
- [ ] Add alternative checkout/fulfilment flows

---

# 📩 Feedback

Feel free to fork, suggest improvements, or open an issue!
Happy coding!

---

# Governance

- License: [MIT](LICENSE)
- Contributions: see [CONTRIBUTING.md](CONTRIBUTING.md)
