import { getRandomVelocity } from "../types/game/helper";
import { unsafeUnwrap } from "../types/game/option";
import type { System } from "../types/game/system";
import type { Velocity2D, Coordinates2D } from "../types/space";
import type { World } from "../world";

const IMAGE_MAX = 50;
const VELOCITY_MIN = 0.01;
const MOVEMENT_DECAY = 0.99;

const needsNewVelocity = (velocity: Velocity2D) => {
    return (Math.abs(velocity.x) < VELOCITY_MIN || Math.abs(velocity.y) < VELOCITY_MIN)
}

export const mkMovableSystem = (worldSize: Coordinates2D): System =>
    (delta: number, _: number) => (world: World) => {
        world.getEntitiesByComponentKinds("position", "velocity").forEach((entity) => {
            const position = unsafeUnwrap(world.getComponentDataForEntity(entity, "position"));
            const velocity = unsafeUnwrap(world.getComponentDataForEntity(entity, "velocity"));
            position.x += (velocity.x * delta) % (worldSize.x + IMAGE_MAX)
            position.y += (velocity.y * delta) % (worldSize.y + IMAGE_MAX)

            if (needsNewVelocity(velocity)) {
                const { x, y } = getRandomVelocity();
                velocity.x = x;
                velocity.y = y;
            } else {
                velocity.x *= MOVEMENT_DECAY;
                velocity.y *= MOVEMENT_DECAY;
            }

            if (position.x > worldSize.x) position.x -= worldSize.x + IMAGE_MAX;
            if (position.x < -IMAGE_MAX) position.x += worldSize.x + IMAGE_MAX;
            if (position.y > worldSize.y) position.y -= worldSize.y + IMAGE_MAX;
            if (position.y < -IMAGE_MAX) position.y += worldSize.y + IMAGE_MAX;
        })
    }
