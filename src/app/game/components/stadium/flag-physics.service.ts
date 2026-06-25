import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root',
})
export class FlagPhysicsService {
    /**
     * Updates the Z position of vertices in a PlaneGeometry to simulate a waving flag.
     * 
     * @param geometry The THREE.BufferGeometry of the flag plane mesh
     * @param h Horizontal wave factor
     * @param v Vertical wave factor (creates the twist/diagonal wave)
     * @param w Swing amplitude
     * @param s Speed of the wave
     * @param time Elapsed time factor
     * @param segW Number of horizontal segments
     * @param segH Number of vertical segments
     */
    updateFlagVertices(
        geometry: THREE.BufferGeometry,
        h: number,
        v: number,
        w: number,
        s: number,
        time: number,
        segW: number,
        segH: number
    ): void {
        const positionAttribute = geometry.attributes['position'];
        if (!positionAttribute) return;

        for (let y = 0; y < segH + 1; y++) {
            for (let x = 0; x < segW + 1; x++) {
                const index = x + y * (segW + 1);
                
                // Inverted wave equation (anchored at right side x = segW, waving at left side x = 0):
                // Inverted wave equation (anchored at right side x = segW, waving at left side x = 0):
                // Math.sin(h * x + v * y - time) * w * (segW - x) / 4
                const vz = Math.sin(h * x + v * y - time) * w * (segW - x) / 4;
                
                positionAttribute.setZ(index, vz);
            }
        }
        
        positionAttribute.needsUpdate = true;
        geometry.computeVertexNormals();
    }
}
