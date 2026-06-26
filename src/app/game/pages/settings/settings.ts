import { Component } from '@angular/core'
import { Menu } from '../../components/menu/menu'
import { Instructions } from '../../components/instructions/instructions'
import { ThemeList } from '../../components/theme-list/theme-list'

@Component({
    selector: 'app-settings',
    imports: [Instructions, Menu, ThemeList],
    templateUrl: './settings.html',
    styleUrl: './settings.css',
})

export class Settings {

}
