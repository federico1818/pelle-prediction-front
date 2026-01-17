import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.html',
    styleUrl: './callback.css',
})

export class Callback implements OnInit {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router: Router = inject(Router)

    public ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            const token = params.get('token')
            if (token) {
                localStorage.setItem('token', token)
                this.router.navigate(['/game'])
            } else {
                this.router.navigate(['/auth/login'])
            }
        })
    }
}
