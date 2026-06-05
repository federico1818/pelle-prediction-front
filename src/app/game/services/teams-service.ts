import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Team } from '../models/team'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TeamsService {
    protected _http: HttpClient = inject(HttpClient)
    protected _selectedChampion: WritableSignal<Team | null> = signal<Team | null>(null)

    public readonly selectedChampion = computed(() => this._selectedChampion())

    public all(): Observable<Team[]> {
        return this._http.get<Team[]>(environment.api.url + '/teams')
    }

    public select(team: Team): Observable<any> {
        return this._http.post<any>(
            environment.api.url + '/champion',
            { team_id: team.id }
        ).pipe(
            tap(() => {
                this._selectedChampion.set(team)
            })
        )
    }

    public loadSelectedChampion(): Observable<any> {
        return this._http.get<any>(environment.api.url + '/champion').pipe(
            tap((response) => {
                if (response && response.champion && response.champion.team) {
                    this._selectedChampion.set(response.champion.team)
                } else {
                    this._selectedChampion.set(null)
                }
            })
        )
    }
}
