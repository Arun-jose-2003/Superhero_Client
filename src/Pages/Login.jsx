import { useState,useContext } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Shield } from 'lucide-react';
import {loginAPI} from '../Services/allAPI'
import { TokenAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



function Login() {
  const { isAuthorised, setIsAuthorised } = useContext(TokenAuthContext);

const navigate=useNavigate()
  const [userData,setUserData]=useState({
  email:"",password:""
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userData

    if (!email || !password) {
        alert("please fill empty fields")
    } else {
       
        try {
            const result = await loginAPI({email,password})
            console.log(result);
            if (result.status === 200) {
                sessionStorage.setItem("username",result.data.username)
                sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
                alert( `Login successfully!`);
                navigate('/')
                setIsAuthorised(true)
     
               
                setUserData({ email: "", password: "" })
            } else {
                alert(result.response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

  return (
    <Container fluid className="d-flex min-vh-100 justify-content-center align-items-center bg-gradient" style={{ background: 'linear-gradient(135deg, #0044cc 0%, #ff0000 100%)' }}>
      <Card className="p-4 shadow-lg animate__animated animate__fadeInUp" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
        <Card.Body className="text-center">
          <Shield className="mx-auto mb-3 text-warning animate__animated animate__pulse animate__infinite" size={60} />
          <h2 className="mb-4 text-gradient" style={{ background: 'linear-gradient(to right, #ffcc00, #ff0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome, Hero</h2>
          <p className="text-muted mb-4">Sign in to protect the world</p>

          <Form  className="text-start">
            <Form.Group className="mb-3 animate__animated animate__fadeInLeft" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} 
                required
                className="shadow-sm focus-shadow"
              />
            </Form.Group>

            <Form.Group className="mb-3 animate__animated animate__fadeInRight" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} 
                required
                className="shadow-sm focus-shadow"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleLogin}
              className="w-100 mb-3 btn-lg shadow animate__animated animate__heartBeat animate__delay-2s"
              style={{ transition: '0.3s', background: 'linear-gradient(90deg, #ffcc00, #ff0000)', border: 'none' }}
              onMouseOver={(e) => e.currentTarget.classList.add('shadow-lg')}
              onMouseOut={(e) => e.currentTarget.classList.remove('shadow-lg')}
            >
              <Shield className="me-2" size={20} /> Sign in
            </Button>
          </Form>

          <div className="d-flex justify-content-between mt-4 animate__animated animate__fadeInUp">
            {/* <a href="#" className="text-decoration-none link-hover" style={{ color: '#ffcc00', fontWeight: 'bold' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffdc00'} onMouseOut={(e) => e.currentTarget.style.color = '#ffcc00'}>Forgot your password?</a> */}
            <a href="/register" className="text-decoration-none link-hover" style={{ color: '#ffcc00', fontWeight: 'bold' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffdc00'} onMouseOut={(e) => e.currentTarget.style.color = '#ffcc00'}>New hero? Sign up</a>
          </div>
        </Card.Body>
      </Card>
      
    </Container>
  );
}
export default Login;
