// Utils
import isObject from '../utils/isObject'

export default class ApiProfile {
  constructor(apiKey) {
    this.apiKey = apiKey // Define the apiKey
    this.appUrl = 'localhost:3000' // Define url of the app
    this.apiUrl = 'https://pro.pinch.cleaning' // Url of the API
    this.headerApiKey = { 'pro-pinch-api-key': this.apiKey }  // Define header for the apiKey

    // Define init configuration for resolver cors problem
    this.defaultInit = {
      redirect: "follow",
      referrerPolicy: "no-referrer",
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Headers': "*"
    }
  }

  /**
   * 'GET' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async get(params) {
    const { url, headers, ...paramsObject } = params // Get url from params

    // Fetch to the API for get a response
    const data = await fetch(this.apiUrl + url || '', {
      method: "GET",
      headers: { ...this.headerApiKey, ...headers },
      ...this.defaultInit,
      ...paramsObject
    })

    const dataToJson = await data.json() // Convert data to json
    return dataToJson // Return API response
  }

  /**
   * 'POST' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async post(params) {
    const { url, headers, ...paramsObject } = params // Get url and headers from params

    // Fetch to the API for make a response
    const data = await fetch(this.apiUrl + url || '', {
      method: "POST",
      headers: { 'Content-Type': 'application/json', ...this.headerApiKey, ...headers },
      ...this.defaultInit,
      ...paramsObject
    })

    const dataToJson = await data.json() // Convert data to json
    return dataToJson // Return API response
  }

  /**
   * 'POST' Request for update resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async put(params) {
    const { url, headers, ...paramsObject } = params // Get url and headers from params

    // Fetch to the API for make a response
    const data = await fetch(this.apiUrl + url || '', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', ...this.headerApiKey, ...headers },
      ...this.defaultInit,
      ...paramsObject
    })

    const dataToJson = await data.json() // Convert data to json
    return dataToJson // Return API response
  }

  /**
   * 'POST' Request for delete resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async delete(params) {
    const { url, headers, ...paramsObject } = params // Get url and headers from params

    // Fetch to the API for delete a resource
    const data = await fetch(this.apiUrl + url || '', {
      method: "DELETE",
      headers: { ...this.headerApiKey, ...headers },
      ...this.defaultInit,
      ...paramsObject
    })

    const dataToJson = await data.json() // Convert data to json
    return dataToJson // Return API response
  }

  /**
   * Validate params received
   * @param {object} params Fetch params
   * @returns {boolean} // Boolean
   */
  validateParams(params) {
    // Validate params
    if (!isObject(params)) {
      console.warn("Debes asignar como parámetro un objeto")
      return false
    }

    // Validate 'method' property
    if ('method' in params) {
      console.warn("La propiedad 'method' no debe estar establecida")
      return false
    }

    // Validate 'headers' property
    if ('headers' in params && !isObject(params.headers)) {
      console.warn("La propiedad 'headers' debe ser un objeto")
      return false
    }

    return true
  }
}