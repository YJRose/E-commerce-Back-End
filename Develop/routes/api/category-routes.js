const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then((categoryData) => {
    res.json(categoryData);
  });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Product]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);
    res.json(categoriesData);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update(req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.json(categoriesData);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
