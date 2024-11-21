import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Shield } from 'lucide-react';
import {registerAPI} from '../Services/allAPI'
import { toast,ToastContainer } from 'react-toastify';

const Register = () => {
  const [userData,setUserData]=useState({
    username:"",email:"",password:""
  })
  

  const handleRegister=async(e)=>{
    e.preventDefault()
   
    const{username,email,password}=userData
    if(!username||!email||!password){
      alert("please fill the missing field")
    }else{
      
      try{
        const result=await registerAPI(userData)
        if(result.status==200){
          alert(`${result.data.username} has successfully registered`)
          navigate('/login')
          setUserData({username:"",email:"",password:""})
        }else{
         alert(result.response.data)
          
        }
        
      }catch(err){
        console.log(err);
        
      }
    }
  }


  return (
    <Container fluid className="d-flex min-vh-100 justify-content-center align-items-center bg-gradient" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
      <Card className="p-4 shadow-lg animate__animated animate__fadeInUp" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
        <Card.Body className="text-center">
          <Shield className="mx-auto mb-3 text-warning animate__animated animate__pulse animate__infinite" size={60} />
          <h2 className="mb-4 text-gradient" style={{ background: 'linear-gradient(to right, #ffcc00, #ff0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Join the Heroes</h2>
          <p className="text-muted mb-4">Sign up to protect the world</p>

          <Form  className="text-start">
            <Form.Group className="mb-3 animate__animated animate__fadeInLeft" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} 
                required
                className="shadow-sm focus-shadow"
              />
            </Form.Group>

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
              onClick={handleRegister}
              className="w-100 mb-3 btn-lg shadow animate__animated animate__heartBeat animate__delay-2s"
              style={{ transition: '0.3s', background: 'linear-gradient(90deg, #ffcc00, #ff0000)', border: 'none' }}
              onMouseOver={(e) => e.currentTarget.classList.add('shadow-lg')}
              onMouseOut={(e) => e.currentTarget.classList.remove('shadow-lg')}
            >
              <Shield className="me-2" size={20} /> Sign up
            </Button>
          </Form>

          <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeInUp">
  <a
    href="/login"
    className="text-decoration-none link-hover text-center"
    style={{ color: '#ffcc00', fontWeight: 'bold' }}
    onMouseOver={(e) => e.currentTarget.style.color = '#ffdc00'}
    onMouseOut={(e) => e.currentTarget.style.color = '#ffcc00'}
  >
    Already a hero? Sign in
  </a>
</div>
        </Card.Body>
      </Card>
      
    </Container>
  );
};

export default Register;
