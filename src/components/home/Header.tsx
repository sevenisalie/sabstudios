import { AiFillInstagram } from "react-icons/ai"
import { BsFillEaselFill } from "react-icons/bs"
import { SiBuymeacoffee } from "react-icons/si"

import React, { useState } from 'react'
import { useSpring, animated, } from '@react-spring/web'
import Link from 'next/link'

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

function Header() {
    const [active, setActive] = useState(false)
    const navSpring = useSpring({
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
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", top: 0, width: "100%", height: "auto", padding: "2em" }}>

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
            </div>
        </>
    )
}

export default Header