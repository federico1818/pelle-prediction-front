import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    private _sessionExpired = new Subject<void>()
    public sessionExpired$ = this._sessionExpired.asObservable()

    constructor() {
        if (this.isAuthenticated() && !this.role) {
            this.logout()
        }
    }

    public notifySessionExpired(): void {
        this._sessionExpired.next()
    }

    public login(token: string, role: string): void {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
    }

    public logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    public get token(): string | null {
        return localStorage.getItem('token')
    }

    public get role(): string | null {
        return localStorage.getItem('role')
    }

    public isAuthenticated(): boolean {
        return !!this.token
    }
}
