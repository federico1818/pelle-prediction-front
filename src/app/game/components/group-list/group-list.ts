import { Component, Input, inject, signal, computed, HostListener, ElementRef } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Group } from '../../models/group'
import { GamesService } from '../../services/games-service'

@Component({
    selector: 'app-group-list',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './group-list.html',
    styleUrl: './group-list.css',
})

export class GroupListComponent {
    private _groups = signal<Group[]>([])

    @Input({ required: true })
    set groups(val: Group[]) {
        this._groups.set(val)
    }

    get groups(): Group[] {
        return this._groups()
    }

    private _gamesService = inject(GamesService)
    private _elementRef = inject(ElementRef)

    public isOpen = signal(false)

    public selectedGroup = computed(() => {
        return this._gamesService.selectedGroupData()?.group
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
