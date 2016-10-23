# Bucket Application for CSE 170/COGS 120

##Getting Started
1. You can clone the repo here: [https://github.com/dakong/bucket-app.git] (https://github.com/dakong/bucket-app.git)
2. Make sure you have [Node.js](http://nodejs.org/) and [NPM](https://npmjs.com) installed.
3. Go to the directory where you cloned the project.
4. Run `npm install` to download our node_modules. (Note we only need to do this once, unless someone adds or updates a package)

##Running Our App
1. Then run `npm run build`, to build our public directory.
2. And finally run `npm run start`, to run our Node server.
3. Head on over to [https://localhost:8080](https://localhost:8080) to create some buckets.

##Running In Watch Mode
Instead of having to run `npm run build` everytime we make changes to our app, we can run the command `npm run watch`. This will automatically build any changes we make to the src files into the public directory after every save.
