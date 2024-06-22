import React, { Component } from 'react';

const fetchDataHOC = (WrappedComponent, apiCall) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: null
            };
        }

        async componentDidMount() {
            try {
                const response = await apiCall();
                this.setState({ data: response, loading: false });
            } catch (error) {
                this.setState({ error, loading: false });
            }
        }

        render() {
            const { data, loading, error } = this.state;
            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            );
        }
    };
};

export default fetchDataHOC;
