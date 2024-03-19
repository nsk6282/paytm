export function InputBox({title,placeholder,onChange}){
    return<div className="text-left p-2">
        <div className="pb-1 font-medium">{title}</div>
        <div className="text">
            <input type="text" placeholder={placeholder}  onChange={onChange}  className="w-full border border-gray rounded p-2"></input>
        </div>
    </div>
}