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
		required_books.sort(compare('issueDate'));
		required_books.reverse();
		localStorage.setItem('required_books',JSON.stringify(required_books));
		location.reload();
	});
	$('#chinese_books').click(function(){
			var c_array = new Array();
			var pattern = new RegExp("[\u4E00-\u9FA5]+");
			for(let i=0;i<required_books.length;i++){
				if(pattern.test(required_books[i].title)){
					c_array.push(required_books[i]);
				}
			}
			localStorage.setItem('required_books',JSON.stringify(c_array));
			location.reload();
		});
	$('#english_books').click(function(){
			var c_array = new Array();
			var pattern = new RegExp("[\u4E00-\u9FA5]+");
			for(let i=0;i<required_books.length;i++){
				if(pattern.test(required_books[i].title)){;}
					else{	
						c_array.push(required_books[i]);
					}

			}
			localStorage.setItem('required_books',JSON.stringify(c_array));
			location.reload();			
		});
	$('.catalog').click(function(){
		var required_catalog = $(this).attr('id');
		var c_array = new Array();
		for(var i=0;i<books.length;i++)
		{
			if(books[i].catalog == required_catalog){
				c_array.push(books[i]);
			}
		}

		localStorage.setItem('required_books',JSON.stringify(c_array));
			location.reload();			
	})

	if(!user_idetity_admin){
			if(required_books == null){
				document.getElementById("book_length").innerHTML = "There are "+"<b>"+books.length+"</b>"+" results";
				$('#div-content').append("<center><table class=\"table table-hover\" id=\"table-content\" ></table></center>");
		
				$('#table-content').append("<tbody id=\"tbody-content\"></tbody>");
				required_books = [];
				for(var i=0;i<books.length;i++){
					required_books.push(books[i]);
					$('#tbody-content').append("<tr>"+"<td style=\"width:1px!important;\">"+(i+1)+"."+
						"<span class=\"glyphicon glyphicon-book\"></span>"+"</td>"+
						"<td>"+
						"<a class=\"book_name_href\" href=\"#\">"+books[i].title+
					"</a>"+"<br>"+"<b>"+"Catalog"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].catalog+
					"<br>"+
					"<b>"+"Author"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].author+"<br>"+
					"<b>"+"ISBN"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].ISBN+"<br>"+
					"<b>"+"Issue date"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].issueDate+"<br>"+
					"<b>"+"Publisher"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].publisher+"<br>"+
					"<b>"+"Number"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					books[i].number+"<br>"+
					"<button class=\"btn-primary reader\" style=\"font-style:italic;\">Borrow</button>"+"</td>"+
					"</tr>");
						
					}
					localStorage.setItem('required_books',JSON.stringify(required_books));
			}
			else if(required_books.length>0){
				document.getElementById("book_length").innerHTML = "There are "+"<b>"+required_books.length+"</b>"+" results";
				$('#div-content').append("<center><table class=\"table table-hover\" id=\"reader_table-content\" ></table></center>");
		
				$('#reader_table-content').append("<tbody id=\"tbody-content\"></tbody>");
				for(var i=0;i<required_books.length;i++){
					$('#tbody-content').append(	"<tr>"+"<td style=\"width:1px!important;\">"+(i+1)+"."+
						"<span class=\"glyphicon glyphicon-book\"></span>"+"</td>"+
						"<td>"+
						"<a class=\"book_name_href\" href=\"#\">"+required_books[i].title+
					"</a>"+"<br>"+"<b>"+"Catalog"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].catalog+
					"<br>"+
					"<b>"+"Author"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].author+"<br>"+
					"<b>"+"ISBN"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].ISBN+"<br>"+
					"<b>"+"Issue date"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].issueDate+"<br>"+
					"<b>"+"Publisher"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					required_books[i].publisher+"<br>"+
					"<b>"+"Number"+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
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
		$('#book_length').hide();
		var book_name = $(this).text();
		var book_name_index = books.findIndex(x=>x.title == book_name);
		var current_book = books[book_name_index];
		$('.book_h').text(book_name);
		$('#container').hide();
		$button = $('<center><button class=\"btn-primary btn-lg back_btn\">back</button></center>');
		$("#book_inf").show();
		$("#book_inf").append("<div id=\"book_inf_container\"></div>");
		$("#book_inf_container").append("<br>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"Author: "+"</b>"+current_book.author+"</h3>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"Catalog: "+"</b>"+current_book.catalog+"</h3>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"Issue date: "+"</b>"+current_book.issueDate+"</h3>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"ISBN: "+"</b>"+current_book.ISBN+"</h3>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"Publisher: "+"</b>"+current_book.publisher+"</h3>");
		$("#book_inf_container").append("<h2 style=\"margin-left:4px;\">"+"<b>"+"Number of copies: "+"</b>"+current_book.number+"</h3>");
		$("#book_inf_container").append("<br>");
		$("#book_inf_container").append($button);
		$("#book_inf_container").append("<br>");
		$('.back_btn').click(function(){
			location.reload();
		})
			return false;
	});
