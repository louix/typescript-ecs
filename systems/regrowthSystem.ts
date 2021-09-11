import { unsafeUnwrap } from "../types/game/option";
import { System } from "../types/game/system";
import { World } from "../world";

export const RegrowthSystem: System = (delta: number, time: number) => (world: World) => {
    world.getEntitiesByComponentKinds("regrowing").forEach((entity) => {
        const timeToRegrowth = unsafeUnwrap(world.getComponentDataForEntity(entity, "regrowing"));
        if (timeToRegrowth <= 0) {
            world.removeComponentFromEntity(entity, "regrowing");
            world.addComponentToEntity(entity, { shape: "flower" })
        } else {
            world.addComponentToEntity(entity, { regrowing: timeToRegrowth - delta })
        }
    })
}
