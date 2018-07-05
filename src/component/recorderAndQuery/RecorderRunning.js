import React, { Component } from 'react';
import './RecorderRunning.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, InputGroup, InputGroupAddon, Container, FormFeedback } from 'reactstrap';
import Header from '../header/Header.js';
import RenderTable from '../../utils/RenderTable.js';
import axios from 'axios';
import RequestApi from '../../utils/RequestApi.js';


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
        axios.get(RequestApi.apiRunning())
            .then(response => {
                this.setState(this.state.data = response.data);
            })
            .then(error => console.log(error))
    }

    watcherTextDriver = (event) => {
        this.setState({ driverInput: event.target.value });
        this.onVerifyField()
    }

    watcherTextCustomer = (event) => {
        this.setState({ customerInput: event.target.value });
        this.onVerifyField();
    }

    watcherTextCash = (event) => {
        this.setState({ cashInput: event.target.value });
        this.onVerifyField();
    }

    handleSubmit = (event) => {
        if (this.isNullOrEmpty(this.state.driverInput)) {
            this.setState({ fieldDriver: true });
            this.onVerifyField()
        }else{
            this.setState({ fieldDriver: false });
        }
        
        if(this.isNullOrEmpty(this.state.customerInput)) {
            this.setState({ fieldCustomer: true });
            this.onVerifyField()
        }else{
            this.setState({ fieldCustomer: false });
        }
        
        if(this.isNullOrEmpty(this.state.cashInput)) {
            this.setState({ fieldCash: true });
            this.onVerifyField()
        }else{
            this.setState({ fieldCash: false });
        } 
        
        if(this.onVerifyField()){
            let dataPost = {
                customer: this.state.customerInput,
                driver: this.state.driverInput,
                cash: this.state.cashInput
            }

            this.onPostCallBack(dataPost);
        }

        event.preventDefault();
    }

    onPostCallBack(objectValue) {
        axios.post(RequestApi.apiRunning(), objectValue)
            .then((response) => {
                this.onGetCallBack()
                this.clearFields()
            })
            .catch((error) => {
            });
    }

    isNullOrEmpty = (value) => {
        return value == null || value === "" || value.lenght <= 0;
    }

    clearFields = () =>{
        this.setState({driverInput: ""})
        this.setState({cashInput: ""})
        this.setState({customerInput: ""})
    }

    onVerifyField = () => {
        if (!this.isNullOrEmpty(this.state.customerInput) && !this.isNullOrEmpty(this.state.driverInput) != 0 && !this.isNullOrEmpty(this.state.cashInput)) {
            this.setState({ visible: false });
            return true
        } else {
            this.setState({ visible: true });
            return false
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Motorista</Label>
                                    <Input invalid={this.state.fieldDriver && this.isNullOrEmpty(this.state.driverInput)} valid={!this.isNullOrEmpty(this.state.driverInput)} value={this.state.driverInput} onChange={this.watcherTextDriver} placeholder="Digite o nome do motorista" type="name"/>
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Passageiro</Label>
                                    <Input invalid={this.state.fieldCustomer && this.isNullOrEmpty(this.state.customerInput)} valid={!this.isNullOrEmpty(this.state.customerInput)} value={this.state.customerInput} onChange={this.watcherTextCustomer} type="name" placeholder="Digite o nome do passageiro" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Valor</Label>
                                    <InputGroup size="normal">
                                        <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                                        <Input invalid={this.state.fieldCash && this.isNullOrEmpty(this.state.cashInput)} valid={!this.isNullOrEmpty(this.state.cashInput)} value={this.state.cashInput} onChange={this.watcherTextCash} placeholder="Valor da corrida" type="number" step="1" />
                                        <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
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
