
class TestComponent extends React.Component {
    constructor(){
        super();

        this.state=({
            editState: "edit-state",
            recipes: JSON.parse(localStorage.recipes),
            testRecipes : [
        {
            recipeName: "Tuna Mornay",
            ingredients:    ["tuna","flour","salt","butter","milk","spring onions"],
            methodSteps:        ["melt butter", 
            "mix flour with melted butter", "mix milk into the flour and butter slowly" ]
        },
        {
            recipeName: "Tuna Bake",
            ingredients:    ["tuna","flour","salt","butter","milk","spring onions"],
            methodSteps:        ["melt butter", 
            "mix flour with melted butter", "mix milk into the flour and butter slowly" ]
        }
        ]
    })
    
    if(this.state.recipes.length < 1){
        console.log("length of recipes: "+ this.state.recipes.length)
        this.state.recipes = this.state.testRecipes;
    }

    }
    
    render(){
        
        return (
    <div> 
        <h3>React is Go!</h3> 
            <button onClick={this._save.bind(this)}>Save</button>       
            <button onClick={this._newRecipe.bind(this)}>New Recipe</button>       

        <div className="container">
            {this.state.recipes.map((recipe, i) => 
            <Recipe key={i} recipe={recipe} deleteRecipe={ this._removeRecipe.bind(this) } i={i} recipes={this.state.recipes}  />)}
        </div>
    </div>
        );
    }

    _removeRecipe(recipes, i){
        console.log("Delete Recipe");
        console.log(this.state);
        console.log(i);
        
        recipes.splice(i,1);
        this.forceUpdate();
    }

    _save(){
        console.log(this.state.recipes)
      localStorage.setItem("recipes", (JSON.stringify(this.state.recipes) )   );    
    }

    _newRecipe(){
        console.log("New Recipe: ")
        let recipes = this.state.recipes;
        let newRecipe = {
            recipeName: "New Recipe",
            ingredients:    [],
            methodSteps:    []
        }
        recipes.unshift(newRecipe);
        this.setState({recipes: recipes});
    }

}

    
class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.editState = "edit-div-hidden";
        this.detailsState = "details-div-visible"
        this.focus = this.focus.bind(this);
    }

    focus() {
        // Explicitly focus the text input using the raw DOM API
        this.recipeName.focus();
        this.newIngredient.focus();
        this.newMethodStep.focus();
    }

    render(){
        return(
        <div className="recipe">
            <div className="recipe-header"><a href="#" onClick={this._showDetailsPane.bind(this)}>{this.props.recipe.recipeName}</a></div>                
                <button className={"edit-button " + this.detailsState} onClick={this._enableEdit.bind(this)}>Edit</button>
                
                <button className={this.editState + " " + this.detailsState} onClick={ () => this.props.deleteRecipe(this.props.recipes, this.props.i) } >Delete Recipe</button>
            <div className={"details-pane "+ this.detailsState} >                


                <div className={this.editState}> 
                    Recipe Name    <input type="text" className="heading-1" defaultValue={this.props.recipe.recipeName} onChange={this._editRecipeName.bind(this)}
                                    ref={(input)=> this.recipeName = input} ></input>
                </div>


                Ingredients<br />
                <ul>
                    {this.props.recipe.ingredients.map((ingredient, i) =>  
                    <Ingredient key={i} ingredient={ingredient} editState={this.editState} onClick={() => this._removeIngredient(i) } />
                         ) }
                </ul>
                <div className={this.editState}> 
                    <input type="text" ref={(input) => this.newIngredient = input }></input>
                    <button onClick={this._addIngredient.bind(this)}>Add Ingredient</button>
                </div>

                Methods<br />
                <ol>
                    {this.props.recipe.methodSteps.map((methodStep, i)=> 
                    <MethodSteps key={i} methodStep={methodStep} editState={this.editState} onClick={() => this._removeMethodStep(i) }/> ) }
                </ol>
                <div className={this.editState}> 
                    <input type="text" ref={(input)=> this.newMethodStep = input} ></input>
                    <button onClick={this._addMethodStep.bind(this)}>Add Method Step</button>
                </div>

            </div>
        </div>
        
        );
    }



    _showDetailsPane(){
        console.log("detailsState: "+ this.detailsState );

        this.detailsState = ((this.detailsState === "details-div-visible" )? "details-div-hidden": "details-div-visible")
        this.forceUpdate();
    }

    _removeMethodStep(i){
        this.props.recipe.methodSteps.splice(i,1);
        {console.log(this.props.recipe)}
        this.forceUpdate();
    }

    _removeIngredient(i){
        this.props.recipe.ingredients.splice(i,1);
        {console.log(this.props.recipe)}
        this.forceUpdate();
    }

    _popIngredient(){
        this.props.recipe.ingredients.pop();
        {console.log(this.props.recipe)}
        this.forceUpdate();
    }

    _enableEdit(){
        console.log("editState: "+ this.editState );

        this.editState = ((this.editState === "edit-div-visible" )? "edit-div-hidden": "edit-div-visible")
        this.forceUpdate();
    } 

    _editRecipeName(){
        let newRecipeName = this.recipeName.value;
        console.log("edit Recipe Name: " + newRecipeName);
        this.props.recipe.recipeName = newRecipeName;
        this.forceUpdate();
    }

    _addIngredient(){
        let newIngredient = this.newIngredient.value;
        console.log("new Ingredient: "+ newIngredient);
        this.props.recipe.ingredients.push(newIngredient);
        this.newIngredient.value = "";
        this.forceUpdate();
    }

    _addMethodStep(){
        let newMethodStep = this.newMethodStep.value;
        console.log('edit pane changed');
        console.log('method value: '+ newMethodStep);
        this.props.recipe.methodSteps.push(newMethodStep);
        this.newMethodStep.value = "";
        this.forceUpdate();
    }

}

class Ingredient extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <li>{this.props.ingredient} <button onClick={this.props.onClick}  className={this.props.editState}> Delete </button> 
            
            </li>
        );
    }


}

class MethodSteps extends React.Component{
    render(){
        return(
            <li>{this.props.methodStep} <button onClick={this.props.onClick}  className={this.props.editState}> Delete </button> </li>
        )
    }
}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)
