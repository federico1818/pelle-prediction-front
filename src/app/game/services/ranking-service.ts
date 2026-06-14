import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Ranking } from '../models/ranking'

@Injectable({
    providedIn: 'root',
})

export class RankingService {
    protected _http: HttpClient = inject(HttpClient)

    public get(): Observable<Ranking[]> {
        return this._http.get<Ranking[]>(environment.api.url + '/ranking')
    }
}
