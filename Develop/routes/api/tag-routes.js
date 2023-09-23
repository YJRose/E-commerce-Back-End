const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({include:[Product]}).then((tagData) => {
    res.json(tagData);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {include:[Product]}).then((tagData) => {
    res.json(tagData);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  }).then((newTag) => {
    res.json(newTag);
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.json(tagData);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedtag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedtag) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(deletedtag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
