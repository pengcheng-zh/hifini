import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "../_app"

import { NavBar, List } from "antd-mobile"
import MessageAvatar from "@/app/components/messageAvatar"
import { useRouter } from 'next/navigation'

import '@/app/css/message.css'

const Message: NextPageWithLayout = () => {
    const router = useRouter()

    let imageUrl = 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
    
    let messageList = [
        {
            id: 1,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 2,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 3,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 4,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 5,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 6,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 7,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 8,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        },
        {
            id: 9,
            userName: '张三',
            content: '你好',
            avatar: imageUrl,
            createTime: '2023-11-17 21:23:35'
        }
    ]
    return(
        <div className="message">
            <div className="message-list">
            <List>
            {
                messageList.map((message, index) => {
                    return (
                        <List.Item key={message.id} prefix={<MessageAvatar image_url={message.avatar} />} title={message.userName} description={message.createTime} clickable onClick={() => router.push('/message/123')}>
                            {message.content}
                        </List.Item> 
                    )
                })
            }
            </List>
            </div>
        </div>
    )
}

export default Message

Message.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={false} userName="我的消息">
        {page}
      </Layout>
    )
  }