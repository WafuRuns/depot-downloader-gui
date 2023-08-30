# DepotDownloader GUI

A GUI to simplify the usage of [DepotDownloader](https://github.com/SteamRE/DepotDownloader). As of now, it doesn't allow using all of it's features, so this is primarily for those who want to get an older version of a game and don't want to deal with a CLI. It's possible that more features will come, but the current goal is to make it easier for more casual people.

## Motivation

As a speedrunner, I often come across a situation where using an older version of the game is better. Sometimes it might restore a glitch that used to be important to the speedrun, or the game lost its performance after some questionable patches.

Obviously, I sometimes get asked how I got the old version and many people tend to think I just disable the patching on Steam and then have to make some kind of backup in case I uninstall the game. When I tell them you can just download them using DepotDownloader, but most of them will ditch the idea upon finding out it's a CLI. That's why this exists.

## How to add more speedrun presets

Click the Issues tab at the top on GitHub. Next to the "Add new speedrun preset", click the Get started button, fill in the template and wait for someone to take care of it. It usually shouldn't take more than a couple of days.

## Development and contributions

Contributions are welcome if you want to improve the app, make it cleaner or just extend its functionality so that it can utilize DepotDownloader better.

The app is built using Electron and Vue, utilizing Quasar for the UI and Vite as a bundler.

**Scraping SteamDB will not be added as a feature as SteamDB doesn't wish their website being scraped in any way, please, don't make any pull requests related to this!**

### Install required dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev -m electron
```

### Format the files

```bash
yarn format
```

### Build the app for production

```bash
yarn build -m electron
```
