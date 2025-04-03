import { useParams } from "react-router-dom"

const ContactComponent=()=>{


    const params = useParams<{prenume:string}>()
    return (
        <>Contact
        Prenume este : {params.prenume}</>
    )
}
export default ContactComponent