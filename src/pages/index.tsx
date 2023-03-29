import Head from 'next/head'
import React, { Suspense, useRef } from 'react'
import SabText from '../components/world/SabText'
import { Canvas, useThree } from '@react-three/fiber'
import Lion from "../components/world/Lion"
import Ground from "../components/world/Ground"
import { AccumulativeShadows, BakeShadows, CameraControls, Environment, MeshReflectorMaterial, PerspectiveCamera, RandomizedLight, Sparkles, SpotLight, Stage, useDepthBuffer, useHelper } from '@react-three/drei'
import * as THREE from 'three'
import StartButton from '@/components/world/StartButton'
import Footer from '@/components/home/Footer'
import LoadingOverlay from '@/components/home/LoadingOverlay'
import Sky from '../components/world/Sky'
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing'
import Lite from '@/components/world/Lite'

const cameraOptions = {
    focus: 10,
    fov: 75,
    near: 0.1,
    far: 1000,
    aspect: 1.625,
    rotation: [-0.3172706876688479, 0.10100262483414511, 0.03309708278765691],
    position: [1.3350534861147443, 1.470134949911375, 3.3288727391164907],

} as any



function start() {
    const LoadingComponent = () => {
        return (
            <>
                <LoadingOverlay />
            </>
        )
    }
    return (
        <>
            <Head>
                <title>mrk.sab - home</title>
                <meta name="description" content="Sabaliauskas Studios - In his studio, chaos and squalor reign,
An artistic sanctuary, a psychedelic brain,
Only his art provides the refrain,
A cosmic canvas, a spiritual domain." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/smileycrud.png" />
            </Head>
            <main style={{ position: "relative", width: "full", maxHeight: "100vh", minHeight: "100vh", height: "100vh", backgroundColor: "transparent" }}>
                <Suspense fallback={LoadingComponent()}>
                    <Canvas
                        shadows
                        camera={{
                            position: cameraOptions.position,
                            fov: cameraOptions.fov,
                            rotation: cameraOptions.rotation,

                        }}
                    >
                        <Sky args={[100, 64, 32]} />
                        <Lite />

                        <CameraControls />

                        <group>
                            <SabText position={[0, 0.7, 0]} />
                        </group>

                        <Ground args={[200, 200]} />
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={4} />
                            <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
                        </EffectComposer>
                        {/* <Environment preset="studio" /> */}
                        <BakeShadows />
                    </Canvas>
                    <Footer />
                </Suspense>
            </main>
        </>
    )
}

export default start