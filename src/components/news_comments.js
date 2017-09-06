import React,{Component,PropTypes}from 'react'
import axios from 'axios'
import {Form,Card,Input,Button,notification} from 'antd'
class NewsComments extends Component{
  static propTypes={
      uniquekey:PropTypes.string.isRequired
  }
  state={
    comments:[]
  }
  //初始化显示执行
  componentDidMount(){
    const {uniquekey}=this.props
    this.showComments(uniquekey)
  }
  //组件接受到新属性触发(切换新闻)
  componentWillReceiveProps(newProps){
    this.showComments(newProps.uniquekey)
  }
//定义发送axios函数,以便重复调用
  showComments(uniquekey){
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(res=>{
        //
        const comments=res.data
        this.setState({comments})
      })
  }

  //提交评论
  handleSubmit=()=>{
    const userId=localStorage.getItem('userId')
    const {uniquekey}=this.props
    const {comments}=this.props.form.getFieldsValue()
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comments}`
    if(!userId){
      alert('请先登陆')
      return
    }
    axios.get(url)
      .then(res=>{
        //更新评论列表
      this.componentDidMount()
        //提示
        notification.success({
          message:'提交成功'
        })
        //清楚输入数据
        this.props.form.resetFields()
      })
  }
  //收藏
  handleClick=()=>{
    const userId=localStorage.getItem('userId')
    const {uniquekey}=this.props
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    if(!userId){
      alert('请先登陆')
      return
    }
    axios.get(url)
      .then(res=>{
        //提示
        notification.success({
          message:'收藏成功'
        })
      })
  }
  render(){
    const commentList=this.state.comments.map((comment,index)=>(
      <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    const {getFieldDecorator}=this.props.form
    return(
        <div style={{padding:'10px'}}>
          {commentList}
          <Form onSubmit={this.handleSubmit}>
            <Form.Item lable="您的评论">
              {
                getFieldDecorator('comments')(<Input type="textarea"/>)
              }
            </Form.Item>
            <Button type='primary' htmlType='submit'>提交评论</Button>
            <Button type='primary' onClick={this.handleClick}>收藏文章</Button>
          </Form>
        </div>
    )
  }
}
export default Form.create()(NewsComments)