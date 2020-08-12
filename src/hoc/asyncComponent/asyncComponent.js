//code from asyncComponent.js from the past project:
//routingMultiPageFeelButSinglePageApp or something like that
import React, { Component } from 'react';
//Code splitting or Lazy Loading
//  to avoid loading components we might not use
//  useful in big React apps

const asyncComponent = (importComponent) => {
	return class extends Component {
		state = {
			component: null
		}

		componentDidMount() {
			importComponent()
				.then(cmp => {
					this.setState({ component: cmp.default });
				})
		}

		render() {
			const C = this.state.component;
			return C ? <C {...this.props} /> : null;
		}
	}
}

export default asyncComponent;