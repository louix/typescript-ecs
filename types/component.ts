import type { Option } from "./option";

export type OptionalArrayValuesMap<T extends Record<string, unknown>> = UnionToIntersection<{[k in keyof T]: Array<Option<T[k]>>}>;

export type OptionalValues<T extends Record<string, unknown>> = {
    [k in keyof T]: Option<T[k]>
}

export type UnionKeys<T> = T extends T ? keyof T : never;

type UnionToIntersection<T> = // https://fettblog.eu/typescript-union-to-intersection/
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never