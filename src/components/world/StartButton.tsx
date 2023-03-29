import { Text, Text3D } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import React, { useState } from 'react'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import { useSpring, animated, config } from "@react-spring/three"


const AnimatedText = animated(Text3D)

//Text that says "enter"
//rotate it flat on the plane
//apply emissive texture
//apply onHoverInOut to text mesh
//use spring to activate onhoverinout setActive(!active)

function StartButton(props: any) {
    const { camera } = useThree(state => state) as any
    const [active, setActive] = useState(false)
    const { scale } = useSpring({
        scale: active ? 1.34 : 1,
        config: config.wobbly
    }) as any
    return (
        <>
            <animated.mesh
                onPointerEnter={() => setActive(!active)}
                onPointerLeave={() => setActive(!active)}
                onClick={() => setActive(!active)}
                scale={scale}
                color={"blue"}
                {...props}>
                <AnimatedText
                    font={"/Roboto_Thin.json"}
                    // fontSize={0.44 * camera.aspect}
                    height={0.01}
                    size={0.2}
                    letterSpacing={0}
                    bevelEnabled={true}
                    bevelSegments={1}
                    bevelSize={0.001}
                    bevelThickness={0.001}
                    smooth={0}
                // lineHeight={0.44}

                >
                    {`enter.`}
                    <meshStandardMaterial
                        color={"transparent"}
                        roughness={0.3}
                    />
                </AnimatedText>
                <EffectComposer multisampling={8}>
                    <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
                    <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
                </EffectComposer>
            </animated.mesh>
        </>
    )
}

export default StartButton