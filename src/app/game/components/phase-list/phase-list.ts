import { Component, Input, inject, signal, computed, HostListener, ElementRef } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Phase } from '../../models/phase'
import { GamesService } from '../../services/games-service'

@Component({
    selector: 'app-phase-list',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './phase-list.html',
    styleUrl: './phase-list.css',
})
export class PhaseList {
    private _phases = signal<Phase[]>([])

    @Input({ required: true })
    set phases(val: Phase[]) {
        this._phases.set(val)
    }

    get phases(): Phase[] {
        return this._phases()
    }

    private _gamesService = inject(GamesService)
    private _elementRef = inject(ElementRef)

    public isOpen = signal(false)

    public selectedPhase = computed(() => {
        const name = this._gamesService.selectedPhaseName()
        return this._phases().find(p => p.name === name) || null
    })

    public toggleDropdown() {
        this.isOpen.update(v => !v)
    }

    public closeDropdown() {
        this.isOpen.set(false)
    }

    public selectPhase() {
        this.closeDropdown()
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown()
        }
    }
}
