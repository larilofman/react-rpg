  <h1 align="center">React RPG</h1>
  <p align="center">
    Tilebased game made with React, work very much in progress.
    <br />
    <a href="https://react-peli.herokuapp.com/" target="_blank"><strong>Open game on Heroku »</strong></a>
  </p>
  
## Table of Contents

* [About the Project](#about-the-project)
  * [List Of Features](#list-of-features)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Running](#running)
* [Usage](#usage)
  * [Movement](#movement)
  * [Attacking](#attacking)
  * [Interaction](#interaction)
* [Major Components](#major-components)
  * [Redux State](#redux-state)
  * [Game Manager](#game-manager)
  * [Map Manager](#map-manager)
  * [Creature Manager](#creature-manager)
  * [Change Zone hook](#change-zone-hook)
  * [Use Turn hook](#use-turn-hook)
  * [Player](#player)
  * [Sprite](#sprite)
  * [Combat Log](#combat-log)
  * [Dev Tools](#dev-tools)
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

## Getting Started

### Installation

After cloning or downloading the project, install the dependencies with `npm install`.

### Running

Start the project on localhost port 3000 with `npm run dev`.  
Build and serve the project on localhost port 5000 with `npm run bns`.

## Usage

### Movement

Character can be moved by either _clicking_ on the map or using _WASD_, _arrow keys_ or _numpad_(1, 3, 7 and 9 for diagonal movement).
Turn can be skipped by pressing _numpad 5_ or _spacebar_ or _clicking_ on your character.

### Attacking

Enemies can be attacked by walking towards them or clicking them when standing on a nearby tile.

### Interaction

Interaction happens with **_E_**-key. So far the only interactable object is the portal to change zone.

## Major Components

### Redux State

The store consists of several slices of varying sizes:
* Game reducer keeps track of general game wide information such as player, zones that have been visited and saving and loading zones.
* Zone reducer manages the currently active zone. Its tiles, objects and creatures and any changes to them such as movement or damage.
* Turn reducer manages the turn system of currently active zone. Once player(and possibly followers if/when they are added) has acted, turn is passed to the next       faction and its creatures take their turn one by one.
* Messages reducer stores combat log and info box message.
* Camera position reducer is responsible for... the position of camera!

### Game Manager

When zone changes in the game reducer, game manager initializes a new map for the zone reducer.

### Map Manager

Map manager listens to changes to the current zone name and once it changes, information is passed to map loader letting it know a new map should be created. The map loader checks if the zone has already been visited and loads those tiles to the current zone state. In the case of previously unvisited zone, data is loaded from JSON and map generated based on either predefined mapping or randomly generated from definitions. Once tiles are set, the state of tiles loaded is changed to true.

### Creature Manager

Working with the same logic as map manager, creature manager passes along information of a changed zone to creature loader. The creature loader checks whether the zone has been visited or not and either places the existing creatures back or spawns new ones based on JSON data. The player and their position is loaded from the game state.

### Change Zone Hook

When player changes zone, the character is stored with the game reducer as is the state of the zone left. Each zone exit contains information of their counterpart on the other zone. Player's position is set by this counterpart's position.

### Use Turn Hook

The game(and any new zones loaded) starts with player's turn. Once player has acted, the turn is given to the next creature of the player faction(allowing followers to be added later). Once all the creatures of a faction have had their turn, the turn is passed on to the next faction. Before each player turn there is a small delay, defined in settings file.

### Player

The player component uses hooks to handle different tasks. In the dependency array of useEffect hook It keeps track of changes to turn state, any keys pressed and whether a path should be found to a clicked position. When turn changes to player, the hook acts accordingly.

### Sprite

Sprite is a div with background image and it is rendered with an absolute position, its position moving to the opposite direction of camera. In case of "animated" sprite, offsets for the background image are passed as props and background position adjusted so the correct part of the tileset image is shown.

### Combat Log

Combat log hook contains a set of message types that can be added to the log. The hook sends a dispatch to add these to the combat log state which is tracked by the combag log UI component that renders them in a scrollable box of text.

### Dev Tools

The main purpose of dev tools is for testing new features before they are implemented in the game, such as saving and loading zones. The component can also be freely moved around because why not!

## Roadmap

Quite a bit of work to do on the "engine" before an actual game can be made. Some ideas in an order of rough importance:

* Major refactoring of map generating to allow for different types of maps like dungeons, outdoors and what not.
* Saving the current game state to local storage and perhaps to cloud too.
* A quest system with quest givers, objectives and log.
* Experience system and more advanced character stats.
* System for items and gear.
* Field of vision with fog of war.
* Separate map building tool.

## Contact

larwazor@gmail.com

## Acknowledgements
* [React Redux](https://react-redux.js.org/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [TypeScript](https://www.typescriptlang.org/)
* [RPG Maker Vx Ace Characters](https://lanto.itch.io/free-characters)
* [Dungeon Crawl 32x32 tiles supplemental](https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental)
