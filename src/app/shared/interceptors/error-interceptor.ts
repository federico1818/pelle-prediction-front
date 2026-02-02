import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { ErrorService } from '../services/error-service'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService)

    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            if (e.status === 409) {
                errorService.set('Ha ocurrido un error', e.error.message)
            }
            return throwError(() => e)
        })
    )
}
