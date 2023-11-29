import React, { useState } from "react";
import logo from "./logo.svg"
import axios from "axios";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

const Login = () =>{
  const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
        const email = data.get('email').trim();
        const password = data.get('password').trim();

        setErrorMessage('');

        if (!email || !password) {
          setErrorMessage('All fields are required');
          return;
        }
      
        try {
          const response = await axiosInstense.post('api/v1/staff/login', {
            email,
            password
          });

          if (response.status === 200) {
            const { staffToken } = response.data;
            localStorage.setItem('staffToken', staffToken);
            window.location.href = "/";
            console.log('Login successful');
          } else if (response.status === 401) {
            setErrorMessage('Incorrect email or password');
          } else if (response.status === 403) {
            setErrorMessage('Not Authorized');
          } else {
            console.error('An error occurred:', response.data.error);
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setErrorMessage('An error occurred');
        }
      };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="relative bg-neutral-300 w-full min-h-screen h-full overflow-hidden text-center text-[1.5rem] text-neutral-800 font-headings-h5bold">
            <div className=" flex flex-col items-center justify-center p-[1rem] sm:p-4 box-border max-w-full min-w-[18rem] md:max-w-[32.6rem] mx-auto">
                <div className="self-stretch bg-[#FFFBFA] rounded-2xl bg-neutral-whitepure shadow-[0px_9px_30px_rgba(7,_42,_91,_0.1)] flex flex-col items-center justify-start py-[3.5rem] px-[1rem] md:px-[3rem]">
                <div className="self-stretch flex flex-col items-center justify-start">
                    <div className="self-stretch flex flex-col items-center justify-start gap-[1.5rem]">
                    <div className="self-stretch rounded-corner-radius-4-round flex flex-col items-center justify-start pb-[1rem] gap-[1rem]">
                        <div className="self-stretch flex flex-row items-center justify-center">
                        <div className="flex-1 flex flex-row items-center justify-center">
                            <img
                            className="relative w-[8.2rem] h-[7.5rem] overflow-hidden shrink-0"
                            alt=""
                            src={logo}
                            />
                        </div>
                        </div>
                        <div className=" md:self-stretch relative tracking-[0.02em] text-lg md:text-2xl leading-[140%] font-bold">
                        Welcome to Al-Ghawali
                        </div>
                    </div>
                    
                    <div className="self-stretch flex flex-col items-center justify-start text-left text-[1.13rem] text-neutral-700">
                    
                        <div className="self-stretch relative text-[0.75rem] tracking-[0.02em] leading-[140%] text-[#CD2424]">
                        {errorMessage && <span>{errorMessage}</span>}

                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start gap-[1rem]">
                        <div className="self-stretch flex flex-col items-start justify-start gap-[0.13rem]">
                            <div className="self-stretch relative tracking-[0.02em] leading-[140%]">
                            Email
                            </div>
                            <div className="self-stretch rounded-lg bg-[#E3E3E3] [backdrop-filter:blur(80px)] h-[4rem] flex flex-row items-center justify-start p-[0.5rem] box-border text-[1rem] text-neutral-600">
                            <div className="flex-1 rounded flex flex-row items-center justify-start">
                                <input type="text" name="email" placeholder="example@email.com" className="bg-transparent outline-none self-stretch flex-1 relative tracking-[0.02em] leading-[140%] flex items-center"/>
                            </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[0.13rem]">
                        <div className="self-stretch relative tracking-[0.02em] leading-[140%]">
                            Password
                            </div>
                            <div className="self-stretch rounded-lg bg-[#E3E3E3] [backdrop-filter:blur(80px)] h-[4rem] flex flex-row items-center justify-start p-[0.5rem] box-border gap-[0.63rem] text-[1rem] text-neutral-800">
                            <input placeholder="Password" name="password" type="password" className="bg-transparent outline-none self-stretch relative tracking-[0.02em] leading-[140%]" />                            
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start text-[0.88rem] text-neutral-whitepure">
                        <div className="self-stretch flex flex-row items-end justify-center">
                        <div className="flex-1 shadow-[0px_8px_16px_rgba(126,_41,_9,_0.16)] flex flex-row items-start justify-start">
                            <button className="flex-1 rounded-corner-radius-8-round bg-[#107243] text-white flex flex-row items-center justify-center py-[1.13rem] px-[0.75rem]">
                                <div className="relative tracking-[0.02em] leading-[140%] font-medium">
                                Login
                                </div>
                            </button>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
        </form>
        </>
    )
}

export default Login;