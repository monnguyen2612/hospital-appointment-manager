import React from 'react'
import { Container, FormGroup, Input, Label, Form, Button, Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/user.action';
import { login , validateToken } from '../services/auth.services';
import { withRouter } from 'react-router';


const Login = (props) => {
    if (localStorage.getItem('authToken') !== null) {
        validateToken().then(res => {
            if (res.role === 1)
                window.location.replace('/admin/dashboard/1');
            else if (res.role === 2) {
                window.location.replace('/login-to-patient');
            } else if (res.role === 3) {
                window.location.replace('/patient/my-prescriptions/1');
            }
        })
    }
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [warningShow, setWarningShow] = React.useState(false);
    const userLogin = () => {
        login(email, password).then(res => {
            localStorage.setItem('authToken', res.token);
            if (res.user.role === 1)
                window.location.replace('/admin/dashboard/1');
            else if (res.user.role === 2) {
                props.history.replace('login-to-patient');
            } else if (res.user.role === 3)
                props.history.replace('/patient/my-prescriptions/1');
            else if (res.user.role === 4)
                props.history.replace('get-patient-by-id');
        }).catch(e => setWarningShow(true)).catch(e => console.log(e));
    }
    return(
        <div className={'vh-100 login-screen-bg'}>
            <Container fluid className={'h-100'}>
                <Row className={'h-100'}>
                    <Col md={4} className={'align-self-center offset-md-4 bg-light'}>
                        {warningShow && <Alert color={'primary'} className={'text-center text-dark font-weight-bold mb-2'}>Wrong Email Or Password</Alert>}
                        <Form>
                            <FormGroup>
                                <Label for={'email'}>Email</Label>
                                <Input onChange={val=> setEmail(val.target.value)} type={'email'} placeholder={'Type Email Address'} id="email" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for={'password'}>Mật khẩu</Label>
                                <Input onChange={val=> setPassword(val.target.value)} type={'password'} placeholder={'Type Password'} id="passowrd" required />
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={userLogin} className={'btn-round'} color={'info'}>Đăng nhập</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
const mapStateToProps = (state) => ({
    user: state.userReducer.user
})

const mapDispatchToProps = dispatch=> {
    return {
        login: user => dispatch(loginUser(user)),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));