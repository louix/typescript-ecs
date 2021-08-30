import { WORLD } from "../main";
import { Entity } from "./entity";
import { isSome, unwrap } from "./option";

const VELOCITY = { x: 2, y: 3 };

const MovableSystem: System = (delta: number, time: number) => {
    WORLD.getEntitiesByComponentKinds("position").forEach((entity: Entity) => {
        const data = WORLD.getComponentDataForEntity(entity, "position");
        // if (isSome(data)) {
        //     unwrap(data);
        // }
        // todo
    })
}