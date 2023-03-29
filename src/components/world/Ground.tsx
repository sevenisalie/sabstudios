import React from 'react'
import { MeshReflectorMaterial, Plane, Reflector, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

function Ground({ args }: any) {
    const state = useThree((state) => { state })

    const [roughnessMap, normalMap] = useTexture([
        '/textures/metal/Metal_006_roughness.jpg',
        '/textures/metal/Metal_006_normal.jpg'
    ])
    return (
        <mesh>
            <Plane args={args} rotation={[-Math.PI / 2, 0, Math.PI / 2]} >
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
            </Plane>
        </mesh>

    )
}

export default Ground