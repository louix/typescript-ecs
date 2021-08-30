import { World } from "./world";

console.time("setup");

export const WORLD = new World();

const entities = new Array(1000).fill(0).map((_) => WORLD.newEntity());
entities.forEach((entity) => {
    if (Math.random() > 0.5) {
        WORLD.addComponentToEntity(entity, { position: { x: 0, y: 0 } })
    }
    if (Math.random() > 0.5) {
        WORLD.addComponentToEntity(entity, { name: `entity${entity}` })
    }
    if (Math.random() > 0.5) {
        WORLD.addComponentToEntity(entity, {renderable: undefined })
    }
})

console.timeEnd("setup");
console.time("lookup");

console.log(JSON.stringify(WORLD.getEntitiesByComponentKinds("position")));

console.timeEnd("lookup");