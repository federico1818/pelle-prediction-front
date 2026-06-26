import { Component } from '@angular/core'
import { News } from '../../components/news/news'
import { MatchListUpcoming } from '../../components/match-list-upcoming/match-list-upcoming'

@Component({
    selector: 'app-home',
    imports: [News, MatchListUpcoming],
    templateUrl: './home.html',
    styleUrl: './home.css',
})

export class Home {
}
