import React from 'react';
import { Header, Form, Segment, Message, Label, Button, Grid } from 'semantic-ui-react';
import './App.css';
import {
    withRouter, Link
} from 'react-router-dom'

function Card({ db, handlechange, payment }) {

    return <Grid centered stackable >
        <Grid.Column width={6}>
            <Header as="h2" color="blue" textAlign="center">
                Card Detail
            </Header>
            <Header as="h4" color="blue" textAlign="center">
                Amount :- {db.orderItem.totalprice}
            </Header>
            <Segment stacked>
                <Form size="large" onSubmit={() => payment()}>

                    <Form.Field required>
                        <label>Card Holder Name</label>
                        <Form.Input required fluid name="cardname" placeholder="Name" type="text" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Card NO.</label>
                        <Form.Input required fluid name="cardno" placeholder="Card no" type="text" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Expiry Date (MMYY)</label>
                        <Form.Input required fluid name="cardexpire" placeholder="Card Expiry Date" type="text" onChange={handlechange}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>CVV</label>
                        <Form.Input required fluid name="cardcvv" placeholder="CVV" type="Number" min={100} max={999} onChange={handlechange}/>
                    </Form.Field>
                    <Form.Button type='submit' color="blue" fluid size="medium">Pay</Form.Button>
                    <Message
                        error
                        header='Action Forbidden'
                    />

                </Form>
            </Segment>
        </Grid.Column>
    </Grid>

}

export default withRouter(Card);