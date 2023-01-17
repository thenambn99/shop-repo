export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // const [myimage, setMyImage] = React.useState(null);
  // const uploadImage = async (e) => {
  //   setMyImage(URL.createObjectURL(e.target.files[0]));
  //   const base64 = await toBase64(e.target.files[0]);
  //   values.product_image = base64;
  // };