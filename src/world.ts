import type { Entity, OptionalArrayValuesMap, System, TypeToUnion } from './types'

export class World<
  Components extends Record<string, any>,
  RenderableData extends Record<string, any>,
  ExternalState extends Record<string, any>> {
  #entityCount: number
  #components: OptionalArrayValuesMap<Components>
  #systems: Array<System<Components, RenderableData, ExternalState>>
  #getRenderables: (world: World<Components, RenderableData, ExternalState>) => Array<RenderableData>

  #getOrInitializeComponent<K extends keyof Components>(componentKind: K): Array<Components[K] | null> {
    if (this.#components[componentKind] === undefined) {
      this.#components[componentKind] = new Array(this.#entityCount).fill(null)
    }
    return this.#components[componentKind]!
  }

  /**
   *
   * @param getRenderables
   * Function that runs every tick after all systems,
   * should return any required renderable data.
   * @param systems
   * Functions run on every tick,
   * usually used to mutate internal world state.
   */
  public constructor(getRenderables: (world: World<Components, RenderableData, ExternalState>) => Array<RenderableData>, systems: Array<System<Components, RenderableData, ExternalState>> = []) {
    this.#entityCount = 0
    this.#components = {}
    this.#systems = systems
    this.#getRenderables = getRenderables
  }

  /**
   * Create and return a new entity
   * @example
   * const world = new World(getRenderables);
   * const myEntity = world.newEntity();
   */
  public newEntity(): Entity {
    Object.keys(this.#components).forEach((k) => {
      this.#getOrInitializeComponent(k as keyof Components).push(null);
    })
    return this.#entityCount++
  }

  /**
   * Add (or replace) component(s) to an entity
   * @example
   * const world = new World(getRenderables);
   * const myEntity = world.newEntity();
   * world.addComponentsToEntity(myEntity, {name: "entity"});
   */
  public addComponentsToEntity(entity: Entity, components: TypeToUnion<Components>): void {
    Object.entries(components).forEach(([key, value]) => {
      this.#getOrInitializeComponent(key as keyof Components)[entity] = value;
    })
  }

  /**
   * Remove a component from an entity
   * @example
   * const world = new World(getRenderables);
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   * world.removeComponentFromEntity(myEntity, "name");
   */
  public removeComponentFromEntity(entity: Entity, componentName: keyof Components): void {
    this.#getOrInitializeComponent(componentName)[entity] = null;
  }

  /**
   * Get a list of entities by component.
   * Usually used in a system to get the components it needs to act on.
   * @example
   * const entities = world.getEntitiesByComponentKinds("position", "velocity")
   */
  public getEntitiesByComponentKinds(...componentNames: Array<keyof Components>): Entity[] {
    const entities = []
    for (let i = 0; i < this.#entityCount; i++) {
      if (componentNames.every((c) => this.#getOrInitializeComponent(c)[i] !== null)) {
        entities.push(i)
      }
    }
    return entities
  }

  /**
   * Get the data associated with an entity for a given component
   * @example
   * const world = new World(getRenderables);
   * const myEntity = world.newEntity();
   * world.addComponentToEntity(myEntity, {name: "entity"});
   * world.getComponentDataForEntity(myEntity, "name");
   */
  public getComponentDataForEntity<T extends keyof Components>(entity: Entity, componentName: T): Components[T] | null {
    return this.#getOrInitializeComponent(componentName)[entity]
  }

  /**
   * Register a system with the world to be executed at runtime.
   * @example
   * const world = new World(getRenderables);
   * const mySystem = //... snip
   * world.registerSystem(mySystem);
   *
   * If you intend to have World on a Web Worker, you cannot use this
   * as functions are not serializable with:
   * https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
   *
   * Instead you can add the systems when World is created:
   * @example
   * const mySystem1 = //... snip
   * const mySystem2 = //... snip
   * const world = new World(getRenderables, [mySystem1, mySystem2]);
   */
  public registerSystem(system: System<Components, RenderableData, ExternalState>): void {
    this.#systems.push(system)
  }

  /**
   * Execute all associated systems, and return everything that needs rendering!
   * @example
   * const world = new World(getRenderables);
   * const time = performance.now();
   * const delta = time - previous;
   * const externalState = keyPressed.UP ? { direction: "up"} : { direction: "down" }
   * const renderables = world.tick(delta, time, externalState)
   */
  public tick(delta: number, time: number, externalState: ExternalState): RenderableData[] {
    this.#systems.forEach((system) => system(delta, time)(this, externalState))
    return this.#getRenderables(this)
  }
}
