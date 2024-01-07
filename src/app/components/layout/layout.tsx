import Head from 'next/head'

import AppFooter from './footer'
import React, { useState } from "react"
import PacalHeader from './layoutHeader'
import PacalBody from './body'
import { useSession } from 'next-auth/react'
import { SpinLoading } from 'antd-mobile'

type LayoutProps = {
  children: React.ReactNode,
  userName?: string,
  userAvatar?: string;
  back?: boolean
}

export default function Layout({ children, back, userName, userAvatar }: LayoutProps) {
  console.log('layout ')
  return (
    <>
    <style global jsx>{`
    body {
      overflow: hidden !important;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: hidden;
      overflow-y: auto;
      margin: 0;
      padding: 0;
    }
    ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
`}</style>
        <Head>
          <title>pacal-forum</title>
        </Head>
        <PacalHeader userName={userName} back={back} userAvatar={'https://dummyimage.com/100x100/f2f279/757575.png&text=P'}></PacalHeader>
        <PacalBody children={children}></PacalBody>
        <AppFooter></AppFooter>
    </>
  )
}