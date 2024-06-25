// // import express
// const express = require("express");
// // import documentController
// const documentController = require("../controllers/documentController");
// // import middleware
// const auth = require("../middleware/auth");

// const documentRouter = express.Router();

// // create routes
// documentRouter.post("/",auth.isAuth,documentController.uploadDocument)
// documentRouter.get("/:id",auth.isAuth,documentController.getDocumentsByUserId)
// documentRouter.get("/:id",auth.isAuth,documentController.downloadDocument)

// // export documentController
// module.exports = documentRouter;