import { inject, Injectable } from '@angular/core'
import { Scene } from '../../shared/models/scene'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class SceneService {
    private _http: HttpClient = inject(HttpClient)

    public get(id: number | string): Observable<Scene> {
        return this._http.get<Scene>(
            `${environment.api.url}/scenes/${id}`
        )
    }

    public seen(id: number | string): Observable<any> {
        return this._http.post<any>(
            `${environment.api.url}/scenes/${id}/seen`,
            {}
        )
    }
}
