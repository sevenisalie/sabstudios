import Head from 'next/head'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import SabText from '../components/world/SabText'
import { Canvas, RootState, useThree } from '@react-three/fiber'
import Ground from "../components/world/Ground"
import { BakeShadows, CameraControls, PerspectiveCamera } from '@react-three/drei'
import LoadingOverlay from '@/components/home/LoadingOverlay'
import Sky from '../components/world/Sky'
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing'
import Lite from '@/components/world/Lite'
//footer is lazy loaded below

const cameraOptions = {
    focus: 10,
    fov: 75,
    near: 0.1,
    far: 1000,
    aspect: 1.625,


} as any


function Kamera() {
    const threeState = useThree(state => state) as RootState
    const [cameraOptions, setCameraOptions] = useState({
        focus: 10,
        fov: 75,
        near: 0.1,
        far: 1000,
        aspect: 1.625,
        position: [0, 0.7, 1.1]

    }) as any
    const [mobileViewPort, setMobileViewPort] = useState(false)
    useEffect(() => {

        //vertical
        if (threeState.viewport.aspect < 1) {
            setCameraOptions((state: any) => ({
                ...cameraOptions,
                fov: 125,
            }))
        }
        return console.log("Camera Set")
    }, [window.innerWidth])
    return (
        <>
            <PerspectiveCamera makeDefault {...cameraOptions} />
        </>
    )
}


function start(): JSX.Element {
    const LazyFooter = lazy(() => import('@/components/home/Footer'))
    const LazyHeader = lazy(() => import('@/components/home/Header'))
    return (
        <>
            <Head>
                <title>sab.studios - home</title>
                <meta name="description" content="Sabaliauskas Studios - In his studio, chaos and squalor reign,
                    An artistic sanctuary, a psychedelic brain,
                    Only his art provides the refrain,
                    A cosmic canvas, a spiritual domain."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/smileycrud.png" />
            </Head>
            <main style={{ position: "relative", width: "full", maxHeight: "100vh", minHeight: "100vh", height: "100vh", backgroundColor: "transparent" }}>
                <Suspense fallback={<LoadingOverlay />}>
                    <Canvas
                    >
                        <Kamera />
                        <Sky args={[100, 64, 32]} />
                        <Lite />

                        {/* <CameraControls /> */}

                        <group>
                            <SabText position={[0, 0.7, 0]} />
                        </group>

                        <Ground args={[200, 200]} />
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={4} />
                            <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
                        </EffectComposer>
                        <BakeShadows />
                    </Canvas>
                    <Suspense fallback={<LoadingOverlay />}>
                        <LazyFooter />
                    </Suspense>
                    <Suspense fallback={<LoadingOverlay />}>
                        <LazyHeader />
                    </Suspense>
                </Suspense>
            </main>
        </>
    )
}

export default start