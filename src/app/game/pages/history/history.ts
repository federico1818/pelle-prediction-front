import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { HistoryUserList } from '../../components/history-user-list/history-user-list'

@Component({
    selector: 'app-history',
    imports: [HistoryUserList],
    templateUrl: './history.html',
    styleUrl: './history.css',
})

export class History implements OnInit, OnDestroy {
    private _route = inject(ActivatedRoute)
    private _routeSub?: Subscription

    public currentNickname = signal<string | null>(null)

    public ngOnInit(): void {
        this._routeSub = this._route.paramMap.subscribe(params => {
            const nickname = params.get('nickname')
            this.currentNickname.set(nickname)
        })
    }

    public ngOnDestroy(): void {
        this._routeSub?.unsubscribe()
    }
}
