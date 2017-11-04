$(document).ready(function(){
	$('#btn_search').click(function(){
			var required_catalog = $('#_select').val();
			var books = JSON.parse(localStorage.getItem('books'));
			var required_message = $('#input_text').val();
			var required_catalog_books = new Array();
			var required_books = new Array();
			for(var i=0;i<books.length;i++)
			{
				if(books[i].catalog == required_catalog){
					required_catalog_books.push(books[i]);
				}
				if(required_catalog == "Catalog"){
					required_catalog_books.push(books[i]);
				}
			}



			for(var j=0;j<required_catalog_books.length;j++)
			{
				if(required_message && required_catalog_books[j].title.indexOf(required_message)>=0){
					required_books.push(required_catalog_books[j]);
				}
			}

			for(var j=0;j<required_catalog_books.length;j++)
			{
				if(required_catalog_books[j].author.indexOf(required_message)>=0){
					required_books.push(required_catalog_books[j]);
				}
			}

			localStorage.setItem('required_books',JSON.stringify(required_books));
		});
})
