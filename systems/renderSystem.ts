import type { Entity } from "../types/game/entity";
import { unsafeUnwrap } from "../types/game/option";
import type { World } from "../world";

export interface EntityData {
    id: Entity,
    shape: ReturnType<typeof getShape>
    position: ReturnType<typeof getPosition>
}

const getShape = (entity: Entity, world: World) => {
    return unsafeUnwrap(world.getComponentDataForEntity(entity, "shape"));
}

const getPosition = (entity: Entity, world: World) => {
    return unsafeUnwrap(world.getComponentDataForEntity(entity, "position"));
}

export const mkRenderSystem = () => // TODO: type this better?
    (world: World): Array<EntityData> => {
        return world.getEntitiesByComponentKinds("renderable", "shape", "position").map((entity) => {
            const shape = getShape(entity, world);
            const position = getPosition(entity, world);
            return { id: entity, shape, position };
        })
    }