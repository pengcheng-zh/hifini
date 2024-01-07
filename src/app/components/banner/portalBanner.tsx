import '@/app/css/portal.css';
import { Toast, Swiper } from "antd-mobile";
import React from "react";

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];
const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
        <div className="content" style={{background: color}} onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
        }}>
            {index + 1}
        </div>
    </Swiper.Item>
))

function PortalBanner() {
    return(
        <>
        <div className='top-banner'>
        <Swiper loop autoplay>{items}</Swiper>
        </div>
        </>
    )
}

export default PortalBanner;