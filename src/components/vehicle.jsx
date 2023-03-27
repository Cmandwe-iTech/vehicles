import { useEffect, useState } from "react";
import "../App.css";
const Vehicle = () => {
  const [veh, setveh] = useState([]);
  const [fd, setfd] = useState([]);
  const [type, settype] = useState("All");
  const [name, setname] = useState("");
  const [rd, setrd] = useState([]);
  const [pop, setpop] = useState(false);
//   const [id, setid] = useState("");
  const [arr, setarr] = useState([]);
  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setveh(data.Results);
      });
  }, [setveh]);
//   console.log(veh);
  useEffect(() => {
    if (type === "All") {
      setfd(veh);
    } else {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?vehicleType=${type}&format=json`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setfd(data.Results);
        });
    }
  }, [veh, type, setfd]);
  useEffect(() => {
    if (name === "") {
      setrd(fd);
    } else {
      let arr = fd.filter((item, i) =>
        item.Name.includes(name.toLocaleUpperCase())
      );
      setrd(arr);
    }
  }, [fd, name, setrd]);
  const popfunction=(id) => {
    let pp = rd.filter((item) => {
      return (item.Id = id);
    });
    setarr(pp);
  };
  console.log(arr);
  return (
    <div className="veh-container">
      <div className="header">
        <h1>VEHICLE MANUFACTURERS</h1>
      </div>
      <div>
      {pop
        ? arr.map((c) => {
            <div style={{ display: "block" }} className="div1">
              <p onClick={() => setpop(false)}>X</p>
              <p>{c.name}</p>
              <p>{c.WMI}</p>
            </div>;
          })
        : ""}
      </div>
      
      <div className="section">
        <div className="serch-filter">
          <span id="sp1">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              onChange={(e) => setname(e.target.value)}
            />
          </span>
          <span id="sp2">
            <label htmlFor="filter">Filter by vehicle type:</label>
            <select
              name="VehicleType"
              id="filter"
              onChange={(e) => settype(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Passenger Car">Passenger Car</option>
              <option value="Multipurpose Passenger Vehicle (MPV)">
                Multipurpose Passenger Vehicle (MPV)
              </option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Trailer">Trailer</option>
              <option value="Low Speed Vehicle (LSV)">
                Low Speed Vehicle (LSV)
              </option>
            </select>
          </span>
        </div>
        <div className="table-content">
          <table>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Type</th>
            </tr>
            {rd.map((item, i) => {
              return (
                <tr
                  key={i}
                >
                  <td onClick={() => {
                    setpop(true);
                    popfunction(item.Id);
                  }}>{item.Name}</td>
                  <td>{item.Country}</td>
                  <td>{item.VehicleType}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Vehicle;
