import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';

import { StadiumOnFire } from '../stadium-on-fire/stadium-on-fire'
import { Losers } from '../losers/losers'
import { Winner } from '../winner/winner'
import { Loading } from '../../../shared/components/loading/loading'
import { RankingService } from '../../services/ranking-service'
import { Ranking } from '../../models/ranking'

@Component({
    selector: 'app-end',
    imports: [StadiumOnFire, Losers, Winner, Loading],
    templateUrl: './end.html',
    styleUrl: './end.css',
})

export class End implements OnInit, OnDestroy {
    private _rankingService = inject(RankingService)
    private _intervalId: any
    private _losersList: Ranking[] = []
    
    public losers = signal<Ranking[]>([])
    public winner = signal<Ranking | null>(null)
    public isLoading = signal<boolean>(false)

    public ngOnInit(): void {
        this.isLoading.set(true);
        this._rankingService.get().subscribe({
            next: (rankings) => {
                this.winner.set(rankings[rankings.length - 1]);
                this._losersList = rankings.slice(0, -1);

                this._shuffleList();
                this.isLoading.set(false);

                this._intervalId = setInterval(() => {
                    this._shuffleList();
                }, 5000);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }

    private _shuffleList(): void {
        const shuffled = [...this._losersList].sort(() => Math.random() - 0.5);
        this.losers.set(shuffled);
    }

    public ngOnDestroy(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }
    }
}
