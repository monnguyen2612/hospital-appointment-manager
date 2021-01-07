import React from 'react'
import { Modal, ModalBody, ModalHeader, Form, Input, FormGroup, Button, Label, CustomInput, Spinner } from 'reactstrap';
import { getById , updateDoctor } from '../../services/admin.services';
export const UpdateDoctor = ({id}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [doctor, setDoctor] = React.useState(null);
    React.useEffect(() => { 
        getById(2, id).then(doctor => setDoctor(doctor)).catch(e => console.log(e));
    }, []);
    const updateButtonHandler = () => {
        let doctor = {
            id: id,
            address: document.getElementById('address').value,
            telNumber: document.getElementById('telNumber').value,
            specialities: document.getElementById('specialities').value,
            fullName: document.getElementById('fullName').value,
            regNumber: document.getElementById('regNumber').value
        }
        updateDoctor(doctor).then(_ => window.location.reload()).catch(err => console.log(err));
    }
    return (
        <>
            <Button outline onClick={()=> setIsOpen(true)} color={'danger'}>Update Doctor</Button>
            <Modal isOpen={isOpen} toggle={toggle} color={'secondary'}>
                <ModalHeader className={'bg-light'}>Update Doctor</ModalHeader>
                <ModalBody>
                    {doctor !== null ? <Form>
                        <FormGroup>
                            <Label for={'fullName'}>full Name</Label>
                            <Input bsSize={'sm'} defaultValue={doctor.full_name} type={'text'} className={'form-control form-control-sm'} placeholder={'Type Doctor Name'} id={'fullName'}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'telNumber'}>Telephone Number</Label>
                            <Input type={'tel'} defaultValue={doctor.tel_number} placeholder={'Type Telephone Number'} id={'telNumber'}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'specialities'}>Specialities</Label>
                            <Input type={'textarea'} defaultValue={doctor.specialities} placeholder={'Type Specialities'} id={'specialities'}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'address'}>Address</Label>
                            <Input type={'textarea'} id={'address'} defaultValue={doctor.address}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={'regNumber'}>Reg Number</Label>
                            <Input type={'text'} id={'regNumber'} defaultValue={doctor.reg_number}/>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={updateButtonHandler} color={'primary'}>Update</Button>
                        </FormGroup>
                    </Form> :
                        <div className={'d-flex h-100 align-items-center justify-content-center w-100'}>
                            <Spinner size={'lg'}/>
                        </div>
                    }
                </ModalBody>
            </Modal>
        </>
    )
}

export default UpdateDoctor;
