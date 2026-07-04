import { Component, input, inject } from '@angular/core'
import { Game } from '../../../game/models/game'
import { TeamFlagComponent } from '../../../game/components/team-flag/team-flag'
import { MatchTimeStatusComponent } from '../../../game/components/match-time-status/match-time-status'
import { MatchModalEditAdminService } from '../../services/match-modal-edit-admin-service'

@Component({
    selector: 'app-match-admin-item',
    imports: [TeamFlagComponent, MatchTimeStatusComponent],
    templateUrl: './match-admin-item.html',
    styleUrl: './match-admin-item.css',
    host: {
        'class': 'match',
        '(click)': 'openModal()',
    },
})
export class MatchAdminItemComponent {
    public game = input.required<Game>()

    private _matchModalEditAdminService = inject(MatchModalEditAdminService)

    public openModal(): void {
        this._matchModalEditAdminService.open(this.game())
    }

    public hasScore(): boolean {
        return this.game().score_1 !== null && this.game().score_2 !== null
    }
}
