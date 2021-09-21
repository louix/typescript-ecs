import type { System } from "../types/game/system";
import type { Coordinates2D } from "../types/space";
import type { World } from "../world";

const INTERSECTION_PADDING = 15;

const isIntersecting = (a: Coordinates2D, b: Coordinates2D) => Math.abs(a.x - b.x) < INTERSECTION_PADDING && Math.abs(a.y - b.y) < INTERSECTION_PADDING
const getRegrowthTime = () => 5000 + Math.random() * 20000;

export const IntersectingSystem: System = () => (world: World) => {
    const shapeEntities = world.getEntitiesByComponentKinds("shape", "position")!;
    shapeEntities.forEach((entityA) => {
        const entityAShape = world.getComponentDataForEntity(entityA, "shape")!;
        if (entityAShape === "moppie") {
            const entityAPosition = world.getComponentDataForEntity(entityA, "position")!;
            shapeEntities
                .map((entityB) => {
                    const entityBShape = world.getComponentDataForEntity(entityB, "shape")!;
                    return { entity: entityB, shape: entityBShape }
                })
                .filter(({ shape }) => shape === "flower")
                .forEach((flower) => {
                    const flowerPosition = world.getComponentDataForEntity(flower.entity, "position")!;
                    if (isIntersecting(entityAPosition, flowerPosition)) {
                        world.addComponentToEntity(flower.entity, { shape: "flowerless" })
                        world.addComponentToEntity(flower.entity, { regrowing: getRegrowthTime() })
                    }
                })
        }
    })
}
