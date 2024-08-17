const router = require("express").Router();
const { Baddie } = require("../../models");
const withAuth = require("../../utils/auth");
const fs = require("fs");
const path = require("path");
const baddieDataPath = path.join(
  __dirname,
  "../../seeds/baddieData.json"
);
