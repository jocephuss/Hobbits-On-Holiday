const d12 = [];

for (let i = 0; i < 12; i++) {
  d12[i] = i + 1;
}

const roll = d12[Math.floor(Math.random() * 12)];
console.log(roll);
