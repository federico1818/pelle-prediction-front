import { Component, signal, WritableSignal } from '@angular/core'
import { NgClass } from '@angular/common'
import { RouterLink, RouterLinkActive, Router, Event, NavigationStart } from '@angular/router'
import { filter } from 'rxjs'

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
    public page: WritableSignal<string> = signal('')

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((e: Event) => e instanceof NavigationStart))
            .subscribe((event: NavigationStart) => {
                this.page.set(event.url.split('/')[2])
            })
    }
}