/**
 * helper function to make conditional render easier.
 *
 * @param flag
 * @returns {function(*): null}
 */
export function renderIf (flag) {
  return function (viewContent) {
    return flag ? viewContent : null;
  };
}
