import AuthService from "../Controller/AuthService";
import { useState } from "react";
import '../../DAO/schema'
import { LoginResponse } from "../../DAO/schema";


interface LoginProps {
    onLoginSuccess: (response: LoginResponse) => void;
}

function Login({ onLoginSuccess }: LoginProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>): Promise<void> => {
        try {
            setloading(true);
            event.preventDefault();
            await AuthService.LoginService(email, password).then((response) => {
                onLoginSuccess(response.data);
                if (response.status === 200) {
                    const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            });
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    };



    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Sign in</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" id="floatingInput"
                                    placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-3" id="floatingPassword"
                                    placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            {loading ? (
                                <button className="w-100 mb-2 btn btn-lg  btn-primary" type="button" disabled={true}>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                            )
                                :
                                (
                                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={handleSubmit}>Sign In
                                    </button>

                                )}

                            <small className="text-body-secondary">By clicking Sign in, you agree to the terms of
                                use.</small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;