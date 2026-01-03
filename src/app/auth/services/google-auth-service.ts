import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from './../../../environments/environment'

@Injectable({
    providedIn: 'root',
})

export class GoogleAuthService {
    constructor(
        private http: HttpClient
    ) { }

    public getUrl(): Observable<{ url: string }> {
        return this.http.get<{ url: string }>(
            `${environment.api.url}/auth/google/url`
        )
    }
}
