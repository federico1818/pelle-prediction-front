import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Nav } from '../../components/nav/nav'
import { MatchModalEditComponent } from '../../components/match-modal-edit/match-modal-edit'
import { MatchModalComponent } from '../../components/match-modal/match-modal'
import { SessionExpired } from '../../../shared/components/session-expired/session-expired'
import { ErrorAlert } from '../../../shared/components/error-alert/error-alert'
import { UserService } from '../../services/user-service'

@Component({
    selector: 'app-game',
    imports: [
        RouterOutlet,
        Nav,
        MatchModalEditComponent,
        MatchModalComponent,
        SessionExpired,
        ErrorAlert
    ],
    templateUrl: './game.html',
    styleUrl: './game.css',
})

export class Game implements OnInit {
    private _userService = inject(UserService)

    public ngOnInit(): void {
        this._userService.get().subscribe()
    }
}
