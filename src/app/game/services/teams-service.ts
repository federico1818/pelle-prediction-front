import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Team } from '../models/team'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TeamsService {
    protected _http: HttpClient = inject(HttpClient)
    protected _selectedChampion: WritableSignal<Team | null> = signal<Team | null>(null)
    protected _teams: WritableSignal<Team[]> = signal<Team[]>([])

    public readonly selectedChampion = computed(() => this._selectedChampion())
    public readonly teams = computed(() => this._teams())

    public all(): Observable<Team[]> {
        if (this._teams().length > 0) {
            return of(this._teams())
        }

        return this._http.get<Team[]>(environment.api.url + '/teams').pipe(
            tap((teams) => {
                this._teams.set(teams)
                const selected = teams.find(t => t.selected)
                this._selectedChampion.set(selected || null)
            })
        )
    }

    public select(team: Team): Observable<any> {
        return this._http.post<any>(
            environment.api.url + '/champion',
            { team_id: team.id }
        ).pipe(
            tap(() => {
                this._selectedChampion.set(team)
                this._teams.update((teams) =>
                    teams.map((t) => ({
                        ...t,
                        selected: t.id === team.id,
                    }))
                )
            })
        )
    }
}
