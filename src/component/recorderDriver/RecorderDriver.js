import React, { Component } from 'react';
import './RecorderDriver.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, FormFeedback } from 'reactstrap';
import Header from '../header/Header.js';
import RenderTable from '../../utils/RenderTable.js';
import axios from 'axios';
import RequestApi from '../../utils/RequestApi.js';



class RecorderDriver extends Component {
    constructor(props) {
        super(props);

        const header = [
            { element: 'Motorista' },
            { element: 'CPF' },
            { element: 'Sexo' },
            { element: 'Data de Nascimento' },
            { element: 'Modelo do Carro' }
        ];

        this.state = {
            data: null,
            header: header,
            
            nameDriverInput: "",
            cpfInput: "",
            genderInput: "",
            birthdayInput: "",
            typeCarInput: "",

            fieldNameDriver: false,
            fieldCPF: false,
            fieldGender: false,
            fieldBirthday: false,
            fieldTypeCar: false,

            typing: false,
            typingTimeout: 0,

            visible: true
        };

        this.onGetCallBack = this.onGetCallBack.bind(this);

        this.watcherTextNameDriver = this.watcherTextNameDriver.bind(this);
        this.watcherTextCPF = this.watcherTextCPF.bind(this);
        this.watcherTextGender = this.watcherTextGender.bind(this);
        this.watcherTextBirthday = this.watcherTextBirthday.bind(this);
        this.watcherTextTypeCar = this.watcherTextTypeCar.bind(this);

        this.onVerifyField = this.onVerifyField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onGetCallBack()
    }


    onGetCallBack = () => {
        axios.get(RequestApi.apiDriver())
            .then(response => {
                this.setState(this.state.data = response.data);
            })
            .then(error => console.log("503"))
    }

    watcherTextNameDriver = (event) => {
        this.setState({ nameDriverInput: event.target.value });
        this.onVerifyField()
    }

    watcherTextCPF = (event) => {

        let data = event.target.value;

        if(this.state.typingTimeout){
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({cpfInput: data})

        this.state.typingTimeout = setTimeout(() =>{
            // console.log("Entrou");
            // let dataArray = Array.from(data);
            
            // let interator = 3;
            // for(let i in dataArray){
            //     if(i % interator == 0 && i > 0){
            //         let count = i;
            //         while(dataArray[count+1] != null){
            //             dataArray[count+1] = dataArray[count]
            //             console.log(dataArray[i]);
            //             count++;
            //         }
            //         interator = (interator*2)+1;
            //     }
            // }

            // console.log(dataArray);
        }, 1000)

        this.onVerifyField();
    }

    watcherTextGender = (event) => {
        this.state.genderInput = event.target.value;
        this.onVerifyField();
    }


    watcherTextBirthday = (event) => {
        this.setState({ birthdayInput: event.target.value });
        this.onVerifyField();
    }


    watcherTextTypeCar = (event) => {
        this.setState({ typeCarInput: event.target.value });
        this.onVerifyField();
    }

    handleSubmit = (event) => {
        if (this.isNullOrEmpty(this.state.nameDriverInput)) {
            this.setState({ fieldNameDriver: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldNameDriver: false });
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

        if (this.isNullOrEmpty(this.state.typeCarInput)) {
            this.setState({ fieldTypeCar: true });
            this.onVerifyField()
        } else {
            this.setState({ fieldTypeCar: false });
        }

        if (this.onVerifyField()) {
            let dataPost = {
                nameDriver: this.state.nameDriverInput,
                birthday: this.state.birthdayInput,
                cpf: this.state.cpfInput,
                car: this.state.typeCarInput,
                gender: this.state.genderInput
            }

            this.onPostCallBack(dataPost);
        }

        event.preventDefault();
    }

    onPostCallBack(objectValue) {
        axios.post(RequestApi.apiDriver(), objectValue)
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
        this.setState({ nameDriverInput: "" })
        this.setState({ typeCarInput: "" })
        this.setState({ birthdayInput: "" })
        this.setState({ cpfInput: "" })
        this.setState({ genderInput: "" })

        this.onVerifyField()
    }

    onVerifyField = () => {
        if (!this.isNullOrEmpty(this.state.nameDriverInput) && !this.isNullOrEmpty(this.state.typeCarInput)
            && !this.isNullOrEmpty(this.state.birthdayInput) && !this.isNullOrEmpty(this.state.cpfInput) &&
            !this.isNullOrEmpty(this.state.genderInput)) {

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
                                    <Input invalid={this.state.fieldNameDriver && this.isNullOrEmpty(this.state.nameDriverInput)} valid={!this.isNullOrEmpty(this.state.nameDriverInput)} value={this.state.nameDriverInput} onChange={this.watcherTextNameDriver} type="name" placeholder="Digite o nome do motorista" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>CPF</Label>
                                    <Input invalid={this.state.fieldCPF && this.isNullOrEmpty(this.state.cpfInput)} valid={!this.isNullOrEmpty(this.state.cpfInput)} value={this.state.cpfInput} onChange={this.watcherTextCPF} type="text" placeholder="Digite o CPF do motorista" maxLength="11" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Sexo do motorista</Label>
                                    <Input invalid={this.state.fieldGender && this.isNullOrEmpty(this.state.genderInput)} valid={!this.isNullOrEmpty(this.state.genderInput)} value={this.state.genderInput} onChange={this.watcherTextGender} type="select" name="select" id="multichoice">
                                        <option></option>
                                        <option>Masculino</option>
                                        <option>Feminino</option>
                                    </Input>
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
                            <Col>
                                <FormGroup>
                                    <Label>Modelo do Carro</Label>
                                    <Input invalid={this.state.fieldTypeCar && this.isNullOrEmpty(this.state.typeCarInput)} valid={!this.isNullOrEmpty(this.state.typeCarInput)} value={this.state.typeCarInput} onChange={this.watcherTextTypeCar} type="name" placeholder="Digite o modelo do carro" />
                                    <FormFeedback>O campo está vazio, por favor preencha</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    <Col className="button_recorder_driver">
                        <Button color="success" onClick={this.handleSubmit} disabled={this.state.visible} onChange={this.onVerifyField}>Registrar corrida</Button>
                    </Col>
                    <RenderTable dataElement={this.state.data} headerDataElement={this.state.header}/>
                </Container>
            </div>
        );
    }
}

export default RecorderDriver;

