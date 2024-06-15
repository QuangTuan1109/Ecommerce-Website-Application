import React, { Component } from 'react';
import { connect } from 'react-redux';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import 'react-vis/dist/style.css'; 
import './SellAnalysis.scss';
import axios from '../../../../axios'

class SellAnalysis extends Component {
    state = {
        chartData: [
            {
                title: "Lượt Truy cập",
                data1: [
                    { x: "01:00", y: "2" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "7" },
                    { x: "08:00", y: "2" },
                    { x: "09:00", y: "19" },
                    { x: "10:00", y: "3" },
                    { x: "11:00", y: "19" },
                    { x: "12:00", y: "2" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "10" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "3" },
                    { x: "20:00", y: "2" },
                    { x: "21:00", y: "19" },
                    { x: "22:00", y: "3" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "2" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
                data2: [
                    { x: "01:00", y: "2" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "17" },
                    { x: "08:00", y: "25" },
                    { x: "09:00", y: "1" },
                    { x: "10:00", y: "6" },
                    { x: "11:00", y: "9" },
                    { x: "12:00", y: "20" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "49" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "0" },
                    { x: "20:00", y: "5" },
                    { x: "21:00", y: "9" },
                    { x: "22:00", y: "0" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "0" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
            },
            {
                title: "Lượt Xem",
                data1: [
                    { x: "01:00", y: "201" },
                    { x: "02:00", y: "190" },
                    { x: "03:00", y: "382" },
                    { x: "04:00", y: "494" },
                    { x: "05:00", y: "462" },
                    { x: "06:00", y: "501" },
                    { x: "07:00", y: "781" },
                    { x: "08:00", y: "860" },
                    { x: "09:00", y: "1021" },
                    { x: "10:00", y: "1503" },
                    { x: "11:00", y: "1600" },
                    { x: "12:00", y: "2437" },
                    { x: "13:00", y: "2981" },
                    { x: "14:00", y: "2643" },
                    { x: "15:00", y: "2430" },
                    { x: "16:00", y: "2851" },
                    { x: "17:00", y: "3001" },
                    { x: "18:00", y: "2901" },
                    { x: "19:00", y: "3250" },
                    { x: "20:00", y: "2300" },
                    { x: "21:00", y: "1861" },
                    { x: "22:00", y: "1643" },
                    { x: "23:00", y: "1220" },
                    { x: "00:00", y: "876" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
                data2: [
                    { x: "01:00", y: "301" },
                    { x: "02:00", y: "290" },
                    { x: "03:00", y: "582" },
                    { x: "04:00", y: "694" },
                    { x: "05:00", y: "2262" },
                    { x: "06:00", y: "521" },
                    { x: "07:00", y: "751" },
                    { x: "08:00", y: "860" },
                    { x: "09:00", y: "1821" },
                    { x: "10:00", y: "1803" },
                    { x: "11:00", y: "1300" },
                    { x: "12:00", y: "2537" },
                    { x: "13:00", y: "2781" },
                    { x: "14:00", y: "2143" },
                    { x: "15:00", y: "2230" },
                    { x: "16:00", y: "2751" },
                    { x: "17:00", y: "3301" },
                    { x: "18:00", y: "2801" },
                    { x: "19:00", y: "3150" },
                    { x: "20:00", y: "2700" },
                    { x: "21:00", y: "1861" },
                    { x: "22:00", y: "1543" },
                    { x: "23:00", y: "1320" },
                    { x: "00:00", y: "866" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
            },
            {
                title: "Đơn Hàng",
                data1: [
                    { x: "01:00", y: "50" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "7" },
                    { x: "08:00", y: "2" },
                    { x: "09:00", y: "19" },
                    { x: "10:00", y: "3" },
                    { x: "11:00", y: "19" },
                    { x: "12:00", y: "2" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "10" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "3" },
                    { x: "20:00", y: "2" },
                    { x: "21:00", y: "19" },
                    { x: "22:00", y: "3" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "2" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
                data2: [
                    { x: "01:00", y: "2" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "17" },
                    { x: "08:00", y: "25" },
                    { x: "09:00", y: "1" },
                    { x: "10:00", y: "6" },
                    { x: "11:00", y: "9" },
                    { x: "12:00", y: "20" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "49" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "0" },
                    { x: "20:00", y: "5" },
                    { x: "21:00", y: "9" },
                    { x: "22:00", y: "0" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "0" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
            },
            {
                title: "Tỷ Lệ Chuyển Đổi",
                data1: [
                    { x: "01:00", y: "10" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "7" },
                    { x: "08:00", y: "2" },
                    { x: "09:00", y: "19" },
                    { x: "10:00", y: "3" },
                    { x: "11:00", y: "19" },
                    { x: "12:00", y: "2" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "10" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "3" },
                    { x: "20:00", y: "2" },
                    { x: "21:00", y: "19" },
                    { x: "22:00", y: "3" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "2" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),
                data2: [
                    { x: "01:00", y: "2" },
                    { x: "02:00", y: "19" },
                    { x: "03:00", y: "3" },
                    { x: "04:00", y: "49" },
                    { x: "05:00", y: "2" },
                    { x: "06:00", y: "3" },
                    { x: "07:00", y: "17" },
                    { x: "08:00", y: "25" },
                    { x: "09:00", y: "1" },
                    { x: "10:00", y: "6" },
                    { x: "11:00", y: "9" },
                    { x: "12:00", y: "20" },
                    { x: "13:00", y: "3" },
                    { x: "14:00", y: "2" },
                    { x: "15:00", y: "19" },
                    { x: "16:00", y: "3" },
                    { x: "17:00", y: "49" },
                    { x: "18:00", y: "2" },
                    { x: "19:00", y: "0" },
                    { x: "20:00", y: "5" },
                    { x: "21:00", y: "9" },
                    { x: "22:00", y: "0" },
                    { x: "23:00", y: "0" },
                    { x: "00:00", y: "0" },
                ].map(item => ({ x: item.x, y: parseInt(item.y, 10) })),

            }
        ],
        chartTitles: ["Lượt Truy Cập", "Lượt Xem", "Đơn Hàng", "Tỷ Lệ Chuyển Đổi"],
        chartXValues1: ["01:00", "06:00", "12:00", "18:00", "00:00"],
        chartYValues1: 
        [
            "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100",
            "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1500", "2000",
            "2500", "3000",
        ],
        legend: [
            { color: "#1f77b4", label: "Hôm nay" },
            { color: "#d62728", label: "Hôm qua" }
        ],
        currentChartIndex: 0
    };

    componentDidMount() {
        this.fetchDataSalesHourly()
        //this.interval = setInterval(this.fetchDataSalesHourly, 1000);
    }

    fetchDataSalesHourly = async () => {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/analys/analyticsSalesPerHour`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    handleChartChange = (index) => {
        this.setState({ currentChartIndex: index });
    };


    render() {
        const { currentChartIndex, chartData, chartXValues1, chartYValues1, legend } = this.state;
        const currentChartData = chartData[currentChartIndex];

        return (
            <section className="sell-analysis">
                <div className="header">
                    <h2 className="main-title">{currentChartData.title}</h2>
                    <div className="sub-title">Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận</div>
                    <div className="current-date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="content">
                    <div className="chart">
                        <XYPlot height={300} width={600} xType="ordinal">
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis tickValues={chartXValues1} tickFormat={(v) => v} />
                            <YAxis tickValues={chartYValues1.map(Number)}/>
                            <LineSeries data={currentChartData.data1} color="#1f77b4" />
                            <LineSeries data={currentChartData.data2} color="#d62728" />
                        </XYPlot>
                        <div className="chart-controls">
                            {chartData.map((data, index) => (
                                <button key={index} className={`chart-button ${index === currentChartIndex ? 'active' : ''}`} onClick={() => this.handleChartChange(index)}>
                                    {data.title}
                                </button>
                            ))}
                        </div>
                        <div className="legend">
                            {legend.map((item, index) => (
                                <div key={index} style={{ color: item.color }}>{item.label}</div>
                            ))}
                        </div>
                    </div>
                    <div className="data">
                        <div className="data-item">
                            <div className="value">1,234</div>
                            <div className="description">Lượt truy cập <span>so với hôm qua</span> 0.00%</div>
                        </div>
                        <div className="data-item">
                            <div className="value">567</div>
                            <div className="description">Lượt xem <span>so với hôm qua</span> 0.00%</div>
                        </div>
                        <div className="data-item">
                            <div className="value">890</div>
                            <div className="description">Đơn hàng <span>so với hôm qua</span> 0.00%</div>
                        </div>
                        <div className="data-item">
                            <div className="value">10%</div>
                            <div className="description">Tỷ lệ chuyển đổi <span>so với hôm qua</span> 0.00%</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellAnalysis);
