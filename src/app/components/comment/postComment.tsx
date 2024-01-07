import { forwardRef, useImperativeHandle, useState } from "react"
import { Button, Checkbox, Image, Popup, TextArea } from "antd-mobile"
import { useRouter } from 'next/navigation'

import { FillinOutline } from "antd-mobile-icons"

import '@/app/globals.css'
import { Pagination } from "antd"

/**
 * 评论列表item组件
 */
interface PropsType {
  postId: number
  ref: any
}

const PostComment: React.FC<PropsType> = forwardRef (( { postId }, ref ) => {
  console.log(postId)
  
  const [activeId, setActiveId] = useState(0)
  const [content, setContent] = useState('')

  
  const [popVisible, setPopVisible] = useState(false)
  const [userPopVisible, setUserPopVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    replyPost
  }))

  const postComment = {
    id: 1,
    userId: 0,
    userAvatar: 'https://hifini.com/view/img/avatar.png',
    content: '谢谢',
    userName: '1823',
    createTime: '2020-01-06 10:21:55'
  }
  
  const commentList = [];
  for(let i = 1; i < 11; i++){
    const newComment = Object.assign({}, postComment)
    newComment.id = i
    commentList.push(newComment)
  }

  const replyPost = (postId: number) => {
    setPopVisible(!popVisible);
  }

  const replyComment = (id:number) => {
    setPopVisible(true);
  }
  const seeUserInfo = (id:number) => {
    setUserPopVisible(true);
  }

  const handleChangePage = (page: number) => {
    console.log(page)
  }
  return (
    <div className="post-comment-section dfcs">
      <div className="comment-head dfrs">
          <div className="reply-count"><b>最新回复(7059)</b></div>
      </div>
      <div className="comment-body">
      {
          commentList.map((comment, index) => 
          <div className={"comment-list-item dfcs" + (activeId == comment.id ? ' active' : '') } key={index}>
            <div className="comment-item-content dfrs">
              <div className="comment-item-content-prefix">
                <Image src={comment.userAvatar} 
                style={{ borderRadius:  20 }} 
                fit="cover" width={30} height={30}
                onClick={() => seeUserInfo(comment.userId)}
                ></Image>
              </div>
              <div className="comment-item-content-main">
                <div className="comment-item-content-top">
                  <span className="username">{comment.userName}</span>
                  <span className="create-time">{comment.createTime}</span>
                </div>
                <div className="comment-item-content-bottom">
                  {comment.content}
                </div>
              </div>
              <div className="comment-item-content-reply dfcc">
                <div className="dfre">
                  <div className="reply-comment" onClick={() => replyComment(comment.id)}>
                  <FillinOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div className="explore-pagination dfcc">
          <div className="dfrc">
          <Pagination defaultCurrent={1} total={500} pageSize={10} onChange={(e) => handleChangePage(e)}></Pagination>
          </div>
      </div>
      </div>
      <Popup
        visible={popVisible}
        onMaskClick={() => {
          setPopVisible(false)
        }}
        showCloseButton
        onClose={() => {
          setPopVisible(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }}
      >
        <div className="post-comment dfcs">
          <div className="reply-area">
          <TextArea placeholder='请勿发表无意义或恶意攻击言论！'
              onChange={val => {
                  setContent(val)
              }} 
              autoSize={{ minRows: 1, maxRows: 5 }}
              showCount
              maxLength={100}/>
          </div>
          <div className="replay-action dfrs">
              <div className="reply-btn">
                  <Button block size='small'>
                  回复
                  </Button>
              </div>
              <div className="reply-highlight dfre">
                  <div><Checkbox>高亮回复(仅会员可用)</Checkbox></div>
              </div>
          </div>
        </div>
      </Popup>

      <Popup
              visible={userPopVisible}
              bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                height: '20vh',
              }}
              showCloseButton
              onMaskClick={() => {
                setUserPopVisible(false)
              }}
              onClose={() => {
                setUserPopVisible(false)
              }}
            >
                <div className="pop-userinfo">
                    <div className="user-avatar">111</div>
                    <div className="user-simple">222</div>
                </div>
        </Popup>
  </div>
  )
})

export default PostComment