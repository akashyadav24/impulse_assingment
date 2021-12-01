const fetch = require("node-fetch");

async function addShortUrlInDB(longUrl, shortUrl, urlCode) {
  const HASURA_OPERATION = `
    mutation ($longUrl: String, $shortUrl: String, $urlCode: String) {
      insert_short_urls_one(object: {
        longUrl: $longUrl,
        shortUrl: $shortUrl
        urlCode: $urlCode
      }){
        shortUrl
      }
    }
    `;

  // execute the parent operation in Hasura
  const execute = async (variables) => {
    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "ejDY54idhxbWLYJgQ3bw0Tad7roE8H5XcWM4Sj3rT0pvS0MFvAjp6nf7rR2FQyRG",
    };

    const fetchResponse = await fetch(
      "https://stable-crawdad-72.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: HASURA_OPERATION,
          variables,
        }),
      }
    );
    const data = await fetchResponse.json();
    console.log("DEBUG: ", data);
    return data;
  };

  return await execute({ longUrl, shortUrl, urlCode });
}

async function getOne_longUrl(longUrl) {
  const HASURA_OPERATION = `
    query MyQuery($longUrl: String) {
      short_urls(
        limit: 1
        where: {longUrl: {_eq: $longUrl}}
      ) {
        longUrl
        shortUrl
      }
    }
  `;

  // execute the parent operation in Hasura
  const execute = async (variables) => {
    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "ejDY54idhxbWLYJgQ3bw0Tad7roE8H5XcWM4Sj3rT0pvS0MFvAjp6nf7rR2FQyRG",
    };

    const fetchResponse = await fetch(
      "https://stable-crawdad-72.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: HASURA_OPERATION,
          variables,
        }),
      }
    );
    const data = await fetchResponse.json();
    console.log("DEBUG: ", data);
    return data;
  };

  return await execute({ longUrl });
}

async function getOne_urlCode(urlCode) {
  const HASURA_OPERATION = `
query MyQuery($urlCode: String) {
  short_urls(
    limit: 1
  	where: {urlCode: {_eq: $urlCode}}
  ) {
    longUrl
  }
}
`;

  // execute the parent operation in Hasura
  const execute = async (variables) => {
    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "ejDY54idhxbWLYJgQ3bw0Tad7roE8H5XcWM4Sj3rT0pvS0MFvAjp6nf7rR2FQyRG",
    };

    const fetchResponse = await fetch(
      "https://stable-crawdad-72.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: HASURA_OPERATION,
          variables,
        }),
      }
    );
    const data = await fetchResponse.json();
    console.log("DEBUG: ", data);
    return data;
  };

  return await execute({ urlCode });
}

module.exports = { addShortUrlInDB, getOne_longUrl, getOne_urlCode };
