import React, { Component } from 'react';
import { Table } from 'reactstrap';


class RenderTable extends Component {
    render() {
        let dataElement = this.props.dataElement;
        let headerDataElement = this.props.headerDataElement;

        return (
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        {
                            headerDataElement.map((element) => {
                                return (
                                    <th>{element.element}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataElement.map((element, index) => {
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
            </Table>
        );
    }
}

export default RenderTable;
