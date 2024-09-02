import './App.css';

function App() {
    	return (
		<div className="container">
			<header>
				<h1>cakeu.dev</h1>
				<nav className='navigation'>
					<button>Home</button>
					<button>Portfolio</button>
					<button>Contact</button>
				</nav>
			</header>
			<div className='body'>
				<h1 className="home-title">hi, i'm cakeu!</h1>
				<h2 className="home-subtext">i make</h2>
				<ul className="home-ul">
					<li className="home-li">Games</li>
					<li className="home-li">User Interfaces</li>
					<li className="home-li">Websites</li>
					<li className="home-li">Videos</li>
				</ul>
			</div>
		</div>
    	);
}

export default App;
