export function shortenWithEllipse(originalString,maxChar=25){
	if(originalString.length>maxChar){
		return originalString.slice(0,maxChar)+'... '
	}else{
		return originalString
	}
}