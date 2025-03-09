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
    Array(count).fill().map(() => ({ letter, value }))
  ).sort(() => Math.random() - 0.5)
}

// Word Validation & Tile Placement
export const validatePlacement = (board, turnTiles) => {
if (turnTiles.length === 0) return false;

const rows = turnTiles.map(t => t.row);
const cols = turnTiles.map(t => t.col);

const sameRow = new Set(rows).size === 1;
const sameCol = new Set(cols).size === 1;
if (!sameRow && !sameCol) return false;

// Ensure at least one tile connects to an existing tile (if not first move)
if (board.some(row => row.some(cell => cell.letter))) {
  const adjacent = turnTiles.some(({row, col}) => 
    (board[row-1]?.[col]?.letter) ||
    (board[row+1]?.[col]?.letter) ||
    (board[row]?.[col-1]?.letter) ||
    (board[row]?.[col+1]?.letter)
  );
  if (!adjacent) return false;
}

return true;
};

export const findFormedWords = (board, turnTiles) => {
const words = [];
if (turnTiles.length === 0) return words;

const mainDirection = new Set(turnTiles.map(t => t.row)).size === 1 ? 'horizontal' : 'vertical';

let mainWord = [];
if (mainDirection === 'horizontal') {
  const row = turnTiles[0].row;
  let col = Math.min(...turnTiles.map(t => t.col));
  while (col >= 0 && board[row][col].letter) col--;
  col++;
  while (col < 15 && board[row][col].letter) {
    mainWord.push(board[row][col]);
    col++;
  }
} else {
  const col = turnTiles[0].col;
  let row = Math.min(...turnTiles.map(t => t.row));
  while (row >= 0 && board[row][col].letter) row--;
  row++;
  while (row < 15 && board[row][col].letter) {
    mainWord.push(board[row][col]);
    row++;
  }
}
if (mainWord.length > 1) words.push(mainWord);

// Find cross words
turnTiles.forEach(({row, col}) => {
  if (mainDirection === 'horizontal') {
    let top = row, bottom = row;
    while (top >= 0 && board[top][col].letter) top--;
    top++;
    while (bottom < 15 && board[bottom][col].letter) bottom++;
    if (bottom - top > 1) {
      words.push(Array.from({length: bottom - top}, (_, i) => board[top + i][col]));
    }
  } else {
    let left = col, right = col;
    while (left >= 0 && board[row][left].letter) left--;
    left++;
    while (right < 15 && board[row][right].letter) right++;
    if (right - left > 1) {
      words.push(Array.from({length: right - left}, (_, i) => board[row][left + i]));
    }
  }
});

return words;
};

// Dictionary Validation
export async function validateWord(word) {
try {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  return response.ok;
} catch {
  return false;
}
}

// Enhanced Score Calculation
export function calculateScores(words, board) {
let total = 0;
const usedBonuses = new Set();

words.forEach(word => {
  let wordScore = 0;
  let wordMultiplier = 1;

  word.forEach(({row, col}) => {
    const cell = board[row][col];
    let tileValue = cell.value;
    
    if (cell.bonus && !usedBonuses.has(`${row}-${col}`)) {
      switch(cell.bonus) {
        case 'dl': tileValue *= 2; break;
        case 'tl': tileValue *= 3; break;
        case 'dw': wordMultiplier *= 2; break;
        case 'tw': wordMultiplier *= 3; break;
      }
      usedBonuses.add(`${row}-${col}`);
    }
    
    wordScore += tileValue;
  });

  total += wordScore * wordMultiplier;
});

return total;
}
