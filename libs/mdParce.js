export const md2Parcer = (str) => {
    const arr = str.split('')
    const check = (arr) => {
        const newArr = [...arr]
        console.log(newArr)
        const symb = "\\"
        // console.log(symb)
        const symbNew = symb.substring(0, str.length - 1);
        arr.forEach((el, index) => {
            console.log(el)
            
            if (el = '_' || '-' || '.' || '!') {
                newArr.splice(index, 0, " \ ")
                
            }

        })
        return newArr
    }

    const string = check(arr).join('')
    console.log(string)
    return string
}