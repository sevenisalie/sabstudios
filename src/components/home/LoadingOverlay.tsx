import React, { useState } from 'react'
import { useTrail, animated } from '@react-spring/web'

const asciiText = `
 L)        O)oooo    A)aa   D)dddd   I)iiii N)n   nn   G)gggg    
 L)       O)    oo  A)  aa  D)   dd    I)   N)nn  nn  G)         
 L)       O)    oo A)    aa D)    dd   I)   N) nn nn G)  ggg     
 L)       O)    oo A)aaaaaa D)    dd   I)   N)  nnnn G)    gg    
 L)       O)    oo A)    aa D)    dd   I)   N)   nnn  G)   gg    
 L)llllll  O)oooo  A)    aa D)ddddd  I)iiii N)    nn   G)ggg 
`
function LoadingOverlay() {
    const [asciiArray, setAsciiArray] = useState(asciiText.split("\n"))

    const [trails, api] = useTrail(asciiArray.length, (index, controller) => ({
        from: {
            opacity: 0,
            x: 4
        },
        to: {
            opacity: 1,
            x: 0
        },
        config: { mass: 10, tension: 1000, friction: 100, delay: 50 * index },
        reset: true,
        loop: true,
        delay: 0
    }))

    const asciiMap = trails.map((trail, i) => {
        return (
            <>

            </>
        )
    })

    return (
        <div style={{ marginTop: "auto", marginBottom: "auto", display: "flex", flexDirection: "column", width: "100%", height: "100vh", alignContent: "center", justifyContent: "center", alignItems: "center", justifyItems: "center" }}>
            <animated.pre
                style={{ scale: "0.68", alignSelf: "center", justifySelf: "center", color: "rgb(23, 145, 35)", font: "Cascadia Mono", }}
            >
                {asciiText}

            </animated.pre>
        </div>

    )
}

export default LoadingOverlay