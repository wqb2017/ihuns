/**
 * response data format
 *
 * @export
 * @param {any} xhr
 * @returns
 */
export default function transformResponse(responseData, instansConfig) {
  return {
    response: responseData ? JSON.parse(responseData.response || responseData.responseText) : {},
    status: responseData.status,
    readyState: responseData.readyState,
    config: instansConfig
  };
}
