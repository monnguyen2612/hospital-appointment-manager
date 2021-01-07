import React from 'react';
import { Container , Form, FormGroup, Col, Input, Row, Label, Card, CardBody, CardHeader , Breadcrumb , BreadcrumbItem, CustomInput, Button, Alert } from 'reactstrap'
import { addDoctor } from '../services/admin.services';
import { withRouter } from 'react-router';

function NewDoctor(props) {

    const [gender, setGender] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);
    const addDoctorButtonHandler = () => {
        if(document.getElementById('fullName').value.length > 0 && document.getElementById('email').value.length > 0)
            addDoctor(document.getElementById('fullName').value, document.getElementById('email').value, document.getElementById('address').value, document.getElementById('specialties').value, gender, document.getElementById('regNumber').value, document.getElementById('telNumber').value).then(jsonResponse => props.history.push('/admin/dashboard/1')).catch(err => setShowAlert(true)).catch(networkError => console.log(networkError));
    }
    return (
        <div className={'content'}>
            <Container fluid className={'h-100'}>
                <Row>
                    <Col md={12} className={'align-self-center'}>
                        <Breadcrumb color={'primary'}>
                            <BreadcrumbItem>Dashboard</BreadcrumbItem>
                            <BreadcrumbItem active>Thêm Bác Sĩ</BreadcrumbItem>
                        </Breadcrumb>
                        <Card className={'p-4'}>
                            <CardHeader>
                                Thêm Bác Sĩ mới
                            </CardHeader>
                            <CardBody>
                                {showAlert && <Alert color={'primary'} className={'text-center'}>This Doctor Exists</Alert>}
                                <Form>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'fullName'}>Họ Và Tên</Label>
                                            <Input bsSize={'sm'} type={'text'} placeholder={'Type Fullname'} id={'fullName'} required/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'email'}>Email</Label>
                                            <Input type={'email'} placeholder={'Type Email'} id={'email'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'telNumber'}>Số điện thoại</Label>
                                            <Input type={'tel'} placeholder={'Type Telephone Number'} id={'telNumber'} required/>
                                        </Col>
                                        <Col md={6}>
                                            <div>
                                                <CustomInput onChange={value=> setGender(value.target.value)} type={'radio'} id={'genderMale'} name={'gender'} value={'male'} label={'Male'} />
                                                <CustomInput onChange={value=>setGender(value.target.value)} type={'radio'} id={'genderFemale'} name={'gender'} value={'female'} label={'Female'}/>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'specialties'}>Chuyên Khoa</Label>
                                            <Input type={'textarea'} placeholder={'Type Specialities'} id={'specialties'} required/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'address'}>Địa Chỉ</Label>
                                            <Input type={'textarea'} placeholder={'Type Address'} id={'address'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={'regNumber'}>Số Đăng Kí</Label>
                                        <Input type={'text'} placeholder={'Type Register Number'} id={'regNumber'} required/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={1} className={'mr-4'}>
                                            <Button type={'button'} onClick={addDoctorButtonHandler} color={'primary'}>Gửi</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button color={'info'}>Hủy</Button>
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

export default withRouter(NewDoctor);
