export interface ChampionPrediction {
    user: {
        nickname: string
    }
    team: {
        label: string
        code: string,
        insults: string[]
    }
}