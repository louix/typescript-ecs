import type { OptionalArrayValuesMap, OptionalValues, UnionKeys } from "./types/component";

type Name = { name: string };
type Position = { position: { x: number, y: number } };
type Renderable = { renderable: void };

export type Component = Name | Position | Renderable;

export type ComponentMap = OptionalArrayValuesMap<Component>;
export type ComponentOption = OptionalValues<Component>;
export type ComponentKind = UnionKeys<Component>;