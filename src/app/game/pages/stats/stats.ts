import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { StatsNav } from '../../components/stats-nav/stats-nav'

@Component({
    selector: 'app-stats',
    imports: [RouterOutlet, StatsNav],
    templateUrl: './stats.html',
    styleUrl: './stats.css',
})

export class Stats {

}
