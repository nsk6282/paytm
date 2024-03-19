import { useState } from "react"
import { BelowHeading } from "../components/BelowHeading"
import { Button } from "../components/ButtonBelow"
import { Footer } from "../components/Footer"
import {HeadingComponent} from "../components/HeadingComponent"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { redirect,  useNavigate} from "react-router-dom"
export function Signin(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return<>
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className=" flex flex-col justify-center">
                <div className="w-80 text-center bg-white rounded-lg p-5">
                    <HeadingComponent title={"Sign In"}></HeadingComponent>
                    <BelowHeading para={"Enter your credentials to access your account"}></BelowHeading>
                    <InputBox title={"Email"} placeholder={"johndoe@example.com"} onChange={e=>{
                        setUsername(e.target.value);
                    }}/>
                    <InputBox title={"Password"} placeholder={""} onChange={e=>{
                        setPassword(e.target.value);
                    }}   />
                    <div className="p-2">
                        <Button title={"Sign In"} onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            })
                            localStorage.setItem("token",response.data.token);
                            navigate("/dashboard");
                        }}/>
                    </div>
                    <Footer title={"Don't have an account?"} linkName={"Sign Up"} linkUrl={"/signup"}></Footer>
                </div>
            </div>
        </div>
        

    </>
}