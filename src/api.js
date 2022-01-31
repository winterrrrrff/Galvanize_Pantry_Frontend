import axios from 'axios';
const fakeJsonURL = 'https://jsonplaceholder.typicode.com';
let localDevURL = 'http://localhost:4399/api';
axios.defaults.withCredentials=true;//to include cookies.

// change the backend endpoint if local backend is on
// fetch(`http://localhost:4399/api/getAllEmployees`)
// .then((res) => {
//   if (res.status == 200) {
//     localDevURL = `http://localhost:4399/api/`;
//   }
// })

export const getGoogleID = (googleData) => {
  return axios.post(localDevURL + '/google',{
    token: googleData.tokenId
  },{withCredentials:true}).then(response => response.data).catch((err) => {
    window.alert(err);
  });
};

export const getAllEmployees = () => {
  return axios.get(localDevURL + '/getAllEmployees')
      .then(response => {
        return response.data
      });
};

// how to get user id?
export const pushEditedUserInfor = (user) => {
  return axios.post(localDevURL + "/editUser", {
    id: user.userId,
    name: user.userName,
    email: user.userEmail,
    imageURL: user.userImageURL,
    isAdmin: user.userIsAdmin
  })
};

export const deleteUserById = (id) => {
  return axios.post(localDevURL + "/deleteUser", {
    id: id
  })
};

export const rosterLogin = (id) => {
  return axios.post(localDevURL + "/rosterLogin", {
    id: id
  })
};
export const uploadUserImage = (formData) => {
  let Url = localDevURL + "/uploadUserImage";
  return axios.post(Url,
  formData,  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const uploadSnackImage = (formData) => {
  let Url = localDevURL + "/uploadSnackImage";
  return axios.post(Url,
      formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}
export const getCategories = () => {
  return axios.get(localDevURL + "/getCategories")
      .then(response => {
        return response.data
      });
};

export const getSnacks = () => {
  return axios.get(localDevURL + "/getSnacks")
      .then(response => {
        return response.data
      })
};
export const fetchNewSnack = () => {
  return axios.get(localDevURL + '/getNewSnack')
      .then(response => response.data);
};
export const pushAddSnack = (snack) => {
  return axios.post(localDevURL + "/addSnack", {
    name:snack.name,
    category_id:snack.category_id,
    imageURL:snack.imageURL,
    vote_count:snack.vote_count,
    status:snack.status
  })
};

export const pushEditSnack = (snack) => {
  return axios.post(localDevURL + "/editSnack", {
    snack_Id: snack.snack_Id,
    name:snack.name,
    category_id:snack.category_id,
    imageURL:snack.imageURL,
    vote_count:snack.vote_count,
    status:snack.status
  })
};

export const deleteSnackById = (id) => {
  return axios.post(localDevURL + "/deleteSnack", {
    id: id
  })
};
export const getInventory = (id) => {
  return axios.post(localDevURL + "/getInventory", {
    id:id
  }).then(response => response.data).catch((err)=>{
    window.alert(err);
  })
};
export const updateInventory = (inventories) => {
  return axios.post(localDevURL + "/updateInventory", {
    inventories:inventories
  }).then(response => {
    if(response.data.failed.length > 0){
      window.alert("Inventory"+JSON.stringify(response.data.failed)+"failed");
    }
  }).catch((err)=>{
    window.alert(err);
  })
};
export const deleteInventory = (id) => {
  return axios.post(localDevURL + "/deleteInventory", {
    id:id
  }).then().catch((err)=>{
    window.alert(err);
  })
};

export const fetchUserWithId = userId => {
    return axios.get(`/api/users/${userId}`)
                .then(resp => resp.data);
  };

// export const fetchOrderHistory = () => {
//   return axios.get(localDevURL + '/getAllOrderHistory')
//       .then(response => {
//         return response.data
//       });
// };
export const fetchAllEmployeeList = () => {
  return axios.get(localDevURL + '/getAllUserName')
              .then(response => response.data);
};
export const fetchAllCategoryList = () => {
  return axios.get(localDevURL + '/getAllCategoryName')
              .then(response => response.data);
};
export const fetchAllSnackList = () => {
  return axios.get(localDevURL + '/getAllSnackName')
              .then(response => response.data);
};
export const fetchAllInventoryList = () => {
  return axios.get(localDevURL + '/getAllInventory')
              .then(response => response.data);
};
export const fetchStaleInventoryList = () => {
  return axios.get(localDevURL + '/getAllStaleInventory')
              .then(response => response.data);
};
export const fetchVoteList = () => {
  return axios.get(localDevURL + '/getAllVote')
              .then(response => response.data);
};
export const fetchPaymentList = () => {
  return axios.get(localDevURL + '/getAllPayment')
              .then(response => response.data);
};

export const filterInventoryByQuant = async (quantity) => {
  return axios.get(localDevURL + "/getSelectSnack/", {
    params: {quantity: quantity}
  }).then(response => response.data);
};
export const logout = () =>{
  return axios.get(localDevURL + '/logout').then(response => response.data).catch((err) => {
    window.alert(err);
  });
}
export const verify = (admin/*boolean*/) =>{
  let location = "/verifyUser";
  if (admin){
    location = "/verifyAdmin";
  }
  axios.get(localDevURL + location).
  catch((err) => {
    if (err.response && err.response.status === 500) {
      window.alert(err.response.data.message);
      window.location.href = "/";
    } else {
        //window.alert(err);
    }
  });
  return true;
}
export const getUserId = (googleData) => {
  return axios.get(localDevURL + '/getUserId').then(response => response.data).catch((err) => {
    window.alert(err);
  });
};
export const fetchOrderHistory = () => {
  return axios.get(localDevURL + '/order').then(response => response.data);
};

export const fetchSnacksList = () => {
  return axios.get(localDevURL + '/snacks')
      .then(response => response.data)
};

export const fetchOrderHistotyForAdmin = (id) => {
  return axios.post(localDevURL + "/auditOrder", {
    id: id
  }).then(response => response.data).catch((err) => {
    window.alert(err);
  });
};

export const markOrdersAsPaid = async (ids) => {
  return axios.post(localDevURL + "/updateOrderStatus", {
    ids: ids
  })
      .then(response => window.alert(response.data.message))
      .catch((err) => {
        window.alert(err);
      });
}

export const pushOrder= (order) => {
  // console.log("send request");
  return axios.post(localDevURL + "/createOrder",order)
  .then((res)=>{
    // console.log("res: " + JSON.stringify(res));
    return res.data;
  })
  .catch((err) => {
    // console.log("err: " + JSON.stringify(err));
    return err;
  })
};

export const updateVoteCount= (snack) => {
  return axios.post(localDevURL + "/updateVote",snack)
};

export const createVoteSnack= (snack) => {
  return axios.post(localDevURL + "/createVoteSnack",snack)
};

// export const pushOrderInfo = (orderInfo) => {
//   return axios.post(localDevURL + "/createOrderDetail",orderInfo)
// };
// export const fetchUserWithId = userId => {
//     return axios.get(`/api/users/${userId}`)
//                 .then(resp => resp.data);
//   };
