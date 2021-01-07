import React from 'react'
import { Row, Col, Spinner, Card, CardHeader, CardBody, Table, Alert } from 'reactstrap';
import { getMyPrescriptions } from '../../services/patient.service';
import PagesDropdown from 'components/util/PagesDropdown';
import ImageView from '../../components/modals/ImageView';

export default function MyPrescriptions(props) {
    const [prescriptionList, setPrescriptionList] = React.useState([]);
    const [pages, setPages] = React.useState(0);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        getMyPrescriptions(props.match.params.pageNo).then(response => {
            setPrescriptionList(response.prescriptions);
            setPages(response.pages);
        }).catch(error => { 
            setError(error.response.data.MESSAGE);
        });
    }, []);

    return (
        <div className={'content'}>
            <Row>
                <Col md={12}>
                    {error !== null && <Alert>{error}</Alert>}
                    <Row>
                        <Col md={4}>
                            <PagesDropdown size={pages}/>
                        </Col>
                    </Row>
                    {prescriptionList.length === 0 ? <div className={'d-flex justify-content-center w-100'}>
                        <Spinner size={'lg'}/>
                    </div>
                        :
                        <Card>
                            <CardHeader>Sổ khám</CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Sổ khám</th>
                                            <th>Lời chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptionList.map((prescription, index) => <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{prescription.issued_date}</td>
                                            <td>
                                                <ImageView prescription={prescription.prescription} imageUrl={prescription.image_url}/>
                                            </td>
                                            <td>{prescription.comment}</td>
                                        </tr>)}
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
