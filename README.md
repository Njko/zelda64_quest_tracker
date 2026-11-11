# Carnet de quêtes — Ocarina of Time

Site statique pour suivre l'avancement des quêtes de *The Legend of Zelda: Ocarina of Time* (N64).

- **Où en es-tu ?** — choisis ton étape dans l'histoire ; le site liste ce qu'il est conseillé de faire avant d'avancer, ce qui est en retard, et ce qui peut attendre.
- **Chaque quête** détaille ses conditions, ses étapes à cocher, sa récompense et le meilleur moment pour la faire.
- **Collections** — compteurs de Skulltulas d'or et de quarts de cœur.
- **Progression enregistrée** dans le navigateur (`localStorage`), avec export / import en fichier JSON.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page unique |
| `assets/data.js` | Étapes de l'histoire et quêtes (c'est ici qu'on corrige ou ajoute du contenu) |
| `assets/app.js` | Logique, rendu, stockage local |
| `assets/style.css` | Styles (thème clair et sombre) |

Aucune dépendance, aucune étape de build.

## Publication sur GitHub Pages

Dans le dépôt : **Settings → Pages → Build and deployment → Deploy from a branch**, choisir la branche et le dossier `/ (root)`.

## En local

Ouvrir `index.html` dans un navigateur, ou lancer `python3 -m http.server` à la racine.

---

Site de fans non officiel. The Legend of Zelda est une marque de Nintendo.
