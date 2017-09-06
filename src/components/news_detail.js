//新闻详情
import React,{Component}from 'react'
import axios from 'axios'
import NewsImageBlock from './news_image_block'
import {Row,Col,BackTop} from 'antd'
import NewsComments from './news_comments'
export default class NwesDetail extends Component{
  state={
    news:{}
  }
  //定义发送axios函数,以便重复调用
  showNewsDetail(uniquekey){
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(res=>{
        const news=res.data
        this.setState({news})
        //更新标题
        document.title=news.title
      })
  }
  componentDidMount(){
    const {uniquekey}=this.props.params
    this.showNewsDetail(uniquekey)
  }
  //组件接受到新属性触发
  componentWillReceiveProps(newProps){
    this.showNewsDetail(newProps.params.uniquekey)
  }
  render(){
    const {news}=this.state
    const {type,uniquekey}=this.props.params
console.log(this.props)
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className='container'>
            <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}></NewsComments>
          </Col>
          <Col span={6}>
            <NewsImageBlock cardTitle='相关新闻' type={type} count={40} cardWidth="100%" imageWidth="150px"/>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop/>
      </div>
    )
  }
}