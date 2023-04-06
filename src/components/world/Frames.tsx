import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, AsciiRenderer, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { animated, useSpring } from '@react-spring/web'
const GOLDENRATIO = 1.61803398875


export function Frames({ artwork, images, q = new THREE.Quaternion(), p = new THREE.Vector3() }: any) {
    const [placardInfo, setPlacardInfo] = useState({
        name: "mark sabaliauskas",
        title: "boy plays in river",
        price: "3700.00",
        shopUrl: "https://www.aobfineart.com/artist/mark-sabaliauskas"
    }) //this will be drilled down from gallery/terrain/frames/frame
    const [imagePositions, setPositions] = useState([
        // Front
        { position: [0, 0, 1.5], rotation: [0, 0, 0] },
        // Back
        { position: [-0.8, 0, -0.6], rotation: [0, 0, 0] },
        { position: [0.8, 0, -0.6], rotation: [0, 0, 0] },
        // Left
        { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0] },
        { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0] },
        // Right
        { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0] },
        { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0] },
    ])
    const ref: any = useRef()
    const clicked: any = useRef()
    // const [, params] = useRoute('/item/:id')
    const [selected, setSelected] = useState(null)//drilled down into Frame
    // const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(selected)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return (
        <group
            ref={ref}
        // onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
        // onPointerMissed={() => setLocation('/')}
        >
            {artwork.map((art: any, i: number) => <Frame meshProps={imagePositions[i]} placardInfo={placardInfo} key={i} art={art} _name={i} selected={selected} setSelected={setSelected} url={art.image.url} {...art} /> /* prettier-ignore */)}
        </group>
    )
}

function Placard({ art, refFrame, placardInfo, showPlacard }: any) {
    const [hover, toggle] = useState<boolean>(showPlacard)
    const WrappedThreeHtml = animated(Html)
    const { x } = useSpring({
        from: {
            x: 0
        },
        x: showPlacard || hover ? 1 : 0,
        config: { mass: 10, tension: 1000, friction: 100 }
    })

    return (
        <>
            <WrappedThreeHtml
                onMouseEnter={() => toggle(true)}
                onMouseLeave={() => toggle(false)}
                // distanceFactor={0}
                style={{ opacity: x, scale: x, position: "absolute", top: "-192px", left: "90px" }}
                as='div'
            // portal={refFrame ? refFrame : undefined}
            >
                <div style={{ fontFamily: "monospace", padding: "18px", backgroundColor: "rgba(2, 10, 2, 0.8)", backdropFilter: "blur(7px)", border: "2px solid rgba(51, 255, 51, 0.7)", borderRadius: "2em", display: "flex", flexDirection: "column", width: "auto", height: "auto", justifyContent: "center", alignContent: "center" }}>
                    <h2>
                        {art.title ? art.title : "0xDEAD"}
                    </h2>
                    <h3>
                        {art.medium ? art.medium : "0xBEEF"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "row", width: "auto", height: "auto", justifyContent: "center", alignContent: "center" }}>
                        <p style={{ marginRight: "4px" }}>
                            {art.price ? art.price : "nfs"}
                        </p>
                        <a href={art.shopUrl ? art.shopUrl : "#"}>
                            {`$$$PURCHASE$$$`}
                        </a>
                    </div>
                </div>
            </WrappedThreeHtml>
        </>
    )
}

function Frame({ art, meshProps, placardInfo, setSelected, _name, selected, url, c = new THREE.Color(), ...props }: any) {
    const refFrame: any = useRef()
    const image: any = useRef()
    const frame: any = useRef()
    const name = _name
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const [frameMaterial, setFrameMaterial] = useState({
        thickness: 4,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.4,
        transmission: 0.4,
        ior: 1.25,
        envMapIntensity: 12,
        color: '#33FF33',
        attenuationTint: '#33FF33',
        attenuationDistance: 0.1
    }) as any
    const isActive = selected === name
    useCursor(hovered)
    useFrame((state, dt) => {
        // image.current.material.zoom = 1.8 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image.current.scale, [0.85 * (isActive && hovered ? 0.85 : 1), 0.9 * (isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
        easing.dampC(frame.current.material.color, hovered ? 'rgb(51, 255, 51)' : '#041a04', 0.1, dt)

    })

    return (
        <group style={{ position: "relative", border: "8px solid blue" }} {...meshProps}>
            <mesh
                name={_name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[1, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}
                onClick={() => setSelected(_name)}
                onPointerMissed={() => setSelected(null)}
            >
                <boxGeometry ref={refFrame} />
                <meshPhysicalMaterial
                    color={"#33FF33"}
                    {...frameMaterial}
                />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
            </mesh>
            {/* <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
                {name.split('-').join(' ')}
            </Text> */}
            <Placard
                art={art}
                placardInfo={placardInfo}
                refFrame={refFrame} //from boxgemotry of above Frame
                showPlacard={hovered}
            />

        </group>
    )
}