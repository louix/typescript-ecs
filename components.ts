import type { OptionalArrayValuesMap, OptionalValues, UnionKeys, UnionValues } from "./types/ecs/component";
import { Coordinates2D } from "./types/helpers/coordinates";

// Add new components here
type Name = { name: string };
type Position = { position: Coordinates2D };
type Renderable = { renderable: void };

// Make sure to add your components to the below union
export type Component = Name | Position | Renderable;

// Dynamic Component Types
export type ComponentMap = OptionalArrayValuesMap<Component>;
export type ComponentOption = OptionalValues<Component>;
export type ComponentKind = UnionKeys<Component>;
export type ComponentData = UnionValues<Component>;