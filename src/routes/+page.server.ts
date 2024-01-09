import {
	_message1xx,
	_message2xx,
	_message3xx,
	_message4xx,
	_message5xx
} from './status/[code]/+server';

export async function load() {
	return {
		_message1xx,
		_message2xx,
		_message3xx,
		_message4xx,
		_message5xx
	};
}
