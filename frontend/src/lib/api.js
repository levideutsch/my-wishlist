const API_URL = ''

/**
 * Make an API call
 * @param {string} url 
 * @param {RequestInit} request options
 * @returns {Promise<any>} async promise with result
 */
export default function api(url, request) {
    return fetch(API_URL + url, request)
}
