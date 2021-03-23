import React from "react";
import './Popup.css'
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <section style={{"display":"flex"}}>
        <img alt="campaign icon" src={props.content.image_url} style={{"width":"80px","height":"80px","boxShadow":"1px 2px 3px #ccc"}}/>
        
        <span>
        <div style={{"fontWeight":"bold","padding":"35px 5px 5px 0px"}}>{props.content.name}</div>
        <div style={{"fontWeight":"bold","color":"rgba(0,0,0,0.5"}}>{props.content.region}</div>
        </span>
        </section>
        <section style={{"padding":"20px 0px"}}>
        <div><strong >PRICING</strong></div>
        <div className="price"><span style={{ "color": "rgba(0, 0, 0, 0.5)","padding":"5px"}}>1 week - 1 month</span> ${props.content.price[0]}</div>
        <div className="price"><span style={{ "color": "rgba(0, 0, 0, 0.5)","padding":"5px"}}>6 Months</span> ${props.content.price[1]}</div>
        <div className="price"><span style={{ "color": "rgba(0, 0, 0, 0.5)","padding":"5px"}}>1 Year</span>${props.content.price[2]}</div>
        </section>
        <button style={{"border":"2px solid #000","padding":"10px 15px","margin":"0 40%","backgroundColor":"#fff"}} onClick={props.handleClose}>close</button>
      </div>
    </div>
  );
};
 
export default Popup;