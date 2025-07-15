import { ErrorMessage, Field, Form, Formik } from "formik";
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
            <div className="crops-container bg-white col-12 p-4 ">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleProjectAssessment}
                >
                    {({})=>(
                        <Form className="col-12 ">
                            <div className="col-12">
                                <p className="h3-semibold primary-text col-12 crops-start-aligned-text">
                                    Project Assessment
                                </p>
                                <p className="body-regular col-12 crops-start-aligned-text secondary-text" >
                                    Let's assess the financial aspects of your project.
                                </p>
                            </div>

                            
                            <div className="col-12 card">

                                <div className="row " >
                                    <div className="col-12 col-md-4">
                                        <label className="col-12 body-regular primary-text crops-start-aligned-text">
                                            Expected revenue
                                        </label>
                                    </div>
                                    <div className="col-12">
                                        <Field
                                        className="form-control body-regular my-0 col-12"
                                        type="text"
                                        name="expectedRevenue"

                                        placeholder="ksh 250,000.00"

                                        />
                                        <div className="text-danger small crops-start-aligned-text col-sm-12">
                                            <ErrorMessage name="expectedRevenue"/>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="col-12 card">
                                <div className="col-12">
                                    <div className="row ">
                                        <div className="col-12">
                                            <label className="crops-start-aligned-text primary-text body-regular col-12">
                                                Total Expected expenses
                                            </label>
                                        </div>
                                        <div className="col-12 " >
                                            <Field
                                            type="text"
                                            name="expectedExpenditure"

                                            className="form-control body-regular my-0 "

                                            placeholder="ksh 250,000.00"

                                            />
                                            <div className="text-danger small col-sm-12 crops-start-aligned-text">
                                                <ErrorMessage name="expectedExpenditure"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-2" >
                                    <div className="row px-1 ">
                                        <label className="col-12 mx-0 mb-1 mt-3 body-regular primary-text crops-start-aligned-text">
                                            Expense breakdown
                                        </label>
                                    </div>
                                    
                                    <div className="col-sm-12">

                                        <div className="row mb-2">
                                            <div className="col-12 col-md-3 py-1 " >
                                                <label className="crops-start-aligned-text body-regular primary-text col-12 my-1 ">
                                                    Seeds
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <div className="row">
                                                    <div className="col-12 col-md-4 my-1">
                                                        <Field
                                                            className=" form-control body-regular my-0"
                                                            type="text"
                                                            name="seedCost"
                                                            placeholder="ksh 250,000.00"
                                                        />
                                                        <div className="text-danger small crops-start-aligned-text">
                                                            <ErrorMessage name="seedCost"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-8 my-1">
                                                        <Field
                                                            className="form-control body-regular my-0"
                                                            type="text"
                                                            name="seedCostDescription"
                                                            placeholder="Description(optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-2">
                                            <div className="col-12 col-md-3 py-1 " >
                                                <label className="crops-start-aligned-text body-regular primary-text col-12 my-1 ">
                                                    Labor Cost
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <div className="row">
                                                    <div className="col-12 col-md-4 my-1">
                                                        <Field
                                                            className=" form-control body-regular my-0"
                                                            type="text"
                                                            name="laborCost"
                                                            placeholder="ksh 250,000.00"
                                                        />
                                                        <div className="text-danger small crops-start-aligned-text">
                                                            <ErrorMessage name="laborCost"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-8 my-1">
                                                        <Field
                                                            className="form-control body-regular my-0"
                                                            type="text"
                                                            name="laborCostDescription"
                                                            placeholder="Description(optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-2">
                                            <div className="col-12 col-md-3 py-1 " >
                                                <label className="crops-start-aligned-text body-regular primary-text col-12 my-1 ">
                                                    Fertilizer
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <div className="row">
                                                    <div className="col-12 col-md-4 my-1">
                                                        <Field
                                                            className=" form-control body-regular my-0"
                                                            type="text"
                                                            name="fertilizerCost"
                                                            placeholder="ksh 250,000.00"
                                                        />
                                                        <div className="text-danger small crops-start-aligned-text">
                                                            <ErrorMessage name="fertilizerCost"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-8 my-1">
                                                        <Field
                                                            className="form-control body-regular my-0"
                                                            type="text"
                                                            name="fertilizerCostDescription"
                                                            placeholder="Description(optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-2">
                                            <div className="col-12 col-md-3 py-1 " >
                                                <label className="crops-start-aligned-text body-regular primary-text col-12 my-1 ">
                                                    Equipment
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <div className="row">
                                                    <div className="col-12 col-md-4 my-1">
                                                        <Field
                                                            className=" form-control body-regular my-0"
                                                            type="text"
                                                            name="equipmentCost"
                                                            placeholder="ksh 250,000.00"
                                                        />
                                                        <div className="text-danger small crops-start-aligned-text">
                                                            <ErrorMessage name="equipmentCost"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-8 my-1">
                                                        <Field
                                                            className="form-control body-regular my-0"
                                                            type="text"
                                                            name="equipmentCostDescription"
                                                            placeholder="Description(optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-2">
                                            <div className="col-12 col-md-3 py-1 " >
                                                <label className="crops-start-aligned-text body-regular primary-text col-12 my-1 ">
                                                    Other
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <div className="row">
                                                    <div className="col-12 col-md-4 my-1">
                                                        <Field
                                                            className=" form-control body-regular my-0"
                                                            type="text"
                                                            name="otherCost"
                                                            placeholder="ksh 250,000.00"
                                                        />
                                                        <div className="text-danger small crops-start-aligned-text">
                                                            <ErrorMessage name="otherCost"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-8 my-1">
                                                        <Field
                                                            className="form-control body-regular my-0"
                                                            type="text"
                                                            name="otherCostDescription"
                                                            placeholder="Description(optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12"
                            >
                                <div className="row px-2">
                                    <div className="col-12 col-md-6 mt-2 " >
                                        <div className="row justify-content-start">
                                            <button
                                            onClick={handleBackButton}
                                            className="crops-other-button col-12 mx-0 col-md-8 "
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mt-2">
                                        <div className="row justify-content-end ">
                                            <button
                                            type="submit"
                                            name="start"
                                            className="col-12 col-md-8 mx-0 crops-accept-button"
                                            >
                                                Start Journey
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>)};

    return render();
}

export default ProjectAssessment;