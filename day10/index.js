const inputs = [103,131,121,151,118,12,7,2,90,74,160,58,15,83,153,140,166,1,148,33,165,39,100,135,68,77,25,9,54,94,101,55,141,22,97,35,57,117,102,64,109,114,56,51,125,82,154,142,155,45,75,158,120,5,19,61,34,128,106,88,84,137,96,136,27,6,21,89,69,162,112,127,119,161,38,42,134,20,81,48,73,87,26,95,146,113,76,32,70,8,18,67,124,80,93,29,126,147,28,152,145,159]
const testInputs = [16,10,15,5,1,11,7,19,6,12,4]
const testInputs2 = [28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]

function findJoltageDifferences(inputs) {
  return inputs.sort((a, b) => a - b).reduce((diffs, adapter, i) => {
    const diff = adapter - (inputs[i - 1] || 0)
    if (typeof diffs[diff] !== 'number') {
      diffs[diff] = 0
    }
    diffs[diff]++

    return diffs
  }, {3: 1})
}

function findUniqueArrangements(inputs, start = []) {
  inputs.sort((a, b) => a - b)
  const startIndex = inputs.indexOf(start[start.length - 1]) + 1

  const adaptersLeft = inputs.slice(startIndex)
  const validNextAdapters = adaptersLeft.filter(a => a - 3 <= (start[start.length - 1] || 0))

  if (!validNextAdapters.length) {
    // Optimized a little bit by just counting the number of unique arrangements instead of building them
    // return [start]
    return 'found'
  }

  // Optimized a little bit by just counting the number of unique arrangements instead of building them
  // const arrangements = validNextAdapters.flatMap(a => findUniqueArrangements(inputs, [...start, a]))
  const arrangements = validNextAdapters.reduce((acc, a) => {
    const foo = findUniqueArrangements(inputs, [...start, a])
    return foo === 'found' ? acc + 1 : acc + foo
  }, 0)

  return arrangements
}

function calculateUniqueArrangements(inputs) {
  inputs.sort((a, b) => a - b)

  let prevThree = -1
  const oneDiffsInARow = inputs.reduce((oneDiffsInARow, adapter, i) => {
    // If the difference to the next adapter (or the device if it's the end) is 3,
    // count the number of ones that just followed in a row
    if (inputs[i + 1] === undefined || inputs[i + 1] - adapter > 1) {
      let amountOfOneDiffsInARow = i - prevThree
      oneDiffsInARow[amountOfOneDiffsInARow] = (oneDiffsInARow[amountOfOneDiffsInARow] || 0) + 1
      prevThree = i + 1
    }

    return oneDiffsInARow
  }, {})

  return Math.pow(7, oneDiffsInARow[4] || 0) * Math.pow(4, oneDiffsInARow[3] || 0) * Math.pow(2, oneDiffsInARow[2] || 0)
}

/*
 * PART 1
 */
console.log('PART 1')
const joltageDifferences = findJoltageDifferences(inputs)
console.log(joltageDifferences[1] * joltageDifferences[3])

/*
 * PART 2
 */
console.log('PART 2')
// My first approach, takes waaaay too long
// const uniqueArrangements = findUniqueArrangements(inputs)
// console.log(uniqueArrangements)

// Insane solution that I would have never found by myself
// Source: https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/
const numberOfUniqueArrangements = calculateUniqueArrangements(inputs)
console.log(numberOfUniqueArrangements)
