import React from 'react';
import { Header, Segment, Image, Button, Grid } from 'semantic-ui-react';
import LogIn from './login.js'
import SignUp from './signup.js';
import Dashboard from './dashboard'
import Payment from './paymentpage.js'
import EditProfile from './editprofile.js'
import PlacedOrder from './placedorder.js'
import DashboardAdmin from './dashboardadmin.js'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';
import ForgotPass from './forgotpass'
import Card from './carddetail'
//import FlipCard from 'react-flipcard'

var firebaseConfig = {
  apiKey: "AIzaSyADusOghG5EPJHSs2XLWiTCr1lBRtRWs64",
    authDomain: "online-quiz-bec1a.firebaseapp.com",
    databaseURL: "https://online-quiz-bec1a.firebaseio.com",
    projectId: "online-quiz-bec1a",
    storageBucket: "online-quiz-bec1a.appspot.com",
    messagingSenderId: "6939473706",
    appId: "1:6939473706:web:0f7cd5cc55a23554"
};

firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.state = {
      db: {
        quantity: 0,
        isAdmin: false,
        isUser: false,
        activeItem: "Home",
        user: { username: "xyz", email: "xyz@gmail.com", mobileno: "1234567890", age: "18", password: "*****" },
        pastorder: [
          { date: "12-08-2019", item: { name: "Coffiee", quantity: 5, price: 50 }, totalprice: 150 },
          { date: "12-08-2019", item: { name: "Coffiee", quantity: 5, price: 50 }, totalprice: 150 },
          { date: "12-08-2019", item: { name: "Coffiee", quantity: 5, price: 50 }, totalprice: 150 }],
        orderItem: { date: "12-08-2019", item: { name: "Coffiee", quantity: 5, price: 50 }, totalprice: 150 },
        payment: false,
        feedbacks: [
          { username: "XYZ", comment: "hdbshdgygduahdja" },
          { username: "XYZ", comment: "hdbshdgygduahdja" },
          { username: "XYZ", comment: "hdbshdgygduahdja" },
          { username: "XYZ", comment: "hdbshdgygduahdja" },
          { username: "XYZ", comment: "good"}],
        monthsales: 20000,
        daysales: 1000,
        monthsalescoffee: 8000, monthsalestea: 8000, monthsaleswater: 4000,
        daysalescoffee: 400, daysalestea: 500, daysaleswater: 300,
      }
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8080/feeds')
      .then(res => {
      const {db} = this.state;
      db.feedbacks= res.data;
      console.log(db)
      this.setState({ db});
    })
    this.checkLogin();
  }

  checkLogin() {
    const {db} = this.state;
    firebase.auth().onAuthStateChanged((user) => {
      console.log("hii",user.uid,user.displayName)
      db.username = user.displayName;
      axios.put('http://localhost:8080/user',{uid:user.uid}).then((res)=>{
      console.log(res.data);
      if(res.data){
      db.user = res.data;
      db.user.password = "******"
      }
      axios.put('http://localhost:8080/pastorder',{uid:user.uid}).then(
      (res)=>{
        console.log("hiii hello how are you")
        console.log(res.data)
        const {db} = this.state;
      db.pastorder= res.data;
      console.log(db)
      this.setState({ db});
    })
    })
    this.setState({ db });
    console.log(this.state.db.username)
      if (user) {
        if (user.email === 'shivamgupta20196@gmail.com') {
        console.log('inside admin');
        //this.props.history.push('/Admin');
        db.isAdmin = true;
      }
      else {
        console.log('inside user');
        //this.props.history.push('/User');
      }
      db.isUser = true;
      this.setState({ db });
      }
    });
  }

  userLogIn=()=>{
    const {db}=this.state;
    //db.er=false;
    this.setState({db});
    firebase.auth().signInWithEmailAndPassword(db.email, db.password).then((result)=>{
    // The signed-in user info.
    var user = result.user;
    console.log("email signin",user.displayName,user.email,user.uid);
    axios.put('http://localhost:8080/user',{uid:user.uid}).then((res)=>{
      console.log(res.data);
      db.user = res.data;
      db.user.password = "******"
    })
    if(user.email == 'shivamgupta20196@gmail.com'){
      db.isAdmin = true;
    }
    db.isUser = true;
    this.setState({db});
    })
    .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      db.er = true;
      db.msg = 'You entered wrong password'
    } else {
      db.er = true;
      db.msg = errorMessage;
    }
    this.setState({db});
    console.log(error);
    // ...
    });
    }

  logout=()=> {
    firebase.auth().signOut().then(() => {
      console.log("logout done")
      const { db } = this.state;
      console.log("hii")
      db.isUser = false;
      db.isAdmin = false;
      db.username = '';
      db.email = '';
      db.password = '';
      db.passwordConfirmation = '';
      db.error = false;
      //clearInterval(db.interval);
      this.setState({ db })
      console.log(this.state)
      this.props.history.push('/')
    }).catch(function (error) {
    });
  }

  addUser=()=>{
    const { db } = this.state;
    db.er = false;
    this.setState({db})
    if (db.passwordConfirmation !== db.password) {
      db.er = true;
      db.msg = 'password does not match'
      this.setState({ db: db })
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(db.email, db.password).then((result)=>{
    var user = result.user;
    axios.post('http://localhost:8080/addUser',{uid:user.uid,username:db.username,age:db.age,mobileno:db.mobileno,email:db.email}).then(
      (res)=>{
        console.log(res.data)
        db.user = res.data
        db.user.password = "******"
        this.setState({ db: db })
    })
    console.log("email signup",user.displayName,user.email,user.uid);
    this.props.history.push('/user/dashboard');
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
    } else {
      db.er = true;
      db.msg = errorMessage;
      this.setState({ db });
    }
    console.log(error);
    });
  }
  }

  addAdmin=()=>{
    const { db } = this.state;
    
    if (db.passwordConfirmation !== db.password) {
      
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(db.email, db.password).then((result)=>{
    var user = result.user;
    console.log(db.username,db.email,db.mobileno)
    axios.post('http://localhost:8080/addUser',{uid:user.uid,username:db.username,age:db.age,mobileno:db.mobileno,email:db.email}).then(
      (res)=>{
        console.log(res.data)
    })
    console.log("email signup",user.displayName,user.email,user.uid);
    db.activeItem = "Home"
    this.setState({db})
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
    } else {
      db.er = true;
      db.msg = errorMessage;
      this.setState({ db });
    }
    console.log(error);
    });
  }
  }


  forgot = () => {
    firebase.auth().sendPasswordResetEmail(this.state.db.email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
        alert(e)
      })
  }

  edit_profile = () =>{
    const {db} = this.state;
    db.username = db.user.username;
    db.age = db.user.age;
    db.mobileno = db.user.mobileno;
    db.email = db.user.email;
    this.setState({db})
    this.props.history.push('/user/editprofile');
  }

  handleChange = (e, { name }) => {
    const { db } = this.state;
    db[name] = e.target.value
    this.setState({ db })
    console.log(this.state.db[name])
  }

  submitfeeds = ()=>{
    const {db} = this.state;
    console.log("submitfeeds")
    console.log(db)
    axios.post('http://localhost:8080/feedback',{uid:db.user.uid,username:db.user.username,comment:db.comment}).then(
      (res)=>{
        console.log(res.data)
        db.comment = ""
        db.activeItem = "Home"
        this.setState({ db: db })
    })
    axios.get('http://localhost:8080/feeds')
      .then(res => {
      const {db} = this.state;
      db.feedbacks= res.data;
      console.log(db)
      this.setState({ db});
    })
  }

  handleItemClick = (e, name) => {
    console.log(e)
    const db = this.state.db;
    db.activeItem = name
    this.setState({ db })
    console.log("handeledclick")
  }

  calcsumary = () =>{
    console.log("calcsummary")
    axios.get('http://localhost:8080/sumary')
      .then(res => {
      const {db} = this.state;
      db.monthsales= res.data.sum;
      db.monthsalescoffee = res.data.coffee;
      db.monthsalestea = res.data.tea;
      db.monthsaleswater = res.data.water;
      console.log(db)
      this.setState({ db});
    })
    axios.get('http://localhost:8080/sumarydays')
      .then(res => {
      const {db} = this.state;
      db.daysales= res.data.sum;
      db.daysalescoffee = res.data.coffee;
      db.daysalestea = res.data.tea;
      db.daysaleswater = res.data.water;
      console.log(db)
      this.setState({ db});
    })
  }

  //userlogin = () => {
  //  this.props.history.push('/user/dashboard');
  //}

  //usersignup = () => {
  //  this.props.history.push('/user/dashboard');
  //}

  placeorder = (price, name) => {
    let db = this.state.db;
    db.orderItem.date = Date().toString();
    db.orderItem.item.quantity = db.quantity;
    db.orderItem.item.price = price;
    db.orderItem.item.name = name;
    db.orderItem.totalprice = price * db.quantity;
    this.setState({ db });
    this.props.history.push('/user/payment');
  }

  updateprofile = () => {
    const {db} = this.state
    axios.put('http://localhost:8080/user/Edit',{_id:db.user._id,username:db.username,age:db.age,mobileno:db.mobileno,email:db.email}).then(
      (res)=>{
        console.log(res.data)
        db.user = res.data
        db.user.password = "******"
        this.setState({ db: db })
    })
    this.props.history.push('/user/dashboard')
  }

  userdashboard = () => {
    this.props.history.push('/user/dashboard')
  }

  handlequantity = (e,{value}) => {
    let db = this.state.db;
    console.log(value)
    db.quantity = value;
    this.setState({ db });
  }

  payment = () => {
    let db = this.state.db;
    db.payment = true
    db.orderItem.uid = db.user.uid
    
    console.log(db)
    axios.post('http://localhost:8080/payment',{data:"tok_1FlpT8BSB3liGtsaHXMbWYnO",amount:db.orderItem.totalprice}).then(
      (res)=>{
        console.log("hiii hello how are you")
        console.log(res.data)
        db.orderItem.code = res.data.code
        this.setState({ db })
        axios.post('http://localhost:8080/Order',{pastorder:db.orderItem}).then(
      (res)=>{
        console.log("hiii hello how are you")
        console.log(res.data)
    })
    })
    
    this.props.history.push('/user/orderplaced');
    db.pastorder.push(db.orderItem);
    this.setState({ db })
  }

  statevar = () => {
    let db = this.state.db;
    db.payment = false;
    this.setState({ db })
  }

  pay = () => {
    this.props.history.push('/payment');
  }

  render() {
    return <div>
      <Segment color='teal' raised>
        <Header as='h1' textAlign='center' color='teal'>
          Liquid Vending Machine

          <Header floated='right'>
          {(this.state.db.isUser) ? <Button onClick={this.logout}>SignOut</Button> : <Link to='/signup'><Button>SignUp</Button></Link>}

          </Header>
        </Header>
      </Segment>
      <br />
      <br />

      <Switch>
  <Route exact path="/" render={props =>!this.state.db.isUser ? (<LogIn {...props} userlogin={this.userLogIn} handlechange={this.handleChange}/>)  : this.state.db.isAdmin ? (<Redirect to='/admin/dashboard'/>) : (<Redirect to='/user/dashboard'/>)} />
        <Route exact path="/signup" render={props => <SignUp {...props} usersignup={this.addUser} handlechange={this.handleChange}/>} />
        <Route path='/forgot_password' render={props => <ForgotPass forgot={this.forgot} handlechange = {this.handleChange}></ForgotPass>}/>
        <Route exact path='/user/dashboard' render={props => <Dashboard {...props} submitfeeds={this.submitfeeds}  handlechange={this.handleChange} handleItemClick={this.handleItemClick} db={this.state.db} placeorder={this.placeorder} handlequantity={this.handlequantity} profileedit = {this.edit_profile}/>} />
        <Route exact path="/user/payment" render={props => <Payment {...props} db={this.state.db} pay={this.pay} statevar={this.statevar} />} />
        <Route exact path="/user/editprofile" render={props => <EditProfile {...props} db={this.state.db} updateprofile={this.updateprofile} handlechange={this.handleChange}></EditProfile>} />
        <Route exact path="/user/orderplaced" render={props => <PlacedOrder {...props} db={this.state.db} />} />
        <Route exact path='/payment' render={props =><Card db={this.state.db} handlechange={this.handleChange} payment={this.payment}/>}></Route>
        {this.state.db.isAdmin && <Route exact path='/admin/dashboard' render={props => <DashboardAdmin {...props} handleItemClick={this.handleItemClick} db={this.state.db} placeorder={this.placeorder} usersignup={this.addAdmin} userdashboard={this.userdashboard} profileedit = {this.edit_profile} handlechange={this.handleChange} calcsumary={this.calcsumary}/>} />}
      </Switch>
      {/*} <LogIn/>          
      <SignUp/>
      <Dashboard handleItemClick={this.handleItemClick} db={this.state.db}/>
      <Payment db={this.state.db} pay={this.pay} />
      <EditProfile/>
  <PlacedOrder db={this.state.db}/>*/}
      {/*<FlipCard>
          <div>
            <Header textAlign='center'>Log In for Order</Header>
          </div>
          <div>Login Form</div>
      </FlipCard>*/}
    </div>
  }
}

/*class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <div>Hello</div>
  }
}*/
export default withRouter(App);
