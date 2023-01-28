const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const reptiles = require("../../data/reptiles.json");
const _ = require("lodash");

const dev_domain = process.env.DEV_DOMAIN;

router.get("/", (req, res) => {
  const { animal, sort } = req.query;

  let data;

  // Filtering data

  if (animal && animal !== "all") {
    data = reptiles?.data?.filter((item) => item.animal === animal);
  } else {
    data = reptiles.data;
  }

  // Sorting data

  let sortedData;

  if (!sort || sort === "name_asc") {
    sortedData = _.sortBy(data, "specie");
  } else if (sort === "name_desc") {
    sortedData = _.sortBy(data, "specie").reverse();
  } else if (sort === "price_asc") {
    sortedData = _.sortBy(data, "price");
  } else if (sort === "price_desc") {
    sortedData = _.sortBy(data, "price").reverse();
  }

  res.header("Access-Control-Allow-Origin", *);
  res.json(sortedData);
});

module.exports = router;
