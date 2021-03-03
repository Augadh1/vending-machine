import React from 'react';
import { Card, Image, Button, Grid, Dropdown, Header, Menu, Segment, List, Label, Rating, Form, TextArea } from 'semantic-ui-react';
//import './App.css';
import coffee from './coffee.jpg';
import tee from './Tee.jpg';
import water from './water.jpeg';
import {
  withRouter, Link
} from 'react-router-dom'
import AddUser from './addadmin.js'
//import quiz from './quiz.png'

function DashboardAdmin({ handleItemClick, db, placeorder, usersignup, userdashboard, profileedit, handlechange, calcsumary }) {
  //extra = <Button color="blue" size="large">Start Quiz</Button>
  const activeItem = db.activeItem;
  calcsumary();
  //console.log(()=>handleItemClick("name","bio"))
  const feedbacks = db.feedbacks.map((item, index) => {
    return <List.Item><Segment>
      <div>
        <Label>UserName</Label>&emsp;{item.username}
      </div>
      <br />
      <div>
        <Label>Comment</Label><Segment><div>{item.comment}</div></Segment>
      </div>
    </Segment></List.Item>
  })

  return <Grid>
    <Grid.Column width={4}>
      <Menu fluid vertical tabular >
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={(e) => handleItemClick(e, 'Home')}
        />
        <Menu.Item
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={(e) => handleItemClick(e, 'Profile')}
        />
        <Menu.Item
          name='User Feedbacks'
          active={activeItem === 'User Feedbacks'}
          onClick={(e) => handleItemClick(e, 'User Feedbacks')}
        />
        <Menu.Item
          name='Register'
          active={activeItem === 'Register'}
          onClick={(e) => handleItemClick(e, "Register")}
        />
      </Menu>
    </Grid.Column>

    <Grid.Column stretched width={12}>
      <Segment>
        {db.activeItem == "Home" && <Grid columns={2}>
          <Grid.Column style={{ marginTop: 200 }}>
            <Button fluid primary onClick={() => { userdashboard() }}>Order / Generate unique code</Button>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <h1>Summary of orders</h1>
              <h3>Total sales in month: <span style={{ float: "right", marginRight: 40 }}>{db.monthsales}</span></h3>
              <h3>Total sales in day: <span style={{ float: "right", marginRight: 40 }}>{db.daysales}</span></h3>
              <h3>Total sales in month (Coffee): <span style={{ float: "right", marginRight: 40 }}>{db.monthsalescoffee}</span></h3>
              <h3>Total sales in month (Tea): <span style={{ float: "right", marginRight: 40 }}>{db.monthsalestea}</span></h3>
              <h3>Total sales in month (Water): <span style={{ float: "right", marginRight: 40 }}>{db.monthsaleswater}</span></h3>
              <h3>Total sales in day (Coffee): <span style={{ float: "right", marginRight: 40 }}>{db.daysalescoffee}</span></h3>
              <h3>Total sales in day (Tea): <span style={{ float: "right", marginRight: 40 }}>{db.daysalestea}</span></h3>
              <h3>Total sales in day (Water): <span style={{ float: "right", marginRight: 40 }}>{db.daysaleswater}</span></h3>
            </Segment>
          </Grid.Column>
        </Grid>}
        {db.activeItem == "Profile" && <Segment><List divided selection>
          <br />
          <List.Item>
            <br />
            <Label horizontal>
              UserName
      </Label>
            <span style={{ float: "right", marginRight: 40 }}>{db.user.username}</span>
          </List.Item>
          <br />
          <List.Item>
            <br />
            <Label horizontal>
              Email Address
      </Label>
            <span style={{ float: "right", marginRight: 40 }}>{db.user.email}</span>
          </List.Item>
          <br />
          <List.Item>
            <br />
            <Label horizontal>
              Password
      </Label>
            <span style={{ float: "right", marginRight: 40 }}>{db.user.password}</span>
          </List.Item>
          <br />
          <List.Item>
            <br />
            <Label horizontal>Age</Label>
            <span style={{ float: "right", marginRight: 40 }}>{db.user.age}</span>
          </List.Item>
          <br />
          <List.Item>
            <br />
            <Label horizontal>Mobile No.</Label>
            <span style={{ float: "right", marginRight: 40 }}>{db.user.mobileno}</span>
          </List.Item>
          <br />
          <List.Item>
            <br />
            <Button floated='right' onClick={()=>profileedit()}>Edit Profile</Button>
          </List.Item>

        </List></Segment>}
        {db.activeItem == "User Feedbacks" && <Segment><List divided relaxed>
          {feedbacks}
        </List></Segment>}
        {db.activeItem == "Register" && <AddUser usersignup={usersignup} handlechange={handlechange}/>}
      </Segment>
    </Grid.Column>
  </Grid>
}

export default withRouter(DashboardAdmin);