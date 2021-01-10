
import React from 'react'
import { Form, Input, Checkbox } from '@alifd/next';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        fixedSpan: 10
    },
    wrapperCol: {
        span: 14
    }
};

export default class Text extends React.Component {

    handleSubmit = (values) => {
        console.log('Get form value:', values);
    };

    render() {
        return (
            <Form style={{ width: '60%' }} {...formItemLayout} >
                <FormItem label="baseUsername:" style={{ display: 'flex' }}>
                    <p>Fixed Name</p>
                </FormItem>
                <FormItem label="password:">
                    <Input htmlType="password" name="basePass" placeholder="Please Enter Password" />
                </FormItem>
                <FormItem label="Note:" help="something">
                    <Input.TextArea placeholder="something" name="baseRemark" />
                </FormItem>
                <FormItem label="Agreement:">
                    <Checkbox name="baseAgreement" defaultChecked>Agree</Checkbox>
                </FormItem>
                <FormItem label=" ">
                    <Form.Submit onClick={this.handleSubmit}>Confirm</Form.Submit>
                </FormItem>
            </Form>
        );
    }
}