import type { ComponentKind, Component, ComponentMap } from './components'
import type { Entity } from './types/game/entity'
import type { System } from './types/game/system'
import { isSome, none, some } from './types/game/option'

export class World {
  #entityCount: number
  #components: ComponentMap
  #systems: Array<System>

  public constructor() {
    this.#entityCount = 0
    this.#components = { // todo: make this dynamic?
      shape: [],
      position: [],
      velocity: [],
      renderable: [],
      regrowing: []
    }
    this.#systems = [];
  }
  /**
   * Create and return a new entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   */
  public newEntity(): Entity {
    Object.keys(this.#components).forEach((k) => {
      this.#components[k as ComponentKind].push(none())
    })
    return this.#entityCount++
  }

  /**
   * Add a component to an entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   */
  public addComponentToEntity(entity: Entity, component: Component): void {
    const [key, value] = Object.entries(component)[0]
    this.#components[key as ComponentKind][entity] = some(value)
  }

    /**
   * Remove a component from an entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   * world.removeComponentFromEntity(myEntity, "name");
   */
     public removeComponentFromEntity(entity: Entity, component: ComponentKind): void {
      this.#components[component][entity] = none()
    }

  /**
   * Get a list of entities by component.
   * Usually used in a system to get the components it needs to act on.
   * @example
   * const entities = world.getEntitiesByComponentKinds("position", "velocity")
   */
  public getEntitiesByComponentKinds(...components: ComponentKind[]): Entity[] {
    const entities = []
    // This might be able to be done as so:
    // Memoised get every "some" element from each array, iterate through to find duplicate numbers? zip? something else?
    for (let i = 0; i < this.#entityCount; i++) {
      if (components.every((c) => isSome<unknown>(this.#components[c][i]))) {
        entities.push(i)
      }
    }
    return entities
  }

  /**
   * Get the data associated with an entity for a given component
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   * world.getComponentDataForEntity(myEntity, "name");
   */
  public getComponentDataForEntity<T extends ComponentKind>(entity: Entity, component: T): ComponentMap[T][number] {
    return this.#components[component][entity];
  }

  /**
   * Register a system with the world to be executed at runtime.
   * @example
   * const world = new World();
   * const mySystem = //... snip
   * world.registerSystem(mySystem);
   */
  public registerSystem(system: System) {
    this.#systems.push(system);
  }

  /**
 * Execute all associated systems!
 * @example
 * const world = new World();
 * var time = performance.now();
 * var delta = time - previous;
 * world.tick(delta, time)
 */
  public tick(delta: number, time: number) {
    this.#systems.forEach((system) => system(delta, time)(this));
  }
}
