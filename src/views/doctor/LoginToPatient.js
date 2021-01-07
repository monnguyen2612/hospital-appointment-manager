import React, { Component } from 'react'
import { Row, Col, Container, Form, FormGroup, Label, Input, Card, CardBody, Button, Alert } from 'reactstrap';
import { loginToPatientProfile } from '../../services/doctor.services';
import { loginToPatient } from 'redux/actions/doctor.action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class LoginToPatient extends Component {

    state = {
        error : null
    }
    loginButtonHandler = () => {
        loginToPatientProfile({ id: document.getElementById('id').value }).then(res => {
            this.props.setPatient(res);
            this.props.history.push('/doctor/add-prescription');
        }).catch(e => {
            this.setState({
                error : e.response.data.MESSAGE
            })
        });
    }
    render() {
        return (
            <div className={'vh-100'}>
                <Container fluid className={'h-100'}>
                    <Row>
                        <Col md={6}>
                            <Button className={'btn-round'}><i className="fas fa-tachometer-alt mr-3"></i>Profile</Button>
                        </Col>
                    </Row>
                    <Row className={'h-100'}>
                        <Col md={4} className={'align-self-center offset-md-4'}>
                            <Card className={'bg-light'}>
                                <CardBody>
                                    {this.state.error !== null &&<Alert>{this.state.error}</Alert>}
                                    <Form>
                                        <FormGroup>
                                            <Label>ID Bệnh Nhân</Label>
                                            <Input type={'text'} placeholder={'Enter Patient ID'} id={'id'}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button onClick={this.loginButtonHandler} color={'primary'}>Đăng Nhập</Button>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    patient : state.doctorReducer.patient
})

const mapDispatchToProps = dispatch => ({
    setPatient: patient => dispatch(loginToPatient(patient))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginToPatient));