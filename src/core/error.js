/**
 * error fns
 *
 * @export
 * @param {any} msg
 * @param {any} xhr
 * @param {any} instansConfig
 */
export default function renderErrorFns(msg, xhr, instansConfig) {
  if (instansConfig.timeout) {
    instansConfig.ontimeout('timeout Error', xhr, instansConfig);
  }
  instansConfig.error(msg, xhr, instansConfig);
}
