# NafoResto

Application mobile de gestion de restaurant (MVP) dédiée au Burkina Faso, pensée pour le mobile-first, l’utilisation offline et la simplicité sur le terrain.

## Fonctionnalités principales du MVP
- Authentification par code PIN
- Dashboard CA du jour et raccourcis rapides
- Vente rapide (caisse, validation, reçu)
- Gestion du stock (seuils, alertes)
- Menu plats (affichage/dispo/prix)
- Données locales SQLite
- Synchronisation prête pour l’extension cloud

---

## Installation et lancement (dev)

### Pré-requis
- Node.js installé
- Expo CLI (`npm install -g expo-cli`)
- Un Android/iPhone ou émulateur

### Étapes
```bash
# Clone le repo
 git clone https://github.com/YAMSO22/NafoResto
 cd NafoResto
# Installe les dépendances
 npm install
# Lancer le projet Expo
e
 npx expo start
# Scanner le QR code dans Expo Go (Android recommandé)
```


## Structure des dossiers (résumé)
```
src/
  screens/
  services/
  database/
  components/
  store/
  translations/
  offline/
assets/
App.js
```

## Usage rapide
- À la première ouverture, la base SQLite sera créée automatiquement.
- Les utilisateurs peuvent être ajoutés directement dans la table `employees` (PIN requis pour login).

## Déploiement APK Android
```bash
npx expo build:android -t apk
```
Le fichier `.apk` peut ensuite être copié sur n’importe quel smartphone Android.


## Notes et sécurité
- Données stockées localement et accessibles offline par défaut
- Possibilité de synchronisation cloud à rajouter (Supabase ou API Node.js)
- Prévois un PIN fort pour chaque employé/gérant


## Problèmes ou besoins d’aide ?
Ouvre une issue ou contacte l’auteur YAMSO22.

---

**NafoResto** : la gestion professionnelle adaptée aux restaurateurs du Burkina Faso !
