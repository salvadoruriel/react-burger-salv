import React from 'react';
import { configure, shallow } from 'enzyme';
//shallow works more as 'placeholders' of the elements
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

//describe(it & expect) will be included on test runs by jest
//first element is what shows on console, so it helps to
//	differentiate components in this syntax vvvv
describe('<NavigationItems />', () => {
	//helperfunction to avoid repeating
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	//it describes/allows to write an individual test
	it('should render two <NavigationItem /> elements if not authenticated', () => {
		//find() is provided by enzyme
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render three <NavigationItem /> elements if authenticated', () => {
		// wrapper = shallow(<NavigationItems isAuthenticated />);
		//setProps is from enzyme
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should render an exact logout button', () => {
		//beforeEach() resets the wrapper, so we have to set it
		//	(or its props) again.
		wrapper.setProps({ isAuthenticated: true });
		//an alternative
		//expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toHaveLength(1);
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
});