import React from 'react'
import { Row, Col, Table, Card, CardBody, Button, Spinner } from 'reactstrap'
import { connect } from 'react-redux';
import { getMyPrescription , deletePrescription } from '../../services/doctor.services';
import { getMyPrescriptions } from '../../redux/actions/doctor.action';
import ImageView from '../../components/modals/ImageView';
function MyPrescriptions(props) {
    React.useEffect(() => {
        getMyPrescription().then(response => {
            console.log(response);
            props.setPrescriptions(response);
        }).catch(e => console.log(e));
        // console.log('hello');
        // props.setPrescriptions('hjhv');
    }, []);
    const deletePrescriptionButtonHandler = (prescriptionId) => {
        deletePrescription(prescriptionId).then(_ => props.history.replace(props.location.pathname)).catch(e => console.log(e));
    }
    return (
        <div className={'content'}>
            <Row>
                <Col md={12}>
                    {
                        props.prescriptions.length === 0 ?
                            <div className={'d-flex w-100 bg-transparent justify-content-center'}>
                                <Spinner size={'lg'} />
                            </div>
                            :
                            <Card>
                                <CardBody>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Lời chú</th>
                                                <th>Hình ảnh</th>
                                                <th>Bệnh nhân</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.prescriptions.map((prescription, index) => (
                                                <tr key={index}>
                                                    {console.log(prescription)}
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {prescription.comment}
                                                    </td>
                                                    <td>
                                                        <ImageView imageUrl={prescription.image_url} prescription={prescription.prescription}/>
                                                    </td>
                                                    <td>
                                                        {prescription.full_name}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => deletePrescriptionButtonHandler(prescription.id)} outline color={'danger'} size={'sm'}>Xóa</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                    }
                </Col>
            </Row>
        </div>
    )
}
const mapStateToProps = (state) => ({
   prescriptions : state.doctorReducer.prescriptions 
});
const mapDispatchToProps = dispatch => ({
    setPrescriptions: prescriptions => dispatch(getMyPrescriptions(prescriptions))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPrescriptions);