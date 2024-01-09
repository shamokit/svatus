import { json, redirect, error, fail } from '@sveltejs/kit';

export const _message1xx = Object.freeze({
	100: '100 Continue',
	101: '101 Switching Protocols',
	102: '102 Processing',
	103: '103 Early Hints'
});

export const _message2xx = Object.freeze({
	200: '200 OK',
	201: '201 Created',
	202: '202 Accepted',
	203: '203 Non-Authoritative Information',
	204: '204 No Content',
	205: '205 Reset Content',
	206: '206 Partial Content',
	207: '207 Multi-Status',
	208: '208 Already Reported',
	226: '226 IM Used'
});

export const _message3xx = Object.freeze({
	300: '300 Multiple Choices',
	301: '301 Moved Permanently',
	302: '302 Found',
	303: '303 See Other',
	304: '304 Not Modified',
	307: '307 Temporary Redirect',
	308: '308 Permanent Redirect'
});

export const _message4xx = Object.freeze({
	400: '400 Bad Request',
	401: '401 Unauthorized',
	402: '402 Payment Required',
	403: '403 Forbidden',
	404: '404 Not Found',
	405: '405 Method Not Allowed',
	406: '406 Not Acceptable',
	407: '407 Proxy Authentication Required',
	408: '408 Request Timeout',
	409: '409 Conflict',
	410: '410 Gone',
	411: '411 Length Required',
	412: '412 Precondition Failed',
	413: '413 Payload Too Large',
	414: '414 URI Too Long',
	415: '415 Unsupported Media Type',
	416: '416 Range Not Satisfiable',
	417: '417 Expectation Failed',
	418: "418 I'm a teapot",
	421: '421 Misdirected Request',
	422: '422 Unprocessable Content',
	423: '423 Locked',
	424: '424 Failed Dependency',
	425: '425 Too Early',
	426: '426 Upgrade Required',
	428: '428 Precondition Required',
	429: '429 Too Many Requests',
	431: '431 Request Header Fields Too Large',
	451: '451 Unavailable For Legal Reasons'
});

export const _message5xx = Object.freeze({
	500: '500 Internal Server Error',
	501: '501 Not Implemented',
	502: '502 Bad Gateway',
	503: '503 Service Unavailable',
	504: '504 Gateway Timeout',
	505: '505 HTTP Version Not Supported',
	506: '506 Variant Also Negotiates',
	507: '507 Insufficient Storage',
	508: '508 Loop Detected',
	510: '510 Not Extended',
	511: '511 Network Authentication Required'
});

const hasKey = <T extends { [key in number]: string }>(
	object: T,
	key: number
): key is Extract<keyof T, number> => {
	const keys = Object.keys(object).map((s) => Number(s));
	return keys.includes(key);
};
export async function GET({ params }) {
	const _code = Number(params.code);
	if (!Number.isInteger(_code)) throw fail(500);
	switch (true) {
		case _code >= 100 && _code <= 103: {
			// jsonは200〜599までしか返せないのでエラーになる
			if (hasKey(_message1xx, _code)) {
				return json(
					{
						status_code: _code,
						message: _message1xx[_code]
					},
					{
						status: _code,
						statusText: _message1xx[_code]
					}
				);
			} else {
				throw fail(500);
			}
		}
		case _code >= 200 && _code <= 226: {
			if (hasKey(_message2xx, _code)) {
				return json(
					{
						status_code: _code,
						message: _message2xx[_code]
					},
					{
						status: _code,
						statusText: _message2xx[_code]
					}
				);
			} else {
				throw fail(500);
			}
		}
		case _code >= 400 && _code <= 451: {
			if (hasKey(_message4xx, _code)) {
				return json(
					{
						status_code: _code,
						message: _message4xx[_code]
					},
					{
						status: _code,
						statusText: _message4xx[_code]
					}
				);
			} else {
				throw fail(500);
			}
		}
		case _code >= 300 && _code <= 308: {
			if (hasKey(_message3xx, _code)) {
				return redirect(_code, '/');
			} else {
				throw fail(500);
			}
		}
		case _code >= 500 && _code <= 511: {
			if (hasKey(_message5xx, _code)) {
				return json(
					{
						status_code: _code,
						message: _message5xx[_code]
					},
					{
						status: _code,
						statusText: _message5xx[_code]
					}
				);
			} else {
				throw fail(500);
			}
		}
		default: {
			throw fail(500);
		}
	}
}
