import React, { Component } from 'react';
import Patient from './Patient';
import Sick from './Sick';
import RecordMedical from './RecordMedical';

export default class Content extends Component {
constructor(props){
    super();
    this.state = {
      patient:{}
        
    }

}
handlepatientData = () => {
    
}
componentDidMount =()=>{
    // console.log(this.props.patientData)
}

setSickShowByPatient=(patient)=>{
  this.setState({
    patient

  })
  console.log(patient.id)

}


  render() {
      if(typeof this.props.message !== "undefined"){
          return (
            <div className=" contentlayout content-wrapper">
            <div className="column is-4 is-offset-4">
            <div className="notification is-danger">
              <button className="delete"></button>
              { this.props.message }
            </div>
          </div>
          </div>
          )
      }else {
    return (
      <div className=" contentlayout content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
              
              <Patient setSickShowByPatient ={this.setSickShowByPatient}  getSickbypatient={this.props.getSickbypatient} patientData = {this.props.patientData}/>

              <Sick  getRecordMedecal= {this.props.getRecordMedecal} patient= {this.state.patient} sickCodeByPatient = {this.props.sickCodeByPatient}/>

              <RecordMedical patient={this.state.patient}  recordMedical= {this.props.recordMedical} />
            
              
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

}