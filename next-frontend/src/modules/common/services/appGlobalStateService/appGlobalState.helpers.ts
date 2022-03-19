export const getArrayWithUpdatedElementsByCondition = <T>(arr: T[], condition: (T) => boolean, updater: (T) => T): T[] => {
  if (arr.find((elem) => condition(elem))) {
    return arr.map((elem) => (condition(elem) ? updater(elem) : elem));
  }
  return arr;
};
