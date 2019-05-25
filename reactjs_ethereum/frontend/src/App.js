import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Medical from './build/contracts/Medical.json';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import 'react-sticky-header/styles.css';
import SideBar from './Components/SideBar';
import Content from './Components/Content';
import { type } from 'os';
import ContentSendPatient from './Components/ContentSendPatient';
import { Route, Switch } from 'react-router-dom';
import CreatePatient from './Components/CreactPatient';


class App extends Component {
  constructor() {
    super();
    this.isWeb3 = true;
    this.isWeb3Locked = false;
    this.appName = "Patient Data";

    this.state = {
      network: "checking...",
      accounts: null,
      medicalContract: null,
      patientData: [],
      sickCodes: [],//show ra cac ban ghi benh cua tat ca cac patient cua user
      sickCodeByPatient: [],//show cac benh cua 1 patient.
      sickDataAll: [], //  tat cac benh trong contract 
      recordMedical: [],// by patient + sickCode
      keyComponentRender: 0,
      patientTransport: null
    };

    let web3 = window.web3;
    if (typeof web3 !== "undefined") {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      this.medicalContract = TruffleContract(Medical);
      this.medicalContract.setProvider(this.web3Provider);

      if (web3.eth.coinbase === null)
        this.isWeb3Locked = true;
    } else {

      this.isWeb3 = false;
    }
  }

  setNetwork = () => {
    let networkName,
      that = this;

    this.web3.version.getNetwork(function (err, networkId) {
      switch (networkId) {
        case "1":
          networkName = "Main";
          break;
        case "2":
          networkName = "Morden";
          break;
        case "3":
          networkName = "Ropsten";
          break;
        case "4":
          networkName = "Rinkeby";
          break;
        case "42":
          networkName = "Kovan";
          break;
        default:
          networkName = networkId;
      }
      that.setState({
        network: networkName
      })
    });
  };

  getPatient = () => {
  }


  componentDidMount = async () => {
    let app = this;
    try {
      this.setNetwork();

      const accounts = this.web3.eth.accounts[0];

      this.setState({
        accounts
      }, this.runExample)
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.log("error to doko");
      console.error(err);
    }
    this.medicalContract.deployed().then(function (instance) {
      let patientdt = instance;
      let patientdt2 = instance;
      instance.getPatientByOwner(app.state.accounts).then(function (ids) {

        console.log("ids:" + ids + " type : " + typeof (ids));

        for (let id of ids) {
          //  let x = id ; 
          patientdt.patients(id).then(function (data) {
            const patientData = app.state.patientData;
            patientData.push(data);
            app.setState({
              patientData
            });

          }, 100);

          patientdt.viewSickCode(id).then(function (data1) {// get sickcode của tất cả patient của user
            let idpatient1 = id.toNumber();
            data1 = data1.map(x => x.toNumber());
            console.log(idpatient1 + typeof (idpatient1) + typeof (data1) + data1);
            // console.log("day la so " + typeof(0) +  " so : " +idpatient1 );
            const sickCodes = app.state.sickCodes;
            sickCodes.push({ idpatient1, data1 })
            app.setState({
              sickCodes
            });
            console.log("ban ghi sick code " + idpatient1 + data1)

          })


        }
      })

      instance._countSick().then(function (count) {
        console.log("sick all " + count);
        for (let id = 0; id < count; id++) {
          patientdt.sicks(id).then(function (data) {
            let name = data[0];
            let sickCode = data[1].toNumber();
            let sickDataAll = app.state.sickDataAll;
            sickDataAll.push({ name, sickCode });
            // console.log("sck " + sic)
            app.setState({
              sickDataAll
            });

          })
        }
      })

    })


  }

  runExample = async () => {
    // const {patientContract}=this.state;
    var userAccount = this.web3.eth.accounts[0];
    // console.log(userAccount.address)
    // this.medicalContract.deployed().then((instance) => {
    //   let that = this;
    //   this.medicalContractDeployed = instance;
    //   this.medicalContractDeployed.CreatePatient("nguyen van cuong", "5453433333", 23, 1, { from: userAccount }).then((response, error) => {
    //     if (response) {
    //       console.log("den day chua");
    //       // console.log("dung " + response);
    //     }
    //     else {
    //       console.log("error cmnr ");
    //       // console.log("error" + error);
    //     }
    //   })
    // })
  }


