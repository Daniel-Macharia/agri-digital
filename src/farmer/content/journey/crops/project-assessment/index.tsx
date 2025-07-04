import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.css";
import "/src/index.css";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

const ProjectAssessment: React.FC = ()=>{

    const initialValues = {
        expectedRevenue: '',
        expectedExpenditure: '',
        seedCost: '',
        seedCostDescription: '',
        laborCost: '',
        laborCostDescription: '',
        fertilizerCost: '',
        fertilizerCostDescription: '',
        equipmentCost: '',
        equipmentCostDescription: '',
        otherCost: '',
        otherCostDescription: ''
    };

    const validationSchema = Yup.object({
        expectedRevenue: Yup.number().moreThan(0).required("required").typeError("expected revenue must be a number"),
        expectedExpenditure: Yup.number().moreThan(0).required("Required").typeError("expected expenditure must be a number"),
        seedCost: Yup.number().moreThan(0).required("Required").typeError("seed cost must be a number"),
        seedCostDescription: Yup.string(),
        laborCost: Yup.number().moreThan(0).required("Required").typeError("labor cost must be a number"),
        laborCostDescription: Yup.string(),
        fertilizerCost: Yup.number().moreThan(0).required("Required").typeError("fertilizer cost must be a number"),
        fertilizerCostDescription: Yup.string(),
        equipmentCost: Yup.number().moreThan(0).required("Required").typeError("equipment cost must be a number"),
        equipmentCostDescription: Yup.string(),
        otherCost: Yup.number().moreThan(0).required("Required").typeError("other cost must be a number"),
        otherCostDescription: Yup.string()
    });

    const navigate = useNavigate();

    const handleProjectAssessment = (data: typeof initialValues, {}: any ) => {
        console.log('assessing project..');
        console.log(data);
        navigate("/farmer/projects/crops/soil-testing");
    };

    const handleBackButton = () => {
        navigate("/farmer/projects");
        console.log("navigating back..");
    };

    const render = ()=>{
        return (<>
            <div className="container col-sm-12">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleProjectAssessment}
                >
                    {({})=>(
                        <Form className="col-sm-12">
                            <div className="col-sm-12">
                                {/* <h3 className="h3-medium">
                                    Here is the project assessment.
                                </h3> */}
                                <p className="body-regular col-sm-12" style={{textAlign: "start"}}>
                                    Let's assess the financial aspects of your project.
                                </p>
                            </div>

                            
                            <div className="revenue-div col-sm-12">
                                <label className="col-sm-12 form-input-label">Expected revenue</label>
                                <div className="col-sm-12">
                                    <Field
                                    className="price-input-field col-sm-12"
                                    type="text"
                                    name="expectedRevenue"

                                    placeholder="ksh 250,000.00"

                                    />
                                    <div className="text-danger small form-input-label col-sm-12">
                                        <ErrorMessage name="expectedRevenue"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 expenses">
                                <div className="total-expense-div col-sm-12">
                                    <label className="col-sm-12 form-input-label">
                                        Total Expected expenses
                                    </label>
                                    <div className="col-sm-12" >
                                        <Field
                                        type="text"
                                        name="expectedExpenditure"

                                        className="price-input-field col-sm-12"

                                        placeholder="ksh 250,000.00"

                                        />
                                        <div className="text-danger small col-sm-12 form-input-label">
                                            <ErrorMessage name="expectedExpenditure"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12" >
                                    <label className="col-sm-12 form-input-label">
                                        Expense breakdown
                                    </label>
                                    
                                    <div className="col-sm-12">

                                        <div 
                                        className="row col-sm-12"
                                        style={{display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginBottom: "8px"
                                        }}
                                        >
                                            <label className="form-input-label col-sm-12 col-md-4"
                                            style={{margin: "0px", paddingTop: "4px"}}
                                            >
                                                Seeds
                                            </label>

                                            <div className="row col-sm-12 col-md-8"
                                            style={{margin: "0px", padding: "0px",
                                                display: "flex", flexDirection: "row", flexWrap: "wrap"
                                            }}
                                            >
                                                <div className="col-sm-12 col-md-4" 
                                                style={{padding: "0px", marginBottom: "4px"}}>
                                                    <Field
                                                    className="cost-input-field col-sm-12"
                                                    type="text"
                                                    name="seedCost"
                                                    placeholder="ksh 250,000.00"

                                                    />
                                                    <div className="text-danger small col-sm-12 form-input-label"
                                                    style={{margin: "0px"}}>
                                                        <ErrorMessage name="seedCost"/>
                                                    </div>
                                                </div>

                                                <Field
                                                className=" col-sm-12 col-md-8 body-regular description-input-field"
                                                type="text"
                                                name="seedCostDescription"
                                                placeholder="Description(optional)"
                                                style={{marginBottom: "4px"}}
                                                />
                                            </div>
                                        </div>


                                        <div 
                                        className="row col-sm-12"
                                        style={{display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginBottom: "8px"
                                        }}
                                        >
                                            <label className="form-input-label col-sm-12 col-md-4"
                                            style={{margin: "0px", paddingTop: "4px"}}
                                            >
                                                Labor cost
                                            </label>

                                            <div className="row col-sm-12 col-md-8"
                                            style={{margin: "0px", padding: "0px",
                                                display: "flex", flexDirection: "row", flexWrap: "wrap"
                                            }}
                                            >
                                                <div className="col-sm-12 col-md-4" 
                                                style={{padding: "0px", marginBottom: "4px"}}>
                                                    <Field
                                                    className="cost-input-field col-sm-12"
                                                    type="text"
                                                    name="laborCost"
                                                    placeholder="ksh 250,000.00"

                                                    />
                                                    <div className="text-danger small col-sm-12 form-input-label"
                                                    style={{margin: "0px"}}>
                                                        <ErrorMessage name="laborCost"/>
                                                    </div>
                                                </div>

                                                <Field
                                                className=" col-sm-12 col-md-8 body-regular description-input-field"
                                                type="text"
                                                name="laborCostDescription"
                                                placeholder="Description(optional)"
                                                style={{marginBottom: "4px"}}
                                                />
                                            </div>
                                        </div>


                                        <div 
                                        className="row col-sm-12"
                                        style={{display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginBottom: "8px"
                                        }}
                                        >
                                            <label className="form-input-label col-sm-12 col-md-4"
                                            style={{margin: "0px", paddingTop: "4px"}}
                                            >
                                                Fertilizer
                                            </label>

                                            <div className="row col-sm-12 col-md-8"
                                            style={{margin: "0px", padding: "0px",
                                                display: "flex", flexDirection: "row", flexWrap: "wrap"
                                            }}
                                            >
                                                <div className="col-sm-12 col-md-4" 
                                                style={{padding: "0px", marginBottom: "4px"}}>
                                                    <Field
                                                    className="cost-input-field col-sm-12"
                                                    type="text"
                                                    name="fertilizerCost"
                                                    placeholder="ksh 250,000.00"

                                                    />
                                                    <div className="text-danger small col-sm-12 form-input-label"
                                                    style={{margin: "0px"}}>
                                                        <ErrorMessage name="fertilizerCost"/>
                                                    </div>
                                                </div>

                                                <Field
                                                className=" col-sm-12 col-md-8 body-regular description-input-field"
                                                type="text"
                                                name="fertilizerCostDescription"
                                                placeholder="Description(optional)"
                                                style={{marginBottom: "4px"}}
                                                />
                                            </div>
                                        </div>


                                        <div 
                                        className="row col-sm-12"
                                        style={{display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginBottom: "8px"
                                        }}
                                        >
                                            <label className="form-input-label col-sm-12 col-md-4"
                                            style={{margin: "0px", paddingTop: "4px"}}
                                            >
                                                Equipment
                                            </label>

                                            <div className="row col-sm-12 col-md-8"
                                            style={{margin: "0px", padding: "0px",
                                                display: "flex", flexDirection: "row", flexWrap: "wrap"
                                            }}
                                            >
                                                <div className="col-sm-12 col-md-4" 
                                                style={{padding: "0px", marginBottom: "4px"}}>
                                                    <Field
                                                    className="cost-input-field col-sm-12"
                                                    type="text"
                                                    name="equipmentCost"
                                                    placeholder="ksh 250,000.00"

                                                    />
                                                    <div className="text-danger small col-sm-12 form-input-label"
                                                    style={{margin: "0px"}}>
                                                        <ErrorMessage name="equipmentCost"/>
                                                    </div>
                                                </div>

                                                <Field
                                                className=" col-sm-12 col-md-8 body-regular description-input-field"
                                                type="text"
                                                name="equipmentCostDescription"
                                                placeholder="Description(optional)"
                                                style={{marginBottom: "4px"}}
                                                />
                                            </div>
                                        </div>


                                        <div 
                                        className="row col-sm-12"
                                        style={{display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginBottom: "8px"
                                        }}
                                        >
                                            <label className="form-input-label col-sm-12 col-md-4"
                                            style={{margin: "0px", paddingTop: "4px"}}
                                            >
                                                Other cost
                                            </label>

                                            <div className="row col-sm-12 col-md-8"
                                            style={{margin: "0px", padding: "0px",
                                                display: "flex", flexDirection: "row", flexWrap: "wrap"
                                            }}
                                            >
                                                <div className="col-sm-12 col-md-4" 
                                                style={{padding: "0px", marginBottom: "4px"}}>
                                                    <Field
                                                    className="cost-input-field col-sm-12"
                                                    type="text"
                                                    name="otherCost"
                                                    placeholder="ksh 250,000.00"

                                                    />
                                                    <div className="text-danger small col-sm-12 form-input-label"
                                                    style={{margin: "0px"}}>
                                                        <ErrorMessage name="otherCost"/>
                                                    </div>
                                                </div>

                                                <Field
                                                className=" col-sm-12 col-md-8 body-regular description-input-field"
                                                type="text"
                                                name="otherCostDescription"
                                                placeholder="Description(optional)"
                                                style={{marginBottom: "4px"}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 row"
                            style={{display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
                                <button
                                onClick={handleBackButton}
                                className="other-button col-sm-4"
                                style={{margin: "0px"}}
                                >
                                    Back
                                </button>

                                <button
                                type="submit"
                                name="start"
                                className="col-sm-4 offset-4"
                                style={{margin: "0px"}}
                                >
                                    Start Journey
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>)};

    return render();
}

export default ProjectAssessment;