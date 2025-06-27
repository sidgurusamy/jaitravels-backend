const express = require("express");
const router = express.Router();
const { subscribeEmail } = require("../controllers/subscriptionController");

router.post("/subscribeEmail", subscribeEmail);

module.exports = router;
