import { Component, inject, OnInit } from '@angular/core'
import { News } from '../../components/news/news'
import { MatchListUpcoming } from '../../components/match-list-upcoming/match-list-upcoming'
import { NewsService } from '../../services/news-service'
import { StadiumOnFire } from '../../components/stadium-on-fire/stadium-on-fire'

@Component({
    selector: 'app-home',
    imports: [
        News,
        MatchListUpcoming,
        StadiumOnFire
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home implements OnInit {
    private _newsService = inject(NewsService)
    public notices = this._newsService.notices

    public ngOnInit(): void {
        this._newsService.get().subscribe()
    }
}