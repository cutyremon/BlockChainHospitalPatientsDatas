import React, { Component } from 'react';

class Hospital extends Component {
    constructor(props) {
        super();
        this.state = ({
            hospitalData: [
                {
                    name: "Bệnh viện bạch mai",
                    account: "0x800E9D24690ff8E75f5DcA3EB72F53BdBc778597"
                },
                {
                    name: "Bệnh viện thanh nhàn",
                    account: "0xC43aA8F9Cd2dF4ee79399e7fF47e4905E4C0bFa7"
                },
                {
                    name: "Bệnh viện Tai Mũi Họng Hồ Chí Minh",
                    account: "0x7C53689239cE3aB438B879823854e046845eD17B"
                },
                {
                    name: "Bệnh viện mắt thành ",
                    account: "0x17612A043C6F48CdE4AB95Bbf3710Ce11BAbd66c"
                },
                {
                    name: "Bệnh viện nội tiết trung ương",
                    account: "0x0a88BAa64ea54a3257C76170791E70d06D869FD2"
                }
            ]
        })
    }


    setToHospital = (account, name) => {
        let a = window.confirm("You definitely moved to" + name + "?");
        if (a) {
            this.props.setToHospital(name, account);
        }

    }

    render() {
        return (
            <div>
                Bệnh viện :
      <ul>
                    {
                        this.state.hospitalData.map((data) =>
                            <li>
                                <a onClick={event => this.setToHospital(data.account, data.name)}>{data.name}</a>
                                <p2>{data.account}</p2>
                            </li>
                        )
                    }

                </ul>

            </div>
        )
    }
}

export default Hospital;