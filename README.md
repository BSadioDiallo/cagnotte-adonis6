# IMPORTANT
j'ai utilisé pnpm pour installer les dépendances donkeuh telecharge le avant tu as juste à taper ces commandes en dessous.

```
npm install -g pnpm
git clone https://github.com/BSadioDiallo/cagnotte-adonis6.git
cd cagnotte-adonis6
pnpm install
```

## Creation du dossier pour la BD
A la racine du projet tu dois creer un dossier `tmp` c'est là bas que sera stocker la bd

## Creer un fichier env
Après tu dois creer un fichier .env toujours à la racine, dedans tu copy et tu colle ça sauvegardz.  
surtout n'oublie pas le nom du fichier c'est `.env` pas env, ni blalbla.env, juste `.env`
```
NODE_ENV=development
PORT=3333
APP_KEY=yRtE8A3g7sF2pW5bD6nH9kQ1vZ4cX6mY
HOST=localhost
LOG_LEVEL=debug
SESSION_DRIVER=memory
```
## Lancer les migrations
Avant de continuer il faut lancer les migrations pour la base de données.

```
node ace migration:run
```

## Lancer le serveur
```
pnpn run dev
```
Le server se lance sur [localhost:3333](http://localhost:3333)
