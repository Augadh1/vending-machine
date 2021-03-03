import React from 'react';
import { Header, Form, Segment, Message, Label, Button, Grid } from 'semantic-ui-react';
import './App.css';
import {
    withRouter, Link
} from 'react-router-dom'

function LogIn({ userlogin , handlechange}) {

    return <Grid centered stackable >
        <Grid.Column width={6}>
            <Header as="h2" color="blue" textAlign="center">
                SignIn For Order
            </Header>
            <Segment stacked>
                <Form size="large" onSubmit={() => userlogin()}>

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
                    <Form.Field>
                        <Link to='/forgot_password'><Label as='a' style={{ float: 'right', color: 'blue' }}>Forgot Password ?</Label></Link>
                    </Form.Field>
                    <Form.Button type='submit' color="blue" fluid size="medium">SignIn</Form.Button>
                    <Message
                        error
                        header='Action Forbidden'
                    />

                </Form>
                <Header textAlign="center">OR</Header>
                <Link to="/user/dashboard"><Button fluid color="blue" size="medium">Skip</Button></Link>
            </Segment>
        </Grid.Column>
    </Grid>

}

export default withRouter(LogIn);