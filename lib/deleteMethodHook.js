import swal from "sweetalert";

export const deleteMethodHook = (url, refetch) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this information!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            refetch();
            swal("Successfully deleted!", {
              icon: "success",
            });
          } else {
            swal(
              "Failed..! please check your internet connection",
              {
                icon: "warning",
              }
            );
          }
        });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};
