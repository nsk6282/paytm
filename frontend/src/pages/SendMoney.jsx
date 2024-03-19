import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../components/ButtonBelow"
import { FriendName } from "../components/FriendName"
import {HeadingComponent} from "../components/HeadingComponent"
import { InputBox } from "../components/InputBox"
import { TrasnferButton } from "../components/TransferButton"
import { useState } from "react"
import axios from "axios"

export function SendMoney(){
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const to = searchParams.get('secondId');
    const [amount,setAmount] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    return<>
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className=" flex flex-col justify-center">
                <div className="w-96 text-center bg-white rounded-lg p-6">
                    <HeadingComponent title={"Send Money"}></HeadingComponent>
                    <FriendName name={name}></FriendName>
                    <InputBox title={"Amount (in Rs)"} placeholder={"Enter Amount"} onChange={e=>{
                        setAmount(parseInt(e.target.value));
                    }}/>
                    <div className="p-2">
                        <TrasnferButton title={"Initiate Trasnfer"} onClick={async ()=>{
                            const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                                amount,
                                to
                            },{
                                headers:{
                                    Authorization:"Bearer " + token
                                }
                            });
                            navigate('/dashboard');
                        }}></TrasnferButton>
                    </div>
                </div>
            </div>
        </div>
        

    </>
}