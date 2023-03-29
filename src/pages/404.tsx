import Head from 'next/head'
import React, { Suspense, useRef } from 'react'
const asciiText = `
4)   SS  0))))  4)   SS 
4)   SS 0)  ))) 4)   SS 
4)SSSSS 0) ) )) 4)SSSSS 
     4) 0) ) ))      4) 
     4) 0))  ))      4) 
     4)  0))))       4) 
                        
                        
 0))))  4)   SS  0))))  
0)  ))) 4)   SS 0)  ))) 
0) ) )) 4)SSSSS 0) ) )) 
0) ) ))      4) 0) ) )) 
0))  ))      4) 0))  )) 
 0))))       4)  0))))  
                        
                        
4)   SS  0))))  4)   SS 
4)   SS 0)  ))) 4)   SS 
4)SSSSS 0) ) )) 4)SSSSS 
     4) 0) ) ))      4) 
     4) 0))  ))      4) 
     4)  0))))       4)
`
function Custom404() {
    return (
        <>
            <Head>
                <title>mrk.sab - 404</title>
                <meta name="description" content="You Don' Goofed Friend, Gameover" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/smileycrud.png" />

            </Head>
            <main>
                <div style={{ marginTop: "auto", marginBottom: "auto", display: "flex", flexDirection: "column", width: "100%", height: "100vh", alignContent: "center", justifyContent: "center", alignItems: "center", justifyItems: "center" }}>
                    <pre style={{ color: "rgb(23, 145, 35)", font: "Cascadia Mono", }}
                    >
                        {asciiText}
                    </pre>
                </div>
            </main>
        </>
    )
}

export default Custom404