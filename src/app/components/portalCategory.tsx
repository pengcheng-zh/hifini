import { useRef, useState } from "react"
import { Swiper, SwiperRef, Tabs } from "antd-mobile"

import '@/app/css/category.css'
import GetPullToRefreshData from "./data/getPullToRefreshData"
import { TabItemType } from "../types/pacalType"
import GetPaginationData from "./data/getPagnationData"

interface PropsType {
    limitCount: number,
    infinite: boolean,
    tabItems: TabItemType[]
}

const PortalCategory: React.FC<PropsType> = ( { tabItems, limitCount, infinite } ) => {
    const swiperRef = useRef<SwiperRef>(null);
    const [ activeIndex, setActiveIndex ] = useState(0)
    return (
        <div className='portal-category-sec dfcs'>
        <Tabs
            activeKey={tabItems[activeIndex].value}
            onChange={(key) => {
                const index = tabItems.findIndex((item) => item.value == key);
                setActiveIndex(index);
                swiperRef.current?.swipeTo(index);
            }}
        >
            {
                tabItems.map((item) => (
                    <Tabs.Tab title={item.label} key={item.value}></Tabs.Tab>
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
                {
                    tabItems.map((item) => (
                        <Swiper.Item key={item.value}>
                            <div className="ontent">
                                {
                                    infinite ? (<GetPullToRefreshData itemKey={item.value?item.value:''} limit={limitCount}></GetPullToRefreshData>)
                                    : (<GetPaginationData itemKey={item.value?item.value:''} limit={limitCount}></GetPaginationData>)
                                }
                            </div>
                        </Swiper.Item>
                    ))
                }
        </Swiper>
        </div>
    )
}

export default PortalCategory