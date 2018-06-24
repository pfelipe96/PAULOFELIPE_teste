import React, { Component } from 'react';
import './RecorderCustomer.css';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class RecorderCustomer extends Component {
    render() {
        return (
            <section className="content-recorder">
                <Form>
                    <FormGroup>
                        <Label>Motorista</Label>
                        <Input placeholder="Digite o nome do motorista"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Passageiro</Label>
                        <Input placeholder="Digite o nome do passageiro"/>
                    </FormGroup>
                    <Button disabled color="success">Registrar corrida</Button>
                </Form>
            </section>
        );
    }
}

export default RecorderCustomer;
