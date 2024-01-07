import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "./_app"

import { useRouter } from "next/router"
import { NavBar, Tabs, Divider } from "antd-mobile"

import { setCookie, getCookies, deleteCookie } from "cookies-next"
import moment from "moment"

import '@/app/css/check_in.css'
import { TabItemType } from "@/app/types/pacalType"

const tabItems:TabItemType[] = [
    { label: "今日签到",value: "checkin-today" },
    { label: "历史签到",value: "checkin-history" },
    { label: "签到说明",value: "checkin-intro" }
  ]

const CheckIn: NextPageWithLayout = () =>  {
    const router = useRouter()
    let signInInfo = {
        count: 176,
        month: 14
    }

    const CheckIn = () => {
        setCookie('checked_in', moment().format('YYYY-MM-DD'))
        router.push('/')
    }
    return (
        <>
        <div className="sign-in">
                <div className="sign-info">
                    <div className="sign-in-detail">
                        <div className="sign-in-count">累计签到：{signInInfo.count}次</div>
                        <div className="sign-in-month">本月签到：{signInInfo.month}次</div>
                    </div>
                    <div className="sign-in-action">
                        <div className="sign-in-real" onClick={() => CheckIn()}>签到</div>
                    </div>
                </div>
                <Divider
                    style={{
                        color: '#1677ff',
                        borderColor: '#1677ff',
                        borderStyle: 'dashed',
                    }}
                    >
                </Divider>
                <div className="sign-summary">
                <Tabs>
                    {
                        tabItems.map((tabItem, index) => (
                            <Tabs.Tab title={tabItem.label} key={tabItem.value}>
                                {tabItem.label}
                            </Tabs.Tab>
                        ))
                    }
                </Tabs>
                </div>
            </div>
        </>
    )
}


export default CheckIn


CheckIn.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }