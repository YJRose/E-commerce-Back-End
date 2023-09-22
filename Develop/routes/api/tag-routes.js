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
    id: res.body.id,
    tag_name: res.body.tag_name
  }).then((newTag) => {
    res.json(newTag);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id).then((tagData) => {
    res.json(tagData);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destory({
    where: {
      id: req.body.id,
    },
  })
});

module.exports = router;
