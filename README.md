# Astro**neo**my

Assignment task for Scribeless

## Installation

### Create a new Firebase project

Head over to your [firebase console](https://console.firebase.google.com/) and click on **Add Project.**<br/>
Choose a suitable name, and follow the instuctions on the screen to set up the project.

### Enable Billing

Once the project is created, click on **Modify** at the bottom of the left sidebar. Switch the project to the **Blaze** Plan to enable billing and increase quotas.

### Dependency Installation

Run the following in the root directory of the project.

```
npm install
```

Firebase CLI and the other dependencies are now installed in your system.

### Firebase Project Initialization

First, you need to login to the Firebase CLI using:

```
firebase login
```

To initialise the project on firebase, run the following in the root directory of the project.

```
firebase init
```

Answer the questions served by the CLI as mentioned below.

```
? Are you ready to proceed? (Y/n)

y
```

```
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.

Hosting
Functions
Firestore
```

```
? What file should be used for Firestore Rules? 

firestore.rules
```

``` What file should be used for Firestore indexes? 

firestore.indexes.json
```

```
? What do you want to use as your public directory?

dist/spa
```

```bash
Configure as a single-page app (rewrite all urls to /index.html)?

Yes
```

```bash
? File public/index.html already exists. Overwrite?

No
```

Firebase has now been initialised on this project.

### Firebase Configuration

Head over to your [firebase console](https://console.firebase.google.com/) and click on The project you created.<br/>
Create a new web app, and follow the instuctions on the screen to set up the project.

Create a new file in the root of your project **firebaseConfig.json** and paste in your config object.

Alternatively, you can pass this config as an environment variable.

### Enable Authentication

Once the project is set up, click on the **Authentication** option in the left menu bar. In the **Sign in methods** tab, enable Email/Password as well as Google authentication. More options can be enabled but are not integrated into the UI.

### Create Firestore Database

Click on the **Firestore** option in the left menu bar. Select the region which you want to set up your project in (preferably in a location that is nearest to your audience). **DO NOT** select a region which does not have cloud function capability. Such a warning would be shown to you upon selection of such a region.

The default region configured for this project is `Europe West 1`.

### Setting project region

The firebase functions should be set up in the same location as your database, to decrease latency and billing costs. To do that, open `/src/boot/firebase.js` and set the value of `const FIREBASE_REGION` to the region of your choice.

Now, go to `/functions/index.js/` and change the value of `const FIREBASE_REGION` to whatever you desire.

The default region set in both these locations is `Europe West 1`.

### Adding NeoWS API Key

Generate an API key by going to the [NASA APIs site](https://api.nasa.gov/).

Then, set it in your firebase config using:

``` bash
firebase functions:config:set neows.key="THE API KEY"
```

## Serving

### Development build

Navigate to the the root of the repository, and execute the following in a terminal.

```
npm run local
```

### Source Building

Navigate to the the root of the repository, and execute the following in a terminal.

```
npm run build
```

### Serving locally

Navigate to the the root of the repository, and execute the following in a terminal.

```
npm run serve
```

Click the link generated in the console to view the locally served app.

## Deployment

### Deploying on firebase

Navigate to the the root of the repository, and execute the following in a terminal.

```
npm run deploy
```

Click the link generated in the console to view the hosted app.

## Live Demo

You can access the project's live demo [here](https://astroneomy.web.app/).