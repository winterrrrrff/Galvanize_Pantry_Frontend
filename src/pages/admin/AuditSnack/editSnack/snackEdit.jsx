import React from 'react';
//import './snackEdit.style.css'
import '../addSnack/addSnack.style.css'
import TextField from '@material-ui/core/TextField';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as api from "../../../../api";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";


// using code of https://material-ui.com/zh/components/text-fields/ to implement user input field
// using code of https://react-popup.elazizi.com/react-modal/#custom-modal to implement pop up windows
// using code of https://material-ui.com/zh/components/radio-buttons/ to implement radio box
export const SnackEdit = (props) => {

    const [startDate, setStartDate] = React.useState(new Date());

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const [name, setName] = React.useState({
        name: props.snack.name
    });

    const [category_id, setCategory_id] = React.useState({
        category_id: props.snack.category_id
    });

    const [vote, setVote] = React.useState({
        vote: props.snack.vote_count
    });
    const [status, setStatus] = React.useState({
        status: props.snack.status
    });
    const [imageURL, setImageRUL] = React.useState({
        imageURL: props.snack.image_url
    });

    const [imageSCR, setImagSRC] = React.useState({
        imageSCR: ''
    });

    const handleRadioChange = (e) => {
        const statusObj = { status: e.target.value };
        setStatus(statusObj);
    };

    const submitHandler = (e) => {
        if (vote.email === "" || name.name === "" || imageURL.imageURL === "") {
            // or default an image?
            window.alert("Name, votecount or image cannot be empty!");
        }

        if (uploadedImage.current && uploadedImage.current.file) {
            const imageFile = uploadedImage.current.file;
            let formData = new FormData(); // Currently empty
            const fileName = props.snack.snack_Id + "." + imageFile.name.split('.').pop();
            formData.append('file', imageFile, fileName);

            api.uploadSnackImage(formData).then((res) => {
                const snack = {
                    snack_Id: props.snack.snack_Id,
                    name: name.name,
                    category_id: category_id.category_id,
                    imageURL: res.data,
                    status: status.status,
                    vote_count: vote.vote
                };
                api.pushEditSnack(snack).then((response) => {
                    window.alert("Edit successfully!");
                    props.update();
                    props.close();
                }).catch((err) => {window.alert(err.response.message)});
            });
        } else {
            const snack = {
                snack_Id: props.snack.snack_Id,
                name: name.name,
                category_id: category_id.category_id,
                imageURL: imageURL.imageURL,
                status: status.status,
                vote_count: vote.vote
            };
            api.pushEditSnack(snack).then((response) => {
                window.alert("Edit successfully!");
                props.update();
                props.close();
            }).catch((err)=>{window.alert(err.response.data.message)})
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
        <div style={{ border: "8px solid grey"}}>
            
            <div className="add-snack">
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
                        <select id="category-select-edit" defaultValue={category_id.category_id}
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
                {/*<div id="expire-date-container">
                    <div>
                        <span id="category">Expire date</span>
                    </div>
                    <div>
                        <DatePicker
                            id = "expire-date-select"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            placeholder={props.snack.expireDate}
                        />
                    </div>
                </div>*/}
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
                        <input type="file" accept="image/*" multiple = "false" onChange={handleImageUpload}
                               ref={imageUploader}
                               style={{
                                   display: "none"
                               }} />
                        <div style={{
                            height: "190px",
                            width: "190px",
                            border: "2px dashed black"}}
                             onClick={() => imageUploader.current.click()}>
                            <img ref={uploadedImage}
                                 style={{
                                     width: "190px",
                                     height: "190px",
                                     position: "absolute"
                                 }}
                            /><img alt='snack' src={`${imageURL.imageURL}?${props.snack.imgDate}`} width="190px" height="190px" />
                        </div>
                        Click to upload Image
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
                    <Popup onOpen={() => {submitHandler();}}
                           trigger={<button className="add-user"
                                            style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 100, width: 400,fontSize:'40px',
                                            color:"white"}}
                           >Edit Snack</button>}
                           modal
                           nested
                    >
                    </Popup>
                </div>

            </div>
        </div>
    );
};