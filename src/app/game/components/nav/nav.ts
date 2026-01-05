import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, NavigationEnd, Router, Event } from '@angular/router'
import { filter } from 'rxjs'

@Component({
    selector: 'app-nav',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './nav.html',
    styleUrl: './nav.css',
})

export class Nav {
    public page: string = ''

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.page = event.urlAfterRedirects.split('/')[2]
            })
    }
}