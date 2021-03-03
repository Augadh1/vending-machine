import React from 'react';
import {Header,Form,Segment,Button,Message,Grid} from 'semantic-ui-react';
import './App.css';
//import { Route, Link, BrowserRouter as Router,withRouter } from 'react-router-dom';
    
function SignUp({usersignup, handlechange}) {

        return <div>
            <Grid centered stackable >
                <Grid.Column width={6}>
            <Header as="h2" color="blue" textAlign="center">
                Register For Order
            </Header>
            <Form size="large" onSubmit={()=>usersignup()}>
                <Segment stacked>
                    <Form.Field required>
                        <label>UserName</label>
                        <Form.Input required fluid name="username" icon="user" iconPosition="left"
                            placeholder="Username" type="text" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                    <label>Email Address</label>
                        <Form.Input required fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email" type="email" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                    <label>Password</label>
                        <Form.Input required fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" type="password" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                    <label>Confirm Password</label>
                        <Form.Input required fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                            placeholder="Password Confirmation" type="password" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                    <label>Age</label>
                        <Form.Input required fluid name="age"
                            placeholder="age" type="number" min={1} onChange={handlechange}/>
                    </Form.Field>
                    <Form.Group grouped>
                        <label>Liquid most liked by You</label>
                        <Form.Field label='Coffee' control='input' type='checkbox' />
                        <Form.Field label='Tee' control='input' type='checkbox' />
                    </Form.Group>
                    <Form.Field required>
                    <label>Mobile No</label>
                        <Form.Input required fluid name="mobileno" icon="mobile" iconPosition="left"
                            placeholder="Mobile No." type="number" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Button type='submit' color="blue" fluid size="large" >SignUp</Form.Button>
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


export default SignUp;