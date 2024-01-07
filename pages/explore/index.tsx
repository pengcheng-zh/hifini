import { useState,  useRef } from "react"
import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "../_app"

import '@/app/css/portal.css'
import PortalCategory from "@/app/components/portalCategory"
import { TabItemType } from "@/app/types/pacalType"

const tabItems:TabItemType[] = [
  { label: "华语",value: "music-ch" },
  { label: "日韩",value: "music-jp" },
  { label: "欧美",value: "music-us" },
  { label: "Remix",value: "music-remix" },
  { label: "纯音乐",value: "music-voice" }
]

const Explore: NextPageWithLayout = () =>  {
    return (
        <div className="explore-body">
            <PortalCategory tabItems={tabItems} limitCount={100} infinite={false}></PortalCategory>
        </div>
    )
}

export default Explore

Explore.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={false} userName="发现">
        {page}
      </Layout>
    )
  }