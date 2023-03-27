import { useEffect, useState } from "react";
import "../App.css";
const Vehicle = () => {
  const [veh, setveh] = useState([])
  const [fd, setfd] = useState([])
  const [type, settype] = useState("All")
  const [name, setname] = useState("")
  const [rd, setrd] = useState([])
  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json").then((res)=>{
        return res.json()
    }).then((data)=>{
        setveh(data.Results)
    })
  }, [setveh]);
  console.log(veh)
  useEffect(()=>{
   if(type === "All"){
    setfd(veh)
   }else{
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?vehicleType=${type}&format=json`).then((res)=>{
        return res.json()
    }).then((data)=>{
        setfd(data.Results)
    })
   }
  },[veh,type,setfd])
  useEffect(()=>{
    if(name === ""){
      setrd(fd)
    }else{
        let arr = fd.filter((item, i)=> item.Name.toLowerCase().includes(name))
        setrd(arr)
    }
  },[fd,name,setrd])
  return (
  <div className="veh-container">
    <div className="header"><h1>VEHICLE MANUFACTURERS</h1></div>
    <div className="section">
        <label htmlFor="search"></label>
        <input type="text" id="search" onChange={(e)=>setname(e.target.value)}/>
        <label htmlFor="filter"></label>
        <select name="VehicleType" id="filter" onChange={(e)=>settype(e.target.value)}>
            <option value="All">All</option>
            <option value="Passenger Car">Passenger Car</option>
            <option value="Multipurpose Passenger Vehicle (MPV)">Multipurpose Passenger Vehicle (MPV)</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Trailer">Trailer</option>
            <option value="Low Speed Vehicle (LSV)">Low Speed Vehicle (LSV)</option>
        </select>
        <div className="table-content">
        <table>
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Type</th>
            </tr>
            {
                rd.map((item)=>{
                    return(
                    <tr>
                        <td>{item.Name}</td>
                        <td>{item.Country}</td>
                        <td>{item.VehicleType}</td>
                    </tr>
                    )
                })
            }
            </table>
        </div>
    </div>
  </div>
  );
};
export default Vehicle;
