var Person = function(firstname, surname) {
	var firstname = firstname;
	var surname = surname;

	return {
		firstname: firstname,
		surname: surname
	}
}

var People = function() {
	var people = [];

	function firstNames() {
		return people.map(function(person) { return person.firstname }).join(', ');
	}

	function addPerson(person) {
		people.push(person);
	}

	return {
		addPerson: addPerson,
		firstNames: firstNames
	}
}

var tomer = new Person('Tomer', 'Peleg');
var dean = new Person('Dean', 'Ha');

var developers = new People();