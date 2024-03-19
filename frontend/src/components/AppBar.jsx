export function AppBar({name}){
    return<div className="flex justify-between w-full p-4  border border-gray">
        <div className="text-3xl font-bold">Payments App</div>
        <div className="flex justify-between">
            <div className="flex items-center pr-2 text-lg font-medium"> Hello, {name}</div>
            <div className="rounded-full bg-slate-300 text-black w-8 h-8 flex items-center justify-center"> {name[0]} </div>
        </div>
    </div>
}