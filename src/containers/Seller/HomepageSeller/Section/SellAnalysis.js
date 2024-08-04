import React, { Component } from 'react';
import { connect } from 'react-redux';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import 'react-vis/dist/style.css';
import './SellAnalysis.scss';
import axios from '../../../../axios';

class SellAnalysis extends Component {
    state = {
        chartData: [],
        legend: [
            { color: "#1f77b4", label: "Today" },
            { color: "#d62728", label: "Yesterday" }
        ],
        chartTitles: ["Revenue", "Orders", "Access times", "View"],
        chartXValues1: ["01:00", "06:00", "12:00", "18:00", "00:00"],
        currentChartIndex: 0,
        yDomain: [0, 5000000],
        todayRevenue: null, // Initialize to null or a placeholder value
        todayOrders: null, // Initialize to null or a placeholder value
        yesterdayRevenue: 0,
        yesterdayOrders: 0,
        revenueChangePercent: 0,
        ordersChangePercent: 0
    };

    componentDidMount() {
        this.fetchDataSalesHourly();
    }

    fetchDataSalesHourly = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/analys/analyticsSalesPerHour`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            this.formatChartData(response);
        } catch (error) {
            console.log(error);
        }
    };

    formatChartData = (data) => {
        const { monthlyStats } = data;
        if (!monthlyStats || monthlyStats.length === 0) {
            // Handle case where monthlyStats is empty or not available
            console.log("Monthly stats not available or empty");
            return;
        }
    
        const dailyStats = monthlyStats[0].dailyStats;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];
    
        const todayStats = dailyStats.find(stat => stat.date.startsWith(today));
        const yesterdayStats = dailyStats.find(stat => stat.date.startsWith(yesterday));
    
        const getHourlyData = (stats, field) => {
            const hourlyData = Array(24).fill({ x: "", y: 0 }).map((_, i) => ({
                x: `${String(i).padStart(2, '0')}:00`,
                y: 0
            }));
            if (stats) {
                stats.hourlyStats.forEach(hourlyStat => {
                    hourlyData[hourlyStat.hour] = {
                        x: `${String(hourlyStat.hour).padStart(2, '0')}:00`,
                        y: hourlyStat[field]
                    };
                });
            }
            
            return hourlyData;
        };
    
        const chartData = [
            {
                title: "Revenue",
                data1: getHourlyData(todayStats, 'revenue'),
                data2: getHourlyData(yesterdayStats, 'revenue'),
            },
            {
                title: "Orders",
                data1: getHourlyData(todayStats, 'orders'),
                data2: getHourlyData(yesterdayStats, 'orders'),
            }
        ];
    
        const yMax = Math.max(
            ...chartData.flatMap(data => data.data1.map(d => d.y)),
            ...chartData.flatMap(data => data.data2.map(d => d.y))
        );
        const yDomain = [0, Math.ceil(yMax / 1000000) * 1000000];
    
        const todayRevenue = todayStats ? todayStats.hourlyStats.reduce((acc, curr) => acc + curr.revenue, 0) : 0;
        const todayOrders = todayStats ? todayStats.hourlyStats.reduce((acc, curr) => acc + curr.orders, 0) : 0;
        const yesterdayRevenue = yesterdayStats ? yesterdayStats.hourlyStats.reduce((acc, curr) => acc + curr.revenue, 0) : 0;
        const yesterdayOrders = yesterdayStats ? yesterdayStats.hourlyStats.reduce((acc, curr) => acc + curr.orders, 0) : 0;
    
        const revenueChangePercent = yesterdayRevenue !== 0 ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100).toFixed(2) : 0;
        const ordersChangePercent = yesterdayOrders !== 0 ? ((todayOrders - yesterdayOrders) / yesterdayOrders * 100).toFixed(2) : 0;
    
        this.setState({
            chartData,
            yDomain,
            todayRevenue,
            todayOrders,
            yesterdayRevenue,
            yesterdayOrders,
            revenueChangePercent,
            ordersChangePercent
        });
    };
    

    getYAxisTickValues = (title) => {
        if (title === "Revenue") {
            return Array.from({ length: 100 }, (_, i) => 500000 * (i + 1));
        } else if (title === "Orders") {
            return Array.from({ length: 301 }, (_, i) => i * 10).filter(v => v <= 3000);
        }
        return [];
    };

    handleChartChange = (index) => {
        this.setState({ currentChartIndex: index });
    };

    render() {
        const { currentChartIndex, chartData, chartXValues1, legend,
            todayRevenue, todayOrders, revenueChangePercent, ordersChangePercent
         } = this.state;
        const currentChartData = chartData[currentChartIndex] || { data1: [], data2: [] };
        const yAxisTickValues = this.getYAxisTickValues(currentChartData.title);

        return (
            <section className="sell-analysis">
                <div className="header">
                    <h2 className="main-title">{currentChartData.title}</h2>
                    <div className="sub-title">Shop data overview for confirmed orders</div>
                    <div className="current-date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="content">
                    <div className="chart">
                    <XYPlot
                        height={300}
                        width={600}
                        xType="ordinal"
                        margin={{left: 80, right: 10, top: 100, bottom: 40}}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis tickValues={chartXValues1} tickFormat={(v) => v} />
                        <YAxis tickFormat={v => `${v !== null ? v.toLocaleString() : ''}`} tickValues={yAxisTickValues.map(Number)} />
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
                            <div className="value">{todayRevenue !== null ? todayRevenue.toLocaleString() : ''}</div>
                            <div className={`description ${revenueChangePercent >= 0 ? 'positive' : 'negative'}`}>
                                Revenue <span>({revenueChangePercent}%) compared to yesterday</span>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className="value">{todayOrders !== null ? todayOrders.toLocaleString() : ''}</div>
                            <div className={`description ${ordersChangePercent >= 0 ? 'positive' : 'negative'}`}>
                                Orders <span>({ordersChangePercent}%) compared to yesterday</span>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className="value">890</div>
                            <div className="description">Access times <span>compared to yesterday</span> 0.00%</div>
                        </div>
                        <div className="data-item">
                            <div className="value">10%</div>
                            <div className="description">View <span>compared to yesterday</span> 0.00%</div>
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
