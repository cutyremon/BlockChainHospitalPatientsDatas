import React, { Component } from 'react';
import Hospital from './Hospital';

export default class ContentSendPatient extends Component {
constructor(props){
    super();
    this.state = {
      PatientDetail:{name:"nonane",cmt:0,age:0,sex:0,live:false}
        
    }

}
handlSetPatientTransport=(id)=>{
  this.props.patientData.map((data)=>{
    if(data[0].c==id){
      let name = data[1];
      let cmt= data[2].toNumber();
      let age = data[3].toNumber();
      let live = data[4];
      this.setState({
        PatientDetail:{name,cmt,age,live}
        
      })
      console.log("data" + data+ typeof(data));
    }
  })

  this.props.setPatientTransport(id);

  console.log(id + "show ra rooi" + this.state.PatientDetail)

}



  render() {
     
    return (
      <div className=" contentlayout content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-md-3">
              <div className="box">
              <a href="#">
                                <span>Patient Name</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
        <ul>
          {
              this.props.patientData.map((data)=>
          
          <li  className="input2">
          <a onClick= {event => this.handlSetPatientTransport(data[0].c)} >{data[1]}</a>
              </li>

              )
          }
      
        </ul>
              
              </div>
            </div>
            <div className="col-md-3">
            <ul>
              <li>Name:{this.state.PatientDetail.name}</li>
              <li>Age:{this.state.PatientDetail.age}</li>
              <li>cmt:{this.state.PatientDetail.cmt}</li>
            </ul>
            


            </div>
            <div className="col-md-3">
            <Hospital setToHospital ={ this.props.setToHospital}/>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
