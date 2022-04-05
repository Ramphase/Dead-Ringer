import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            messageName: '',
            switchMessage: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            messageName: nextProps.messageName,
            switchMessage: nextProps.switchMessage,
        });
    }

    nameHandler(e) {
        this.setState({ messageName: e.target.value });
    }

    messageHandler(e) {
        this.setState({ switchMessage: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">Name:</span><input value={this.state.messageName} onChange={(e) => this.nameHandler(e)} /></p>
                            <p><span className="modal-lable">Message:</span><Form.Control as="textarea" rows={3} value={this.state.switchMessage} onChange={(e) => this.messageHandler(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;