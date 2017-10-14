$('#back_btn').click(function(){
 			window.history.go(-1);
 		});
 		var books = JSON.parse(localStorage.getItem('books'));
		var users = JSON.parse(localStorage.getItem('users'));
		var flag = JSON.parse(localStorage.getItem('flag'));
		var current_user = users[flag[0].user_cnt];
		if(flag[0].user_flag)
		{
			var borrowed_books = current_user.borrow_books;
			$bookList_head = $('<h1 class = "text-info" style="text-align:center;font-style:italic;">Borrowed Books:</h1>')
			$('#content').append($bookList_head);

			if(borrowed_books.length==0){
				$('#content').append("<h1 style=\"text-align:center;\">None</h1><br/>");	
				
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
					/*alert($(this).parent().next().text());*/
					for(var i=0;i<borrowed_books.length;i++)
					{
						if($(this).parent().next().text() == borrowed_books[i].title)
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

				})

			}	

		}
		else{
			
			$('#content').append("<h1 class=\"text-danger\" style=\"text-align:center;\">Hello, please Login First&nbsp;!</h1><br/>");
		}
