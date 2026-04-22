# Awesome-GIM

🌐 **Live:** [https://awesome-gim-1776842545305.netlify.app](https://awesome-gim-1776842545305.netlify.app)

Site generat cu **SiteForge** — HTML5 + Tailwind CSS CDN + Vanilla JavaScript.
Nu necesită build step — fișierele se servesc direct.

## Structura proiectului

```
index.html      ← Pagina principală
about.html      ← Despre noi
services.html   ← Servicii
contact.html    ← Contact
style.css       ← Stiluri suplimentare
main.js         ← JavaScript (meniu, animații, formulare)
netlify.toml    ← Configurare deploy Netlify
```

## Cum clonezi și editezi

```bash
git clone https://github.com/Midasplatform-ai/awesome-gim-site.git
cd awesome-gim-site
# Editează fișierele dorite în orice editor (VS Code, etc.)
git add .
git commit -m "Modificare: descriere"
git push
# → Netlify detectează push-ul și redeploy automat
```

## Integrare formular de contact

Formularul din `contact.html` afișează un mesaj de succes în browser (fără backend).
Pentru a trimite emailuri reale, alege una din variantele de mai jos:

### Netlify Forms (cea mai simplă)
Adaugă `netlify` sau `data-netlify="true"` pe tag-ul `<form>` din `contact.html`:
```html
<form name="contact" method="POST" data-netlify="true">
```
Activează recepționarea în Netlify Dashboard → Site → Forms.

### Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Creează un cont gratuit pe [formspree.io](https://formspree.io).

### Webhook custom / backend propriu
Înlocuiește `action` cu URL-ul endpoint-ului tău și trimite un `POST` cu datele formularului.
