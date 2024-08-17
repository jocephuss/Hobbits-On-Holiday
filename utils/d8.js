const d8 = [];

for (let i = 0; i < 8; i++) {
  d8[i] = i + 1;
}

const roll = d8[Math.floor(Math.random() * 8)];
console.log(roll);
