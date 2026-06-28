import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Phase } from '../models/phase'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})

export class PhaseService {
    protected _http: HttpClient = inject(HttpClient)
    protected _phases: WritableSignal<Phase[]> = signal<Phase[]>([])

    public readonly phases = computed(() => this._phases())

    public all(): Observable<Phase[]> {
        return this._http.get<Phase[]>(environment.api.url + '/phases').pipe(
            tap((res) => {
                this._phases.set(res)
            })
        )
    }
}
