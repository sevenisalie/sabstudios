import { useHelper } from "@react-three/drei"
import React, { useRef } from "react"
import * as THREE from "three"

export default function Lite() {

    return (
        <>
            {/* <directionalLight ref={dirl} target-position={[0, 0.7, 0]} color={"#f5f2c4"} position={[-39, 39, 4]} intensity={1} /> */}
            <color attach="background" args={['black']} />
            <hemisphereLight intensity={0.15} groundColor="black" />
            <spotLight position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
        </>
    )
}