import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from '../../../../../axios';
import moment from 'moment';
import './AllProductContent.scss';

class AllProductContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '', // Trạng thái lưu trữ nội dung tìm kiếm
            showPopup: false, // Trạng thái hiển thị popup
            selectedCategory: null, // Trạng thái lưu trữ ngành hàng đã chọn
            currentPage: 0, // Trang hiện tại
            productsPerPage: 10, // Số sản phẩm trên mỗi trang
            products: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken) {
                    const sellerID = decodedToken.sub;
                    axios.get(`http://localhost:5000/api/v1/products/${sellerID}/all-products`)
                        .then(response => {
                            this.setState({ products: response.data });
                        })
                        .catch(error => {
                            console.error('Error fetching products:', error);
                        });
                } else {
                    console.error('Failed to decode access token.');
                }
            } catch (error) {
                console.error('Error decoding access token:', error);
            }
        } else {
            console.error('Access token not found.');
        }
    }

    handlePageClick = ({ selected }) => {
        this.setState({ currentPage: selected });
    };


    // Hàm xử lý thay đổi nội dung tìm kiếm
    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    // Hàm xử lý hiển thị/ẩn popup
    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });
    }

    // Hàm xử lý chọn ngành hàng
    handleCategorySelect = (category) => {
        this.setState({ selectedCategory: category });
        this.togglePopup(); // Ẩn popup sau khi chọn
    }

    render() {
        const { searchQuery, showPopup, products, currentPage, productsPerPage } = this.state;

        // Tính chỉ số của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
        const indexOfLastProduct = (currentPage + 1) * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
        
        return (
            <div className="section-content">
                <div className="section-header">
                    {/* Ô tìm kiếm */}
                    <div className="search-box">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            placeholder="Search..."
                        />
                        {/* Các biểu tượng, nút tìm kiếm, lọc... */}
                    </div>
                    {/* Ô click hiện popup */}
                    <div className="category-select">
                        <button onClick={this.togglePopup}>Select Category</button>
                        {showPopup && (
                            <div className="popup">
                                {/* Nội dung của popup */}
                                {/* Ví dụ: danh sách ngành hàng để chọn */}
                                <ul>
                                    <li onClick={() => this.handleCategorySelect('Category1')}>Category 1</li>
                                    <li onClick={() => this.handleCategorySelect('Category2')}>Category 2</li>
                                    {/* Thêm các mục ngành hàng khác nếu cần */}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Các button áp dụng và nhập lại */}
                    <div className="action-buttons">
                        <button>Apply</button>
                        <button>Reset</button>
                    </div>
                </div>
                <div className="section-body">
                    {products.length > 0 ? (
                        <>
                            <h4>{products.length} Products</h4>
                            <label>Listing Limit: 1000</label>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Variation</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Content Quality</th>
                                        <th>Created Date</th>
                                        <th>Updated Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.Name}</td>
                                            <td>{product.Category}</td>
                                            <td>
                                                {product.Classify ? (
                                                    product.Classify.Options.map((option, optionIndex) => (
                                                        <tr key={`${index}_${optionIndex}`}>
                                                            {option.Value2 ? (
                                                                <>
                                                                    <td>{option.Value1}</td>
                                                                    <td>{option.Value2}</td>
                                                                </>
                                                            ) : (
                                                                <td colSpan={2}>{option.Value1}</td>
                                                            )}
                                                        </tr>
                                                    ))
                                                ): (<p>N/A</p>)}
                                            </td>
                                            <td colSpan={1}>
                                            {product.Classify ? (

                                                product.Classify.Options.map((option, optionIndex) => (
                                                    <tr key={`${index}_${optionIndex}`}>
                                                        <td>{option.Price}</td>
                                                    </tr>
                                                ))
                                            ): (
                                                <tr>
                                                    <td>{product.Price}</td>
                                                </tr>
                                            )}
                                            </td>
                                            <td colSpan={1}>
                                            {product.Classify ? (
                                                product.Classify.Options.map((option, optionIndex) => (
                                                    <tr key={`${index}_${optionIndex}`}>
                                                        <td>{option.Stock}</td>
                                                    </tr>
                                                ))
                                            ): (
                                                <tr>
                                                    <td>{product.Quantity}</td>
                                                </tr>
                                            )}
                                            </td>
                                            <td>{product.ContentQuality}</td>
                                            <td>{moment(product.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                            <td>{moment(product.updatedAt).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                            <td><Link to={`/detail-product-seller/${product._id}`} className="action-link">Detail</Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className="no-products">There are no products listed for sale yet.</div>
                    )}
                    <ReactPaginate
                        pageCount={Math.ceil(products.length / productsPerPage)}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                        breakLabel={'...'}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.seller.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductContent);
