export type Option<T> = Some<T> | None;

export interface Some<T> {
    readonly _tag: "some",
    readonly value: T
}

export interface None {
    readonly _tag: "none"
}

export const isSome = <T>(option: Option<T>): option is Some<T> => {
    return option._tag === "some";
}

export const isNone = <T>(option: Option<T>): option is None => {
    return option._tag === "none";
}

export const unwrap = <T>(option: Some<T>) => {
    return option.value;
}

export const unsafeUnwrap = <T>(option: Option<T>) => {
    if (isSome(option)) {
        return option.value
    } else {
        throw new Error("unsafeUnwrap called on none value");
    }
}

export const some = <T>(value: T): Some<T> => ({ _tag: "some", value })

export const none = (): None => ({ _tag: "none" })