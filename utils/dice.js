const d4 = [];

for (let i = 0; i < 4; i++) {
  d4[i] = i + 1;
}

const d4roll = d4[Math.floor(Math.random() * 4)];
console.log(d4roll);

const d6 = [];

for (let i = 0; i < 6; i++) {
  d6[i] = i + 1;
}

const d6roll = d6[Math.floor(Math.random() * 6)];
console.log(d6roll);

const d8 = [];

for (let i = 0; i < 8; i++) {
  d8[i] = i + 1;
}

const d8roll = d8[Math.floor(Math.random() * 8)];
console.log(d8roll);

const d10 = [];

for (let i = 0; i < 10; i++) {
  d10[i] = i + 1;
}

const d10roll = d10[Math.floor(Math.random() * 10)];
console.log(d10roll);

const d12 = [];

for (let i = 0; i < 12; i++) {
  d12[i] = i + 1;
}

const d12roll = d12[Math.floor(Math.random() * 12)];
console.log(d12roll);

const d20 = [];

for (let i = 0; i < 20; i++) {
  d20[i] = i + 1;
}

const d20roll = d20[Math.floor(Math.random() * 20)];
console.log(d20roll);

const d100 = [];

for (let i = 0; i < 100; i++) {
  d100[i] = i + 1;
}

const d100roll = d100[Math.floor(Math.random() * 100)];
console.log(d100roll);

module.exports = {
  d4roll,
  d6roll,
  d8roll,
  d10roll,
  d12roll,
  d20roll,
  d100roll,
};
