module.exports.convertToASCII = (str) => {
    // Normalize the string and remove diacritics
    let normalizedStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace specific characters
    normalizedStr = normalizedStr.replace(/đ/g, 'd').replace(/Đ/g, 'D');

    // Replace spaces with hyphens and convert to lowercase
    return normalizedStr.toLowerCase().replace(/\s+/g, '-');
};
