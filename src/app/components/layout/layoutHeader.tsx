import { NavBar, Image, SpinLoading } from "antd-mobile"
import { useRouter } from 'next/navigation'

import '@/app/globals.css'
import styles from './layout.module.css'
import { useSession } from "next-auth/react"



interface PropsType {
    userAvatar?: string,
    userName?: string,
    back?: boolean
}

const PacalHeader: React.FC<PropsType> = ( { userName, back, userAvatar } ) => {
    const router = useRouter()
    const doBack = () => {
        router.back()
    }

    return (
        <div className={styles.appheader}>
            <NavBar backArrow={back} onBack={doBack}>
                <div className="head-content dfrc">
                <Image src={userAvatar} style={{ borderRadius:  10 }} fit="cover" width={30} height={30}></Image>
                <span className="ml6">{userName}</span>
                </div>
            </NavBar>
        </div>
    )
}

export default PacalHeader