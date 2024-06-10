// import document model
const Document = require("../models/document")

// create controller
const documentController = ({
    uploadDocument: async (req, res) => {
        try {
            const { userId } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const newDocument = new Document({
                userId,
                fileName: file.originalname,
                filePath: file.path,
                fileType: file.mimetype
            });

            const document = await newDocument.save();
            res.status(201).json({ message: "Document uploaded successfully", document });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDocumentsByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            const documents = await Document.find({ userId });

            if (documents.length > 0) {
                res.status(200).json(documents);
            } else {
                res.status(404).json({ message: "No documents found for this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    downloadDocument: async (req, res) => {
        try {
            const documentId = req.params.documentId;
            const document = await Document.findById(documentId);

            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }

            res.download(document.filePath, document.fileName);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

})

// export documentController
module.exports = documentController;