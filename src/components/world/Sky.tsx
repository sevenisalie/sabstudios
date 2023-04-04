import { MeshReflectorMaterial, Sphere } from '@react-three/drei'
import React from 'react'
function Sky({ args }: any) {
    return (
        <>
            <Sphere args={args} >
                <MeshReflectorMaterial

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
            </Sphere>
        </>
    )
}

export default Sky