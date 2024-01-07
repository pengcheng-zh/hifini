import { Avatar } from "antd-mobile"
export default function MessageAvatar(prop: any) {
    return (
        <div>
            <Avatar src={prop.image_url} style={{ '--size': '32px' }} />
        </div>
    )
}