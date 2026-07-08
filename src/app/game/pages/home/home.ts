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
    public isNotBirthdayToday = true;

    constructor() {
        const today = new Date();
        
        // Fecha local
        const yLocal = today.getFullYear();
        const mLocal = String(today.getMonth() + 1).padStart(2, '0');
        const dLocal = String(today.getDate()).padStart(2, '0');
        const localDate = `${yLocal}-${mLocal}-${dLocal}`;

        // Fecha UTC
        const yUtc = today.getUTCFullYear();
        const mUtc = String(today.getUTCMonth() + 1).padStart(2, '0');
        const dUtc = String(today.getUTCDate()).padStart(2, '0');
        const utcDate = `${yUtc}-${mUtc}-${dUtc}`;

        // Si en local o en UTC es 2026-07-08, ocultamos los partidos
        if (localDate === '2026-07-08' || utcDate === '2026-07-08') {
            this.isNotBirthdayToday = false;
        }
    }
}
