import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import question from '../../assets/question.json';
import Modal from 'react-modal';
import correctSound from '../../assets/sound/Correct-answer.mp3';
import wrongSound from '../../assets/sound/Wrong-answer.mp3';


Modal.setAppElement("#root");

export default class Play extends React.Component {

	constructor(props){

		super(props);

		this.state = {
			questions:question,
			currentQuestion:{},
			nextQuestion:{},
			previousQuestion:{},
			answer:'',
			numberOfQuestions:0,
			numberOfAnsweredQuestions:0,
			currentQuestionIndex:0,
			score:0,
			correctAnswers:0,
			wrongAnswers:0,
			hint:3,
			fiftyfifty:2,
			usedFiftyfifty:false,
			time:{},
			correctModal:false,
			wrongModal:false,
			prevRandomNum:[],
		}
		this.correctSoundRef = React.createRef();
		this.wrongSoundRef = React.createRef();

	}

	componentDidMount = ()=>{
		this.displayQuestion(this.state);
	}

	displayQuestion = ({questions, currentQuestion, nextQuestion, previousQuestion, currentQuestionIndex})=>{
		if(questions.length){
			currentQuestion = questions[currentQuestionIndex];
			nextQuestion = currentQuestionIndex+1;
			previousQuestion = currentQuestionIndex-1;
			
			let answer = currentQuestion.answer;

			this.setState({
				currentQuestion,
				nextQuestion,
				previousQuestion,
				answer,
				prevRandomNum:[],
				usedFiftyfifty:false,
			}, ()=>{
				this.showOption();
			})
		}
	}

	handleOption = (e)=>{
		if(e.target.innerText.toLowerCase() === this.state.answer.toLowerCase()){
			this.correctSoundRef.current.play();
			this.setState({correctModal:true});
			this.correctAns();
		}
		else{
			this.wrongSoundRef.current.play();
			this.setState({wrongModal:true});
			this.wrongAns();
		}
	}

	handleNextQuestion = ()=>{
		if(this.state.numberOfQuestions >= this.state.questions.length){
			 alert("game finished");
			 this.endGame();
			 return;
		}else{
			this.setState({
				correctModal:false,
				wrongModal:false,
			}, ()=>{
				this.displayQuestion(this.state);
			});
		}

	}

	correctAns = ()=>{
		this.setState(prevState =>({
			score:prevState.score+10,
			correctAnswers:prevState.correctAnswers+1,
			currentQuestionIndex:prevState.currentQuestionIndex+1,
			numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1,
			numberOfQuestions:prevState.numberOfQuestions+1
		}) );
	}

	wrongAns = ()=>{
		this.setState(prevState =>({
			score:prevState.score-5,
			wrongAnswers:prevState.wrongAnswers+1,
			currentQuestionIndex:prevState.currentQuestionIndex+1,
			numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1,
			numberOfQuestions:prevState.numberOfQuestions+1
		}));
	}

	handleNextBtn = ()=>{
		if(this.state.numberOfQuestions+1 >= this.state.questions.length){
			 alert("game finished");
			 this.endGame();
			 return;
		}
		else if(this.state.nextQuestion !== undefined){
			this.setState((prevState)=>({
				currentQuestionIndex:prevState.currentQuestionIndex+1,
				numberOfQuestions:prevState.numberOfQuestions+1
			}), ()=>{
				this.displayQuestion(this.state);
			})
		}
	}

	handlequitBtn = ()=>{
		if(window.confirm('are you sure you want to quit' )){
			this.props.history.push('/');
		}
	}

	showOption = () =>{
		document.querySelectorAll('.option').forEach(op=>{
			op.style.visibility = 'visible';
		})
	}

	hide1Option = (options, correctIndex) => {
		while(true){
			let some = Math.floor(Math.random()*4);
			if(some !== correctIndex && !this.state.prevRandomNum.includes(some)){
				options[some].style.visibility = "hidden";
				this.setState((prevState)=>({
						hint:prevState.hint-1,
						prevRandomNum:[...prevState.prevRandomNum, some],
					}));
				break;
			}
			if(this.state.prevRandomNum.length >= 3){
				alert('all wrong options are omitted');
				break;
			}
		}
	}

	hide2Option = (options, correctIndex)=>{
		let count = 0;
		while(true){
			let some = Math.floor(Math.random()*4);
			if(some !== correctIndex && !this.state.prevRandomNum.includes(some)){
				options[some].style.visibility = "hidden";
				count++;
				this.setState(prevState=>({
								prevRandomNum:[...prevState.prevRandomNum, some]
				}));
				if(count >=2){
					this.setState((prevState)=>({usedFiftyfifty:true, fiftyfifty:prevState.fiftyfifty-1}));
					break;
				}
				if(this.state.prevRandomNum.length >= 3){
					alert('all wrong options are omitted');
					break;
				}
			}
		}
	}

