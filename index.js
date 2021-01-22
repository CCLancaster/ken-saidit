// A joke is 
// {
    // joke: String,
    // votes: Number (defaults to 0),
// }

const jokesCollection = firebase.database().ref('jokes');

// CREATE
$('#joke-form').on('submit', function (event) {
    event.preventDefault();
    // Test that the button is working
    //console.log("Hello");

    const jokeText = $('#joke').val();

    if(jokeText.trim() !== '') {
        // Add Joke to Database
        jokesCollection.push({
            joke: jokeText.trim(),
            votes: 0,
        })

        // Clear Text
        $('#joke').val('');
    }
});

// READ
jokesCollection.on('value', function (results) {
    const $jokesBoard = $('.jokes-board');

    $jokesBoard.empty();
    results.forEach(function (result) {
        // Let's see what we're getting:
        //console.log(result.val());
        
        // this line...
        const {joke, votes} = result.val()
        
        // is the same as these two ...
       // const joke = result.val().joke;
       // const votes = result.val().votes;


        const key = result.key;

        const $li = $('<li>').attr('data-joke-id', key).text(joke);
        const $right = $('<div>').addClass('right').text('Votes: ' + votes);

        const $upvote = $('<a>').attr('href', '#').addClass('upvote').text('+');
        const $downvote = $('<a>').attr('href', '#').addClass('downvote').text('-');

        const $remove = $('<a>').attr('href', '#').addClass('remove').text('-');

        $right.prepend($downvote);
        $right.append($upvote);

        $li.append($right)
        $jokesBoard.append($li);
    })
});

// lets make the upvote <a> do something...
$('.jokes-board').on('click', 'a.upvote', function(event) {
    event.preventDefault();

    const key = $(event.target).closest('li').attr('data-joke-id');
    //console.log(key) 
    
    const jokeVotes = jokesCollection.child(key).child('votes');

    //transactions come from databases and is specific to firebase in this case
    jokeVotes.transaction(function (votes) {
        return votes + 1;
    })
})

// lets make the downvote <a> do something...
$('.jokes-board').on('click', 'a.upvote', function(event) {
    event.preventDefault();

    const key = $(event.target).closest('li').attr('data-joke-id');
    //console.log(key) 

    const jokeVotes = jokesCollection.child(key).child('votes');

    jokeVotes.transaction(function (votes) {
        if (votes === 0) {
            return votes;
        }
        return votes - 1;
    })
});

// DELETE
$('.jokes-board').on('click', 'a.remove', function(event) {
    event.preventDefault();

    const key = $(event.target).closest('li').attr('data-joke-id');
    const jokeObj = jokesCollection.child()

    jokeObj.remove();
})

/// to edit later
// // A joke is
// // {
// //    joke: String,
// //    votes: Number (defaults to 0)
// // }
// ​
// const jokesCollection = firebase.database().ref('jokes');
// ​
// // Create
// $('#joke-form').on('submit', function (event) {
//   event.preventDefault();
  
//   const jokeText = $('#joke').val();
// ​
//   if (jokeText.trim() !== '') {
//     // Add Joke to Database
//     jokesCollection.push({
//       joke: jokeText.trim(),
//       votes: 0,
//     });
// ​
//     // Clear Text
//     $('#joke').val('');
//   }
// });
// ​
// // Read
// jokesCollection.on('value', function (results) {
//   const $jokesBoard = $('.jokes-board');
//   $jokesBoard.empty();
// ​
//   const list = [];
//   results.forEach(function (result) {
//     const { joke, votes } = result.val();
//     const key = result.key;
// ​
//     list.push({
//       joke: joke,
//       votes: votes,
//       key: key
//     });
//   });
// ​
//   list.sort(function (a, b) {
//     return b.votes - a.votes;
//   });
// ​
//   list.forEach(function (result) {
//     const { key, joke, votes } = result;
//     // const joke = result.val().joke;
//     // const votes = result.val().votes;
//     // const key = result.key;
//     const $li = $('<li>').attr('data-joke-id', key).text(joke);
//     const $right = $('<div>').addClass('right').text('Votes: ' + votes);
//     const $upvote = $('<a>').attr('href', '#').addClass('upvote').text('+');
//     const $downvote = $('<a>').attr('href', '#').addClass('downvote').text('-');
//     const $remove = $('<a>').attr('href', '#').addClass('remove').text('remove');
// ​
//     $right.prepend($downvote);
//     $right.append($upvote);
//     $right.append($remove);
//     $li.append($right);
//     $jokesBoard.append($li);
//   })
// })
// ​
// // Update
// $('.jokes-board').on('click', 'a.upvote', function(event) {
//   event.preventDefault();
// ​
//   const key = $(event.target).closest('li').attr('data-joke-id');
//   const jokeVotes = jokesCollection.child(key).child('votes');
// ​
//   jokeVotes.transaction(function (votes) {
//     return votes + 1;
//   });
// })
// ​
// $('.jokes-board').on('click', 'a.downvote', function(event) {
//   event.preventDefault();
// ​
//   const key = $(event.target).closest('li').attr('data-joke-id');
//   const jokeVotes = jokesCollection.child(key).child('votes');
// ​
//   jokeVotes.transaction(function (votes) {
//     if (votes === 0) {
//       return votes;
//     }
// ​
//     return votes - 1;
//   });
// })
// ​
// // Delete
// $('.jokes-board').on('click', 'a.remove', function(event) {
//   event.preventDefault();
  
//   const key = $(event.target).closest('li').attr('data-joke-id');
//   const jokeObj = jokesCollection.child(key);
// ​
//   jokeObj.remove();
// });