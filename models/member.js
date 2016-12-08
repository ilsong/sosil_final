module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        // "User"부분 - 어떤 객체인지
        mb_no: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            unique: true,
            allowNull: false,
            comment: "유저 id"
        },
        mb_id: {
            type: DataTypes.INTEGER,
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
    }, {
        tableName: 'member',
        comment: "사용자",
        classMethods: {
        }
        //classMethods: relationShip 부분
    });
    return Member;
}