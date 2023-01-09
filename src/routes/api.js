const express=require ('express')
const ProfileController=require("../controllers/ProfileController")
const ToDoListController=require("../controllers/ToDoListController")
var AuthVerifiMiddleware=require('../middleware/AuthVerifiMiddleware');
const router=express.Router();


router.post("/CreateProfile",ProfileController.CreateProfile)
router.post("/UserLogin",ProfileController.UserLogin)


router.get("/SelectProfile",AuthVerifiMiddleware,ProfileController.SelectProfile)
router.post("/UpdateProfile",AuthVerifiMiddleware,ProfileController.UpdateProfile)

router.post("/CreateTodo",AuthVerifiMiddleware,ToDoListController.CreateTodo)
router.get("/SelectToDo",AuthVerifiMiddleware,ToDoListController.SelectToDo)
router.post("/UpdateToDo",AuthVerifiMiddleware,ToDoListController.UpdateToDo)
router.post("/UpdateStatusToDo",AuthVerifiMiddleware,ToDoListController.UpdateStatusToDo)
router.post("/RemoveToDo",AuthVerifiMiddleware,ToDoListController.RemoveToDo)
router.post("/SelectToDoByStatus",AuthVerifiMiddleware,ToDoListController.SelectToDoByStatus)
router.post("/SelectToDoByDate",AuthVerifiMiddleware,ToDoListController.SelectToDoByDate)

module.exports=router;