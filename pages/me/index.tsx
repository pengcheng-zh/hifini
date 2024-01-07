import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "../_app"

import { Tabs, Swiper, SwiperRef } from "antd-mobile"
import { EditSOutline, SetOutline, PayCircleOutline, UnorderedListOutline, PictureOutline } from 'antd-mobile-icons'

import '@/app/css/me.css'
import { useRouter } from 'next/navigation'
import { useRef, useState } from "react"
import MePageBase from "@/app/components/me/mePageBase"
import MePagePost from "@/app/components/me/mePagePost"
import MePageRecharge from "@/app/components/me/mePageRecharge"
import MePageMember from "@/app/components/me/mePageMember"
import { GetServerSideProps } from "next"
import { getRequest, postRequest } from "@/app/service/apiRequest"
import { ApiResponse, UserBaseType } from "@/app/types/pacalType"

interface PropsType {
    user: UserBaseType
}

const Me:NextPageWithLayout = ({ user }) => {
    const router = useRouter()
    const [ activeIndex, setActiveIndex ] = useState(0)

    const swiperRef = useRef<SwiperRef>(null);

    const tabItems = [
      { key: "me-base", title: "个人资料" },
      { key: "me-post", title: "论坛帖子" },
      { key: "me-recharge", title: "充值" },
      { key: "me-member", title: "成为会员" }
    ]

    const changeTabs = (tabKey: string) => {
        const index = tabItems.findIndex((item) => item.key == tabKey);
        setActiveIndex(index);
        swiperRef.current?.swipeTo(index);
    }

    return (
      <div className="me-section">
        <Tabs
          activeKey={tabItems[activeIndex].key}
          onChange={(key) => changeTabs(key)}
        >
          {
              tabItems.map((item) => (
                  <Tabs.Tab title={item.title} key={item.key}></Tabs.Tab>
              ))
          }
        </Tabs>
        <Swiper 
            direction="horizontal" 
            loop  
            indicator={() => null}
            ref={swiperRef}
            defaultIndex={activeIndex}
            onIndexChange={(index) => {
                setActiveIndex(index);
            }}
            >
                <Swiper.Item key='me-base'>
                    <div className="ontent">
                        <MePageBase userInfo={user}></MePageBase>
                    </div>
                </Swiper.Item>
                <Swiper.Item key='me-post'>
                    <div className="ontent">
                        <MePagePost></MePagePost>
                    </div>
                </Swiper.Item>
                <Swiper.Item key='me-recharge'>
                    <div className="ontent">
                        <MePageRecharge></MePageRecharge>
                    </div>
                </Swiper.Item>

                <Swiper.Item key='me-member'>
                    <div className="ontent">
                        <MePageMember></MePageMember>
                    </div>
                </Swiper.Item>
        </Swiper>
      </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const response:ApiResponse = await getRequest(context.req.headers, '/user/info')
    const user = response.object

    console.log('me page context', user)
    if(user == null) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: {
            user
        }
    }
}

export default Me

Me.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={false} userName="我的主页">
        {page}
      </Layout>
    )
}

