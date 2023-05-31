// Utils
import isObject from "../utils/isObject";

// Constants
import { FETCH_ERRORS } from "./errors";
import { TOKEN, WIX_APP_URL } from "../assets/data/api";
import {
  BAD_PARAMS,
  API_KEY_FIELD,
  INVALID_TOKEN,
  HEADERS_IS_NOT_AN_OBJECT,
  PROPERTY_METHOD_UNNECESSARY,
  DEFAULT_LIMIT_FOR_GET_REQUESTS,
  DEFAULT_LIMIT_FOR_POST_REQUESTS,
  DEFAULT_LIMIT_FOR_PUT_REQUESTS,
  DEFAULT_LIMIT_FOR_DELETE_REQUESTS,
} from "./constants";

const { FAILED_TO_FETCH } = FETCH_ERRORS;

export default class ApiProfile {
  constructor(token) {
    this.apiUrl = WIX_APP_URL; // Url of the API
    this.origin = window.location.origin; // Get origin
    this.limitGetRequest = DEFAULT_LIMIT_FOR_GET_REQUESTS;
    this.limitPostRequest = DEFAULT_LIMIT_FOR_POST_REQUESTS;
    this.limitPutRequest = DEFAULT_LIMIT_FOR_PUT_REQUESTS;
    this.limitDeleteRequest = DEFAULT_LIMIT_FOR_DELETE_REQUESTS;
    this.headerApiKey = { [API_KEY_FIELD]: token || "" }; // Define header for the apiKey
  }

