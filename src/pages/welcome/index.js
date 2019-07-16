import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ToolsActions } from '../../store/ducks/tools';

import {
  Row, Col, Form, Button, Card,
} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';

import { Container, EmptyContainer, ListContainer } from './styles';

import NewToolModal from '../../components/NewToolModal';

class Welcome extends Component {
  static propTypes = {
    getAllRequest: PropTypes.func.isRequired,
    getByTagRequest: PropTypes.func.isRequired,
    removeToolRequest: PropTypes.func.isRequired,
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
      successOnRemove: PropTypes.bool,
      errorOnRemove: PropTypes.string,
    }).isRequired,
  };

  state = {
    showModal: false,
    searchInput: '',
    searchOnlyTag: false,
  };

  componentDidMount() {
    Dialog.setOptions({
      defaultOkLabel: 'Yes, remove',
      defaultCancelLabel: 'Cancel!!',
      primaryClassName: 'btn-success',
      defaultButtonClassName: 'btn-danger',
    });
    this.handleSearch();
  }

  componentWillReceiveProps(nextProps) {
    const { tools } = nextProps;
    const { successOnRemove } = tools;

    if (successOnRemove) {
      const { resetSuccessValuesRequest } = this.props;
      this.handleSearch();
      resetSuccessValuesRequest();
    }
  }

  handleSearch = () => {
    const { getAllRequest, getByTagRequest } = this.props;
    const { searchInput, searchOnlyTag } = this.state;

    if (searchOnlyTag) {
      getByTagRequest(searchInput);
    } else {
      getAllRequest(searchInput);
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchInput: event.target.value });
    if (event.target.value === '' || event.target.value.length >= 3) {
      this.handleSearch();
    }
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleRemoveTool = (tool) => {
    this.dialog.showAlert('Hello Dialog!');
    this.dialog.show({
      title: (
        <div>
          <i className="fa fa-times" />
          {' '}
Remove Tool
        </div>
      ),
      body: (
        <div>
          {'Are you sure you want to remove '}
          <strong>{tool.title}</strong>
          {'?'}
        </div>
      ),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          const { removeToolRequest } = this.props;
          removeToolRequest(tool.id);
        }),
      ],
      bsSize: 'small',
    });
  };

  render() {
    const { tools } = this.props;
    const { showModal, searchInput, searchOnlyTag } = this.state;
    return (
      <Container>
        <Dialog
          ref={(el) => {
            this.dialog = el;
          }}
        />
        <NewToolModal show={showModal} handleCloseModal={this.handleCloseModal} />
        <Row>
          <Col xs={12} sm={3}>
            &nbsp;
          </Col>
          <Col xs={12} sm={6}>
            <h1>VUTTR</h1>
            <h2>Very Useful Tools to Remember</h2>
            <Form>
              <Row>
                <Col xs={12} sm={4} className="search-col">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => {
                      this.handleSearchChange(e);
                    }}
                  />
                </Col>
                <Col xs={6} sm={4} className="check-col">
                  <Form.Check
                    inline
                    label="search in tags only"
                    type="checkbox"
                    id="inline-checkbox"
                    checked={searchOnlyTag}
                    onChange={e => this.setState({ searchOnlyTag: e.target.value })}
                  />
                </Col>
                <Col xs={6} sm={4} className="button-col">
                  <Button variant="primary" type="button" onClick={this.handleOpenModal}>
                    <i className="fa fa-plus" />
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
            {(!!tools.data === false || tools.data.length === 0) && (
              <EmptyContainer>
                <h3>No tool found!</h3>
              </EmptyContainer>
            )}
            {!!tools.data && tools.data.length !== 0 && (
              <ListContainer>
                {tools.data.map(tool => (
                  <Card key={tool.id}>
                    <Card.Header>
                      <Row>
                        <Col xs={9} className="card-title">
                          <Card.Title>
                            <Button
                              variant="link"
                              type="button"
                              size="sm"
                              onClick={() => window.open(tool.link, '_blank')}
                            >
                              {tool.title}
                            </Button>
                          </Card.Title>
                        </Col>
                        <Col xs={3} className="card-remove">
                          <Button
                            variant="danger"
                            type="button"
                            size="sm"
                            onClick={() => this.handleRemoveTool(tool)}
                          >
                            <i className="fa fa-times" />
                            remove
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{tool.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {!!tool.tags
                        && tool.tags.length > 0
                        && tool.tags.map((tag, index) => (
                          <Card.Text key={index} className={tag === searchInput ? 'highlight' : ''}>
                            {`#${tag}`}
                          </Card.Text>
                        ))}
                    </Card.Footer>
                  </Card>
                ))}
              </ListContainer>
            )}
          </Col>
          <Col xs={12} sm={3}>
            &nbsp;
          </Col>
        </Row>
      </Container>
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
)(Welcome);
