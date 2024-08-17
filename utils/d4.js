const d4 = [];

for (let i = 0; i < 4; i++) {
  d4[i] = i + 1;
}

const roll = d4[Math.floor(Math.random() * 4)];
console.log(roll);
