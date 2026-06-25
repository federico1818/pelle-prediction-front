import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { ChampionPrediction } from '../models/champion-prediction'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})

export class ChampionService {
    protected _http: HttpClient = inject(HttpClient)
    protected _predictions: WritableSignal<ChampionPrediction[]> = signal<ChampionPrediction[]>([])
    protected _selected: WritableSignal<ChampionPrediction | null> = signal<ChampionPrediction | null>(null)

    public readonly predictions = computed(() => this._predictions())
    public readonly selected = computed(() => this._selected())

    public all(): Observable<ChampionPrediction[]> {
        if (this._predictions().length > 0) {
            return of(this._predictions())
        }

        return this._http.get<ChampionPrediction[]>(environment.api.url + '/champion').pipe(
            tap((res) => {
                this._predictions.set(res)
                if (res.length > 0 && !this._selected()) {
                    this._selected.set(res[0])
                }
            }),
            map((res) => res)
        )
    }

    public select(prediction: ChampionPrediction): void {
        this._selected.set(prediction)
    }

    public next(): void {
        const list = this._predictions()
        const current = this._selected()
        if (list.length === 0 || !current) return
        const currentIndex = list.findIndex((p) => p.user.nickname === current.user.nickname)
        const nextIndex = (currentIndex + 1) % list.length
        this._selected.set(list[nextIndex])
    }
}
