import React from 'react';
import { IframeBridge } from 'wisper-rpc';
import './Iframe.css';

export default class WhisperIframe extends React.Component {
        bridge = null;
        watchdogTimeout = null;

        constructor(props){
            super(props);
            this.state = {
                key: (new Date()).getTime()
            }
        }

        invoke(method, ...args) {
            if (this.bridge === null) {
                return Promise.reject("Iframe not ready");
            }

            return this.bridge.invoke(method, [...args]);
        }

        componentDidMount() {
            this.bridge = new IframeBridge(this.iframe.contentWindow);


            this.bridge.exposeFunction('onReady', (response) => {
                console.log('onReady', {response});
                this.invoke("play");
                return true;
            });

            this.bridge.exposeFunction('onPlay', (response) => {
                console.log('onPlay', {response});
                
                return true;
            });

            this.bridge.exposeFunction('onError', (error) => {
                console.log('onError', {error});

                return true;
            });

            this.bridge.exposeFunction('onDone', (response) => {
                console.log('onDone', {response});
                this.setState({
                    key: (new Date()).getTime()
                })
                
                return true;
            });


            if (this.props.watchdog) {
                this._watchdog();
            }

        }

        componentWillUnmount() {
            this.bridge.close();
            this.iframe = null;
            this.bridge = null;
            clearTimeout(this.watchdogTimeout);
        }

        _watchdog() {
            this.watchdogTimeout = setTimeout(()=>{
                let timeoutPromise = new Promise((resolve, reject)=>setTimeout(reject, 1000));
                Promise
                    .race([this.invoke("ping"), timeoutPromise])
                    .then(()=>this._watchdog())
                    .catch((error)=> console.log('onError', {error}));
            }, 30000);
        }

        render() {
            const {key} = this.state;
            
            return <iframe ref={(iframe)=>{this.iframe = iframe}} src={this.props.src} title={this.props.src} key={key} />
        }
}