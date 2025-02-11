import { Scene, GameObjects, Tilemaps } from "phaser";
import { Direction, GridEngine, GridEngineConfig } from "grid-engine";

import { Sprites, Layers, Tilesets, Maps } from "../constants/assets";
import {
  convertObjectPositionToTilePosition,
  getObjectUnderPlayer,
  handleBicycle,
  handleClickOnNpcIfAny,
  handleClickOnObjectIfAny,
  handleOverlappableObject,
  removeObject,
  spawnNPC,
} from "../utils/object";
import { playClick } from "../utils/audio";
import { getStartPosition, savePlayerPosition } from "../utils/map";
import {
  isMenuOpen,
  isUIOpen,
  toggleMenu,
  triggerUIDown,
  triggerUIExit,
  triggerUILeft,
  triggerUINextStep,
  triggerUIRight,
  triggerUIUp,
} from "../utils/ui";
import { useUserDataStore } from "../stores/userData";
import { useUIStore } from "../stores/ui";

export interface WorldReceivedData {
  facingDirection: Direction;
  startPosition: {
    x: number;
    y: number;
  };
}

export default class WorldScene extends Scene {
  gridEngine: GridEngine;

  currentSprite: GameObjects.Sprite;
  player: GameObjects.Sprite;
  bicycle: GameObjects.Sprite;
  speed: number;

  tilemap: Tilemaps.Tilemap;

  map: Maps = Maps.PALLET_TOWN;

  receivedData: Partial<WorldReceivedData>;

  constructor() {
    super("World");
  }

  init(data: Partial<WorldReceivedData>) {
    this.receivedData = data;
  }

  create(): void {
    this.applyUserDataBeforeRender();
    this.initializeTilemap();
    this.initializePlayer();
    this.initializeCamera();
    this.initializeGrid();
    this.initializeNPCs();
    this.listenKeyboardControl();
    this.applyUserDataAfterRender();
    this.gridEngine.positionChangeFinished().subscribe((observer) => {
      if (observer.charId === Sprites.PLAYER) {
        savePlayerPosition(this);
        this.handleObjectsOverlap();
      }
    });
  }

  update(): void {
    if (isUIOpen()) {
      return;
    }

    this.listenMoves();
  }

  initializeTilemap(): void {
    this.tilemap = this.make.tilemap({ key: this.map });

    const all_tilesets = Object.values(Tilesets).reduce(
      (acc: Tilemaps.Tileset[], value: Tilesets) => {
        if (this.tilemap.tilesets.find(({ name }) => name === value)) {
          const tileset = this.tilemap.addTilesetImage(value);

          if (tileset) {
            acc = [...acc, tileset];
          }
        }

        return acc;
      },
      [],
    );

    Object.values(Layers)
      .filter((layer) => layer !== Layers.OBJECTS)
      .forEach((layer) => {
        this.tilemap.createLayer(layer, all_tilesets);
      });
  }

  handleObjectsOverlap(): void {
    const objectUnderPlayer = getObjectUnderPlayer(this);

    if (objectUnderPlayer) {
      handleOverlappableObject(this, objectUnderPlayer);
    }
  }

  initializePlayer() {
    const onBicycle = useUserDataStore.getState().onBicycle;

    this.player = this.add.sprite(0, 0, Sprites.PLAYER);
    this.bicycle = this.add.sprite(0, 0, Sprites.BICYCLE);

    [this.player, this.bicycle].forEach((sprite) => {
      sprite.setOrigin(0.5, 0.5);
      sprite.setDepth(1);
      sprite.setScale(1.2);
    });

    this.currentSprite = onBicycle ? this.bicycle : this.player;
    this.speed = onBicycle ? 10 : 5;
  }

  initializeGrid(): void {
    const { startPosition, facingDirection } = getStartPosition(this) ?? {};

    const gridEngineConfig = {
      collisionTilePropertyName: "collides",
      characters: [
        {
          id: Sprites.PLAYER,
          sprite: this.currentSprite,
          walkingAnimationMapping: 0,
          startPosition,
          charLayer: Layers.WORLD2,
          facingDirection,
          speed: this.speed,
        },
      ],
    } as GridEngineConfig;

    this.gridEngine.create(this.tilemap, gridEngineConfig);
  }

  initializeNPCs() {
    spawnNPC(this);
  }

  initializeCamera(): void {
    this.cameras.roundPixels = true;
    this.cameras.main.setZoom(1.3);
    const vignette = this.cameras.main.postFX.addVignette();
    vignette.radius = 0.8;
    this.followWithCamera(this.currentSprite);
  }

  followWithCamera(sprite: GameObjects.Sprite): void {
    this.cameras.main.startFollow(sprite, true);
    this.cameras.main.setFollowOffset(
      -sprite.width / 2,
      -sprite.height / 2,
    );
  }

  listenKeyboardControl(): void {
    this.input.keyboard?.on("keyup", (event: KeyboardEvent) => {
      const uiStore = useUIStore.getState();
      const isUIOpen = uiStore.menu.isOpen || uiStore.dialog.isOpen;

      if (this.data.get("battleStarted")) {
        return;
      }

      switch (event.key.toUpperCase()) {
        case "M":
          this.sound.mute = !this.sound.mute;
          break;
        case "E":
        case "ENTER":
          if (isUIOpen) {
            playClick(this);
            triggerUINextStep();
          } else {
            handleClickOnObjectIfAny(this);
            handleClickOnNpcIfAny(this);
          }
          break;
        case "ESCAPE":
          playClick(this);
          if (!isMenuOpen()) {
            toggleMenu();
          } else {
            triggerUIExit();
          }
          break;
        case " ":
          handleBicycle(this);
          break;
        case "ARROWDOWN":
        case "S":
          if (isUIOpen) {
            playClick(this);
            triggerUIDown();
          }
          break;
        case "ARROWUP":
        case "W":
          if (isUIOpen) {
            playClick(this);
            triggerUIUp();
          }
          break;
        case "ARROWLEFT":
        case "A":
          if (isUIOpen) {
            playClick(this);
            triggerUILeft();
          }
          break;
        case "ARROWRIGHT":
        case "D":
          if (isUIOpen) {
            playClick(this);
            triggerUIRight();
          }
          break;
      }
    });
  }

  listenMoves(): void {
    if (
      this.input.keyboard &&
      !isUIOpen() &&
      !this.gridEngine.isMoving(Sprites.PLAYER)
    ) {
      const cursors = this.input.keyboard.createCursorKeys();
      const keys = this.input.keyboard.addKeys("W,S,A,D") as Record<
        string,
        { isDown: boolean }
      >;

      if (cursors.left.isDown || keys.A.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.LEFT);
      } else if (cursors.right.isDown || keys.D.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.RIGHT);
      } else if (cursors.up.isDown || keys.W.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.UP);
      } else if (cursors.down.isDown || keys.S.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.DOWN);
      }
    }
  }

  applyUserDataBeforeRender(): void {
    const position = useUserDataStore.getState().position;

    if (position?.map) {
      this.map = position.map;
    }
  }

  applyUserDataAfterRender(): void {
    const inventory = useUserDataStore.getState().inventory;
    const userItemIds = inventory.map(({ objectId }) => objectId);

    // Remove objects that has been already taken
    this.tilemap.objects?.[0].objects.forEach((object) => {
      if (userItemIds.includes(object.id)) {
        removeObject(this, convertObjectPositionToTilePosition(object));
      }
    });
  }
}
