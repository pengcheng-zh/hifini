import { Image } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'

/**
 * 帖子列表每个item组件
 */
interface PropsType {
    postData: {
        id: '',
        userAvatar:'',
        title:'',
        userName: '',
        createTime: ''
    }
}

const PostItem: React.FC<PropsType> = ( { postData } ) => {
    const router = useRouter()
    const doBack = () => {
        router.back()
    }
    return (
        <div className="adm-list-item" onClick={() => router.push('/post/' + postData.id)}>
              <div className="adm-list-item-content">
                <div className="adm-list-item-content-prefix">
                  <Image src={postData.userAvatar} style={{ borderRadius:  20 }} fit="cover" width={30} height={30}></Image>
                </div>
                <div className="adm-list-item-content-main">
                  <div className="adm-list-item-content-top post-title">
                    {postData.title}
                  </div>
                  <div className="adm-list-item-content-bottom post-description">
                    <span>
                      <span className="board-bg red"></span>
                    </span>
                    <span className="username">{postData.userName}</span>
                    <span className="create-time">{postData.createTime}</span>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default PostItem