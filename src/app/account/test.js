import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
export default function Register() {


  
   const{register,handleSubmit,watch,formState:{errors}} = useForm()

   useEffect(()=>{
       console.log(errors);
    
   },[errors])


const login =(data)=>{
    console.log(data);
    
}

const IsPasswordMatch =watch('password')

  return ( <> 

<div className='container-fluid '>
  <div className='row row d-flex justify-content-center '>
<Form className='col-6 b-black border border-danger ' onSubmit={handleSubmit(login)} >

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="name"  {...register('Name',{required:" name is required"})}/>
      </Form.Group>
      {errors.Name && <p className='text-danger'>{errors.Name.message}</p>}



      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>User name</Form.Label>
        <Form.Control type="text" placeholder="userName"  {...register('userName',{required:"user name is required", validate: value => !/\s/.test(value) || "Username cannot contain spaces"} )}/>
      </Form.Group>
      {/* {errors.userName?.type=="required"&&<p className='text-danger'>userName is required</p>} */}
      {errors.userName && <p className='text-danger'>{errors.userName.message}</p>}


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  {...register('emaill',{required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address"}})}  />
      </Form.Group>
      {errors.emaill && <p className='text-danger'>{errors.emaill.message}</p>}


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  {...register('password',{required: "Password is required"  ,minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }})}/>
      </Form.Group>
      {/* {errors.password?.type=="required"&&<p className='text-danger'>pass is required</p>} */}
      {errors.password && <p className='text-danger'>{errors.password.message}</p>}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>confirm pass</Form.Label>
        <Form.Control type="password" placeholder="confirmPass"  {...register('confirmPass',{required:"Confirm Password is required",validate: value => value == IsPasswordMatch || "Passwords do not match"})}/>
      </Form.Group>
      {errors.confirmPass && <p className='text-danger'>{errors.confirmPass.message}</p>}


    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
</>


)
}
