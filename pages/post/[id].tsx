import { useState, useRef } from "react"
import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "../_app"

import { TextArea, Button, Image, Dialog, Toast, Popup, Checkbox} from "antd-mobile"
import { LockFill, StarOutline, PayCircleOutline, EditSOutline } from "antd-mobile-icons"
import { useRouter } from 'next/navigation'

import AdBanner from "@/app/components/banner/adBanner"
import PostComment from "@/app/components/comment/postComment"

import '@/app/globals.css'
import '@/app/css/detail.css'

interface PropsType {
    postId: number
  }

const PostDetail: NextPageWithLayout = (postId) => {
    let userName = '张三'
    let datetime = '2023-11-17 21:28:45'
    let imageUrl = 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
    
    const router = useRouter()
    const back = () => {
        router.back()
    }
    const commentRef = useRef(null)

    const setReplayPost = () => {
        if(commentRef.current) {
            commentRef.current.replyPost(postId);
        }
    }
    const seeUserInfo = (id:number) => {
        if(commentRef.current) {
            commentRef.current.setUserPopVisible(true);
        }
    }

    const buyPost = async () => {
        const result = await Dialog.confirm({
            content: '确定花费5个铜币购买吗？'
        })
        if(result) {
            Toast.show({content: '购买成功'});
        }
    }

    const postData = {
        id: 123,
        userAvatar: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        title: '凤凰传奇《海底（Live）》[FLAC/MP3-320K]',
        type: 'hot',
        userId: 1,
        userName: 'qqjswen',
        chargeAmount: 5,
        content: "<p>爱怎么做怎么错</p><p>怎么看怎么难怎么教人死生相随</p>\
        <p>爱是一种不能说只能尝的滋味</p><p>试过以后不醉不归</p><p>等到红颜憔悴它却依然如此完美</p>\
        <p>等到什么时候我们才能够体会</p>\
        <p>爱是一朵六月天飘下来的雪花</p>\
        <p>还没结果已经枯萎</p>\
        <p>爱是一滴擦不干烧不完的眼泪</p>\
        <p>还没凝固已经成灰</p>\
        <p>等到情丝吐尽 它才出现那一回</p>\
        <p>等到红尘残碎</p>\
        <p>它才让人双宿双飞</p>\
        <p>有谁懂得个中滋味</p>\
        <p>爱是迷迷糊糊天地初开的时候</p>\
        <p>那已经盛放的玫瑰</p>\
        <p>爱是踏破红尘望穿秋水只因为</p>\
        <p>爱过的人不说后悔</p>\
        <p>爱是一生一世一次一次的轮回</p>\
        <p>不管在东南和西北</p>\
        <p>爱是迷迷糊糊天地初开的时候</p>\
        <p>那已经盛放的玫瑰</p>\
        <p>爱是踏破红尘望穿秋水只因为</p>\
        <p>爱过的人不说后悔</p>\
        <p>爱是一生一世一次一次的轮回</p>\
        <p>不管在东南和西北</p>",
        createTime: '1小时前',
        viewTimes: 73732
    }

    return(
        <div className="post-detail dfcs">
            <div className="post-main dfcs">
                <div className="post-head dfrs">
                    <div className="post-user dfcs">
                    <Image src={postData.userAvatar} 
                    style={{ borderRadius: 20 }} 
                    fit="cover" 
                    width={30} height={30}
                    onClick={() => seeUserInfo(postData.userId)}
                    ></Image>
                    </div>
                    <div className="post-content dfcs">
                        <div className="post-title">{postData.title}</div>
                        <div className="post-description dfrs">
                            <span>{postData.userName}</span>
                            <span>{postData.createTime}</span>
                            <span>{postData.viewTimes}</span>
                        </div>
                    </div>
                </div>
                <AdBanner></AdBanner>
                <div className="post-body">
                    <div className="free" dangerouslySetInnerHTML={{ __html: postData.content }}>   
                    </div>
                    <div className="charge">
                        <h5>收费区</h5>
                        <div className="alert-warning" role="alert">
                        <LockFill />
                            本隐藏内容需要{postData.chargeAmount}铜币，请您<span className="post-buy" onClick={buyPost}>购买</span>后查看
                        </div>
                    </div>
                    <div className="post-store-section dfsc">
                        <div className="store">
                            <Button block size='small'>
                            <StarOutline />
                            <span className="ml4">收藏</span>
                            <span className="ml4">90</span>
                            </Button>
                            <div className="store-num"></div>
                        </div>
                        <div className="post-bait">
                            <Button block size='small'>
                            <PayCircleOutline />
                            <span className="ml4">已购买</span>
                            <span className="ml4">90</span>
                            </Button>
                        </div>
                        <div className="reply" onClick={() => setReplayPost()}>
                            <Button block size='small'>
                            <EditSOutline />
                            <span className="ml4">回贴</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="post-header"></div>
            </div>
            <PostComment postId={postData.id} ref={commentRef}></PostComment>
        </div>
    )
}

// // 在构建时也会被调用
// export async function getStaticProps({ params }: { params: object} ) {
//     // params 包含此片博文的 `id` 信息。
//     // 如果路由是 /posts/1，那么 params.id 就是 1
//     const res = await fetch(`https://.../posts/${params.id}`)
//     const post = await res.json()
  
//     // 通过 props 参数向页面传递博文的数据
//     return { props: { post } }
// }

export default PostDetail

PostDetail.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout back={true}>
        {page}
      </Layout>
    )
  }