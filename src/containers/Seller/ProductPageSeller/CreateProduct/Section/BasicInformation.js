import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BasicInformation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone';
import { faCamera, faEdit, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../../axios';


/**
 * Component for managing basic information of a product.
 * Allows users to add images, videos, product name, category, and description.
 */
class BasicInformation extends Component {
    /**
    * Constructor method for initializing state.
    * @param {object} props - The props passed to the component.
    */
    constructor(props) {
        super(props);
        // Initialize component state
        this.state = {
            // State for storing image data
            images: [],
            // State for toggling edit mode for images
            editMode: false,
            loading: true,
            activeImageIndex: null,
            // State for storing video data
            video: null,
            // State for storing product name
            productName: '',
            // State for error message related to product name
            error: '',
            // State for toggling category selection popup
            showCategoryPopup: false,
            // State for storing selected category
            selectedCategory: '',
            // State for storing all categories
            categories: [],
            // State for storing product description
            description: '',
            // State for error message related to product description
            errDescription: '',
            // State for storing categories at level
            categoriesLevel2: [],
            categoriesLevel3: [],
            categoriesLevel4: [],
            // State for storing selected category by level
            selectedCategoriesLevel1: null,
            selectedCategoriesLevel2: null,
            selectedCategoriesLevel3: null,
            selectedCategoriesLevel4: null,
            // State for disabling/enabling the confirm button
            disableConfirmButton: true,
            // State for storing final selected categories
            selectedCategories: null,
        };
    }

    /**
     * Fetches categories from the server.
     */
    fetchCategories = async () => {
        try {
            /* Make GET request to fetch categories 
             * Then, update component state with fetched categories
            */
            const response = await axios.get('http://localhost:5000/api/v1/products/categories');
            this.setState({ categories: response.data, loading: false });
        } catch (error) {
            /* Log error if fetching categories fails 
             * Update loading state to indicate loading has finished
            */
            console.error('Error fetching categories:', error);
            this.setState({ loading: false });
        }
    }

    /*
     * Lifecycle method called after component mounts.
     * Calls fetchCategories method to load categories.
     */
    componentDidMount() {
        this.fetchCategories();
    }

    /**
     * Handles adding an image to the image list.
     * @param {Event} e - The event object.
     */
    handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const { images } = this.state;
                if (images.length < 9) {
                    this.setState({ images: [...images, reader.result] });
                }
            }
        }
    }

    /**
     * Handles hovering over an image item in the image list.
     * @param {number} index - The index of the hovered image.
     */
    handleImageHover = (index) => {
        this.setState({ activeImageIndex: index });
    }

    /**
     * Activates edit mode for the image.
     */
    handleEditImage = () => {
        this.setState({ editMode: true });
    }

    /**
     * Deletes the currently active image from the image list.
     */
    handleDeleteImage = () => {
        const { images, activeImageIndex } = this.state;
        images.splice(activeImageIndex, 1);
        this.setState({ images, activeImageIndex: null, editMode: false });
    }

    /**
     * Handles adding a video file to the video section.
     * @param {Array<File>} acceptedFiles - Array of accepted video files.
     */
    handleAddVideo = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (this.state.video) {
            this.setState({ error: 'Only one video can be uploaded.' });
        } else {
            const videoUrl = URL.createObjectURL(file);
            this.setState({ video: videoUrl, error: '' });
        }
    };

    /**
     * Deletes the currently uploaded video.
     */
    handleDeleteVideo = () => {
        this.setState({ video: null });
    };

    /**
     * Handles changes to the product name input field.
     * @param {Event} e - The event object.
     */
    handleChangeProductName = (e) => {
        const { value } = e.target;
        const error = value.length < 10 ? 'Tên sản phẩm phải có ít nhất 10 ký tự.' : '';
        this.setState({ productName: value, error });
    }

    /**
     * Toggles the visibility of the category selection popup.
     */
    toggleCategoryPopup = () => {
        this.setState(prevState => ({
            showCategoryPopup: !prevState.showCategoryPopup,
        }));
    };

    /**
     * Handles the selection of a category.
     * @param {Object} category - The selected category object.
     */
    handleChangeCategory = (category) => {
        this.setState({ category, showCategoryPopup: false });
    }

    /**
     * Checks if a category has subcategories.
     * @param {string} categoryId - The ID of the category.
     * @returns {boolean} - True if the category has subcategories, false otherwise.
     */
    hasSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/products/categories/${categoryId}`);

            if (response && response.data && response.data.length > 0) {
                const subcategories = response.data;
                return subcategories.length > 0;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            return false;
        }
    }

    /**
     * Handles a category click event.
     * @param {Object} category - The clicked category object.
     * @param {number} level - The level of the category in the hierarchy.
     */
    handleCategoryClick = async (category, level) => {
        try {
            // Clear lower level categories when a higher level category is clicked
            if (level === 1) {
                this.setState({ categoriesLevel2: [], categoriesLevel3: [], categoriesLevel4: [] });
            } else if (level === 2) {
                this.setState({ categoriesLevel3: [], categoriesLevel4: [] });
            } else if (level === 3) {
                this.setState({ categoriesLevel4: [] });
            }

            // Fetch subcategories of the clicked category
            const response = await axios.get(`http://localhost:5000/api/v1/products/categories/${category._id}`);

            // Call hasSubcategories(category) function to check whether the selected category has a category or not to determine the status for the "confirm" button
            const hasSubcategories = await this.hasSubcategories(category._id);
            if (hasSubcategories === true) {
                this.setState({ disableConfirmButton: true });
            } else {
                this.setState({ disableConfirmButton: false });
            }

            // Check if response contains data or not
            if (response && response.data && response.data.length > 0) {
                const subcategories = response.data;

                // Based on the level, update the state corresponding to the list of subcategories and selected categories at that level
                if (level === 1) {
                    this.setState({ categoriesLevel2: subcategories, selectedCategoryLevel1: category });
                } else if (level === 2) {
                    this.setState({ categoriesLevel3: subcategories, selectedCategoryLevel2: category });
                } else if (level === 3) {
                    this.setState({ categoriesLevel4: subcategories, selectedCategoryLevel3: category });
                } else if (level === 4) {
                    this.setState({ selectedCategoryLevel4: category });
                }

            } else {
                if (level === 1) {
                    this.setState({ selectedCategoryLevel1: category });
                } else if (level === 2) {
                    this.setState({ selectedCategoryLevel2: category });
                } else if (level === 3) {
                    this.setState({ selectedCategoryLevel3: category });
                } else if (level === 4) {
                    this.setState({ selectedCategoryLevel4: category });
                }
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }

    /**
     * Checks if a category is selected.
     * @param {Object} category - The category to check.
     * @param {number} level - The level of the category in the hierarchy.
     * @returns {boolean} - True if the category is selected, false otherwise.
     */

    isSelected = (category, level) => {
        // Kiểm tra xem danh mục có được chọn không dựa trên cấp độ của nó và id của danh mục
        if (level === 1) {
            return this.state.selectedCategoryLevel1 && this.state.selectedCategoryLevel1._id === category._id;
        } else if (level === 2) {
            return this.state.selectedCategoryLevel2 && this.state.selectedCategoryLevel2._id === category._id;
        } else if (level === 3) {
            return this.state.selectedCategoryLevel3 && this.state.selectedCategoryLevel3._id === category._id;
        } else if (level === 4) {
            return this.state.selectedCategoryLevel4 && this.state.selectedCategoryLevel4._id === category._id;
        }
    }

    /**
     * Renders the list of categories for a given level.
     * @param {Array} categories - The array of categories to render.
     * @param {number} level - The level of the categories in the hierarchy.
     * @returns {JSX.Element} - The JSX element representing the list of categories.
     */
    renderCategories = (categories, level) => {
        //console.log('showArrow:', this.state.showArrow);
        return categories.map(category => (
            <div
                key={category._id}
                className={`category-item ${this.isSelected(category, level) ? 'selected' : ''}`}
                onClick={() => this.handleCategoryClick(category, level)}
            >
                {category.Name}
            </div>
        ));
    }

    /**
     * Handles the confirmation of category selection.
     */
    handleConfirm = () => {
        const selectedCategories = this.state.selectedCategoryLevel4 || this.state.selectedCategoryLevel3 || this.state.selectedCategoryLevel2 || this.state.selectedCategoryLevel1;

        let selectedLevelsString = '';

        // Check and append the selected levels to the string
        if (this.state.selectedCategoryLevel1) selectedLevelsString += this.state.selectedCategoryLevel1.Name;
        if (this.state.selectedCategoryLevel2) selectedLevelsString += ` > ${this.state.selectedCategoryLevel2.Name}`;
        if (this.state.selectedCategoryLevel3) selectedLevelsString += ` > ${this.state.selectedCategoryLevel3.Name}`;
        if (this.state.selectedCategoryLevel4) selectedLevelsString += ` > ${this.state.selectedCategoryLevel4.Name}`;

        // Update the category state and close the category selection popup
        this.setState({ category: selectedLevelsString, showCategoryPopup: false, selectedCategories });
        this.props.onCategorySelect(selectedCategories);
    }

    /**
     * Handles the change event of the description input.
     * @param {Object} e - The event object.
     */
    handleDescriptionChange = (e) => {
        const { value } = e.target;
        const errDescription = value.length < 1000 ? 'Mô tả sản phẩm phải có ít nhất 1000 ký tự.' : '';
        this.setState({ description: value, errDescription });
    };

    /**
     * Renders the BasicInformation component.
     * @returns {JSX.Element} - The JSX element representing the BasicInformation component.
     */
    render() {
        const { images, editMode, activeImageIndex, video, error, productName, showCategoryPopup,
            category, description, errDescription, categories, categoriesLevel2, categoriesLevel3, categoriesLevel4 } = this.state;

        return (
            <div className='container'>
                {/* Basic Information Header */}
                <h2>Thông tin cơ bản</h2>
                {/* Image Section */}
                <div className="image-section">
                    <h3><span className="required-star">*</span> Hình ảnh sản phẩm</h3>
                    <label htmlFor="image-upload" className="image-upload">
                        <FontAwesomeIcon icon={faCamera} />
                        <span>Thêm hình ảnh</span>
                        <input type="file" id="image-upload" accept="image/*" onChange={this.handleAddImage} />
                    </label>
                    <p>{`${images.length}/9`}</p>
                    <div className="image-list">
                        {/* Display uploaded images */}
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="image-item"
                                onMouseEnter={() => this.handleImageHover(index)}
                                onMouseLeave={() => this.handleImageHover(null)}
                            >
                                <img src={image} alt={`Product ${index + 1}`} />
                                {(activeImageIndex === index && !editMode) && (
                                    <div className="image-overlay">
                                        <FontAwesomeIcon icon={faEdit} onClick={this.handleEditImage} />
                                        <FontAwesomeIcon icon={faTrash} onClick={this.handleDeleteImage} />
                                    </div>
                                )}
                                {(activeImageIndex === index && editMode) && (
                                    <div className="edit-options">
                                        {/* Display save button in edit mode */}
                                        <button onClick={this.handleSaveEdit}>Lưu</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Video Section */}
                <div className="video-section">
                    {/* Video header */}
                    <h3><span className="required-star">*</span> <span>Video sản phẩm</span></h3>
                    {/* Display uploaded video or upload video dropzone */}
                    {video ? (
                        <div className="uploaded-video">
                            <video controls>
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            {/* Display delete and edit buttons */}
                            <div className="video-actions">
                                <button onClick={this.handleDeleteVideo}><FontAwesomeIcon icon={faTrash} /> Xóa Video</button>
                                <button onClick={this.handleEditVideo}><FontAwesomeIcon icon={faEdit} /> Sửa Video</button>
                            </div>
                        </div>
                    ) : (
                        <Dropzone onDrop={this.handleAddVideo} accept="video/mp4" maxFiles={1}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="video-upload">
                                    <input {...getInputProps()} />
                                    <FontAwesomeIcon icon={faCamera} />
                                    <span>Kéo thả video vào đây hoặc click để chọn video</span>
                                </div>
                            )}
                        </Dropzone>
                    )}
                    {/* Video notes */}
                    <div className="video-notes">
                        <p>Vui lòng tải lên một video giới thiệu ngắn về sản phẩm của bạn.</p>
                        <p>Video sẽ giúp khách hàng hiểu rõ hơn về sản phẩm của bạn.</p>
                        <p>Lưu ý: Chỉ được phép tải lên 1 video.</p>
                    </div>
                </div>
                {/* Product Name Section */}
                <div className="product-name-section">
                    {/* Product name header */}
                    <h3><span className="required-star">*</span> Tên sản phẩm</h3>
                    <div className="input-wrapper">
                        {/* Product name input field */}
                        <input
                            type="text"
                            value={productName}
                            onChange={this.handleChangeProductName}
                            placeholder="Nhập tên sản phẩm"
                            maxLength={120}
                        />
                        <p>{productName.length}/120</p>
                    </div>
                    {/* Error message for product name */}
                    {error && <p className="error">{error}</p>}
                </div>
                {/* Category Section */}
                <div className="category-section">
                    {/* Category header */}
                    <h3><span className="required-star">*</span> Ngành hàng</h3>
                    <div className="input-wrapper">
                        {/* Category input field */}
                        <input
                            type="text"
                            value={category}
                            placeholder="Chọn ngành hàng"
                            onFocus={this.toggleCategoryPopup}
                            readOnly
                        />
                        <span>
                            <FontAwesomeIcon icon={faPen} onClick={this.toggleCategoryPopup} className="edit-icon" />
                        </span>
                    </div>
                </div>
                {/* Category Popup */}
                {showCategoryPopup && (
                    <div className="category-popup">
                        {/* Popup header */}
                        <div className="popup-header">
                            <h3>Ngành Hàng</h3>
                            <span className="close-icon" onClick={this.toggleCategoryPopup}>×</span>
                        </div>
                        {/* Popup content */}
                        <div className="popup-content">
                            {/* Search container */}
                            <div className="search-container">
                                <input type="text" placeholder="Vui lòng nhập ít nhất 1 ký tự" onChange={this.handleSearch} />
                                <span className="search-icon">🔍</span>
                            </div>
                            {/* Category sections */}
                            <div className="categories">
                                {/* Level 1 categories */}
                                <div className="category-section">
                                    <div className="category-list">
                                        {/* Render level 1 categories */}
                                        {categories.map(category => (
                                            <div
                                                key={category._id}
                                                className={`category-item ${this.isSelected(category, 1) ? 'selected' : ''}`}
                                                onClick={() => this.handleCategoryClick(category, 1)}
                                            >
                                                {category.Name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Level 2 categories */}
                                <div className="category-section">
                                    <div className="category-list">
                                        {/* Render level 2 categories */}
                                        {this.renderCategories(categoriesLevel2, 2)}
                                    </div>
                                </div>
                                {/* Level 3 categories */}
                                <div className="category-section">
                                    <div className="category-list">
                                        {/* Render level 3 categories */}
                                        {this.renderCategories(categoriesLevel3, 3)}
                                    </div>
                                </div>
                                {/* Level 4 categories */}
                                <div className="category-section">
                                    <div className="category-list">
                                        {/* Render level 4 categories */}
                                        {this.renderCategories(categoriesLevel4, 4)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Popup footer */}
                        <div className="popup-footer">
                            <div className="selected-category">
                                {/* Display selected categories */}
                                Ngành hàng đã chọn:
                                <span>
                                    {this.state.selectedCategoryLevel1 && <span>{this.state.selectedCategoryLevel1.Name} </span>}
                                    {this.state.selectedCategoryLevel2 && <span> {'>'}{this.state.selectedCategoryLevel2.Name} </span>}
                                    {this.state.selectedCategoryLevel3 && <span> {'>'}{this.state.selectedCategoryLevel3.Name} </span>}
                                    {this.state.selectedCategoryLevel4 && <span> {'>'}{this.state.selectedCategoryLevel4.Name}</span>}
                                </span>
                            </div>
                            <div className="action-buttons">
                                {/* Cancel and confirm buttons */}
                                <button onClick={this.handleCancel} >Hủy</button>
                                <button onClick={this.handleConfirm} disabled={this.state.disableConfirmButton}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Description Section */}
                <div className="description-section">
                    {/* Description header */}
                    <h3><span className="required-star">*</span> Mô tả sản phẩm</h3>
                    <div className="input-wrapper">
                        {/* Description input field */}
                        <textarea
                            className="description-input"
                            placeholder="Nhập mô tả sản phẩm (tối đa 3000 ký tự)"
                            maxLength={3000}
                            onChange={this.handleDescriptionChange}
                        />
                        <p className="character-count">{description.length}/3000</p>
                    </div>
                    {/* Error message for product description */}
                    {errDescription && <p className="errDescription">{errDescription}</p>}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation);
