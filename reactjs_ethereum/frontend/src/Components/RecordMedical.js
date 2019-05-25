import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import RecordMedicalDetail from './RecordMedicalDetail';


class RecordMedical extends Component {
  constructor(props) {
    super();
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.state = {
      visible: false,
      realTime: "",
      thongtinbenhnhan: [],
      ketquaxetnghiep: [],
      CommentByDoctor: []



    };
  }

  closeModal() {
    this.setState({ visible: false, data: "", realTime: "" });
  }

  openModal(dataRecord, time) {
    // console.log(time + " thoi gian nay vs data la : " + recorddata)
    let nhiptim = dataRecord.split("#");
    let thongtinbenhnhan = nhiptim[0];
    let ketquaxetnghiep = nhiptim[1];
    let CommentByDoctor = nhiptim[2]
    thongtinbenhnhan = thongtinbenhnhan.split(";");
    console.log("thongtinbenhnhan:" + thongtinbenhnhan)
    if (nhiptim[1] == null) {
      alert("khong co ket qua xet nghiem")
    } else {
      ketquaxetnghiep = ketquaxetnghiep.split(";");
      console.log("ketquaxetnghiep:" + ketquaxetnghiep);
    }
    if(nhiptim[2]==null){
      alert("khong co nhan xet cua bac si")
    }else {
    CommentByDoctor = CommentByDoctor.split(";");
    console.log("CommentByDoctor:" + CommentByDoctor)
    }
    this.setState({ visible: true, realTime: time, thongtinbenhnhan, ketquaxetnghiep, CommentByDoctor });
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
            this.props.recordMedical.map((data) =>

              <li className="input2">


                <section>
                  <input type="button" value={data.realTime} onClick={event => this.openModal(data.description, data.realTime)} />
                  <Modal visible={this.state.visible} width="1300" height="660" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                      <RecordMedicalDetail patient = {this.props.patient} thongtinbenhnhan={this.state.thongtinbenhnhan} ketquaxetnghiep={this.state.ketquaxetnghiep}
                        CommentByDoctor={this.state.CommentByDoctor} realTime={this.state.realTime} />
                      <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                  </Modal>
                </section>
              </li>

            )
          }

        </ul>

      </div>
    )
  }
}

export default RecordMedical;