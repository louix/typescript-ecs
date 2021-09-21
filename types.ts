export type OptionalArrayValuesMap<T extends Record<string, unknown>> = { [k in keyof T]?: Array<T[k] | null> };

export type Entity = number

export type System<World> = (delta: number, time: number) => (world: World) => void;

export type TypeToUnion<T extends object> = {
    [K in keyof T]: { [K2 in K]: T[K]};
  }[keyof T];