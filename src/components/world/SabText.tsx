import { Center, Text3D, useDepthBuffer, SpotLight, Sphere, Text, useVideoTexture, useTexture, Reflector } from '@react-three/drei'
import { RootState, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { ExoticComponent, MutableRefObject, RefObject, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CubeTextureLoader, Euler, TextureLoader, Vector3 } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import { a, useSpring } from '@react-spring/three'
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
    const videoTextureOptions: VideoTextureProps = {
        unsuspend: 'canplay',
        crossOrigin: 'Anonymous',
        muted: true,
        loop: true,
        start: true
    }
    const texture = useVideoTexture(url, videoTextureOptions)

    return (
        <meshBasicMaterial
            toneMapped={false}
            map={texture}

        />
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
                    <Suspense fallback={fallbackImage.src}>
                        <VideoMaterial url={"/img/anime.mp4"} />
                    </Suspense>
                </Text>
            </mesh>



        </>
    )
}

export default SabText