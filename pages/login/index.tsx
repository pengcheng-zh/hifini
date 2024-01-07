import React, { useRef, useState } from "react"

import 'react-simple-verify/dist/react-simple-verify.css';

import { Input, Button, Toast, SpinLoading } from "antd-mobile"

import { useRouter } from 'next/navigation'

import '@/app/globals.css'
import '@/app/css/login.css'
import { signIn, useSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";
import Layout from "@/app/components/layout/layout";
import {MailFill, LockFill, EyeFill, EyeInvisibleFill} from "antd-mobile-icons"
import { LoginType } from "@/app/types/pacalType";
import { checkEmail, checkPassword } from "@/app/service/dataCheck";
import { ToastHandler } from "antd-mobile/es/components/toast";

const Login:NextPageWithLayout  = () =>  {
    const router = useRouter()
    const handler = useRef<ToastHandler>()

    const [eyeOpen, setEyeOpen] = useState(false)
    const [passwordType, setPasswordType] = useState('password')

    const { data:session, status } = useSession()

    console.log('login page session', session)
    let loginData = {
        email: '',
        password: ''
    } as LoginType

    const handleDataChange = (name:string, value:string) =>{
        loginData[name as keyof LoginType] = value
    }

    const seePassword = () => {
        let open = !eyeOpen;
        setEyeOpen(open);
        setPasswordType(open ? 'text' : 'password');
    }

    const login = async () => {
        let emailCheck = checkEmail(loginData.email)
        if(emailCheck != '') {
            Toast.show({
                content: emailCheck
            })
            return
        }
        let passwordCheck = checkPassword(loginData.password)
        if(passwordCheck != '') {
            Toast.show({
                content: passwordCheck
            })
            return
        }
        handler.current = Toast.show({
            content: <SpinLoading style={{ '--size': '48px' }} ></SpinLoading>,
            duration: 0,
            position: 'top',
        })
        const signResult = await signIn("credentials", {
            email: loginData.email,
            password: loginData.password,
            redirect: false
        });
        handler.current.close();
        console.log('sign result', signResult)
        if(signResult?.ok) {
            router.push('/');
        } else {
            Toast.show({
                content: signResult?.error
            })
        }
    }
    return (
        <div className="login-section">
            <div className="login-content">
                <div className="login-form">
                    <div className="login-input dfcs">
                        <div className="login-item dfrs">
                            <div className="item-icon">
                            <MailFill fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                            <Input placeholder='请输入邮箱' maxLength={30} clearable type="email" onChange={(e) => handleDataChange('email', e)}/>
                            </div>
                        </div>
                        <div className="login-item dfrs">
                            <div className="item-icon">
                                <LockFill fontSize={24} color="#abb8c3"/>
                            </div>
                            <div className="item-input">
                                <Input placeholder='请输入密码' maxLength={10} clearable type={passwordType} onChange={(e) => handleDataChange('password', e)} />
                            </div>
                            <div className="item-extra dfcc" onClick={seePassword}>
                                {
                                    eyeOpen && <EyeFill fontSize={24} color="#abb8c3" />
                                }
                                {
                                    !eyeOpen && <EyeInvisibleFill fontSize={24} color="#abb8c3" />
                                }
                            
                            </div>
                        </div>
                    </div>
                    <Button block color='primary' size='large' onClick={() => login()} className="login-btn">
                        登录
                    </Button>
                    <div className="regist-section dfcs">
                        <div className="dfre">
                            <div className="user-regist" onClick={() => router.push('/login/regist')}>用户注册</div>
                            <div className="user-forget" onClick={() => router.push('/login/forget')}>忘记密码</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login

Login.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={false} userName="登录">
        {page}
      </Layout>
    )
}