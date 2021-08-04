const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const titleBook = document.getElementById("inputBookTitle").value;
    const authorBook = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;
    let isCompleteBook = false;

    const checkbox = document.getElementById("inputBookIsComplete");
    if(checkbox.checked){
        isCompleteBook = true;
    }

    const book = makeBook(titleBook, authorBook, yearBook, isCompleteBook);
    
    const bookObject = composeBookObject(titleBook, authorBook, yearBook, isCompleteBook);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(isCompleteBook){
        completedBOOKList.append(book);
    }else{
        uncompletedBOOKList.append(book); 
    }
    updateDataToStorage();
}

function addTaskToCompleted(taskElement ) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".book_item > .inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .inner >.author").innerText;
    const bookYear = taskElement.querySelector(".book_item > .inner > .year").innerText;
    const newBook = makeBookwithout(bookTitle, bookAuthor, bookYear, true);
  
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function makeBook(titleBook, authorBook, yearBook, isCompleteBook) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = titleBook;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = "Penulis: " + authorBook;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = "Tahun: " + yearBook;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("book_item");
    container.append(textContainer);
    
    if(isCompleteBook){
        container.append(
            createbelumButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createsudahButton(),
            createTrashButton()
        );
    }

    return container;
}

function makeBookwithout(titleBook, authorBook, yearBook, isCompleteBook) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = titleBook;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = authorBook;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText =  yearBook;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("book_item");
    container.append(textContainer);
    
    if(isCompleteBook){
        container.append(
            createbelumButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createsudahButton(),
            createTrashButton()
        );
    }

    return container;
}

function createbelumButton() {
    return createButton("green", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    },"Belum selesai di Baca");
}

function createTrashButton() {
    return createButton("red", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    },"Hapus buku");
}

function createsudahButton() {
    return createButton("green", function(event){
        addTaskToCompleted(event.target.parentElement);
    },"Selesai dibaca");
}

function createButton(buttonTypeClass , eventListener , buttontext) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttontext;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function removeTaskFromCompleted(taskElement ) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);//menghapus index dengan lokasi yang sudah ditauin

    taskElement.remove();
    updateDataToStorage();
    alert("Buku yang dipilih sudah di hapus");
}

function undoTaskFromCompleted(taskElement ){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".book_item > .inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .inner >.author").innerText;
    const bookYear = taskElement.querySelector(".book_item > .inner > .year").innerText;

    const newBook = makeBookwithout(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}