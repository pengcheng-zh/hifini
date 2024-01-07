import { SpinLoading } from "antd-mobile";
import type { GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { NextRequest } from "next/server";
import React, { useEffect, useState } from "react";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}


export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppPropsWithLayout) {
    console.log('myapppp')
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
        
    )
}


