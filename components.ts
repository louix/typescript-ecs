import type { OptionalArrayValuesMap, OptionalValues, UnionKeys, UnionValues } from "./types/game/component";
import type { Coordinates2D, Velocity2D } from "./types/space";

// Add new components here
type Shape = { shape: "moppie" | "flower" | "flowerless" };
type Position = { position: Coordinates2D };
type Velocity = { velocity: Velocity2D };
type Renderable = { renderable: void };
type Regrowing = { regrowing: number };

// Make sure to add your components to the below union
export type Component = Shape | Position | Velocity | Renderable | Regrowing;

// Dynamic Component Types
export type ComponentMap = OptionalArrayValuesMap<Component>;
export type ComponentOption = OptionalValues<Component>;
export type ComponentKind = UnionKeys<Component>;
export type ComponentData = UnionValues<Component>;