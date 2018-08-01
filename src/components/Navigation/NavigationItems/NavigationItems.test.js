import React from 'react';

import { configure, shallow } from 'enzyme'; // Shallow to render individual component
import Adapter from 'enzyme-adapter-react-16'; // Adapter to connect with react

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
 
configure({adapter: new Adapter()});

// First Argument is Just Description bundle test
// Second Argument is testing function
describe('<NavigationItems />>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    }) ;
    // Individual Test
    // First Arg Description show in console
    // Second Arg description the actual test
    // Test unauthenticated
    it('Should Render two <NavigationItem /> elements if not authenticated', () => {
        // Then use enzyme to test this component stand alone not the full app
        // Isolated Test
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    // Test authenticated
    it('Should Render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        // or
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    // Test if contain logout navitem
    it('Should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual((true))
    })
});