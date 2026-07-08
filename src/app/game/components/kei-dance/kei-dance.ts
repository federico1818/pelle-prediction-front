import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kei-dance',
  standalone: true,
  imports: [],
  templateUrl: './kei-dance.html',
  styleUrl: './kei-dance.css',
})
export class KeiDance implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private image!: HTMLImageElement;
  private intervalId: any;

  private readonly COLS = 3;
  private readonly ROWS = 1;
  private readonly SEQUENCE = [0, 1];
  private sequenceIndex = 0;
  private currentFrame = 0;

  // Velocidad de cambio ajustable (en milisegundos)
  public speedMs = 300;

  private frameWidth = 0;
  private frameHeight = 0;

  public ngOnInit(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    this.image = new Image();
    this.image.src = 'assets/img/scenes/kei-dance.webp';
    this.image.onload = () => {
      this.frameWidth = this.image.width / this.COLS;
      this.frameHeight = this.image.height / this.ROWS;
      
      canvasEl.width = this.frameWidth;
      canvasEl.height = this.frameHeight;

      this.startAnimation();
    };
  }

  private startAnimation(): void {
    this.intervalId = setInterval(() => {
      this.drawFrame();
      this.sequenceIndex = (this.sequenceIndex + 1) % this.SEQUENCE.length;
      this.currentFrame = this.SEQUENCE[this.sequenceIndex];
    }, this.speedMs);
  }

  private drawFrame(): void {
    if (!this.ctx || !this.image) return;

    const col = this.currentFrame % this.COLS;
    const row = Math.floor(this.currentFrame / this.COLS);

    const sx = col * this.frameWidth;
    const sy = row * this.frameHeight;

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.drawImage(
      this.image,
      sx, sy, this.frameWidth, this.frameHeight, // origen
      0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height // destino
    );
  }

  public ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
