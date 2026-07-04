import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './../shared/services/auth-service'
import { Router } from '@angular/router'

export const roleGuard: CanActivateFn = (route, _state) => {
    const router = inject(Router)
    const authService: AuthService = inject(AuthService)

    const allowedRoles = route.data['roles'] as string[]
    const userRole = authService.role

    if (!authService.isAuthenticated() || !userRole || !allowedRoles.includes(userRole)) {
        router.navigate(['/game/home'])
        return false
    }

    return true
}
