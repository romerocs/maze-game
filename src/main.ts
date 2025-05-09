import { Application, Container, Assets, Sprite, Graphics, Ticker, Bounds } from "pixi.js";
import './styles.css';

import characterPng from "./sprites/character.png";

interface WallDefinition {
  x: number;
  y: number;
  width: number;
  height: number;
}

type DirectionTypes = "up" | "right" | "down" | "left";
type SideTypes = "minX" | "maxX" | "minY" | "maxY";
interface DirectionOptionsInterface {
  ball: SideTypes;
  wall: SideTypes;
}

class Maze {
  app: Application;
  wallsContainer: Container;
  wallBounds: Bounds[];
  player: Sprite;

  walls: WallDefinition[] = [
    {
      x: 0,
      y: 25,
      width: 25,
      height: 275
    },
    {
      x: 0,
      y: 0,
      width: 300,
      height: 25
    },
    {
      x: 275,
      y: 25,
      width: 25,
      height: 300
    },
    {
      x: 0,
      y: 325,
      width: 300,
      height: 25
    },
    {
      x: 25,
      y: 275,
      width: 125,
      height: 25
    },
    {
      x: 125,
      y: 125,
      width: 25,
      height: 150
    }
  ];

  keyDirection: { [key: string]: boolean; } = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  directionOptions: Record<DirectionTypes, DirectionOptionsInterface> = {
    up: {
      ball: "minY",
      wall: "maxY"
    },
    right: {
      ball: "maxX",
      wall: "minX"
    },
    down: {
      ball: "maxY",
      wall: "minY"
    },
    left: {
      ball: "minX",
      wall: "maxX"
    }
  };

  resetKeyDirection(): void {
    for (const key in this.keyDirection) {
      this.keyDirection[key] = false;
    }
  }

  setBallDirection(e: KeyboardEvent): void {
    const keys = Object.keys(this.keyDirection);

    const isArrowKey = keys.indexOf(e.key);

    if (isArrowKey !== -1) {
      this.resetKeyDirection();
      this.keyDirection[e.key] = true;
    }
  };

  constructor(app: Application, texture: object) {
    this.app = app;
    this.wallsContainer = new Container();
    this.wallBounds = [];

    this.buildMaze();
    this.buildCharacter(texture);
    this.wallBounds = this.wallsContainer.children.map((wall) => wall.getBounds());

    window.addEventListener("keydown", this.setBallDirection.bind(this));

    this.app.ticker.add(this.gameLoop.bind(this));
  }

  buildMaze(): void {
    this.walls.forEach(wall => {
      const graphic = new Graphics();

      graphic.rect(wall.x, wall.y, wall.width, wall.height);
      graphic.fill(0x000000);

      this.wallsContainer.addChild(graphic);
    });

    this.wallsContainer.position.set(
      this.app.screen.width / 2 - this.wallsContainer.width / 2,
      this.app.screen.height / 2 - this.wallsContainer.height / 2
    );

    this.app.stage.addChild(this.wallsContainer);
  }

  buildCharacter(texture: object): void {
    this.player = new Sprite(texture);
    this.player.position.set(this.wallsContainer.x - 25, this.wallsContainer.y + this.wallsContainer.height - 46);

    this.app.stage.addChild(this.player);
  }

  handleArrowPress(): void {
    const ballBounds: Bounds = this.player.getBounds();

    if (this.keyDirection.ArrowUp) {

    }
    if (this.keyDirection.ArrowDown) {

    }
    if (this.keyDirection.ArrowRight) {
      const wallsRight = this.wallBounds.filter((wb: Bounds) => wb.minX > ballBounds.maxX);

      console.log(wallsRight);
    }
    if (this.keyDirection.ArrowLeft) {

    }
  }

  gameLoop(ticker: Ticker): void {
    this.handleArrowPress();
  }
}


const app = async (): Promise<void> => {
  const app: Application = new Application();

  await app.init({ background: "#1099bb", resizeTo: window, antialias: true });
  const texture = await Assets.load(characterPng);

  document.body.appendChild(app.canvas);

  const maze = new Maze(app, texture);
};

app();