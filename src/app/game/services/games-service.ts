import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Game } from '../models/game'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    protected _http: HttpClient = inject(HttpClient)

    public all(): Observable<Game[]> {
        return this._http.get<Game[]>(environment.api.url + '/games')
    }
}
