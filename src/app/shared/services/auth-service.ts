import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    private _sessionExpired = new Subject<void>()
    public sessionExpired$ = this._sessionExpired.asObservable()

    public notifySessionExpired(): void {
        this._sessionExpired.next()
    }

    public login(token: string): void {
        localStorage.setItem('token', token)
    }

    public logout(): void {
        localStorage.removeItem('token')
    }

    public get token(): string | null {
        return localStorage.getItem('token')
    }

    public isAuthenticated(): boolean {
        return !!this.token
    }
}
