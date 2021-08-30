import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as AP from "fp-ts/Apply";
import { pipe } from "fp-ts/function";

class World {
    private healthComponents: Array<O.Option<number>> = [];
    private nameComponents: Array<O.Option<string>> = [];

    public constructor() {
        this.healthComponents = [];
        this.nameComponents = [];
    }
    public newEntity(health: O.Option<number>, name: O.Option<string>) {
        this.healthComponents.push(health);
        this.nameComponents.push(name);
    }
    public getHealthComponents() {
        return this.healthComponents;
    }
    public getNameComponents() {
        return this.nameComponents;
    }
}

const world = new World;

world.newEntity(O.some(0), O.some("chicken"));
world.newEntity(O.some(10), O.some("pig"));
world.newEntity(O.some(25), O.some("bull"));
world.newEntity(O.none, O.some("tank"));


const zip = pipe(
    world.getHealthComponents(),
    A.zip(world.getNameComponents())
)

const withHealthAndName = pipe(
    zip,
    A.filterMap(([health, name]) => AP.sequenceS(O.Apply)({health, name})),
    A.map(({health, name}) => {
        if (health <= 0) {
            console.log(`${name} is dead`);
        } else {
            console.log(`${name} is going strong with ${health} hp`);
        }
    })
)