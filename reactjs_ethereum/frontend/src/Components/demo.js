import React, { Component } from 'react'
import ipfs from './ipfs'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ipfsHash: '',
            web3: null,
            buffer: null,
        }
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //   instantiateContract() {
    //     /*
    //      * SMART CONTRACT EXAMPLE
    //      *
    //      * Normally these functions would be called in the context of a
    //      * state management library, but for convenience I've placed them here.
    //      */

    //     const contract = require('truffle-contract')
    //     const simpleStorage = contract(SimpleStorageContract)
    //     simpleStorage.setProvider(this.state.web3.currentProvider)

    //     // Get accounts.
    //     this.state.web3.eth.getAccounts((error, accounts) => {
    //       simpleStorage.deployed().then((instance) => {
    //         this.simpleStorageInstance = instance
    //         this.setState({ account: accounts[0] })
    //         // Get the value from the contract to prove it worked.
    //         return this.simpleStorageInstance.get.call(accounts[0])
    //       }).then((ipfsHash) => {
    //         // Update state with the result.
    //         return this.setState({ ipfsHash })
    //       })
    //     })
    //   }

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
            console.log('buffer', this.state.buffer)
        }
    }

    onSubmit(event) {
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
            if (error) {
                console.error(error)
                return
            }
            return this.setState({ ipfsHash: result[0].hash })
        })
    }

    render() {
        return (
            <div className="col-md-3">
                <div className="App">
                    <nav className="navbar pure-menu pure-menu-horizontal">
                        <a href="#" className="pure-menu-heading pure-menu-link">IPFS File Upload DApp</a>
                    </nav>

                    <main className="container">
                        <div className="pure-g">
                            <div className="pure-u-1-1">
                                <h1>Your Image</h1>
                                <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
                                <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt="" />
                                <h2>Upload Image</h2>
                                <form onSubmit={this.onSubmit} >
                                    <input type='file' onChange={this.captureFile} />
                                    <input type='submit' />
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default App