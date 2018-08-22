import  React from 'react';

const person=(props) =>{
    return <div><p onClick={props.switchname}>I am {props.name} and {props.age} </p>
        <p>{props.children}</p>
    </div>
};

export default person;
