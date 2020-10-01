const responseBody = {
  message: "",
  timestamp: 0,
  result: null,
  code: 0
};

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
  } else {
    responseBody.code = 0;
  }
  responseBody._status = 200;
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

export const getQueryParameters = options => {
  const url = options.url;
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const getBody = options => {
  if (options.body) {
    try {
      return JSON.parse(options.body);
    } catch (err) {
      return JSON.parse(
        '{"' +
          decodeURIComponent(options.body)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
    }
  } else {
    return {};
  }
};
