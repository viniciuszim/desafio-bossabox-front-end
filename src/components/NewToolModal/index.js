import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ToolsActions } from '../../store/ducks/tools';

import {
  Modal, Form, Button, Spinner, Alert,
} from 'react-bootstrap';

const initialState = {
  validated: false,
  tool: {
    title: '',
    link: '',
    description: '',
    tags: '',
  },
};

class NewToolModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    addToolRequest: PropTypes.func.isRequired,
    resetSuccessValuesRequest: PropTypes.func.isRequired,
    tools: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          link: PropTypes.string,
          description: PropTypes.string,
          tags: PropTypes.arrayOf(PropTypes.string),
        }),
      ),
      loading: PropTypes.bool,
      error: PropTypes.string,
      successOnAdd: PropTypes.bool,
      errorOnAdd: PropTypes.string,
    }).isRequired,
  };

  state = {
    validated: false,
    tool: {
      title: '',
      link: '',
      description: '',
      tags: '',
    },
  };

  componentWillReceiveProps(nextProps) {
    const { tools } = nextProps;
    const { successOnAdd } = tools;

    if (successOnAdd) {
      const { resetSuccessValuesRequest, handleCloseModal } = this.props;
      handleCloseModal();
      resetSuccessValuesRequest();
      this.setState({ ...initialState });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { addToolRequest } = this.props;
      const { tool } = this.state;

      if (typeof tool.tags === 'string') {
        tool.tags = tool.tags.split(' ');
      }
      addToolRequest(tool);

      return;
    }
    this.setState({ validated: true });
  };

  render() {
    const { show, handleCloseModal, tools } = this.props;
    const { loading, errorOnAdd } = tools;
    const { validated, tool } = this.state;
    return (
      <Modal show={show} onHide={handleCloseModal}>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fa fa-plus" />
              Add new tool
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formGroupToolName">
              <Form.Label>Tool Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="name"
                value={tool.title}
                onChange={(event) => {
                  this.setState({
                    tool: { ...tool, title: event.target.value },
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please, fill the tool name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGroupToolLink">
              <Form.Label>Tool Link</Form.Label>
              <Form.Control
                type="link"
                required
                placeholder="http://..."
                value={tool.link}
                onChange={(event) => {
                  this.setState({
                    tool: { ...tool, link: event.target.value },
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please, fill the tool link.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGroupToolDescription">
              <Form.Label>Tool Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows="3"
                placeholder="description"
                value={tool.description}
                onChange={(event) => {
                  this.setState({
                    tool: { ...tool, description: event.target.value },
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please, fill the tool description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGroupToolTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="tags"
                value={tool.tags}
                onChange={(event) => {
                  this.setState({
                    tool: { ...tool, tags: event.target.value },
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please, fill at least one tag.
              </Form.Control.Feedback>
            </Form.Group>
            {!!errorOnAdd && <Alert variant="danger">{errorOnAdd}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loading} variant="primary" type="submit">
              {loading ? <Spinner animation="border" variant="light" size="sm" /> : 'Add Tool'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  tools: state.tools,
});

const mapDispatchToProps = dispatch => bindActionCreators(ToolsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewToolModal);
