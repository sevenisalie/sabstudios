import React, { useLayoutEffect } from 'react'
import { Center, Text3D, useDepthBuffer, SpotLight, Sphere, Text, useVideoTexture, useTexture, Reflector, Gltf, useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import { applyProps, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function Lion(props: any) {
    const { scene, materials, nodes } = useGLTF("/models/apple-gltf/food_apple_01_4k-transformed.glb") as any
    const [aoMap, colorMap, heightMap, metallicMap, normalMap, roughnessMap] = useTexture([
        "/textures/gold-scuffed-bl/gold-scuffed_basecolor-boosted.png",
        "/textures/gold-scuffed-bl/gold-scuffed_basecolor.png",
        "/textures/gold-scuffed-bl/gold-scuffed_metallic.png",
        "/textures/gold-scuffed-bl/gold-scuffed_normal.png",
        "/textures/gold-scuffed-bl/gold-scuffed_roughness.png",
    ])

    return (
        <mesh geometry={nodes.food_apple_01.geometry} {...props} >
            {/* <meshStandardMaterial
                aoMap={aoMap}
                metalnessMap={metallicMap}
                normalMap={normalMap}
                displacementMap={heightMap}
                displacementScale={0.01}
                roughnessMap={roughnessMap}

            /> */}
            <MeshReflectorMaterial
                roughnessMap={roughnessMap}
                normalMap={normalMap}
                blur={[600, 600]}
                resolution={1024}
                mixBlur={1}
                mixStrength={50}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#179123"
                metalness={0.5}
                mirror={0}
            />
        </mesh>

    )
}

export default Lion