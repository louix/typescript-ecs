import { Component, ComponentKind, ComponentMap } from './components'
import { Entity } from './types/entity'
import { isSome, none, some } from './types/option'

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

    public newEntity (): Entity {
      Object.keys(this.#components).forEach((k) => this.#components[k as ComponentKind].push(none()))
      return this.#entityCount++
    }

    public addComponentToEntity (entity: Entity, component: Component): void {
      const [key, value] = Object.entries(component)[0]
      this.#components[key as ComponentKind][entity] = value
    }

    public getEntitiesByComponentKinds (...components: ComponentKind[]): Entity[] {
      const entities = []
      for (let i = 0; i < this.#entityCount; i++) {
        if (components.every((c) => this.#components[c][i] !== null)) {
          entities.push(i)
        }
      }
      return entities
    }

    public getComponentDataForEntity(entity: Entity, component: ComponentKind) {
        const data = this.#components[component][entity];
        // if (isSome(data)) {}
        // todo
    }
}
