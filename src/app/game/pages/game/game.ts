import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Nav } from '../../components/nav/nav'
import { Menu } from '../../components/menu/menu'
import { Instructions } from '../../components/instructions/instructions'
import { SessionExpired } from '../../../shared/components/session-expired/session-expired'

@Component({
    selector: 'app-game',
    imports: [
        RouterOutlet,
        Nav,
        Menu,
        Instructions,
        SessionExpired
    ],
    templateUrl: './game.html',
    styleUrl: './game.css',
})

export class Game {

}
