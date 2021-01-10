import React, { Component, Fragment } from 'react'
import { Form, Input, Button } from '@alifd/next'
import _ from 'lodash'
import Dialog from './Dialog'
import { Consumer } from '../index'

const FormItem = Form.Item

export default class ThirdItem extends Component {

    constructor(props) {
        super(props)
        // 获取所有的可编辑数据
        let valueList = this.props.dataSource.map(el => el.head)
        this.state = {
            // 是否开启编辑
            isEdit: [],
            // 编辑value集合
            valueAll: valueList,
            // dialog
            dialog: null
        }
    }

    /**
     * @todo 点击编辑
     * @param {判断点击哪个编辑框} index 
     */
    handleEdit(index) {
        // 其余置空，点击置true显示
        let a = []
        a[index] = true
        this.setState({
            isEdit: a
        })
    }

    /**
         * @todo 确认
         * @param {改变后的值} value 
         * @param {判断改变哪个编辑框} index 
         */
    handleChange(value, index) {
        // 更改对应的value
        let valueItem = this.state.valueAll
        valueItem.splice(index, 1, value)
        this.setState({
            valueAll: valueItem,
        })
    }

    /**
     * @todo 确认
     * @param {判断点击哪个编辑框} value 
     * @param {判断点击哪个编辑框} index 
     * @param {获取参数回调} fun 
     */
    handleOk(value, index, fun) {
        // 拼接返回参数
        let obj = { ...value, value: this.state.valueAll[index] }
        // 执行回调参数并传参
        fun(obj)
        this.setState({
            isEdit: []
        })
    }

    // 取消
    handleCancel() {
        // 获取所有的可编辑数据
        let valueList = this.props.dataSource.map(el => el.head)
        this.setState({
            // 取消编辑
            isEdit: [],
            // 数据恢复原形态
            valueAll: valueList
        })
    }

    // 新增
    handleAdd() {
        this.state.dialog.setState({ visible: true })
    }

    // 获取dialog
    getThis(indexThis) {
        this.setState({ dialog: indexThis })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps.dataSource)
    }

    render() {
        const { isEdit, valueAll } = this.state
        const { dataSource, num, data } = this.props

        return (
            <Consumer>
                {
                    value => <div className="third-item" id="third-item">
                        {
                            dataSource.map((item, index) => {
                                const { id, brand, head } = item
                                return <div
                                    className={`every-item every-item-svg-${num}`}
                                    key={id}
                                >
                                    <Form
                                        className="form-box"
                                    >
                                        <FormItem
                                            label="&nbsp;任务Id: "
                                            className="form-item-flex"
                                        >
                                            <span title={id}>{id}</span>
                                        </FormItem>
                                        <FormItem
                                            label="&nbsp;&nbsp;&nbsp;&nbsp;品牌: "
                                            className="form-item-flex"
                                        >
                                            <span title={brand}>{brand}</span>
                                        </FormItem>
                                        <FormItem
                                            label="负责人: "
                                            className="form-item-flex"
                                        >
                                            {
                                                isEdit[index] ?
                                                    <Fragment>
                                                        <Input
                                                            autoFocus
                                                            className="span-input"
                                                            value={valueAll[index]}
                                                            onChange={(value) => this.handleChange(value, index)}
                                                        /><br />
                                                        <a
                                                            className="a-style"
                                                            href="#!"
                                                            onClick={this.handleOk.bind(this, { id, brand }, index, value.getEditParams)}
                                                        >确认</a>
                                                        <a
                                                            className="a-style"
                                                            href="#!"
                                                            onClick={this.handleCancel.bind(this)}
                                                        >取消</a>
                                                    </Fragment>
                                                    :
                                                    <span
                                                        title={head}
                                                        onClick={this.handleEdit.bind(this, index)}
                                                    >{head}</span>
                                            }
                                        </FormItem>
                                    </Form>
                                </div>
                            })
                        }
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                size="large"
                                type="primary"
                                onClick={this.handleAdd.bind(this)}
                            >新增</Button>
                            <Dialog
                                getThis={this.getThis.bind(this)}
                                data={data}
                            />
                        </div>
                    </div>
                }
            </Consumer>
        )
    }
}
