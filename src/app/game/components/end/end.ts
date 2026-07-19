import { Component, inject, OnInit, signal } from '@angular/core';

import { StadiumOnFire } from '../stadium-on-fire/stadium-on-fire'
import { ToyFighting } from '../toy-fighting/toy-fighting'
import { Losers } from '../losers/losers'
import { RankingService } from '../../services/ranking-service'
import { Ranking } from '../../models/ranking'

@Component({
    selector: 'app-end',
    imports: [StadiumOnFire, ToyFighting, Losers],
    templateUrl: './end.html',
    styleUrl: './end.css',
})

export class End implements OnInit {
    private _rankingService = inject(RankingService)
    public losers = signal<Ranking[]>([])

    public ngOnInit(): void {
        this._rankingService.get().subscribe(rankings => {
            const list = rankings.slice(0, -1);
            const shuffled = [...list].sort(() => Math.random() - 0.5);
            this.losers.set(shuffled);
        });
    }
}
