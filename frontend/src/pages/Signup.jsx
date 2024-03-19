import { useState } from "react"
import { BelowHeading } from "../components/BelowHeading"
import { Button } from "../components/ButtonBelow"
import { Footer } from "../components/Footer"
import {HeadingComponent} from "../components/HeadingComponent"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom"
export function Signup(){
    const [username,setUsername] = useState("");
    const [firstName,setFirstname] = useState("");
    const [lastName,setLastname] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return<>
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className=" flex flex-col justify-center">
                <div className="w-80 text-center bg-white rounded-lg p-5">
                    <HeadingComponent title={"Sign Up"}></HeadingComponent>
                    <BelowHeading para={"Enter your information to create an account"}></BelowHeading>
                    <InputBox title={"First Name"} placeholder={"John"} onChange={ e =>{
                        setFirstname(e.target.value);
                    }}/>
                    <InputBox title={"Last Name"} placeholder={"Doe"} onChange={ e =>{
                        setLastname(e.target.value);
                    }}/>
                    <InputBox title={"Email"} placeholder={"johndoe@example.com"} onChange={e=>{
                        setUsername(e.target.value);
                    }}/>
                    <InputBox title={"Password"} placeholder={""} onChange={e=>{
                        setPassword(e.target.value);
                    }}/>
                    <div className="p-2">
                        <Button title={"Sign Up"}  onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                firstName,
                                lastName,
                                password
                            })
                            localStorage.setItem("token",response.data.token);
                            navigate('/dashboard');
                        }}  />
                    </div>
                    <Footer title={"Already have an account?"} linkName={"Login"} linkUrl={"/signin"}></Footer>
                </div>
            </div>
        </div>
        

    </>
}