  /**
   * 'GET' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async get(params) {
    // Validate token
    if (typeof this.headerApiKey[API_KEY_FIELD] !== "string") {
      return console.error(INVALID_TOKEN); // Show error in console
    }

    // Validate params
    if (!this.validateParams(params)) return;

    const { url } = params; // Get url from params

    // Define fetch params
    const fetchParams = {
      method: "GET",
      headers: {
        [API_KEY_FIELD]: TOKEN,
        origin: this.origin
      },
    };

    try {
      // Fetch to the API for get a response
      const data = await fetch(this.apiUrl + url || "", fetchParams);
      const dataToJson = await data.json(); // Convert data to json
      return dataToJson; // Return API response
    } catch (error) {
      // Show error in console
      // console.error("[GET_ERROR]", error);

      // Cors error
      if (
        this.limitGetRequest > 0 &&
        error.name === FAILED_TO_FETCH.name &&
        error.message === FAILED_TO_FETCH.message
      ) {
        this.limitGetRequest = this.limitGetRequest - 1;
        // console.clear(); // Clear console
        console.log('[BUG]')
        return this.get(params); // Make again the request
      }

      // Reset limit of the 'GET' requests
      if (this.limitGetRequest === 0) {
        this.limitGetRequest = DEFAULT_LIMIT_FOR_GET_REQUESTS;
      }

      return { error: error };
    }
  }

  /**
   * 'POST' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async post(params) {
    // Validate token
    if (typeof this.headerApiKey[API_KEY_FIELD] !== "string") {
      return console.error(INVALID_TOKEN); // Show error in console
    }

    // Validate params
    if (!this.validateParams(params)) return;

    const { url, body, headers } = params; // Get url and headers from params

    // Define params
    const fetchParams = {
      method: "POST",
      body: isObject(body) ? JSON.stringify(body) : JSON.stringify({}),
      headers: {
        ...headers,
        ...this.headerApiKey,
        "Content-Type": "application/json",
      },
    };

    try {
      // Fetch to the API for make a response
      const data = await fetch(this.apiUrl + url || "", fetchParams);
      const dataToJson = await data.json(); // Convert data to json

      return dataToJson; // Return API response
    } catch (error) {
      // Show error in console
      console.error("[POST_ERROR]", error);

      // Cors error
      if (
        this.limitPostRequest > 0 &&
        error.name === FAILED_TO_FETCH.name &&
        error.message === FAILED_TO_FETCH.message
      ) {
        this.limitPostRequest = this.limitPostRequest - 1;
        console.clear(); // Clear console
        return this.post(params); // Make again the request
      }

      // Reset limit of the 'POST' requests
      if (this.limitPostRequest === 0) {
        this.limitPostRequest = DEFAULT_LIMIT_FOR_POST_REQUESTS;
      }

      return { error: error };
    }
  }

  /**
   * 'PUT' Request for update resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async put(params) {
    // Validate token
    if (typeof this.headerApiKey[API_KEY_FIELD] !== "string") {
      return console.error(INVALID_TOKEN); // Show error in console
    }

    // Validate params
    if (!this.validateParams(params)) return;

    const { url, body, ...paramsObject } = params; // Get url and headers from params

    // Define fetch pararms
    const fetchParams = {
      ...paramsObject,
      method: "PUT",
      body: isObject(body) ? JSON.stringify(body) : JSON.stringify({}),
      headers: {
        ...this.headerApiKey,
        "Content-Type": "application/json",
      },
    };

    try {
      // Fetch to the API for make a response
      const data = await fetch(this.apiUrl + url || "", fetchParams);

      const dataToJson = await data.json(); // Convert data to json
      return dataToJson; // Return API response
    } catch (error) {
      // Show error in console
      console.error("[PUT_ERROR]", error);

      // Cors error
      if (
        this.limitPutRequest > 0 &&
        error.name === FAILED_TO_FETCH.name &&
        error.message === FAILED_TO_FETCH.message
      ) {
        this.limitPutRequest = this.limitPutRequest - 1;
        console.clear(); // Clear console
        return this.put(params); // Make again the request
      }

      // Reset limit of the 'PUT' requests
      if (this.limitPutRequest === 0) {
        this.limitPutRequest = DEFAULT_LIMIT_FOR_PUT_REQUESTS;
      }

      return { error: error };
    }
  }

  /**
   * 'POST' Request for delete resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async delete(params) {
    // Validate token
    if (typeof this.headerApiKey[API_KEY_FIELD] !== "string") {
      return console.error(INVALID_TOKEN); // Show error in console
    }

    // Validate params
    if (!this.validateParams(params)) return;

    const { url, ...paramsObject } = params; // Get url and headers from params

    // Define fetch params
    const fetchParams = {
      ...paramsObject,
      method: "DELETE",
      headers: this.headerApiKey,
    };

    // Fetch to the API for delete a resource
    const data = await fetch(this.apiUrl + url || "", fetchParams);

    try {
      const dataToJson = await data.json(); // Convert data to json
      return dataToJson; // Return API response
    } catch (error) {
      // Show error in console
      console.error("[DELETE_ERROR]", error);

      // Cors error
      if (
        this.limitDeleteRequest > 0 &&
        error.name === FAILED_TO_FETCH.name &&
        error.message === FAILED_TO_FETCH.message
      ) {
        this.limitDeleteRequest = this.limitDeleteRequest - 1;
        console.clear(); // Clear console
        return this.delete(params); // Make again the request
      }

      // Reset limit of the 'DELETE' requests
      if (this.limitDeleteRequest === 0) {
        this.limitDeleteRequest = DEFAULT_LIMIT_FOR_DELETE_REQUESTS;
      }

      return { error: error };
    }
  }

  /**
   * Validate params received
   * @param {object} params Fetch params
   * @returns {boolean} // Boolean
   */
  validateParams(params) {
    // Validate params
    if (!isObject(params)) {
      console.warn(BAD_PARAMS);
      return false;
    }

    // Validate 'method' property
    if ("method" in params) {
      console.warn(PROPERTY_METHOD_UNNECESSARY);
      return false;
    }

    // Validate 'headers' property
    if ("headers" in params && !isObject(params.headers)) {
      console.warn(HEADERS_IS_NOT_AN_OBJECT);
      return false;
    }

    return true;
  }
}
