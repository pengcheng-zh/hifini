import React, { useState } from "react"

import { Tabs, Form, Input, Button, Toast } from "antd-mobile"

import { useRouter } from 'next/navigation'

import '@/app/globals.css'
import '@/app/css/login.css'
import { NextPageWithLayout } from "../_app"
import Layout from "@/app/components/layout/layout"

import {MailFill, LockFill, TransportQRcodeOutline, TeamOutline} from "antd-mobile-icons"
import { RegisterType } from "@/app/types/pacalType"

const UserRegist:NextPageWithLayout = () =>  {
    const router = useRouter()

    const [ timeLeft, setTimeLeft ] = useState(30)
    const [ codeSend, setCodeSend ] = useState(false)
    const [ codeSendReset, setCodeSendReset ] = useState(true)
    const [ registerData, setRegisterData ] = useState({
        email:'',
        code:'',
        userName: '',
        password: ''
    } as RegisterType )

    const handleDataChange = (name:string, value:string) => {
        console.log(name, value)
        let data = {...registerData}
        data[name as keyof RegisterType] = value

        setRegisterData(data)
    }


    const sendCode = () => {
        if(registerData.email == '') {
            Toast.show({
                content: '请输入邮箱'
            })
            return;
        }
        if(timeLeft != 30) {
            return;
        }
        setCodeSend(true)
        console.log('发送验证码')

        const timer = setInterval(() => {
            
            setTimeLeft((timeLeft) => {
                if(timeLeft == 0) {
                    setCodeSend(false);
                    clearInterval(timer);
                    setCodeSendReset(true);
                    return timeLeft;
                }
                let left = timeLeft -1;
                return left;
            })
        }, 1000);
    }

    const registerNewUser = () => {
        if(registerData.email == '') {
            Toast.show({
                content: '请输入邮箱'
            })
            return;
        }
        if(registerData.code == '') {
            Toast.show({
                content: '请输入验证码'
            })
            return;
        }
        if(registerData.userName == '') {
            Toast.show({
                content: '请输入用户名'
            })
            return;
        }
        if(registerData.password == '') {
            Toast.show({
                content: '请输入密码'
            })
            return;
        }
    }
    return (
        <div className="login-section">
            <div className="login-content">
                <div className="login-form">
                    <div className="login-item dfrs">
                        <div className="item-icon">
                        <MailFill fontSize={24} color="#abb8c3"/>
                        </div>
                        <div className="item-input">
                        <Input placeholder='请输入邮箱' clearable type="email" value={registerData.email} onChange={(e) => handleDataChange('email', e)}/>
                        </div>
                    </div>

                    <div className="login-item dfrs">
                        <div className="item-icon">
                            <TransportQRcodeOutline fontSize={24} color="#abb8c3"/>
                        </div>
                        <div className="item-input">
                            <Input placeholder='请输入验证码' maxLength={4} clearable type="email" value={registerData.code} onChange={(e) => handleDataChange('code', e)}/>
                        </div>
                        <div className={codeSendReset?"item-extra dfcc send-code":"item-extra dfcc"} onClick={() => sendCode()}>
                            发送验证码{codeSend&&'(' + timeLeft + ')'}
                        </div>
                    </div>

                    {
                        codeSend && registerData.code != '' && 
                        <div className="login-item dfrs">
                            <div className="item-icon">
                                <TeamOutline fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                                <Input placeholder='请输入用户名' clearable type="email" value={registerData.userName} onChange={(e) => handleDataChange('userName', e)}/>
                            </div>
                        </div>
                    }

                    {
                        codeSend && registerData.code != '' && 
                        <div className="login-item dfrs">
                            <div className="item-icon">
                                <LockFill fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                                <Input placeholder='请输入字母和数字组成的密码' clearable type="email" value={registerData.password} onChange={(e) => handleDataChange('password', e)}/>
                            </div>
                        </div>
                    }
                    {
                        codeSend && registerData.code != '' && 
                        <Button block color='primary' size='large' className="login-btn" onClick={registerNewUser}>
                        注册
                        </Button>
                    }
                    
                    <div className="regist-section dfcs">
                        <div className="dfre">
                            <div className="user-regist" onClick={() => router.push('/login')}>返回登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserRegist

UserRegist.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={true} userName="注册">
        {page}
      </Layout>
    )
}