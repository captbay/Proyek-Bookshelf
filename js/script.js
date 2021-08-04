document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
  
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });
    
    const checkbox = document.getElementById("inputBookIsComplete");
    const hiasan = document.querySelector(".hiasan > span");
    checkbox.addEventListener("click", function(){
        if(checkbox.checked){
            hiasan.innerText="Selesai dibaca";
        }else{
            hiasan.innerText="Belum selesai dibaca";
        }
    });
  
    if(isStorageExist()){
        loadDataFromStorage();
    }
});
  
  
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});