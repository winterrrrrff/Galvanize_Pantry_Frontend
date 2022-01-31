import React from 'react';
import './addSnack.style.css'
//import '../editSnack/snackEdit.style.css'
import TextField from '@material-ui/core/TextField';
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Logo } from "pages/admin/report/reportStyle";
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as api from "../../../../api";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";


// using code of https://material-ui.com/zh/components/text-fields/ to implement user input field
// using code of https://react-popup.elazizi.com/react-modal/#custom-modal to implement pop up windows
// using code of https://www.npmjs.com/package/react-datepicker to implement expire date
export const AddSnack = (props) => {
    const [value, setValue] = React.useState();

    const [startDate, setStartDate] = React.useState(new Date());
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);


    const [name, setName] = React.useState({
        name: ""
    });

    const [category_id, setCategory_id] = React.useState({
        category_id: 1
    });

    const [vote, setVote] = React.useState({
        vote: 0
    });
    const [status, setStatus] = React.useState({
        status: "existing"
    });
    const [imageURL, setImageURL] = React.useState({
        imageURL: ""
    });


    const handleRadioChange = (e) => {
        const statusObj = { status: e.target.value };
        setStatus(statusObj);
    };

    const submitHandler = (e) => {
        if (vote.vote === "" || name.name === "") {
            // or default an image?
            window.alert("Name and vote cannot be empty!");
            return;
        }

        if (uploadedImage.current && uploadedImage.current.file) {
            const imageFile = uploadedImage.current.file;
            console.log(imageFile);
            let formData = new FormData(); // Currently empty

            api.fetchNewSnack().then((snackIDJSON)=>{
                const fileName = snackIDJSON.snack_Id + "." + imageFile.name.split('.').pop();

                formData.append('file', imageFile, fileName);
            api.uploadSnackImage(formData).then((res) => {
                setImageURL(res.data);
                const snack = {
                    snack_Id: snackIDJSON.snack_Id,
                    name: name.name,
                    category_id: category_id.category_id,
                    imageURL: res.data,
                    status: status.status,
                    vote_count: vote.vote
                };
                api.pushEditSnack(snack).then((response) => {
                    window.alert("Add successfully!");
                    props.update();
                }).catch((err) => {
                    window.alert(err.response.data.message);
                    api.deleteSnackById(snackIDJSON.snack_Id).then();
                });
            })
            });
        } else {
            const snack = {
                name: name.name,
                category_id: category_id.category_id,
                imageURL: imageURL.imageURL,
                status: status.status,
                vote_count: vote.vote
            };
            api.pushAddSnack(snack).then((response) => {
                window.alert("Add successfully!");
                props.update();
            }).catch((err)=>{
                window.alert(err.response.data.message);
            })
        }
    };




// read the file(image) that we upload and attach the ref to the image
    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="add-snack">
           <Grid item xs={3} spacing={15}>
            <Logo />
            </Grid>
            <div id="header">
                <span id="title">Manage Snack Info</span>
            </div>

            <div id="name-container">
                <div>
                    <span id="name">Name</span>
                </div>
                <div>
                    <TextField
                        id="filled-name"
                        variant="filled"
                        placeholder={name.name}
                        value={name.name}
                        onChange={(e) => {
                            const nameObj = { name: e.target.value };
                            setName(nameObj);
                        }}
                    />
                </div>
            </div>
            <div id="category-container">
                <div>
                    <span id="category">Category</span>
                </div>
                <div>
                    <select id="category-select" defaultValue={1}
                            onChange={(e) => {
                                const categoryObj = { category_id: e.target.value };
                                setCategory_id(categoryObj);
                            }}
                    >
                        {props.category.map(category => (
                            <option value={category.category_id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div id="type-container">
                <div>
                    <span id="type">Status</span>
                </div>
                <div id="field-container">
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="status" name="status" value={status.status} onChange={handleRadioChange}>
                            <FormControlLabel value="existing" control={<Radio />} label="Existing" />
                            <FormControlLabel value="new" control={<Radio />} label="Newly Recommended" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div id="picture-container1">
                <div>
                    <span id="picture">Picture</span>
                </div>
                <div id="picture-upload" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <input type="file" accept="image/*" multiple = "false" onChange={handleImageUpload} ref={imageUploader}
                           style={{
                               display: "none",
                               height: "150px",
                               width: "150px",
                               border: "2px dashed black",
                           }} />
                    <div style={{
                            height: "200px",
                            width: "200px",
                            border: "2px dashed black",
                            fontSize:"20px"
                        }}
                         onClick={() => imageUploader.current.click()}>
                        <img ref={uploadedImage}
                            style={{
                                width: "200px",
                                height: "200px",
                                position: "absolute"
                            }}
                        />
                        Click to upload Image
                    </div>
                </div>
            </div>
            <div id="vote-container">
                <div>
                    <span id="vote">Vote</span>
                </div>
                <div>
                    <TextField
                        id="filled-vote"
                        variant="filled"
                        value = {vote.vote}
                        onChange={(e) => {
                            const voteObj = { vote: e.target.value };
                            setVote(voteObj);
                        }}
                        type = "number"
                    />
                </div>
            </div>

            <div id="add-button">
                <Popup
                    onOpen={() => {submitHandler(); }}
                    trigger={<button className="add-user"
                                     style={{backgroundColor: "#e6be93", height: 50, width: 400,fontSize:'40px',
                        color:"white"}}
                    >Add Snack</button>}
                    modal
                    nested
                >
                </Popup>
            </div>

        </div>
    );
};
