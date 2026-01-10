import { Component } from '@angular/core'
import { PlayerList } from '../../components/player-list/player-list'

@Component({
    selector: 'app-list',
    imports: [PlayerList],
    templateUrl: './list.html',
    styleUrl: './list.css',
})

export class List {

}
