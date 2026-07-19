import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { HistoryUserList } from '../../components/history-user-list/history-user-list'
import { HistoryItemComponent } from '../../components/history-item/history-item'
import { Loading } from '../../../shared/components/loading/loading'
import { UserService } from '../../services/user-service'
import { UserHistoryItem } from '../../models/user-history-item'

@Component({
    selector: 'app-history',
    imports: [
        HistoryUserList,
        HistoryItemComponent,
        Loading
    ],
    templateUrl: './history.html',
    styleUrl: './history.css',
})

export class History implements OnInit, OnDestroy {
    private _route = inject(ActivatedRoute)
    private _userService = inject(UserService)
    private _routeSub?: Subscription

    public currentNickname = signal<string | null>(null)
    public historyItems = signal<UserHistoryItem[]>([])
    public isLoading = signal<boolean>(false)

    public ngOnInit(): void {
        this._routeSub = this._route.paramMap.subscribe(params => {
            const nickname = params.get('nickname')
            this.currentNickname.set(nickname)

            if (nickname) {
                this.isLoading.set(true)
                this._userService.get().subscribe(users => {
                    const user = users.find(u => u.nickname.toLowerCase() === nickname.toLowerCase())
                    if (user) {
                        this._userService.getHistory(user.id).subscribe({
                            next: (items) => {
                                this.historyItems.set(items)
                                this.isLoading.set(false)
                            },
                            error: () => {
                                this.isLoading.set(false)
                            }
                        })
                    } else {
                        this.historyItems.set([])
                        this.isLoading.set(false)
                    }
                })
            } else {
                this.historyItems.set([])
                this.isLoading.set(false)
            }
        })
    }

    public ngOnDestroy(): void {
        this._routeSub?.unsubscribe()
    }
}
