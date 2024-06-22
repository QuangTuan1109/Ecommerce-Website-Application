import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './chatbotComponent.scss';// Replace with your actual path

class ChatbotComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userInput: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ userInput: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { userInput, messages } = this.state;

        if (userInput.trim()) {
            const userMessage = { text: userInput, sender: 'user' };
            this.setState({ messages: [...messages, userMessage], userInput: '' });

            try {
                const response = await axios.post('http://localhost:5000/api/v1/dialogflow', { message: userInput });
                const botMessage = { text: response.data.reply, sender: 'bot' };
                this.setState({ messages: [...messages, userMessage, botMessage] });
            } catch (error) {
                console.error('Error sending message:', error);
                const errorMessage = { text: 'Error communicating with the chatbot', sender: 'bot' };
                this.setState({ messages: [...messages, userMessage, errorMessage] });
            }
        }
    }

    render() {
        const { messages, userInput } = this.state;

        return (
            <div className="chatbot-container">
                <div className="chat-window">
                    <div className="chat-header">
                        <h2>Shopspace Chatbot</h2>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <div className="message-text">{msg.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={this.handleInputChange}
                                placeholder="Send message"
                            />
                            <button type="submit">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="#ffffff"
                                >
                                    <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatbotComponent);
