import React, { useEffect, useState } from "react";
import { List, PageIndicator, SpinLoading} from "antd-mobile";
import { useRouter } from 'next/navigation'
import PostItem from "../postItem";
import { Pagination } from "antd";
import { sleep } from "antd-mobile/es/utils/sleep";

const GetPaginationData = (props: { itemKey: string, limit: number }) => {
  const { itemKey } = props;
  const [postList, setPostList] = useState<object[]>([]);

  const [showLoading, setShowLoading] = useState(false);

  const postData = {
    id: 123,
    userAvatar: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    title: '凤凰传奇《海底（Live）》[FLAC/MP3-320K]',
    type: {itemKey},
    userName: 'qqjswen',
    createTime: '1小时前'
  }

  const getNextData = async (page: number) => {
    await sleep(2000);
    const ret: object[] = [];
    let user = postData.userName;
    for (let i = 0; i < 10; i += 1) {
      postData.userName = 'page_' + page;
      ret.push(postData);
    }
    return ret;
  }

  useEffect(() => {
    const asyncFun = async () => {
        const append = await getNextData(1);
        setPostList(append);
    }
    setShowLoading(true)
    asyncFun();
    setShowLoading(false);
  }, [itemKey]);

  const handleChangePage = async (page:number) => {
    setShowLoading(true);
    const append = await getNextData(page);
    setPostList([...append]);
    setShowLoading(false);
  }

  return (
    <div className="dfcs">
        <List>
          {
            !showLoading && postList.map((item: any, index: number) => (
                <PostItem key={index} postData={item}></PostItem>
              ))
          }
          {
            showLoading && <div className="dfrc">
                <SpinLoading color='primary' />
            </div>
          }
        </List>
        <div className="explore-pagination dfcc">
            <div className="dfrc">
            <Pagination defaultCurrent={1} total={500} pageSize={10} onChange={(e) => handleChangePage(e)}></Pagination>
            </div>
        </div>
    </div>
  );
};

export default GetPaginationData;
