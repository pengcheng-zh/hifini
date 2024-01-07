import React, { useEffect, useState } from "react";
import { InfiniteScroll, PullToRefresh, List, Image } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { useRouter } from 'next/navigation'
import PostItem from "../postItem";

const GetPullToRefreshData = (props: { itemKey: string, limit: number }) => {
  const { itemKey } = props;
  const router = useRouter()

  const postData = {
    id: 123,
    userAvatar: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    title: '凤凰传奇《海底（Live）》[FLAC/MP3-320K]',
    type: {itemKey},
    userName: 'qqjswen',
    createTime: '1小时前'
  }

  console.log(itemKey)
  function getNextData() {
    const ret: object[] = [];
    for (let i = 0; i < 10; i += 1) {
      postData.userName = postData.userName + i;
      ret.push(postData);
    }
    return ret;
  }
  const [postList, setPostList] = useState<object[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = async () => {
    const append = await getNextData();
    setPostList([...postList, ...append]);
    setHasMore(append.length > 0);
  };

  useEffect(() => {
    setPostList([]);
    getNextData();
  }, [itemKey]);

  return (
    <div style={{height: '100vh', overflowY: 'scroll'}}>
      <PullToRefresh
        key={itemKey}
        onRefresh={async () => {
          await sleep(1000);
          setPostList([...getNextData(), ...postList]);
        }}
      >
        <List>
          {postList.map((item: any, index: number) => (
            <PostItem key={index} postData={item}></PostItem>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  );
};

export default GetPullToRefreshData;
