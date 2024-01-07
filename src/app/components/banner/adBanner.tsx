import { Image } from "antd-mobile"

/**
 * 广告banner组件
 */
interface PropsType {
    banners?: []
}


const AdBanner: React.FC<PropsType> = ( { banners } ) => {
    return (
        <div className="banners">
        {
            banners?.map((banner) => <Image src={banner}></Image>)
        }
        </div>
    )
}

export default AdBanner