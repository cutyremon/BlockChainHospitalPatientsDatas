import React, { Component } from 'react';

class CreatePatient extends Component {
  constructor(props) {
    super();
    this.state = {
      name:"",
      cmt:"",
      age:0,
      gender:0

    }

  }

  HandleSubmit = () => {
console.log("name:" +this.state.name + "cmt : " + this.state.cmt)
this.props.createPatient(this.state.name,this.state.cmt,this.state.age,this.state.gender);

  }

  render() {
    return (
      <div className=" contentlayout content-wrapper " >

        <h2>Initialize patients</h2>
        <div className="col-md-4">
          <div className="form-group ">
            <label htmlFor="example1">First and last name</label>
            <input type="text" id="example1" onChange={event=>this.setState({name:event.target.value})} className="form-control form-control-lg" />
          </div>
          <div className="form-group">
            <label htmlFor="example2">Citizen identification number</label>
            <input type="text" id="example2"  onChange={event=>this.setState({cmt:event.target.value})} className="form-control form-control-md" />
          </div>
          <div className="form-group">
            <label htmlFor="example3">Age</label>
            <input type="number" id="example3" onChange={event=>this.setState({age:event.target.value})} value={this.state.age } className="form-control" min="1" max="100" />
          </div>
          <div className="form-group">
            <label htmlFor="example3">Gender</label>
            <br />
            <input type="radio" onClick={event => this.setState({gender:1})} name="gender" value="1" className="" /> Male<br />
            <input type="radio" onClick={event => this.setState({gender:2})} name="gender" value="0" className="" /> Female<br />
            <input type="radio"  onClick={event => this.setState({gender:0})} name="gender" value="2" /> Other <br />
          </div>
          <input type="submit" value="Submit" onClick={event=>this.HandleSubmit()} />

        </div>
      </div>
    )
  }
}

export default CreatePatient;