import { useState } from "react"
import { NavBar, Image, Tabs, Button } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'

interface PropsType {
    userAvatar?: string,
    userName?: string,
    back?: boolean
}

const chargeAmountOptions = [
    1, 5, 10, 20, 50, 100
]

const MePageRecharge: React.FC<PropsType> = ( ) => {
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
                    <div className="current-amount">
                        <p>当前账户: 3 铜币 5银币 1金币</p>
                        <p>若付款后10分钟内未到账等问题及时联系↓↓↓</p>
                        <p>qq: 123456 偶尔可能延迟等等会到</p>
                    </div>
                    <div className="recharge-amount dfcs">
                        <div className="amount-enum dfrac">
                            {
                                chargeAmountOptions.map((amount, index) => 
                                <Button key={index}
                                className={rechargeAmount == amount ? "active" : ""} 
                                onClick={() => changeRechargeAmount(amount)}>¥{amount}
                                </Button>
                                )
                            }
                        </div>
                        <div className="recharge-method dfrac">
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

export default MePageRecharge