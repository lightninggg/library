var required_books = JSON.parse(localStorage.getItem('required_books'));
var books = JSON.parse(localStorage.getItem('books'));
var flag = JSON.parse(localStorage.getItem('flag'));
var user_idetity_admin = !flag[0].user_cnt;
	$div = $('<div id="div-content"></div>');
	$container = $('#container');
	$container.append($div);
	function compare(property){
	    return function(obj1,obj2){
	        var val1 = obj1[property];
	        var val2 = obj2[property];
	        return val1<val2 ? -1 : 1;
	    }
	}
	$('#list_all_books').click(function(){
		required_books = [];
		for(var i=0;i<books.length;i++){
				required_books.push(books[i]);	
		}
		localStorage.setItem('required_books',JSON.stringify(required_books));
		location.reload();
	});
	$('#sort_name').click(function() {
		required_books.sort(compare('title'));
		localStorage.setItem('required_books',JSON.stringify(required_books));
		location.reload();
	});
	$('#sort_issue_date').click(function() {
		required_books.sort(compare('issue_date'));
		localStorage.setItem('required_books',JSON.stringify(required_books));
		location.reload();
	});
	if(!user_idetity_admin){
			if(required_books == null){

				$('#div-content').append("<table class=\"table table-hover\" id=\"table-content\" ></table>");
		
				$('#table-content').append("<tbody id=\"tbody-content\"></tbody>");
				required_books = [];
				for(var i=0;i<books.length;i++){
					required_books.push(books[i]);
					$('#tbody-content').append(	"<tr>"+"<td style=\"width:1px!important;\">"+(i+1)+"."+
						"</td>"+
						"<td>"+
							"<a class=\"book_name_href\" href=\"#\">"+books[i].title+
						"</a>"+"<br>"+"<b>"+"catalog"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+books[i].catalog+
						"<br>"+
						"<b>"+"author"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
						books[i].author+"<br>"+
						"<b>"+"ISBN"+"</b>"+"<br>"+
						"<b>"+"Issue date"+"</b>"+"<br>"+
						"<b>"+"number"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
						books[i].number+"<br>"+
						"<button class=\"btn-primary reader\" style=\"font-style:italic;\">Borrow</button>"+"</td>"+
						"</tr>");
						
					}
					localStorage.setItem('required_books',JSON.stringify(required_books));
			}
			else if(required_books.length>0){
				$('#div-content').append("<center><table class=\"table table-hover\" id=\"reader_table-content\" ></table><center>");
		
				$('#reader_table-content').append("<tbody id=\"tbody-content\"></tbody>");
				for(var i=0;i<required_books.length;i++){
					$('#tbody-content').append(	"<tr>"+"<td style=\"width:1px!important;\">"+(i+1)+"."+
						"<span class=\"glyphicon glyphicon-book\"></span>"+"</td>"+
						"<td>"+
						"<a class=\"book_name_href\" href=\"#\">"+required_books[i].title+
					"</a>"+"<br>"+"<b>"+"catalog"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+required_books[i].catalog+
					"<br>"+
					"<b>"+"author"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].author+"<br>"+
					"<b>"+"ISBN"+"</b>"+"<br>"+
					"<b>"+"Issue date"+"</b>"+"<br>"+
					"<b>"+"number"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].number+"<br>"+
					"<button class=\"btn-primary reader\" style=\"font-style:italic;\">Borrow</button>"+"</td>"+
					"</tr>");
					}
			}

		else{
			$('#act_on_books').css('margin-top','70px');
			$warning_inf = $("<br><br><h1 id=\"warning_head\" class=\"text-warning\" style=\"text-align:center;\"><h1>");
			$('#div-content').append($warning_inf);
			$('#warning_head').append("&nbsp;&nbsp;Please input the right information and choose the right catalog!");
		}
	}

	else{
		$('#act_on_books').css('margin-top','0px');
		$('#add_newBook').show();
		if(required_books == null){
			$('#div-content').append("<table class=\"table table-hover\" id=\"admin_table-content\" ></table>");
			$('#admin_table-content').append("<tr class=\"admin_tr_th\"><td></td><td>Name</td><td>Catalog</td><td>Author</td><td>Number</td></tr>");
			$('#table-content').append("<tbody id=\"tbody-content\"></tbody>")
			for(var i=0;i<books.length;i++){
				$('#tbody-content').append(	"<tr class=\"admin_tr\">"+"<td><button class=\"btn-primary admin_edit\" style=\"font-style:italic;\">Edit</button>&nbsp;&nbsp;<button class=\"btn-danger admin_delete\" style=\"font-style:italic\">Delete</button></td>"+"<td class=\"text_inner\">"+books[i].title
				+"</td>"+"<td class=\"text_inner\">"+books[i].catalog+"</td>"+"<td class=\"text_inner\">"+books[i].author+"</td>"+"<td class=\"text_inner\">"+books[i].number+"</td>"+"</tr>");
					
				}
		}
		if(required_books.length>0){
			$('#div-content').append("<table class=\"table table-hover\" id=\"admin_table-content\" ></table>");
			$('#admin_table-content').append("<tr class=\"admin_tr_th\"><td></td><td>Name</td><td>Catalog</td><td>Author</td><td>Number</td></tr>");
			$('#admin_table-content').append("<tbody id=\"tbody-content\"></tbody>")
			for(var i=0;i<required_books.length;i++){
				$('#tbody-content').append(	"<tr class=\"admin_tr\">"+"<td><button class=\"btn-primary admin_edit\" style=\"font-style:italic;\"><span class=\"glyphicon glyphicon-edit\"></span></button>&nbsp;&nbsp;<button class=\"btn-danger admin_delete\" style=\"font-style:italic\"><span class=\"glyphicon glyphicon-trash\"></span></button></td>"+"<td>"+required_books[i].title
				+"</td>"+"<td>"+required_books[i].catalog+"</td>"+"<td>"+required_books[i].author+"</td>"+"<td class=\"text_inner\">"+required_books[i].number+"</td>"+"</tr>");
					
				}
		}
		else{
			$warning_inf = $("<br><br><h1 id=\"warning_head\" class=\"text-warning\" style=\"text-align:center;\"><h1>");
			$('#div-content').append($warning_inf);
			$('#warning_head').append("&nbsp;&nbsp;Please input the right information and choose the right catalog!");
		}

	}

	$('.book_name_href').click(function(){
		var book_name = $(this).text();
		var book_name_index = books.findIndex(x=>x.title == book_name);
		var current_book = books[book_name_index];
		$('.book_h').text(book_name);
		$('#container').hide();
		$button = $('<center><button class=\"btn-primary btn-lg back_btn\">back</button></center>');
		$("#book_inf").show();
		$("#book_inf").append("<br><br><br>");
		$("#book_inf").append("<div id=\"book_inf_container\"></div>");
		$("#book_inf_container").append("<br>");
		$("#book_inf_container").append("<h2 style=\"text-align:center;\">"+"<b>"+"Author: "+"</b>"+current_book.author+"</h3>");
		$("#book_inf_container").append("<h2 style=\"text-align:center;\">"+"<b>"+"Catalog: "+"</b>"+current_book.catalog+"</h3>");
		$("#book_inf_container").append("<h2 style=\"text-align:center;\">"+"<b>"+"Number of copies: "+"</b>"+current_book.number+"</h3>");
		$("#book_inf_container").append("<br>");
		$("#book_inf_container").append($button);
		$("#book_inf_container").append("<br>");
		$('.back_btn').click(function(){
			location.reload();
		})
			return false;
	});
