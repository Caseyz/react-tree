import React, { Component } from 'react'
import { Form, Input, Field } from '@alifd/next'
import Dialog from '@alifd/next/lib/dialog';
import '@alifd/next/lib/button/style';
import '@alifd/next/lib/dialog/style';
import { Consumer } from '../index'

const FormItem = Form.Item
export default class Index extends Component {
    field = new Field(this)
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }


    onOk = (fun) => {
        const { data } = this.props
        fun({
            data,
            ...this.field.getValues()
        })
        this.setState({ visible: false })
    }

    onOpen = () => {
        this.setState({
            visible: true
        });
    }

    onClose = reason => {
        this.setState({
            visible: false
        });
    }

    componentDidMount() {
        this.props.getThis(this)
    }

    render() {
        const { visible } = this.state
        const init = this.field.init

        return (
            <Consumer>
                {
                    value => <Dialog
                        title="新增操作"
                        visible={visible}
                        style={{
                            width: 400
                        }}
                        onOk={this.onOk.bind(this, value.getAdd)}
                        onCancel={this.onClose.bind(this, 'cancelClick')}
                        onClose={this.onClose}>
                        <Form style={{ marginLeft: '5%' }}>
                            <FormItem label="任务Id:" className="form-item-flex-dialog">
                                <Input {...init('id')} placeholder="请填写..." />
                            </FormItem>
                            <FormItem label="&nbsp;&nbsp;&nbsp;品牌:" className="form-item-flex-dialog">
                                <Input {...init('brand')} placeholder="请填写..." />
                            </FormItem>
                            <FormItem label="负责人:" className="form-item-flex-dialog">
                                <Input {...init('head')} placeholder="请填写..." />
                            </FormItem>
                        </Form>
                    </Dialog>
                }
            </Consumer>
        );
    }
}
