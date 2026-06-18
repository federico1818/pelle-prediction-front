import { Team } from './team'
import { Group } from './group'
import { Position } from './position'

export interface Game {
    id: number
    team_1: Team
    team_2: Team
    score_1: number | null
    score_2: number | null
    penalties_score_1: number | null
    penalties_score_2: number | null
    phase: string
    group: string | null
    prediction_score_1: number | null
    prediction_score_2: number | null
    date_time_formatted: string
    date_time: string
    ends_at: string | null
    can_edit: boolean
}

export interface GroupedGames {
    group: Group
    matches: Game[]
    positions: Position[]
}

export function isGamePlaying(game: Game): boolean {
    const now = new Date()
    const startDate = new Date(game.date_time)
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000))
    return now >= startDate && now < endDate
}

export function isGameUpcomingOrPlaying(game: Game): boolean {
    const now = new Date()
    const date = new Date(game.date_time)
    return date.getTime() + (2 * 60 * 60 * 1000) > now.getTime()
}

export function isGameFinished(game: Game): boolean {
    const now = new Date()
    const startDate = new Date(game.date_time)
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000))
    return now >= endDate
}

export function getGameTimeRemainingString(game: Game): string {
    const now = new Date()
    const startDate = new Date(game.date_time)
    const diffMs = startDate.getTime() - now.getTime()

    if (diffMs <= 0) {
        return '00:00:00'
    }

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)

    const pad = (n: number) => n.toString().padStart(2, '0')
    return ` Comienza en ${pad(diffHrs)}:${pad(diffMins)}:${pad(diffSecs)}`
}



