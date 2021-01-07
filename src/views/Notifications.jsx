
import React from "react";
import { fetchStaffMembers } from '../redux/actions/admin.action';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Container,
  Spinner,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import PagesDropdown from "../components/util/PagesDropdown";
import { Link } from "react-router-dom";
import { getAllStaffMembers ,deleteUser } from '../services/admin.services';
import UpdateStaffMember from '../components/modals/UpdateStaffMember';
class Notifications extends React.Component {
  state = {
    visible: true
  };

  componentDidMount() {
    getAllStaffMembers(this.props.match.params.pageNo).then(jsonResponse => {
      this.props.setStaffMembers(jsonResponse);
    }).catch(e => console.log(e));
  }
  deleteButtonHandler = (memberId) => {
    deleteUser(memberId, 5).then(_ => window.location.reload()).catch(_ => this.props.history.push('/')).catch(_ => this.setState({ showAlert: true })).catch(_ => this.setState({ showAlert: true }));
  }
  
  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col md={12}>
                <Row className={'mb-4'}>
                  <Col md={6}>
                    <PagesDropdown size={this.props.pages} />
                  </Col>
                  <Col md={6}>
                    <Link to={'/admin/new-staff-member'} className={'btn btn-dark'}>Add New Staff Member</Link>
                  </Col>
                </Row>
                {this.props.staffMembers.length === 0 ?
                  <div className={'w-100 d-flex justify-content-center'}>
                    <Spinner size={'lg'}/>
                  </div>
                  :
                  <Card>
                    <CardHeader>Staff Members</CardHeader>
                    <CardBody>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job Role</th>
                            <th>Gender</th>
                            <th>Tel Number</th>
                            <th>Address</th>
                            <th>Delete</th>
                            <th>Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.staffMembers.map((member , index) =>
                            <tr key={index}>
                              <td>{member.full_name}</td>
                              <td>{member.email}</td>
                              <td>{member.job_role}</td>
                              <td>{member.gender}</td>
                              <td>{member.tel_number}</td>
                              <td>{member.address}</td>
                              <td><Button color={'primary'} onClick={() => this.deleteButtonHandler(member.id)}>Delete</Button></td>
                              <td><UpdateStaffMember id={member.id}/></td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                }
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  staffMembers: state.adminReducer.staffMembers,
  pages : state.adminReducer.staffMembersPages
})

const mapDispatchToProps = dispatch => ({
  setStaffMembers : response=> dispatch(fetchStaffMembers(response))
});

export default connect(mapStateToProps,mapDispatchToProps) (Notifications);
