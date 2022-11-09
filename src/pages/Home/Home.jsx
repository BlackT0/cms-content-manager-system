import {Card, Breadcrumb} from 'antd';
import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts";
import Ajax from '../../components/util/Ajax'

function Home() {
    const tabList = [
        {tab: '周访问量', key: 'week'},
        {tab: '月访问量', key: 'month'},
        {tab: '年访问量', key: 'year'},
    ]

    const echartsRef = useRef(null);

    useEffect(() => {
        Ajax.get('/data/week').then(data => {
            const myChart = echarts.init(echartsRef.current);
            myChart.setOption(data.data);
        })
    }, [])

    const tabChange = (e) => {
        Ajax.get('/data/' + e).then(data => {
            const myChart = echarts.init(echartsRef.current);
            myChart.setOption(data.data);
        })
    }

    return (
        <Card className='card-content'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="#">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="#">数据统计</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className='card-box' tabList={tabList} onTabChange={tabChange}>
                <div ref={echartsRef} style={{margin: '80px auto', width: '1000px', height: '600px'}}>
                </div>
            </Card>
        </Card>
    )
}

export default Home;