import { Component } from '@angular/core'
import { PlayerList } from '../../components/player-list/player-list'
import { PlayerSearch } from '../../components/player-search/player-search'

@Component({
    selector: 'app-list',
    imports: [
        PlayerList,
        PlayerSearch
    ],
    templateUrl: './list.html',
    styleUrl: './list.css',
})

export class List {

}
