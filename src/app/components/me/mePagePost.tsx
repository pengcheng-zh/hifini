import { NavBar, Image, Tabs } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'
import { TabItemType } from "@/app/types/pacalType"
import PortalCategory from "../portalCategory"

import '@/app/css/me.css'
import { GetServerSideProps } from "next"
import { getRequest } from "@/app/service/apiRequest"



interface PropsType {
    userAvatar?: string,
    userName?: string,
    back?: boolean
}

const tabItems:TabItemType[] = [
    { label: "已发布",value: "self-publish" },
    { label: "已收藏",value: "self-store" },
    { label: "已购买",value: "self-buy" }
  ]

const MePagePost: React.FC<PropsType> = ( ) => {
    const router = useRouter()
    const doBack = () => {
        router.back()
    }
    return (
        <div className='me-section-base'>
            <div className="me-base-body me-page-post">
            <PortalCategory tabItems={tabItems} limitCount={100} infinite={false}></PortalCategory>
            </div>
        </div>
    )
}

export default MePagePost