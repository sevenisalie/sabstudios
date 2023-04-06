import * as THREE from 'three'
import { LegacyRef, RefAttributes, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, RootState, useThree } from '@react-three/fiber'
import { Frames } from './Frames'
import React from 'react'
import LoadingOverlay from '../home/LoadingOverlay'
import Sky from './Sky'
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing'
import Lite from './Lite'
import Ground from './Ground'
import { Html, PerspectiveCamera } from '@react-three/drei'
import Footer from '../home/Footer'

const asciiText =
    `            ______              
       .d$$$******$$$$c.        
    .d$P*            *$$c      
   $$$$$.           .$$$*$.    
 .$$ 4$L*$$.     .$$Pd$   $b   
 $F   *$. *$$e.e$$* 4$F   ^$b  
d$     $$   z$$$e   $$      $.
$P     *$L$$P   *$$d$*      $$ 
$$     e$$F       4$$b.     $$ 
$b  .$$  $$      .$$  4$b.  $$ 
$$e$P     $b     d$     *$$c$F 
**$P$$$$$$$$$$$$$$$$$$$$$$$$$$  
 *$c.      4$.  $$       .$$   
  ^$$.      $$ d$       d$P    
    *$$c.   *$b$F    .d$P     
       4$$$c.$$$..e$$P*        
          *^^^^^^^*s
`
function Banner({ threeProps }: any) {
    const ref = useRef() as LegacyRef<HTMLDivElement>
    const threeState = useThree(state => state) as RootState
    return (
        <>
            <Html
                sprite
                transform
                style={{ scale: threeState.viewport.aspect < 1 ? "0.88" : "0.58" }}
                {...threeProps}
                position={threeState.viewport.aspect < 1 ? [0, 6, -2] : threeProps.position}
            >


                {/* magic  */}
                <pre key={"ball"} style={{ color: "rgb(23, 145, 35)", fontSize: "0.20em", font: "Cascadia Mono", marginLeft: "8px", padding: "0px 0px 12px 0px", cursor: "default" }}>
                    {asciiText}
                </pre>
            </Html>

        </>
    )
}

function Kamera() {
    const threeState = useThree(state => state) as RootState
    const [cameraOptions, setCameraOptions] = useState({
        focus: 10,
        fov: 75,
        near: 0.1,
        far: 1000,
        aspect: 1.625,
        position: [0, 20, 35]

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

                <Canvas frameloop='always' dpr={[1, 1.5]} >
                    <Kamera />
                    <Lite />

                    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
                    <Sky args={[100, 64, 32]} />
                    <Banner threeProps={{ position: [0, 4, -2] }} />

                    <group position={[0, -0.75, 1]}>
                        <Frames artwork={artwork} images={images} />
                        <Ground args={[200, 200]} />
                    </group>
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
                        <DepthOfField target={[0, -0.75, 4]} focalLength={0.3} bokehScale={15} height={700} />
                    </EffectComposer>
                </Canvas>
                <Footer />
            </Suspense>

        </>
    )
}

export default Terrain