import { Center, Text3D, useDepthBuffer, SpotLight, Sphere, Text, useVideoTexture, useTexture, Reflector } from '@react-three/drei'
import { RootState, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { ExoticComponent, MutableRefObject, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CubeTextureLoader, Euler, TextureLoader, Vector3 } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import { a, useSpring } from '@react-spring/three'
import useEventListener from '@/hooks/useEventListener'


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
    const [colorMap, heightMap, normalMap, normalGLMap, opacityMap, roughnessMap] = useLoader(TextureLoader, [
        "/textures/screen/Fabric019_1K_Color.png",
        "/textures/screen/Fabric019_1K_Displacement.png",
        "/textures/screen/Fabric019_1K_NormalDX.png",
        "/textures/screen/Fabric019_1K_NormalGL.png",
        "/textures/screen/Fabric019_1K_Opacity.png",
        "/textures/screen/Fabric019_1K_Roughness.png"
    ])
    return (
        <meshStandardMaterial
            // color={"#ffffed"}
            map={texture}
            emissiveMap={texture}
            emissive={"#ebb209"}
            emissiveIntensity={1}

        />
    )
}

function SabText(props: any): JSX.Element {
    const text: MutableRefObject<any | null | undefined> = useRef()
    const { viewport } = useThree((state) => state)

    //animationstate
    const [active, setActive] = useState(false)



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

    const [aoMap, colorMap, heightMap, metallicMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
        "/textures/metal/Metal_006_ambientOcclusion.jpg",
        "/textures/metal/Metal_006_basecolor.jpg",
        "/textures/metal/Metal_006_height.png",
        "/textures/metal/Metal_006_metallic.jpg",
        "/textures/metal/Metal_006_normal.jpg",
        "/textures/metal/Metal_006_roughness.jpg",
    ])
    const threeState = useThree(state => state) as RootState
    const [scalarCoefficient, setScalarCoefficient] = useState(1)
    // useEffect(() => {
    //     const seconds = 10
    //     const timer = () => setInterval(
    //         () => console.log(threeState)
    //         , seconds * 1000)
    //     timer()

    // }, [])
    useLayoutEffect(() => {
        if (!threeState) { return }
        if (threeState.viewport.aspect < 0) {
            setScalarCoefficient(1.5)
        } else {
            setScalarCoefficient(1)
        }
        return () => {
            console.log("Aspect Ratio Changed")
        };
    }, [])
    return (
        // <Center top left>
        <>
            {/* <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[0.5, 3, 4]} />
            <MovingSpot depthBuffer={depthBuffer} color="#b00c3f" position={[-0.5, 3, 4]} /> */}
            {/* <directionalLight position={[0, 1, 0]} target-position={[-0.88, 0, 3]} color={"0x404040"} intensity={1} /> */}
            <a.mesh
                {...props}
                onClick={() => { setActive(prev => !prev) }}
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
                    <meshStandardMaterial
                        color={"#179123"}

                    />
                    <VideoMaterial url={"/video/anime.mp4"} />
                </Text>
            </a.mesh>

            <EffectComposer>
                <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
                <Bloom kernelSize={KernelSize.SMALL} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
                <Bloom kernelSize={KernelSize.LARGE} luminanceThreshold={4} luminanceSmoothing={0} intensity={1.5} />
            </EffectComposer>

        </>
    )
}

export default SabText