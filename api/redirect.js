const express = require("express");

// Router
const router = express.Router();

// Custom functions
const { getOne_urlCode } = require("./DbFunctions");

// @route       GET /:code
// @description    Redirect to the long/original URL
router.get("/:code", async (req, res) => {
  const urlCode = req.params.code;

  try {
    // find a document match to the code in req.params.code
    const findOneData = await getOne_urlCode(urlCode);

    const { data, errors } = findOneData;

    // if Hasura operation errors, then throw error
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    const urlData = data.short_urls[0];

    // success
    if (data.short_urls.length > 0) {
      return res.redirect(urlData["longUrl"]);
    } else {
      res.status(404).json("No url found");
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
