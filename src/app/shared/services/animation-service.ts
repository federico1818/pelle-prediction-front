import { Injectable } from '@angular/core'

interface Bill {
    x: number
    y: number
    width: number
    height: number
    rotation: number
    rotationSpeed: number
    speedY: number
    speedX: number
    oscillationSpeed: number
    oscillationAmount: number
    oscillationOffset: number
    scaleX: number
    scaleXSpeed: number
}

@Injectable({
    providedIn: 'root',
})
export class AnimationService {
    public dollars(): void {
        if (typeof document === 'undefined') return

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
        if (!ctx) {
            canvas.remove()
            return
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const bills: Bill[] = []
        const billCount = 120 // Mayor número de billetes para una explosión más vistosa
        const gravity = 0.15 // Fuerza de gravedad
        const friction = 0.98 // Fricción del aire

        // Inicializar billetes en el centro de la pantalla con direcciones radiales
        for (let i = 0; i < billCount; i++) {
            bills.push(this.createBill(canvas.width, canvas.height))
        }

        let animationFrameId: number

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            let activeBills = 0

            for (let i = 0; i < bills.length; i++) {
                const bill = bills[i]

                // Si el billete no ha salido de los límites inferiores o laterales del canvas
                const isInside = bill.y < canvas.height + 50 && bill.x > -50 && bill.x < canvas.width + 50;

                if (isInside) {
                    activeBills++

                    // Física: explosión radial con resistencia del aire y gravedad
                    bill.speedX *= friction
                    bill.speedY = bill.speedY * friction + gravity

                    bill.x += bill.speedX
                    bill.y += bill.speedY

                    // Rotación 2D y simulación de giro 3D (escala X)
                    bill.rotation += bill.rotationSpeed
                    bill.scaleX += bill.scaleXSpeed
                    if (bill.scaleX > 1 || bill.scaleX < -1) {
                        bill.scaleXSpeed = -bill.scaleXSpeed
                    }

                    // Dibujar billete
                    ctx.save()
                    ctx.translate(bill.x, bill.y)
                    ctx.rotate(bill.rotation)
                    ctx.scale(bill.scaleX, 1)

                    // Borde y fondo del billete (verde dólar)
                    ctx.fillStyle = '#85bb65'
                    ctx.strokeStyle = '#2d5a27'
                    ctx.lineWidth = 1.5

                    // Dibujar rectángulo redondeado
                    ctx.beginPath()
                    ctx.roundRect(-bill.width / 2, -bill.height / 2, bill.width, bill.height, 4)
                    ctx.fill()
                    ctx.stroke()

                    // Dibujo interno del billete (óvalo central)
                    ctx.fillStyle = '#a3cfa2'
                    ctx.beginPath()
                    ctx.ellipse(0, 0, bill.width * 0.35, bill.height * 0.35, 0, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.stroke()

                    // Símbolo del dólar "$"
                    ctx.fillStyle = '#1c3b17'
                    ctx.font = `bold ${bill.height * 0.6}px Arial`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText('$', 0, 0)

                    ctx.restore()
                }
            }

            if (activeBills > 0) {
                animationFrameId = requestAnimationFrame(update)
            } else {
                window.removeEventListener('resize', resizeCanvas)
                canvas.remove()
            }
        }

        update()
    }

    private createBill(canvasWidth: number, canvasHeight: number): Bill {
        const width = 35 + Math.random() * 15
        const height = width * 0.5

        // Dirección aleatoria en 360 grados
        const angle = Math.random() * Math.PI * 2
        // Fuerza explosiva hacia afuera
        const force = 3 + Math.random() * 10

        return {
            x: canvasWidth / 2,
            y: canvasHeight / 2,
            width,
            height,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.15,
            speedY: Math.sin(angle) * force,
            speedX: Math.cos(angle) * force,
            oscillationSpeed: 0.02 + Math.random() * 0.03,
            oscillationAmount: 0.2 + Math.random() * 0.5,
            oscillationOffset: Math.random() * 100,
            scaleX: Math.random() * 2 - 1,
            scaleXSpeed: 0.04 + Math.random() * 0.05,
        }
    }
}
