import React from 'react';
import { Card, Image, Button, Grid, Dropdown, Header, Menu, Segment, Form, Message } from 'semantic-ui-react';
//import './App.css';
import {
    withRouter, Link
} from 'react-router-dom'
import coffee from './coffee.jpg';
import tee from './Tee.jpg';
import water from './water.jpeg';
//import quiz from './quiz.png'

function EditProfile({ db, updateprofile , handlechange}) {
    return <div>
        <Grid centered stackable >
            <Grid.Column width={6}>
                <Header as="h2" color="blue" textAlign="center">
                    Edit Your Profile
    </Header>
                <Form size="large" onSubmit={() => updateprofile()}>
                    <Segment stacked>
                        <Form.Field required>
                            <label>UserName</label>
                            <Form.Input required fluid name="username" icon="user" iconPosition="left"
                                placeholder="Username" type="text" value={db.username} onChange={handlechange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Email Address</label>
                            <Form.Input required fluid name="email" icon="mail" iconPosition="left"
                                placeholder="Email" type="email" disabled value={db.email}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Age</label>
                            <Form.Input required fluid name="age"
                                placeholder="age" type="number" min={1} value={db.age} onChange={handlechange}/>
                        </Form.Field>
                        <Form.Group grouped>
                            <label>Liquid most liked by You</label>
                            <Form.Field label='Coffee' control='input' type='checkbox' />
                            <Form.Field label='Tee' control='input' type='checkbox' />
                        </Form.Group>
                        <Form.Field required>
                            <label>Mobile No</label>
                            <Form.Input required fluid name="mobileno" icon="mobile" iconPosition="left"
                                placeholder="Mobile No." type="number" value={db.mobileno} onChange={handlechange}/>
                        </Form.Field>
                        <Form.Button type='submit' color="blue" fluid size="large" >Submit</Form.Button>
                        <Message
                            error
                            header='Action Forbidden'

                        />
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </div>
}

export default withRouter(EditProfile);