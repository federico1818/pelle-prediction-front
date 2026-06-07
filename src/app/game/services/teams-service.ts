import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { Team } from '../models/team'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TeamsService {
    protected _http: HttpClient = inject(HttpClient)
    protected _selectedChampion: WritableSignal<Team | null> = signal<Team | null>(null)
    protected _teams: WritableSignal<Team[]> = signal<Team[]>([])
    protected _canEdit = signal<boolean>(true)

    public readonly selectedChampion = computed(() => this._selectedChampion())
    public readonly teams = computed(() => this._teams())
    public readonly canEdit = computed(() => this._canEdit())

    public all(): Observable<Team[]> {
        if (this._teams().length > 0) {
            return of(this._teams())
        }

        return this._http.get<{ can_edit: boolean; teams: Team[] }>(environment.api.url + '/champion').pipe(
            tap((res) => {
                this._canEdit.set(res.can_edit)
                this._teams.set(res.teams)
                const selected = res.teams.find(t => t.selected)
                this._selectedChampion.set(selected || null)
            }),
            map((res) => res.teams)
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

    public setCanEdit(value: boolean): void {
        this._canEdit.set(value)
    }
}
