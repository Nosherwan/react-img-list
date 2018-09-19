/* NOTE: This is my own wrapper code around fetch API */

function Api () {

	// The value for globalUri should be set before using fetch
	var _globalUri = 'http://jsonplaceholder.typicode.com/';
	var _refreshCallbacks: any[] = [];
	var _refreshInProgress = false;
	var _accessToken = '';
	var _refreshToken = '';

	function _queryStringFromObject (api: any, data: any) {
		var queryString = Object.keys(data)
			.map(function (key) {
				return key + '=' + encodeURIComponent(data[key]);
			})
			.join('&');

		queryString = (api && queryString) ? '?' + queryString : (queryString ? queryString : '');

		return api ? (_globalUri + api + queryString) : queryString;
	}

	function _queryUri (api: any) {
		return _globalUri + api;
	}


	function _defaultOptions (endPoint:any, options:any) {
		var defaultOptions = options || {};
		defaultOptions.api = endPoint;
		defaultOptions.method = defaultOptions.method || 'get';
		defaultOptions.data = defaultOptions.data || {};
		return defaultOptions;
	}

	/**
	* Convenience method for fetch requests
	* @param {Object} options 
	* @return {Object} promise
	*/
	function _fetch (options: any = {}): Promise<Response> {
		if (!_globalUri) throw new Error('Please set a global uri via setGlobalUri.');

		if (!options.api) throw new Error('Please provide api endpoint for fetch.');

		var params: { [key: string]: any } = {
			method: '',
			headers: {
				// 'Accept': '',
			}
		};

		params.method = options.method;
		if (options.type === 'json') {
			params.headers['Content-Type'] = 'application/json';
		}

		if (options.authorization) {
			params.headers['Authorization'] = 'Bearer ' + _accessToken;
		}

		switch (options.method) {
			case 'patch':
			case 'post':
			case 'put':
			case 'delete':
				params.method = options.method.toUpperCase();
				if (options.type !== 'json') {
					params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
					params.body = _queryStringFromObject(null, options.data);
				} else {
					params.body = JSON.stringify(options.data);
				}
				return fetch(_queryUri(options.api), params);
			default:    //should serve for get
				return fetch(_queryStringFromObject(options.api, options.data), {
					method: params.method, headers: params.headers
				});
		}
	}

	function _filterResponse (response: any) {
		try {
			if (
				(response.headers.get('content-type') === 'application/json')
				&& (response.statusText !== 'No Content')
			) {
				return response.json();
			} else {
				return response;
			}
		} catch (e) {
			return response;
		}
	}

	function _tokenExpired (response: any) {
		if (_refreshToken) {
			switch (response.status) {
				case 401:
				case 403:
					return true;
				default:
					return false;
			}
		} else {
			return false;
		}
	}

	function _tokenRefreshFlow (options: any) {
		var _newPromise = new Promise(function (resolve: any, reject: any) {
			_refreshCallbacks.push(function (success: any) {
				if (success) {
					return _fetch(options)
						.then(function (response) {
							return resolve(response.json());
						}).catch(function (err) {
							return reject(err);
						});
				} else {
					return reject(new Error('Failed to refresh access token'));
				}
			});
		});
		_refresh();
		return _newPromise;
	}

	/**
	 * Do not expect any return value from this method
	 * It is only suppose to refresh the token and
	 * execute the waiting callbacks.
	 * @returns do not expect even though there is a returning promise
	 */
	function _refresh () {
		if (!_refreshInProgress) {
			_refreshInProgress = true;
			var options = _defaultOptions('oauth/token', {
				data: {
					refresh_token: _refreshToken,
					grant_type: 'refresh_token',
					client_id: '90989a0528ad4b238480f1ac0f5855e5'
				}
			});
			options.type = 'urlencoded';
			options.method = 'post';
			return _fetch(options)
				.then(function (result) {
					if (result.ok) {
						_filterResponse(result)
							.then(function (result: any) {
								_accessToken = result.access_token;
								_refreshToken = result.refresh_token;
								// callbacks will be successful
								var promiseList =
									_refreshCallbacks.map(function (cb) {
										return cb(true);
									});
								return Promise
									.all(promiseList)
									.then(function (results) {
										_refreshCallbacks = [];
										_refreshInProgress = false;
										return Promise.resolve(true);
									}).catch(function () {
										_refreshCallbacks = [];
										_refreshInProgress = false;
										return Promise.reject(false);
									});
							});
					} else {
						//cannot sucessfully do callbacks
							_refreshCallbacks.map(function (cb) {
								return cb(false);
							});
					}
				});
		}
	}

	return {
		isAuthenticated: function () {
			return (_accessToken && _refreshToken);
		},

		setAccessToken: function (token: any) {
			_accessToken = token;
		},

		setRefreshToken: function (token: any) {
			_refreshToken = token;
		},

		getAccessToken: function () {
			return _accessToken;
		},

		getRefreshToken: function () {
			return _refreshToken;
		},

		/**
		 * GlobalUri setter method for fetch requests
		 * @return {string} uri 
		 */
		setGlobalUri: function (uri: any) {
			_globalUri = uri;
		},

		/**
		 * 
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		getHTML: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: (result.ok ? result.text() : result)
					);
				});
		},

		/**
		 * send get request of type JSON
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		*/
		getJSON: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'json';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: (result.ok ? result.json() : result)
					);
				});
		},

		/**
		 * send post request of type JSON
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		postJSON: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'json';
			options.method = 'post';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: _filterResponse(result)
					);
				});
		},

		/**
		 * send patch request of type JSON
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		patchJSON: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'json';
			options.method = 'patch';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: _filterResponse(result)
					);
				});
		},
		/**
		 * send delete request of type JSON
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		deleteJSON: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'json';
			options.method = 'delete';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: (result.ok ? _filterResponse(result) : result)
					);
				});
		},

		/**
		 * send post request of type form
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		postForm: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'urlencoded';
			options.method = 'post';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							// : (result.ok ? _sendJson(result) : result)
							: _filterResponse(result)
					);
				});
		},

		/**
		 * send delete request of type form
		 * 
		 * @param {string} endPoint string
		 * @param {object} options object
		 * @return {Object} promise
		 */
		deleteForm: function (endPoint: any, options: any) {
			options = _defaultOptions(endPoint, options);
			options.type = 'urlencoded';
			options.method = 'delete';
			return _fetch(options)
				.then(function (result) {
					return (
						_tokenExpired(result) ?
							_tokenRefreshFlow(options)
							: _filterResponse(result)
					);
				});
		}
	};
}

export default Api();
