$('#back_btn').click(function(){
 			window.history.go(-1);
 		});
 		var books = JSON.parse(localStorage.getItem('books'));
		var users = JSON.parse(localStorage.getItem('users'));
		var required_books = JSON.parse(localStorage.getItem('required_books'));
		var flag = JSON.parse(localStorage.getItem('flag'));
		var current_user = users[flag[0].user_cnt];
		var admin_flag = !flag[0].user_cnt;
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
				'<li><botton class=\"btn-link\"><a id = \"goto_lib\" href=\"books.html\">Library</a></botton></li>'+
				'<li><botton class=\"btn-link\"><a id = \"list_books\" href=\"index.html\">Homepage</a></botton></li>'+
				'<li><botton id = \"list_user\"  class=\"btn-link\" style=\"cursor:pointer;\">List all the users</botton></li>'+
				'<li><botton id = \"list_books\" class=\"btn-link\" style=\"cursor:pointer;\">List all the books</botton></li>'+
				'<li><botton class=\"btn-link\"><a id = \"add_book\" href=\"addBook.html\">Add new book</a></botton></li>'+
				'</ul><br/>');
			$('#content').append($admin_ul_head);
		}

		else{

			if(flag[0].user_flag)
			{
				$('#nav_login').hide();
				$('#nav_logout').show();
				$('#nav_logout').click(function(){
					flag[0].user_flag = 0;
					 localStorage.setItem('flag',JSON.stringify(flag));
					 location.reload();
				});

				var borrowed_books = current_user.borrow_books;
				$bookList_head = $('<h1 class = "text-info" style="text-align:center;font-style:italic;">Borrowed Books:</h1>')
				$('#content').append($bookList_head);

				if(borrowed_books.length==0){
					$('#content').append("<h1 style=\"text-align:center;font-style:italic;\">None</h1>");
					$('#content').append("<center><img src=\"img/sad.jpg\"></center>");
					$('#content').append("<h2 style=\"text-align:center;\">Go to the <a style=\"color:orange;\" href=\"books.html\">library</a> to borrow some books !</h2><br>");	
					
				}

				else{
					$borrowList = $("<table class=\"table table-hover\" id=\"table-content\" ></table>");
					$('#content').append($borrowList);
					$('#table-content').append("<tr id=\"t-head\"><td></td><td>Name</td><td>Catalog</td><td>Latest&nbsp;Return&nbsp;Date</td></tr>");
					$('#table-content').append("<tbody id=\"tbody-content\"></tbody>")
					

					for(var i=0;i<borrowed_books.length;i++)
					{
						if(borrowed_books[i].renewChance){
							book_i_borrowDate = new Date(borrowed_books[i].borrowDate);
							book_i_borrowDate.setMonth(book_i_borrowDate.getMonth()+1);
							borrowed_books[i].returnDate=book_i_borrowDate.getFullYear()+"-"+(book_i_borrowDate.getMonth()+1)+"-"+book_i_borrowDate.getDate();
							}
						$main_table_content = "<tr><td><button class = \"btn_return btn-warning\" >Return</button>&nbsp;&nbsp;<button class = \"btn_renew btn-default\">Renew</button></td>"+"<td>"+borrowed_books[i].title+"</td>"+"<td>"+borrowed_books[i].catalog+"</td>"+"<td>"+borrowed_books[i].returnDate+"</td>"+"</tr>";
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
								required_books[req_book_index].number++;
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
				$('#content').append("<h1 class=\"text-danger\" style=\"text-align:center;\">Hi , please <a href=\"login.html\">Login</a> First&nbsp;!</h1><br/>");
				$('#content').append("<center><img src=\"img/angry.png\"></center>");
			}
	}
