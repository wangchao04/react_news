//用户中心
import React,{Component}from 'react'
import {Row,Col,Tabs}from 'antd'
import axios from 'axios'
export default class UserCenter extends Component{
  state={
    collections:[],
    comments:[]
  }
  render(){
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <Tabs.Pane key="1" tab="我的收藏列表"></Tabs.Pane>
              <Tabs.Pane key="2" tab="我的评论列表"></Tabs.Pane>
              <Tabs.Pane key="3" tab="头像设置"></Tabs.Pane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}