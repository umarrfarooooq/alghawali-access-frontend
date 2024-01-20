import React, { useEffect, useState } from "react";
import logo from "./logo.svg"
import axios from "axios";

const axiosInstense = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
  })

const Login = () =>{
  const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
        const loginIdentifier = data.get('loginIdentifier').trim();
        const password = data.get('password').trim();

        setErrorMessage('');

        if (!loginIdentifier || !password) {
          setErrorMessage('All fields are required');
          return;
        }
      
        try {
          const response = await axiosInstense.post('api/v1/staff/login', {
            loginIdentifier,
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

        const handleGoogleLogin = () => {
          try {
            const response = axiosInstense.get("api/v1/staff/google");

            const { staffToken } = response.data;

            if (staffToken) {
              console.log('Token found:', staffToken);
    
              localStorage.setItem('staffToken', staffToken);
    
              console.log('Login successful');
              window.location.href = "/";
            } else {
              console.error('Token not found in URL parameters');
              setErrorMessage('Token not found');
            }
          } catch (error) {
            console.error('Error during Google login:', error);
            setErrorMessage('An error occurred during Google login');
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
                            Email or Ph#
                            </div>
                            <div className="self-stretch rounded-lg bg-[#E3E3E3] [backdrop-filter:blur(80px)] h-[4rem] flex flex-row items-center justify-start p-[0.5rem] box-border text-[1rem] text-neutral-600">
                            <div className="flex-1 rounded flex flex-row items-center justify-start">
                                <input type="text" name="loginIdentifier" placeholder="example@email.com" className="bg-transparent outline-none self-stretch flex-1 relative tracking-[0.02em] leading-[140%] flex items-center"/>
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
                      {/* <div className="self-stretch flex flex-col items-center justify-start text-[0.88rem] text-neutral-whitepure">
                          <div className="self-stretch flex flex-row items-end justify-center">
                          <div className="flex-1 shadow-[0px_8px_16px_rgba(126,_41,_9,_0.16)] border border-black flex flex-row items-start justify-start">
                          <button onClick={handleGoogleLogin} type="button" className="flex-1 gap-2 rounded-corner-radius-8-round bg-[#fff] text-black flex flex-row items-center justify-center py-[1.13rem] px-[0.75rem]">
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M7.23251 0.548463C4.79644 1.38289 2.71859 3.20838 1.565 5.51007C1.16186 6.30543 0.870433 7.15079 0.696986 8.02467C0.254773 10.1975 0.562603 12.5105 1.565 14.4926C2.21465 15.7861 3.14986 16.9342 4.28117 17.8303C5.35077 18.6815 6.59381 19.3089 7.91576 19.6617C9.57913 20.1097 11.3542 20.0984 13.034 19.7175C14.5517 19.3702 15.9854 18.6425 17.1276 17.5897C18.3371 16.4752 19.1996 15.0137 19.659 13.4402C20.1575 11.721 20.2247 9.88962 19.911 8.13132C16.7749 8.13132 13.6387 8.13132 10.4972 8.13132C10.4972 9.43061 10.4972 10.7354 10.4972 12.0347C12.3117 12.0347 14.1317 12.0347 15.9459 12.0347C15.733 13.2836 14.9939 14.4203 13.9411 15.1259C13.2801 15.5681 12.5242 15.8595 11.7402 15.9939C10.9507 16.1283 10.1385 16.1451 9.35451 15.9884C8.55368 15.8318 7.79192 15.4954 7.12587 15.0251C6.06174 14.2801 5.24998 13.1828 4.8355 11.9561C4.41009 10.7072 4.40423 9.31303 4.8355 8.06413C5.1324 7.18478 5.63086 6.36715 6.28598 5.70657C7.09227 4.87762 8.1396 4.28969 9.27091 4.04905C10.2397 3.84201 11.2589 3.88108 12.2055 4.16664C13.0118 4.41314 13.7512 4.84988 14.3614 5.43234C14.9775 4.82175 15.5877 4.20609 16.2037 3.59551C16.5229 3.26502 16.8647 2.95133 17.178 2.60991C16.2483 1.74736 15.1509 1.05318 13.9579 0.616436C11.8187 -0.185172 9.39397 -0.20197 7.23251 0.548463Z" fill="white"/>
                                <path d="M7.23196 0.549184C9.39341 -0.201249 11.8186 -0.184451 13.9687 0.610907C15.1613 1.04765 16.2536 1.74222 17.1888 2.60438C16.8751 2.94034 16.5391 3.25949 16.2145 3.58998C15.5985 4.20056 14.9883 4.81622 14.3722 5.42681C13.7616 4.84435 13.0225 4.40214 12.2162 4.16111C11.2697 3.87555 10.2505 3.83648 9.28169 4.04352C8.15037 4.28416 7.10344 4.87795 6.29675 5.70104C5.64164 6.36201 5.14317 7.17964 4.84628 8.0586C3.75442 7.21284 2.66217 6.36162 1.57031 5.51626C2.71803 3.2091 4.79589 1.38361 7.23196 0.549184Z" fill="#E94435"/>
                                <path d="M0.696986 8.02632C0.870433 7.15283 1.16732 6.30708 1.565 5.51172C2.65686 6.35747 3.74911 7.20869 4.84097 8.05405C4.4097 9.30295 4.41556 10.6972 4.84097 11.9461C3.74911 12.7918 2.65686 13.643 1.565 14.4884C0.562603 12.5176 0.254773 10.1991 0.696986 8.02632Z" fill="#F8BB15"/>
                                <path d="M10.5009 8.125C13.637 8.125 16.7731 8.125 19.9147 8.125C20.2284 9.8833 20.1612 11.7147 19.6627 13.4339C19.2037 15.0074 18.3411 16.4747 17.1313 17.5834C16.073 16.7603 15.0089 15.9368 13.9561 15.1137C15.0089 14.4136 15.748 13.2714 15.9609 12.0225C14.1464 12.0225 12.3263 12.0225 10.5122 12.0225C10.4954 10.7291 10.5009 9.42976 10.5009 8.125Z" fill="#547DBE"/>
                                <path d="M1.5625 14.4955C2.65436 13.6497 3.74661 12.7985 4.83847 11.9531C5.25294 13.1852 6.06471 14.2771 7.12883 15.022C7.79528 15.4924 8.55665 15.8229 9.35748 15.9854C10.1415 16.142 10.9591 16.1252 11.7432 15.9909C12.5272 15.8565 13.2831 15.5654 13.9441 15.1228C15.0023 15.9459 16.0665 16.7694 17.1192 17.5925C15.977 18.6508 14.5433 19.3735 13.0257 19.7204C11.3513 20.1012 9.57585 20.1122 7.90739 19.6645C6.58583 19.3117 5.3424 18.6844 4.27281 17.8331C3.14736 16.9315 2.21215 15.7834 1.5625 14.4955Z" fill="#34A751"/>
                              </svg>
                              </span>
                                  <div className="relative tracking-[0.02em] leading-[140%] font-medium">
                                  Continue With Google
                                  </div>
                              </button>
                          </div>
                          </div>
                      </div> */}
                    
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