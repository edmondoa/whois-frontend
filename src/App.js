
import React,{useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);
    console.log('sere');
    setDomain(domain);
    setType(type);
    try{
      const response = await axios.post("http://localhost:8000/api/whois", {
        domain,
        type,
      });
      console.log(response);
      setData(response.data);
    }catch(error){
      setError(error.response?.data?.error || "Error has occured");
    };
  }
    return (
      <div className='app'>
        <h1>whois Lookup</h1>
        <form onSubmit={handleSubmit} >
          <div className='form-group' >
            <label>Domain Name</label>
            <input type="text" value={domain} 
              onChange={(e) => setDomain(e.target.value)} 
              placeholder='Enter domain name' 
              required 
            />
          </div>
          <div className='form-group' >
            <label>Type of Information</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select here</option>
            <option value="domain">Domain</option>
            <option value="contact">Contact</option>
          </select>
          </div>
          <button type="submit">Lookup</button>
        </form>

        {error && <p className="error">{error}</p>}
        {data && type === "domain" && (
        <div>
          <h2>Domain Information</h2>
          <table>
            <tbody>
              <tr>
                <th>Domain Name:</th>
                <td>{data.domainName || "N/A"}</td>
              </tr>
              <tr>
                <th>Registrar:</th>
                <td>{data.registrar || "N/A"}</td>
              </tr>
              <tr>
                <th>Registration:</th>
                <td>{data.creationDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Expiration Date:</th>
                <td>{data.expirationDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Estimated Domain Age:</th>
                <td>{data.domainAge || "N/A"}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      )}

      {data && type === "contact" && (
        <div>
          <h2>Contact Information</h2>
          <table>
            <tbody>
              <tr>
                <th>Registrant Name:</th>
                <td>{data.registrantName || "N/A"}</td>
              </tr>
              <tr>
                <th>Techinical Contact Name:</th>
                <td>{data.technicalContactName || "N/A"}</td>
              </tr>
              <tr>
                <th>Administrative Contact Name:</th>
                <td>{data.administrativeContactName || "N/A"}</td>
              </tr>
              <tr>
                <th>Contact Email:</th>
                <td>{data.contactEmail || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </div>
    );

  }
  

export default App;
