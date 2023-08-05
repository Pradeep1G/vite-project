import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import axios from 'axios';
import ObjectID from 'bson-objectid';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';




function LoadingScreen() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(1px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        flexDirection: "column"
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "15px solid #D8D9DA",
          borderTopColor: "grey",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <p>Please Wait</p>
    </div>
  );
}




const Login=()=> {



  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com"



  const navigate = useNavigate();
  const location = useLocation();


  const [formData, setFormData] = useState({ email: '', password: '' });

  const [verifyOTP, setverifyOTP] = useState(false);

  const [recievedOTP, setrecievedOTP] = useState(0);
  const [userOTP, setuserOTP] = useState(0);
  const [objId, setObjId] = useState({_id:''})
  const [usertoken, setusertoken] = useState("")
  const [openNewPasswordContainer, setopenNewPasswordContainer] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [newConfirmPassword, setnewConfirmPassword] = useState("");


  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token_for_first_time');
    if (location.pathname === '/login' && token) {
      localStorage.removeItem('token_for_first_time');
      localStorage.removeItem('token');
      localStorage.removeItem('GuideName');
      localStorage.removeItem("GuideMailId")
      localStorage.removeItem("userMailId")
      console.log('Token removed from local storage');
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (location.pathname === '/login' && token) {
      navigate('/dashboard');
    }
  }, [location]);


  const handleFirstLogin = async(e)=>{
    e.preventDefault();

    setIsLoading(true)

    if(!verifyOTP){
      console.warn(+serverPath1+'/api/check/'+formData['email'])
      try{
        const response = await axios.get(serverPath1+'/api/check/'+formData['email']+"/"+formData['password']);
        console.warn(response.data);


        if(response.data.is_account_available=="false")
        {
            console.warn("enter valid user account");
            setIsLoading(false)
            alert("enter valid user account");
        } 
        else if(response.data.first_time=="false" && response.data.is_account_available=="true" && response.data.is_password_correct=="false")
        {
          setIsLoading(false)
          console.warn("password incorrect");
          alert("password incorrect");
        }
        else if(response.data.first_time=="false" && response.data.is_account_available=="true" && response.data.is_password_correct=="true")
        {
          setIsLoading(false)
          console.warn("Login Success")
          // alert("Login Success");
          setusertoken(response.data.token)
          console.warn(response.data.token)

          localStorage.setItem('token', response.data.token)
          navigate('/dashboard');
        }
        
        else if(response.data.first_time==="true" && response.data.is_account_available=="true")
        {
          setIsLoading(false)
          console.warn("I am  called")
          const o ={_id:response.data._id}

            if(response.data.Is_Email_sent=="true");
            {
                setverifyOTP(true);
                setrecievedOTP(response.data.OTP)
                setusertoken(response.data.token)
                const token = response.data.token_for_first_time
                console.warn(token)
                localStorage.setItem('token_for_first_time', token)
                localStorage.setItem('userMailId',formData['email'])

            }
            if (response.data.Is_Email_sent=="false")
            {
                console.warn("Email not sent")
            }

        }else{
          console.warn("cannot processed")
        }
        // else;
        // {
        //   console.warn("cannot processed")
        // }
       
      } catch(error)
      {
        console.warn(error);
      }
    }
  };




  // const handleSubmit = async(e)=>{
  //   e.preventDefault();

  //   if(!verifyOTP){
  //     console.warn('http://localhost:5000/api/check/'+formData['email'])
  //     try{
  //       const response = await axios.get('http://localhost:5000/api/check/'+formData['email']);
  //       console.warn(response.data);
  //       if (response.data.is_account_available==='true');
  //       {
  //         const o ={_id:response.data._id}
  //         // setObjId({_id:ObjectID(response.data._id)});
  //         setObjId(o)
  //         console.warn(o);
  //         try{
  //           console.warn("trying")
  //           const sendPositiveresponse = await axios.get("http://localhost:5000/api/check/verified/"+formData['email']+"/"+objId["_id"]);
  //           console.warn(sendPositiveresponse.data)
  //           if(sendPositiveresponse.data.Is_Email_sent);
  //           {
  //               setverifyOTP(true);
  //               setrecievedOTP(sendPositiveresponse.data.OTP)
  //           }
  //         } catch(error){
  //           console.warn("to send verified note")
  //           console.warn(error)
  //         }
  //       }
  //     } catch(error){
  //       console.warn(error);
  //     }
  //   }
  // };




  const checkOTP=(e)=>{
    e.preventDefault();

    if(userOTP==recievedOTP)
      {
        console.warn("Login Success")
        // localStorage.setItem('token', token)
        // navigate('/dashboard');
        setopenNewPasswordContainer(true);
      }
    else
    {
      console.warn("Wrong OTP")
    }
  }







  const continueRegister=(e)=>{
    e.preventDefault()

    if(newPassword==newConfirmPassword){
      localStorage.setItem('newpassword',newPassword)
      navigate('/login/selectteam')
    }
    else{
      console.warn("both are not same")
    }
  }






  if (localStorage.getItem("token")==null){
  return (
    
    <>

      {isLoading &&  <LoadingScreen />}

      <h1>geddadavenkatapradeep@gmail.com</h1>
      <h1>govinduraju3288@gmail.com</h1>

      <form onSubmit={handleFirstLogin}>
    {/* {      localStorage.removeItem('token_for_first_time')} */}

        <input
        className='border-2'
          type="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
        className='border-2'
          type="text"
          placeholder="password"
          value={formData.password}
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button className={verifyOTP ? 'hidden p-3':'h-10 p-2 bg-red-600 text-black'} type="submit">Submit</button>
      </form>
<p className='font-semibold'>sdfgh</p>


    <div className={verifyOTP ? 'visible':'hidden'}>
      <form >
      <input
        className='border-2'

          type="number"
          placeholder="o  t  p"
          value={formData.otp}
          onChange={(e) => setuserOTP(e.target.value )}
        />
          <button onClick={checkOTP} className="h-10 p-2 bg-red-600 text-black" type="submit">Submit</button>

      </form>
      </div>

      <div className={openNewPasswordContainer ? "visible":"hidden"}>
        <form>

        <input
        className='border-2'

          type="text"
          placeholder="new password"
          value={newPassword}
          required
          onChange={(e) => setnewPassword(e.target.value )}
        />

        <input
        className='border-2'

          type="text"
          placeholder="confirm password"
          value={newConfirmPassword}
          required
          onChange={(e) => setnewConfirmPassword(e.target.value )}
        />

        <button onClick={continueRegister} className='h-10 p-2 bg-red-600 text-black' type="submit">Submit</button>


        </form>
      </div>








    </>
  )
  }
  else{
    navigate("/dashboard")
  }
}

export default Login
