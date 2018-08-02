/**
 * request param key sort
 *
 * @export
 * @param {object} instansConfigData
 * @returns a=>z
 */
function keySort(data) {
  return Object.keys(data).sort(function(a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
  });
}
/**
 * sign
 *
 * @export
 * @param {any} instansConfig
 * @returns {string}
 */
export default function sign(instansConfig) {
  const data = instansConfig.data;
  let dataValues = keySort(data);
  let signArr = [];
  for (let i = 0; i < dataValues.length; i++) {
    signArr.push(dataValues[i] + '=' + data[dataValues[i]]);
  }
  return signArr.join('&') + '&=requestKey' + instansConfig.requestKey;
}
