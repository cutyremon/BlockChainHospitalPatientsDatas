pragma solidity ^0.5.1;
// pragma experimental ABIEncoderV2;
import "./SetSick.sol";
// import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


/**
 * The MedicalRecord contract does this and that...
 */
contract Medical is SetSick{


  event Transfer(address _from,address _to,uint256 _tokenId);
  


  struct MedicalRecord{// hồ sơ bệnh án 
      uint idpatient;
      uint sickcode;//id patient
      uint readyTime;
      uint MedicalExaminationCount;// số bản ghi record 
    }

    struct MedicalExamination { // luu du data patient theo lich su kham benh 
    	uint readyTime;
    	string diagnostic;
    	
    }

    mapping (uint => uint ) RecordMedicalExaminations; // medicalExaminations=>medicalrecords;

     MedicalRecord[] public medicalrecords;
     MedicalExamination[] public medicalExaminations;

     modifier MedicalRecordCreated(uint _patientId,uint _sickCode) { 
      uint _count =0;
        for(uint i =0;i<medicalrecords.length;i++){

        if(medicalrecords[i].idpatient==_patientId&&medicalrecords[i].sickcode==_sickCode){
        _count ++;
        }
        }
       require (_count==1); 
       _; 
     }
     
  
   function _createMedicalRecord(uint _patientId,uint _sickCode)public onlyOwnerOf(_patientId) {
  	uint readyTime1 = uint(now); 
  	medicalrecords.push(MedicalRecord({idpatient:_patientId,sickcode:_sickCode,readyTime:readyTime1,MedicalExaminationCount:0}));
  }

  function RecordMedical(uint _patientId,uint _sickCode , string memory _diagnostic) public onlyOwnerOf(_patientId){ // luu du data kham benh 
  	uint idMedicalRecord = _checkMedicalRecordInitializated(_patientId,_sickCode);
    uint readyTime = uint(now); 
    uint idmedicalExamination=medicalExaminations.push(MedicalExamination(readyTime,_diagnostic))-1;
    medicalrecords[idMedicalRecord].MedicalExaminationCount ++;
    RecordMedicalExaminations[idmedicalExamination]= idMedicalRecord;
  }

  
  function _checkMedicalRecordInitializated(uint _patientId,uint _sickCode) public returns(uint){ //kiểm tra hồ sơ bệnh nhân vs bệnh này đã được tạo chưa .
  	for(uint i =0;i<medicalrecords.length;i++){

  if(medicalrecords[i].idpatient==_patientId&&medicalrecords[i].sickcode==_sickCode){
	return i;
  }
 	}

 	_createMedicalRecord(_patientId,_sickCode);
 	return medicalrecords.length-1;
  	
  }

function getRecordMedical(uint _patientId,uint _sickCode) public MedicalRecordCreated(_patientId,_sickCode) view returns(uint[] memory) {
  uint _idMedicalRecord;
  for(uint i =0;i<medicalrecords.length;i++){

  if(medicalrecords[i].idpatient==_patientId&&medicalrecords[i].sickcode==_sickCode){
  _idMedicalRecord = i;
  }
  }
  uint[] memory result= new uint[](medicalrecords[_idMedicalRecord].MedicalExaminationCount);
  uint counter =0;
  for(uint j=0;j<medicalExaminations.length;j++){
    if(RecordMedicalExaminations[j]==_idMedicalRecord){
      result[counter] = j;
      counter ++;
    }
  }
  return result;

}
function CreatePatient(string memory _name ,string memory _cmt , uint _age ,uint _sex) public { //khai bao lai CreatePatient ke thua tu patientcontract 
    uint patientId = patients.length;
    uint id = patients.push(Patient(patientId,_name,_cmt,_age,_sex,true)) -1;
    PatientToOwner[id]=msg.sender;
    _setPatientSick(id,0);
    OwnerPatientCount[msg.sender] ++;
    emit NewPatient(id,_name,_cmt,_age,_sex,true);
  
  }
  
}
