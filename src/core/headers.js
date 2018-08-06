/**
 * header fns
 *
 * @export
 * @param {any} xhr
 * @param {any} headerJson
 */
export default function renderHeadersFns(xhr, headerJson) {
  for (var variable in headerJson) {
    if (headerJson.hasOwnProperty(variable)) {
      xhr.setRequestHeader(variable, headerJson[variable]);
    }
  }
}
