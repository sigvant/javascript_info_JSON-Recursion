// Turn the object into JSON and back
// importance: 5
// Turn the user into JSON and then read it back into another variable.

let user = {
	name: "John Smith",
	age:35
};

let json = JSON.stringify(user);

let reJson = JSON.parse(json)

console.log(reJson)

// Exclude backreferences
// importance: 5
// In simple cases of circular references, we can exclude an offending property 
// from serialization by its name.

// But sometimes we can’t just use the name, as it may be used both in circular 
// references and normal properties. So we can check the property by its value.

// Write replacer function to stringify everything, but remove properties 
// that reference meetup:


let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
	return (key != '' && value == meetup) ? undefined : value;
	// if key is not empty string AND value is meetup, return undefined otherwise return the value
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// here we also need to test key=='' to exclude the first call where it is normal that value
// is meetup -> 'first call for JSON stringify is somewhat like '':meetup when stringifiying the 
// meetup object

// ##########################################################################################

// Sum all numbers till the given one
// importance: 5
// Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

// For instance:

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 +2 + 1 = 10
.
.
.
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

// Make 3 solution variants:

// Using a for loop.
// Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
// Using the arithmetic progression formula.
// An example of the result:

function sumTo(n) { /*... your code ... */ }

alert( sumTo(100) ); // 5050

// P.S. Which solution variant is the fastest? The slowest? Why?

// P.P.S. Can we use recursion to count sumTo(100000)?

// ## Attempt at Solution

function sumToLoop(n) {
	let sum = 0;
	for (let i = 0; i <= n; i++) {
		sum = sum + i;
	} 

	return sum;
}

function sumToRecursion(n) {
	if(n == 1) {
		return 1;
	} else {
		return n + sumToRecursion(n-1);
	}
}

function sumToEquation(n) {
	return n * (n + 1) / 2;
}

// naturally the formula is the fastest solution. It uses only 3 operations for any
// number b. The math helps! The loop variant is the second in terms of speed. In both the
// recursive and the loop variant we sum the same numbers. But the recursion involves
// nested calls and execution stack management. That also takes resources, so it's slower.


// some engines support the 'tail call' optimization: if a recursive call is the very
// last one in the function (like in sumTo above), then the outer function will not need
// to resume the execution, so the engine doesn't need to remember its execution context.
// that removes the burden on memory, so counting sumTo(100000) becomes possible. But if 
// the JavaScript engine does not support tail call optimization (most of them don't)
// there will be an error: maximum stack size exceeded, because ther's usually a limitation
// on the total stack size.

// ##########################################################################################

// Calculate factorial
// importance: 4
// The factorial of a natural number is a number multiplied by "number minus one", 
// then by "number minus two", and so on till 1. The factorial of n is denoted as n!

// We can write a definition of factorial like this:

n! = n * (n - 1) * (n - 2) * ...*1

// Values of factorials for different n:

1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120

// The task is to write a function factorial(n) that calculates n! using recursive calls.

alert( factorial(5) ); // 120

// P.S. Hint: n! can be written as n * (n-1)! For instance: 3! = 3*2! = 3*2*1! = 6

function factorial(n) {
	let fact = 1;
	if(n == 0) return 1;
	else if (n == 1) return 1;
	else {
		return n * factorial(n-1);
	}
}

// ## alternatively

function factorial(n) {
	return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120

// ## if we want to add the 0 to the formula we can

function factorial(n) {
	return n ? n * factorial(n - 1) : 1;
	// trick here is, n == 0 is false when compared.
}

// ##########################################################################################

// Fibonacci numbers
// importance: 5
// The sequence of Fibonacci numbers has the formula Fn = Fn-1 + Fn-2. In other words, 
// the next number is a sum of the two preceding ones.

// First two numbers are 1, then 2(1+1), then 3(1+2), 5(2+3) 
// and so on: 1, 1, 2, 3, 5, 8, 13, 21....

// Fibonacci numbers are related to the Golden ratio and many natural phenomena around us.

// Write a function fib(n) that returns the n-th Fibonacci number.

// An example of work:

function fib(n) {
	return n <= 1 ? n : (fib(n-1) + fib(n-2));
}

// the full code:

function fib(n) {
	let a = 1;
	let b = 1;
	for (let i = 3; i <= n; i++) {
		let c = a + b;
		a = b;
		b = c;
		// the trick here is we get all the values calculated and 'shift' them
		// to the variable before, building the sum up - we return b because it
		// holds the final value
	}
	return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 

// it returns the nth number of the fibbo order

// ########################################################################################

// Output a single-linked list
// importance: 5
// Let’s say we have a single-linked list (as described in the chapter Recursion and stack):

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// write a function printList(list) that outputs lists items one-by-one.
// make two variants of the slution: using a loop and using recursion.

// What's better? with recursion or without it?

// ## LOOP BASED SOLUTION

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next; // passes the value of next into temp, at the end of the list
    // the value of next will be null, making the while (false), stopping the alert
    // this is interesting.
  }

}

printList(list);

// can be rewrote like this as well:

function printList(list) {

  while(list) {
    alert(list.value);
    list = list.next;
  }

}

printList(list);

// instead of the temporary value tmp to walk over the list. Technically, we could
// use a function parameter list instead:

// .. But that would be unwise. In the future we may need to extend a function, do something
// else with the list. If we change list, then we lose such ability. talking about good variable
// names, list here is the list itself. 

// The first element of it. And it should remain like that. that's clear and and reliable.
// From the other side, the role of tmp is exclusively a list traversal, like i in the for loop.

// recursive solution - the recursive variant of printList(list) follows a simple logic: to
// output a list we should output the current element list, then do the same for list.next:

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

	alert(list.value); // output the current item

	if (list.next) {
		printList(list.next); // do the same for the rest of the list
	}
}

printList(list); // this solution is actually quite smart

// Now what’s better?

// Technically, the loop is more effective. These two variants do the same, but the 
// oop does not spend resources for nested function calls.

// From the other side, the recursive variant is shorter and sometimes easier to understand.

// ########################################################################################

// Output a single-linked list in the reverse order
// importance: 5
// Output a single-linked list from the previous task Output a single-linked list in the reverse order.

// Make two solutions: using a loop and using a recursion.

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// Using a recursion here is a little bit tricky here. We need to first output the
// rest of the list and then output the current one:

function printReverseList(list) {

	if (list.next) {
		printReverseList(list.next);
	}

	alert(list.value);
}

printReverseList(list);

// what it means? well, they check next until it finds null. when it does, it alerts.
// the it goes backwards alerting the list

// Using a loop

// the loop variant is also a little bit more complicated then the direct output. there is
// no way to get the last value in our list. We also can't 'go back'.

// so what we can do is to first go through the items in the direct order and remember them
// in an array, and then output what we remembered in the reverse order:

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
	let arr = [];
	let tmp = list;

	while (tmp) {
		arr.push(tmp.value);
		tmp = tmp.next;
		// until next is null, temporary reads the null at the end.
		// so the while becomes false
	}

	for (let i = arr.length - 1; i >= 0; i--) {
		alert( arr[i] );
	}
}

printReverseList(list);

// Please note that the recursive solution actually does exactly the same: it follows the list, 
// remembers the items in the chain of nested calls (in the execution context stack), and then outputs them.

