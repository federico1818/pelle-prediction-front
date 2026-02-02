import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class ModalService {
    private _open = new Subject<void>()
    public open$ = this._open.asObservable()

    public open(): void {
        this._open.next()
    }
}
