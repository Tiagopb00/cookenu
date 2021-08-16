import {app} from "./app"
import signup from './endpoints/signup'
import login from "./endpoints/login"
import profile from './endpoints/profile'
import getProfileById from "./endpoints/getProfileById"
import postRecipe from "./endpoints/postRecipe"
import getRecipeById from "./endpoints/getRecipeById"
import toFollow from "./endpoints/toFollow"
import unFollow from "./endpoints/unFollow"


app.post("/user/signup", signup) 
app.post("/user/login", login)
app.get("/user/profile", profile)
app.get("/user/:id", getProfileById)
app.post("/user/follow", toFollow)
app.post("/user/unfollow", unFollow)
app.post("/recipe/add", postRecipe)
app.get("/recipe/:id", getRecipeById) 

