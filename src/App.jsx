import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Instruction from './components/basic/Instruction';
import Play from './components/basic/Play';
import Summary from './components/basic/Summary';

class App extends Component {
	
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/play/instructions" component={Instruction}/>
					<Route exact path="/play/game" component={Play} />
					<Route exact path="/play/summary" component={Summary} />
				</Switch>
			</BrowserRouter>
			);
	}
}

export default App;