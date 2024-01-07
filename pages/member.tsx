import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "./_app"

import { Tabs, NavBar } from "antd-mobile"

import { useRouter } from 'next/navigation'

const Member = () =>  {
    const router = useRouter()
    return (
        <div className="female-verify">
            <NavBar onBack={() => router.back()}>
                成为会员
            </NavBar>
            <div className="member-info">
                成为会员，可以享受免费购买主题
            </div>
        </div>
    )
}

export default Member