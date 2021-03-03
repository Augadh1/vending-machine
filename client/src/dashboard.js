import React from 'react';
import { Card, Image, Button, Grid, Dropdown, Header, Menu, Segment, List, Label, Rating, Form, TextArea } from 'semantic-ui-react';
//import './App.css';
import coffee from './coffee.jpg';
import tee from './Tee.jpg';
import water from './water.jpeg';
import {
  withRouter, Link
} from 'react-router-dom'
//import quiz from './quiz.png'

function Dashboard({ handleItemClick, db, placeorder, handlequantity ,profileedit, handlechange, submitfeeds}) {
  //extra = <Button color="blue" size="large">Start Quiz</Button>
  const noOptions = [
    {
      key: 1,
      text: 1,
      value: 1
    },
    {
      key: 2,
      text: 2,
      value: 2
    },
    {
      key: 3,
      text: 3,
      value: 3
    },
    {
      key: 4,
      text: 4,
      value: 4
    },
    {
      key: 5,
      text: 5,
      value: 5
    },
    {
      key: 6,
      text: 6,
      value: 6
    },
  ]
  const activeItem = db.activeItem;
  //console.log(()=>handleItemClick("name","bio"))
  const pastorder = db.pastorder.map((item, index) => {
    return <List.Item><Segment>
      <div>
        <Label>Date</Label>&emsp;{item.date}
      </div>
      <br />
      <div>
        <Label>Order Detail</Label><Segment><div><Label>Item Name</Label>&emsp;{item.item.name}&emsp;&emsp;<Label>Quantity</Label>&emsp;{item.item.quantity}&emsp;&emsp;<Label>Price per item</Label>&emsp;{item.item.price}&emsp;&emsp;<Label>status</Label>&emsp;{item.status}</div></Segment>
      </div>
      <div><Label>Total Price</Label>&emsp;{item.totalprice}</div>
      <div><Label>Code</Label>&emsp;{item.code}</div>
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
          name='Past Order'
          active={activeItem === 'Past Order'}
          onClick={(e) => handleItemClick(e, 'Past Order')}
        />
        <Menu.Item
          name='Feedback'
          active={activeItem === 'Feedback'}
          onClick={(e) => handleItemClick(e, "Feedback")}
        />
      </Menu>
    </Grid.Column>

    <Grid.Column stretched width={12}>
      <Segment>
        {db.activeItem == "Home" && <Grid columns={3}>
          <Grid.Column>
            <Card color='teal' raised centered>
              <Image src={coffee} wrapped fluid ui={false} />
              <Card.Content>
                <Card.Header textAlign='center'>Order Coffee</Card.Header>
                <Card.Meta textAlign='center'>
                  <br />
                  <span className='date'><Header as='h5'>Amount per unit :-  10rs</Header></span>
                </Card.Meta>

                <Card.Description>
                  <Dropdown
                    placeholder='Quantity'
                    fluid
                    selection
                    options={noOptions}
                    onChange={handlequantity}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra textAlign='center'>
                <Button color="blue" onClick={() => placeorder(10, "Coffee")}>Confirm</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card color='teal' raised centered>
              <Image src={tee} wrapped fluid ui={false} />
              <Card.Content>
                <Card.Header textAlign='center'>Order Tea</Card.Header>
                <Card.Meta textAlign='center'>
                  <br></br>
                  <span className='date'><Header as='h5'>Amount per unit :- 5rs</Header></span>
                </Card.Meta>

                <Card.Description>
                  <Dropdown
                    placeholder='Quantity'
                    fluid
                    selection
                    options={noOptions}
                    onChange={handlequantity}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra textAlign='center'>
                <Button color="blue" onClick={() => placeorder(5, "Tea")}>Confirm</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card color='teal' raised centered>
              <Image src={water} wrapped fluid ui={false} />
              <Card.Content>
                <Card.Header textAlign='center'>Order Water</Card.Header>
                <Card.Meta textAlign='center'>
                  <br />
                  <span className='date'><Header as='h5'>Amount per liter :- 15rs</Header></span>
                </Card.Meta>

                <Card.Description>
                  <Dropdown
                    placeholder='Quantity'
                    fluid
                    selection
                    options={noOptions}
                    onChange={handlequantity}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra textAlign='center'>
                <Button color="blue" onClick={() => placeorder(15, "Water")}>Confirm</Button>
              </Card.Content>
            </Card>
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
            <span style={{ float: "right", marginRight: 40 }}>{db.user.email}}</span>
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
        {db.activeItem == "Past Order" && <Segment><List divided relaxed>
          {pastorder}
        </List></Segment>}
        {db.activeItem == "Feedback" && <div><h1>Rating :</h1><Rating maxRating={5} icon='star' size='massive' />
          <h3>Tell us more about your experience :</h3>
          <Form>
            <TextArea placeholder='Tell us more' name="comment" style={{ minHeight: 100 }} onChange={handlechange}/>
            <Form.Button type="submit" onClick={()=>submitfeeds()}>Submit</Form.Button>
          </Form>
        </div>}
      </Segment>
    </Grid.Column>
  </Grid>
}

export default withRouter(Dashboard);