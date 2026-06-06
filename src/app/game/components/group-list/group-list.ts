import { Component, Input, inject, signal, computed, HostListener, ElementRef } from '@angular/core'
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router'
import { filter, map, startWith } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-group-list',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './group-list.html',
    styleUrl: './group-list.css',
})
export class GroupListComponent {
    @Input({ required: true }) groups: { name: string; label: string }[] = []

    private _router = inject(Router)
    private _elementRef = inject(ElementRef)

    public isOpen = signal(false)

    public currentUrl = toSignal(
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => (event as NavigationEnd).urlAfterRedirects),
            startWith(this._router.url)
        ),
        { initialValue: '' }
    )

    public selectedGroup = computed(() => {
        const url = this.currentUrl()
        const parts = url.split('/')
        const lastPart = parts[parts.length - 1]?.toUpperCase()
        return this.groups.find(g => g.name === lastPart) || this.groups[0]
    })

    public toggleDropdown() {
        this.isOpen.update(v => !v)
    }

    public closeDropdown() {
        this.isOpen.set(false)
    }

    public selectGroup() {
        this.closeDropdown()
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown()
        }
    }
}
