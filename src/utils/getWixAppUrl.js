// Constants
export const ORIGIN = window.location.origin;

/**
 * Get Wix app url
 * @returns {string} Wix url
 */
export default function getWixAppUrl({
  DEV_URL,
  WIX_DEV_APP_URL,
  WIX_DEV_URL_ENDPOINT,
  WIX_PROD_APP_URL,
}) {
  // Define Wix dev url
  const WIX_DEV_URL = WIX_DEV_APP_URL + WIX_DEV_URL_ENDPOINT

  // Origin its equal to dev url
  if (ORIGIN === DEV_URL) return WIX_DEV_URL

  // Define url
  const url = ORIGIN.replace(/-/g, ".");

  // Its in mode 'development' on Wix
  if (url.includes(WIX_DEV_APP_URL)) return WIX_DEV_URL

  // Its in mode 'production' on Wix
  return WIX_PROD_APP_URL;
}
