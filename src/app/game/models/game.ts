import { Team } from './team'

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
    date_time: string
    ends_at: string | null
}

export interface GroupedGames {
    group: {
        name: string
        label: string
    }
    matches: Game[]
}
