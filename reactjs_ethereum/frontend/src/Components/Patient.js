import React, { Component } from 'react';

class Patient extends Component {
    constructor(props){
        super();
        this.state = {
            
        }
    
    }

    getSickCode = (id,name)=>{
        console.log(id);
        this.props.getSickbypatient(id);
        this.props.setSickShowByPatient({id,name});
      
      } 

  render() {
    return (
        <div className="col-md-3">
        <form>
      <label>
        Name:
       <input type="text" name="name" />
      </label>
    <input type="submit" value="Submit" />
      </form>
        <a href="#">
                                <span>Patient Name</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
        <ul>
          {
              this.props.patientData.map((data)=>
          
          <li  className="input2">
          <a onClick= {event => this.getSickCode(data[0].c,data[1])} >{data[1]}</a>
              </li>

              )
          }
      
        </ul>
         </div>
    )
  }
}

export default Patient;