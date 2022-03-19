export const binSearch = <T>(sortedArray: Array<T>, elemToSearch: T): number | null => {
  let range = [0, sortedArray.length - 1];

  while (true) {
    if (
      (range[0] === range[1])
      &&
      sortedArray[range[0]] !== elemToSearch
    ) {
      return null;
    }

    const [start, end] = range;
    const length = end - start;
    const i = start + Math.round(length / 2);

    const currItem = sortedArray[i];

    if (currItem === elemToSearch) {
      return i;
    }

    if (currItem > elemToSearch) {
      range = [range[0], i];
    } else {
      range = [i, range[1]];
    }

  }
}
