import { uploadAvatar } from './User/UserService';

let selectedFile: any = undefined;
let dataUrl: any;
let isCropping: boolean;

function upload() {
  const formData = new FormData();
  formData.append('avatar', selectedFile);

  // uploadAvatar(formData)
  //   .then((d) => {
  //     userStore.user.avatar = d.avatar.avatar;
  //   })
  //   .catch(() => {
  //     console.error('Something went wrong.');
  //   });
}

function fileSelect(files: any) {
  selectedFile = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    dataUrl = e.target!.result;
    isCropping = true;
    // cropping.value = true;
  };
  reader.readAsDataURL(selectedFile);
  isCropping = true;

  // cropping.value = true;

  upload();
}

export { fileSelect, dataUrl, isCropping };
