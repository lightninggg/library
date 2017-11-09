var books = JSON.parse(localStorage.getItem('books'));
var users = JSON.parse(localStorage.getItem('users'));
var flag = JSON.parse(localStorage.getItem('flag'));
var required_books = JSON.parse(localStorage.getItem('required_books'));
var current_user = users[flag[0].user_cnt];
var user_idetity_admin = !flag[0].user_cnt;
if(localStorage.getItem('deleted_books') == null){
	var deleted_books = [];
	localStorage.setItem('deleted_books',JSON.stringify(deleted_books));
}
var deleted_books = JSON.parse(localStorage.getItem('deleted_books'));
/*$('.btn-primary').click(function(){

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

})*/
		if(!user_idetity_admin){
			if(flag[0].user_flag){
				for(let i=0;i<users[flag[0].user_cnt].borrow_books.length;i++){
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
					}
			}



$('.reader').click(function(){
	if(flag[0].user_flag){
		var borrowed_times = 3-current_user.borrow_cnt;
		var bookName = $(this).parent().find(">:first-child").text();
		function get_bookName(obj){
			return obj.title == bookName;
		}
		for(var i in books){
			
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
				// var req_book = required_books.find(get_bookName);
				var req_book_index = required_books.findIndex(x=>x.title==bookName);
				var date = new Date();
				required_books[req_book_index].number--;

				books[i].number--;
				current_user.borrow_books[borrowed_times] = books[i];
				current_user.borrow_books[borrowed_times].borrowDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
				current_user.borrow_cnt--;
				current_user.borrow_books[borrowed_times].renewChance = 1;
				alert('Borrow successfully !!');
				localStorage.setItem('books',JSON.stringify(books));
				localStorage.setItem('users',JSON.stringify(users));
				localStorage.setItem('required_books',JSON.stringify(required_books));
				location.reload();
				break;
			}
		}

	}

	else{
		alert("Please login first !");
	}

})

var change_book_index=-1;
var required_change_book_index=-1;
$('.admin_edit').click(function(){
	
	if($(this).attr('class')=='btn-warning save_changes'){
	//td_index = -1;
		var conf = confirm("Are U sure to save this change ？");
		if(conf)
		{	
			var td_index = -1;
			var input_value = new Array();
			$('.edit_text').each(function(){
					td_index++;
					input_value[td_index]=$(this).val();
			})

				books[change_book_index].title = input_value[0];
				books[change_book_index].catalog = input_value[1];
				books[change_book_index].author = input_value[2];
				books[change_book_index].number = input_value[3];

				required_books[required_change_book_index].title = input_value[0]; 
				required_books[required_change_book_index].catalog = input_value[1];
				required_books[required_change_book_index].author = input_value[2];
				required_books[required_change_book_index].number = input_value[3];

				td_index = -1;
				$(this).parent().siblings().each(function(){

					td_index++;
					$(this).html("<div>" + input_value[td_index] + "</div>");
			
				});

				$(this).children(':first-child').attr('class','glyphicon glyphicon-edit');
				$(this).removeClass();
				$(this).addClass('btn-primary admin_edit');

				localStorage.setItem('books',JSON.stringify(books));
				localStorage.setItem('required_books',JSON.stringify(required_books));
			}

			else{
				location.reload();
			}
	}

	else{	
		for(let book_index = 0;book_index<books.length;book_index++)
		{
			if(books[book_index].title == $(this).parent().next().text()){
				change_book_index = book_index;
				break;
			}
		}	

		for(let required_book_index = 0;required_book_index<books.length;required_book_index++)
		{
			if(required_books[required_book_index].title == $(this).parent().next().text()){
				required_change_book_index = required_book_index;
				break;
			}
		}

		$(this).children(':first-child').attr('class','glyphicon glyphicon-check');
		$(this).attr('class','btn-warning save_changes');
		// $(this).addClass('btn-warning save_changes');
		var text_value = new Array();
		var td_index;
		td_index = -1;
		$(this).parent().siblings().each(function(){
			td_index++;
			text_value[td_index] = $(this).text();
			$(this).html(`<input type=\"text\" class=\"edit_text\" style = \"text-align: center;\">`);
			// $(".edit_text").val(text_value);
		});
		td_index = -1;
		$('.edit_text').each(function(){
			td_index++;
			$(this).val(text_value[td_index]);
		})
	}
})

$('.admin_delete').click(function(){

	var conf_delete = confirm("Are U sure to delete this book ?");
	if(conf_delete){
		var delete_target_title = $(this).parent().next().text();
		var delete_target_index;
		for(let i=0;i<books.length;i++){
			if(books[i].title == delete_target_title){
				delete_target_index = i;
			}
		}
		books.splice(delete_target_index,1);

		var required_delete_target_index;
		for(let i=0;i<required_books.length;i++){
			if(required_books[i].title == delete_target_title){
				required_delete_target_index = i;
			}
		}
		deleted_books.push(required_books[required_delete_target_index]);
		required_books.splice(required_delete_target_index,1);
		localStorage.setItem('books',JSON.stringify(books));
		localStorage.setItem('required_books',JSON.stringify(required_books));
		localStorage.setItem('deleted_books',JSON.stringify(deleted_books));
		location.reload();
		
	}

	else{
		location.reload();
	}
});

