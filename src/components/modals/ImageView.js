import React from 'react'
import { Modal, ModalBody, Card, CardHeader, CardBody } from 'reactstrap'

export default function ImageView({ imageUrl , prescription }) {
    const [open, isOpen] = React.useState(false);
    const toggle = () => {
        isOpen(!open);
    }
    console.log(prescription);
    return (
        <>
            <img onClick={toggle} src={imageUrl} height={80} width={80} alt={'...'} className={'img-fluid'} />
            <Modal isOpen={open} toggle={toggle}>
                <ModalBody>
                    <img src={imageUrl} height={'100%'} width={'100%'} alt={'....'} />
                    <Card className={'mt-4 w-100'}>
                        <CardHeader>Prescription</CardHeader>
                        <CardBody>
                            {prescription.split(/\n/g||[]).map((value) => <ul>
                                <li>{value}</li>
                            </ul>)}
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        </>
    )
}
