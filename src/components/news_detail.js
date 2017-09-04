//新闻详情
import React,{Component}from 'react'
export default class NwesDetail extends Component{
  render(){
    return(
      <div>新闻详情id:{this.props.params.id}</div>
    )
  }
}