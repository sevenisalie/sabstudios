import { MeshReflectorMaterial, Sphere } from '@react-three/drei'
import React from 'react'
import * as THREE from "three"
function Sky({ args }: any) {
    return (
        <>
            <Sphere args={args} >
                <MeshReflectorMaterial
                    // roughnessMap={roughnessMap}
                    // normalMap={normalMap}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={50}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    metalness={0.5}
                    mirror={0}
                    color="#040f05"
                />
            </Sphere>
        </>
    )
}

export default Sky