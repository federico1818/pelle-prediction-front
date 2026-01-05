import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Nav } from '../../components/nav/nav'

@Component({
    selector: 'app-game',
    imports: [
        RouterOutlet,
        Nav,
    ],
    templateUrl: './game.html',
    styleUrl: './game.css',
})

export class Game {

}
