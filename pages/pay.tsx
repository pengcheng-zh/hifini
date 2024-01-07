import { Tabs, NavBar } from "antd-mobile"

import { useRouter } from 'next/navigation'

const Payment = () =>  {
    const router = useRouter()
    return (
        <div className="female-verify">
            <NavBar onBack={() => router.back()}>
                我要充值
            </NavBar>
            <div className="member-info">
                请联系管理员
            </div>
        </div>
    )
}

export default Payment