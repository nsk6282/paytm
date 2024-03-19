export function FriendName({name}){
    return <div className="flex pt-20">
        <div className="flex items-center">
            <div className="rounded-full bg-green-500 text-white font-bold text-2xl w-10 h-10 flex items-center justify-center"> {name[0]} </div>
        </div>
        <div className="flex items-center pl-2 text-2xl font-bold"> {name}</div>
    </div>

}