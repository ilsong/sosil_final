/**
 * Created by 김서진 on 2016-12-08.
 */
module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "아이템 이름"
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            comment: "아이템 재고수량"
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "아이템 가격"
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "아이템 카테고리"
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "아이템 "
        }
        ,recommended: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "추천 아이템"
        }
        ,purchased: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "구매된 정도"
        }
    }, {
        tableName: 'item',
        comment: "아이템",
        classMethods: {
            associate: function(models) {
                Item.hasMany(models.Cart, {foreignKey: 'it_id',onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return Item;
}