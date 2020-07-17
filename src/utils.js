export const getInitName = (name) => {
    let nameArr = name.split(" ");
    if(nameArr.length > 1){
        return (nameArr[0].charAt(0)+nameArr[nameArr.length-1].charAt(0)).toUpperCase();
    }
    else 
        return (nameArr[0].charAt(0)+nameArr[0].charAt(1)).toUpperCase();
}