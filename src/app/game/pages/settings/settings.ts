import { Component } from '@angular/core'
import { Menu } from '../../components/menu/menu'
import { Instructions } from '../../components/instructions/instructions'

@Component({
    selector: 'app-settings',
    imports: [Instructions, Menu],
    templateUrl: './settings.html',
    styleUrl: './settings.css',
})

export class Settings {

}
