import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs';
import { DialogueService } from '../services/dialogue-service';
import { Router } from '@angular/router';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
    const dialogueService = inject(DialogueService)
    const router = inject(Router)

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 403) {
                router.navigate(['/intro'])
            }
            return throwError(() => error)
        })
    )
};
