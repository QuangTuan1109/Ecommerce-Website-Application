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
 * @param {Function} callback - Callback function to handle uploaded image.
 */
export const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            callback(reader.result);
        };
    }
};

