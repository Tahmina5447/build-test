import swal from "sweetalert";

const FetchUpdateHook = (url, bodyData) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.modifiedCount) {
        return swal("Success", `User ${bodyData.status} successful`, "success");
      }
      if (data.status === "success") {
        return swal("Success", `Update Status`, "success");
      }
    });
};

export default FetchUpdateHook;
