pragma solidity ^0.5.1;
import "./Ownable.sol";
import "./PatientFactory.sol";

contract SickFactory is Ownable {
     
     event NewSick(uint sickId,string name,uint sickCode);

     struct Sick{
        string name;
        uint sickCode; //ma benh
    }

    Sick[] public sicks; 

  modifier isSick(uint _sickCode){
      uint a=0;
		for(uint i=0;i<sicks.length;i++){
	if(sicks[i].sickCode==_sickCode) a++;
		}
		require(a==1);
		_;
	}

  function _createSick(string memory _name,uint _sickCode ) public onlyOwner {
  uint id =sicks.push(Sick(_name,_sickCode))-1;
  emit NewSick(id,_name,_sickCode);
  }

  function _countSick() public view returns(uint){
    return sicks.length;
  }
  


}