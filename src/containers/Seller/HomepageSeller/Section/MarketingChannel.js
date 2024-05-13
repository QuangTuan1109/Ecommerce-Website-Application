import React, { Component } from 'react';
import './MarketingChannel.scss';
import Calender from '../../../../assets/images/calendar.jpg'

class MarketingChannel extends Component {
    constructor(props) {
        super(props);
        this.selectedDateRef = React.createRef();
        this.state = {
            selectedTab: 'Lịch',
            today: new Date(),
            selectedDate: null,
            discountPrograms: [
                { name: 'Chương Trình Giảm Giá 1', voucher: 'ABC123', date: '2024-04-16', registrationDeadline: '2024-03-14' },
                { name: 'Chương Trình Giảm Giá 2', voucher: 'DEF456', date: '2024-04-17', registrationDeadline: '2024-03-18' },
                { name: 'Chương Trình Giảm Giá 3', voucher: 'GHI789', date: '2024-04-17', registrationDeadline: '2024-04-16' },
                { name: 'Chương Trình Giảm Giá 2', voucher: 'DEF456', date: '2024-04-17', registrationDeadline: '2024-03-18' },
                { name: 'Chương Trình Giảm Giá 3', voucher: 'GHI789', date: '2024-04-17', registrationDeadline: '2024-04-16' },
            ],
            highlightedDate: null,
            visibleDays: 7,
            daysPerScroll: 7,
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            daysInMonth: null,
            programsByDate: {},
            scrollPosition: 0
        };
    }

    componentDidMount() {
        this.updateCalendar();
        let selectedDate = this.selectToday();
        if (!selectedDate) {
            selectedDate = this.formatDate(new Date());
        }
        this.setState({ selectedDate }, () => {
            this.updateSelectedPrograms();
        });
    }


    updateSelectedPrograms = () => {
        const { selectedDate, programsByDate } = this.state;
        const selectedPrograms = programsByDate[selectedDate] || []; // Lấy chương trình giảm giá của ngày được chọn
        this.setState({ selectedPrograms });
        console.log(selectedPrograms)
    };

    selectToday = () => {
        const { today, currentMonth, currentYear } = this.state;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const formattedToday = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        if (today.getDate() <= daysInMonth) {
            return formattedToday;
        }
        return null;
    };

