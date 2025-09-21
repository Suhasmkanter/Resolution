import React from "react";

function Learning() {
    return <div>



        <div style={{ width: "300px", height: "200px", background: "lightblue" }}>
            Normal box
        </div>

        <div style={{ width: "300px", paddingBottom: "50%", background: "lightgreen" }}>
            Box with padding
        </div>


        <div style={{ width: "300px", height: 0, paddingBottom: "10.66%", position: "relative", background: "lightcoral" }}>
            <img src="./catflower.jpg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>



    </div>;
}

export default Learning;
