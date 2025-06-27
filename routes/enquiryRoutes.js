const express = require("express");
const router = express.Router();
const {submitInquiryForm} = require("../controllers/inquiryController");

// Enquiry routes
router.post("/submitInquiryForm", submitInquiryForm);

module.exports = router;
