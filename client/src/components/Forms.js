import React from 'react';


function Forms(props) {
    
    return (
        <div>
            <form className="mainForm" onSubmit={props.onSubmit}> 
                <input type="text" name="model" placeholder="Model..."></input>
                <input type="text" name="make" placeholder=" Make.."></input>
                <input type="text" name="color" placeholder=" Color.."></input>
                <input type="text" name="registration" placeholder=" Registration"></input>
                <input type="text" name="owner" placeholder=" Owner.."></input>
                <button>Add new Car</button>
            </form>
        </div>
    );
};

export default Forms;
