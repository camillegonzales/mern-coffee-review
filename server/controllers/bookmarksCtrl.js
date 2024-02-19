// Get all bookmarks for user
const getBookmarksCtrl = async (req,res) => {
    try {
        res.json({msg: "Get all bookmarks for user route"});
    } catch (error) {
        res.json(error);
    }
};

// Add bookmark to user
const addBookmarkCtrl = async (req,res) => {
    try {
        res.json({msg: "Add coffee shop to user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
};

// Remove bookmark from user
const removeBookmarkCtrl = async (req,res) => {
    try {
        res.json({msg: "Remove a coffee shop from user's bookmarks route"});
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getBookmarksCtrl,
    addBookmarkCtrl,
    removeBookmarkCtrl
};