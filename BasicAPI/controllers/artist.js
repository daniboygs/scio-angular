var Artist = require('../models/artist');

exports.getArtists = (req, res, next) => {

    Artist.find((err, artists) => {

        if (err){
            res.send(err);
        }

        return res.status(200).send(artists);

    });

}

exports.createArtist = (req, res, next) => {

    var name = req.body.name;
    var images = req.body.images;
    var genres = req.body.genres;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    var artist = new Artist({
      name: name,
      images: images,
      genres: genres,
      identifier: toLowerCase(removeWhiteSpace(removeSpecialCharecters(name)))
    });

    Artist.findOne({identifier:artist.identifier}, (err, _artist) => {
      if(err){
        return next(err);
      }

      if(_artist){
        return res.status(409).send({error: 'That artist is already in our records'});
      }

      artist.save((err, artist) => {

            if(err){
                return next(err);
            }

            return res.status(200).json({
              message: "Artist successfully added!",
              artist: artist
            });

        });

    });

}

exports.getArtistByIdentifier = (req, res, next) => {

    var identifier = req.params.identifier;

    if(!identifier){
        return res.status(400).send({error: 'You must enter an identifier'});
    }

    Artist.findOne({identifier:identifier}, (err, artist) => {

        if(err){
            return next(err);
        }

        if(!artist || artist == null){
          return res.status(404).json({
            error: "Artist not found"
          });
        }

        return res.status(200).json({
          artist: artist
        });

    });
}

exports.deleteArtist = (req, res, next) => {

    Artist.remove({
        _id : req.params.artist_id
    }, function(err, artist) {
        res.json(artist);
    });

}

exports.deleteAll = (req, res, next) => {

  Artist.remove({}, (err) => {
    if(err){
      return next(err);
    }

    return res.status(200).json({
      message: "Success"
    });

  });

}

exports.updateArtist = (req, res) => {
  Artist.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, _artist) => {
      if (err)
          res.send(err);
      res.status(200).json({
        result: true
      });
  });
};


function removeSpecialCharecters(string){
  return string.replace(/[^\w\s]/gi, '');
}

function removeWhiteSpace(string){
  return string.replace(/ /g,'');
}

function toLowerCase(string){
  return string.toLowerCase();
}
