import { useSpring, animated, useTrail } from '@react-spring/web'
import Link from 'next/link'
import React, { lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AiFillInstagram } from "react-icons/ai"
import { BsFillEaselFill } from "react-icons/bs"
import { FaPatreon } from "react-icons/fa"
import { SiBuymeacoffee } from "react-icons/si"
import useMeasure from 'react-use-measure'

const asciiText = `
                   k)                             b)      
                   k)                             b)      
 m)MM MMM   r)RRR  k)  KK          s)SSSS a)AAAA  b)BBBB  
m)  MM  MM r)   RR k)KK           s)SSSS   a)AAA  b)   BB 
m)  MM  MM r)      k) KK               s) a)   A  b)   BB 
m)      MM r)      k)  KK ####### s)SSSS   a)AAAA b)BBBB  
`
const batchAsciiText = (asciiText: string) => {
    const arr = asciiText.split("\n")
    return arr
}


function Footer() {
    const [active, setActive] = useState(false)
    const [ascii, setAscii] = useState(batchAsciiText(asciiText)) //global
    const [ref, bounds] = useMeasure()
    const navSpring = useSpring({
        opacity: active ? "100%" : "70%"
    })
    const textSpring = useSpring({
        backgroundColor: active ? "rgb(23, 145, 35)" : "rgb(23, 145, 35)",
        opacity: active ? "100%" : "70%"
    })

    const handleEnter = () => {
        setActive(prev => !prev)
    }
    const handleLeave = () => {
        setActive(prev => !prev)
    }

    return (
        <>
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", bottom: 0, width: "100%", height: "auto" }}>

                <animated.div
                    onPointerEnter={() => handleEnter()}
                    onPointerLeave={() => handleLeave()}
                    ref={ref} style={{ ...textSpring, width: "full", height: "auto", background: "rgb(23, 145, 35)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", padding: "0px 0px 0px 0px", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", placeItems: "center" }}>
                    {/* magic  */}
                    <pre key={"ball"} style={{ fontSize: "0.20em", font: "Cascadia Mono", marginLeft: "8px", padding: "0px 0px 12px 0px", cursor: "default" }}>
                        {asciiText}
                    </pre>
                </animated.div>
            </div>
        </>
    )
}


export default Footer