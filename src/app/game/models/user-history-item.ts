import { Team } from './team'

export interface UserHistoryItem {
    game_id: number
    team_1: Team
    team_2: Team
    score_1: number | null
    score_2: number | null
    prediction: {
        score_1: number | null
        score_2: number | null
    } | null
    points: {
        value: number
        type: 'exact' | 'diff' | 'winner' | 'lose'
    } | null
    date_time: string
}
