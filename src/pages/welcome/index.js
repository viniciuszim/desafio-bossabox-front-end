import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ToolsActions } from '../../store/ducks/tools';

import {
  Row, Col, Form, Button, Card,
} from 'react-bootstrap';

import { Container, EmptyContainer, ListContainer } from './styles';

import NewToolModal from '../../components/NewToolModal';

class Welcome extends Component {
  static propTypes = {
    getAllRequest: PropTypes.func.isRequired,
    getByTagRequest: PropTypes.func.isRequired,
    removeToolRequest: PropTypes.func.isRequired,
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
    const { getAllRequest, getByTagRequest } = this.props;
    const { searchInput, searchOnlyTag } = this.state;

    if (searchOnlyTag) {
      getByTagRequest(searchInput);
    } else {
      getAllRequest();
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleRemoveTool = (id) => {
    const { removeToolRequest } = this.props;
    removeToolRequest(id);
  };

  render() {
    const { tools } = this.props;
    const { showModal, searchInput, searchOnlyTag } = this.state;
    return (
      <Container>
        <NewToolModal
          show={showModal}
          handleCloseModal={this.handleCloseModal}
        />
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
                    onChange={e => this.setState({ searchInput: e.value })}
                  />
                </Col>
                <Col xs={6} sm={4} className="check-col">
                  <Form.Check
                    inline
                    label="search in tags only"
                    type="checkbox"
                    id="inline-checkbox"
                    checked={searchOnlyTag}
                    onChange={e => this.setState({ searchOnlyTag: e.value })}
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
                <h3>No tool added... Please add a new one</h3>
              </EmptyContainer>
            )}
            {!!tools.data && tools.data.length !== 0 && (
              <ListContainer>
                {tools.data.map(tool => (
                  <Card key={tool.id}>
                    <Card.Header>
                      <Row>
                        <Col xs={9} className="card-title">
                          <Card.Title>Card Title</Card.Title>
                        </Col>
                        <Col xs={3} className="card-remove">
                          <Button
                            variant="link"
                            type="button"
                            size="sm"
                            onClick={() => this.handleRemoveTool(1)}
                          >
                            <i className="fa fa-plus" />
                            remove
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card&apos;s content.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text>#hashtags</Card.Text>
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
