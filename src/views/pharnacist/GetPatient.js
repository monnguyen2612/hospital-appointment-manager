import React from 'react'
import { Row, Col, Container, Form, FormGroup, Label, Input, Card, CardBody, Button, Alert } from 'reactstrap';
import { loginToPatient } from 'redux/actions/doctor.action';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getPatient } from '../../services/pharmacist.services';

function GetPatient(props) {
    const [error, setError] = React.useState(null);
    const loginButtonHandler = () => {
        getPatient({id: document.getElementById('id').value}).then(response => {
            props.setPatient(response);
            props.history.push('/pharmacist/prescription');
        }).catch(e => {
            setError(e.response.data.MESSAGE);
        })
    }
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
                                {error !== null &&<Alert>{error}</Alert>}
                                <Form>
                                    <FormGroup>
                                        <Label>Danh tính bệnh nhân</Label>
                                        <Input type={'text'} placeholder={'Enter Patient ID'} id={'id'}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button onClick={loginButtonHandler} color={'primary'}>Đăng nhập</Button>
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
const mapStateToProps = (state) => ({
    patient: state.doctorReducer.patient
})

const mapDispatchToProps = dispatch => ({
    setPatient: patient => dispatch(loginToPatient(patient))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetPatient));
