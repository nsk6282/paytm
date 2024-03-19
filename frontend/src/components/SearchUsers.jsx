export function SearchUsers({title,placeholder,onChange}){
    return<div className="text-left p-4 font-bold">
        <div className="pb-2 text-2xl">{title}</div>
        <div className="text">
            <input type="text" placeholder={placeholder} onChange={onChange}  className="w-full border border-gray rounded p-2"></input>
        </div>
    </div>
}