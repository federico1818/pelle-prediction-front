import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { User } from '../models/user'
import { UserHistoryItem } from '../models/user-history-item'

@Injectable({
    providedIn: 'root',
})

export class UserService {
    protected _http: HttpClient = inject(HttpClient)
    protected _users: WritableSignal<User[]> = signal<User[]>([])

    public readonly users = computed(() => this._users())

    public get(): Observable<User[]> {
        if (this._users().length > 0) {
            return of(this._users())
        }

        return this._http.get<User[]>(environment.api.url + '/users').pipe(
            tap((data: User[]) => {
                this._users.set(data)
            })
        )
    }

    public getHistory(userId: number): Observable<UserHistoryItem[]> {
        return this._http.get<UserHistoryItem[]>(
            environment.api.url + `/users/${userId}/history`
        )
    }
}
