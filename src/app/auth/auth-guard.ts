import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './../shared/services/auth-service'
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = (_route, _state) => {
    const router = inject(Router)
    const authService: AuthService = inject(AuthService)

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login'])
        return false
    }

    return true
}
