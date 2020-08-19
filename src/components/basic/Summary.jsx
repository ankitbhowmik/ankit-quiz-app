import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Summary extends React.Component {

	state = {
		totalQuestion:0,
		numberOfAnsweredQuestions :0,
		score:0,
		correctAnswers:0,
		wrongAnswers:0,
		hint:0,
		fiftyfifty:0,
	}

	componentDidMount = () =>{
		const { state } = this.props.location;
		if(state !== undefined){
			this.setState({
				totalQuestion:state.totalQuestion,
				numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
				score:state.score,
				correctAnswers:state.correctAnswers,
				wrongAnswers:state.wrongAnswers,
				hint:state.hint,
				fiftyfifty:state.fiftyfifty
			})
		}
	}

	render() {
		if(this.props.location.state !== undefined){
			let percentage = (this.state.score/(this.state.totalQuestion*10))*100;
			let remark = (percentage <= 20) ? 'you need to improve' :(percentage <= 40) ? 'you can improve' : (percentage <= 60) ? 'good you can do better' : (percentage<= 80) ? 'superb you are awesome' : (percentage <= 95) ? 'you are very talented' : (percentage === 100) ? 'you scroed full marks' : 'very good'; 
			return (
				<React.Fragment>
				<Helmet>
					<title>Summary - Let's play</title>
				</Helmet>

				<div className="score-table">
					<h1>Quiz Ended successfully</h1>
					<h2>You scored <span style={{color:'red'}}>{this.state.score}/{this.state.totalQuestion*10}</span></h2>
					<h4>{remark}</h4>
					<table>
						<tbody>
							<tr>
								<td>Total Question Attempted</td>
								<td>{this.state.numberOfAnsweredQuestions}</td>
							</tr>
							<tr>
								<td>Total Correct Answer</td>
								<td>{this.state.correctAnswers}</td>
							</tr>
							<tr>
								<td>Total Wrong Answer</td>
								<td>{this.state.wrongAnswers}</td>
							</tr>
							<tr>
								<td>Total hint used</td>
								<td>{this.state.hint}</td>
							</tr>
							<tr>
								<td>Total fifty fifty used</td>
								<td>{this.state.fiftyfifty}</td>
							</tr>
						</tbody>
					</table> <br/><br/>
					<Link className="buttons" to="/play/game" >Play Again</Link>
					<Link className="buttons" to="/">Go to Home Page</Link>
				</div>

				</React.Fragment>
			)
		}
		else{
			return (
				<h1 style={{textAlign:'center'}}>NO STATS AVAILABLE</h1>
			)
		}
	
	}


}
