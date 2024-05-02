const pickedImageElement = document.querySelector('#image-control input');
const imagePreviewElement = document.querySelector('#image-control img');

function imagePreview(){
    const files = pickedImageElement.files;

    if(!files || files.length === 0){
        imagePreviewElement.style.display = 'none';
        return;
    }

    const pickedFile = files[0];
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = 'inline';
}

pickedImageElement.addEventListener('change',imagePreview);