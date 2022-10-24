import React, {useRef, useState} from "react";

function Login(props) {

    let userEmail = useRef();
    let userPassword = useRef();

    let [emailIsValid, setEmailIsValid] = useState(false);
    let [passwordIsValid, setPasswordIsValid] = useState(false);
    let [formIsValid, setFormIsValid] = useState(false);

    function validateEmail() {
        //console.log("Email > " + userEmail.current.value)
        setEmailIsValid(userEmail.current.value.length > 6 && userEmail.current.value.includes("@"));
    }

    function validatePassword() {
        //console.log("Password > " + userPassword.current.value)
        setPasswordIsValid(userPassword.current.value.length > 6);
        setFormIsValid(emailIsValid && passwordIsValid);
    }

    function submitForLogin(event) {
        event.preventDefault();
        if (formIsValid) {
            props.isLoggedIn(true);
        }
    }

    return (
        <div style={{backgroundColor: "white", padding: '10px 20px', borderRadius: 6}}>
            <form className="row g-5">
                <div className={"d-flex mx-5 justify-content-center"}>
                    <div>E-Mail:</div>
                    <input type={"text"}
                           ref={userEmail}
                           onBlur={validateEmail}
                    />

                </div>
                <div className={"d-flex mx-5 justify-content-center"}>
                    <div>Password:</div>
                    <input type={"text"}
                           ref={userPassword}
                           onBlur={validatePassword}
                    />
                </div>

                <button type="submit"
                        className="btn btn-primary"
                        disabled={!formIsValid}
                        onClick={submitForLogin}>Login
                </button>

            </form>
        </div>

    );
}

export default Login;