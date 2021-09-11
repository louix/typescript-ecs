import { World } from "./world";

console.time("setup");

const world = new World();

const entities = new Array(10).fill(0).map((_) => world.newEntity());
entities.forEach((entity) => {
    if (true) {
        world.addComponentToEntity(entity, { position: { x: 0, y: 0 } })
    }
    if (Math.random() > 0.5) {
        world.addComponentToEntity(entity, {renderable: undefined })
    }
})

console.timeEnd("setup");

const run = (previousTime: number) => {
    setTimeout(() => {
        const time = performance.now();
        const delta = time - previousTime;
        world.tick(delta, time);
        run(time)
    }, 1)
}

run(performance.now())