import { Coordinates2D } from "../space";

const SPEED_MULTIPLIER = 0.2;
const MIN_VELOCITY = 0.005;

export const getRandomVelocity = () => ({
    x: SPEED_MULTIPLIER * (2 * Math.random() - 1) + MIN_VELOCITY,
    y: SPEED_MULTIPLIER * (2 * Math.random() - 1) + MIN_VELOCITY
})

export const getRandomPosition = (max: Coordinates2D) => ({
    x: Math.random() * max.x,
    y: Math.random() * max.y
})