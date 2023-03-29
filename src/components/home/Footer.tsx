import { useSpring, animated, useTrail } from '@react-spring/web'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

const AnimatedBsFillEaselFill = animated(BsFillEaselFill)
const AnimatedAiFillInstagram = animated(AiFillInstagram)
const AnimatedSiBuymeacoffee = animated(SiBuymeacoffee)

const AnimatedIcon = ({ url, icon }: any) => {
    const [active, setActive] = useState(false)
    const [clicked, setClicked] = useState(false)


    const springs = useSpring({
        // size: active ? 50 : 69,
        width: active ? "3em" : "2em",
        height: "auto",
        fill: active ? `rgb(23, 145, 35)` : "rgb(23, 145, 35)",
        stroke: clicked ? "rgb(23, 145, 35)" : "rgb(23, 145, 35)"
    })

    const clickSprings = useSpring({
        y: clicked ? -15 : 0,
        fill: clicked ? "rgb(23, 145, 35)" : "rgb(23, 145, 35)"
    })

    const handleClick = () => {
        setClicked(true)
    }

    const handleEnter = () => {
        setActive(prev => !prev)
    }
    const handleLeave = () => {
        setActive(prev => !prev)
    }
    const SassyIcon = animated(icon) as any
    return (
        <>
            <Link href={url ? url : "#"} >
                <SassyIcon
                    onPointerEnter={() => handleEnter()}
                    onPointerLeave={() => handleLeave()}
                    onClick={() => handleClick()}
                    style={{ ...springs, ...clickSprings }}

                />
            </Link>
        </>
    )
}

function Footer() {
    const [active, setActive] = useState(false)
    const [ascii, setAscii] = useState(batchAsciiText(asciiText)) //global
    const [log, setLog] = useState(false)
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

    //todo add useTrails to map
    const asciiMap = ascii.map((row, key) =>
        <>
            <pre key={key} style={{ fontSize: "1em", width: "1em", height: "auto", font: "Cascadia Mono", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", cursor: "default" }}>
                {row}
            </pre>
        </>

    )
    //div, same length, 0 padding behind the pre tag with ASCI with color yello
    // useEffect(() => {
    //     timer()
    //     console.log(ref)
    //     console.log(bounds)
    // }, [log])
    // const timer = () => setInterval(() => setLog(prev => !prev), 10000)
    return (
        <>
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", bottom: 0, width: "100%", height: "auto" }}>
                <animated.div
                    onPointerEnter={() => handleEnter()}
                    onPointerLeave={() => handleLeave()}
                    style={{ ...navSpring, display: "flex", width: "min-content", height: "auto", justifyContent: "center", columnGap: "1em", marginLeft: "auto", marginRight: "auto" }}>
                    <AnimatedIcon
                        style={{ border: "4px solid rgb(23, 145, 35)", borderRadius: "50%" }}
                        url={"https://www.instagram.com/mark.sabaliauskas/"}
                        icon={AiFillInstagram}
                    />
                    <AnimatedIcon
                        url={"/gallery"}
                        icon={BsFillEaselFill}
                    />
                    <AnimatedIcon
                        url={"https://www.aobfineart.com/artist/mark-sabaliauskas"}
                        icon={SiBuymeacoffee}
                    />
                </animated.div>
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