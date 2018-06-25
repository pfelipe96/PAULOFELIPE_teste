import React, { Component } from 'react';
import './RecorderCustomer.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, FormFeedback } from 'reactstrap';
import Header from '../header/Header.js';
import RenderTable from './RenderTable';
import axios from 'axios';



class RecorderCustomer extends Component {
    constructor(props) {
        super(props);

        const header = [
            { element: 'Passageiro' },
            { element: 'CPF' },
            { element: 'Sexo' },
            { element: 'Data de Nascimento' },
        ];

        this.state = {
            data: null,
            header: header,

            nameCustomerInput: "",
            cpfInput: "",
            genderInput: "",
            birthdayInput: "",

            fieldNameCustomer: false,
            fieldCPF: false,
            fieldGender: false,
            fieldBirthday: false,
            
            visible: true
        };

        this.onGetCallBack = this.onGetCallBack.bind(this);

        this.watcherTextNameCustomer = this.watcherTextNameCustomer.bind(this);
        this.watcherTextCPF = this.watcherTextCPF.bind(this);
        this.watcherTextGender = this.watcherTextGender.bind(this);
        this.watcherTextBirthday = this.watcherTextBirthday.bind(this);

        this.onVerifyField = this.onVerifyField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onGetCallBack()
    }


    onGetCallBack = () => {
        axios.get('http://localhost:4000/customer')
            .then(response => {
                this.setState(this.state.data = response.data);                
            })
            .then(error => console.log(error))
    }

    watcherTextNameCustomer = (event) => {
        this.setState({ nameCustomerInput: event.target.value });
        this.onVerifyField()
    }

    watcherTextCPF = (event) => {
        this.setState({ cpfInput: event.target.value});
        this.onVerifyField();
    }

    watcherTextGender = (event) => {        
        this.setState({ genderInput: event.target.value });
        this.onVerifyField();
    }


    watcherTextBirthday = (event) => {
        this.setState({ birthdayInput: event.target.value });
        this.onVerifyField();
    }

    handleSubmit = (event) => {
        if (this.isNullOrEmpty(this.state.nameCustomerInput)) {
            this.setState({ fieldNameCustomer: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldNameCustomer: false });
        }

        if (this.isNullOrEmpty(this.state.cpfInput)) {
            this.setState({ fieldCPF: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldCPF: false });
        }

        if (this.isNullOrEmpty(this.state.genderInput)) {
            this.setState({ fieldGender: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldGender: false });
        }

        if (this.isNullOrEmpty(this.state.birthdayInput)) {
            this.setState({ fieldBirthday: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldBirthday: false });
        }

        if (this.onVerifyField()) {
            let dataPost = {
                nameCustomer: this.state.nameCustomerInput,
                birthday: this.state.birthdayInput,
                cpf: this.state.cpfInput,
                gender: this.state.genderInput
            }

            this.onPostCallBack(dataPost);
        }

        event.preventDefault();
    }

    onPostCallBack(objectValue) {
        axios.post('http://localhost:4000/customer', objectValue)
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

    clearFields = () => {
        this.setState({ nameCustomerInput: "" })
        this.setState({ birthdayInput: "" })
        this.setState({ cpfInput: "" })
        this.setState({ genderInput: "" })

        this.onVerifyField()
    }

    onVerifyField = () => {

        if (!this.isNullOrEmpty(this.state.nameCustomerInput) && !this.isNullOrEmpty(this.state.birthdayInput) 
        && !this.isNullOrEmpty(this.state.cpfInput) && !this.isNullOrEmpty(this.state.genderInput)) {
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
                <Header />
                <Container className="content-recorder-driver">
                    <Form >
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Motorista</Label>
                                    <Input invalid={this.state.fieldNameCustomer && this.isNullOrEmpty(this.state.nameCustomerInput)} valid={!this.isNullOrEmpty(this.state.nameCustomerInput)} value={this.state.nameCustomerInput} onChange={this.watcherTextNameCustomer} type="name" placeholder="Digite o nome do motorista" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>CPF</Label>
                                    <Input invalid={this.state.fieldCPF && this.isNullOrEmpty(this.state.cpfInput)} valid={!this.isNullOrEmpty(this.state.cpfInput)} value={this.state.cpfInput} onChange={this.watcherTextCPF} type="text" placeholder="Digite o CPF do motorista" maxLength="11"/>
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Sexo do motorista</Label>
                                    <Input invalid={this.state.fieldGender && this.isNullOrEmpty(this.state.genderInput)} valid={!this.isNullOrEmpty(this.state.genderInput)} value={this.state.genderInput} onChange={this.watcherTextGender} type="text" placeholder="Digite o sexo do motorista"/>
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Data de nascimento</Label>
                                    <Input invalid={this.state.fieldBirthday && this.isNullOrEmpty(this.state.birthdayInput)} valid={!this.isNullOrEmpty(this.state.birthdayInput)} value={this.state.birthdayInput} onChange={this.watcherTextBirthday} type="date" placeholder="Digite a data de nascimento do motorista" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    <Col className="button_recorder_customer">
                        <Button color="success" onClick={this.handleSubmit} disabled={this.state.visible} onChange={this.onVerifyField}>Registrar corrida</Button>
                    </Col>
                    <RenderTable dataElement={this.state.data} headerDataElement={this.state.header} />
                </Container>
            </div>
        );
    }
}

export default RecorderCustomer;

