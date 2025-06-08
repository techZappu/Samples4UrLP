<script>
(function (w, doc,co) {
	// http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
	var u = {},
		e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = w.location.search.substring(1),
		v = '2.0.3';

	while (e = r.exec(q)) {
		u[d(e[1])] = d(e[2]);
	}
	
	if (!!u.jquery) {
		v = u.jquery;
	}	

	doc.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/'+v+'/jquery.min.js">' + "<" + '/' + 'script>');
	co.log('\nLoading jQuery v' + v + '\n');
})(window, document, console);
</script>

<!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script-->
<script src="../src/jquery.quicksearch.js"></script>
<script>
	$(function () {
		/*
		Example 1
		*/
		$('input#id_search').quicksearch('table#table_example tbody tr');
		
		/*
		Example 2 
		*/
		$('input#id_search2').quicksearch('table#table_example2 tbody tr', {
			'delay': 300,
			'selector': 'th',
			'stripeRows': ['odd', 'even'],
			'loader': 'span.loading',
			'bind': 'keyup click input',
			'show': function () {
				this.style.color = '';
			},
			'hide': function () {
				this.style.color = '#ccc';
			},
			'prepareQuery': function (val) {
				return new RegExp(val, "i");
			},
			'testQuery': function (query, txt, _row) {
				return query.test(txt);
			}
		});
		
		/*
		Example 3
		*/
		var qs = $('input#id_search_list').quicksearch('ul#list_example li');
		
		$.ajax({
			'url': 'example.json',
			'type': 'GET',
			'dataType': 'json',
			'success': function (data) {
				for (i in data['list_items']) {
					$('ul#list_example').append('<li>' + data['list_items'][i] + '</li>');
				}
				qs.cache();
			}
		});
		
		$('input#add_to_list').click(function () {
			$('ul#list_example').append('<li>Added on click</li>');
			qs.cache();
		});

		/*
		Example 4
		*/

		exampleFunction = function(){
			alert("This function is called when there is no results and you set the 'onNoResultFound' function.");
		}

		$('input#id_noResultFunction').quicksearch(
			'table#table_noResultFunction tbody tr',
			{'onNoResultFound': exampleFunction}
		);				
		
		$("#noResultSearch").quicksearch("#noResultList li", {
			noResults: "#noResultMessage"
		});

		/*
		Example 5
		*/
		$("#caseSensitiveSearch").quicksearch("#caseSensitiveList li", {
		  caseSensitive: true,
		  prepareQuery: function(val) {
			  return val;
		  }
		});
	});
</script>