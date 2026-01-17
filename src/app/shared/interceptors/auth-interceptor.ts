import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth-service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)
    if (authService.isAuthenticated()) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authService.token}`
            }
        })
    }
    return next(req)
}