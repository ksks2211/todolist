const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Plans = sequelize.define('Plans',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name : {type: DataTypes.STRING },
        description : {type: DataTypes.TEXT }
    }
    );


    Plans.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );
    
    return Plans;

}