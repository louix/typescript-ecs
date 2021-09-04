import { Entity } from "./types/ecs/entity";
import { isSome, unwrap } from "./types/ecs/option";
import { System } from "./types/ecs/system";
import { World } from "./world";

const VELOCITY = { x: 0.2, y: 0.3 };

export const MovableSystem: System = (delta: number, time: number) => (world: World) => {
    world.getEntitiesByComponentKinds("position").forEach((entity: Entity) => {
        const data = world.getComponentDataForEntity(entity, "position");
        if (isSome(data)) {
            const positionData = unwrap(data);
            positionData.x += VELOCITY.x * delta
            positionData.y += VELOCITY.y * delta
        }
    })
}