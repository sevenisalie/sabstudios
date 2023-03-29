import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useSpring, animated, config, Globals } from "@react-spring/three"
Globals.assign({
  frameLoop: "always"
})
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
