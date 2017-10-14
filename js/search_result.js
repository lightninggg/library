var required_books = JSON.parse(localStorage.getItem('required_books'));

$div = $('<div id="div-content"></div>');
	$container = $('#container');
	$container.append($div);
	if(required_books.length>0){
		$('#div-content').append("<table class=\"table table-hover\" id=\"table-content\" ></table>");
		$('#table-content').append("<tr id=\"t-head\"><td></td><td>Name</td><td>Catalog</td><td>Author</td></tr>");
		$('#table-content').append("<tbody id=\"tbody-content\"></tbody>")
		for(var i=0;i<required_books.length;i++){
			$('#tbody-content').append(	"<tr>"+"<td><button class=\"btn-primary\" style=\"font-style:italic;\">Borrow</button></td>"+"<td>"+required_books[i].title
			+"</td>"+"<td>"+required_books[i].catalog+"</td>"+"<td>"+required_books[i].author+"</td>"+"</tr>");
				
			}
	}
	else{
		$warning_inf = $("<br><br><h1 id=\"warning_head\" class=\"text-warning\" style=\"text-align:center;\"><h1>");
		$('#div-content').append($warning_inf);
		$('#warning_head').text("Please input the right information and choose the right catalog!");
	}