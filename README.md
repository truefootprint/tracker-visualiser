## Tracker Visualiser (aka. Outcome Tracker)

This repository contains a [Next.js](https://nextjs.org/) React app. It is a
prototype of how we imagined the Outcome Tracker might work and was one of the
first things we built at TrueFootprint. The app does some interesting things
and has been used for client demo purposes, but the code is very hacky and
should be thrown away. It contains some [D3](https://d3js.org/) graphs and
speaks to [tracker-backend](https://github.com/truefootprint/tracker-backend)
for all its data.

### How to run

```sh
$ yarn
$ make server
```

Then visit [localhost:5000](http://localhost:5000) in your browser.

### How to deploy

The app is a static site and is hosted on GitHub pages. It can be deployed with:

```sh
$ make deploy
```
