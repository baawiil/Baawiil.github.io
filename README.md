# Baawiil — Portfolio Gaming & Tech V3

Portfolio responsive en français avec Tailwind CSS v4 et GitHub Pages.

## V3
- Animations de révélation adaptées à `prefers-reduced-motion`
- Cartes de projets filtrables (Discord, Web, Gaming) et statuts honnêtes
- Présentation personnelle enrichie
- Compétences interactives et navigables au clavier
- Contact GitHub et copie du lien du site
- Identité gaming conservée (cyan/violet, fenêtre de code, grille de fond)

## Publication
1. Faire une sauvegarde de la V2 en téléchargeant le ZIP du dépôt depuis GitHub.
2. Importer les fichiers de cette archive sur la branche `main` à la racine du dépôt, **en conservant le chemin `.github/workflows/pages.yml`**. Les fichiers `src/input.css`, `index.html`, `script.js`, `package.json` et `README.md` remplacent ceux de la V2.
3. Dans GitHub → Settings → Pages, conserver **Source : GitHub Actions**.
4. Dans Actions, vérifier l'exécution **Déployer le portfolio Tailwind**.
5. Ouvrir https://baawiil.github.io/ et actualiser avec Ctrl+F5.

Ne pas recréer de workflow GitHub Pages ni publier le fichier source `input.css` directement. `style.css` en racine est un ancien fichier V1 : le workflow compile le nouveau CSS dans `dist/style.css`, il n'en a pas besoin.

## En local (Node.js installé)
```bash
npm install
npm run build
```
Ouvrir `dist/index.html` après copie des fichiers via le workflow ou utiliser un serveur local. Le fichier CSS est généré par Tailwind.

Les projets encore en conception n'ont volontairement pas de faux liens ou de fausses captures.
