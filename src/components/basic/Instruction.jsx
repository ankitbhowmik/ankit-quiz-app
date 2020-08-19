import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Instruction = (props) => (
	<React.Fragment>
		<Helmet>
			<title>Instructions - Let's Quiz</title>
		</Helmet>

		<section id="quiz-instruction">
			<h1>Before you start the game let me show you how to play</h1>
			<h2>Rules</h2>
			<ul className="instructions">
				<li>There are a total of 15 question</li>
				<li>For every correct Answer you will get 10 points</li>
				<li>For every incorrect Answer 5 points will be deducted <span role="img" aria-label="demon face" style={{fontSize:'34px'}}>👹</span></li>
				<li>If Answer is skipped no marks will be deducted not added</li>
				<li>You will get a total of 5 lifeline
					<ol>
						<li><span style={{fontSize:'40px'}} role="img"  aria-label="bulb">💡</span> &nbsp;&nbsp; 1 WRONG OPTION OMMIT</li>
						<li><span  style={{fontSize:'40px'}} role="img"  aria-label="50/50">👐</span> &nbsp;&nbsp; FIFTY FIFTY</li>
					</ol>
				</li>
				<li>If clicked on <span style={{fontSize:'40px'}} role="img"  aria-label="bulb">💡</span> one wrong option will be ommited out of four</li>
				<li>If clicked on <span  style={{fontSize:'40px'}} role="img"  aria-label="50/50">👐</span> two wrong option will be ommited out of four</li>
				<li>Please forgive me for the ugly design I focused only for the game logic</li>
			</ul> <br/> <br/><br/>
			<div className="start">
				<Link to="/">No i want to go back</Link>
				<Link to="/play/game">Okay I'am ready</Link>
			</div>
		</section>
	</React.Fragment>
  )
export default Instruction;