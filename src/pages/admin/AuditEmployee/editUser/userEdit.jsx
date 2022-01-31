import React from 'react';
import './userEdit.style.css'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Popup from "reactjs-popup";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as api from '../../../../api';

// using code of https://material-ui.com/zh/components/text-fields/ to implement user input field
// using code of https://react-popup.elazizi.com/react-modal/#custom-modal to implement pop up windows
// using code of https://material-ui.com/zh/components/radio-buttons/ to implement radio box
export const UserEdit = (props) => {


    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const [name, setName] = React.useState({
        name: props.user.name
    });

    const [email, setEmail] = React.useState({
        email: props.user.email
    });

    const [role, setType] = React.useState({
        type: props.user.isAdmin
    });

    const [imageURL, setImageRUL] = React.useState({
        imageURL: props.user.image_url
    });

    const handleRadioChange = (e) => {
        const typeObj = { type: e.target.value };
        console.log(typeObj.type);
        setType(typeObj);
    };


    const submitHandler = (e) => {
        let isAdmin = false;
        if (role.type === "Administrator") {
            isAdmin = true;
        }
        if (email.email === "" || name.name === "" || imageURL.imageURL === "") {
            // or default an image?
            window.alert("Email, name or image cannot be empty!");
        }

        if (uploadedImage.current && uploadedImage.current.file) {
            const imageFile = uploadedImage.current.file;
            let formData = new FormData(); // Currently empty
            const fileName = props.user.id + "." + imageFile.name.split('.').pop();
            formData.append('file', imageFile, fileName);

            api.uploadUserImage(formData).then((res) => {
                console.log(res.data);
                const image = { imageURL: res.data };
                console.log(image);
                setImageRUL(image);
                const user = {
                    userId: props.user.id,
                    userName: name.name,
                    userEmail: email.email,
                    userIsAdmin: isAdmin,
                    userImageURL: res.data
                };
                api.pushEditedUserInfor(user).then((response) => {
                    props.fetchAndUpdateList();
                    props.close();
                }).catch((err) => {});
            });
        } else {
            const user = {
                userId: props.user.id,
                userName: name.name,
                userEmail: email.email,
                userIsAdmin: isAdmin,
                userImageURL: imageURL.imageURL
            };
            api.pushEditedUserInfor(user).then((response) => {
                props.fetchAndUpdateList();
                props.close();
            }).catch((err) => {});
        }
    };


// read the file(image) that we upload and attach the ref to the image
    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            // console.log(file);
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            // do not know how to get the image url
        }
    };


    return (
        <div style={{ border: "8px solid grey"}}>
            <div className="add-user">
                <div id="name-container">
                    <div>
                        <span id="name">Name</span>
                    </div>
                    <div>
                        <TextField
                            id="fill-name"
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

                <div id="email-container">
                    <div>
                        <span id="email">Email</span>
                    </div>
                    <div>
                        <TextField
                            disabled
                            id="fill-email"
                            variant="filled"
                            placeholder={email.email}
                            value={email.email}
                            onChange={(e) => {
                                const emailObj = { email: e.target.value };
                                setEmail(emailObj);
                            }}
                        />
                    </div>
                </div>

                <div id="type-container">
                    <div>
                        <span id="type">Role</span>
                    </div>
                    <div id="field-container">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="type" name="type" value={role.type} onChange={handleRadioChange}>
                                <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                                <FormControlLabel value="Administrator" control={<Radio />} label="Administrator" />
                            </RadioGroup>
                        </FormControl>
                        {/*<RadioGroup name="role" onChange={e => {setType(e.target.value)}}>*/}
                        {/*    <Radio value="employee" checked = {role.type === 'employee'} />Employee*/}
                        {/*    <Radio value="administrator" checked = {role.type === 'administrator'} />Administrator*/}
                        {/*</RadioGroup>*/}
                    </div>
                </div>

                <div id="picture-container">
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
                                 }}/><img alt='user' src={imageURL.imageURL} width="190px" height="190px" /></div>
                        Click to upload a new Image
                    </div>
                </div>

                <div id="add-button">
                    <Popup onOpen={() => {submitHandler();}}
                           trigger={<button className="add-user"
                                            style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 100, width: 400,fontSize:'40px',
                                                color:"white"}}
                           >Edit User</button>}
                           modal
                           nested
                    >
                    </Popup>
                </div>

            </div>
        </div>
    );
};
