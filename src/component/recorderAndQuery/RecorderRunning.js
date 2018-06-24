import React, { Component } from 'react';
import './RecorderRunning.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, InputGroup, InputGroupAddon, Container, FormFeedback } from 'reactstrap';
import Header from '../header/Header.js';
import RenderTable from '../../utils/RenderTable';
import axios from 'axios';

class Recorder extends Component {
    constructor(props) {
        super(props);

        const header = [
            { element: 'Motorista' },
            { element: 'Passageiro' },
            { element: 'Valor (R$)' }
        ];

        this.state = {
            data: null,
            header: header,
            driverInput: "",
            customerInput: "",
            cashInput: "",
            visible: true,
            fieldCash: false,
            fieldDriver: false,
            fieldCustomer: false
        };

        this.onGetCallBack = this.onGetCallBack.bind(this);

        this.watcherTextDriver = this.watcherTextDriver.bind(this);
        this.watcherTextCustomer = this.watcherTextCustomer.bind(this);
        this.watcherTextCash = this.watcherTextCash.bind(this);

        this.onVerifyField = this.onVerifyField.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.onGetCallBack()
    }


    onGetCallBack = () => {
        axios.get('http://localhost:4000/recorder-running')
            .then(response => {
                this.setState(this.state.data = response.data);
            })
            .then(error => console.log(error))
    }

    watcherTextDriver = (event) => {
        this.onVerifyField()
        this.setState({ driverInput: event.target.value });
    }

    watcherTextCustomer = (event) => {
        this.onVerifyField()
        this.setState({ customerInput: event.target.value });
    }

    watcherTextCash = (event) => {
        this.onVerifyField()
        this.setState({ cashInput: event.target.value });
    }

    handleSubmit = (event) => {
        if (this.state.driverInput.length == 0) {
            this.setState({ fieldDriver: true });
            this.onVerifyField()
        } else if(this.state.customerInput.length == 0) {
            this.setState({ fieldCustomer: true });
            this.onVerifyField()
        } else if(this.state.cashInput.length == 0) {
            this.setState({ fieldCash: true });
            this.onVerifyField()
        } else {
            let dataPost = {
                customer: this.state.customerInput,
                driver: this.state.driverInput,
                cash: this.state.cashInput + ",00"
            }
            this.onPostCallBack(dataPost);
        }

        event.preventDefault();
    }

    onPostCallBack(objectValue) {
        axios.post('http://localhost:4000/recorder-running', objectValue)
            .then((response) => {
                this.onGetCallBack()
            })
            .catch((error) => {
            });
    }

    isNullOrEmpty = (value) => {
        return value == null || value === "" || value.lenght <= 0;
    }

    onVerifyField = () => {
        console.log(this.state.customerInput.length);
        console.log(this.state.driverInput.length);
        console.log(this.state.cashInput.length);

        if (this.state.customerInput.length != 0 && this.state.driverInput.length != 0 && this.state.cashInput.length != 0) {
            this.setState({ visible: false });
        } else {
            this.setState({ visible: true });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Motorista</Label>
                                    <Input invalid={this.state.fieldDriver && this.isNullOrEmpty(this.state.driverInput)} valid={!this.isNullOrEmpty(this.state.driverInput)} value={this.state.driverInput} onChange={this.watcherTextDriver} placeholder="Digite o nome do motorista" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Passageiro</Label>
                                    <Input invalid={this.state.fieldCustomer && this.isNullOrEmpty(this.state.customerInput)} valid={!this.isNullOrEmpty(this.state.customerInput)} value={this.state.customerInput} onChange={this.watcherTextCustomer} placeholder="Digite o nome do passageiro" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Valor</Label>
                                    <InputGroup size="normal">
                                        <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                                        <Input invalid={this.state.fieldCash && this.isNullOrEmpty(this.state.cashInput)} valid={!this.isNullOrEmpty(this.state.cashInput)} value={this.state.cashInput} onChange={this.watcherTextCash} placeholder="Valor da corrida" type="number" step="1" />
                                        <InputGroupAddon addonType="append">,00</InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm="2" className="button_recorder_running">
                                <Button color="success" onClick={this.handleSubmit} disabled={this.state.visible} onChange={this.onVerifyField}>Registrar corrida</Button>
                            </Col>
                        </Row>
                    </Form>
                    <RenderTable dataElement={this.state.data} headerDataElement={this.state.header} />
                </Container>
            </div>
        );
    }
}

export default Recorder;
