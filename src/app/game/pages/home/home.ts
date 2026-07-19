import { Component, inject, OnInit, computed } from '@angular/core'
import { News } from '../../components/news/news'
import { MatchListUpcoming } from '../../components/match-list-upcoming/match-list-upcoming'
import { NewsService } from '../../services/news-service'
import { GamesService } from '../../services/games-service'
import { End } from '../../components/end/end'

@Component({
    selector: 'app-home',
    imports: [
        News,
        MatchListUpcoming,
        End
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home implements OnInit {
    private _newsService = inject(NewsService)
    private _gamesService = inject(GamesService)

    public notices = this._newsService.notices

    public gameFinished = computed(() => {
        const finalGame = this._gamesService.playoffGames().find(
            g => g.phase_name?.toLowerCase() === 'final'
        )
        return finalGame !== undefined && finalGame.ends_at !== null
    })

    public ngOnInit(): void {
        this._newsService.get().subscribe()
        this._gamesService.getPlayoffs().subscribe()
    }
}