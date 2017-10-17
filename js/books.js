var book = new Array();
	
	book[0] = {
	catalog: "Science",
	author: "Teacher Guan",
	title: "Data Structure",
	number: 2
};

	book[1] = {
	catalog: "Novel",
	author: "lee",
	title: "A strange letter",
	number: 1
};

book[2] = {
	catalog: "Novel",
	author: "LuYao",
	title: "Normal World",
	number: 2
};

book[3] = {
	catalog: "History",
	author: "Robert Tombs",
	title: "The English and Their History ",
	number: 2
};

book[4] = {
	catalog: "History",
	author: "Song",
	title: "Chinese History",
	number: 2
};

book[5] = {
	catalog: "History",
	author: "Jane",
	title: "The World History",
	number: 2
};

book[6] = {
	catalog: "Tech",
	author: "Tarah",
	title: "Math in Tech",
	number: 2
};
book[7] = {
	catalog: "Novel",
	author: "Bram Stoker",
	title: "Dracula",
	number: 1
};
book[8] = {
	catalog: "Science",
	author: "Bill Bryson ",
	title: "A Brief History of Time",
	number: 2
};
book[9]={
	catalog: "History",
	author: "Mary Beard",
	title: "A History of Ancient Rome",
	number: 1
}
book[10]={
	catalog: "History",
	author: "Rachel Swaby",
	title: "Women Who Changed Science and the World",
	number: 1
}
book[11]={
	catalog: "History",
	author: "Lincoln Paine",
	title: "The Sea and Civilisation: A Maritime History of the World",
	number: 1
}
book[12]={
	catalog: "Novel",
	author: "Luff",
	title: "One Piece",
	number: 1
}
	var books = [];	
	for(var i=0;i<book.length;i++)
		books.push(book[i]);
	localStorage.setItem('books',JSON.stringify(books));