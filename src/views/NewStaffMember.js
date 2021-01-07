import React from 'react'
import { withRouter } from 'react-router'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Alert, Button } from 'reactstrap';
import { addNewStaffMember } from '../services/admin.services';

export const NewStaffMember = (props) => {
    const [error, setError] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const newStaffMemberButtonHandler = () => {
        let newStaffMember = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            gender: gender,
            jobRole: document.getElementById('jobRole').value,
            dob: document.getElementById('dob').value,
            telNumber: document.getElementById('telNumber').value,
            address: document.getElementById('address').value
        }
        addNewStaffMember(newStaffMember).then(_ => props.history.push('/admin/staff-members/1')).catch(e => setError(e.message));
    }
    return (
        <div className={'content'}>
            <Container fluid>
                <Row>
                    {error !== null && <Alert color={'info'} className={'w-100 font-weight-bold'}>{error}</Alert>}
                    <Col md={12}>
                        <Breadcrumb>
                            <BreadcrumbItem>Nhân Viên</BreadcrumbItem>
                            <BreadcrumbItem>Nhân Viên Mới</BreadcrumbItem>
                        </Breadcrumb>
                        <Card>
                            <CardHeader>
                                Nhân Viên Mới
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'fullName'}>Họ và tên</Label>
                                            <Input type={'text'} id={'fullName'} placeholder={'Type Staff Member Name'}/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'email'}>Email</Label>
                                            <Input type={'email'} id={'email'} placeholder={'Type Email Address'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={4}>
                                            <Label fro={'dob'}>D.O.B</Label>
                                            <Input type={'date'} id={'dob'} required/>
                                        </Col>
                                        <Col md={4}>
                                            <Label for={'nic'}>Vai Trò</Label>
                                            <Input type={'select'} id={'jobRole'} placeholder={'Type NIC'} required>
                                                <option value={'Accountant'}>
                                                    Accountant
                                                </option>
                                                <option value={'Nurse'}>
                                                    Nurse
                                                </option>
                                            </Input>
                                        </Col>
                                        <Col md={4}>
                                            <CustomInput onChange={value=> setGender(value.target.value)} type={'radio'} label={'Male'} value={'male'} name={'gender'} id={'male'} />
                                            <CustomInput onChange={value=> setGender(value.target.value)} type={'radio'} label={'Female'} value={'female'} name={'gender'} id={'female'}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={6}>
                                            <Label for={'telNum'}>Số điện thoại</Label>
                                            <Input type={'tel'} id={'telNumber'} placeholder={'Type Telephone Number'} required/>
                                        </Col>
                                        <Col md={6}>
                                            <Label for={'address'}>Địa chỉ</Label>
                                            <Input type={'textarea'} placeholder={'Type Address'} id={'address'} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={3}>
                                            <Button onClick={newStaffMemberButtonHandler} color={'dark'}>Gửi</Button>
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



export default withRouter(NewStaffMember);
