import type { Entity, OptionalArrayValuesMap, System, TypeToUnion } from "./types";

export class World<Components extends Record<string, unknown>, RenderableData extends Record<string, unknown>> {
  #entityCount: number
  #components: OptionalArrayValuesMap<Components>
  #systems: Array<System<this>>
  #renderSystem: (world: World<Components, RenderableData>) => Array<RenderableData>

  #initialiseComponent(componentKind: keyof Components) {
    this.#components[componentKind] = new Array(this.#entityCount).fill(null);
  }

  public constructor(renderSystem: (world: World<Components, RenderableData>) => Array<RenderableData>) {
    this.#entityCount = 0
    this.#components = {};
    this.#systems = [];
    this.#renderSystem = renderSystem;
  }
  /**
   * Create and return a new entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   */
  public newEntity(): Entity {
    Object.keys(this.#components).forEach((k) => {
      if (this.#components[k as keyof Components] === undefined) {
        this.#initialiseComponent(k)
      }
      this.#components[k as keyof Components]!.push(null)
    })
    return this.#entityCount++
  }

  /**
   * Alias for addComponentToEntity
   */
  public updateComponentForEntity(entity: Entity, component: TypeToUnion<Components>): void {
    const [key, value] = Object.entries(component)[0]
    if (this.#components[key as keyof Components] === undefined) {
      this.#initialiseComponent(key)
    }
    this.#components[key as keyof Components]![entity] = value
  }

  /**
   * Add (or replace) a component to an entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   */
  public addComponentToEntity(entity: Entity, component: TypeToUnion<Components>): void {
    const [key, value] = Object.entries(component)[0]
    if (this.#components[key as keyof Components] === undefined) {
      this.#initialiseComponent(key)
    }
    this.#components[key as keyof Components]![entity] = value
  }

  /**
   * Remove a component from an entity
   * @example
   * const world = new World();
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   * world.removeComponentFromEntity(myEntity, "name");
   */
  public removeComponentFromEntity(entity: Entity, componentName: keyof Components): void {
    if (this.#components[componentName] === undefined) {
      this.#initialiseComponent(componentName)
    }
    this.#components[componentName]![entity] = null
  }

  /**
   * Get a list of entities by component.
   * Usually used in a system to get the components it needs to act on.
   * @example
   * const entities = world.getEntitiesByComponentKinds("position", "velocity")
   */
  public getEntitiesByComponentKinds(...componentNames: Array<keyof Components>): Array<Entity> {
    const entities = []
    // This might be able to be done as so:
    // Memoised get every "some" element from each array, iterate through to find duplicate numbers? zip? something else?
    for (let i = 0; i < this.#entityCount; i++) {
      if (componentNames.every((c) => this.#components[c]?.[i] !== null)) {
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
  public getComponentDataForEntity<T extends keyof Components>(entity: Entity, componentName: T) {
    return this.#components[componentName]![entity];
  }

  /**
   * Register a system with the world to be executed at runtime.
   * @example
   * const world = new World();
   * const mySystem = //... snip
   * world.registerSystem(mySystem);
   */
  public registerSystem(system: System<this>) {
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
