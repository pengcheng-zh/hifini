import React, { useRef, useState } from "react"

import 'react-simple-verify/dist/react-simple-verify.css';

import { Form, Input, Button, Toast, SpinLoading } from "antd-mobile"

import { useRouter } from 'next/navigation'

import '@/app/globals.css'
import '@/app/css/login.css'
import { NextPageWithLayout } from "../_app";
import Layout from "@/app/components/layout/layout";

import {MailFill, LockFill, TransportQRcodeOutline} from "antd-mobile-icons"
import { postRequest } from "@/app/service/apiRequest";
import { NextRequest, NextResponse } from "next/server";
import { ToastHandler } from "antd-mobile/es/components/toast";
import { checkEmail, checkPassword } from "@/app/service/dataCheck";

const ForgetPassword:NextPageWithLayout = () =>  {
    const router = useRouter()
    const handler = useRef<ToastHandler>()

    const [timeLeft, setTimeLeft] = useState(30)
    const [codeSend, setCodeSend] = useState(false)
    const [resetCode, setResetCode] = useState(true)
    const [emailAddress, setEmailAddress] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const sendCode = async() => {
        if(!codeSend) {
            let emailCheck = checkEmail(emailAddress)
            if(emailCheck != '') {
                Toast.show({
                    content: emailCheck
                })
                return
            }
            handler.current = Toast.show({
                content: <SpinLoading></SpinLoading>,
                duration: 0,
                position: 'top',
            })
            let response = await postRequest(NextRequest, "/email/forget_code", {email: emailAddress})

            handler.current.close();
            if(!response.result) {
                Toast.show({
                    content: response.message,
                })
                return
            }

            setResetCode(false);
            setCodeSend(true)
            console.log('发送验证码', timeLeft)
            const timer = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    if(timeLeft == 0) {
                        clearInterval(timer);
                        setResetCode(true);
                        timeLeft = 30;
                        return timeLeft;
                    }
                    let left = timeLeft -1;
                    return left;
                })
            }, 1000);
        }
    }
    const handleEmailCodeChange = (value:string) => {
        setEmailCode(value);
    }
    const handleEmailAddressChange = (value:string) => {
        setEmailAddress(value);
    }
    const handleNewPasswordChange = (value:string) => {
        setNewPassword(value);
    }

    const updatePassword = async () => {
        let emailCheck = checkEmail(emailAddress)
        if(emailCheck != '') {
            Toast.show({
                content: emailCheck
            })
            return
        }
        if(emailCode == '') {
            Toast.show({
                content: '请先获取验证码',
            })
            return;
        }
        let passwordCheck = checkPassword(newPassword)
        if(passwordCheck != '') {
            Toast.show({
                content: passwordCheck
            })
            return
        }
        handler.current = Toast.show({
            content: <SpinLoading></SpinLoading>,
            duration: 0,
            position: 'top',
        })
        const response = await postRequest(NextRequest, "/user/update_forget_password", {email: emailAddress, code: emailCode, password: newPassword})
        
        handler.current.close();
        if(!response.result) {
            Toast.show({
                content: response.message,
            })
            return
        }
        Toast.show({
            content: "密码更新成功,请使用新密码登录",
        })
        router.replace('/login');
    }
    return (
        <div className="login-section">
            <div className="login-content">
                <div className="login-form">
                    <Form layout='horizontal' mode='card'>
                        <div className="login-item dfrs">
                            <div className="item-icon">
                            <MailFill fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                            <Input placeholder='请输入邮箱' clearable type="email" value={emailAddress} onChange={handleEmailAddressChange}/>
                            </div>
                        </div>

                        <div className="login-item dfrs">
                            <div className="item-icon">
                                <TransportQRcodeOutline fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                                <Input placeholder='请输入验证码' clearable type="email" value={emailCode} onChange={handleEmailCodeChange}/>
                            </div>
                            <div className={resetCode?"item-extra dfcc send-code":"item-extra dfcc"} onClick={() => sendCode()} aria-disabled>
                                发送验证码{!resetCode&&'(' + timeLeft + ')'}
                            </div>
                        </div>
                        {
                            codeSend && <div className="login-item dfrs">
                                <div className="item-icon">
                                <LockFill fontSize={24} color="#abb8c3"/>
                                </div>
                                <div className="item-input">
                                <Input placeholder='请输入新密码' clearable type="email" value={newPassword} onChange={handleNewPasswordChange}/>
                                </div>
                            </div>
                        }
                    </Form>
                    {
                        codeSend && <Button block color='primary' size='large' className="login-btn" onClick={() => updatePassword()}>
                            更新
                        </Button>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword

ForgetPassword.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={true} userName="忘记密码">
        {page}
      </Layout>
    )
}