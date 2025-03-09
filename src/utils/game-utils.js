export function createEmptyBoard() {
    return Array(15).fill().map(() => 
      Array(15).fill({
        letter: '',
        bonus: null,
        value: 0
      })
    )
  }
  
  export function createLetterBag() {
    const letterDistribution = [
      { letter: 'A', value: 1, count: 9 }, { letter: 'B', value: 3, count: 2 },
      { letter: 'C', value: 3, count: 2 }, { letter: 'D', value: 2, count: 4 },
      { letter: 'E', value: 1, count: 12 }, { letter: 'F', value: 4, count: 2 },
      { letter: 'G', value: 2, count: 3 }, { letter: 'H', value: 4, count: 2 },
      { letter: 'I', value: 1, count: 9 }, { letter: 'J', value: 8, count: 1 },
      { letter: 'K', value: 5, count: 1 }, { letter: 'L', value: 1, count: 4 },
      { letter: 'M', value: 3, count: 2 }, { letter: 'N', value: 1, count: 6 },
      { letter: 'O', value: 1, count: 8 }, { letter: 'P', value: 3, count: 2 },
      { letter: 'Q', value: 10, count: 1 }, { letter: 'R', value: 1, count: 6 },
      { letter: 'S', value: 1, count: 4 }, { letter: 'T', value: 1, count: 6 },
      { letter: 'U', value: 1, count: 4 }, { letter: 'V', value: 4, count: 2 },
      { letter: 'W', value: 4, count: 2 }, { letter: 'X', value: 8, count: 1 },
      { letter: 'Y', value: 4, count: 2 }, { letter: 'Z', value: 10, count: 1 },
      { letter: ' ', value: 0, count: 2 } // Blank tiles
    ]
  
    return letterDistribution.flatMap(({ letter, value, count }) => 
      Array(count).fill({ letter, value })
    ).sort(() => Math.random() - 0.5)
  }