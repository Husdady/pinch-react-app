import ApiProfile from "../../../../services/ApiProfile"

// Constants
import { API_KEY } from "../../../../assets/data/api"

const apiProfile = new ApiProfile(API_KEY)

/**
 * Fetch clients from the API
 * @param {object} params Receive a 'memberId' and callbacks 
 * @returns {object} Object
 */
export default async function fetchClients({ memberId, onInit, onFinish, onError, onFinally }) {
  try {
    if (typeof onInit === 'function') onInit() // Execute 'onInit' callback
    const result = await apiProfile.get({ url: `/clients?memberId=${memberId}` })
    if (typeof onFinish === 'function') onFinish(result) // Execute 'onFinish' callback
    return result
  } catch (error) {
    if (typeof onError === 'function') onError(error) // Execute 'onError' callback
    return { error: error }
  } finally {
    if (typeof onFinally === 'function') onFinally() // Execute 'onFinally' callback
  }
}