//头部组件
import React,{Component}from 'react'
import logo from '../images/logo.png'
import {Row,Col,Menu,Modal,Icon,Button,Tabs,Form,Input,message} from 'antd'
import {Link} from 'react-router'
import '../componentsCss/pc.css'
import axios from 'axios'
class NewsHeader extends Component{
state={
  selectedKey:'top',//默认导航
  username:null,//用户名
  modalShow:false//用户登录弹窗
  }
  //用户登录弹窗
  showModal=(isShow)=>{
  this.setState({modalShow:isShow})
  }

  componentDidMount(){
      //读取保存到浏览器的用户名
      const username=localStorage.getItem('username')
      if(username){
          this.setState({username})
      }
  }
  //鼠标移入导航标签

  clickMenu = ({key}) => {
    // 如果点击的是'登陆/注册'
    if(key==='logout') {
      // 显示modal
      this.setState({modalShow: true})
    }

    // 更新状态
    this.setState({selectedKey: key})
  }

  //处理提交登陆的请求
  handleSubmit=(isLogin,event)=>{
    event.preventDefault()
    const {username,password,r_userName,r_password,r_confirmPassword}=this.props.form.getFieldsValue()
    let url='http://newsapi.gugujiankong.com/Handler.ashx?'
      if (isLogin){
        url+=`action=login&username=${username}&password=${password}`
      }else {

        url+=`action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

      }

axios.get(url)
  .then(res=>{
    //清除输入数据
    this.props.form.resetFields()
    const result=res.data
    if(isLogin){
        if(!result){
          message.error('登陆失败，请重新登陆')
        }else {
          message.success('登陆成功')
          //读取返回的username和id
          const username=result.NickUserName
          const userId=result.UserId
          //更新状态
          this.setState({username})
          //保存username和id
          localStorage.setItem('username',username)
          localStorage.setItem('userId',userId)

        }
    }else {
      message.success('注册成功')
    }

  })
//关闭Modal
    this.setState({modalShow:false})
  }
  //处理退出按钮
  logout = () => {
    //更新状态
    this.setState({username: null})
    // 清除保存的用户数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }
  render(){
  const {selectedKey,username,modalShow}=this.state
    //判断是否登陆，以显示页面
    const userShow=username ? (
      <Menu.Item key="login" className="register">
        <Button type="primary">{username}</Button> &nbsp;
        <Link to="/user_center"><Button type="dashed">个人中心</Button></Link> &nbsp;
        <Button onClick={this.logout}>退出</Button>
      </Menu.Item>
    ):(
      <Menu.Item key="logout" className="register">
        <Icon type="appstore"/>注册/登陆
      </Menu.Item>
    )
    console.log(username);
    const { getFieldDecorator}=this.props.form
    return(
      <div>
        <header>
          <Row>
            <Col span="1"></Col>
            <Col span="3">
              <a href="/" className="logo">
                <img src={logo} alt=""/>
                <span>NEWS</span>
              </a>
            </Col>
            <Col span="19">
              <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.clickMenu}>
                <Menu.Item key="top">
                  <Icon type="appstore"/>头条
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="appstore"/>社会
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="appstore"/>国内
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="appstore"/>国际
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="appstore"/>娱乐
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="appstore"/>体育
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="appstore"/>科技
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="appstore"/>时尚
                </Menu.Item>
                {userShow}
              </Menu>
              <Modal title="用户中心"
                      visible={modalShow}
                      onOk={this.showModal.bind(this,false)}
                      onCancel={()=>this.showModal(false)}
              >
                <Tabs  type="card" onChange={()=>this.props.form.resetFields()}>
                <Tabs.TabPane tab="登陆" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>
                    <Form.Item label="用户名">
                      {
                        getFieldDecorator('username')(<Input type='text'></Input>)
                      }
                    </Form.Item>
                    <Form.Item label="密码">
                      {
                        getFieldDecorator('password')( <Input type='password'></Input>)
                      }

                    </Form.Item>
                    <Button type="primary" htmlType='submit'>登陆</Button>
                  </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this,false)}>
                    <Form.Item label="用户名">
                      {
                        getFieldDecorator('r_userName')(<Input type='text'></Input>)
                      }
                    </Form.Item>
                    <Form.Item label="密码">
                      {
                        getFieldDecorator('r_password')( <Input type='password'></Input>)
                      }

                    </Form.Item>
                    <Form.Item label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')( <Input type='password'></Input>)
                      }

                    </Form.Item>
                    <Button type="primary" htmlType='submit'>注册</Button>
                  </Form>
                </Tabs.TabPane>

              </Tabs>
              </Modal>
            </Col>
            <Col span="1"></Col>
          </Row>
        </header>
      </div>
    )
  }
}
export default Form.create()(NewsHeader)