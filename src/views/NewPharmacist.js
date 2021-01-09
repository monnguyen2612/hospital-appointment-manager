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
            hospitals: document.getElementById('hospitals').value
        }
        addNewPharmacist(newPharmacist).then(_ => props.history.push('/admin/pharmacist/1')).catch(e => setError(e.message));
    }
    return (
        <div className={'content'}>
            <Row>
                {error !== null && <Alert className={'w-100'}>{error}</Alert>}
                <Col md={12}>
                    <Card>
                        <CardHeader>Chuyên Khoa</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Col md={12}>
                                        <Label for={'fullName'}>Tên Khoa</Label>
                                        <Input type={'text'} id={'fullName'} placeholder={'Type Specialized'}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={6}>
                                        <Label for={'hospitals'}>Bệnh Viện</Label>
                                        <Input type={'textarea'} placeholder={'Type Hospital'} id={'hospitals'} required/>
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
