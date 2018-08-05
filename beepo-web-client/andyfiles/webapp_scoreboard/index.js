$(document).ready(function(){
	function addTable(){
		var td = "<tr> <td>";

		var td2 = "</td> <td> username </td>"  + "<td> score </td> </tr>";

		for(var i = 0; i < 10; i++)
		{
			$("#table").append(td + (i+1) + td2);
		}
	}
	addTable();

});