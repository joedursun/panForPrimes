var sieve = function(latestPrime, numCollection){
  var lastElement = numCollection[numCollection.length - 1],  // Last element in the array of numbers
      firstComposite = Math.pow(latestPrime,2),               // Composites < n^2 have been eliminated already
      increment = 2 * latestPrime;

  for (var i = 0; i <= lastElement; i += increment){
    var indexOfNextComposite = numCollection.indexOf(firstComposite + i),
        indexOfLatestPrime = numCollection.indexOf(latestPrime);

    if (numCollection[indexOfNextComposite] !== undefined){   // Some numbers have been eliminated already, e.g. 15 is a multiple of both 3 and 5
      numCollection.splice(indexOfNextComposite,1);           // Remove this multiple of the last found prime
    }
  }

  if (latestPrime < highestPivot){                              // No need to proceed if latestPrime exceeds sqrt(numCollection.length)
    sieve(numCollection[indexOfLatestPrime+1], numCollection);  // Recurse using the next highest prime
  }
};

var removeEvens = function(numCollection){
  var endPoint = 1 + numCollection.length / 2;
  for (var i = 2; i <= endPoint; i += 1){ numCollection.splice(i,1); } // Start with 4
}

var createNumCollection = function(range){
  var collection = [];
  for (var i = 2; i <= range; i++) { collection.push(i); }
  return collection;
}

var panForPrimes = function(range){
  var numCollection = createNumCollection(range),
      start = new Date().getTime();
  highestPivot = Math.sqrt(numCollection.length);             // Global so we don't have to pass to sieve

  removeEvens(numCollection);                                 // Evens are a special case; for odd primes we can remove every other multiple from the collection
  sieve(3, numCollection);

  var elapsedTime = (new Date().getTime()) - start;
  console.log('Elapsed time in milliseconds',elapsedTime);    // Time taken to find the primes
  return numCollection;
}

// require('fs').writeFile('primes.txt', panForPrimes(50));      // For those using node
