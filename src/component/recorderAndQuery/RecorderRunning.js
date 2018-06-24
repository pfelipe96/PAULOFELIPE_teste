import React, { Component } from 'react';
import './RecorderRunning.css';
import { Button, Form, Alert, FormGroup, Label, Input, Row, Col, Table, InputGroup, InputGroupAddon, InputGroupText, Container } from 'reactstrap';
import Header from '../header/Header.js';
import RenderTable from '../../utils/RenderTable';


class Recorder extends Component {
    constructor(props) {
        super(props);

        const dataLocal = [
            { driver: 'Paulo', customer: 'Felipe', cash: '30' },
            { driver: 'Paulo', customer: 'Felipe', cash: '30' },
            { driver: 'Paulo', customer: 'Felipe', cash: '30' },
            { driver: 'Paulo', customer: 'Felipe', cash: '30' }
        ];

        const header = [
            {element: 'Motorista'},
            {element: 'Passageiro'},
            {element: 'Valor'}
        ];

        this.state = {
            visible: true,
            data: dataLocal,
            header: header
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
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
                                    <Input placeholder="Digite o nome do motorista" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Passageiro</Label>
                                    <Input placeholder="Digite o nome do passageiro" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Valor</Label>
                                    <InputGroup size="normal">
                                        <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                                        <Input placeholder="Valor da corrida" type="number" step="1" />
                                        <InputGroupAddon addonType="append">,00</InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm="2" className="button_recorder_running">
                                <Button disabled color="success">Registrar corrida</Button>
                            </Col>
                        </Row>
                    </Form>
                    <RenderTable dataElement={this.state.data} headerDataElement={this.state.header}/>
                    <Alert color="light" isOpen={this.state.visible} toggle={this.onDismiss}>
                        A lista não tem nenhum registro.
                    </Alert>

                </Container>
            </div>
        );
    }
}

export default Recorder;
