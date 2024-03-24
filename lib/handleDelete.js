import swal from "sweetalert";

const handleDelete = (url, setReloader, reolder) => {
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setReloader(!reolder);
        swal("Successfully deleted!", {
          icon: "success",
        });
      } else {
        swal("Failed..! Please check your internet connection", {
          icon: "warning",
        });
      }
    });
};

export default handleDelete;
