pragma solidity ^0.5.1;
import "./PatientFactory.sol";
import "./SickFactory.sol";

contract SetSick is PatientFactory,SickFactory { 



    struct SickCode{
    uint idpatient; //id patient 
    uint[] sickcodeData;
  }

   SickCode[] public sickcodes;

   mapping (uint256 => uint256 ) public PatientToSick; // benh nhanh -> id cua mang luu tru cac loai benh : sickcodeid 
   
  function _isLiving(Patient storage _patient) internal view returns(bool){
      return _patient.living;

  }
  
  function _setPatientSick(uint _patientId,uint _sickCode) public onlyOwnerOf(_patientId) isSick(_sickCode){// patient mac benh 
	 Patient storage myPatient = patients[_patientId];
   require(_isLiving(myPatient));
   uint a = PatientIdInSickCode(_patientId);
   sickcodes[a].sickcodeData.push(_sickCode);
   // if(PatientIdInSickCode(_patientId)){

   // }

	}

  function viewSickCode (uint _patientId )public view returns(uint[] memory ){
    uint x = PatientToSick[_patientId];

    return (sickcodes[x].sickcodeData);
    
  }

  function countSickCode() public  view returns(uint ) {
    return sickcodes.length;
    
  }
  
  

  function PatientIdInSickCode(uint _patientId) public returns(uint){// kiem tra xem patient da dk khai bao trong sickcodes chua .
    for(uint i ; i < sickcodes.length;i++)
  {
  if(sickcodes[i].idpatient ==_patientId){
    return i;
  }
}
uint[] memory a;
uint x=sickcodes.push(SickCode(_patientId,a))-1;
PatientToSick[_patientId]=x;
  return x;
  }


}