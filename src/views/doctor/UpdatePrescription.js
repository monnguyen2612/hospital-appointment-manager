import React from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput, Card, CardBody, Spinner, Button } from 'reactstrap'
import { getPrescriptionById , updatePrescription } from '../../services/doctor.services';
import { withRouter } from 'react-router';

function UpdatePrescription(props) {

    const [prescription, setPrescription] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const fileOnchangeHandler = (value) => {
        setPreviewUrl(window.URL.createObjectURL(value.target.files[0]));
        let fileReader = new FileReader();
        fileReader.readAsDataURL(value.target.files[0])
        fileReader.onloadend = function () {
            setImage(fileReader.result.split(',')[1]);
        }
    }

    React.useEffect(() => { 
        getPrescriptionById(props.match.params.prescriptionId).then(prescription => {
            setPrescription(prescription);
            setPreviewUrl(prescription.image_url);
            console.log(prescription);
        }).catch(e => console.log(e));
    }, []);
    const updateButtonHandler = () => {
        let prescription = {
            id: props.match.params.prescriptionId,
            comment: document.getElementById('comment').value,
            prescription: image,
            prescriptionDetails: document.getElementById('prescriptionDetails').value,
        }
        updatePrescription(prescription).then(_ => props.history.replace('/doctor/add-prescription')).catch(e => console.log(e));
    }
    return (
        <div className={'content'}>
            <Container>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                {prescription === null ?
                                    <Spinner size={'lg'} />
                                    :
                                    <Form>
                                        <FormGroup>
                                            <Label for={'comment'}>Chú Thích</Label>
                                            <Input type={'textarea'} placeholder={'Type Comment'} id={'comment'} defaultValue={prescription !== null ? prescription.comment : null} required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for={'prescriptionDetails'}>Sổ Khám</Label>
                                            <Input type={'textarea'} placeholder={'Type Prescription'} id={'prescriptionDetails'} defaultValue={prescription.prescription} required/>
                                        </FormGroup>
                                        <FormGroup style={{minHeight : 250}} className={'bg-light d-flex align-items-center justify-content-center'}>
                                            <Label for={'prescription'}>
                                                <img src={previewUrl} className={'img-fluid rounded mx-auto d-block'} height={200} width={200} alt={'preview'}/>
                                            </Label>
                                            <CustomInput className={'d-none'} onChange={fileOnchangeHandler} type="file" id="prescription" name="prescription" label="Yo, pick a file!" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color={'primary'} onClick={updateButtonHandler}>Cập nhật</Button>
                                        </FormGroup>
                                    </Form>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default withRouter(UpdatePrescription);
