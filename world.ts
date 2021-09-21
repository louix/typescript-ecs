import type { ComponentKind, Component, ComponentMap } from './components'
import type { Entity } from './types/game/entity'
import type { System } from './types/game/system'
import { EntityData as RenderableEntityData, mkRenderSystem } from './systems/renderSystem'

export class World {
  #entityCount: number
  #components: ComponentMap
  #systems: Array<System>
  #renderSystem: (world: World) => Array<RenderableEntityData>

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
    this.#renderSystem = mkRenderSystem();
  }
  /**
   * Create and return a new entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   */
  public newEntity(): Entity {
    Object.keys(this.#components).forEach((k) => {
      this.#components[k as ComponentKind].push(null)
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
    this.#components[key as ComponentKind][entity] = value
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
      this.#components[component][entity] = null
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
      if (components.every((c) => this.#components[c][i] !== null)) {
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
 * Execute all associated systems, and return everything that needs rendering!
 * @example
 * const world = new World();
 * const time = performance.now();
 * const delta = time - previous;
 * const renderables = world.tick(delta, time)
 */
  public tick(delta: number, time: number) {
    this.#systems.forEach((system) => system(delta, time)(this));
    return this.#renderSystem(this);
  }
}
