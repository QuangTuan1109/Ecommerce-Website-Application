import axios from '../axios';

/**
 * Handles key press event to allow only numerical input for weight and dimensions.
 * @param {Object} e - Event object.
 */
export const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
    }
};

/**
 * Calculates shipping fee based on weight, dimensions, and delivery methods.
 */
export const calculateShippingFee = (weight, width, length, height, deliveryMethods) => {
    let calculatedWeight = Math.ceil(weight / 1000);
    const shippingFees = [];
    let exceedLimits = {};
    let methodToggles = {};
    let selectedMethods = [];

    deliveryMethods.forEach(method => {
        const { weightLimit, sizeLimit, deliveryFees } = method;
        let methodShippingFee = null;
        let exceedLimit = false;

        if (calculatedWeight > weightLimit || width > sizeLimit.width || length > sizeLimit.length || height > sizeLimit.height) {
            exceedLimit = true;
        } else {
            exceedLimit = false;
        }
        if (width !== '' && length !== '' && height !== '') {
            if (width && length && height &&
                width <= sizeLimit.width && length <= sizeLimit.length && height <= sizeLimit.height) {
                const dimensionalWeight = (width * length * height) / 6000;
                calculatedWeight = Math.max(dimensionalWeight, calculatedWeight);
            }
        }

        if (Math.ceil(calculatedWeight) && Math.ceil(calculatedWeight) <= weightLimit) {
            for (let limit in deliveryFees) {
                if (Math.ceil(calculatedWeight) === parseFloat(limit)) {
                    methodShippingFee = deliveryFees[limit];
                    break;
                }
            }
        }
        shippingFees.push(methodShippingFee);
        exceedLimits[method.deliveryMethod] = exceedLimit;

        // Remove method if it's selected and exceed limit
        if (exceedLimit && methodToggles[method.deliveryMethod]) {
            methodToggles[method.deliveryMethod] = false;
            selectedMethods = selectedMethods.filter(selectedMethod => selectedMethod.name !== method.deliveryMethod);
        }
    });
    return { shippingFees, exceedLimits, selectedMethods, methodToggles };
}

/**
 * Handles image upload event.
 * @param {Object} e - Event object.
 * @param {Function} callback - Callback function to handle uploaded images.
 * @param {Function} errorCallback - Callback function to handle errors.
 */
export const handleImageUpload = async (e, callback, errorCallback) => {
    const acceptedFiles = Array.from(e.target.files);

    try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('Image', file);
        });

        const response = await axios.post('http://localhost:5000/api/v1/products/upload-image', formData, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
            },
        });

        if (response.data && response.data) {
            const imageUrls = response.data;
            callback(imageUrls);
        } else {
            console.error('Error uploading images');
            errorCallback('Error uploading images.');
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        errorCallback('Error uploading images.');
    }
};

/**
 * Handles deletion of an image or video.
 * @param {string} path - The storage path of the file to delete.
 * @param {Function} setStateCallback - Callback function to update component state after deletion.
 * @param {string} endpoint - The API endpoint for deleting the file.
 */
export const handleFileDelete = async (path, setStateCallback, endpoint) => {
    try {
        // Send request to delete the file
        await axios.delete(`http://localhost:5000/api/v1/products/${endpoint}/${path}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        });
        
        // Update component state after successful deletion
        setStateCallback(null);
    } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
    }
};

export const formatCurrency = (price) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return VND.format(price)
}

export const handleAvatarUpload = async (e, callback, errorCallback) => {
    const acceptedFiles = Array.from(e.target.files);

    try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('Image', file);
        });

        const response = await axios.post('http://localhost:5000/api/v1/upload-avt', formData);

        if (response.data && response.data) {
            const imageUrls = response.data;
            callback(imageUrls);
        } else {
            console.error('Error uploading images');
            errorCallback('Error uploading images.');
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        errorCallback('Error uploading images.');
    }
};

export const handleAvatarDelete = async (path, setStateCallback, endpoint) => {
    try {
        // Send request to delete the file
        await axios.delete(`http://localhost:5000/api/v1/${endpoint}/${path}`);
        
        // Update component state after successful deletion
        setStateCallback(null);
    } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
    }
};
