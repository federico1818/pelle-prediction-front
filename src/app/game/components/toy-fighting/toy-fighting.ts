import { Component, input, computed } from '@angular/core'

@Component({
    selector: 'app-toy-fighting',
    imports: [],
    templateUrl: './toy-fighting.html',
    styleUrl: './toy-fighting.css',
})

export class ToyFighting {
    public nickname = input.required<string>()

    public backgroundImage = computed(() => {
        return `url('/assets/img/fight/${this.nickname()}-fighting.webp')`
    })
}
