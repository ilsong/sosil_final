/**
 * Created by 김서진 on 2016-12-08.
 */
module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        // "User"부분 - 어떤 객체인지
        it_no: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            comment: "아이템 id"
        },
        it_amount: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            comment: "아이템 재고수량"
        },
        it_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "아이템 이름"
        },
        it_code: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "아이템 코드"
        },
        it_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "아이템 가격"
        },
        it_category: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "아이템 카테고리"
        }
    }, {
        tableName: 'item',
        comment: "아이템",
        classMethods: {
        }
        //classMethods: relationShip 부분
    });
    return Item;
}