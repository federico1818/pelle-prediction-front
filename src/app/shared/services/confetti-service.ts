import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class ConfettiService {
    public shoot(): void {
        const canvas = document.createElement('canvas')
        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.pointerEvents = 'none'
        canvas.style.zIndex = '99999'
        document.body.appendChild(canvas)

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        const onResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', onResize)

        const colors = [
            '#FFC107', '#FF5722', '#E91E63', '#9C27B0', 
            '#3F51B5', '#00BCD4', '#4CAF50', '#8BC34A',
            '#FFEB3B', '#E040FB', '#00E676', '#29B6F6'
        ]
        const particles: any[] = []
        const particleCount = 120
        const centerX = width / 2
        const centerY = height / 2

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = Math.random() * 12 + 4
            particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                w: Math.random() * 8 + 4,
                h: Math.random() * 12 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                decay: Math.random() * 0.015 + 0.01,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            })
        }

        let animationFrameId: number

        const draw = () => {
            ctx.clearRect(0, 0, width, height)
            let active = false

            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.18 // gravedad
                p.vx *= 0.97 // fricción x
                p.vy *= 0.97 // fricción y
                p.opacity -= p.decay
                p.rotation += p.rotationSpeed

                if (p.opacity > 0) {
                    active = true
                    ctx.save()
                    ctx.globalAlpha = p.opacity
                    ctx.translate(p.x, p.y)
                    ctx.rotate(p.rotation)
                    ctx.fillStyle = p.color
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
                    ctx.restore()
                }
            })

            if (active) {
                animationFrameId = requestAnimationFrame(draw)
            } else {
                window.removeEventListener('resize', onResize)
                if (canvas.parentNode) {
                    document.body.removeChild(canvas)
                }
                cancelAnimationFrame(animationFrameId)
            }
        }

        draw()
    }
}
