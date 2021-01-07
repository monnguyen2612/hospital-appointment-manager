import React from 'react'
import { Container, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CustomInput, Button, Collapse, Table } from 'reactstrap'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addPrescription , getPrescriptionByPatient , deletePrescription } from '../../services/doctor.services';
import { Link } from 'react-router-dom';

function AddPrescription(props) {
    const [previewUrl, setPreviewUrl] = React.useState('https://image.flaticon.com/icons/svg/685/685686.svg');
    const [image, setImage] = React.useState(null);
    const [open, isOpen] = React.useState(false);
    const [patientPrescriptionList, setPatientList] = React.useState([]);
    const fileOnchangeHandler = (val) => {
        setPreviewUrl(window.URL.createObjectURL(val.target.files[0]));
        let fileReader = new FileReader();
        fileReader.readAsDataURL(val.target.files[0])
        fileReader.onloadend = function () {
            setImage(fileReader.result.split(',')[1]);
        }
    }

    const deleteButtonHandler = (id) => {
        deletePrescription(id).then(_ => {
            props.history.push('my-prescriptions');
        }).catch(e => {
            console.log(e.response.data.MESSAGE); 
        });
    }

    const addPrescriptionButtonHandler = () => {
        let newPrescription = {
            comment: document.getElementById('comment').value,
            prescription: image,
            patientId: props.patient.id,
            prescriptionDetails: document.getElementById('prescriptionDetails').value,
        }
        addPrescription(newPrescription).then(res => {
            props.history.push('my-prescriptions');
        }).catch(e => console.log(e.message));
    }
    const toggle = () => isOpen(!open);
    React.useEffect(() => { 
        if (props.patient !== null)
            getPrescriptionByPatient(props.patient.id).then(response => setPatientList(response)).catch(error => console.log(error));
    }, []);
    if (props.patient == null) {
        return (
           <div className={'content'}>
                <Container>
                    <Button onClick={toggle} color={'secondary'}>Thêm Sổ Khám</Button>
                    <Collapse isOpen={open}>
                        <Card>
                            <CardHeader>

                                <Row>
                                    <Col md={6}>
                                        Thêm Sổ Khám
                                    </Col>
                                    <Col md={6}>
                                        {props.patient !== null ? props.patient.full_name : ''}
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md={12}>
                                        <Form>
                                            <FormGroup>
                                                <Label for={'comment'}>Lời chú</Label>
                                                <Input type={'textarea'} id={'comment'} placeholder={'Type Comment'}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for={'prescriptionDetails'}>Sổ Khám</Label>
                                                <Input type={'textarea'} id={'prescriptionDetails'} placeholder={'Type Prescription'} required/>
                                            </FormGroup>
                                            <FormGroup style={{minHeight : 250}} className={'bg-light d-flex align-items-center justify-content-center'}>
                                                <Label for={'prescription'}>
                                                    <img src={previewUrl} className={'img-fluid rounded mx-auto d-block'} height={200} width={200} alt={'preview'}/>
                                                </Label>
                                                <CustomInput className={'d-none'} onChange={fileOnchangeHandler} type="file" id="prescription" name="prescription" label="Yo, pick a file!" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button onClick={addPrescriptionButtonHandler} color={'secondary'}>Thêm</Button>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Collapse>
                    <Card>
                        <CardBody>
                            {patientPrescriptionList.length > 0 ?
                                <Table responsive hover bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Issue Date</th>
                                            <th>Comment</th>
                                            <th>Delete</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patientPrescriptionList.map((prescription, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{prescription.issued_date}</td>
                                                <td>{prescription.comment}</td>
                                                <td><Button onClick={()=> deleteButtonHandler(prescription.id)} color={'danger'} outline>Delete</Button></td>
                                                <td><Link className={'btn btn-dark btn-sm'} to={'update-prescription/'+prescription.id}>Update</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table> :
                                <h4>Chưa có sổ cho bệnh nhân này</h4>
                            
                            }
                        </CardBody>
                    </Card>
               </Container>
           </div>
    )
    } else {
        return (
            <div className={'content'}>
                <Container>
                    <h1>
                        There Is No patient
                    </h1>
                </Container>
            </div>
        );
   }
}

const mapStateToProps = (state) => ({
    patient: state.doctorReducer.patient,
});

export default withRouter(connect(mapStateToProps)(AddPrescription));