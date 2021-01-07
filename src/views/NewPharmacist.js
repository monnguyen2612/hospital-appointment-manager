import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Button, Alert } from 'reactstrap';
import { addNewPharmacist } from '../services/admin.services';
import { withRouter } from 'react-router';

export const NewPharmacist = (props) => {
    const [gender, setGender] = React.useState(null);
    const [error, setError] = React.useState(null);
    const submitButtonHandler = () => {
        let newPharmacist = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            gender: gender,
            dob: document.getElementById('dob').value,
            telNumber: document.getElementById('telNumber').value,
            address: document.getElementById('address').value
        }
        addNewPharmacist(newPharmacist).then(_ => props.history.push('/admin/pharmacists/1')).catch(e => setError(e.message));
    }
    return (
        <div className={'content'}>
            <Row>
                {error !== null && <Alert className={'w-100'}>{error}</Alert>}
                <Col md={12}>
                    <Card>
                        <CardHeader>Dược Sĩ</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Col md={6}>
                                        <Label for={'fullName'}>Họ và tên</Label>
                                        <Input type={'text'} id={'fullName'} placeholder={'Type Fullname Name'}/>
                                    </Col>
                                    <Col md={6}>
                                        <Label for={'email'}>Email</Label>
                                        <Input type={'email'} id={'email'} placeholder={'Type Email ADdress'} required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={6}>
                                        <Label fro={'dob'}>Ngày tháng năm sinh</Label>
                                        <Input type={'date'} id={'dob'} required/>
                                    </Col>
                                    <Col md={6}>
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
                                        <Button onClick={submitButtonHandler} color={'dark'}>Gửi</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


export default withRouter(NewPharmacist);
