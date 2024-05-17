# IMPORTANT
> [!NOTE]
> You must have NODEJS and GIT installed in your machine.

# Clone and install dependencies

Run these commands to clone and install all dependencies.  
I used pnpm as package manager.  
So if you already have it you can ignore the `npm install -g pnpm`
```
npm install -g pnpm
git clone https://github.com/BSadioDiallo/cagnotte-adonis6.git
cd cagnotte-adonis6
pnpm install
```

## Create a environment file
create a `.env` file or use the existing `.env.example` by renaming it.  
then run `node ace generate:key` to generate a random application key.

## Run migrations
Before starting the server you must make migrations by running the following command.  
This will create a sqlite database inside the `/tmp` directory.

```
node ace migration:run
```

## Run server
```
pnpm run dev
```
The server will run on the port you specified inside the `.env` file.
