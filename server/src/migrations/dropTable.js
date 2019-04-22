/**
 * Function to check if value is empty
 * @param {string} value
 * @param {string} msg
 * @return {(error|bool)} returns error or true
 */
function notEmpty(value, msg) {
    if (value === '') {
        throw new Error(msg);
    }

    return true;
}

export default notEmpty;




const array = [5, 6, 7, 8, 9];