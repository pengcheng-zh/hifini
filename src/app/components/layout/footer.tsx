"use client"
import React, { useState } from "react"
import { Badge, Toast,  Popup } from "antd-mobile"
import { useRouter } from 'next/router'

import { AppOutline, AddSquareOutline, MessageOutline, UnorderedListOutline, UserOutline } from "antd-mobile-icons";

import '@/app/components/layout/footer.css'

function AppFooter( ) {
    const iconSize = 36;
    const activeColor = 'var(--adm-color-primary)'
    const defaultColor = ''

    const router = useRouter()
    
    const [activeKey, setActiveKey] = useState('/')

    const tabs = [
        {
            key: '/',
            title: '首页',
            icon: <AppOutline fontSize={iconSize} color={activeKey == '/'?activeColor:defaultColor} ></AppOutline>,
            badge: Badge.dot
        },
        {
            key: '/explore',
            title: '发现',
            icon: <UnorderedListOutline fontSize={iconSize} color={activeKey == '/explore'?activeColor:defaultColor} ></UnorderedListOutline>,
            badge: '5'
        },
        {
            key: '/publish',
            title: '发帖',
            icon: <AddSquareOutline fontSize={iconSize} color={activeKey == '/publish'?activeColor:defaultColor} ></AddSquareOutline>,
            badge: '99+'
        },
        {
            key: '/message',
            title: '消息',
            icon: <MessageOutline fontSize={iconSize} color={activeKey == '/message'?activeColor:defaultColor} ></MessageOutline>,
            badge: '99+'
        },
        {
            key: '/me',
            title: '我的',
            icon: <UserOutline fontSize={iconSize} color={activeKey == '/me'?activeColor:defaultColor} ></UserOutline>
        }
    ]


    if(activeKey != router.pathname) {
        setActiveKey(router.pathname)
    }

    const clickTabBar = (key:string) => {

        console.log('clickTabBar', key)

        if(key == activeKey) {
            Toast.show({
                icon: 'loading',
                content: '加载中…',
              })
        } else {
            setActiveKey(key)

            router.push(key)
        }
    }

    return (
        <div className="app-footer">
            <div className="tab-bar">
                {
                    tabs.map((tab, index) => {
                        return (
                            <div className="tab" key={index} onClick={() => clickTabBar(tab.key)}>
                                <div className="tab-icon">{tab.icon}</div>
                                <div className="tab-name">{tab.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AppFooter