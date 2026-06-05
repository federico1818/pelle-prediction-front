import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Team } from '../models/team'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TeamsService {
    protected _http: HttpClient = inject(HttpClient)

    public all(): Observable<Team[]> {
        return this._http.get<Team[]>(environment.api.url + '/teams')
    }
}
