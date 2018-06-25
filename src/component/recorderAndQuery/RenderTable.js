import React, { Component } from 'react';
import { Table, Alert } from 'reactstrap';
import './RenderTable.css';


class RenderTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }


    onToggle(object) {
        if (object == 0) {
            return (
                <Alert color="light" isOpen={this.state.visible} toggle={this.onDismiss}>
                    A lista não tem nenhum registro.
                </Alert>
            )
        }
    }

    onVerifyDataHeader(valueObject) {
        if (valueObject != null) {
            return (
                <thead>
                    <tr>
                        <th></th>
                        {
                            valueObject.map((element) => {
                                return (
                                    <th>{element.element}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
            )
        }
    }

    onVerifyDataBody(valueObject) {
        if (valueObject != null) {
            return (
                <tbody>
                    {
                        valueObject.map((element, index) => {
                            return (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{element.driver}</td>
                                    <td>{element.customer}</td>
                                    <td>{element.cash}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            )
        }
    }

    render() {
        return (
            <div className="content-render-table-driver">
                <Table>
                    {this.onVerifyDataHeader(this.props.headerDataElement)}
                    {this.onVerifyDataBody(this.props.dataElement)}
                </Table>
                {this.onToggle(this.props.dataElement)}
            </div>
        );
    }
}

export default RenderTable;
