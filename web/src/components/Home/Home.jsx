import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Select from 'react-select';
import InlineSVG from 'svg-inline-react';


class Home extends React.Component {
constructor(props) {
   super(props);
   this.state = {
       svgImage : [],
       input : [],
       unit : "miles",
       optimization : "None"
   };

}

render() {

    var options = [];
    for (var i = 0; i < (this.props.columns.length); i++) {
        var ob = new Object();
        ob.value=this.props.columns[i];
        ob.label=this.props.columns[i];
        options.push(ob);
    }

    var myDiv = document.getElementById("searchResult");
    for (var i = 0; i < (this.props.queryResults.length); i++) {
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.value = this.props.queryResults[i];
        myDiv.appendChild(checkBox);
        myDiv.appendChild(label);
        label.appendChild(document.createTextNode(this.props.queryResults[i]));
    }
    console.log("myDiv", myDiv);

    let total = this.props.totalDist; //update the total here
    let svg = this.props.svg;
    let txtSearch;
    let displaySVG;
    let renderedSvg;
    if(this.props.svg){
        displaySVG = <InlineSVG src={svg}></InlineSVG>;

    }

    return <div className="home-container">

<div className="inner">
    <div id="background"></div>

  <p className="w3-myFont"><h2>T02 NEKA</h2></p>

  <div className="optimization">
        Select your optimizations:<p></p>
        <button type="button" onClick={this.milesClicked.bind(this)}>Miles</button>
        <button type="button" onClick={this.kiloClicked.bind(this)}>Kilometers</button>
        <p></p>
        <button type="button" onClick={this.NoneClicked.bind(this)}>None</button>
        <button type="button" onClick={this.NNClicked.bind(this)}>Nearest Neighbor</button>
        <button type="button" onClick={this.TwoOptClicked.bind(this)}>2-opt</button>
        <button type="button" onClick={this.ThreeOptClicked.bind(this)}>3-opt</button>
  </div>
  <p></p>

  <div id="searchResult">
    <input type="checkbox" value="test"/>
    <label>Test</label>
    {this.props.searchResult}
  </div>

  <div className="app-container">
    <form onSubmit={this.handleSubmit.bind(this)}>
        <input id="searchTB" size="35" className="search-button" type="text"
        onKeyUp={this.keyUp.bind(this)} placeholder="What are you searching for?" autoFocus/>
        <input id="subButton" type="submit" value="Submit" />
    </form>
  </div>

  <button type="button" onClick={this.buttonClicked.bind(this)}>Click here for an SVG</button>
  <p></p>
  {displaySVG}
  <p></p>

  <div className="Itinerary">
    <div id="Itin" >
        <p className="w3-myFont"><h3>Itinerary</h3></p>
        <p></p>
        <table className="pair-table">
            <tr>
                <td><h8><b><p className="w3-myFont"> Start Name </p></b></h8></td>
                <td><h8><b><p className="w3-myFont"> End Name </p></b></h8></td>
                <td><h8><b><p className="w3-myFont"> Distance (mi) </p></b></h8></td>
                <td><h8><b><p className="w3-myFont"> Total Distance (mi)</p></b></h8></td>
            </tr>
            {this.props.pairs}
            <tbody>
                 <tr>
                    <td colSpan="4"><p className="w3-myFont">Total:</p></td>
                    <td>{total}</td>
                 </tr>
            </tbody>
        </table>
    </div>

    <div id="Prefs" >
         <p className="w3-myFont"><h3>Choose Preferences</h3></p>
         <div className = "select-value">
         <Select
              name="form-field-name"
              options={options}
              onChange={this.props.onClick}
              simpleValue = {true}
              closeOnSelect = {false}
              multi={true}
              searchable = {false}
              backspaceToRemoveMethod=""
         />
    </div>
  </div>
</div>
</div>
</div>
}

keyUp(event) {
    if (event.which === 13) { // Waiting for enter to be pressed. Enter is key 13: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        this.props.fetch("query", this.state.input, this.state.unit, this.state.optimization); // Call fetch and pass whatever text is in the input box
        //console.log("event 13 thing");
    } else {
        this.setState({
            input: event.target.value
        });
        //console.log("casual else block");
    }
}

handleSubmit(event) {
    this.props.fetch("query", this.state.input, this.state.unit, this.state.optimization);
    //console.log("handle submit");
    event.preventDefault();
}

buttonClicked(event) {
    this.props.fetch("svg", event.target.value, this.state.unit, this.state.optimization);
}

milesClicked(event){
    this.setState({
        unit : "miles"
    });
    console.log("Units are miles");
}

kiloClicked(event){
    this.setState({
        unit : "km"
    });
    console.log("Units are km");
}

NoneClicked(event){
    this.setState({
        optimization : "None"
    });
    console.log("Opt is none");
}

NNClicked(event){
    this.setState({
        optimization : "NearestNeighbor"
    });
    console.log("Opt is NearestNeighbor");
}

TwoOptClicked(event){
    this.setState({
        optimization : "TwoOpt"
    });
    console.log("Opt is TwoOpt");
}

ThreeOptClicked(event){
    this.setState({
        optimization : "ThreeOpt"
    });
    console.log("Opt is ThreeOpt");
}


}

export default Home
