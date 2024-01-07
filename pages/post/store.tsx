import Layout from "@/app/components/layout/layout"

import { Tabs, NavBar, List } from "antd-mobile"

import { useRouter } from 'next/navigation'

const StoreHistory = () =>  {
    const router = useRouter()
    return (
        <div className="female-verify">
            <NavBar onBack={() => router.back()}>
                收藏记录
            </NavBar>
            <div className="member-info">
            <List>
                <List.Item description='管理已授权的产品和设备' clickable>
                我的出击1
                </List.Item>
                <List.Item description='管理已授权的产品和设备' clickable>
                我的出击2
                </List.Item>
                <List.Item description='管理已授权的产品和设备' clickable>
                我的出击3
                </List.Item>
                <List.Item description='管理已授权的产品和设备' clickable>
                我的出击3
                </List.Item>
            </List>
            </div>
        </div>
    )
}

export default StoreHistory