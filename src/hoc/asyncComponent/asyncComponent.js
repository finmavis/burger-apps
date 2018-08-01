import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                // The component we loaded dynamicly
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render() {
            const C = this.state.component;
            
            // Then return as component
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent;