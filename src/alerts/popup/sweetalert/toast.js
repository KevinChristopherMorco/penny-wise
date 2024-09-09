import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const toast = () => {
  const errorAlert = (title, text) => {
    Toast.fire({
      icon: "error",
      title,
      text,
    });
  };

  return { errorAlert };
};

export default toast;
