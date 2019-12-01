/**
 * Convert JSON object to form-data format
 * @param object
 * @returns {FormData}
 */
export const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());
