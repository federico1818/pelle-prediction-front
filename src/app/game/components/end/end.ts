import { Component, inject, OnInit, signal } from '@angular/core';

import { StadiumOnFire } from '../stadium-on-fire/stadium-on-fire'
import { ToyFighting } from '../toy-fighting/toy-fighting'
import { Losers } from '../losers/losers'
import { Winner } from '../winner/winner'
import { Loading } from '../../../shared/components/loading/loading'
import { RankingService } from '../../services/ranking-service'
import { Ranking } from '../../models/ranking'

@Component({
    selector: 'app-end',
    imports: [StadiumOnFire, ToyFighting, Losers, Winner, Loading],
    templateUrl: './end.html',
    styleUrl: './end.css',
})

export class End implements OnInit {
    private _rankingService = inject(RankingService)
    public losers = signal<Ranking[]>([])
    public winner = signal<Ranking | null>(null)
    public isLoading = signal<boolean>(false)

    public ngOnInit(): void {
        this.isLoading.set(true);
        this._rankingService.get().subscribe({
            next: (rankings) => {
                this.winner.set(rankings[rankings.length - 1]);
                const list = rankings.slice(0, -1);
                const shuffled = [...list].sort(() => Math.random() - 0.5);
                this.losers.set(shuffled);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }
}
