import React, { Component } from 'react';

class Patient extends Component {
  constructor(props) {
    super();

  }

  getSickCode = (id) => {
    console.log(id);
    this.props.getSickbypatient(id);

  }
  getRecordMedecal = (id, sickCode) => {


    this.props.getRecordMedecal(id, sickCode);
  }

  render() {
    return (
      <div className="col-md-3">
        <a href="#">
          <span>Sick by {this.props.patient.name}</span>
          <span className="pull-right-container">
          </span>
        </a>
        <ul>
          {
            this.props.sickCodeByPatient.map((data) =>

              <li className="input2">
                <a onClick={event => this.getRecordMedecal(this.props.patient.id[0], data.sickCode)}>{data.name}</a>
                {/* <p> {data.sickCode}</p> */}
              </li>

            )
          }

        </ul>
      </div>
    )
  }
}

export default Patient;