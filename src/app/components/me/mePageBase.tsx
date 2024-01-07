import { useState } from "react"
import { NavBar, Image, Tabs, Form, Input, Button, ImageUploader, ImageUploadItem, Toast } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'

import { sleep } from "antd-mobile/es/utils/sleep"
import { UserBaseType } from "@/app/types/pacalType"

interface PropsType {
    userInfo: UserBaseType
}

const MePageBase: React.FC<PropsType> = ( { userInfo } ) => {
    const router = useRouter()
    const doBack = () => {
        router.back()
    }
    const baseOptions = [
        {label: '主题数', value: userInfo.postCount},
        {label: '收藏数', value: userInfo.storeCount},
        {label: '财富', value: userInfo.coinCount},
        {label: '用户等级', value: userInfo.userLevel},
        {label: '注册时间', value: userInfo.createTime},
        {label: 'Email', value: userInfo.email}
    ]

    const maxCount = 3
    const [fileList, setFileList] = useState<ImageUploadItem[]>([
        {
            url: userInfo.userAvatar,
        },
    ])

    async function mockUpload(file: File) {
        await sleep(3000)
        return {
          url: URL.createObjectURL(file),
        }
      }

    return (
        <div className='me-section-base'>
            <div className="me-base-body">
            <Tabs>
                <Tabs.Tab title='基本资料' key='me-basic'>
                    <div className="me-base-item">
                        {
                            baseOptions.map((info, index) => {
                                return <div className="basic-item" key={index}>
                                <span>{info.label}：</span>
                                <span>{info.value}</span>
                            </div>
                            })
                        }
                    </div>
                </Tabs.Tab>
                <Tabs.Tab title='用户名' key='me-username'>
                    <div className="me-base-item">
                        <Form layout='horizontal'>
                            <Form.Item label='现用户名' name='username'>
                                <Input placeholder={userInfo.userName} readOnly />
                            </Form.Item>
                            <Form.Item label='新用户名' name='new_username'>
                                <Input placeholder='请输入' clearable/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="me-base-item dfcc reset-username">
                        <Button>重置用户名(5铜币)</Button>
                    </div>
                </Tabs.Tab>
                <Tabs.Tab title='密码' key='me-password'>
                    <div className="me-base-item">
                        <Form layout='horizontal'>
                            <Form.Item label='旧密码' name='old_password'>
                                <Input placeholder='' clearable/>
                            </Form.Item>
                            <Form.Item label='新密码' name='new_password'>
                                <Input placeholder='' clearable/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="me-base-item dfcc reset-username">
                        <Button>重置密码</Button>
                    </div>
                </Tabs.Tab>
                <Tabs.Tab title='头像' key='me-avatar'>
                    <div className="me-base-avatar dfcc">
                        <div className="dfrc">
                        <ImageUploader
                            value={fileList}
                            onChange={setFileList}
                            upload={mockUpload}
                            multiple
                            maxCount={1}
                            showUpload={fileList.length < maxCount}
                            onCountExceed={exceed => {
                                Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
                            }}
                            />
                        </div>
                        <div className="me-base-avatar-btn dfrc">
                            <Button>更换头像</Button>
                        </div>
                    </div>
                </Tabs.Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default MePageBase