// Utils
import isObject from "../utils/isObject";

// Constants
import { WIX_APP_URL } from "../assets/data/api";
import { TOKEN } from "../assets/data/constants";

export default class ApiProfile {
  constructor(apiKey) {
    // this.apiKey = apiKey; // Define the apiKey
    this.limitGetRequest = 3;
    this.limitPostRequest = 3;
    this.limitPutRequest = 3;
    this.limitDeleteRequest = 3;
    this.apiUrl = WIX_APP_URL; // Url of the API
    this.origin = window.location.pathname;
    this.headerApiKey = { "pro-pinch-api-key": TOKEN }; // Define header for the apiKey
    this.fetchError = { name: 'TypeError', message: 'Failed to fetch' }
  }

  /**
   * 'GET' Request for make to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async get(params) {
    const { url, headers, ...paramsObject } = params; // Get url from params

    // Define fetch params
    const fetchParams = {
      ...paramsObject,
      method: "GET",
      headers: {
        ...this.headerApiKey,
        origin: this.origin,
      },
    };

    try {
      // Fetch to the API for get a response
      const data = await fetch(this.apiUrl + url || "", fetchParams);
      const dataToJson = await data.json(); // Convert data to json
      return dataToJson; // Return API response
    } catch (error) {
      // Cors error
      if (
        this.limitGetRequest > 0 &&
        error.name === "TypeError" &&
        error.message === "Failed to fetch"
      ) {
        this.limitGetRequest = this.limitGetRequest - 1;
        console.clear(); // Clear console
        return this.get(params);
      }

      console.log("[GET_ERROR]", {
        name: error.name,
        message: error.message
      });

      return { error: error };
    }
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

    try {
      // Fetch to the API for make a response
      const data = await fetch(this.apiUrl + url || "", fetchParams);
      const dataToJson = await data.json(); // Convert data to json

      return dataToJson; // Return API response
    } catch (error) {
      // Cors error
      if (
        this.limitPostRequest > 0 &&
        error.name === "TypeError" &&
        error.message === "Failed to fetch"
      ) {
        this.limitPostRequest = this.limitPostRequest - 1;
        console.clear(); // Clear console
        return this.post(params);
      }

      console.log("[POST_ERROR]", {
        name: error.name,
        message: error.message
      });

      return { error: error };
    }
  }

  /**
   * 'PUT' Request for update resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async put(params) {
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
      // Cors error
      if (
        this.limitPutRequest > 0 &&
        error.name === "TypeError" &&
        error.message === "Failed to fetch"
      ) {
        this.limitPutRequest = this.limitPutRequest - 1;
        console.clear(); // Clear console
        return this.put(params);
      }

      console.log("[PUT_ERROR]", {
        name: error.name,
        message: error.message
      });

      return { error: error };
    }
  }

  /**
   * 'POST' Request for delete resource to the API
   * @param {object} params Fetch params
   * @returns {Promise<Response>} // API Response
   */
  async delete(params) {
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
      // Cors error
      if (
        this.limitDeleteRequest > 0 &&
        error.name === "TypeError" &&
        error.message === "Failed to fetch"
      ) {
        this.limitDeleteRequest = this.limitDeleteRequest - 1;
        console.clear(); // Clear console
        return this.delete(params);
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
