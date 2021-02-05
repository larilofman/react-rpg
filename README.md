  <h1 align="center">React RPG</h1>
  <p align="center">
    Tilebased game made with React, work very much in progress.
    <a href="" target="_blank"><strong>Open game on Heroku (TBA) »</strong></a>
  </p>
  
## Table of Contents

* [About the Project](#about-the-project)
  * [List Of Features](#list-of-features)
  * [Built With](#built-with)
* [Major Components](#major-components)
  * [Game Manager](#game-manager)
* [Usage](#usage)
  * [Movement](#movement)
  * [Attacking](#attacking)
  * [Interaction](#interaction)
* [Roadmap](#roadmap)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project

A tilebased game in progress. Idea is inspired by roguelike games such as ADOM but more than anything the project is about figuring out how to make a game with React, not so much about making a good game.

### List Of Features

* Tilebased movement
* Following, clamped camera
* Pathfinding
* Zones created from JSON data
* Tiles are placed by predefined mapping or randomly generated

### Built With

* [React](https://reactjs.org)

## Major Components

### Game Manager

Handles stuff!

## Usage

### Movement

Character can be moved with either clicking on the map or **_WASD_**, **_arrow keys_** or **_numpad_**(1, 3, 7 and 9 for diagonal movement.

### Attacking

Enemies can be attacked by walking towards them or clicking them when standing on a nearby tile.

### Interaction

Interaction happens with **_E_**-key. So far the only interactable object is the portal to change zone.

## Roadmap

Quite a bit of work to do for the "engine" before an actual game can be made. Some ideas in an order of rough importance:

* Pop-up messages to show relevant tips for player, for example prompt to press a button to perform certain action like changing zone.
* Major refactoring of map generating to allow for different types of maps like dungeons, outdoors and what not.
* Saving the current game state to local storage and perhaps to cloud too.
* A quest system with quest givers, objectives and log.
* Experience system and more advanced character stats.
* System for items and gear.
* Field of vision with fog of war.

## Contact

larwazor@gmail.com

## Acknowledgements
* [React Redux](https://react-redux.js.org/)
* [Full Stack open 2020](https://fullstackopen.com/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [TypeScript](https://www.typescriptlang.org/)
* [RPG Maker Vx Ace Characters](https://lanto.itch.io/free-characters)
* [Dungeon Crawl 32x32 tiles supplemental](https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental)