  getSickbypatient = (patientID) => {
    let app = this;
    // console.log(this.state.sickCodes[0])
    let sickCodes = this.state.sickCodes;
    console.log("id = 0 :" + sickCodes[0])
    sickCodes.forEach(function (x) {
      if (x.idpatient1 == patientID) {
        console.log("data" + x.data1);

        let sickCodeByPatient = [];
        let sickDataAll = app.state.sickDataAll;
        for (let data of x.data1) {
          console.log("dem cai nay xem may cai" + data)
          for (let sickdata of sickDataAll) {
            if (data == sickdata.sickCode) {
              sickCodeByPatient.push(sickdata);
              console.log(sickdata);
            }
          }

        }

        app.setState({
          sickCodeByPatient
        })
      }
    });

    console.log("day la cai xem " + app.state.sickCodeByPatient[0]);

  }

  getRecordMedecal = (id, sickCode) => {
    let app = this;
    // console.log( "id + sickcode" + id + sickCode)
    this.medicalContract.deployed().then((instance) => {
      let contract = instance;
      instance.getRecordMedical(id, sickCode).then((ids) => {
        // console.log("show id by patient " + ids)
        let recordMedical = [];
        for (let id of ids) {
          contract.medicalExaminations(id).then((data) => {

            let number = data[0].toNumber();
            let realTime = this.convertNumberToRealTime(number);
console.log(number + "ban goc kem " + data[1])
            let description = data[1];
            recordMedical.push({ realTime, description });
            console.log(data[0].toNumber() + "ban goc o app.js" + recordMedical);
            app.setState({
              recordMedical
            });
          })
        }
        // app.setState({
        //   recordMedical
        // })
      }).catch((error) => {
        console.log(error)
        alert("benh nhan khong bi mac benh nay , vui long khoi tao benh an");
      })

    })

  }

  convertNumberToRealTime = (number) => {
    let d = new Date();
    d.setTime(number * 1000);
    let dateString = d.toUTCString();  // or d.toString if local time required
    alert(dateString);
    return dateString;

  }
  setPatientTransport = (id) => {
    this.setState({
      patientTransport: id[0]
    })
    console.log(id[0])
  }


  setToHospital = (name, account) => {
    console.log("di chet di" + account);
    let patientID = this.state.patientTransport;
    let userAccount = this.state.accounts;
    let userAccount1 = this.web3.toChecksumAddress(userAccount);
    console.log("account" + userAccount + " , id " + patientID);
    // let account1 = account.toLowerCase(); 
    console.log("from : " + userAccount1 + ",   to : " + account);
    this.medicalContract.deployed().then((instance) => {
      instance.transferFrom(userAccount, account, patientID, { from: userAccount }).then((response) => {

        alert("patient transferred to : " + name);
      }).catch((error) => {
        console.log("error cmnr " + error)
      })

    })


  }
  createPatient = (name,cmt,age,gender)=>{
    let userAccount = this.web3.eth.accounts[0];
    // console.log(userAccount.address)
    this.medicalContract.deployed().then((instance) => {
      let that = this;
      instance.CreatePatient(name,cmt,age, gender, { from: userAccount }).then((response, error) => {
        if (response) {
         alert("More successful patients ")
        }
        else {
          console.log("error:" + error);
          // console.log("error" + error);
        }
      })
    })


  }

  render() {
    if (this.isWeb3) {
      if (this.isWeb3Locked) {
        return (
          <div>
            <Header network={this.state.network} appName={this.appName} />
            <SideBar patientData={this.state.patientData} />
            <Content message="Unlock Your Metamask/Mist Wallet" />

          </div>)
      } else {
        return (
          <div>
            <Header network={this.state.network} appName={this.appName} />
            <SideBar patientData={this.state.patientData} />
            <Switch>
              <Route exact path='/' render={(props) =>
                <Content getSickbypatient={this.getSickbypatient} patientData={this.state.patientData} sickCodeByPatient={this.state.sickCodeByPatient}
                  sickDataAll={this.state.sickDataAll} getRecordMedecal={this.getRecordMedecal} recordMedical={this.state.recordMedical} />
              } />
              <Route path='/createPatient' render={(props)=><CreatePatient createPatient = {this.createPatient}/>}/>

             
              <Route path='/sendPatient' render={(props) => <ContentSendPatient patientData={this.state.patientData}
                setPatientTransport={this.setPatientTransport} setToHospital={this.setToHospital} />} />
            </Switch>
          </div>)
      }
    } else {
      return (
        <div className="App">
          <Header />
        </div>
      );
    }
  }
}

export default App;
