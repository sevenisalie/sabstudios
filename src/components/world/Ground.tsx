import React from 'react'
import { MeshReflectorMaterial, Plane, Reflector, useTexture } from '@react-three/drei'

function Ground({ args }: any) {


    return (
        <mesh>
            <Plane args={args} rotation={[-Math.PI / 2, 0, Math.PI / 2]} >
                <MeshReflectorMaterial
                    // roughnessMap={roughnessMap}
                    // normalMap={normalMap}
                    resolution={1024}
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
            </Plane>
        </mesh>

    )
}

export default Ground