module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        // "User"부분 - 어떤 객체인지
        mb_no: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            // defaultValue: 1,
            primaryKey:true,
            unique: true,
            allowNull: false,
            comment: "유저 id"
        },
        mb_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: "유저 id"
        },
        mb_pw: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "유저 PW"
        }
        ,
        mb_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "유저 이름"
        },
        mb_phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            comment: "유저 폰번호"
        },
        mb_point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "유저 마일리지"
        }
        , admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "관리자여부"
        }
    }, {
        tableName: 'member',
        comment: "사용자",
        classMethods: {
            associate: function(models) {
                Member.hasMany(models.Checkout, {foreignKey: 'mb_no',onDelete:'CASCADE', onUpdate:'CASCADE'});
                Member.hasMany(models.Cart, {foreignKey: 'mb_no',onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
        //classMethods: relationShip 부분
    });
    return Member;
}