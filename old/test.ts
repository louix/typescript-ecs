// type Return = string | number | void;
// type Func<T> = (...args: any[]) => T;
// type PipeParams<T> = [head: T, ...tail: Array<Func<T>>]

// // const p: PipeParams = ["hi", (s: string) => s.length];

// const isFunction = <T>(t: any): t is Func<T> => typeof t === "function"

// const pipe = <T>(...args: PipeParams<Return>) => args.reduce((acc, next) => isFunction<Return>(next) ? next(acc) : next);

// function test(...args: any[]) {
//     args.forEach(console.log)
// }

// const res: string = pipe(
//     "hi",
//     (v) => v.toUpperCase
// )()

// const a = new Array(10).map((_, i) => i + 1)
// console.log(a)
// Object.freeze

// let a = 0;
// console.log(a++);
// console.log(a);

class MyArray extends Array<string> {
    pushNone() {
        this.push("");
    }
}

const a = new Map<"a"|"b", MyArray>([
    ["a", new MyArray()],
    ["b", new MyArray()]
])

for (const array of a.values()) {
    array.pushNone()
}

console.log(a)
