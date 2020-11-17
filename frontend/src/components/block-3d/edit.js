/**
 * BLOCK: UAGB - Section Edit Class
 */

// Import classes
import React from 'react';
import Select from 'react-select';
import {
    Component,
} from "@wordpress/element";
import {
    withNotices,
} from '@wordpress/components';
import './style.scss';
import { filter } from 'lodash';
import {

    InspectorControls,

} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl
} from '@wordpress/components';
import { valHooks } from 'jquery';

class TemplateEdit extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            selectedOption: '',
            loading: false,
            success: false
        }
        this.connectSW = this.connectSW.bind(this);
        this.uninstallModel = this.uninstallModel.bind(this);
    }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {

                if (registrations.length) {
                    console.log("registration existed", registrations);
                } else {
                    navigator.serviceWorker
                        .register(window.dsDefaultWebappsBaseUrl + "Overview/serviceWorker.js")
                        .then(function (registration) {
                            console.log("Service worker registered", registration);
                        })
                        .catch(function (err) {
                            console.log("Service worker failed to register", err);
                        })
                }
            })
        }
    }

    connectSW() {

        console.log("connected");




    }

    handleChange = async (selectedOption) => {
        var that = this;
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`, selectedOption.value);
        let scope = "https://" + window.location.hostname;

        let doc = await window.downloadTicket(scope, selectedOption.value.id, selectedOption.value.certificat);
        if (doc) {
            let url = doc.data[0].dataelements.ticketURL;
            if (url) {
                if ('serviceWorker' in navigator) {
                    caches.delete(selectedOption.label+ "-modelPrivate").then(function (value) {
                        if (value) {
                            console.log("DELETE cache " + that._id);

                        }
                    }).then(function () {
                        navigator.serviceWorker.getRegistrations().then(registrations => {
                            console.log("resgistion message", registrations);
                            that.setState({ loading: true, success: false });
                            registrations[0].active.postMessage({
                                'type': 'CHANGENAMECACHE2',
                                'name': selectedOption.label + "-modelPrivate"
                            });
                            registrations[0].active.postMessage({
                                'type': 'ticketUrl',
                                'ticketUrl': url
                            });
                        });
                        var temp = 0;
                        navigator.serviceWorker.addEventListener('message', event => {
                            // event is a MessageEvent object
                            // console.log(`The service worker sent me a message: ${event.data}`);
                            console.log('SW send to client data', event.data);
                            if (event.data === "Hi client, stoké") {
                                const label = selectedOption.label.split('.')[0];
                                const url = window.dsDefaultWebappsBaseUrl + "Overview/DataCache/" + label + "/" + label.replace("Bundle", "") + ".html";
                                console.log("url", url);
                                const { attributes, setAttributes } = this.props;
                                const { name3dModel, nameFile } = attributes;
                                setAttributes({ name3dModel: url,  nameFile: selectedOption.label+"-modelPrivate" });
                                that.setState({ loading: false, success: true });

                            }
                        });
                    })

                }
            }
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                console.log("resgistion message", registrations);
                that.setState({ loading: true, success: false });
                registrations[0].active.postMessage({
                    'type': 'CHANGENAMECACHE2',
                    'name': selectedOption.label + "-modelPrivate"
                });
                registrations[0].active.postMessage({
                    'type': 'ticketUrl',
                    'ticketUrl': selectedOption.value
                });
            });
            var temp = 0;
            navigator.serviceWorker.addEventListener('message', event => {
                // event is a MessageEvent object
                // console.log(`The service worker sent me a message: ${event.data}`);
                console.log('SW send to client data', event.data);
                if (event.data === "Hi client, stoké") {
                    const label = selectedOption.label.split('.')[0];
                    const url = window.dsDefaultWebappsBaseUrl + "Overview/DataCache/" + label + "/" + label.replace("Bundle", "") + ".html";
                    console.log("url", url);
                    const { attributes, setAttributes } = this.props;
                    const { name3dModel } = attributes;
                    setAttributes({ name3dModel: url });
                    that.setState({ loading: false, success: true });

                }
            });
        }

        // const { attributes, setAttributes } = this.props;
        // const { name3dModel } = attributes;
        // setAttributes({ name3dModel: selectedOption.value });




        // if ("serviceWorker" in navigator) {
        //     navigator.serviceWorker.getRegistrations().then(registrations => {
        //         console.log("resgistion message", registrations);
        //         that.setState({ loading: true, success: false });
        //         registrations[0].active.postMessage({
        //             'type': 'CHANGENAMECACHE',
        //             'dataFile': selectedOption
        //         });
        //         registrations[0].active.postMessage({
        //             'type': 'CONNECTION',
        //             'dataFile': selectedOption
        //         });
        //     });
        //     navigator.serviceWorker.addEventListener('message', event => {
        //         console.log(`The service worker sent me a message: ${event.data}`);
        // if (event.data === "Hi client, stoké") {
        //     const label = this.state.selectedOption.label.split('.')[0];
        //     const url = window.dsDefaultWebappsBaseUrl + "Overview/DataCache/" + label + "/" + label.replace("Bundle", "") + ".html";
        //     console.log("url", url);
        //     const { attributes, setAttributes } = this.props;
        //     const { name3dModel } = attributes;
        //     setAttributes({ name3dModel: url });
        //     that.setState({ loading: false, success: true });

        // }
        //     });
        // } else {
        //     console.log("service worker is not exits");
        // }
    }

    uninstallModel(nameFile){
        console.log("nameFile",nameFile);
        if(serviceWorker in navigator){
            caches.delete(nameFile).then(function (value) {
                if (value) {
                  console.log("DELETE cache " + that._id);

                }
              })
        }
    }

    render() {
        const { selectedOption, loading, success } = this.state;
        const { attributes } = this.props;
        let { name3dModel, nameFile } = attributes;
        let value = selectedOption && selectedOption.value;
        console.log('nameFile from render', nameFile);


        const listZips = JSON.parse(window.localStorage.getItem('listZipsRaw'));
        const optionZips = listZips && listZips.length ? listZips.map((item, index) => { return { value: item, label: item.name } }) : [];


        const form = !success && !loading && !name3dModel ? <Select
            name="form-field-name"
            value={value}
            onChange={this.handleChange}
            options={optionZips}
        /> : null;
        const iconLoading = loading ? <img id="loading" src="https://lp5-ann19-dsy.dsone.3ds.com:4242/FILES/Picture/assets/4.svg" style={{ height: '20px' }} /> : null;
        const iconSuccess = success ? <img src="https://lp5-ann19-dsy.dsone.3ds.com:4242/FILES/Picture/assets/3.png" style={{ height: '20px' }} /> : null;
        const buttonPlayer = success ? < button type="button" className="btn btn-info" onClick={this.connectSW} > Connect SW</button > : null;
        const iframeTag = name3dModel ? <iframe src={name3dModel} referrerPolicy='same-origin' style={{ width: '100%', height: '400px' }}></iframe> : null;
        let buttonUninstall = nameFile ? < button type="button" className="btn btn-info" onClick={(nameFile)=>this.uninstallModel(nameFile)} > Uninstall </button > : null;
        let sidebar = null;
        if (optionZips && optionZips.length) {
            sidebar = <InspectorControls>
                <PanelBody title="3D Model Change">
                    <Select
                        name="form-field-name"
                        value={value}
                        onChange={this.handleChange}
                        options={optionZips}
                    />
                    {buttonUninstall}
                </PanelBody>
                
            </InspectorControls>;
        }

        return (
            <div>
                {sidebar}
                {form}
                {iconLoading}
                {iconSuccess}
                {/* {buttonPlayesr} */}
                {iframeTag}
            </div>
        )
            ;
    }
}

export default withNotices(TemplateEdit)
