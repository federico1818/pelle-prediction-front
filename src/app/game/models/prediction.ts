import type { Points } from './points'

export interface Prediction {
    nickname: string
    score_1: number
    score_2: number
    points: Points | null
}