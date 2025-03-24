import { useState } from "react";
import axios from "axios";
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name:'', email:'', message:''
    });
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) =>{
        setFormData({ 
            ...formData, [e.target.name]: e.target.value
        });
    }
const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:5000/contact', formData);
        setResponseMsg(response.data.message);
    }  catch (error) {
        console.error("Error:", error); 
        setResponseMsg('Failed to send message');
    }
}
return(
    <>
    <form onSubmit={handleSubmit} className="form-contact">
    <input type="text"    placeholder="First Name"  name="name"  onChange={handleChange} required/>
    <input type="email"   placeholder="Email"  name="email" onChange={handleChange} required/>
    <textarea type="text" placeholder="Message"  name="message" onChange={handleChange} required/>
    <button type="submit">Submit</button>
    <p>{responseMsg}</p>
    </form>
    </>
);
} ;

export default ContactForm