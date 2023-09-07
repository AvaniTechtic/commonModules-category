const express = require("express");
const router = express.Router();
const CategoryModel = require("../Models/categoryModel");

router.post("/insertCategory", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
        Category_name: body.Category_name
    };
    const data = await CategoryModel.find({Category_name: body.Category_name});
    if (data.length > 0) {
      res
        .status(409)
        .json({ error: "Data is already exists with the same Category name" });
    } else {
      await CategoryModel.create(payload)
        .then((savedUser) => {
          // Handle successful save
          res.json({
            status: 200,
            data: savedUser,
          });
        })
        .catch((error) => {
          // Handle error
          console.log("error", error);
        });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/updateCategory", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
        Category_name: body.Category_name,
    };

    // update the data in database
    let whereQuery = { _id: body._id };
    await CategoryModel.findOneAndUpdate(whereQuery, payload, { new: true })
      .then((savedUser) => {
        // Handle successful save
        res.json({
          status: 200,
          data: savedUser,
        });
      })
      .catch((error) => {
        // Handle error
        console.log("error", error);
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/deleteCategory", async (req, res) => {
    try {
      let { body } = req;
      // Json creation for storing it in database
      let payload = {
        _id: body._id,
      };

      await CategoryModel.findByIdAndDelete(payload)
        .then((savedUser) => {
          // Handle successful save
          res.json({
            status: 200,
          });
        })
        .catch((error) => {
          // Handle error
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

router.get("/Category", async (req, res) => {
  try {
    const pages = await CategoryModel.find();
    res.json({
      status: 200,
      data: pages,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


module.exports = router;
