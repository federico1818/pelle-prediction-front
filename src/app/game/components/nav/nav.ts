import { Component } from '@angular/core'
import { NgClass } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
    selector: 'app-nav',
    imports: [
        NgClass,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './nav.html',
    styleUrl: './nav.css',
})

export class Nav {
}