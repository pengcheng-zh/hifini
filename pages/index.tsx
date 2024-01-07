import { NextPageWithLayout } from './_app'
import Layout from '@/app/components/layout/layout'
import PortalBanner from '@/app/components/banner/portalBanner';
import PortalCategory from '@/app/components/portalCategory';
import { TabItemType } from '@/app/types/pacalType';
import { useSession } from 'next-auth/react';
import { SpinLoading } from 'antd-mobile';

const tabItems:TabItemType[] = [
  { label: "最新", value: "latest-post" },
  { label: "热门", value: "hot-post"  },
  { label: "最近回复", value: "new-reply-post"  }
]

interface PropsType {
  userAvatar?: string,
  userName?: string,
  back?: boolean
}

const Home: NextPageWithLayout = () => {
    return(
        <>
        <PortalBanner></PortalBanner>
        <div className="portal-content dfcs">
            <PortalCategory tabItems={tabItems} limitCount={20} infinite={true}></PortalCategory>
        </div>
        </>
    )
}
    
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={false} userName='HiFiNi'>
        {page}
      </Layout>
    )
  }
