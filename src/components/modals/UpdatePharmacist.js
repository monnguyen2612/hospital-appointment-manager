import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Spinner, Input } from 'reactstrap'
import { getById , updatePharmacist } from '../../services/admin.services';

export default function UpdatePharmacist({ id }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    const [pharmacist, setPharmacist] = React.useState(null);
    React.useEffect(() => { getById(4, id).then(response => setPharmacist(response)) }, []);
    const updateButtonHandler = () => {
        let pharmacist = {
            id: id,
            address: document.getElementById('address').value,
            telNumber: document.getElementById('telNumber').value,
            fullName: document.getElementById('fullName').value
        }
        updatePharmacist(pharmacist).then(_ => window.location.reload()).catch(e => console.log(e));
    }
    return (
        <React.Fragment>
            <Button color={'danger'} outline onClick={toggle}>Update</Button>
            <Modal toggle={toggle} isOpen={open}>
                <ModalHeader>Update Pharmacist</ModalHeader>
                <ModalBody>
                    {pharmacist !== null ? <Form>
                        <FormGroup>
                            <Label for={'fullName'}>Fullname</Label>
                            <Input type={'text'} placeholder={'Type Fullname'} defaultValue={pharmacist.full_name} id={'fullName'} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'address'}>Address</Label>
                            <Input type={'textarea'} placeholder={'Type Address'} id={'address'} defaultValue={pharmacist.address} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'telNumber'}>Telephone Number</Label>
                            <Input type={'text'} placeholder={'Type Telephone Nunber'} id={'telNumber'} defaultValue={pharmacist.tel_number} required/>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={updateButtonHandler} color={'dark'}>Update</Button>
                        </FormGroup>
                    </Form> :
                        <div className={'d-flex justify-content-center'}>
                            <Spinner size={'lg'}/>
                        </div>
                    }
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
