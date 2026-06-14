import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { Ranking } from '../models/ranking'

@Injectable({
    providedIn: 'root',
})

export class RankingService {
    protected _http: HttpClient = inject(HttpClient)
    protected _rankings: WritableSignal<Ranking[]> = signal<Ranking[]>([])

    public readonly rankings = computed(() => this._rankings())

    public get(): Observable<Ranking[]> {
        if (this._rankings().length > 0) {
            return of(this._rankings())
        }

        return this._http.get<Ranking[]>(environment.api.url + '/ranking').pipe(
            tap((data: Ranking[]) => {
                this._rankings.set(data)
            })
        )
    }
}
