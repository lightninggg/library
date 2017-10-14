var books = JSON.parse(localStorage.getItem('books'));
var users = JSON.parse(localStorage.getItem('users'));
var flag = JSON.parse(localStorage.getItem('flag'));
var current_user = users[flag[0].user_cnt];
$('.btn-primary').click(function(){

	if(flag[0].user_flag){
		var borrowed_times = 3-current_user.borrow_cnt;
		var bookName = $(this).parent().next().text();
		for(var i=0;i<books.length;i++){
			
			if(bookName == books[i].title){
				if(books[i].number==0){
					alert("Out Of stock !!");
					break;
				}
				if(current_user.borrow_cnt==0){
					alert("U've borrowed 3 books !!");
					break;
				}

				{

					for(var j=0;j<borrowed_times;j++)
					{
						if(current_user.borrow_books[j].title == bookName)
						{
							alert("U've borrowed this book before !!");

							return false;
						}
					}
				}

				books[i].number--;
				current_user.borrow_books[borrowed_times] = books[i];
				current_user.borrow_books[borrowed_times].borrowDate = new Date();
				current_user.borrow_cnt--;
				current_user.borrow_books[borrowed_times].renewChance = 1;
				alert('Borrow successfully !!');
				localStorage.setItem('books',JSON.stringify(books));
				localStorage.setItem('users',JSON.stringify(users));
				break;
			}
		}

	}

	else{
		alert("Please login first !");
	}

})