import React from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, CustomInput, Button, Alert } from 'reactstrap'
import { withRouter } from 'react-router';
import { addNewPatient } from '../services/admin.services';

const NewPatient = (props) => {

    const [gender, setGender] = React.useState(null);
    const [error, setError] = React.useState(null);
    const newPatientButtonHandler = () => {
        let newPatient = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            gender: gender,
            nic: document.getElementById('nic').value,
            dob: document.getElementById('dob').value,
            telNumber: document.getElementById('telNumber').value,
            address : document.getElementById('address').value
        }
        addNewPatient(newPatient).then(_ => props.history.push('/admin/dashboard')).catch(e => setError(e.message));
    }
    return (
        <div className={'content'}>
            <Container fluid>
                <Row>
                    {error !== null && <Alert color={'info'} className={'w-100 font-weight-bold'}>{error}</Alert>}
                    <Col md={12}>
                        <Breadcrumb>
                            <BreadcrumbItem>Bệnh Nhân</BreadcrumbItem>
                            <BreadcrumbItem>Bệnh Nhân Mới</BreadcrumbItem>
                        </Breadcrumb>
                        <Card>
                            <CardHeader>
                                Bệnh Nhân Mới
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'fullName'}>Họ và tên</Label>
                                            <Input type={'text'} id={'fullName'} placeholder={'Type Patient Name'}/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'email'}>Email</Label>
                                            <Input type={'email'} id={'email'} placeholder={'Type Email Address'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={4}>
                                            <Label fro={'dob'}>Ngày Sinh</Label>
                                            <Input type={'date'} id={'dob'} required/>
                                        </Col>
                                        <Col md={4}>
                                            <Label for={'nic'}>NIC</Label>
                                            <Input type={'text'} id={'nic'} placeholder={'Type NIC'} required/>
                                        </Col>
                                        <Col md={4}>
                                            <CustomInput onChange={value=> setGender(value.target.value)} type={'radio'} label={'Male'} value={'male'} name={'gender'} id={'male'} />
                                            <CustomInput onChange={value=> setGender(value.target.value)} type={'radio'} label={'Female'} value={'female'} name={'gender'} id={'female'}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'telNum'}>Số Điện Thoại</Label>
                                            <Input type={'tel'} id={'telNumber'} placeholder={'Type Telephone Number'} required/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'address'}>Địa Chỉ</Label>
                                            <Input type={'textarea'} placeholder={'Type Address'} id={'address'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={3}>
                                            <Button onClick={newPatientButtonHandler} color={'dark'}>Gửi</Button>
                                        </Col>
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

export default withRouter(NewPatient);
