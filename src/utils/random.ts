export function getTotalRandom(count: number, total: number) {
  const answer: number[] = new Array();
  for (let i = 1; i < count; i++) {
    const sum = Math.floor((Math.random() * total * i) / count);
    if (sum === 0) {
      i--;
      continue;
    }
    total -= sum;
    answer.push(sum);
  }
  answer.push(total);
  return answer;
}

export function getRandom(count: number, total: number) {
  const answer: number[] = new Array();
  for (let i = 1; i < count; i++) {
    const sum = Math.floor(Math.random() * total);
    answer.push(sum);
  }
  answer.push(total);
  return answer;
}
