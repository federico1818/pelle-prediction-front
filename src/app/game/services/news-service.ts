import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { Notice } from '../models/notice'

@Injectable({
    providedIn: 'root',
})

export class NewsService {
    protected _http: HttpClient = inject(HttpClient)
    protected _notices: WritableSignal<Notice[]> = signal<Notice[]>([])

    public readonly notices = computed(() => this._notices())

    public get(): Observable<Notice[]> {
        return this._http.get<Notice[]>(environment.api.url + '/news').pipe(
            tap((data: Notice[]) => {
                this._notices.set(data)
            })
        )
    }
}
