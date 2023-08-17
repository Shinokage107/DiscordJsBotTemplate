const { Api, DefaultResponseProcessor, DefaultApiException } = require("rest-api-handler");

const exampleApi = new Api("https://example.com/api", [new DefaultResponseProcessor(DefaultApiException), onlyDataProcessor]);

function onlyDataProcessor(response) {
  return Promise.resolve(response.data);
}

module.exports.exampleApi = exampleApi;
