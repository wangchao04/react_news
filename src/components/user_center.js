//用户中心
import React,{Component}from 'react'
import {Row,Col,Tabs,Card,Upload,Modal,Icon}from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
export default class UserCenter extends Component{
  state={
    collections:null,
    comments:null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]
  }
  handleCancel = () => this.setState({ previewVisible: false })

  // 显示预览图片(显示 modal)
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // 选择上传图片
  handleChange = ({ fileList }) => this.setState({ fileList })
  componentDidMount(){
    const userId=localStorage.getItem('userId')
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(res=>{
        const collections=res.data
        this.setState({collections})
      })
    url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(res=>{
        const comments=res.data
        this.setState({comments})
      })
  }
  render(){
    const {collections,comments}=this.state
    let collectionList=!collections
    ?<h3>没有收藏</h3>
    :(collections.map((item,index)=>{
      const {uniquekey,Title}=item
        return ( <Card key={index} title={uniquekey} extra={<Link to={`/news_detail/${uniquekey}/guoji`}>查看</Link>}>{Title}</Card>)
      }))
    let commentList=!comments
      ?<h3>没有评论</h3>
      :(comments.map((item,index)=>{
        const {uniquekey,Comments,datetime}=item
        return ( <Card key={index} title={`于${datetime}评论新闻${uniquekey}`} extra={<Link to={`/news_detail/${uniquekey}/guoji`}>查看</Link>}>{Comments}</Card>)
      }))
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return(

        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <Tabs.TabPane key="1" tab="我的收藏列表">
                {collectionList}
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab="我的评论列表">
                {commentList}
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab="头像设置">
                <div className="clearfix">
                  <Upload
                    action="http://jsonplaceholder.typicode.com/photos"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>

    )
  }
}