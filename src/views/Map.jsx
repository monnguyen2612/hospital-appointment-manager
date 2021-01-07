import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Spinner, Table, Button } from "reactstrap";
import PagesDropdown from '../components/util/PagesDropdown';
import { fetchPharmacists } from '../redux/actions/admin.action';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllPharmacists, deleteUser } from '../services/admin.services';
import UpdatPharmacist from '../components/modals/UpdatePharmacist';

class Map extends React.Component {

  componentDidMount() {
    fetchAllPharmacists(this.props.match.params.pageNo).then(jsonResponse => {
      console.log(jsonResponse);
      this.props.fetchPharmacists(jsonResponse);
    }).catch(e => console.log(e));
  }

  deleteButtonHandler = (pharmacistId) => {
    deleteUser(pharmacistId, 4).then(_ => window.location.reload()).catch(_ => this.props.history.push('/')).catch(_ => this.setState({ showAlert: true })).catch(_ => this.setState({ showAlert: true }));
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Row className={'mb-5'}>
                <Col md={6}>
                  <PagesDropdown size={this.props.pages}/>
                </Col>
                <Col md={6}>
                  <Link to={'/admin/new-pharmacist'} className={'btn btn-dark'}>Add New Pharmacist</Link>
                </Col>
              </Row>
              {this.props.pharmacistList.length > 0 ?
                <Card>
                  <CardHeader>Pharmacists</CardHeader>
                  <CardBody className="all-icons">
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Tel Number</th>
                            <th>Address</th>
                            <th>Delete</th>
                            <th>Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.pharmacistList.map(pharmacist => (
                            <tr key={pharmacist.id}>
                              <td>{pharmacist.full_name}</td>
                              <td>{pharmacist.email}</td>
                              <td>{pharmacist.gender}</td>
                              <td>{pharmacist.dob}</td>
                              <td>{pharmacist.tel_number}</td>
                              <td>{pharmacist.address}</td>
                              <td><Button onClick={() => this.deleteButtonHandler(pharmacist.id)} type={'button'} color={'info'}>Delete</Button></td>
                              <td><UpdatPharmacist id={pharmacist.id}/></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    
                  </CardBody>
                </Card>
                :<div className={'w-100 d-flex justify-content-center'}><Spinner size={'xl'}/></div>}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  pharmacistList: state.adminReducer.pharmacistList,
  pages: state.adminReducer.pharmacistsPages
})

const mapDispatchToProps = dispatch=> {
  return {
    fetchPharmacists : response=>dispatch(fetchPharmacists(response))
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (Map);
