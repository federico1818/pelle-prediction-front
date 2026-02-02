import { Injectable } from '@angular/core'
import { ErrorMessage } from '../models/error-message'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class ErrorService {
    private _error = new Subject<ErrorMessage>()
    public error$ = this._error.asObservable()

    public set(title: string, text: string): void {
        this._error.next({ title, text })
    }
}
