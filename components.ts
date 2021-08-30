import { some } from "./types/option";
import type { Option } from "./types/option";

type ComponentArray<K extends string, V> = { [key in K]: Array<Option<V>>}
export type ComponentSingle<K extends string, V> = { [key in K]: Option<V> }

type NameData = string;
type NameMap = ComponentArray<"name", NameData>
type NameComponent = ComponentSingle<"name", NameData>
export const NameComponent = (data: NameData): NameComponent => ({ name: some(data) })

type PositionData = { x: number, y: number };
type PositionMap = ComponentArray<"position", PositionData>
type PositionComponent = ComponentSingle<"position", PositionData>
export const PositionComponent = (data: PositionData): PositionComponent => ({ position: some(data) });

type RenderableData = void;
type RenderableMap = ComponentArray<"renderable", RenderableData>
type RenderableComponent = ComponentSingle<"renderable", RenderableData>
export const RenderableComponent = (): RenderableComponent => ({ renderable: some(undefined) });

export type Component = NameComponent | PositionComponent | RenderableComponent
export type ComponentMap = NameMap & PositionMap & RenderableMap
export type ComponentKind = keyof ComponentMap;
