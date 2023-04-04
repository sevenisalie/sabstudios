import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Terrain from "../components/world/Terrain"
import { useThree } from '@react-three/fiber'
import { GraphQLClient } from 'graphql-request'
import { useEffect, useState } from 'react'


export async function getStaticProps() {
  const endpoint = process.env.CMS_URL || "" //hosted on hygraph (formerly GraphCMS)
  const cms = new GraphQLClient(endpoint)
  const query = `
  {
    artworks(first: 7) {
      artist
      createdAt
      height
      id
      medium
      price
      publishedAt
      shopUrl
      title
      updatedAt
      width
      image {
        url
      }
    }
  }
  `
  const artwork: any = await cms.request(query)
  console.log(artwork)
  return {
    props: { artwork: artwork.artworks }
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({ artwork }: any) {

  return (
    <>
      <Head>
        <title>sab.studios - gallery</title>
        <meta name="description" content="Surrealist techniques, his brush does sway,
Capturing the beauty in life every day,
People, nature, and even himself,
His paintings reveal the surrealist's wealth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/smileycrud.png" />
      </Head>
      <div style={{ padding: "0em", display: "flex", width: "auto", height: "100vh", minHeight: "100vh" }}>
        <Terrain artwork={artwork} />
      </div>
    </>
  )
}
