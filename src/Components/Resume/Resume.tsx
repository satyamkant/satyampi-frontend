import "./Resume.css"
import Card from "../Card/Card"
import education from "../../Resources/Images/board-classroom-education-svgrepo-com.svg"
import experience from "../../Resources/Images/work-svgrepo-com.svg"
import skills from "../../Resources/Images/mouse-svgrepo-com.svg"
import data from "../../DAO/portfolio.json";

function Resume() {
    return (
        <section id="resume">
            <div className="container p-5 text-center text-md-start">
                <div className="d-md-flex py-3">
                    <img className="img-fluid w-25 mx-5" src={education} alt="education photo"/>
                    <div className="row text-center justify-content-center">
                        <Card
                            featured="Education"
                            title="Institute of Engineering and Management, Kolkata"
                            data={data.education}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row py-3 align-items-center">
                    <div className="order-2 order-md-1 text-center">
                        <div className="row justify-content-center">
                            <Card
                                featured="Experience"
                                title="Specialist Programmer @ Infosys"
                                data={data.experience}
                            />
                        </div>
                    </div>
                    <img className="order-1 order-md-2 img-fluid w-25 mx-5" src={experience} alt="education photo"/>
                </div>
                <div className="d-md-flex py-3">
                    <img className="img-fluid w-25 mx-5" src={skills} alt="education photo"/>
                    <div className="row text-center justify-content-center">
                        <Card
                            featured="Skills"
                            title="Areas of Expertise"
                            data={data.skills}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resume;