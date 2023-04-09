import type { World } from "./world";

export type OptionalArrayValuesMap<T extends Record<string, unknown>> = { [k in keyof T]?: Array<T[k] | null> };

export type Entity = number

export type System<
  Components extends Record<string, any>,
  RenderableData extends Record<string, any>,
  ExternalState extends Record<string, any>> = (delta: number, time: number) => (world: World<Components, RenderableData, ExternalState>, externalState: ExternalState) => void;

export type TypeToUnion<T extends object> = {
  [K in keyof T]: { [K2 in K]: T[K] };
}[keyof T];
