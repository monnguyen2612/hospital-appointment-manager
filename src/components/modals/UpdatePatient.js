import React from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Spinner, Button } from 'reactstrap'
import { getById , updatePatient } from '../../services/admin.services';

export default function UpdatePatient({ id }) {
    const [patient, setPatient] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    React.useEffect(() => {getById(3, id).then(response => setPatient(response)).catch(e => console.log(e))}, []);
    const updateButtonHandler = () => {
        let patient = {
            id: id,
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            telNumber: document.getElementById('telNumber').value,
            nic: document.getElementById('nic').value
        }

        updatePatient(patient).then(_ => window.location.reload()).catch(err => console.log(err));
    }
    return (
        <>
            <Button outline onClick={toggle} color={'danger'}>Update</Button>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>Update Patient</ModalHeader>
                <ModalBody>
                    {patient === null ? <div className={'d-flex justify-content-center'}>
                        <Spinner size={'lg'} />
                    </div> :
                        <Form>
                            <FormGroup>
                                <Label for={'fullName'}>Full Name</Label>
                                <Input type={'text'} defaultValue={patient.full_name} id={'fullName'} placeholder={'Type Fullname'} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for={'address'}>Address</Label>
                                <Input type={'textarea'} defaultValue={patient.address} placeholder={'Type Address'} id={'address'} />
                            </FormGroup>
                            <FormGroup>
                                <Label for={'telNumber'}>Tel Number</Label>
                                <Input type={'text'} id={'telNumber'} defaultValue={patient.tel_number} required placeholder={'Type Telephone Number'}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for={'nic'}>NIC</Label>
                                <Input type={'text'} id={'nic'} defaultValue={patient.nic} required placeholder={'Type NIC'}/>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={updateButtonHandler} color={'primary'}>Update</Button>
                            </FormGroup>
                        </Form>
                    }
                </ModalBody>
            </Modal>
        </>
    )
}
