 		var books = JSON.parse(localStorage.getItem('books'));
		var users = JSON.parse(localStorage.getItem('users'));
		var required_books = JSON.parse(localStorage.getItem('required_books'));
		var flag = JSON.parse(localStorage.getItem('flag'));
		var current_user = users[flag[0].user_cnt];
		var admin_flag = !flag[0].user_cnt;

		if(localStorage.getItem('deleted_books') == null){
			var deleted_books = [];
			localStorage.setItem('deleted_books',JSON.stringify(deleted_books));
		}
		var deleted_books = JSON.parse(localStorage.getItem('deleted_books'));

		$('#back_btn').click(function(){
		 			window.history.go(-1);
		 		});

		if(admin_flag){

			$('#nav_login').hide();
			$('#nav_logout').show();
			$('#nav_logout').click(function(){
				flag[0].user_flag = 0;
				flag[0].user_cnt = -1;
				 localStorage.setItem('flag',JSON.stringify(flag));
				 location.reload();
			});

			$admin_ul_head = $('<br/><ul class=\"admin_ul\">'+
				'<li><a id = \"goto_lib\" href=\"books.html\"><botton class=\"btn-link\">Library</botton></a></li>'+
				'<li><a id = \"list_books\" href=\"index.html\"><botton class=\"btn-link\">Homepage</botton></a></li>'+
				'<li><botton id = \"list_user\"  class=\"btn-link\" style=\"cursor:pointer;\">List all the users</botton></li>'+
				'<li><botton id = \"list_delete_books\" class=\"btn-link\" style=\"cursor:pointer;\">List deleted books</botton></li>'+
				'<li><a id = \"add_book\" href=\"addBook.html\"><botton class=\"btn-link\">Add new book</botton></a></li>'+
				'</ul><br/>');			
			$('#content').append($admin_ul_head);
			

			//list all the users
			$('#list_user').click(function(){
				$borrowList = $("<table class=\"table table-hover\" id=\"table-content\" ></table>");
				document.getElementById('up-arrow').click();
				$('#container_temp').show();
				$('#container_temp').empty();
				$('#container_temp').append($borrowList);
				$('#table-content').append("<tbody id=\"tbody-content\"></tbody>");
				
				var $u_info;
				for(var i=1;i<users.length;i++){
					$u_info = "<tr>"+"<td class=\"user_name\" style=\"width:1px!important;\" colspan=2>"
					+"<button class=\"btn-danger del_user\"><span class=\"glyphicon glyphicon-trash\"></span></button>";
					$u_info = $u_info+i+"."+"<span class=\"current_user_name\">"+users[i].name+"</span>"+"</td></tr>";
					for(var j=0;j<users[i].borrow_books.length;j++){
						if(!j)$u_info = $u_info+"<tr><td><b>Borrowed books:</b></td><td><b>Due date:</b></td></tr>";
						$u_info = $u_info + "<tr>";
						$u_info = $u_info +"<td>";
						$u_info = $u_info + users[i].borrow_books[j].title;
						$u_info = $u_info + "</td>";
						$u_info = $u_info + "<td>"
						$u_info = $u_info + users[i].borrow_books[j].returnDate;
						$u_info = $u_info + "</td></tr>";
					}
						$('#tbody-content').append($u_info);
				}
			//delete user
			$('.del_user').click(function(){
				var current_user_name = $(this).siblings('.current_user_name').text();
				var conf = confirm("Are U sure to delete this user ?");
				if(conf){
					var id = users.findIndex(x=>x.name == current_user_name);
					users.splice(id,1);
					alert("Delete successfully !");
					document.getElementById('up-arrow').click();
					localStorage.setItem('users',JSON.stringify(users));
				}
				else{
					return false;
				}

			});

			})


			$('#list_delete_books').click(function(){
				document.getElementById('up-arrow').click();
				$('#container_temp').show();
				$('#container_temp').append("<table class=\"table table-hover\" id=\"table-content\" ></table>");
				
			for(var i=0;i<deleted_books.length;i++){
				if(i==0){
					$('#table-content').append("<tr class=\"admin_tr_th\"><td></td><td>Name</td><td>Catalog</td><td>Author</td><td>Number</td></tr>");
					$('#table-content').append("<tbody id=\"tbody-content\"></tbody>")
				}
				$('#tbody-content').append(	"<tr>"+"<td><button class=\"btn-success restore_book\"><span class=\"glyphicon glyphicon-retweet\"></span></button><button class=\"btn-danger del_book\" style=\"font-style:italic\"><span class=\"glyphicon glyphicon-trash\"></span></button></td>"+"<td class=\"del_book_name\">"+deleted_books[i].title
				+"</td>"+"<td>"+deleted_books[i].catalog+"</td>"+"<td>"+deleted_books[i].author+"</td>"+"<td class=\"text_inner\">"+deleted_books[i].number+"</td>"+"</tr>");
					
				}

				$('.restore_book').click(function(){
					var current_book_name = $(this).parent().siblings('.del_book_name').text();
					var conf = confirm("Are U sure to restore this book ?");
					if(conf){
						var id = deleted_books.findIndex(x=>x.title == current_book_name);
						books.push(deleted_books[id]);
						deleted_books.splice(id,1);
						alert("Restore successfully !");
						document.getElementById('up-arrow').click();
						localStorage.setItem('deleted_books',JSON.stringify(deleted_books));
						localStorage.setItem('books',JSON.stringify(books));
					}
					else{
						return false;
					}
					});

				$('.del_book').click(function(){
					var current_book_name = $(this).parent().siblings('.del_book_name').text();
					var conf = confirm("Are U sure to delete this book completely ?");
					if(conf){
						var id = deleted_books.findIndex(x=>x.title == current_book_name);
						deleted_books.splice(id,1);
						alert("Delete successfully !");
						document.getElementById('up-arrow').click();
						localStorage.setItem('deleted_books',JSON.stringify(deleted_books));
					}
					else{
						return false;
					}

				});
			})


		}

		else{

			if(flag[0].user_flag)
			{
					for(let i=0;i<users[flag[0].user_cnt].borrow_books.length;i++)
					{
						var u_date = new Date(users[flag[0].user_cnt].borrow_books[i].returnDate);
						var day = parseInt(parseInt(new Date() - u_date) / 1000 / 60/60/24);
						if(day>0){
							users[flag[0].user_cnt].borrow_books[i].cost = day*0.1;
						}
						else{
							users[flag[0].user_cnt].borrow_books[i].cost = 0;
						}
					}
					localStorage.setItem('users',JSON.stringify(users));
				var t = 0;
				(function(){
					for(let i =0;i<users[flag[0].user_cnt].borrow_books.length;i++)
					{	if(users[flag[0].user_cnt].borrow_books[i].cost){
							alert("Please pay the bill fist !");
							t = 1;
							break;
						}
					}
				})();
					if(t)	
					{
						
						window.location.href="payment.html";
					}
				$('#nav_login').hide();
				$('#nav_logout').show();
				$('#nav_logout').click(function(){
					flag[0].user_flag = 0;
					 localStorage.setItem('flag',JSON.stringify(flag));
					 location.reload();
				});

				var borrowed_books = current_user.borrow_books;
				$bookList_head = $('<h1 class = "text-muted" style="text-align:center;"><b>Borrowed Books:</b></h1>');
				$('#content').append($bookList_head);

				if(borrowed_books.length==0){
					$('#content').append("<h1 style=\"text-align:center;\"><b>None</b></h1>");
					$('#content').append("<center><img src=\"img/sad.jpg\"></center>");
					$('#content').append("<h2 style=\"text-align:center;\">Go to the <a style=\"color:orange;\" href=\"books.html\">library</a> to borrow some books !</h2>");	
					
				}

				else{
					$borrowList = $("<table class=\"table table-hover\" id=\"table-content\" ></table>");
					$('#content').append($borrowList);
					$('#table-content').append("<tr id=\"t-head\"><td></td><td>Name</td><td>Catalog</td><td>&nbsp;&nbsp;Due&nbsp;Date&nbsp;</td></tr>");
					$('#table-content').append("<tbody id=\"tbody-content\"></tbody>");
					

					for(var i=0;i<borrowed_books.length;i++)
					{
						if(borrowed_books[i].renewChance){
							book_i_borrowDate = new Date(borrowed_books[i].borrowDate);
							book_i_borrowDate.setMonth(book_i_borrowDate.getMonth()+1);
							borrowed_books[i].returnDate=book_i_borrowDate.getFullYear()+"-"+(book_i_borrowDate.getMonth()+1)+"-"+book_i_borrowDate.getDate();
							}
						$main_table_content = "<tr class=\"borrow_tr\"><td><button class = \"btn_return btn-warning\" >Return</button><button class = \"btn_renew btn-default\">Renew</button></td>"+"<td>"+borrowed_books[i].title+"</td>"+"<td>"+borrowed_books[i].catalog+"</td>"+"<td>"+borrowed_books[i].returnDate+"</td>"+"</tr>";
					$('#tbody-content').append($main_table_content);
				}

					$('.btn_renew').click(function(){
							
							
							var renew_book=$(this).parent().next().text();
							/*alert(renew_book);*/
							for(var i=0;i<borrowed_books.length;i++){
								if(renew_book == borrowed_books[i].title){
								if(borrowed_books[i].renewChance){

											var renewBook_date = new Date(borrowed_books[i].returnDate);
										
											renewBook_date.setMonth((renewBook_date.getMonth()+1));

											borrowed_books[i].returnDate=renewBook_date.getFullYear()+"-"+(renewBook_date.getMonth()+1)+"-"+renewBook_date.getDate();

											/*alert(borrowed_books[i].returnDate);*/

												$(this).parent().next().next().next().text(borrowed_books[i].returnDate);

												/*alert($(this).parent().next().next().next().text());*/
											alert("Renew successfully !!");
											borrowed_books[i].renewChance = 0;

									}
									else
										{
											alert("U can renew the same book only once !");
										}
								}
							}	
						localStorage.setItem('users',JSON.stringify(users));
					})

					localStorage.setItem('users',JSON.stringify(users));

					$('.btn_return').click(function(){
						var return_book = $(this).parent().next().text();
						/*alert($(this).parent().next().text());*/
						for(i in borrowed_books)
						{
							if( return_book == borrowed_books[i].title)
							{
								{
									for(var j=0;j<books.length;j++)
										{
											if(books[j].title ==  borrowed_books[i].title)
											{
												books[j].number++;
												break;
											}
										}
								}
								var req_book_index = required_books.findIndex(x=>x.title == return_book);
								if(req_book_index>=0)
								{	required_books[req_book_index].number++;
								}
									current_user.borrow_cnt++;
									borrowed_books.splice(i,1);
								break;
							}
						}

						//Refresh page
						location.reload();
						
						alert("Return successfully !!");

						localStorage.setItem('books',JSON.stringify(books));
						localStorage.setItem('users',JSON.stringify(users));
						localStorage.setItem('required_books',JSON.stringify(required_books));

					})

				}	

			}

			else{
				$('#nav_login').show();
				$('#nav_logout').hide();
				$('#container').css('top','35%');
				$('#container').css('background-color','rgba(0,0,0,0.03)');
				$('#content').append("<h1 class=\"text-danger\" style=\"text-align:center;color:red;\">Hi , please <a href=\"login.html\"><button class=\"btn-link\">Login</button></a> First&nbsp;!</h1><br/>");
				$('#content').append("<center><img src=\"img/angry.png\"></center>");
			}
	}
