import React from 'react';
import {Header,Form,Segment,Message,Label} from 'semantic-ui-react';

function ForgotPass({forgot,handlechange}){
return <Form onSubmit={()=>forgot()}>
    <Form.Field required>
        <label>Email Address</label>
        <Form.Input required fluid name="email" icon="mail" iconPosition="left"
            placeholder="Email" type="email" onChange={handlechange}/>
    </Form.Field>
    <Form.Button type='submit' color="blue" fluid size="large" >Reset my password</Form.Button>
</Form>
}

export default ForgotPass;