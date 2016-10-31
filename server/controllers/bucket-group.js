exports.view = function(req, res){
  res.render('home', {
    "bucket": [{
      "title": "Group 1",
      "link": "app.html",
      "members": ["christy", "joey"]
    },
    {
      "title": "Group 2",
      "link": "app.html",
      "members": ["daniel"]
    },
    {
      "title": "Group 3",
      "link": "app.html",
      "members": ["a", "b", "c"]
    },
    {
      "title": "Group 4",
      "link": "app.html",
      "members": ["a", "b"]
    }]
  });
};
