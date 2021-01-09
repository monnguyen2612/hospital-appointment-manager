import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Button, Alert } from 'reactstrap';
import { addNewHospital } from '../services/admin.services';
import { withRouter } from 'react-router';

export const NewHospital = (props) => {
    const [gender, setGender] = React.useState(null);
    const [error, setError] = React.useState(null);
    const submitButtonHandler = () => {
        let newHospital = {
            fullName: document.getElementById('fullName').value,
            specializeds: document.getElementById('specializeds').value,
            address: document.getElementById('address').value,
            image: document.getElementById('image').value
        }
        addNewHospital(newHospital).then(_ => props.history.push('/admin/pharmacists/1')).catch(e => setError(e.message));
    }
    return (
        <div className={'content'}>
            <Row>
                {error !== null && <Alert className={'w-100'}>{error}</Alert>}
                <Col md={12}>
                    <Card>
                        <CardHeader>Bệnh Viện</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Col md={6}>
                                        <Label for={'fullName'}>Tên Bệnh Viện</Label>
                                        <Input type={'text'} id={'fullName'} placeholder={'Type Fullname Name'}/>
                                    </Col>
                                    <Col md={6}>
                                            <Label for={'address'}>Địa Chỉ</Label>
                                            <Input type={'textarea'} placeholder={'Type Address'} id={'address'} required/>
                                        </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={6}>
                                        <Label for={'specializeds'}>Chuyên Khoa</Label>
                                        <Input type={'textarea'} placeholder={'Type Specializeds'} id={'specializeds'} required/>
                                    </Col>
                                    <Col md={6}>
                                        <Label for={'image'}>Hình Ảnh</Label>
                                        <Input type={'textarea'} placeholder={'Link Image'} id={'image'} required/>
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


export default withRouter(NewHospital);
