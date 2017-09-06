/**
 * Created by TianYa on 2017/9/4.
 */
import React,{Component,PropTypes}from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
export default class NewsImageBlock extends Component{
  static propTypes={
    type:PropTypes.string.isRequired,
   count:PropTypes.number.isRequired,
    cardTitle:PropTypes.string.isRequired,
    cardWidth:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired

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
    const {cardTitle,cardWidth,imageWidth,type}=this.props
    const {newsArr}=this.state
    const imageStyle={
      width:imageWidth,
      height:'90px',
      display:'block'
    }
    const titleStyle = {
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }
    const contentUI=!newsArr?(<h3>没有任何新闻</h3>):(
          newsArr.map((item,index)=>(
            <div key={index}className="imageblock">
              <Link to={`/news_detail/${item.uniquekey}/${type}`}>
                <div>
                  <img src={item.thumbnail_pic_s} style={imageStyle}/>
                </div>
                <div className="custom-card">
                  <h3 style={titleStyle}>{item.title}</h3>
                  <p>{item.author_name}</p>
                </div>
              </Link>
            </div>
          ))
    )

    return(
      <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
        {
          contentUI
        }
      </Card>
    )
  }
}