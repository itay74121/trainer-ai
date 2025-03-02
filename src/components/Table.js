
function Table({ message }) {
    const count = (s1,s2)=>{ return s1.split(s2).length - 1}
    const lines = message.split("\n")
    let tabletext = ""
    lines.forEach(element => {
        if (count(element, "|") > 1){
            tabletext += element + "\n"
        }
    });

    
    return ( 
        <>
            {lines.map((line, index) => {
                if (count(line, "|") > 1){
                    return ""
                }
                return <>{line}</>
            })}
            {tabletext}
        </>
     );
}

export default Table;

