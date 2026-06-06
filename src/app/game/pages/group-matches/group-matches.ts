import { Component, inject, computed } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { GamesService } from '../../services/games-service'
import { GroupItemComponent } from '../../components/group-item/group-item'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-group-matches',
    imports: [GroupItemComponent],
    templateUrl: './group-matches.html',
    styleUrl: './group-matches.css',
})

export class GroupMatchesComponent {
    private _route = inject(ActivatedRoute)
    private _gamesService = inject(GamesService)

    public groupLetter = toSignal(
        this._route.paramMap.pipe(
            map(params => params.get('group')?.toUpperCase() || 'A')
        ),
        { initialValue: 'A' }
    )

    public groupData = computed(() => {
        const letter = this.groupLetter()
        const allGroups = this._gamesService.games()
        return allGroups.find(g => g.group.name === letter) || null
    })
}
