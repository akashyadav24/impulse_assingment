const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const fetch = require("node-fetch");

// Custom functions
const { addShortUrlInDB, getOne_longUrl } = require("./DbFunctions");

// creating express route handler
const router = express.Router();

const baseUrl = "http:localhost:8000";

// Request Handler
router.post("/", async (req, res) => {
  // get request input
  const { longUrl } = req.body; // destructure the longUrl from req.body.longUrl

  // check base url if valid using the validUrl.isUri method
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // if valid, we create the url code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      // First find the existing longUrl
      const findOneData = await getOne_longUrl(longUrl);

      if (findOneData.data.short_urls.length > 0) {
        const { data, errors } = findOneData;

        // if Hasura operation errors, then throw error
        if (errors) {
          return res.status(400).json(errors[0]);
        }

        const urlData = data.short_urls[0];

        // success
        return res.json({
          shortUrl: urlData["shortUrl"],
        });
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;

        // execute the Hasura operation
        const { data, errors } = await addShortUrlInDB(
          longUrl,
          shortUrl,
          urlCode
        );

        // if Hasura operation errors, then throw error
        if (errors) {
          return res.status(400).json(errors[0]);
        }

        // success
        return res.json({
          ...data.insert_short_urls_one,
        });
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
