$('#back_button').click(function(){
	window.history.go(-1);
})
$('#save_button').click(function(){
	var books = JSON.parse(localStorage.getItem('books'));
	if($('#bookname').val() == ""||$('#authorname').val()== ""||$('#ISBN').val()== ""||$('#issuedate').val()== ""||($('#num').val()<=0)){
		alert("Please add this book correctly !!");
		return false;
	}
	else{
		alert("Add book successfully!");
		var new_book = new Object();
		new_book.title = $('#bookname').val();
		new_book.catalog = $('#catalog').val();
		new_book.author = $('#authorname').val();
		new_book.number = $('#num').val();
		books.push(new_book);
		localStorage.setItem('books',JSON.stringify(books));
		window.history.go(-1);
	}
})