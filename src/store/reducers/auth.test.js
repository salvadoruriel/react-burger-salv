//here enzyme isn't need as we don't render react components,
//	here we test normal js code, simple functions w/o async,
//Here separating the logic in only 1 step (actions or 
//	reducers) also helps testing.
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

//basically we test for functions and expected values
//	without rendering components.
describe('auth reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});

	it('should store the token upon login', () => {
		expect(reducer({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		}, {
			type: actionTypes.AUTH_SUCCESS,
			idToken: 'some-token',
			userId: 'some-user-id'
		})).toEqual({
			token: 'some-token',
			userId: 'some-user-id',
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});

});