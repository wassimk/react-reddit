import fetchIntercept from 'fetch-intercept';

export default function setInterceptor() {
  fetchIntercept.register({
    request: function(url, config) {
      const default_headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Hello'
      };

      config = {
        headers: default_headers,
        ...config
      };

      return [url, config];
    },

    requestError: function(error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function(response) {
      return response;
    },

    responseError: function(error) {
      return Promise.reject(error);
    }
  });
}
