/**
 * request data format
 *
 * @export
 * @param {any} instansConfig
 */
export default function transformData(instansConfig) {
  const instansConfigData = instansConfig.data;

  let formData = new FormData();
  for (var variable in instansConfigData) {
    if (instansConfigData.hasOwnProperty(variable)) {
      formData.append(variable, instansConfigData[variable]);
    }
  }
  return formData;
}
