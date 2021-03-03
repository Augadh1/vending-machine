import React from 'react';
import {Card,Image,Button,Grid,Dropdown,Header,Menu,Segment,List,Label,Rating,Form,TextArea} from 'semantic-ui-react';
//import './App.css';
import coffee from './coffee.jpg';
import tee from './Tee.jpg';
import water from './water.jpeg';
//import quiz from './quiz.png'

function PlacedOrder({db}){
    return <Grid centered stackable>
        <Grid.Column width={6}>
        <Segment>
            <h1>Order has been Successfully Placed</h1>
            <br/>
            <Label>Order details</Label>
            <Segment>
            <div><label>Order Date &emsp; : &emsp;</label>{db.orderItem.date}</div>
            <br/>
            <label>Item Details &emsp;&nbsp;&nbsp;&nbsp; : &emsp;</label>
            <div><label>Item Name &emsp;&nbsp;&nbsp;&nbsp;&nbsp; : &emsp;</label>{db.orderItem.item.name}</div>
            <div><label>Item Quantity &emsp; : &emsp;</label>{db.orderItem.item.quantity}</div>
            <div><label>Per item price &emsp; : &emsp;</label>{db.orderItem.item.price}</div>
            <br/>
            <br/>
            <div style={{fontSize: 24}}><label>Total price &emsp; : &emsp;</label>{db.orderItem.totalprice}</div>
            <br/>
            <br/>
            <div><label>Your generated code is &emsp; : &emsp;</label>{db.orderItem.code}</div>
            </Segment>
            </Segment></Grid.Column>
    </Grid>
}

export default PlacedOrder;