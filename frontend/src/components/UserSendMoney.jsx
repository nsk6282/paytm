import { Button } from "./ButtonBelow";

export function UserSendMoney({name,label,onClick}){
    return<div className="flex justify-between w-full p-4">
    <div className="flex justify-between">
            <div className="flex items-center">
                <div className="rounded-full bg-slate-300 text-black w-8 h-8 flex items-center justify-center"> {name[0]} </div>
            </div>
            <div className="flex items-center pl-2 text-lg font-semibold"> {name}</div>
    </div>
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={onClick}>{label}</button>
    </div>
}