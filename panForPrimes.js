var sieve = function(latestPrime, numCollection){
  var lastElement = numCollection[numCollection.length - 1];  // Last element in the array of numbers
  var firstComposite = Math.pow(latestPrime,2);               // Composites < n^2 have been eliminated already

  for (var i = 0; i <= lastElement; i += latestPrime){
    var indexOfNextComposite = numCollection.indexOf(firstComposite + i),
        indexOfLatestPrime = numCollection.indexOf(latestPrime);

    if (numCollection[indexOfNextComposite] !== undefined){   // Some numbers have been eliminated already, e.g. 6 is a multiple of both 2 and 3
      numCollection.splice(indexOfNextComposite,1);           // Remove this multiple of the last found prime
    }
  }

  if (latestPrime < highestPivot){                              // No need to proceed if latestPrime exceeds sqrt(numCollection.length)
    sieve(numCollection[indexOfLatestPrime+1], numCollection);  // Recurse using the next highest prime
  }
};

var createNumCollection = function(range){
  var collection = [];
  for (var i = 2; i <= range; i++) {
    collection.push(i);
  };
  return collection;
}

var panForPrimes = function(range){
  var numCollection = createNumCollection(range);
  highestPivot = Math.sqrt(numCollection.length);             // Global so we don't have to pass to sieve
  var start = new Date().getTime();

  sieve(2, numCollection)

  var elapsedTime = (new Date().getTime()) - start;
  console.log('Elapsed time in milliseconds',elapsedTime);    // Time taken to find the primes
  return numCollection;
}
