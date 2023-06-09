import { Center, Text3D, useDepthBuffer, SpotLight, Sphere, Text, useVideoTexture, useTexture, Reflector } from '@react-three/drei'
import { RootState, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { ExoticComponent, MutableRefObject, RefObject, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from "three"
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import useEventListener from '@/hooks/useEventListener'

import fallbackImage from "../../../public/img/nosignal.jpg"

type VideoTextureProps = {
    unsuspend?: 'canplay' | 'canplaythrough' | 'loadedmetadata'
    muted?: boolean
    loop?: boolean
    start?: boolean
    crossOrigin?: string
}
function VideoMaterial({ url }: any) {
    const meshRef = useRef()

    const [video] = useState(() => { return Object.assign(document.createElement("video"), { src: url, crossOrigin: 'Anonymous', loop: true, muted: true, autoplay: true, playsinline: true }) })
    const videoTextureOptions: VideoTextureProps = {
        unsuspend: 'canplay',
        crossOrigin: 'Anonymous',
        muted: true,
        loop: true,
        start: true,

    }
    // const texture = useVideoTexture(url, videoTextureOptions)
    useEffect(() => {
        video.setAttribute('playsinline', "true")
        video.play()
    }, [])
    return (
        <meshBasicMaterial
            toneMapped={false}>
            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />

        </meshBasicMaterial>
    )
}

function SabText(props: any): JSX.Element {
    const text: MutableRefObject<any | null | undefined> = useRef()


    // window.ontouchstart to start animation into new rotation Amt
    // window.ontouchend to end animation back to 42
    // zi = (xi – min(x)) / (max(x) – min(x))
    //(val, max, min) => (val - min) / (max - min); 
    // useEventListener("click", (e: PointerEvent, eul = rotationAmt) => {
    //     console.log("Clicked")
    //     console.log(e.clientX)
    //     const scalar = (val: number, max: number, min: number) => (((val - min) / (max - min)).toPrecision(4))
    //     const newRotationAmt: string = scalar(e.clientX, 0, e.screenX)
    //     setRotationAmt(parseFloat(newRotationAmt))
    //     console.log(rotationAmt)
    //     setActive(true)
    // })

    // useFrame((state) => {
    //     if (!text) { return }
    //     if (!state) { return }
    //     if (Number.isNaN(text.current.rotation.y)) { return }
    //     if (!active) { return }
    //     let halfX: number = (state.viewport.width / 2)
    //     const sigmoid = (x: number) => { return (1 / (1 + Math.E ** -(x))) }
    //     const newRotationAmt: number = sigmoid(state.mouse.x)
    //     let updatedRotation = (state.mouse.x < halfX ? text.current?.rotation.y - newRotationAmt : text.current.rotation.y + newRotationAmt)
    //     if (updatedRotation > 1) { updatedRotation = 1 }
    //     console.log(updatedRotation)
    //     // let updatedRotation: Euler = new Euler(0, (state.mouse.x < halfX ? text.current?.rotation - newRotationAmt : text.current.rotation + newRotationAmt), 0)
    //     // text.current.rotation.y = newRotationAmt
    //     setRotationAmt(newRotationAmt)
    //     text.current?.updateMatrixWorld()

    // })


    const threeState = useThree(state => state) as RootState



    return (
        <>
            <mesh
                {...props}
            >
                <Suspense fallback={null}>

                    <Text
                        ref={text}
                        font={"/square-deal.ttf"}
                        fontSize={1 * threeState.viewport.aspect}
                        letterSpacing={0.05}
                        lineHeight={0.62}
                        rotation={[0, 0.42, 0]}
                    >
                        {` SAB \n STUDIO
                `}
                        <VideoMaterial url={"/img/anime.mp4"} />
                    </Text>
                </Suspense>

            </mesh>



        </>
    )
}

export default SabText