    updateCalendar = () => {
        const { currentMonth, currentYear, discountPrograms, selectedDate } = this.state;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const programsByDate = {};

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i).toLocaleDateString('en-CA');
            programsByDate[date] = discountPrograms.filter(program => program.date === date);
        }

        if (selectedDate) {
            const dd = String(selectedDate).padStart(2, '0');
            const mm = String(currentMonth + 1).padStart(2, '0');
            const yyyy = currentYear;
            const formattedDate = `${yyyy}-${mm}-${dd}`;
            const isValidDate = !isNaN(new Date(formattedDate).getTime()); // Kiểm tra xem ngày có hợp lệ không
            if (isValidDate) {
                this.setState({ highlightedDate: formattedDate });
            }
        } else {
            this.highlightToday();
        }

        this.setState({
            daysInMonth,
            programsByDate
        });
    };

    highlightToday = () => {
        const { today } = this.state;
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        this.setState({ highlightedDate: formattedToday });
    };

    goToPreviousMonth = () => {
        this.setState(prevState => ({
            currentMonth: prevState.currentMonth === 0 ? 11 : prevState.currentMonth - 1,
            currentYear: prevState.currentMonth === 0 ? prevState.currentYear - 1 : prevState.currentYear
        }), this.updateCalendar);
    };

    goToNextMonth = () => {
        this.setState(prevState => ({
            currentMonth: prevState.currentMonth === 11 ? 0 : prevState.currentMonth + 1,
            currentYear: prevState.currentMonth === 11 ? prevState.currentYear + 1 : prevState.currentYear
        }), this.updateCalendar);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleTabClick = tab => {
        this.setState({ selectedTab: tab });
    };

    formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    handleDateClick = date => {
        const { currentYear, currentMonth } = this.state;
        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

        const dateContainers = document.querySelectorAll('.date-label');
        if (dateContainers) {
            dateContainers.forEach(container => {
                if (container.textContent.trim() === formattedDate) {
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        this.setState({ selectedDate: formattedDate, highlightedDate: formattedDate });
    };

    renderCalendar = () => {
        const { today, selectedDate, discountPrograms, currentMonth, currentYear, daysInMonth, programsByDate, highlightedDate } = this.state;
        const programsForSelectedDate = programsByDate[selectedDate] || [];

        return (
            <div className="calendar">
                <div className="calendar-header-container">
                <div className="calendar-header">
                    <button onClick={this.goToPreviousMonth}>&lt;</button>
                    <div>{`${currentMonth + 1}/${currentYear}`}</div>
                    <button onClick={this.goToNextMonth}>&gt;</button>
                </div>
                <img className="calendar-image" src={Calender} alt="Calendar" />
                </div>
                <div className="left-pane">
                    <div className="date-list">
                        {[...Array(daysInMonth).keys()].map(day => {
                            const date = day + 1;
                            const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                            return (
                                <div
                                    ref={selectedDate === formattedDate ? this.selectedDateRef : null}
                                    key={day}
                                    className={`date ${selectedDate === formattedDate ? 'selected' : ''} ${formattedDate === highlightedDate ? 'highlighted' : ''} ${formattedDate === this.formatDate(today) ? 'today' : ''}`}
                                    onClick={() => this.handleDateClick(date)}
                                >
                                    {date}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="right-pane">
                    <div className="discount-programs">
                        {programsForSelectedDate.length > 0 ? (
                            <div className="program-list">
                                {programsForSelectedDate.map((program, index) => (
                                    <div key={index} className="discount-program">
                                        <div className="program-info">
                                            <h4>{program.name}</h4>
                                            <p>Mã voucher: {program.voucher}</p>
                                            <p>Thời gian diễn ra: {program.date}</p>
                                            <p>Thời gian đăng ký: {program.registrationDeadline}</p>
                                        </div>
                                        <div className="button-container">
                                            {new Date(program.registrationDeadline) >= today ? (
                                                <button>Đăng ký</button>
                                            ) : (
                                                <button>Chi tiết</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-program">
                                Không có chương trình nào trong ngày {selectedDate}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        );
    };

    render() {
        const { selectedTab, discountPrograms } = this.state;

        return (
            <div className="marketing-section">
                <div className="main-title">Kênh Marketing</div>
                <div className="sub-title">Công cụ Marketing & Đăng ký chương trình Khuyến Mãi</div>
                <div className="tab-header">
                    <div
                        className={`tab ${selectedTab === 'Lịch' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('Lịch')}
                    >
                        Lịch
                    </div>
                    <div
                        className={`tab ${selectedTab === 'Chương Trình Giảm Giá Sản Phẩm' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('Chương Trình Giảm Giá Sản Phẩm')}
                    >
                        Chương Trình Giảm Giá Sản Phẩm
                    </div>
                    <div
                        className={`tab ${selectedTab === 'Chương Trình Mã Giảm Giá' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('Chương Trình Mã Giảm Giá')}
                    >
                        Chương Trình Mã Giảm Giá
                    </div>
                    <div
                        className={`tab ${selectedTab === 'Live' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('Live')}
                    >
                        Live
                    </div>
                </div>
                <div className="tab-content">
                    {selectedTab === 'Lịch' && <div>{this.renderCalendar()}</div>}
                    {selectedTab === 'Chương Trình Giảm Giá Sản Phẩm' && (
                        <div className="content">
                            <h2>Chương Trình Giảm Giá Sản Phẩm</h2>
                            {/* Add content for this tab here */}
                        </div>
                    )}
                    {selectedTab === 'Chương Trình Mã Giảm Giá' && (
                        <div className="content">
                            <h2>Chương Trình Mã Giảm Giá</h2>
                            {/* Add content for this tab here */}
                        </div>
                    )}
                    {selectedTab === 'Live' && (
                        <div className="content">
                            <h2>Live</h2>
                            {/* Add content for this tab here */}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default MarketingChannel;
