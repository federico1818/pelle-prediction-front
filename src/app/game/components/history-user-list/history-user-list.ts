import { Component, OnInit, inject, input } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user-service'
import { Chip } from '../../../shared/components/chip/chip'
import { User } from '../../models/user'

@Component({
    selector: 'app-history-user-list',
    imports: [Chip],
    templateUrl: './history-user-list.html',
    styleUrl: './history-user-list.css',
})

export class HistoryUserList implements OnInit {
    private _userService = inject(UserService)
    private _router = inject(Router)

    public selectedNickname = input<string | null>(null)
    public users = this._userService.users

    public ngOnInit(): void {
        this._userService.get().subscribe()
    }

    public selectUser(user: User): void {
        const nicknameLower = user.nickname.toLowerCase()
        this._router.navigate(['/game/stats/history', nicknameLower])
    }
}
