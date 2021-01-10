import React, { Component, Fragment } from 'react'
import { Form, Input } from '@alifd/next'
import { Consumer } from '../index'
import ThirdItem from './ThirdItem'

const FormItem = Form.Item

export default class SecondaryItem extends Component {

    constructor(props) {
        super(props)
        // 获取所有的可编辑数据
        let valueList = this.props.dataSource.children.map(el => el.data.head)
        this.state = {
            // 是否开启编辑
            isEdit: [],
            // 编辑value集合
            valueAll: valueList
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
        let valueList = this.props.dataSource.children.map(el => el.data.head)
        this.setState({
            // 取消编辑
            isEdit: [],
            // 数据恢复原形态
            valueAll: valueList
        })
    }

    render() {
        const { isEdit, valueAll } = this.state
        const { dataSource } = this.props
        return (
            <Consumer>
                {
                    value => <div className="secondary-item" id="secondary-item">
                        {
                            dataSource.children.map((item, index) => {
                                const { data: { id, category, head }, children } = item
                                return <div
                                    className="secondary-item-box"
                                    key={id}
                                >
                                    <div
                                        className="every-item every-item-svg"
                                        style={{
                                            alignSelf: 'center'
                                        }}
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
                                                label="&nbsp;&nbsp;&nbsp;&nbsp;类目: "
                                                className="form-item-flex"
                                            >
                                                <span title={category}>{category}</span>
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
                                                                onClick={this.handleOk.bind(this, { id, category }, index, value.getEditParams)}
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
                                    {/* 三级 */}
                                    <ThirdItem
                                        dataSource={children}
                                        num={index}
                                        data={item.data}
                                    />
                                </div>
                            })
                        }
                    </div>
                }
            </Consumer>
        )
    }
}
