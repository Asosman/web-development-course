const pickedImageElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

// alert('i am connected!!!');
function previewImage(){
    const file = pickedImageElement.files;
    if(!file || file.length == 0){
        imagePreviewElement.style.display = 'none';
        return;
    }
    const pickedFile = file[0];
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = 'block';
}
pickedImageElement.addEventListener('change', previewImage);