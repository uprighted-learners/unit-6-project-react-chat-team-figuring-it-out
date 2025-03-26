//? Importing all controllers into a single file 
import userController from "./users_controller.js"
import roomController from "./rooms_controller.js"
import messageController from "./messages_controller.js"

//? Exporting all contollers for use in "app.js" file
export {userController, roomController, messageController}