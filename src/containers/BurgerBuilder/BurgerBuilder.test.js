import React from 'react';

import { configure, shallow } from 'enzyme'; // Shallow to render individual component
import Adapter from 'enzyme-adapter-react-16'; // Adapter to connect with react

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    });

    it('Should Render BuildControls when receiving Ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})