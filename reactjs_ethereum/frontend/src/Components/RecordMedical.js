import React, { Component } from 'react';

class RecordMedical extends Component {
    constructor(props){
        super();
    
    }

  render() {
    return (
        <div className="col-md-3">
        <a href="#">
                                <span>Record by </span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                            <ul>
          {
              this.props.recordMedical.map((data)=>
          
          <li  className="input2">
          <h2>{data.description} </h2>
          <a >{data.realTime}</a>
              </li>

              )
          }
      
        </ul>  
          
         </div>
    )
  }
}

export default RecordMedical;