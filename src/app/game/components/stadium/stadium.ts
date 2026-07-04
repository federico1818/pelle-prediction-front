import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy, input, effect, output } from '@angular/core';
import * as THREE from 'three';
import { FlagPhysicsService } from './flag-physics.service';
import { PretzelService } from './pretzel.service';

@Component({
    selector: 'app-stadium',
    standalone: true,
    imports: [],
    templateUrl: './stadium.html',
    styleUrl: './stadium.css',
})
export class Stadium implements AfterViewInit, OnDestroy {
    flagCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('flagCanvas');
    finished = output<void>();
    private hasFinished = false;

    nickname = input.required<string>();
    country = input.required<string>();
    src = input<string>('');
    
    // Wave parameters matching CodePen default values
    h = input<number>(0.5); // horizontal wave factor
    v = input<number>(0.3); // vertical wave factor (creates the twist)
    w = input<number>(0.2); // swing amplitude
    s = input<number>(0.5); // speed

    // Offsets to align the flag to the flagpole inside the sprite sheet
    flagOffsetX = input<number>(-11);
    flagOffsetY = input<number>(28);
    
    animSpeed = input<number>(6);

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    
    private characterGroup!: THREE.Group;
    private spriteMesh!: THREE.Mesh;
    private spriteTexture!: THREE.Texture;
    
    private flag!: THREE.Mesh;
    private flagTexture: THREE.Texture | null = null;
    
    private readonly width = 600;
    private readonly height = 400;
    private readonly sizeW = 25; // Large flag size (increased by 25%)
    private readonly sizeH = 16.67;
    private readonly segW = 30;
    private readonly segH = this.segW * (2 / 3);

    private animationFrameId?: number;
    private isDestroyed = false;
    private spriteScale = 1.0; // Scale factor to make character 187.5px tall (25% increase)
    private lastFrameTime = Date.now();
    private readonly initPosition = { x: -46, y: -5, z: 0 };
    private readonly velocity = 0.14;

    constructor(private flagPhysics: FlagPhysicsService, private pretzelService: PretzelService) {
        // Reactive effects using Angular Signals
        effect(() => {
            const name = this.nickname();
            if (this.spriteMesh) {
                this.loadCharacterSprite();
                this.restartWalk();
            }
        });

        effect(() => {
            const c = this.country();
            const s = this.src();
            if (this.flag) {
                this.loadFlagTexture();
            }
        });

        effect(() => {
            const ox = this.flagOffsetX();
            const oy = this.flagOffsetY();
            if (this.flag) {
                this.flag.position.set(ox * this.spriteScale, oy * this.spriteScale, 0.05);
            }
        });
    }

    ngAfterViewInit(): void {
        this.initThree();
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
        this.stopAnimation();
        if (this.renderer) {
            this.renderer.dispose();
        }
    }

    private initThree(): void {
        const canvas = this.flagCanvas().nativeElement;

        // Scene
        this.scene = new THREE.Scene();

        // Camera (Perspective to make wave depth visible)
        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000);
        this.camera.position.set(0, 4, 48);
        this.camera.lookAt(new THREE.Vector3(0, 4, 0));

