import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router)

    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            if (e.status === 403) {
                const { scene } = e.error
                router.navigate(['/scenes', scene.id])
            }
            return throwError(() => e)
        })
    )
}