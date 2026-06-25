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

    public readonly predictions = computed(() => this._predictions())

    public all(): Observable<ChampionPrediction[]> {
        if (this._predictions().length > 0) {
            return of(this._predictions())
        }

        return this._http.get<ChampionPrediction[]>(environment.api.url + '/champion').pipe(
            tap((res) => {
                this._predictions.set(res)
            }),
            map((res) => res)
        )
    }
}