        // Renderer using the static canvas
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true // transparent background
        });
        this.renderer.setSize(this.width, this.height, false);

        // Lights: Bright ambient light so it does not get too dark, plus soft directional light for 3D waves
        const light = new THREE.DirectionalLight('#FFFFFF', 0.8);
        light.position.set(10, 50, 100);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight('#FFFFFF', 1.2);
        this.scene.add(ambientLight);

        // Group to combine character sprite + flag so they move together
        this.characterGroup = new THREE.Group();
        this.resetCharacterPosition(); // Start off-screen on the left
        this.scene.add(this.characterGroup);

        // Calculate scale factor so the 36-unit tall sprite is exactly 187.5px tall on the 400px canvas
        const fovRad = (60 / 2) * Math.PI / 180;
        const heightUnits = 2 * Math.tan(fovRad) * 48; // ~55.42 units total height
        const targetHeightUnits = heightUnits * (187.5 / this.height); // height for 187.5px (150px * 1.25)
        this.spriteScale = targetHeightUnits / 36;

        // Character Sprite Mesh setup
        const spriteGeometry = new THREE.PlaneGeometry(36, 36);
        const spriteMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide
        });
        this.spriteMesh = new THREE.Mesh(spriteGeometry, spriteMaterial);
        this.spriteMesh.renderOrder = 10; // Render player sprite on top of pretzels
        this.characterGroup.add(this.spriteMesh);

        // Flag Mesh setup (no 3D pole cylinder needed since it's on the sprite)
        const flagGeometry = new THREE.PlaneGeometry(this.sizeW, this.sizeH, this.segW, this.segH);
        const flagMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            shininess: 10,
            specular: 0x111111,
            transparent: true, // Group as transparent to respect renderOrder sorting
            depthTest: false // Draw flag on top of player sprite regardless of Z coordinate waves
        });
        this.flag = new THREE.Mesh(flagGeometry, flagMaterial);
        this.flag.renderOrder = 11; // Render flag on top of player sprite and pretzels
        
        // Position flag on the flagpole carried by character (Z=0.05 to eliminate perspective parallax)
        this.flag.position.set(this.flagOffsetX() * this.spriteScale, this.flagOffsetY() * this.spriteScale, 0.05);
        this.characterGroup.add(this.flag);

        this.loadCharacterSprite();
        this.loadFlagTexture();
        this.pretzelService.init(this.scene);
    }

    private loadCharacterSprite(): void {
        const spriteUrl = `assets/img/champion/${this.nickname().toLowerCase()}-walking.webp`;
        const loader = new THREE.TextureLoader();
        
        loader.load(
            spriteUrl,
            (texture) => {
                // The sprite sheet has 3 horizontal walking frames
                texture.repeat.set(1 / 3, 1);
                texture.offset.set(0, 0);
                texture.magFilter = THREE.NearestFilter; // keep pixel-art sharpness
                texture.minFilter = THREE.NearestFilter;
                texture.colorSpace = THREE.SRGBColorSpace;
                
                this.spriteTexture = texture;
                this.spriteMesh.material = new THREE.MeshBasicMaterial({
                    map: this.spriteTexture,
                    transparent: true,
                    side: THREE.DoubleSide
                });

                // Calculate single frame aspect ratio to keep rendering proportional
                const img = texture.image;
                if (img) {
                    const frameWidth = img.width / 3;
                    const frameHeight = img.height;
                    const aspectRatio = frameWidth / frameHeight;
                    this.spriteMesh.scale.set(aspectRatio * this.spriteScale, this.spriteScale, 1);
                }
            },
            undefined,
            (error) => {
                console.error('Error loading character sprite:', error);
            }
        );
    }

    private loadFlagTexture(): void {
        const flagUrl = this.src() || `assets/img/flags/${this.country()}.png`;
        const loader = new THREE.TextureLoader();
        
        loader.load(
            flagUrl,
            (texture) => {
                texture.magFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearFilter;
                texture.colorSpace = THREE.SRGBColorSpace;
                this.flagTexture = texture;
                this.updateFlagMaterial(texture);
                this.startAnimation();
            },
            undefined,
            (error) => {
                console.error('Error loading flag texture:', error);
                this.startAnimation(); // Start anyway with default white color
            }
        );
    }

    private updateFlagMaterial(texture: THREE.Texture | null): void {
        if (!this.flag) return;
        const mat = this.flag.material as THREE.MeshPhongMaterial;
        if (mat) {
            mat.map = texture;
            mat.transparent = true;
            mat.depthTest = false;
            mat.needsUpdate = true;
        }
    }

    private startAnimation(): void {
        this.stopAnimation();
        this.lastFrameTime = Date.now();
        
        const animate = () => {
            if (this.isDestroyed) return;
            
            const now = Date.now();
            const deltaTime = (now - this.lastFrameTime) / 1000;
            this.lastFrameTime = now;

            this.updatePhysics(deltaTime);
            this.renderer.render(this.scene, this.camera);
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        this.animationFrameId = requestAnimationFrame(animate);
    }

    private stopAnimation(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = undefined;
        }
    }

    private updatePhysics(deltaTime: number): void {
        if (!this.flag || !this.characterGroup) return;

        const timeSeconds = Date.now() / 1000;
        const timeWave = Date.now() * this.s() / 50;

        // 1. Update flag waving vertices using FlagPhysicsService
        this.flagPhysics.updateFlagVertices(
            this.flag.geometry as THREE.BufferGeometry,
            this.h(),
            this.v(),
            this.w(),
            this.s(),
            timeWave,
            this.segW,
            this.segH
        );

        // 2. Animate Sprite walking frames (3 frames) - only if walking
        if (this.spriteTexture && this.characterGroup.position.x <= 70) {
            const currentFrame = Math.floor(timeSeconds * this.animSpeed()) % 3;
            this.spriteTexture.offset.x = currentFrame / 3;
        }

        // 3. Move character walking from left to right until it exits the canvas
        if (this.characterGroup.position.x <= 70) {
            this.characterGroup.position.x += this.velocity;
        } else {
            if (!this.hasFinished) {
                this.hasFinished = true;
                this.finished.emit();
            }
        }

        // 4. Update pretzels falling simulation only after the character enters the screen (X >= -40)
        if (this.characterGroup.position.x >= -50) {
            this.pretzelService.update(timeSeconds, deltaTime);
        }
    }

    public restartWalk(): void {
        this.resetCharacterPosition();
        this.hasFinished = false;
    }

    private resetCharacterPosition(): void {
        if (this.characterGroup) {
            this.characterGroup.position.set(this.initPosition.x, this.initPosition.y, this.initPosition.z);
        }
    }
}


