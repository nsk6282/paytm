import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { SearchUsers } from "../components/SearchUsers";
import { UserSendMoney } from "../components/UserSendMoney";
import { YourBalance } from "../components/YourBalance";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Dashboard(){
    const token = localStorage.getItem("token");
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const [name, setName] = useState("");
    const [balance,setBalance] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter,{
        headers:{
            Authorization:"Bearer " + token
        }})
        .then(response=>{
                setUsers(response.data);
            })
    },[filter]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance' + filter,{
        headers:{
            Authorization:"Bearer " + token
        }})
        .then(response=>{
                setBalance(response.data.balance);
            })
    },[balance]);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/name' + filter,{
        headers:{
            Authorization:"Bearer " + token
        }})
        .then(response=>{
                setName(response.data.name);
            })
    },[name]);



    return<div>
        <AppBar name={name}/>
        <YourBalance balance={balance}/>
        <SearchUsers title={"Users"} placeholder={"Search users...."} onChange={e=>{
            setFilter(e.target.value);
        }} />
        <div>
            {users.map(user=> <UserSendMoney name={user.firstName + " "+user.lastName} label={"Send Money"}  onClick={()=>{
                navigate('/send?secondId=' + user._id + '&name=' + user.firstName + " "+user.lastName);
            }}/>)}
        </div>
        {/* <UserSendMoney name={"User 1"} label={"Send Money"}  />
        <UserSendMoney name={"User 2"} label={"Send Money"}  />
        <UserSendMoney name={"User 3"} label={"Send Money"}  /> */}
    </div>
}