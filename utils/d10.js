const d10 = [];

for (let i = 0; i < 10; i++) {
  d10[i] = i + 1;
}

const roll = d10[Math.floor(Math.random() * 10)];
console.log(roll);
