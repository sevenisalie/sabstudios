import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Frames } from './Frames'
import React from 'react'
import LoadingOverlay from '../home/LoadingOverlay'
import Sky from './Sky'
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing'
import Lite from './Lite'
import Ground from './Ground'


const GOLDENRATIO = 1.61803398875

const Terrain = ({ artwork, images }: any) => {

    const LoadingComponent = () => {
        return (
            <>
                <LoadingOverlay />
            </>
        )
    }
    return (
        <>
            <Suspense fallback={LoadingComponent()}>

                <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
                    <Lite />

                    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
                    <Sky args={[100, 64, 32]} />

                    <group position={[0, -0.75, 1]}>
                        <Frames artwork={artwork} images={images} />

                        <Ground args={[200, 200]} />
                    </group>
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
                        <DepthOfField target={[0, -0.75, 4]} focalLength={0.3} bokehScale={15} height={700} />
                    </EffectComposer>
                </Canvas>
            </Suspense>

        </>
    )
}

export default Terrain