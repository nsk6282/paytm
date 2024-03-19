export function Footer({title,linkName,linkUrl}){
    return<div className="text-sm">
        {title} <a href={linkUrl} className="underline">{linkName}</a> 
    </div>
}