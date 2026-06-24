import { Injectable } from '@angular/core';
import * as THREE from 'three';

interface PretzelParticle {
    mesh: THREE.Mesh;
    vx: number;
    vy: number;
    vr: number;
    onGround: boolean;
    groundTime: number; // Time spent on the ground
}

@Injectable({
    providedIn: 'root'
})
export class PretzelService {
    private scene!: THREE.Scene;
    private texture!: THREE.Texture;
    private pretzels: PretzelParticle[] = [];
    private lastSpawnTime = 0;
    private readonly gravity = 25; // Gravity acceleration
    private readonly groundY = -5; // Floor height matching characterGroup Y
    private readonly maxPretzels = 100;

    constructor() {
        const loader = new THREE.TextureLoader();
        loader.load('assets/img/pretzel.png', (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            this.texture = tex;
        });
    }

    public init(scene: THREE.Scene): void {
        this.scene = scene;
        this.clearPretzels();
    }

    public clearPretzels(): void {
        this.pretzels.forEach(p => this.scene.remove(p.mesh));
        this.pretzels = [];
    }

    public update(timeSeconds: number, deltaTime: number): void {
        if (!this.scene || !this.texture) return;

        // Spawn a pretzel periodically (e.g., every 0.3 - 0.7 seconds)
        if (timeSeconds - this.lastSpawnTime > 0.4 && this.pretzels.length < this.maxPretzels) {
            this.spawnPretzel();
            this.lastSpawnTime = timeSeconds;
        }

        // Update pretzels physics
        for (let i = this.pretzels.length - 1; i >= 0; i--) {
            const p = this.pretzels[i];
            const mat = p.mesh.material as THREE.MeshBasicMaterial;

            if (!p.onGround) {
                // Apply gravity
                p.vy -= this.gravity * deltaTime;

                // Update position
                p.mesh.position.x += p.vx * deltaTime;
                p.mesh.position.y += p.vy * deltaTime;
                p.mesh.rotation.z += p.vr * deltaTime;

                // Check collision with floor
                if (p.mesh.position.y <= this.groundY) {
                    p.mesh.position.y = this.groundY;
                    p.onGround = true;
                    p.vx = 0;
                    p.vy = 0;
                    p.vr = 0;
                }
            } else {
                p.groundTime += deltaTime;
                // Fade out after 4 seconds on the ground
                if (p.groundTime > 4) {
                    const progress = (p.groundTime - 4) / 2; // 2 seconds fade out
                    if (progress >= 1) {
                        // Remove pretzel
                        this.scene.remove(p.mesh);
                        this.pretzels.splice(i, 1);
                        continue;
                    } else {
                        mat.opacity = 1 - progress;
                    }
                }
            }
        }
    }

    private spawnPretzel(): void {
        // Decide side: left (-1) or right (1)
        const side = Math.random() < 0.5 ? -1 : 1;
        
        // Spawn coordinates at the top sides
        const startX = side * 35;
        const startY = 15 + Math.random() * 10; // Random height between 15 and 25
        const startZ = -1.0; // Behind the character sprite (which is at Z >= 0)

        // Dimensions of the pretzel
        const geom = new THREE.PlaneGeometry(2.5, 2.5);
        const mat = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 1
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(startX, startY, startZ);
        
        // Random initial rotation
        mesh.rotation.z = Math.random() * Math.PI * 2;
        this.scene.add(mesh);

        // Toss velocities towards center
        // If left side, vx should be positive; if right side, negative.
        const vx = -side * (10 + Math.random() * 15); 
        const vy = 5 + Math.random() * 10; // Upward initial velocity for parabolic arc
        const vr = (Math.random() - 0.5) * 10; // Spin rate

        this.pretzels.push({
            mesh,
            vx,
            vy,
            vr,
            onGround: false,
            groundTime: 0
        });
    }
}
