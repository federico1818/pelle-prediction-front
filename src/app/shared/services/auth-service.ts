import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})

export class AuthService {

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
