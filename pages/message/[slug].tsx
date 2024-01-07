import { useState } from "react"
import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "../_app"

import { NavBar, List,  Toast, TextArea, Button, Avatar } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/css/message.css'
import { MessageType } from "@/app/types/pacalType"

const MessageDetail: NextPageWithLayout = () => {

    let userName = '张三'
    let datetime = '2023-11-17 21:28:45'
    let imageUrl = 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
    
    const router = useRouter()
    const back = () => {
        router.back()
    }

    const [content, setContent] = useState('')

    let messageList = [
        {
            id: 1,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 2,
            from: 'own',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 3,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 4,
            from: 'own',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 5,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 6,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 7,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        {
            id: 8,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我1111',
            avatar: imageUrl
        },
        ,
        {
            id: 9,
            from: 'zhangsan',
            createTime: '2023-11-17 21:28:45',
            content: '我11999',
            avatar: imageUrl
        }
    ] as MessageType[]

    const sendMessage = () => {

    }
    return(
        <div className="message">
            <div className="message-list">
            {
                messageList.map((message, index) => {
                    return (
                        <div key={index}>
                            {
                                message?.from != 'own' && (
                                    <div className='message-item-other'>
                                        <div className="message-avatar">
                                            <Avatar src={message.avatar} style={{ '--size': '32px' }} />
                                        </div>
                                        <div className='message-detail-other'>
                                            <div className="message-time">{message?.createTime}</div>
                                            <div className="message-content">{message?.content}</div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                message?.from == 'own' && (
                                    <div className='message-item-own'>
                                        <div className='message-detail-own'>
                                            <div className="message-time">{message?.createTime}</div>
                                            <div className="message-content">{message?.content}</div>
                                        </div>
                                        <div className="message-avatar">
                                            <Avatar src={message?.avatar} style={{ '--size': '32px' }} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
            </div>
            <div className="message-reply">
            <TextArea placeholder='请输入内容'
                onChange={val => {
                    setContent(val)
                }} showCount
                maxLength={100}/>

            <Button block color='primary' size='large' onClick={sendMessage}>
                回复
              </Button>
            </div>
        </div>
    )
}

export default MessageDetail

MessageDetail.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout userName="与张三聊天中">
        {page}
      </Layout>
    )
  }