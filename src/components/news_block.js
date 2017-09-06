/**
 * Created by TianYa on 2017/9/4.
 */
/**
 * 新闻列表组件
 */
import React,{Component,PropTypes}from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'
export default class NewsBlock extends Component{
  static propTypes={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }
  state={
    newsArr:null
  }
  componentDidMount(){
    const {type,count}=this.props
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

    axios.get(url)
      .then(res=>{
        const newsArr=res.data

        this.setState({newsArr})
      })
  }

  render(){
    const {newsArr}=this.state
    const {type}=this.props
    console.log(this.props)
    const contentUI=!newsArr?(<h3>没有任何新闻</h3>):(
      <ul>
        {
          newsArr.map((item,index)=>(
            <li key={index}>
              <Link to={`/news_detail/${item.uniquekey}/${type}`}>{item.title}</Link>
            </li>
            ))
        }
      </ul>
    )
    return(
      <Card className="topNewsList">
        {
          contentUI
        }
      </Card>
    )
  }
}