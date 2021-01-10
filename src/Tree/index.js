import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SecondaryItem from './components/SecondaryItem'

import './index.css'

export const { Provider, Consumer } = React.createContext({})
export default class Index extends Component {

    static defaultProps = {
        height: '100%',
        dataSource: {},
        getEditParams: () => { },
        getAdd: () => { }
    }

    constructor(props) {
        super(props)
        this.state = {
            // 是否显示svg
            svgDisplay: false
        }

        // svg
        this.svgDiv = null
    }

    componentDidMount() {
        // 获取总高度
        const { height } = document.querySelector('#main-id').getBoundingClientRect()
        // svg-box设置为总高度
        document.querySelector('#svg-box').style.height = `${height}px`
        // 获取一级相对父级的参数
        const { left } = document.querySelector('#first-item-id').getBoundingClientRect()
        const Top = document.querySelector('#first-item-id').offsetTop
        const seltWidth = document.querySelector('#first-item-id').offsetWidth
        const seltHeight = document.querySelector('#first-item-id').offsetHeight
        let x = seltWidth + left
        let y = seltHeight / 2 + Top

        // 二级
        // itemList_2 二级左边的坐标
        let itemList_2 = []
        // 统计二级的数量
        let item_2_num = []
        // 二级box
        const { left: secondaryLeft } = document.querySelector('#secondary-item').getBoundingClientRect()
        document.querySelectorAll('.every-item-svg').forEach((dom, index) => {
            // 统计二级的数量
            item_2_num.push(index)
            const Top = dom.offsetTop
            let y1 = dom.offsetHeight / 2 + Top
            itemList_2.push({ x: secondaryLeft, y: y1 })
        })

        // 三级
        // 二级 和 三级的item width的(背景为除一级外，二三级保持一致)
        let item_width = document.querySelectorAll('.every-item-svg')[0].offsetWidth
        // 二级右边的坐标
        let itemList_right_2 = itemList_2.map(el => {
            return {
                x: el.x + item_width,
                y: el.y
            }
        })
        // 获取三级并设置坐标
        let itemList_3 = []
        // 三级box
        const { left: thirdLeft } = document.querySelector('#third-item').getBoundingClientRect()
        item_2_num.forEach(sub => {
            itemList_3[sub] = []
            document.querySelectorAll(`.every-item-svg-${sub}`).forEach(dom => {
                const Top = dom.offsetTop
                let y2 = dom.offsetHeight / 2 + Top
                itemList_3[sub].push({ x: thirdLeft, y: y2 })
            })
        })

        this.svgDiv =
            <Fragment>
                <svg width="100%" height="100%">
                    {
                        // 渲染一二级之间的svg
                        itemList_2.map((item, index) => (
                            <path
                                key={index}
                                d={`M${x} ${y}L${item.x} ${item.y}`}
                                stroke="red"
                                style={{ strokeWidth: 1 }}
                            ></path>
                        ))
                    }
                    {
                        // 渲染二三级之间的svg
                        itemList_right_2.map((item_2, index_2) => (
                            itemList_3[index_2].map((item_3, index_3) => {
                                return <path
                                    key={`${index_2}-${index_3}`}
                                    d={`M${item_2.x} ${item_2.y}L${item_3.x} ${item_3.y}`}
                                    stroke="red"
                                    style={{ strokeWidth: 1 }}
                                ></path>
                            })
                        ))
                    }
                </svg>
            </Fragment >
        this.setState({ svgDisplay: true })
    }

    render() {
        const { svgDisplay } = this.state
        const { height, dataSource, getEditParams, getAdd } = this.props
        console.log(dataSource, 'dataSource')
        return (
            <Provider value={{ getEditParams, getAdd }}>
                <div style={{
                    overflow: 'auto',
                    height
                }}>
                    <div
                        id="main-id"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        {/* 一级 */}
                        <div className="first-item">
                            {/* 一级显示内容 */}
                            <div
                                id="first-item-id"
                            >
                                {dataSource.title}
                            </div>
                        </div>
                        {/* 二级 */}
                        <SecondaryItem dataSource={dataSource} />
                        <div
                            id="svg-box"
                        >
                            {
                                svgDisplay && this.svgDiv
                            }
                        </div>
                    </div >
                </div>
            </Provider>
        )
    }
}

Index.propTypes = {
    // 最外层style
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    // 数据源
    dataSource: PropTypes.object.isRequired,
    // 获取编辑的参数的函数
    getEditParams: PropTypes.func,
    // 获取新增参数的函数
    getAdd: PropTypes.func
}