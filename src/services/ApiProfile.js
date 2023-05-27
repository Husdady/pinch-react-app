// Utils
import isObject from "../utils/isObject";

// Constants
import { WIX_APP_URL } from "../assets/data/api";
import { TOKEN } from "../assets/data/constants";

export default class ApiProfile {
  constructor(apiKey) {
    // this.apiKey = apiKey; // Define the apiKey
    this.apiUrl = WIX_APP_URL; // Url of the API
    this.headerApiKey = { "pro-pinch-api-key": TOKEN }; // Define header for the apiKey
  }

  /**
   * 'GET' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async get(params) {
    const { url, headers, ...paramsObject } = params; // Get url from params

    // Fetch to the API for get a response
    const data = await fetch(this.apiUrl + url || "", {
      ...paramsObject,
      method: "GET",
      headers: this.headerApiKey,
    });

    const dataToJson = await data.json(); // Convert data to json
    return dataToJson; // Return API response
  }

  /**
   * 'POST' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async post(params) {
    const { url, body, headers, ...paramsObject } = params; // Get url and headers from params

    // Define params
    const fetchParams = {
      ...paramsObject,
      method: "POST",
      body: isObject(body) ? JSON.stringify(body) : JSON.stringify({}),
      headers: {
        ...headers,
        ...this.headerApiKey,
        "Content-Type": "application/json",
      },
    };

    // Fetch to the API for make a response
    const data = await fetch(this.apiUrl + url || "", fetchParams);
    const dataToJson = await data.json(); // Convert data to json

    return dataToJson; // Return API response
  }

  /**
   * 'PUT' Request for update resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async put(params) {
    const { url, body, headers, ...paramsObject } = params; // Get url and headers from params

    // Fetch to the API for make a response
    const data = await fetch(this.apiUrl + url || "", {
      method: "PUT",
      body: isObject(body) ? JSON.stringify(body) : JSON.stringify({}),
      headers: {
        ...headers,
        ...this.headerApiKey,
        "Content-Type": "application/json",
      },
      ...paramsObject,
    });

    const dataToJson = await data.json(); // Convert data to json
    return dataToJson; // Return API response
  }

  /**
   * 'POST' Request for delete resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async delete(params) {
    const { url, headers, ...paramsObject } = params; // Get url and headers from params

    // Fetch to the API for delete a resource
    const data = await fetch(this.apiUrl + url || "", {
      method: "DELETE",
      headers: { ...this.headerApiKey, ...headers },
      ...paramsObject,
    });

    const dataToJson = await data.json(); // Convert data to json
    return dataToJson; // Return API response
  }

  /**
   * Validate params received
   * @param {object} params Fetch params
   * @returns {boolean} // Boolean
   */
  validateParams(params) {
    // Validate params
    if (!isObject(params)) {
      console.warn("Debes asignar como parámetro un objeto");
      return false;
    }

    // Validate 'method' property
    if ("method" in params) {
      console.warn("La propiedad 'method' no debe estar establecida");
      return false;
    }

    // Validate 'headers' property
    if ("headers" in params && !isObject(params.headers)) {
      console.warn("La propiedad 'headers' debe ser un objeto");
      return false;
    }

    return true;
  }
}
