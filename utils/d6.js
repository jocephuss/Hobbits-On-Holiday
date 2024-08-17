const d6 = [];

for (let i = 0; i < 6; i++) {
  d6[i] = i + 1;
}

const roll = d6[Math.floor(Math.random() * 6)];
console.log(roll);
