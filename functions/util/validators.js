const isEmail = (email)=>{ //helper function validate for valid email //
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) =>{ // helper function to determine fields are empty also eliminates only one character input//
    if(string.trim() ==='') return true;
    else return false;
}

exports.validateSignupData = ( data ) =>{
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = "Must not be empty"
    }else if (!isEmail(data.email)){
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(data.password)) errors.password = "Must not be Empty"
    if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle)) errors.handle = "Must not be empty";

     //this check to make sure errors is a empty string and the legth of array is not biggrt then 0//

    return {
        errors,
        valid: Object.keys(errors).length === 0? true : false
    }

}

exports.validateLoginData = (data)=>{
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0? true : false
    };
};

exports.reduceUserDetails = (data) => {
    let userDetails ={};

    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;// data is request.bio . trim to remove whitespace .if not empty
    if(!isEmpty(data.website.trim())){
       //https://website.com
       if(data.website.trim().substring(0,4)!=='http'){//this checks if not http
           userDetails.website = `http://${data.website.trim()}`; //if user submits website.com this adds https
         } else userDetails.website = data.website; // if it does have http go data website
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location; //front end will send 3 propierties react app will send bio property with empty string

    return userDetails;
}