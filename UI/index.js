

const uploadForm = document.querySelector('.upload');
uploadForm.addEventListener('submit', function(e) {
   e.preventDefault()
   var image = document.getElementById('output');
   image.src = '';
	document.querySelector('.para').innerHTML = '';
   let file = e.target.uploadFile.files[0];
   
   
   console.log(file);
   let formData = new FormData();
   formData.append('file', file);
   console.log(formData.file);
   fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
 })
.then(response => response.json())
.then(data => {console.log(data);
   image.src = URL.createObjectURL(file);
   document.querySelector('.para').innerHTML = data.content;
});
});