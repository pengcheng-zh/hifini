import { useState } from "react"
import { Button, Radio,Space  } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'

interface PropsType {
    userAvatar?: string,
    userName?: string,
    back?: boolean
}

const memberInfo = {
    coinCount: 134,
    coinBronze: 4,
    coinSilver: 3,
    coinGold: 1,
    expireTime: "2023-11-13"
}

const MePageMember: React.FC<PropsType> = ( ) => {
    const router = useRouter()

    const [ rechargeAmount, setRechargeAmount ] = useState(0)

    const doBack = () => {
        router.back()
    }
    const changeRechargeAmount = (amount: number) => {
        if(amount == rechargeAmount) {
            amount = 0;
        }
        setRechargeAmount(amount)
    }
    return (
        <div className='me-section-base'>
            <div className="me-base-body">
                <div className="recharge-section bg-white">
                    <div className="member-section dfcs">
                        <div className="item dfrs">
                            <div className="label dfrc">当前账户: </div>
                            <div className="value dfrs">
                                <div className="value1 dfrc">
                                    <div className="value1">{memberInfo.coinGold}</div>
                                    <div className="coin-gold"></div>
                                </div>
                                <div className="value2 dfrc">
                                    <div className="value1">{memberInfo.coinSilver}</div>
                                    <div className="coin-silver"></div>
                                </div>
                                <div className="value3 dfrc">
                                    <div className="value1">{memberInfo.coinBronze}</div>
                                    <div className="coin-bronze"></div>
                                </div>
                            </div>
                        </div>
                        <div className="item dfrs">
                            <div className="label">注: 1 金币 = 100 银币  1银币 = 100铜币</div>
                        </div>
                        <div className="item dfrs">
                            <div className="label">若付款后10分钟内未到账等问题及时联系↓↓↓</div>
                        </div>
                        <div className="item dfrs">
                            <div className="label">你的会员有效期至:</div>
                            <div className="value dfrs">
                                <div className="value1">{memberInfo.expireTime}</div>
                            </div>
                        </div>
                        <div className="item dfrs">
                            <div className="label">qq: 123456 偶尔可能延迟等等会到</div>
                        </div>
                    </div>
                    <div className="amount-enum">
                    <Radio.Group defaultValue='1'>
                    <Space direction='vertical'>
                        <Radio value='monthly'>月度会员 ¥29.9</Radio>
                        <Radio value='quarter'>季度会员 ¥69.9</Radio>
                        <Radio value='annual'>年度会员 ¥199.9</Radio>
                    </Space>
                    </Radio.Group>
                    </div>
                    <div className="recharge-amount dfcs">
                        <div className="recharge-method dfrac">
                            <div className="recharge-balance">
                                <Button className="balance">
                                    <div className="dfrs">
                                        <div className="icon"></div>
                                        <div className="name dfcc">余额开通</div>
                                    </div>
                                </Button>
                            </div>
                            <div className="recharge-alipay">
                                <Button className="alipy">
                                    <div className="dfrs">
                                        <div className="icon"></div>
                                        <div className="name dfcc">支付宝</div>
                                    </div>
                                </Button>
                            </div>
                            <div className="recharge-wechat">
                                <Button className="wechat dfrs">
                                    <div className="dfrs">
                                    <div className="icon"></div>
                                    <div className="name dfcc">微信</div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MePageMember