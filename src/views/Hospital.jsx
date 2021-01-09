
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Spinner, Button, Alert } from "reactstrap";
import { fetchHospitals } from '../redux/actions/admin.action';
import { connect } from "react-redux";
import { getAllHospitals , deleteUser } from '../services/admin.services';
import { Link } from "react-router-dom";
import PagesDropdown from "components/util/PagesDropdown";
import UpdatePatient from "components/modals/UpdatePatient";
class Hospital extends React.Component {
  state = {
    toggle: false,
    error : null
  }
  constructor(props) {
    super(props);
    // if (localStorage.getItem('authToken') === null)
    //   window.location.replace('/');
  }
  
  componentDidMount() {
    getAllHospitals(this.props.match.params.pageNo).then(jsonResponse => {
      this.props.fetchHospitals(jsonResponse);
    }).catch(e => {
      console.log(e);
    })
  }

  deleteButtonHandler = (patientId) => {
    deleteUser(patientId,3).then(_ => window.location.reload()).catch(e => this.setState({ error: e.message }));
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }
  render() {
    return (
      <>
        <div className="content">
          {console.log(this.props)}
          <Row>
            {this.state.error !== null && <Alert color={'info'}>{this.state.error}</Alert>}
            <Col md="12">
              <Row>
                <Col md={6}>
                  <PagesDropdown size={this.props.pages}/>
                </Col>
                <Col md={6}>
                  <Link to={'/admin/new-hospital'} className={'btn btn-dark'}>Thêm bệnh viện</Link>
                </Col>
              </Row>
              <Card className="demo-icons">
                <CardHeader>
                  <CardTitle tag="h5">Bệnh Viện</CardTitle>
                </CardHeader>
                <CardBody className="all-icons">
                  {this.props.hospitals === undefined || this.props.hospitals.length === 0 ? <div className={'d-flex justify-content-center w-100'}><Spinner size={'lg'} /></div> :
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên</th>
                          <th>Số Điện Thoại</th>
                          <th>Địa chỉ</th>
                          <th>Chuyên Khoa</th>
                          <th>Xóa</th>
                          <th>Sửa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.hospitals.map(patient => (
                          <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.fullName}</td>
                            <td>{patient.telNumber}</td>
                            <td>{patient.address}</td>
                            <td>{patient.specializeds}</td>
                            <td><Button onClick={() => this.deleteButtonHandler(patient.id)} type={'button'} color={'info'}>Xóa</Button></td>
                            <td><UpdatePatient id={patient.id}/></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  hospitals: state.adminReducer.hospitals,
  pages: state.adminReducer.patientPages
})

const mapDispatchToProps = dispatch => ({
  fetchHospitals : response => dispatch(fetchHospitals(response)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Hospital);
