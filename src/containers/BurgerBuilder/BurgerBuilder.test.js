//we have to add 'export' to containers in order to reuse
//	them as components and simulate a state being passed by 
//	redux, also this export strips the connection to redux
import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
	let wrapper;
	beforeEach(() => {
		//wrapper = shallow(<BurgerBuilder />); //also causes error on setProps
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
	});

	it('should render <BuildControls /> when receiving ingredients', () => {
		//can't add onInitIngredients here as the component is 
		//	already instantiated
		wrapper.setProps({ ings: { salad: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});