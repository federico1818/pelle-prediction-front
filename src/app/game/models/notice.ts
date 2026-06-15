import { Scene } from "../../shared/models/scene"

export interface Notice {
    id: number
    scene_id: number
    date: string
    scene: Scene
}
