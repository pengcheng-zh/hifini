import Layout from "@/app/components/layout/layout"
import { NextPageWithLayout } from "./_app"
import { Form, ImageUploadItem, ImageUploader, Selector, TextArea, Toast } from "antd-mobile"

import "@/app/css/publish.css"
import { useState } from "react"
import { sleep } from "antd-mobile/es/utils/sleep"
import { Input, Select } from "antd"
import { postRequest } from "@/app/service/apiRequest"
import { useSession } from "next-auth/react"
import { NextRequest } from "next/server"

const { Option } = Select;

const publishTypeOptions = [
  { label: "华语",value: "music-ch" },
  { label: "日韩",value: "music-jp" },
  { label: "欧美",value: "music-us" },
  { label: "Remix",value: "music-remix" },
  { label: "纯音乐",value: "music-voice" }
]

type SummaryDataType = {
  envRate: string;
  meetRate: string;
  skinRate: string;
  feelRate: string;
  bodyRate: string;
  voiceRate: string;
  styleRate: string;
  chestSize: string;
  tecRate: string;
  secRate: string;
  costPrice: string;
  meetItems: string;
  bodyHeight: string;
  meetArea: string;
  meetDate: string;
  meetName: string;
  meetRecommend: string
}

type publishDataType = {
  type: string;
  title: string;
  summary: SummaryDataType;
  freeContent: string,
  freeImages: [],
  chargeContent: string,
  chargeImages: [],
  chargeAmount: string,
  chargeType: string
}

const Publish: NextPageWithLayout = () => {

  const { data: session } = useSession();

  console.log(session)

  let publishData = {
    type: '1',
    title: '',
    summary: {
      envRate: '3',
      meetRate: '3',
      skinRate: '3',
      feelRate: '3',
      bodyRate: '3',
      voiceRate: '3',
      styleRate: '3',
      chestSize: '3',
      tecRate: '3',
      secRate: '3',
      costPrice: '',
      meetItems: '',
      bodyHeight: '',
      meetArea: '',
      meetDate: '',
      meetName: '',
      meetRecommend: '3'
    },
    freeContent: '',
    freeImages: [],
    chargeContent: '',
    chargeImages: [],
    chargeAmount: '50',
    chargeType: 'bronze'
  } as publishDataType;

  const maxCount = 5
  const [freeImageList, setFreeImageList] = useState<ImageUploadItem[]>([
  ])

  const [chargeImageList, setChargeImageList] = useState<ImageUploadItem[]>([
  ])

  const selectorChange = (value:string) => {
    console.log('selector change', value)
    publishData.chargeType = value;
  }

  const selectAfter = (
    <Select defaultValue="bronze" onSelect={selectorChange}>
      <Option value="bronze">铜币</Option>
      <Option value="silver">银币</Option>
      <Option value="gold">金币</Option>
    </Select>
  );

  const handleInputChange = (name:string, value:string) => {
    console.log(name, value)
    if(name == 'title' || name == 'free_content' || name == 'charge_content' || name == 'charge_amount') {
      publishData[name as keyof publishDataType] = value as any
    }else {
      publishData.summary[name as keyof SummaryDataType] = value as string
    }
  }

  const handleSelectorChange = (name:string, value:string ) => {
    console.log( name, value)
    if(name == 'type') {
      publishData.type = value
    } else {
      publishData.summary[name as keyof SummaryDataType] = value
    }
  }

  const submitData = () => {
    console.log(chargeImageList)
    console.log(freeImageList)
    if(publishData.title == '') {
      Toast.show({
        content: '标题不能为空'
      })
      return
    }
    if(publishData.freeContent == '') {
      Toast.show({
        content: '免费内容不能为空'
      })
      return
    }
    if(publishData.chargeContent == '') {
      Toast.show({
        content: '收费内容不能为空'
      })
      return
    }
    if(publishData.summary.costPrice == '') {
      Toast.show({
        content: '价格介绍不能为空'
      })
      return
    }
    if(publishData.summary.costPrice == '') {
      Toast.show({
        content: '服务项目不能为空'
      })
      return
    }
    if(publishData.summary.meetDate == '') {
      Toast.show({
        content: '验证日期不能为空'
      })
      return
    }
    if(publishData.summary.costPrice == '') {
      Toast.show({
        content: '总体推荐指数不能为空'
      })
      return
    }
    
    console.log(publishData);
  }

  function beforeUpload(file: File) {
    if(file.size > 5 * 1024 * 1024) {
      Toast.show('请选择小于10M的图片');
      return null;
    }
    const isValidFile = file.type == 'image/jpeg' || file.type == 'image/png';
    if(!isValidFile) {
      Toast.show('只能上传jpg/png文件!');
      return null;
    } 
    return file;
  }

  async function mockUpload(file: File) {
      await sleep(3000)
      const formData = new FormData();
      formData.append('file', file);
      const response = await postRequest('/resource/post-image/upload', formData)

      console.log('upload response', response)
      if(response.result)  {
        return {
          url: response.object.url,
        }
      } else {
        Toast.show('只能上传jpg/png文件!');
        return null;
      }
      
    }

  return(
      <div className="publish-page">
        <div className="publish-sec">
          <div className="summary-title">
          <span className="required">*</span>主题
          </div>
          <div className="type-selector">
          <Selector
              columns={3}
              defaultValue={['1']}
              onChange={(e) => handleInputChange('type', e[0])}
              options={publishTypeOptions}
            />
          </div>
          <div className="summary-title">
          <span className="required">*</span>标题
          </div>
          <TextArea
                placeholder='请输入标题'
                maxLength={100}
                rows={2}
                showCount
                onChange={(e) => handleInputChange('title', e)}
              />
          <div className="summary-title"><span className="required">*</span>免费内容</div>
          <TextArea
              placeholder='请输入内容'
              maxLength={2000}
              autoSize={{ minRows: 3, maxRows: 40 }}
              showCount
              onChange={(e) => handleInputChange('free_content', e)}
            />
          <div className="free-images">
          <ImageUploader
                          value={freeImageList}
                          onChange={setFreeImageList}
                          upload={mockUpload}
                          beforeUpload={beforeUpload}
                          multiple
                          maxCount={maxCount}
                          showUpload={freeImageList.length < maxCount}
                          onCountExceed={exceed => {
                              Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
                          }}
                          />
          </div>
          <div className="summary-title"><span className="required">*</span>收费内容</div>
          <TextArea
              placeholder='请输入内容'
              maxLength={100}
              autoSize={{ minRows: 1, maxRows: 3 }}
              showCount
              onChange={(e) => handleInputChange('charge_content', e)}
            />
            <div className="free-images">
              <ImageUploader
                  value={chargeImageList}
                  onChange={setChargeImageList}
                  upload={mockUpload}
                  multiple
                  maxCount={maxCount}
                  showUpload={chargeImageList.length < maxCount}
                  onCountExceed={exceed => {
                      Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
                  }}
                  />
            </div>
            <div className="charge-stander">
            <Input addonBefore='收费' addonAfter={selectAfter} defaultValue={publishData.chargeAmount} type="number" onChange={(e) => handleInputChange('charge_amount', e.currentTarget.value)}/>
            </div>
          <div className="summary-title dfrc submit" onClick={submitData}>发布</div>   
        </div>
      </div>
  )
}

export default Publish

Publish.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout userName="发贴" back={false}>
        {page}
      </Layout>
    )
  }