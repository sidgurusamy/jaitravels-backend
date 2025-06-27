const express = require("express");
const router = express.Router();
const { getDB } = require("../config/db");

router.get("/", async (req, res) => {
  const db = getDB();
const { country, packageType, sortBy, type: tabCategory } = req.query;

let query = {};
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

if (country && country.trim() !== "") {
  query = {
    country: { $regex: new RegExp(country, "i") }
  };
} else if (packageType && packageType.trim() !== "") {
  query = {
    packageType: { $regex: new RegExp(packageType, "i") }
  };
} else if (tabCategory && tabCategory.trim() !== "") {
  query = {
    packageType: { $regex: new RegExp(tabCategory, "i") }
  };
}

  try {
    const sortStage = [];

    if (sortBy === "popularity") {
      sortStage.push(
        {
          $addFields: {
            badgeRank: {
              $switch: {
                branches: [
                  { case: { $eq: ["$badge", "Hot Trending"] }, then: 1 },
                  { case: { $eq: ["$badge", "Popular"] }, then: 2 },
                  { case: { $eq: ["$badge", "Top Pick"] }, then: 3 }
                ],
                default: 4
              }
            }
          }
        },
        { $sort: { badgeRank: 1 } }
      );
    } else if (sortBy === "duration-low") {
      sortStage.push({ $sort: { duration: 1 } });
    } else if (sortBy === "duration-high") {
      sortStage.push({ $sort: { duration: -1 } });
    }

const pipeline = [
  { $match: query },
  ...sortStage,
  { $skip: skip },
  { $limit: limit }
];


    const packages = await db.collection("packages").aggregate(pipeline).toArray();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single package by pId
router.get("/:pId", async (req, res) => {
  try {
    const db = getDB();
    const pkg = await db.collection("packages").findOne({ pId: req.params.pId });

    if (!pkg) return res.status(404).json({ message: "Package not found" });

    res.status(200).json(pkg);
  } catch (err) {
    console.error("Error fetching package:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
