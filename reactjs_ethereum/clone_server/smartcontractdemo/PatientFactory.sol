pragma solidity ^0.5.1;
import "./Ownable.sol";
import "./SickFactory.sol";


contract PatientFactory is Ownable {

	
	event NewPatient(uint patientId ,string name, string cmt, uint age,uint sex,bool living);
	event Transfer(address _from,address _to,uint256 _tokenId);
	struct Patient{
	uint patientId; 
	string name;
	string cmt;
	uint age;
	uint sex;
	bool living;
	}



	Patient[] public patients;

	mapping (address => uint ) public OwnerToPatient;// nguoi dung->benh nhan.
	mapping (address => uint ) public OwnerPatientCount; //nguoi dung ->so benh nhan.
	mapping (uint => address) public PatientToOwner;//benh nhan ->nguoi dug


	   modifier onlyOwnerOf(uint _patientId ) {
    require(msg.sender == PatientToOwner[_patientId]);
    _;
 	 }  
 	function getSender()  public view returns(address){

	return msg.sender;
	
	}



	function CreatePatient(string memory _name ,string memory _cmt , uint _age ,uint _sex) public {
		uint patientId = patients.length;
		uint id = patients.push(Patient(patientId,_name,_cmt,_age,_sex,true)) -1;
		PatientToOwner[id]=msg.sender;
		OwnerPatientCount[msg.sender] ++;
		emit NewPatient(id,_name,_cmt,_age,_sex,true);
	
	}

function countPatient(address _owner) public view returns(uint256) {
  return OwnerPatientCount[_owner];
  
}

function _transfer(address _from, address _to, uint256 _tokenId) public {
    OwnerPatientCount[_to] = OwnerPatientCount[_to] ++ ;
    OwnerPatientCount[msg.sender] =OwnerPatientCount[msg.sender]--;
    PatientToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

   function transferFrom(address _from, address _to, uint256 _tokenId) public {
      require (PatientToOwner[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
    }

    function getPatientByOwner(address _owner) external view returns(uint[] memory) {
    	uint[] memory result = new uint[](OwnerPatientCount[_owner]);
    	uint count=0;
    	for(uint i;i<patients.length;i++){
    		if(PatientToOwner[i]==_owner){
    			result[count]=i;
    			count ++;
    		}
    	}
    	return result;
    }
    
}