/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/apple-gltf/food_apple_01_4k.gltf --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/food_apple_01_4k-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.food_apple_01.geometry} material={materials.food_apple_01} />
    </group>
  )
}

useGLTF.preload('/food_apple_01_4k-transformed.glb')