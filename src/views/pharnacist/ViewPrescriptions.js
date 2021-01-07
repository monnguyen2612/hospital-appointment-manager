import React from 'react'
import { Row, Col, Spinner, Table } from 'reactstrap';
import { getPrescriptionByPatient } from '../../services/pharmacist.services';
import { connect } from 'react-redux';
import ImageView from '../../components/modals/ImageView';

function ViewPrescriptions(props) {
    const [patientList, setPatientList] = React.useState([]);
    React.useEffect(() => { 
        if (props.patient !== null)
            getPrescriptionByPatient(props.patient.id).then(response => {
                setPatientList(response);
            }).catch(e => {
                console.log(e);
            })
    }, []);
    return (
        <div className={'content'}>
            <Row>
                <Col md={12}>
                    {patientList.length === 0 ? <div className={'d-flex justify-content-center w-100'}>
                        <Spinner size={'lg'}/>
                    </div> :
                        <Table>
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>ID Số khám bệnh</th>
                                    <th>Số khám bệnh</th>
                                    <th>Ngày bắt đầu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientList.map((patient , index) => <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{patient.patient_id}</td>
                                    <td>
                                        <ImageView prescription={patient.prescription} imageUrl={patient.image_url}/>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    patient: state.doctorReducer.patient
});

export default connect(mapStateToProps)(ViewPrescriptions);
