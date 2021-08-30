import type { ComponentKind, Component, ComponentMap, ComponentData } from './components'
import { Entity } from './types/entity'
import { isSome, none, unwrap } from './types/option'

export class World {
    #entityCount: number
    #components: ComponentMap

    public constructor () {
      this.#entityCount = 0
      this.#components = {
        name: [],
        position: [],
        renderable: []
      }
    }
    /**
     * Create and return a new entity
     * @example
     * const world = new World();
     * const myEntity = world.newEntity();
     */
    public newEntity (): Entity {
        Object.keys(this.#components).forEach((k) => {
            this.#components.name
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
    public addComponentToEntity (entity: Entity, component: Component): void {
      const [key, value] = Object.entries(component)[0]
      this.#components[key as ComponentKind][entity] = value
    }

    /**
     * Get a list of entities by component.
     * Usually used in a system to get the components it needs to act on.
     * @example
     * const entities = world.getEntitiesByComponentKinds("position", "velocity")
     */
    public getEntitiesByComponentKinds (...components: ComponentKind[]): Entity[] {
      const entities = []
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
    public getComponentDataForEntity(entity: Entity, component: ComponentKind) {
        const data = this.#components[component][entity];
        if (isSome<ComponentData>(data)) {
            const some = unwrap<ComponentData>(data);
        }
    }
}
