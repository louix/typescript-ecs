import { unsafeUnwrap } from "../types/game/option";
import type { System } from "../types/game/system";
import type { Coordinates2D } from "../types/space";
import type { World } from "../world";

const drawImage = (ctx: CanvasRenderingContext2D, source: string, position: { x: number, y: number }) => {
    const image = new Image();
    image.src = source;
    ctx.drawImage(image, position.x, position.y, image.width, image.height);
}

interface RenderSystemEnv {
    ctx: CanvasRenderingContext2D,
    worldSize: Coordinates2D,
    images: {
        moppie: string,
        flower: string,
        flowerless: string
    }
}

export const mkRenderSystem = ({ ctx, worldSize, images }: RenderSystemEnv): System =>
    () => (world: World) => {
        ctx.fillStyle = "#019120";
        ctx.fillRect(0, 0, worldSize.x, worldSize.y);
        world.getEntitiesByComponentKinds("renderable", "shape", "position").forEach((entity) => {
            const shape = unsafeUnwrap(world.getComponentDataForEntity(entity, "shape"));
            const position = unsafeUnwrap(world.getComponentDataForEntity(entity, "position"));
            switch (shape) {
                case "moppie": return drawImage(ctx, images.moppie, position);
                case "flower": return drawImage(ctx, images.flower, position);
                case "flowerless": return drawImage(ctx, images.flowerless, position);
            }
        })
    }