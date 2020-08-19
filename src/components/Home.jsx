import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = (props) => (
	<Fragment>
		<Helmet>
			<title>Let's Quiz</title>
		</Helmet>

   	    <section id="card"> 
   	    	<div className="play-card">
   	    		<div className="play-logo">
   	    			<h3>Let's Quiz</h3>
   	    		</div>
   	    		<div className="play-text">
   	    			<p>This is quiz game made by <br/> Ankit Bhowmik</p>
   	    		</div>
   	    		<div className="play-btn">
   	    			<Link className="buttons play" to="play/instructions">Let's Play</Link>
   	    		</div>
   	    	</div>
   	    </section>
    </Fragment>
  );


export default Home;