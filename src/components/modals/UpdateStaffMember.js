import React from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Spinner, Button } from 'reactstrap'
import { getById , updateStaffMember } from '../../services/admin.services';

export default function UpdatestaffMember({ id }) {
    const [staffMember, setstaffMember] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    React.useEffect(() => {getById(5, id).then(response => setstaffMember(response)).catch(e => console.log(e))}, []);
    const updateButtonHandler = () => {
        let staffMember = {
            id: id,
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            telNumber: document.getElementById('telNumber').value,
            jobRole: document.getElementById('jobRole').value
        }

        updateStaffMember(staffMember).then(_ => window.location.reload()).catch(err => console.log(err));
    }
    return (
        <>
            <Button outline onClick={toggle} color={'danger'}>Update</Button>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>Update staffMember</ModalHeader>
                <ModalBody>
                    {staffMember === null ? <div className={'d-flex justify-content-center'}>
                        <Spinner size={'lg'} />
                    </div> :
                        <Form>
                            <FormGroup>
                                <Label for={'fullName'}>Full Name</Label>
                                <Input type={'text'} defaultValue={staffMember.full_name} id={'fullName'} placeholder={'Type Fullname'} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for={'address'}>Address</Label>
                                <Input type={'textarea'} defaultValue={staffMember.address} placeholder={'Type Address'} id={'address'} />
                            </FormGroup>
                            <FormGroup>
                                <Label for={'telNumber'}>Tel Number</Label>
                                <Input type={'text'} id={'telNumber'} defaultValue={staffMember.tel_number} required placeholder={'Type Telephone Number'}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for={'jobRole'}>Job Role</Label>
                                <Input type={'select'} id={'jobRole'} placeholder={'Type NIC'} required>
                                    <option value={staffMember.job_role}>
                                        {staffMember.job_role}
                                    </option>
                                    <option value={'Accountant'}>
                                        Accountant
                                    </option>
                                    <option value={'Nurse'}>
                                        Nurse
                                    </option>
                                </Input>
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
