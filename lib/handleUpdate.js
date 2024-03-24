const handleUpdate = (url, data, setReloader, reolder) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.result === "success") {
        setReloader(!reolder)
        return true;
      } else {
        return false;
      }
    });
};

export default handleUpdate;
