import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class DialogueService {
    private _text = new Subject<string>()
    public text$ = this._text.asObservable()

    public setText(text: string): void {
        this._text.next(text)
    }
}
