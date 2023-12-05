
const sequelize = require("./db")

const {DataTypes, INTEGER} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true,unique:true, autoIncrement: true},
    name:{type:DataTypes.STRING, allowNull:false,primaryKey:true            },
    email: {type: DataTypes.STRING,allowNull:false, unique: true,},
    password: {type: DataTypes.STRING,allowNull:false},
    likedPosts:{type:DataTypes.ARRAY(DataTypes.JSONB),defaultValue:[]},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    isBanned:{type:DataTypes.BOOLEAN,defaultValue:false},
    
})

const Type = sequelize.define("type",{
    typeName:{type:DataTypes.STRING,allowNull:false,unique:true},
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}
})

const NationalCuisine = sequelize.define("nationalCuisine",{
    nationalCuisineName:{type:DataTypes.STRING,allowNull:false,unique:true},
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}
})

const Holiday = sequelize.define("holiday",{
    holidayName:{type:DataTypes.STRING,allowNull:false,unique:true},
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}
})

const RefreshToken = sequelize.define('refreshToken',{
    refreshToken:{type:DataTypes.STRING,unique:true},
})

const LikedRecipe = sequelize.define('LikedRecipe',{
})

const Recipe = sequelize.define('recipe',{
    id:{type: DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true},
    title:{type:DataTypes.STRING,allowNull:false},
    isVegan:{type:DataTypes.BOOLEAN,defaultValue:false},
    isHalal:{type:DataTypes.BOOLEAN,defaultValue:false},
    authorId:{type:DataTypes.INTEGER,allowNull:false,references:{
        model:'users',
        key:"id"
    }},
    isPending:{type:DataTypes.BOOLEAN,defaultValue:true,},
    isRejected:{type:DataTypes.BOOLEAN,defaultValue:false,},
    isChecked:{type:DataTypes.BOOLEAN,defaultValue:false},
    wasEdited:{type:DataTypes.BOOLEAN,defaultValue:false,},
    img:{type:DataTypes.STRING,allowNull:false,unique:true}
})

const RecipeInfo = sequelize.define("recipeInfo",{
    id:{type: DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true},
    steps:{type:DataTypes.ARRAY(DataTypes.JSON),defaultValue:[]},
    ingredients:{type:DataTypes.ARRAY(DataTypes.JSON),defaultValue:[]},
    description:{type:DataTypes.STRING,allowNull:false},
})

const MessageOfRecipe = sequelize.define("messageOfRecipe",{
    id:{type: DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true},
    message:{type:DataTypes.STRING,allowNull:false},
})

Recipe.hasOne(RecipeInfo)
RecipeInfo.belongsTo(Recipe)

User.hasMany(MessageOfRecipe)
MessageOfRecipe.belongsTo(User)

Recipe.hasMany(MessageOfRecipe)
MessageOfRecipe.belongsTo(Recipe)


Type.hasMany(Recipe)
Recipe.belongsTo(Type)

NationalCuisine.hasMany(Recipe)
Recipe.belongsTo(NationalCuisine)

Holiday.hasMany(Recipe)
Recipe.belongsTo(Holiday)

User.hasOne(RefreshToken)
RefreshToken.belongsTo(User)

Recipe.hasOne(LikedRecipe)
LikedRecipe.belongsTo(Recipe)

User.hasMany(LikedRecipe)
LikedRecipe.belongsTo(User)

module.exports = {
    User,
    RefreshToken,
    Recipe,
    Type,
    Holiday,
    NationalCuisine,
    LikedRecipe,
    MessageOfRecipe,
    RecipeInfo
}