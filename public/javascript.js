$(document).ready(function(){
console.log("Loaded JS");

        jQuery("#projects-button").click(function() {
            jQuery('html, body').animate({
                scrollTop: $("#projects-container").offset().top
            }, 2000);
        });

        jQuery(".button-collapse").sideNav();

});

class Navbar extends React.Component{
    constructor(){
        super();
    }

    _projectsClicked(){

    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="#" target="_blank" className="brand-logo heading-name"></a>
                    <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">    
                        <li>
                            <a target="_blank" href="https://github.com/culling/">Github</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://codepen.io/culling/">Codepen</a>
                        </li>
                        <li>
                            <a href="#" id="projects-button"  >Projects</a>
                        </li>
                    </ul>
                  <ul className="side-nav" id="mobile-menu">
                        <li>
                            <a target="_blank" href="https://github.com/culling/">Github</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://codepen.io/culling/">Codepen</a>
                        </li>
                        <li>
                            <a href="#" id="projects-button"  >Projects</a>
                        </li>                    
                    
                  </ul>
                </div>
            </nav>        )
    }
}

class MyInfoContainer extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="bio-container container" >
                
                <div className="card">
                    
                    <div className="bio-heading">
                        Gene Culling
                    </div>

                    <div className="card-stacked">
                        <br />
                        <div className="bio-sub-heading">
                            Full Stack Javascript developer with experience in Systems Administration
                        </div>
                        <div className="bio-details">
                            <ul>
                                <li>10 years Systems Administration and Helpdesk experience, leaning heavily on scripts to automate workflow</li>
                                <li>Free Code Camp Front End, Data Visualisation and Back End Completed</li>
                                <li>Self-motivated and passionate about learning new solutions and technologies.</li>
                            </ul>
                        </div>
                        <br />
                        <span className="bio-tags-icons-heading">Technologies</span>
                        <div  className="bio-tags-icons">

                            <span className="dev-icon devicon-html5-plain"></span>
                            <span className="dev-icon devicon-jquery-plain-wordmark"></span>
                            <span className="dev-icon devicon-css3-plain"></span>
                            <span className="dev-icon devicon-javascript-plain"></span>
                            <span className="dev-icon devicon-mongodb-plain-wordmark"></span>
                            <span className="dev-icon devicon-express-original"></span>
                            <span className="dev-icon devicon-react-original-wordmark"></span>                    
                            <span className="dev-icon devicon-nodejs-plain"></span>
                            <span className="dev-icon devicon-d3js-plain"></span>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

class PortfolioContainer extends React.Component{
    constructor(){
        super();
        this.state = ({
            projects:[
                {
                    name: "Pinterest Clone",
                    description: "A pintrest clone allowing for users to log in, add images, like other users images and manage their own collections",
                    link: "http://culling-fcc-pintrest.herokuapp.com/",
                    screenshotUrl: "https://github.com/culling/fcc-pintrest/raw/master/docs/screenshot-01.png",
                    github: "https://github.com/culling/fcc-pintrest"
                },
                {
                    name: "Open Library",
                    description: "A Book Trading club, able to add your books, request books from others and have requests made from you",
                    link: "https://culling-fcc-bookswap2.herokuapp.com/",
                    screenshotUrl: "https://github.com/culling/fcc-bookswap-v2/raw/master/docs/screenshot-01.png",
                    github: "https://github.com/culling/fcc-bookswap-v2"
                },
                {
                    name: "Chart the Stock Market - NYSE",
                    description: "Charting the stock market using Socket.IO to allow multiple users to update the stocks listed for all users in real time",
                    link: "https://culling-fcc-stocks-v2.herokuapp.com/",
                    screenshotUrl: "https://github.com/culling/fcc-chart-stocks-v2/raw/master/docs/screenshot-01.png",
                    github: "https://github.com/culling/fcc-chart-stocks-v2"
                },
                {
                    name: "Nightlife Coordination",
                    description: "A nightlife coordination application, allowing users to indicate which bars they plan to go to",
                    link: "https://culling-fcc-tonight-v2.herokuapp.com/",
                    screenshotUrl: "https://github.com/culling/fcc-tonight-v2/raw/master/docs/screenshot-01.png",
                    github: "https://github.com/culling/fcc-tonight-v2"
                },
                {
                    name: "Voting Application",
                    description: "Build a voting application",
                    link: "https://fcc-votes-v2.herokuapp.com/#",
                    screenshotUrl: "https://github.com/culling/fcc-votes-v2/raw/master/docs/screenshot-01.png",
                    github: "https://github.com/culling/fcc-votes-v2"
                }
            ]
        })
    };

    render(){
        return(
            <div className="portfolio-container container">
                <div id="projects-container" className="projects-container row">
                    {this.state.projects &&
                        this.state.projects.map((project, i )=>{
                            return(
                            <ProjectCard key={i} project={project} />
                            )
                        }) 
                    }
                    
                </div>
            </div>
        )
    }
}

class ProjectCard extends React.Component{
    constructor(props){
        super();
    };

    render(){
        return(
            <div className="col s12 m6">
                <div className="card small horizontal">
                    <div className="card-image" >
                        <a href={this.props.project.link}>
                            <img style={{"objectFit": "contain"}} src={this.props.project.screenshotUrl} alt={"screenshot of " + this.props.project.name } />
                        </a>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div className="card-title"> 
                                {this.props.project.name}
                            </div>
                            {this.props.project.description}
                            <div className="card-action">
                                <a href={this.props.project.link}>
                                    Live Page
                                </a>
                                <a href={this.props.project.github}>
                                    <span style={{"fontSize": "2em" }} className="fa fa-github-square"></span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };


}

ReactDOM.render(
    <Navbar />, document.getElementById("navbar")
)

ReactDOM.render(
    <MyInfoContainer />, document.getElementById("info-container")
)

ReactDOM.render (
    <PortfolioContainer />, document.getElementById('mount-point')
);