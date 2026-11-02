# Baawiil — Portfolio Gaming & Tech (Tailwind CSS v4)

Portfolio HTML + JavaScript, mis en forme en **Tailwind CSS v4**.

## Déploiement GitHub Pages (automatique)

1. Importer tous les fichiers du ZIP **à la racine du dépôt** `baawiil/Baawiil.github.io`, en gardant le dossier caché `.github/workflows/pages.yml`.
2. Remplacer `index.html` et `script.js` existants. On peut supprimer l'ancien `style.css` du dépôt : le nouveau est généré pendant le déploiement.
3. GitHub → Settings → Pages → Build and deployment → Source : **GitHub Actions** (et non Deploy from a branch).
4. GitHub → Actions → « Déployer le portfolio Tailwind » → vérifier le succès du déploiement.
5. Le site sera sur https://baawiil.github.io/.

### Développement local (optionnel)

Installer Node.js, puis :

```bash
npm install
npm run dev
```

Le fichier `style.css` sera généré localement. Ne pas utiliser le CDN Play Tailwind pour la production.

### Personnalisation

Modifier le texte, les sections et les classes Tailwind dans `index.html`. Le fichier source Tailwind est `src/input.css`. Les interactions sont dans `script.js`.

Les projets sont indiqués comme « En conception », sans prétendre qu'ils sont déjà publiés.
