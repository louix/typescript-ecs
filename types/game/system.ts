import { World } from "../../world";

export type System = (delta: number, time: number) => (world: World) => void;
