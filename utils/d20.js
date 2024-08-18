const d20 = [];

for (let i = 0; i < 20; i++) {
  d20[i] = i + 1;
}

const d20roll = d20[Math.floor(Math.random() * 20)];
console.log(d20roll);

module.exports = d20roll;
