import { MovableSystem } from "./systems";
import { World } from "./world";

console.time("setup");

const world = new World();

const entities = new Array(10).fill(0).map((_) => world.newEntity());
entities.forEach((entity) => {
    if (true) {
        world.addComponentToEntity(entity, { position: { x: 0, y: 0 } })
    }
    if (Math.random() > 0.5) {
        world.addComponentToEntity(entity, { name: `entity${entity}` })
    }
    if (Math.random() > 0.5) {
        world.addComponentToEntity(entity, {renderable: undefined })
    }
})

console.timeEnd("setup");

world.registerSystem(MovableSystem);

const run = (previousTime: number) => {
    setTimeout(() => {
        console.log("tick");
        const time = performance.now();
        const delta = time - previousTime;
        world.run(delta, time);
        run(time)
    }, 1)
}

run(performance.now())