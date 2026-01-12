import { Component } from '@angular/core'
import { PlayerList } from '../../components/player-list/player-list'
import { PlayerSearch } from '../../components/player-search/player-search'
import { PlayerSelectedList } from '../../components/player-selected-list/player-selected-list'

@Component({
    selector: 'app-list',
    imports: [
        PlayerList,
        PlayerSearch,
        PlayerSelectedList
    ],
    templateUrl: './list.html',
    styleUrl: './list.css',
})

export class List {

}
