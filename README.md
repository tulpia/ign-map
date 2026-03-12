# IGN MAP

Une sorte de copie / re-création de Alltrails avec le SCAN 50 de IGN Rando.
Le but final sera d'etre une alternative axée trail de Alltrails.

[Accéder au backend](https://github.com/tulpia/ign-map-backend)

## TODO

### Profil

- [x] Création du compte
- [x] Connexion
- [x] Authentification
- [x] Deconnexion
- [x] Accès au profil
- [x] Modification des données du profil
- [x] Ajout d'un Trail
- [x] Suppression d'un Trail
- [x] Modification d'un Trail

### Map - Listing

- [x] Affichage des trails dans la boundingBox de la map + update au move de la map
- [x] Affichage des trails dans la forme d'une liste dans un encart à côté de la map
- [x] Ajout de nuqs pour mettre le state de la bbox, des filtres et de la pagination dans l'URL
- [ ] Pagination
- [x] Filtrage par distance / difficulté / temps de complétion
- [ ] Recherche avec Autocomplete IGN
- [ ] Layer des Maps (Scan50 / IGN standard / Mapbox ?) avec changement du tileLayer
- [ ] Pointage par defaut de la map sur le pays de l'user
- [ ] Mise en place des bonnes donnees dans la Card
- [ ] Styling

### Listes

- [ ] Route des listes
- [ ] Listing des listes
- [ ] Ajout d'une liste
- [ ] Suppression d'une liste
- [ ] CRUD d'un trail dans une list

### Map - Single

- [ ] Affichage du tracé
- [ ] Détail du trail (durée / km / dénivelé / difficulté)
- [ ] Météo (sur 5 jours, utiliser OpenWeatherMap ou MeteoFrance)
- [ ] Avis
- [ ] Photos
- [ ] Profil altimétrique (dépend du GPX / KML uploadé)
- [ ] Faire le parcours (HARDCORE, à voir comment implémenter ça), voir pour faire ça hors ligne (encore plus hardcore)
- [ ] Téléchargement du GPX
- [ ] Balisage en direct
- [ ] Météo

### Contribution

- [ ] Upload des photos et du tracé
- [ ] Titre, description, details, filtres
- [ ] Balisage
- [ ] Soumission du tracé
