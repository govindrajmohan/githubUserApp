import React, { useState } from "react";
import "../components/finder.css";
function Finder() {


  const [getData, setData] = useState([]);
  const [user, setUser] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const handleChange = (e) => {
    let a = e.target.value;
    setUser(a);
  };

  const handleClick = () => {
   
    getGithubUserData();
  };

  const getGithubUserData = async () => {
    try {
        if(user === ""){
            alert("Please Enter Username");
        }
        else{
            
           
            const res = await fetch(`https://api.github.com/users/${user}`);
            const getActualData = await res.json();
            setData(getActualData);
            setSearchFlag(true);
        }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <br />
      <div className="container main-div">
        <div className="heading-bg">
          <h1>Git User Finder Application</h1>
          <h3>Enter Username To Get The Result </h3>
        </div>
        <div className="row ">
          <div className="col">
            <input
              type="text"
              className="input-group"
              placeholder="Enter user name"
              onChange={handleChange}
            />
            <button className="btn-primary w-100 srch-btn" onClick={handleClick}>
              Search
            </button>
            {[getData].map((val, ind) => {
              return (
                searchFlag ? (<div className="result-div"  key={ind}>
                <img
                  src={val.avatar_url}
                  
                />
                <h1>{val.name}</h1>
                <h3>{val.bio}</h3>
                <p><b>User Name :</b>  {val.login} <br /><b>Name :</b>  {val.name} <br /> <b>Location: </b> {val.location}  
                <br /> <b>Repository :</b> {val.public_repos} <br />
                 <b> Profile Link :</b>   <a href={val.html_url} target="_blank"><button type="button" className="btn btn-success px-2 py-0">{val.html_url}</button> </a>
                
                </p>
                
              </div>) : ("")
              );
            })}
          </div>
        </div>
      </div>
        <br />
    </>
  );
}

export default Finder;