	handleLifeline = (lifeline)=>{
		if(lifeline === 'hint' && this.state.hint<=0){
			return alert('you have used all hint lifeline');
		}

		if(lifeline === 'fiftyfifty' && this.state.fiftyfifty <=0){
			return alert('you have used all fifty-fifty lifeline');
		}else if(lifeline === 'fiftyfifty' && this.state.usedFiftyfifty){
			return alert('you have used fifty-fifty for this question');
		}

		let options = document.querySelectorAll('.option');
		let correctIndex;

		options.forEach((opt,index)=>{
			if(opt.innerText.toLowerCase() === this.state.answer.toLowerCase()){
				correctIndex = index;
			}
		})
		if(lifeline === 'hint'){
			this.hide1Option(options, correctIndex);
		}
		else if(lifeline === 'fiftyfifty'){
			this.hide2Option(options, correctIndex);
		}
	}

	endGame = () => {
		let playerStats = {
			totalQuestion: this.state.questions.length,
			numberOfAnsweredQuestions :this.state.numberOfAnsweredQuestions,
			score:this.state.score,
			correctAnswers:this.state.correctAnswers,
			wrongAnswers:this.state.wrongAnswers,
			hint:3-this.state.hint,
			fiftyfifty:2-this.state.fiftyfifty,
		}	
		this.props.history.push('/play/summary', playerStats);
	}


	render() {
		let {currentQuestion, numberOfQuestions, correctModal, wrongModal, answer, fiftyfifty, hint} = this.state;
		return (
			<Fragment>
			<Helmet>
				<title>Game started... - Let's Quiz</title>
			</Helmet>
			<section id="play-quiz">
			
			<Fragment>
				<audio ref={this.correctSoundRef} src={correctSound}></audio>
				<audio ref={this.wrongSoundRef} src={wrongSound}></audio>
			</Fragment>

			<Modal isOpen={correctModal} 
					style={{
						content : {
					    top: '50%',
					    left: '50%',
					    right: 'auto',
					    bottom: 'auto',
					    marginRight: '-50%',
					    transform: 'translate(-50%, -50%)'
  							}}
					}>
				<center><h1>Yeaaa!!!!! <span role="img" aria-label="rock">🎉🎉🎉</span> Correct Answer</h1>
				<button className="buttons" onClick={this.handleNextQuestion} style={{backgroundColor:'green'}}>Next</button></center>
			</Modal>

			<Modal isOpen={wrongModal} 
					style={{
						content : {
					    top:'50%',
					    left:'50%',
					    right:'auto',
					    bottom:'auto',
					    marginRight:'-50%',
					    transform:'translate(-50%, -50%)'
  							}}
					}>
				<center><h1>Opps!!! <span role="img" aria-label="cry face">😢</span> wrong Answer <br/> correct Answer was "{answer}"</h1>
				<button className="buttons" onClick={this.handleNextQuestion} style={{backgroundColor:'green'}}>Next</button></center>
			</Modal>

				<div className="question">
					<div className="timer flex">
						<p><span role="img" style={{fontSize:'20px'}}  aria-label="clock">🕒 1:00</span></p>
						<p><span role="img"  aria-label="remaining">{numberOfQuestions+1} out of 15</span></p>
						<div className="lifeline flex">
							<p><abbr title="hint"><span onClick={()=> this.handleLifeline('hint')} style={{fontSize:'40px'}} role="img"  aria-label="bulb">💡</span></abbr>&nbsp;&nbsp;&nbsp;&nbsp;{hint}</p>
							<p><abbr title="50/50"><span onClick={()=> this.handleLifeline('fiftyfifty')} style={{fontSize:'40px'}} role="img"  aria-label="50/50">👐</span></abbr>&nbsp;&nbsp;&nbsp;&nbsp;{fiftyfifty}</p>
						</div>
					</div>
					
					<h2>{currentQuestion.question}</h2>
					<div className="option-container">
						<p onClick={this.handleOption} className="option">{ currentQuestion.optionA }</p>
						<p onClick={this.handleOption} className="option">{ currentQuestion.optionB }</p>
						<p onClick={this.handleOption} className="option">{ currentQuestion.optionC }</p>
						<p onClick={this.handleOption} className="option">{ currentQuestion.optionD }</p>
					</div>
					<div className="btn-container flex">
						<button onClick={this.handleNextBtn} className="buttons" style={{backgroundColor:'green'}}>Skip</button>
						<button onClick={this.handlequitBtn} className="buttons" style={{backgroundColor:'red'}}>Quit</button>
					</div>
				</div>
			</section>
			</Fragment>
		);
	}
}