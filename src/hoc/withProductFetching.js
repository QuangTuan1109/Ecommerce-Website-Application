import React from 'react';
import axios from '../axios';

const withProductFetching = (WrappedComponent) => {
    class WithProductFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                products: [],
                category: [],
                value: 'all prices',
                page: 1,
                hasMore: true,
            };
        }

        componentDidMount() {
            this.fetchAllSubCategory();
            this.fetchProductByCategory();
            window.addEventListener('scroll', this.handleScroll);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
        }

        fetchProductByCategory = () => {
            const { id } = this.props.match.params;
            const { page } = this.state;

            axios.get(`http://localhost:5000/api/v1/products/${id}?page=${page}&limit=20`)
                .then(response => {
                    const newProducts = response.products;
                    const hasMore = newProducts.length > 0;
                    this.setState(prevState => ({
                        products: [...prevState.products, ...newProducts],
                        hasMore,
                        page: prevState.page + 1
                    }));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchAllSubCategory = () => {
            const { id } = this.props.match.params;
            axios.get(`http://localhost:5000/api/v1/products/categories/subcategories/${id}`)
                .then(response => {
                    this.setState({ category: response.data });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        handleClick = (categoryId) => {
            axios.get(`http://localhost:5000/api/v1/products/${categoryId}?page=1&limit=20`)
                .then(response => {
                    if (response) {
                        this.setState({
                            products: response.products,
                            page: 1,
                            hasMore: true
                        });
                    } else {
                        this.setState({ products: [] });
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && this.state.hasMore) {
                this.fetchProductByCategory();
            }
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    products={this.state.products}
                    category={this.state.category}
                    value={this.state.value}
                    handleClick={this.handleClick}
                />
            );
        }
    }

    return WithProductFetching;
};

export default withProductFetching;
