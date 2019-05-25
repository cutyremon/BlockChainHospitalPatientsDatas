import React, { Component } from 'react';

class Patient extends Component {
  constructor(props) {
    super();
    this.state = {

    }

  }

  getSickCode = (id, name,cmt,age,gender) => {
    console.log(id);
    this.props.getSickbypatient(id);
    this.props.setSickShowByPatient({ id,name,cmt,age,gender});

  }

  render() {
    return (
      <div className="col-md-3">
      
        <a href="#">
          <span>Patient Name</span>
          <span className="pull-right-container">
          </span>
        </a>
        <ul>
          {
            this.props.patientData.map((data) =>

              <li className="input2">
                <a onClick={event => this.getSickCode(data[0].c, data[1],data[2],data[3].c,data[4].c)} >{data[1]}</a>
              </li>

            )
          }

        </ul>
      </div>
    )
  }
}

export default Patient;